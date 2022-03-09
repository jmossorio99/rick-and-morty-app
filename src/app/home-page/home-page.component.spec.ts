import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HomePageComponent } from './home-page.component';
import * as fromApp from '../store/app.reducer';

describe('Component: HomePage', () => {
  let fixture;
  let component: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [StoreModule.forRoot(fromApp.appReducer)],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });
});
