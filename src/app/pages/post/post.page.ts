import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})

export class PostPage implements OnInit {

  postData: Post;
  postForm: FormGroup;
  userData: User;
  userEmail = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  userFoto = JSON.parse(localStorage.getItem('user'));
  public userInfo = {};
  pickNome: string;
  pickSobrenome: string;

  constructor(
    private pstService: PostService,
    private router: Router,
    public fb: FormBuilder,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.postData = {} as Post;
  }

  ngOnInit() {
    this.fetchUsersByEmail();

    console.log(this.userInfo);

    this.postForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      endereco: [''],
      urgente: [''],
      displayName: this.userLocal.displayName,
      emailUsuario: this.userLocal.email,
      fotoUsuario: this.userFoto.photoURL,
      dataPost: new Date().toLocaleDateString(),
      timePost: new Date().toLocaleTimeString(),
      options: null,
      avaliado: false
    });


  }

  formSubmit() {
    if (!this.postForm.valid) {
      return false;
    } else {
      this.pstService.createPost(this.postForm.value).then(res => {
        console.log(res)
        this.postForm.reset();
        this.router.navigate(['/tabs/tab1']);
      })
        .catch(error => console.log(error));
    }
  }

  fetchUsersByEmail() {
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
    });
  }





}
