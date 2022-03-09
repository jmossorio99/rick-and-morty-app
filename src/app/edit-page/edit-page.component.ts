import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Character } from '../model/character.model';
import * as fromApp from '../store/app.reducer';
import * as CharacterActions from '../store/character/character.actions';
import { Store } from '@ngrx/store';
import { map, mergeMap, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  character: Character;
  // @ts-ignore
  characterSub: Subscription;
  datePipe: DatePipe = new DatePipe('en-US');
  statusOptions = [
    { value: 'Alive', viewValue: 'Alive' },
    { value: 'Dead', viewValue: 'Dead' },
    { value: 'unknown', viewValue: 'unknown' },
  ];
  genderOptions = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
    { value: 'Genderless', viewValue: 'Genderless' },
    { value: 'Unknown', viewValue: 'Unknown' },
  ];

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.characterSub = this.route.params
      .pipe(
        mergeMap((params: Params) =>
          this.store
            .select('character')
            .pipe(
              map((characterSlice) =>
                characterSlice.characters.find(
                  (character) => character.id === +params['id']
                )
              )
            )
        )
      )
      .subscribe((character) => {
        // @ts-ignore
        this.character = character;
        if (!this.character) this.router.navigate(['/']);
        this.initForm();
      });
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.character?.name, Validators.required),
      status: new FormControl(this.character?.status, Validators.required),
      species: new FormControl(this.character?.species, Validators.required),
      gender: new FormControl(this.character?.gender, Validators.required),
      creationDate: new FormControl(
        this.datePipe.transform(this.character?.created, 'yyyy-MM-dd'),
        Validators.required
      ),
      episode: new FormControl({
        value: this.character?.firstEpisode,
        disabled: true,
      }),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.store.dispatch(
      new CharacterActions.UpdateCharacter({
        id: this.character.id,
        updatedCharacter: new Character(
          this.character.id,
          this.form.value.name,
          this.form.value.status,
          this.form.value.species,
          this.form.value.gender,
          this.character.imageURL,
          new Date(this.form.value.creationDate),
          this.character.firstEpisode
        ),
      })
    );
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.characterSub.unsubscribe();
  }
}
