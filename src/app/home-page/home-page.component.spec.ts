import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HomePageComponent } from './home-page.component';
import * as fromApp from '../store/app.reducer';
import { SpinnerComponent } from '../ui/spinner/spinner.component';

describe('Component: HomePage', () => {
  let fixture: ComponentFixture<HomePageComponent>;
  let component: HomePageComponent;
  let storeMock;
  beforeEach(async () => {
    storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
    };
    await TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeMock }],
      declarations: [HomePageComponent, SpinnerComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
  });

  describe('onDelete()', () => {
    it('showAlert should be true', () => {
      component.onDelete(1);
      expect(component.showAlert).toBeTrue();
    });
    it('idToDelete should be 1', () => {
      component.onDelete(1);
      expect(component.idToDelete).toBe(1);
    });
  });

  // describe('onFilter()', () => {
  //   it("nameFilter should be 'test'", () => {
  //     component.nameFilter = 'test';
  //     component.onFilter();
  //   });
  // });

  describe('onClose()', () => {
    it('showAlert is false', () => {
      component.onClose('');
      expect(component.showAlert).toBeFalse();
    });
    it("choice is not 'accept', dispatch does not get called", () => {
      component.idToDelete = 1;
      component.onClose('');
      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });
    it('no idToDelete, dispatch does not get called', () => {
      component.idToDelete = null;
      component.onClose('accept');
      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });
    it('dispatch does get called', () => {
      component.idToDelete = 1;
      component.onClose('accept');
      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
