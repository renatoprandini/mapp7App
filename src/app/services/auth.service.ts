import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userRef: AngularFireObject<any>;
  userListRef: AngularFireList<any>;
  user: any;
  userData: any;
  collectionName = '/users';

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public firestore: AngularFirestore,
    public db: AngularFireDatabase,
  ) {

    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  RegisterUser(email, password, user) {

    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.SetUserData(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async SendVerificationMail() {
    return (await this.ngFireAuth.currentUser).sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        return true;
      }).catch(() => {
        return false;
      });
  }

  SignOut() {
    return this.ngFireAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      }).catch(() => {
        this.router.navigate(['login']);
      });
  }

  SetUserData(user) {
    const userData: User = {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      primeiroNome: user.primeiroNome,
      ultimoNome: user.ultimoNome,
      displayName: user.displayName,
      tipo: user.tipo,
      avaliacao: user.avaliacao,
      qtde: user.qtde,
      media: user.media
    };
    const delay = 1000;
    setTimeout(() => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      userInfo.email = userInfo.email.replace(/[.#$]+/g, ':');
      this.db.object(`/users/${userInfo.email}`).set(user);
    }, delay);
  }

  readUsuarioList() {
    this.userListRef = this.db.list(`/users`);
    return this.userListRef;
  }

  readUsuarioByEmail(userEmail) {
    this.userRef = this.db.object(`/users/${userEmail}`);
    return this.userRef;
  }

  readUsuarioById(userId) {
    this.userRef = this.db.object(`/users/${userId}`);
    return this.userRef;
  }

  updateUsuario(userId, user) {
    console.log(this.collectionName);
    this.db.database.ref(`${this.collectionName}/${userId}`).update(user);
  }

  async deleteUsuario(userEmail) {
    this.db.database.ref(`${this.collectionName}/${userEmail}`).remove();
    return (await this.ngFireAuth.currentUser).delete()
      .then(() => {
        console.log('Usuário excluído com sucesso');
        this.router.navigate(['login']);
      });
  }

}