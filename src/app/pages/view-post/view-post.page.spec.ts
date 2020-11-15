import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPostPage } from './view-post.page';

describe('ViewPostPage', () => {
  let component: ViewPostPage;
  let fixture: ComponentFixture<ViewPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
