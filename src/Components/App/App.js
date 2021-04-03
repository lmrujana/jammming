import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

// Maybe change App into a class component

function App(props) {
  const [searchResults, setSearchResults] = useState([
    // {
    //   name: "Bad Romance",
    //   artist: "Lady Gaga",
    //   album: "The Fame Monster",
    //   id: 1,
    // },
    // {
    //   name: "California Girls",
    //   artist: "Katy Perry",
    //   album: "Teenage Dreams",
    //   id: 2,
    // },
    // {
    //   name: "Umbrella",
    //   artist: "Rihanna",
    //   album: "Good Girl Gone Bad",
    //   id: 3,
    // },
  ]);

  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    // {
    //   name: "Don't Speak",
    //   artist: "No Doubt",
    //   album: "Tragic Kingdom",
    //   id: 4,
    // },
    // {
    //   name: "Chandelier",
    //   artist: "Sia",
    //   album: "1000 forms of fear",
    //   id: 5,
    // },
  ]);

  const addTrack = (track) => {
    if (playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)) {
      return;
    }

    setPlaylistTracks([track, ...playlistTracks]);
  };

  const removeTrack = (track) => {
    const filteredArray = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    setPlaylistTracks(filteredArray);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((playlistTrack) => playlistTrack.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  const search = (searchTerm) => {
    Spotify.search(searchTerm).then((searchResults) => {
      setSearchResults(searchResults);
    });
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
