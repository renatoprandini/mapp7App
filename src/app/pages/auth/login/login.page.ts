import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loading: any;



  constructor(
    public authService: AuthService,
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit(
    
  ) {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        this.router.navigate(['']);
        /* if (this.authService.isEmailVerified) {
          this.router.navigate(['tabs']);
        } else {
          window.alert('Email is not verified');
          return false;
        } */
      }).catch((error) => {
        window.alert(error.message);
      });
  }

}


