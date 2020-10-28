import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../../models/post.model';

import * as firebase from 'firebase';

import { User } from 'src/app/models/user.model';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  text: string;
  chatRef: any;
  uid: string;
  user: User;
  Users = [];

  public key: any;
  public email: any;
  public userInfo = {};
  public postInfo = {};
  Posts = [];
  PostsId = [];
  public userInfo2 = {};
  public photo = {};

  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));

  @ViewChild('users', { static: true }) test;
  constructor(
    private pstService: PostService,
    private authService: AuthService,
    public firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private activeRoute: ActivatedRoute,
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) {}


  ngOnInit() {
    this.fetchUsersByEmail();
    this.fetchPosts();
    this.verifyLogin();

    const postRes = this.pstService.getPostList();
    postRes.snapshotChanges().subscribe(res => {
      this.Posts = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        // console.log(a);
        this.Posts.push(a as Post);
      });
    });
  }

  private async verifyLogin() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user !== null && this.user.emailVerified === true) {
      this.presentLoading('Aguarde um momento...');
      this.navCtrl.navigateRoot('tabs/tab1');
    } else {
      this.showMessage('Algo deu errado, tente novamente mais tarde...');
    }
  }

  async fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
      await this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe( async res => {
      this.userInfo = res;
      this.userInfo2 = res;
      this.photo = res;

      console.log(res);

      localStorage.setItem('user', JSON.stringify(res));
    });
  }

  fetchPosts() {
    this.pstService.getPostList().valueChanges().subscribe(res => {
      this.postInfo = res;
      console.log(res);
    });
  }

  async showMessage(message: string) {
    await this.toastCtrl.create({
      message: message,
      duration: 5000,
      cssClass: "toastError"
    })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
  }

  async showAlertDeletePost(id: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Você tem certeza que deseja excluir o post?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: () => {
            this.pstService.deletePost(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentLoading(msg: string) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'load',
      message: msg,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  // deletePost(id: string) {
  //   if (this.showAlert) {
  //     this.pstService.deletePost(id);
  //   }
  // }
}