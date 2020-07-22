import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.page.html',
  styleUrls: ['./update-post.page.scss'],
})
export class UpdatePostPage implements OnInit {
  updatePostForm: FormGroup;
  id: any;

  constructor(
    private pstService: PostService,
    private authService: AuthService,
    public firestore: AngularFirestore,
    public fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.updatePostForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      localizacao: [''],
      urgente: [''],
    })
    console.log(this.updatePostForm.value)
  }

  deleteProblema(id) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.pstService.deletePost(id);
    }
  }

  updatePost() {
    this.pstService.updatePost(this.id, this.updatePostForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }
}
