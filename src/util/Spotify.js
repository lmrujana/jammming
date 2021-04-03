import config from "./config";

let accessToken;
const CLIENT_ID = config.client;
// const CLIENT_ID = "e01227b4caae4f0986183c94f2c03c3e";
const REDIRECT_URI = "http://localhost:3000/";

const Spotify = {
  getAccessToken: function () {
    if (accessToken) {
      return accessToken;
    }

    //Finding a match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      window.location.assign(
        `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`
      );
    }
  },
  search(searchTerm) {
    const newAccessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      }
    )
      .then(
        (response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request Failed!");
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          let tracks = jsonResponse.tracks.items;
          return tracks.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        }
      });
  },
  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let userID;

    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: playlistName }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackURIs }),
              }
            );
          });
      });
  },
};

export default Spotify;
