import React, { useEffect, useState } from "react";

import { getMovies } from "../../utils/dataGetters";

import "../../styles/NonQueenEntries.css";

const NonQueenmovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getMovies().then((movies) => {
      setMovies(movies);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="non-queen-movies">Loading movies...</div>;

  const onSearch = (e) => {
    setSearchKey(e.target.value.toLowerCase());
  };

  const filteredmovies = searchKey
    ? movies.filter((e) => e.name.toLowerCase().includes(searchKey))
    : movies;

  if (!movies.length) {
    return <h1>There are no movies in database</h1>;
  }
  return (
    <>
      <div className="non-queen-filter">
        <span className="non-queen-filter-text">Filter:</span>
        <input value={searchKey} onChange={onSearch} />
      </div>
      <ul className="non-queen-entries">
        {filteredmovies.map((e) => (
          <li key={e.id}>
            <h2>{e.name}</h2>
            <div>Format: {e.format}</div>
            <a href={e.imdb_url}>{e.imdb_url}</a>
            {e.comment && (
              <div>
                <i>{e.comment}</i>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NonQueenmovies;
