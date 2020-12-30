import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Dialog,
  Button,
  CircularProgress,
  Chip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import { getPokemonsTypes } from "../redux/actions/pokemonType.action";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#D25F2C",
  },
}));

function PokemonDetails({
  pokeData,
  loading,
  open,
  setOpen,
  pokeEvolution,
  loadingEvolution,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={() => setOpen(false)} taile="md">
      {loading ? (
        <CircularProgress />
      ) : (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {(pokeData && pokeData["name"]?.split("").shift()) || ""}
              </Avatar>
            }
            title={pokeData["name"]}
          />
          <CardMedia
            className={classes.media}
            image={`https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {`le pokemone ${pokeData.name} il a une hauteur de ${
                pokeData.height
              }cm est un poid de ${pokeData.weight}g est une exprience de ${
                pokeData.base_experience
              } combat,
              en parlant des capacités de ${pokeData.name}, il a c'est ${
                pokeData.abilities.length
              } capacité : ${pokeData.abilities.map(
                (item) => item.ability.name
              )},           
              Concernant ces types, il a  ${
                pokeData.types.length
              } type : ${pokeData.types.map((item) => item.type.name)},
              `}
            </Typography>
            {loadingEvolution ? (
              <CircularProgress />
            ) : (
              <Typography>
                {`Pokemon evolution(${pokeEvolution.length})`}
                {pokeEvolution.map((item) => (
                  <Chip color="secondary" label={item["species"]["name"]} />
                ))}
              </Typography>
            )}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Voir les Pokemon de même type :</Typography>
              {pokeData.types.map((item, index) => (
                <Button
                  key={index}
                  type="link"
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    dispatch(
                      getPokemonsTypes(
                        `https://pokeapi.co/api/v2/type/${item.type.name}`,
                        item.type.name
                      )
                    );
                    history.push("/pokemonTypeList");
                  }}
                >
                  {item.type.name}
                </Button>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </Dialog>
  );
}

export default React.memo(PokemonDetails);
