import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => (
          <Track
            name={track.name}
            artist={track.artist}
            album={track.album}
            key={track.id}
          />
        ))}
      </div>
    );
  }
}

export default TrackList;
