import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public userInfo = {};
  Posts = [];
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));

  constructor(
    public authService: AuthService,
    ) {}

}
