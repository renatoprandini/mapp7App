import { Component, OnInit } from '@angular/core';
import { Tab1Page } from '../../pages/tab1/tab1.page';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  
  public userInfo = {};
  Posts = [];
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  
  constructor(
    private pstService: PostService,
    private authService: AuthService,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.fetchUsersByEmail();
    this.fetchPosts();

    const postRes = this.pstService.getPostList();
    postRes.snapshotChanges().subscribe(res => {
      this.Posts = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Posts.push(a as Post);
      });
    });
  }

  deletePost(id) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.pstService.deletePost(id);
    }
  }

  fetchUsersByEmail() {
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
    });
  }
  
  fetchPosts() {
    this.pstService.getPostList().valueChanges().subscribe(res => {
    });
  }
}