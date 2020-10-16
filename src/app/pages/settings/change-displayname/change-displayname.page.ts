import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-displayname',
  templateUrl: './change-displayname.page.html',
  styleUrls: ['./change-displayname.page.scss'],
})
export class ChangeDisplaynamePage implements OnInit {

  dpForm: FormGroup;
  dpValue: String;

  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));

  validationsMSG = {
    displayName: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'maxlength', message: 'O nome de usuário pode ter no máximo 15 caracteres.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private ngFireAuth: AngularFireAuth,
    private authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    private toastCtrl: ToastController,
    public db: AngularFireDatabase,
  ) { }

  ngOnInit() {

    this.dpForm = this.fb.group({
      displayName: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
    });

}

async changeDP() {
  this.dpValue = this.dpForm.value.displayName;

  if(this.dpValue === null) {
    this.showMessage('Os campo inserido é inválido.')
  } else {
    this.db.database.ref(`/users/${this.userLocal.email}/displayName`).set(this.dpValue);
    this.showMessage('Campos atualizados com sucesso!!!')
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