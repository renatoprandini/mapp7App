import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public userInfo = {};
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));


  constructor(
    public authService: AuthService,
    public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
      this.fetchUsersByEmail();
    }

    fetchUsersByEmail() {
      // Pega os valores do caminho os subscreve no 'res'
      this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
        this.userInfo = res;
      });
    }


}
