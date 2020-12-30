import React, { useState, useEffect } from "react";
import { InputLabel, Grid, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorComponent from "../../Components/ErrorComponent";
import { CircularProgress } from "@material-ui/core";
import PokemonCard from "../../Components/PokemonCard";
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

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = React.useState(1);
  const [itemPerPage] = useState(20);
  const [filtredData, setFiltredData] = useState([]);
  const [searchedItem, setSearchedItem] = useState("");
  const { data, loading, errors, name } = useSelector((state) => state);

  useEffect(() => {
    setPokemonList(data);
  }, [data]);

  useEffect(() => {
    let newData = pokemonList.filter(
      (item) =>
        item["pokemon"]["name"]
          .toLowerCase()
          .indexOf(searchedItem.toLowerCase()) !== -1
    );
    setFiltredData(newData);
    setPage(1);
  }, [searchedItem, pokemonList]);

  const indexOfLastItem = page * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentBloc = filtredData?.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const count = Math.ceil(filtredData.length / itemPerPage);
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      {errors ? (
        <ErrorComponent />
      ) : loading ? (
        <CircularProgress />
      ) : (
        <main>
          <InputLabel className={classes.InputLabel}>
            {`List of pokemons belonging to the selected type : ${name}`}
          </InputLabel>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchedItem}
              onChange={({ target }) => setSearchedItem(target.value)}
            />

            {currentBloc.length > 0 ? (
              <>
                <div className={classes.pagination}>
                  <Pagination
                    count={count}
                    variant="outlined"
                    color="secondary"
                    page={page}
                    onChange={handleChange}
                  />
                </div>
                <Grid container spacing={2}>
                  {currentBloc.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                      <PokemonCard
                        handleClick={() => history.push("/")}
                        name={item.pokemon.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <>
                <WarningIcon />
                <div>There is no Item with this name in this List </div>
              </>
            )}
          </Container>
        </main>
      )}
    </>
  );
}
