import axios from "axios";
import * as ACTIONS from "./actionsTypes";

export const getPokemonsTypes = (url, typeName) => (dispatch) => {
  dispatch({ type: ACTIONS.REQUEST_GET_POKEMON_WITH_TYPES });
  axios
    .get(url)
    .then(({ data }) => {
      dispatch({
        type: ACTIONS.RECEIVE_GET_POKEMON_WITH_TYPES,
        data: data["pokemon"],
        name: typeName,
      });
    })
    .catch(() => {
      dispatch({
        type: ACTIONS.ERROR_GET_POKEMON_WITH_TYPES,
      });
    });
};
