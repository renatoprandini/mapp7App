import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';



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
  
  constructor(
    private pstService: PostService,
    private router: Router,
    public fb: FormBuilder,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
    this.postData = {} as Post;
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      imagem: [''],
      urgente: [''],
      emailUsuario: this.userEmail.email,
      dataPost: new Date().toLocaleDateString(),
      timePost: new Date().toLocaleTimeString(),
	  options: null
    });
  }

  formSubmit() {
    if (!this.postForm.valid) {
      return false;
    } else {
      this.pstService.createPost(this.postForm.value).then(res => {
        console.log(res)
        this.postForm.reset();
        this.router.navigate(['/tabs']);
      })
        .catch(error => console.log(error));
    }
  }



}
