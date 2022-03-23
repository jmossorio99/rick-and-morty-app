import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as CharacterActions from '../store/character/character.actions';
import { Character } from '../model/character.model';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('nameFilterRef') nameFilterRef: QueryList<any>;
  nameFilterSub: Subscription;
  error: boolean;
  loading: boolean;
  characters: Character[];
  characterSub: Subscription;
  idToDelete: number;
  showAlert: boolean = false;
  nameFilter = '';
  statusFilter = 'Status';
  statusFilterOptions = [
    { value: '', viewValue: 'All' },
    { value: 'Alive', viewValue: 'Alive' },
    { value: 'Dead', viewValue: 'Dead' },
    { value: 'unknown', viewValue: 'unknown' },
  ];
  genderFilter = 'Gender';
  genderFilterOptions = [
    { value: '', viewValue: 'All' },
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
    { value: 'Genderless', viewValue: 'Genderless' },
    { value: 'Unknown', viewValue: 'Unknown' },
  ];
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.characterSub = this.store
      .select('character')
      .subscribe((characterState) => {
        this.error = characterState.error;
        this.loading = characterState.loading;
        this.characters = characterState.filteredCharacters;
      });
    if (this.characters.length === 0) {
      this.store.dispatch(new CharacterActions.CharactersLoading());
    }
  }

  ngAfterViewInit(): void {
    this.nameFilterRef.changes.subscribe((inputs: QueryList<ElementRef>) => {
      this.nameFilterSub = fromEvent(inputs.first.nativeElement, 'keyup')
        .pipe(debounceTime(200))
        .subscribe(() => this.onFilter());
    });
  }

  onDelete(id: number) {
    this.showAlert = true;
    this.idToDelete = id;
  }

  onFilter() {
    const filters = {
      nameFilter: this.nameFilter,
      statusFilter:
        this.statusFilter !== 'Status' && this.statusFilter !== ''
          ? this.statusFilter
          : null,
      genderFilter:
        this.genderFilter !== 'Gender' && this.genderFilter !== ''
          ? this.genderFilter
          : null,
    };
    this.store.dispatch(new CharacterActions.FilterCharacters(filters));
  }

  onClose(choice: string) {
    if (choice === 'accept' && this.idToDelete) {
      this.store.dispatch(
        new CharacterActions.DeleteCharacter(this.idToDelete)
      );
    }
    this.showAlert = false;
  }

  ngOnDestroy(): void {
    if (this.nameFilterSub) {
      this.nameFilterSub.unsubscribe();
    }
    if (this.characterSub) {
      this.characterSub.unsubscribe();
    }
  }
}
