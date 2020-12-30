import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import Home from "./Home";
import ErrorComponent from "../../Components/ErrorComponent";
import axios from "axios";

function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [pageUrl, setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [filtredData, setFiltredData] = useState([]);
  const [searchedElem, setSearchedElem] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [previousPageUrl, setPreviousPageUrl] = useState("");

  useEffect(() => {
    setLoading(true);
    let fetchData = () => {
      axios
        .get(pageUrl)
        .then(({ data }) => {
          setLoading(false);
          setNextPageUrl(data.next);
          setPreviousPageUrl(data.previous);
          setPokemonList(data.results);
          setFiltredData(data.results);
        })
        .catch(() => setError(true));
    };
    fetchData();
  }, [pageUrl]);

  useEffect(() => {
    let newData = pokemonList.filter(
      (item) =>
        item.name.toLowerCase().indexOf(searchedElem.toLowerCase()) !== -1
    );
    setFiltredData(newData);
  }, [searchedElem, pokemonList]);

  const handlePrevious = () => {
    previousPageUrl
      ? setPageUrl(previousPageUrl)
      : setPageUrl("https://pokeapi.co/api/v2/pokemon");
  };

  const handleNext = () => {
    nextPageUrl ? setPageUrl(nextPageUrl) : setPageUrl(pageUrl);
  };

  return (
    <div>
      {error ? (
        <ErrorComponent />
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Home
          pokemonList={filtredData}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          searchedElem={searchedElem}
          setSearchedElem={setSearchedElem}
        />
      )}
    </div>
  );
}

export default HomePage;
