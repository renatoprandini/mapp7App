import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  public userInfo = {};
  public userInfo2= {};
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));

  constructor(
    public authService: AuthService,
    public firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.fetchUsersByEmail();
  }

  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
      this.userInfo2 = res;
    });
  }
  

}
