import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user.model';
import sortBy from 'sortBy';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public avaliar: number;
  public userInfo = {};
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  Users = [];

  constructor(
    public authService: AuthService,
    public firestore: AngularFirestore,
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
          this.Users.sort(sortBy('-avaliacao'));
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
      console.log(res);
    });
  }

  initAvaliacao(user) {
    user.isRate = true;
    user.Avaliar = user.avaliacao;
  }

  adicionarValor(valor: number) {
    this.avaliar = valor;
  }

  avaliarMecanico(userId) {
    let avaliado = {};
    avaliado['avaliacao'] = userId.Avaliar + this.avaliar;
    this.authService.updateUsuario(userId.email, avaliado);
    userId.isRate = false;
  }
}