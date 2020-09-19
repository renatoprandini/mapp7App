import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';





@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  user: User;
  public userInfo = {};
  public userInfo2 = {};
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  public photo = {};





  constructor(
    public authService: AuthService,
    public firestore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.fetchUsersByEmail();

  }

  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
      this.userInfo2 = res;
      this.photo = res;
    });
  }

  onClick(event) {
    if (event.detail.checked) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

}