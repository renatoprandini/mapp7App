import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../../models/post.model';

import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 

  public key: any;
  public email: any;
  public userInfo = {};
  Posts = [];

  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  public userInfo2 = {};
  public photo = {};

  @ViewChild('users', { static: true }) test;
  constructor(
    private pstService: PostService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    public firestore: AngularFirestore

  ) {
    
  }


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


  deletePost(id: string) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.pstService.deletePost(id);
    }
  }

  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
      this.userInfo2 = res;
      this.photo = res;
    });
  }


  fetchPosts() {
    this.pstService.getPostList().valueChanges().subscribe(res => {
      console.log(res);
    });
  }
}