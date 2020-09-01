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

  validationsMSG = {
    email: [
      { type: 'required', message: 'O campo email é obrigatório' },
      { type: 'pattern', message: 'Insira um email válido.' }
    ],
    password: [
      { type: 'required', message: 'O campo senha é obrigatório' },
      { type: 'minlength', message: 'É obrigatório a senha com mais de 5 caracteres.' }
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
  ) {}

  ngOnInit(
  ) {

    this.validations = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  async showMessage(message: string) {
    await this.toastCtrl.create({ message: message, duration: 4000 })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
  }

  async goToSignup() {
    this.navCtrl.navigateForward('signup');
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        this.router.navigate(['/tabs/tab1']);
         if (this.authService.isEmailVerified) {
          this.router.navigate(['tabs']);
        } else {
          window.alert('Email não verificado');
          return false;
        } 
      }).catch((error) => {
        if (error.message === 'Cannot read property \'emailVerified\' of null') {
          this.logIn(email.value, password.value);
        }
        console.log(error.message);
      });
  }

}


