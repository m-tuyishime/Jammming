import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TrackList">
        <ul>
          {this.props.tracks.map((track, i) => (
            <li key={i}>
              <Track
                onAdd={this.props.onAdd}
                track={track}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TrackList;
