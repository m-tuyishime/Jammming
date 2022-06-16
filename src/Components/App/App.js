import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import { useState } from "react";

function App() {
  const [playlistName, setPlaylistName] = useState("f-boy");
  const [playlistTracks, setPlaylistTracks] = useState([
    { name: "too hard", artist: "Gunna", album: "cold af", id: 5 },
    { name: "who want smoke", artist: "savage", album: "hoodlooms", id: 8 },
  ]);
  const [searchResults, setSearchResults] = useState(Spotify.search());

  const addTrack = (track) => {
    const isNew = !playlistTracks.some(
      (savedTrack) => savedTrack.id === track.id
    );
    if (isNew) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    const index = playlistTracks.findIndex(
      (savedTrack) => savedTrack.id === track.id
    );
    if (index !== -1) {
      const array = [...playlistTracks];
      array.splice(index, 1, track);
      setPlaylistTracks(array);
    }
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackURIs = [];
    playlistTracks.forEach((savedTrack) => trackURIs.push(savedTrack.uri));
  };

  const search = (term) => {
    console.log(term);
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults onAdd={addTrack} searchResults={searchResults} />
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
