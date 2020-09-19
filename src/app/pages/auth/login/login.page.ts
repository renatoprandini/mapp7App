import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loading: any;
  user: any;
  validations: FormGroup;
  errorMessage = '';
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  userInfo = {};

  validationsMSG = {
    email: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'pattern', message: 'Insira um email válido.' }
    ],
    password: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'minlength', message: '* Obrigatório: acima de 5 caracteres.' }
    ]
  };

  constructor(
    public authService: AuthService,
    public router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(
  ) {

    this.validations = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.verifyLogin();
  }

  private async verifyLogin() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user !== null && this.user.emailVerified === true) {
      this.presentLoading('Aguarde um momento...');
      this.navCtrl.navigateRoot('tabs/tab1');
    }
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

  async goToSignup() {
    this.navCtrl.navigateBack('signup');
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          const delay = 500;
          setTimeout(() => {
            this.router.navigate(['tabs/tab1']);
          }, delay);
        } else {
          this.showMessage('Seu email não foi verificado!!!');
          return false;
        }
      }).catch((error) => {
        if (error.message === 'Cannot read property \'emailVerified\' of null') {
          this.logIn(email, password);
        }
        console.log(error.message);
      });
  }

  async presentLoading(msg: string) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'load',
      message: msg,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Autenticação cancelada!');
  }

  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
      console.log(res);
    });
  }

}


