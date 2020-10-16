import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeDisplaynamePage } from './change-displayname.page';

describe('ChangeDisplaynamePage', () => {
  let component: ChangeDisplaynamePage;
  let fixture: ComponentFixture<ChangeDisplaynamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDisplaynamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeDisplaynamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
