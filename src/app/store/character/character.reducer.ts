import {Character} from "../../model/character.model";
import * as CharacterActions from "./character.actions";

export interface State {
  characters: Character[];
  filteredCharacters: Character[];
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  characters: [],
  filteredCharacters: [],
  loading: false,
  error: false
};

export function characterReducer(state = initialState, action: CharacterActions.CharacterActions): State {
  switch (action.type) {
    case CharacterActions.CHARACTERS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CharacterActions.EPISODES_LOADED:
      return {
        ...state,
        characters: action.payload,
        filteredCharacters: action.payload,
        loading: false,
        error: false,
      };
    case CharacterActions.CHARACTERS_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      };
    case CharacterActions.DELETE_CHARACTER:
      return {
        ...state,
        characters: state.characters.filter(character => character.id !== action.payload),
        filteredCharacters: state.filteredCharacters.filter(character => character.id !== action.payload)
      };
    case CharacterActions.UPDATE_CHARACTER:
      const updatedCharacters = [...state.characters];
      const index = updatedCharacters.findIndex(character => character.id === action.payload.id);
      updatedCharacters[index] = action.payload.updatedCharacter;
      return {
        ...state,
        characters: updatedCharacters,
        filteredCharacters: [...updatedCharacters]
      };
    case CharacterActions.FILTER_CHARACTERS:
      let filteredCharacters = [...state.characters];
      if (action.payload.nameFilter) { // @ts-ignore
        filteredCharacters = filteredCharacters.filter(character => character.name.toLowerCase().includes(action.payload.nameFilter.toLowerCase()));
      }
      if (action.payload.statusFilter) { // @ts-ignore
        filteredCharacters = filteredCharacters.filter(character => character.status.toLowerCase() === action.payload.statusFilter.toLowerCase());
      }
      if (action.payload.genderFilter) { // @ts-ignore
        filteredCharacters = filteredCharacters.filter(character => character.gender.toLowerCase() === action.payload.genderFilter.toLowerCase());
      }
      return {
        ...state,
        filteredCharacters
      };
    default:
      return state;
  }
}
