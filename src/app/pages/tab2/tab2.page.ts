import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user.model';
import sortBy from 'sort-by';
import { database } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  
  public avaliar: number = 0;
  public userInfo = {};
  public media: number = 0;
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  Users = [];
  listaUsers = [];

  constructor(
    public authService: AuthService,
    public firestore: AngularFirestore,
    public db: AngularFireDatabase,
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

  /*  
    *ngIf="userInfo['tipo'] === 'cliente'"

  */

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

  initAvaliacao(user) {
    user.isRate = true;
  }

  adicionarValor(valor: number) {
    this.avaliar = valor;
  }

  avaliarMecanico(userId) {
    userId.avaliacao += this.avaliar;
    userId.email = userId.email.replace(/[.#$]+/g, ':') as String;

    userId.avaliacao as Number;
    userId.qtde++ as Number;
    userId.media as Number;
    userId.media = userId.avaliacao / userId.qtde;

    this.db.database.ref(`/users/${userId.email}/avaliacao`).set(userId.avaliacao);
    this.db.database.ref(`/users/${userId.email}/qtde`).set(userId.qtde);
    this.db.database.ref(`/users/${userId.email}/media`).set(userId.media);

    userId.isRate = false;


  }
}