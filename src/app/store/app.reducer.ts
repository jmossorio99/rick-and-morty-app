import {ActionReducerMap} from "@ngrx/store";
import * as fromCharacter from "./character/character.reducer"

export interface AppState {
  character: fromCharacter.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  // @ts-ignore
  character: fromCharacter.characterReducer
}
