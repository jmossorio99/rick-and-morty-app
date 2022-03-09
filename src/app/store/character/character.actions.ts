import {Action} from "@ngrx/store";
import {Character} from "../../model/character.model";

export const CHARACTERS_LOADING = '[Character] CHARACTERS_LOADING';
export const CHARACTERS_LOADED = '[Character] CHARACTERS_LOADED';
export const EPISODES_LOADED = '[Character] EPISODES_LOADED';
export const CHARACTERS_ERROR = '[Character] CHARACTERS_ERROR';
export const DELETE_CHARACTER = '[Character] DELETE_CHARACTER';
export const UPDATE_CHARACTER = '[Character] UPDATE_CHARACTER';
export const FILTER_CHARACTERS = '[Character] FILTER_CHARACTERS';

export class CharactersLoading implements Action {
  readonly type = CHARACTERS_LOADING;
}

export class CharactersLoaded implements Action {
  readonly type = CHARACTERS_LOADED;

  constructor(public payload: Character[]) {
  }
}

export class EpisodesLoaded implements Action {
  readonly type = EPISODES_LOADED;

  constructor(public payload: Character[]) {
  }
}

export class CharactersError implements Action {
  readonly type = CHARACTERS_ERROR;
}

export class DeleteCharacter implements Action {
  readonly type = DELETE_CHARACTER;

  constructor(public payload: number) {
  }
}

export class UpdateCharacter implements Action {
  readonly type = UPDATE_CHARACTER;

  constructor(public payload: { id: number, updatedCharacter: Character }) {
  }
}

export class FilterCharacters implements Action {
  readonly type = FILTER_CHARACTERS;

  constructor(public payload: {nameFilter: string | null, genderFilter: string | null, statusFilter: string | null}) {
  }
}


export type CharacterActions =
  CharactersLoading
  | CharactersLoaded
  | CharactersError
  | DeleteCharacter
  | UpdateCharacter
  | EpisodesLoaded
  | FilterCharacters;
