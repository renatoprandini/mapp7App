import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})
export class ChangeNamePage implements OnInit {

  nomeForm: FormGroup;
  PnomeValue: String;
  UnomeValue: String;

  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));

  validationsMSG = {
    primeiroNome: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'maxlength', message: 'O nome pode ter no máximo 15 caracteres.' }
    ],
    ultimoNome: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'maxlength', message: 'O sobrenome pode ter no máximo 15 caracteres.' }
    ],
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
    this.nomeForm = this.fb.group({
      primeiroNome: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      ultimoNome: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
    });


  }

  async changeName() {
    this.PnomeValue = this.nomeForm.value.primeiroNome;
    this.UnomeValue = this.nomeForm.value.ultimoNome;
    if(this.PnomeValue === null && this.UnomeValue === null) {
      this.showMessage('Os campos inseridos são inválidos.');
    } else {
      this.db.database.ref(`/users/${this.userLocal.email}/primeiroNome`).set(this.PnomeValue);
      this.db.database.ref(`/users/${this.userLocal.email}/ultimoNome`).set(this.UnomeValue);
      this.showMessage('Campos atualizados com sucesso!!!');
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
