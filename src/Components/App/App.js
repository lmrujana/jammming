import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

// Maybe change App into a class component

function App(props) {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Bad Romance",
      artist: "Lady Gaga",
      album: "The Fame Monster",
      id: 1,
    },
    {
      name: "California Girls",
      artist: "Katy Perry",
      album: "Teenage Dreams",
      id: 2,
    },
    {
      name: "Umbrella",
      artist: "Rihanna",
      album: "Good Girl Gone Bad",
      id: 3,
    },
  ]);

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} />
          {/* <Playlist /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
