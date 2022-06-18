import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.trackName = this.props.track.name;
    this.artistName = this.props.track.artist;
    this.trackAlbum = this.props.track.album;
    this.isRemoval = this.props.isRemoval;
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="Track-action" onClick={this.addTrack}>
        +
      </button>
    );
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.trackName}</h3>
          <p>
            {this.artistName} | {this.trackAlbum}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
