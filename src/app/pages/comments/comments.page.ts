import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})

export class CommentsPage implements OnInit {
  
  private userSubscription: Subscription;
  private post = {};
  id: string = null;
  text: string;
  uid: string;
  tipo: string;
  dados: any;
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  public userInfo = {};
  chatRef: any = [];

  paginator = 10;
  public n: number = 0;
  public msgN: number = 0;

  constructor(private activeRoute: ActivatedRoute,
    private pstService: PostService,
    public firestore: AngularFirestore,
    private authService: AuthService) {

    this.uid = localStorage.getItem('user');

  }

  ngOnInit() {
    this.fetchUsersByEmail();
    this.id = this.activeRoute.snapshot.params['id'];

    if (this.id) this.userProfile();

    this.firestore.collection('chats', ref => ref.where('chat', '==', `${this.id}`)
      .orderBy('Timestamp', 'desc')
      .limit(this.paginator))
      .valueChanges()
      .subscribe(data => {
        this.chatRef = data;
      });
  }

  send() {
    if (this.text != '') {
      this.firestore.collection('chats').add({
        chat: this.id,
        name: this.userInfo['primeiroNome'],
        message: this.text,
        img: this.userInfo['photoURL'],
        tipo: this.userInfo['tipo'],
        data: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        userId: this.userLocal.email,
        Timestamp: new Date().toLocaleTimeString(),
        options: false
      });
    }
    this.text = '';
    this.msgN = this.msgN + 1;
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
    this.paginator = this.paginator + (this.n * 50);

    this.firestore.collection('chats', ref => ref.where('chat', '==', `${this.id}`)
      .orderBy('Timestamp', 'desc')
      .limit(this.paginator))
      .valueChanges()
      .subscribe(data => {
        this.chatRef = data;
      });
  }

  fetchUsersByEmail() {
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
    });
  }

  loadData(event) {
    setTimeout(() => {
      this.adicionarPaginador();
      event.target.complete();

      if (this.paginator === this.msgN || this.paginator > this.msgN) {
        event.target.disabled = true;
      }
    }, 800);

  }

}