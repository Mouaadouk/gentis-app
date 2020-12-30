import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  ButtonBase,
  Typography,
  Button,
} from "@material-ui/core";
import img1 from "../images/poke.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      opacity: " 0.7",
      width: "105%",
    },
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  ButtonBase: {
    display: "block",
    textAlign: "initial",
  },
}));

const PokemonCard = ({ handleClick, name, home }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <ButtonBase
          className={classes.ButtonBase}
          onClick={() => {
            handleClick();
          }}
        >
          <CardMedia className={classes.cardMedia} image={img1} />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
          {home && (
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => handleClick()}
              >
                Détails
              </Button>
            </CardActions>
          )}
        </ButtonBase>
      </Card>
    </div>
  );
};

export default React.memo(PokemonCard);
