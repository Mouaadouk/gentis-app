import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Views/Home";
import PokemonTypesList from "./Views/PokemonWithSameType";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonWithSameTypesList, setPokemonWithSameTypesList] = useState({
    type: "",
    data: [],
  });
  const [filtredData, setFiltredData] = useState([]);
  const [pageUrl, setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [previousPageUrl, setPreviousPageUrl] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [loadingTypes, setLoadingTypes] = React.useState(true);
  const [searchedElem, setSearchedElem] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(pageUrl)
      .then(({ data }) => {
        setLoading(false);
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
        setPokemonList(data.results);
        setFiltredData(data.results);
      })
      .catch((err) => setError(true));
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
  if (error)
    return <Alert severity="error">Ooops something went wrong ....</Alert>;

  return (
    <>
      <div className="App">
        <Header />
        <Switch>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Route exact path="/">
                <Home
                  pokemonList={filtredData}
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                  searchedElem={searchedElem}
                  setSearchedElem={setSearchedElem}
                  setPokemonWithSameTypesList={setPokemonWithSameTypesList}
                  pokemonWithSameTypesList={pokemonWithSameTypesList}
                  setLoadingTypes={setLoadingTypes}
                />
              </Route>
              <Redirect to="/" />
            </>
          )}

          {loadingTypes ? (
            <CircularProgress />
          ) : (
            <>
              <Route path="/pokemonTypeList">
                {(props) => (
                  <PokemonTypesList
                    pokemonList={pokemonWithSameTypesList}
                    {...props}
                  />
                )}
              </Route>
              <Redirect to="/" />
            </>
          )}
        </Switch>

        <Footer />
      </div>
    </>
  );
}

export default App;
