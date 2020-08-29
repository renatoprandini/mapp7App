import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../../models/post.model';

import * as firebase from 'firebase';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  text: string;
  chatRef: any;
  uid: string;

  public key: any;
  public email: any;
  public userInfo = {};
  Posts = [];

  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  options = false;



  public userInfo2 = {};
  public photo = {};

  constructor(
    private pstService: PostService,
    private authService: AuthService,
    public firestore: AngularFirestore

  ) {

    this.uid = localStorage.getItem('userid');
    this.chatRef = this.firestore.collection('chats', ref => ref.orderBy('Timestamp')).valueChanges();


  }

  send() {
    if (this.text != '') {
      this.firestore.collection('chats').add({
        name: this.userInfo['primeiroNome'],
        message: this.text,
        userId: this.userLocal.email,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    this.text = '';
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