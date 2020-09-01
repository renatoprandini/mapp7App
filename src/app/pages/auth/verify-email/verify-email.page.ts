import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async goToLogin() {
    // Navega para a página 'singup'
    this.navCtrl.navigateForward('login');
  }

  verificationMail() {
    this.fireAuth.auth.currentUser.sendEmailVerification();
  }

}
