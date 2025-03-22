import styles from './Controls.module.css';

interface Props {
  search: string;
  setSearch: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  sortType: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  handleSort: (type: 'name' | 'population') => void;
}

export const Controls = ({
  search,
  setSearch,
  region,
  setRegion,
  sortType,
  sortOrder,
  handleSort,
}: Props) => {
  return (
    <div className={styles.controls}>
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
  );
};
