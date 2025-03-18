import { useState, useEffect } from 'react';
import './App.css';
import { CountryCard } from './components/Card/Card.tsx';

const API_URL = 'https://restcountries.com/v3.1/all';

export type Country = {
  name: { common: string };
  population: number;
  region: string;
  flags: { png: string };
  cca3: string;
};

const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortType, setSortType] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('visitedCountries') || '[]');
  });

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
  }, [visitedCountries]);

  const toggleVisited = (countryName: string) => {
    setVisitedCountries((prev) =>
      prev.includes(countryName)
        ? prev.filter((c) => c !== countryName)
        : [...prev, countryName]
    );
  };

  const handleSort = (type: 'name' | 'population') => {
    if (sortType === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortOrder('asc');
    }
  };

  const getFilteredCountries = () => {
    return countries
      .filter((c) => (region ? c.region === region : true))
      .filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortType === 'name') {
          return sortOrder === 'asc'
            ? a.name.common.localeCompare(b.name.common)
            : b.name.common.localeCompare(a.name.common);
        } else {
          return sortOrder === 'asc'
            ? a.population - b.population
            : b.population - a.population;
        }
      });
  };

  return (
    <div className="App">
      <div className="controls">
        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setRegion(e.target.value)} value={region}>
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

        <button onClick={() => handleSort('name')}>
          Sort by Name
          {sortType === 'name' && (sortOrder === 'asc' ? ' ⬆️' : ' ⬇️')}
        </button>

        <button onClick={() => handleSort('population')}>
          Sort by Population
          {sortType === 'population' && (sortOrder === 'asc' ? ' ⬆️' : ' ⬇️')}
        </button>
      </div>

      <div className="countries">
        {getFilteredCountries().map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            visited={visitedCountries.includes(country.name.common)}
            toggleVisited={toggleVisited}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
