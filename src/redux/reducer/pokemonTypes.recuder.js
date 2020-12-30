import * as ACTIONS from "../actions/actionsTypes";
const initialState = {
  name: "",
  data: [],
  loading: false,
  errors: "",
};

const reducer = (state = initialState, action) => {
  const { data, name } = action;
  switch (action.type) {
    case ACTIONS.REQUEST_GET_POKEMON_WITH_TYPES:
      return {
        ...state,
        loading: true,
        errors: "",
      };
    case ACTIONS.RECEIVE_GET_POKEMON_WITH_TYPES:
      return {
        ...state,
        loading: false,
        data: data,
        name: name,
        errors: "",
      };
    case ACTIONS.ERROR_GET_POKEMON_WITH_TYPES:
      return {
        name: "",
        loading: false,
        data: [],
        errors: `une erreur s'est produit lors du chargement des données`,
      };
    default:
      return state;
  }
};
export default reducer;
