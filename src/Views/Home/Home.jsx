import React, { useState } from "react";
import { Grid, Container, TextField, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import PokemonDetails from "../../Components/PokemonDetails";
import PokemonCard from "../../Components/PokemonCard";
import Pagination from "../../Components/Pagination";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  pagination: {
    margin: "0 76px 0 0",
    float: "right",
  },
  InputLabel: {
    textAlign: "center",
    fontSize: "30px",
    paddingTop: "15px",
  },
}));

function Home({
  pokemonList,
  handlePrevious,
  handleNext,
  searchedElem,
  setSearchedElem,
}) {
  const [open, setOpen] = useState(false);
  const [pokeData, setPokeDate] = useState({});
  const [pokeEvolution, setPokeEvolution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvolution, setLoadingEvolution] = useState(true);

  const fetchPokeData = async (url) => {
    setLoading(true);
    await axios.get(url).then(async ({ data }) => {
      setPokeDate(data);
      setLoading(false);
      setLoadingEvolution(true);
      await axios
        .get(`https://pokeapi.co/api/v2/evolution-chain/${data.id}`)
        .then(({ data }) => {
          setPokeEvolution(data["chain"]["evolves_to"]);
          setLoadingEvolution(false);
        });
    });
  };

  const handleClick = (url) => {
    setOpen(true);
    fetchPokeData(url);
  };

  const classes = useStyles();

  return (
    <>
      <main>
        <InputLabel className={classes.InputLabel}>pokemons List</InputLabel>

        <Container className={classes.cardGrid} maxWidth="md">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchedElem}
            onChange={({ target }) => setSearchedElem(target.value)}
          />

          {pokemonList.length > 0 ? (
            <>
              <div className={classes.pagination}>
                <Pagination
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                />
              </div>
              <Grid container spacing={2}>
                {pokemonList.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={3}>
                    <PokemonCard
                      handleClick={() => handleClick(item.url)}
                      name={item.name}
                      home
                    />
                  </Grid>
                ))}
              </Grid>
              <PokemonDetails
                pokeData={pokeData}
                open={open}
                setOpen={setOpen}
                loading={loading}
                pokeEvolution={pokeEvolution}
                loadingEvolution={loadingEvolution}
              />
            </>
          ) : (
            <>
              <WarningIcon />
              <div>There is no Item with this name in this List </div>
            </>
          )}
        </Container>
      </main>
    </>
  );
}
export default React.memo(Home);
