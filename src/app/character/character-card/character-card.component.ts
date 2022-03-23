import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../model/character.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CharacterActions from '../../store/character/character.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character;
  @Output() onDelete = new EventEmitter<number>();

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {}

  getButtonStyles() {
    return {
      'background-color':
        this.character.status === 'Dead' ? '#f64747' : '#00b4d8',
    };
  }

  getStatusCircle() {
    return this.character.status === 'Dead'
      ? '🔴'
      : this.character.status === 'Alive'
      ? '🟢'
      : '⚪';
  }

  onActionClicked() {
    this.character.status === 'Dead'
      ? this.onDelete.emit(this.character.id)
      : this.router.navigate([`${this.character.id}/edit`]);
  }
}
