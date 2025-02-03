import { Component } from 'react';

import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Search from './components/Search/Search.tsx';
import Results from './components/Results/Results.tsx';
import Pagination from './components/Pagination/Pagination.tsx';
import ErrorButton from './components/ErrorButton/ErrorButton.tsx';

export interface People {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
}

interface State {
  searchTerm: string;
  peoples: People[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const API_URL = 'https://swapi.dev/api/people';

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      peoples: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  fetchData = async (term: string, page: number) => {
    this.setState({ loading: true, error: null });

    const query = term.trim();
    const url = query
      ? `${API_URL}/?search=${query}&page=${page}`
      : `${API_URL}/?page=${page}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          throw new Error(
            `Client Error: ${response.status} ${response.statusText}`
          );
        } else if (response.status >= 500 && response.status < 600) {
          throw new Error(
            `Server Error: ${response.status} ${response.statusText}`
          );
        } else {
          throw new Error('Failed to fetch data');
        }
      }

      const data = await response.json();

      const peoples = data.results.slice(0, 10).map((person: People) => ({
        name: person.name,
        gender: person.gender,
        height: person.height,
        mass: person.mass,
        birth_year: person.birth_year,
        eye_color: person.eye_color,
        hair_color: person.hair_color,
        skin_color: person.skin_color,
      }));

      this.setState({
        peoples,
        loading: false,
        totalPages: Math.ceil(data.count / 10),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: 'An unknown error occurred', loading: false });
      }
    }
  };

  handleSearch = async (term: string) => {
    this.setState({ searchTerm: term.trim(), currentPage: 1 });
    localStorage.setItem('searchTerm', term.trim());
    await this.fetchData(term, 1);
  };

  handlePageChange = async (page: number) => {
    this.setState({ currentPage: page });
    await this.fetchData(this.state.searchTerm, page);
  };

  componentDidMount = async () => {
    await this.fetchData(this.state.searchTerm, this.state.currentPage);
  };

  render() {
    const { peoples, loading, error, currentPage, totalPages } = this.state;

    return (
      <ErrorBoundary>
        <div className="main">
          <h1>Characters within the Star Wars universe</h1>
          <div className="top-controls">
            <Search
              onSearch={this.handleSearch}
              initialSearchTerm={this.state.searchTerm}
            />
          </div>
          <div className="results-section">
            <Results peoples={peoples} loading={loading} error={error} />
          </div>
          <div className="bottom-controls">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={this.handlePageChange}
            />
            <ErrorButton />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
