import React, { useState, useEffect } from "react";
import {
  Card,
  InputLabel,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  IconButton,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import img1 from "../images/poke.jpg";
import WarningIcon from "@material-ui/icons/Warning";
import Pagination from "@material-ui/lab/Pagination";
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

export default function Home({ history, pokemonList }) {
  const [page, setPage] = React.useState(1);
  const [itemPerPage] = useState(20); // num de ligne par page
  const [filtredData, setFiltredData] = useState(pokemonList.data);
  const [searchedItem, setSearchedItem] = useState("");

  useEffect(() => {
    let newData = pokemonList.data.filter(
      (item) =>
        item["pokemon"]["name"]
          .toLowerCase()
          .indexOf(searchedItem.toLowerCase()) !== -1
    );
    setFiltredData(newData);
  }, [searchedItem, pokemonList]);

  const indexOfLastItem = page * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentBloc = filtredData.slice(indexOfFirstItem, indexOfLastItem); // methode qui gere la pagignation

  const handleChange = (event, value) => {
    setPage(value);
  };
  const count = Math.ceil(filtredData.length / itemPerPage);
  const classes = useStyles();
  return (
    <>
      <main>
        <InputLabel className={classes.InputLabel}>
          {`List of pokemons belonging to the selected type : ${pokemonList.type}`}
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
                    <IconButton
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      <Card className={classes.card}>
                        <CardMedia className={classes.cardMedia} image={img1} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.pokemon.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </IconButton>
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
    </>
  );
}
