import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  IconButton,
  Tooltip,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import img1 from "../images/poke.jpg";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import WarningIcon from "@material-ui/icons/Warning";
import PokemonDetails from "../Components/PokemonDetails";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
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

export default function Home({
  pokemonList,
  handlePrevious,
  handleNext,
  searchedElem,
  setSearchedElem,
  pokemonWithSameTypesList,
  setPokemonWithSameTypesList,
  setLoadingTypes,
}) {
  const [open, setOpen] = useState(false);
  const [pokeData, setPokeDate] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPokeData = async (url) => {
    setLoading(true);
    await axios.get(url).then(({ data }) => {
      setPokeDate(data);
      setLoading(false);
    });
  };

  const handleClick = (url) => {
    setOpen(true);
    fetchPokeData(url);
  };

  const handlePokemonTypes = async (url, type) => {
    setLoadingTypes(true);
    await axios.get(url).then(({ data }) => {
      setPokemonWithSameTypesList({
        ...pokemonWithSameTypesList,
        type: type,
        data: data["pokemon"],
      });
      setLoadingTypes(false);
    });
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
                <IconButton onClick={handlePrevious}>
                  <Tooltip title="go left">
                    <ChevronLeftIcon />
                  </Tooltip>
                </IconButton>
                <IconButton onClick={handleNext}>
                  <Tooltip title="go right">
                    <ChevronRightIcon />
                  </Tooltip>
                </IconButton>
              </div>
              <Grid container spacing={2}>
                {pokemonList.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={3}>
                    <IconButton onClick={() => handleClick(item["url"])}>
                      <Card className={classes.card}>
                        <CardMedia className={classes.cardMedia} image={img1} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
              <PokemonDetails
                pokeData={pokeData}
                open={open}
                setOpen={setOpen}
                loading={loading}
                handlePokemonTypes={handlePokemonTypes}
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
