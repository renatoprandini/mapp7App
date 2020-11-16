import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../models/user.model';
import { NavController, ToastController } from '@ionic/angular';
import { ComparacaoValidator } from '../../../validators/comparacao-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user: User;

  userForm: FormGroup;
  error = '';
  success = '';

  validationsMSG = {
    email: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'pattern', message: 'Insira um email valido.' }
    ],
    password: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'minlength', message: 'A senha deve ter pelo menos 5 caracteres' }
    ],
    confirm: [
      { type: 'required', message: '* Obrigatório'},
      { type: 'minlength', message: 'A senha deve ter pelo menos 5 caracteres'},
      { type: 'comparacao', message: 'As senhas devem ser iguais' }
    ],
    primeiroNome: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'maxlength', message: 'O nome pode ter no máximo 15 caracteres.' }
    ],
    ultimoNome: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'maxlength', message: 'O sobrenome pode ter no máximo 15 caracteres.' }
    ],
    displayName: [
      { type: 'required', message: '* Obrigatório' },
      { type: 'maxlength', message: 'O nome de usuário pode ter no máximo 15 caracteres.' }
    ]
  };

  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
  ) {} 

  ngOnInit(){

    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      confirm: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      primeiroNome: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      ultimoNome: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      displayName: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      tipo: [''],
      avaliacao: [0],
      media: [0],
      qtde: [0],
      photoURL: ['https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'],
    },
    {
      validator: ComparacaoValidator('password', 'confirm')
    },);

    
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


  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value, this.userForm.value)
    .then((res) => {
      this.authService.SendVerificationMail();
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      const delay = 500;
        setTimeout(() => {
          this.showMessage(error.message);
        }, delay);
      });
  }



}
