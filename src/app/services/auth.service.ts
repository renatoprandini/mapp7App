import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userRef: AngularFireObject<any>;
  userListRef: AngularFireList<any>;
  user: any;
  userData: any;
  collectionName = 'Usuarios';

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
        const userInfo = JSON.parse(localStorage.getItem('user'));
        userInfo.email = userInfo.email.replace(/[.#$]+/g, ':');
        this.db.object(`/users/${userInfo.email}`).set(user);
      })
      .catch(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        userInfo.email = userInfo.email.replace(/[.#$]+/g, ':');
        this.db.object(`/users/${userInfo.email}`).set(user);
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
    })
  }

  SetUserData(user) {
    const userData: User = {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      primeiroNome: user.primeiroNome,
      ultimoNome: user.ultimoNome,
      tipo: user.tipo,
      avaliacao: user.avaliacao
    };
    const delay = 1000;
    setTimeout(() => {
      const userLocal = JSON.parse(localStorage.getItem('user'));
      userLocal.email = userLocal.email.replace(/[.#$]+/g, ':');
      this.db.object(`/users/${userLocal.email}/settings`).set(userData);
    }, delay);
  }

  SetUserEmail(name) {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    const userData: User = {
      id: userLocal.id,
      email: userLocal.email,
      emailVerified: userLocal.emailVerified,
      photoURL: userLocal.photoURL,
      primeiroNome: userLocal.primeiroNome,
      ultimoNome: userLocal.ultimoNome,
      tipo: userLocal.tipo,
      avaliacao: userLocal.avaliacao
    };
    const delay = 1000;
    setTimeout(() => {
      userLocal.email = userLocal.email.replace(/[.#$]+/g, ':');
      this.db.object(`/users/${userLocal.email}/settings`).set(userData);
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

  
  // AuthLogin(provider) {
  //   return this.ngFireAuth.signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       })
  //       this.SetUserData(result.user);
  //     }).catch((error) => {
  //       window.alert(error)
  //     })
  // }
  
  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`Usuarios/${user.uid}`);
  //   const userData: User = {
	//   id: user.id,
  //     email: user.email,
  //     emailVerified: user.emailVerified,
  //     primeiroNome: user.primeiroNome,
  //     ultimoNome: user.ultimoNome,
  //     tipo: user.tipo,
  //     photoURL: user.photoURL,
  //     avaliacao: user.avaliacao
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }
  updateUsuario(userId, user) {
    this.firestore.doc(this.collectionName + '/' + userId).update(user);
  }

  // deleteUsuario(userId) {
  //   this.firestore.doc(this.collectionName + '/' + userId).delete();
  // }
}