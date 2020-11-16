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

  async showAlertDeleteAccount() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Você tem certeza que deseja excluir sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: () => {
            this.authService.deleteUsuario(this.userLocal.email);
          }
        }
      ]
    });
  
    await alert.present();
  }

}
