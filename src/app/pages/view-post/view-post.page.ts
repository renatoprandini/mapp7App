import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})

export class ViewPostPage implements OnInit {
  private postSubscription: Subscription;
  private userSubscription: Subscription;
  public post = {};
  private user = {};
  private id: string = null;
  private mecanico: string = null;

  public avaliar: number = 0;
  public media: number = 0;

  public userInfo = {};
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
    private db: AngularFireDatabase,
    public alertController: AlertController) { }

  ngOnInit() {
    this.fetchUsersByEmail();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.mecanico = this.activatedRoute.snapshot.params['mecanico'];

    if (this.id) this.dadosPost();
    if (this.mecanico) this.dadosMecanico();
  }
  
  ngOnDestroy() {
    if (this.postSubscription) this.postSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  dadosPost() {
    this.postSubscription = this.postService.getPost(this.id).valueChanges().subscribe(data => {
      this.post = data;
    });
  }

  dadosMecanico() {
    this.userSubscription = this.authService.readUsuarioByEmail(this.mecanico).valueChanges().subscribe(data => {
      this.user = data;
    });
  }

  initAvaliacao(user) {
    user['isRate'] = true;
  }

  adicionarValor(valor: number) {
    this.avaliar = valor;
  }

  avaliarMecanico(userId) {
    userId.avaliacao += this.avaliar;
    userId.avaliacao as Number;
    userId.qtde++ as Number;
    userId.media as Number;
    userId.media = userId.avaliacao / userId.qtde;
	
    let teste = true;

    this.db.database.ref(`/users/${this.mecanico}/avaliacao`).set(userId.avaliacao);
    this.db.database.ref(`/users/${this.mecanico}/qtde`).set(userId.qtde);
    this.db.database.ref(`/users/${this.mecanico}/media`).set(userId.media);
    this.db.database.ref(`/post/${this.id}/avaliado`).set(teste);
    
    userId['isRate'] = false;
    this.router.navigate(['/tabs/tab1']);
  }

  async alertAvaliacao(user) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Avaliar o usuário ' + this.user['primeiroNome'] + ' ' + this.user['ultimoNome'] + ' e concluir o problema?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: () => {
            this.avaliarMecanico(user);
          }
        }
      ]
    });
    await alert.present();
  }

  fetchUsersByEmail() {
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
    });
  }
}