import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import * as CharacterActions from "./character.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {environment} from "../../../environments/environment";
import {Character} from "../../model/character.model";

interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: any;
    location: any;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }[];
}

interface EpisodeResponse {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

@Injectable()
export class CharacterEffects {
  constructor(private actions$: Actions, private http: HttpClient, router: Router) {
  }

  loadCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CharacterActions.CHARACTERS_LOADING),
      switchMap((characterAction: CharacterActions.CharactersLoading) => {
        return this.http.get<CharacterResponse>(`${environment.apiURL}/character`)
          .pipe(
            map(({results}) => {
              const characters = results.map(({
                                                id,
                                                name,
                                                status,
                                                species,
                                                gender,
                                                image,
                                                episode,
                                                created
                                              }) =>
                new Character(id, name, status, species, gender, image, new Date(created),
                  episode[0].split('/')[5]));
              return new CharacterActions.CharactersLoaded(characters);
            }),
            catchError(_ => {
              return of(new CharacterActions.CharactersError());
            })
          );
      })
    );
  });

  loadEpisodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CharacterActions.CHARACTERS_LOADED),
      switchMap((characterAction: CharacterActions.CharactersLoaded) => {
        const uniqueEpisodes = [...new Set(characterAction.payload.map(character => character.firstEpisode))];
        // Fetch episodes for each character
        const episodeNames: { [id: string]: string } = {};
        return this.http.get<EpisodeResponse[]>(`${environment.apiURL}/episode/${uniqueEpisodes.join(',')}`)
          .pipe(
            map(episodes => {
              episodes.forEach(episode => {
                episodeNames[episode.id] = episode.name;
              });
              return new CharacterActions.EpisodesLoaded(characterAction.payload.map(character => {
                return {
                  ...character,
                  firstEpisode: episodeNames[character.firstEpisode]
                };
              }));
            }),
            catchError(_ => {
              return of(new CharacterActions.CharactersError());
            })
          )
      })
    );
  })

}


