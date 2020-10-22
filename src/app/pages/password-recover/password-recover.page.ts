import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.page.html',
  styleUrls: ['./password-recover.page.scss'],
})
export class PasswordRecoverPage implements OnInit {


  emailForm: FormGroup;
  emailValue: String;

  validationsMSG = {
    email: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'pattern', message: 'Insira um email valido.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private ngFireAuth: AngularFireAuth,
    private authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    });


  }


  async goToLogin() {
    this.navCtrl.navigateForward('login');
  }

   async passwordRecover() {
    this.emailValue = this.emailForm.value.email;
    if(this.emailValue === null) {
      this.showMessage('Este email é inválido.')
    } else {
      this.authService.PasswordRecover(this.emailValue);
    }

}


async showMessage(message: string) {
  await this.toastCtrl.create({ 
    message: message, 
    duration: 5000,
    cssClass: "toastError"  
  })
    .then((toastData) => {
      toastData.present();
    });
}

}
