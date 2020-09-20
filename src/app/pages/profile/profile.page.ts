import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private userSubscription: Subscription;
  private post = {};
  id: string = null;

  paginator = 10;
  public n: number = 0;

  text: string;
  chatRef: any;
  uid: string;

  dados: any;


  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));

  public userInfo = {};
  constructor(private activeRoute: ActivatedRoute,
    private pstService: PostService,
    public firestore: AngularFirestore,
    private authService: AuthService) {

    this.uid = localStorage.getItem('user');
  }

  send() {
    if (this.text != '') {
      this.firestore.collection('chats').add({
        chat: this.id,
        name: this.userInfo['primeiroNome'],
        message: this.text,
		img: this.userInfo['foto'],
        data: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        userId: this.userLocal.email,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        options: false
      });
    }
    this.text = '';
  }

  ngOnInit() {
    this.fetchUsersByEmail();
    this.id = this.activeRoute.snapshot.params['id'];

    if (this.id) this.userProfile();
	
	this.chatRef = this.firestore.collection('chats', ref => ref.where("chat", "==", `${this.id}`).orderBy('Timestamp', 'desc').limit(this.paginator)).valueChanges();
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  deleteMsg() {
    this.firestore.doc(this.chatRef + '/' + this.id).delete();
  }

  userProfile() {
    this.userSubscription = this.pstService.getPost(this.id).valueChanges().subscribe(data => {
      this.post = data;
    });
  }

  adicionarPaginador() {
    this.n = this.n + 1;
    this.paginator = this.paginator + (this.n * 10);

  this.chatRef = this.firestore.collection('chats', ref => ref.where("chat", "==", `${this.id}`).orderBy('Timestamp', 'desc').limit(this.paginator)).valueChanges();
  }

  fetchUsersByEmail() {
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
    });
  }

}