import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  userInfo:any;
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  Users = [];
  listaUsers = [];

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.fetchUsersByEmail();
    this.fetchUsers();

    const userRes = this.authService.readUsuarioList();
    userRes.snapshotChanges().subscribe(res => {
      this.Users = [];
      res.forEach(item => {
        let teste = item.payload.toJSON();
        teste['$key'] = item.key;
        if (teste['tipo'] === 'mecanico') {
          this.Users.sort((a, b) => {
            if (a.media > b.media) {
              return -1;
            }
            if (a.media < b.media) {
              return 1;
            }
            return 0;
          });
          this.Users.push(teste as User);
        } else {
          return
        }
      });
    });

  }

  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;


    });
  }

  fetchUsers() {
    this.authService.readUsuarioList().valueChanges().subscribe(res => {
      this.listaUsers = res;
    });
  }
}