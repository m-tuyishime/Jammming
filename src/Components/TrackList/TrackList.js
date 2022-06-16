import React from "react";
import Track from "../Track/Track";

const TrackList = (props) => {
  return (
    <div className="TrackList">
      <ul>
        {props.tracks.map((track) => (
          <li>
            <Track
              onAdd={props.onAdd}
              track={track}
              onRemove={props.onRemove}
              isRemoval={props.isRemoval}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
