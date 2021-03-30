import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  renderAction() {
    return (
      <button className="Track-action" onClick={this.addTrack}>
        {this.props.isRemoval ? "-" : "+"}
      </button>
    );
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>
            {this.props.artist}| {this.props.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
