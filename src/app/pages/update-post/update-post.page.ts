import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.page.html',
  styleUrls: ['./update-post.page.scss'],
})
export class UpdatePostPage implements OnInit {

  updatePostForm: FormGroup;
  id: any;
  postId: string;

  constructor(
    private pstService: PostService,
    private authService: AuthService,
    public firestore: AngularFirestore,
    public fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.postId = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.updatePostForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      endereco: [''],
      urgente: [''],
      dataPost: new Date().toLocaleDateString(),
      timePost: new Date().toLocaleTimeString()
    });

  }

  updatePosts() {

    this.pstService.updatePost(this.postId, this.updatePostForm.value)
      .then(() => {
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(error => console.log(error));
  }

  
  // deleteProblema(id) {
  //   console.log(id);
  //   if (window.confirm('Do you really want to delete?')) {
  //     this.pstService.deletePost(this.postId);
  //   }
  // }
}
