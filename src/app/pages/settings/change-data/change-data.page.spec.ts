import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeDataPage } from './change-data.page';

describe('ChangeDataPage', () => {
  let component: ChangeDataPage;
  let fixture: ComponentFixture<ChangeDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
