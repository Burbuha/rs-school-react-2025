import { ChangeEvent, Component } from 'react';

interface Props {
  onSearch: (term: string) => void;
  initialSearchTerm: string;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: this.props.initialSearchTerm,
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default Search;
