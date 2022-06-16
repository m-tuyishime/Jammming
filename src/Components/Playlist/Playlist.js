import React from "react";
import TrackList from "../TrackList/TrackList";

const Playlist = (props) => {
  const defaultValue = "New Playlist";

  const handleNameChange = (e) => {
    props.onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <input value={defaultValue} onChange={handleNameChange} />
      <TrackList
        tracks={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval="true"
      />
      <button onClick={props.onSave} className="Playlist-save">
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
