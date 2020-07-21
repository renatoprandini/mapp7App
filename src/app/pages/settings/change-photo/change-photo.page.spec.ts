import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangePhotoPage } from './change-photo.page';

describe('ChangePhotoPage', () => {
  let component: ChangePhotoPage;
  let fixture: ComponentFixture<ChangePhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
