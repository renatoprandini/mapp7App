import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));

  constructor(
    public authService: AuthService,
    public router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }


  async removerConta() {
    await this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.authService.deleteUsuario(this.userLocal.email);
          }
        }
      ]
    });

    await alert.present();

  }

}
