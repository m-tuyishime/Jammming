import React from "react";

const Track = (props) => {
  const trackName = props.track.name;
  const artistName = props.track.artist;
  const trackAlbum = props.track.album;
  const isRemoval = props.isRemoval;

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="Track-action" onClick={addTrack}>
        +
      </button>
    );
  };

  const addTrack = () => {
    props.onAdd(props.track);
  };

  const removeTrack = () => {
    props.onRemove(props.track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{trackName}</h3>
        <p>
          {artistName} | {trackAlbum}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
