import React from "react";
import "./App.css";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "playlist name",
      playlistTracks: [
        { name: "too hard", artist: "Gunna", album: "cold af", id: 5 },
        { name: "who want smoke", artist: "savage", album: "hoodlooms", id: 8 },
      ],
      searchResults: [
        { name: "bobyjunky1", artist: "fyomoma", album: "drunkenpig", id: 1 },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const isNew = !this.state.playlistTracks.some(
      (savedTrack) => savedTrack.id === track.id
    );
    if (isNew) {
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
    }
  }

  removeTrack(track) {
    const index = this.state.playlistTracks.findIndex(
      (savedTrack) => savedTrack.id === track.id
    );
    if (index !== -1) {
      const array = [...this.state.playlistTracks];
      array.splice(index, 1);
      this.setState({ playlistTracks: array });
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(
      (savedTrack) => savedTrack.uri
    );
  }

  async search(term) {
    const searchResults = await Spotify.search(term);
    this.setState({ searchResults: searchResults });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
