const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filtersLoadingStatus: "idle",
  activeFilter: "all",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "HERO_CREATED":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case "HERO_DELETED":
      return {
        ...state,
        heroes: state.heroes.filter(
        (hero) => hero.id !== action.payload
      )};
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filtersLoadingStatus: "idle",
        filters: action.payload,
      };
    case "ACTIVE_FILTER_CHANGED": {
      return {
        ...state,
        activeFilter: action.payload,
      };
    }
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    default:
      return state;
  }
};

export default reducer;
