import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  userData: User;
  userForm: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
  ) {
    this.userData = {} as User;
  }

  ngOnInit(){
    this.userForm = this.fb.group({
      email: [''],
      primeiroNome: [''],
      ultimoNome: [''],
      tipo: [''],
    });
  }

  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value, this.userForm.value)
    .then((res) => {
      this.userForm.reset();
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
      window.alert(error.message);
    })
}



}