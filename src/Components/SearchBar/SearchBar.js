import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChgange = this.handleTermChgange.bind(this);
    this.state = {
      term: "",
    };
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChgange(event) {
    const updatedTerm = event.target.value;
    this.setState({ term: updatedTerm });
    console.log(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChgange}
        />
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
      </div>
    );
  }
}

export default SearchBar;
