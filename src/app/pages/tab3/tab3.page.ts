import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';





@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  user: User;
  public userInfo = {};
  public userInfo2= {};
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  public photo = {};


  
  

  constructor(
    public authService: AuthService,
    public firestore: AngularFirestore,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.fetchUsersByEmail();

  }

  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
      this.userInfo2 = res;
      this.photo = res;
    });
  }



 










  

  }

  
  


