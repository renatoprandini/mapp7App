import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public userInfo = {};
  Posts = [];
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));

  constructor(
    private pstService: PostService,
    private authService: AuthService,
    public firestore: AngularFirestore,
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

    
    /* this.pstService.readProblema().subscribe(data => {
      this.postList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          titulo: e.payload.doc.data()['titulo'],
          descricao: e.payload.doc.data()['descricao'],
          urgente: e.payload.doc.data()['urgente'],
          emailUsuario: e.payload.doc.data()['emailUsuario'],
        };
      });
      console.log(this.postList);
    }); */
  }

  deletePost(id) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.pstService.deletePost(id);
    }
  }

  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
      console.log(res);
    });
  }

  fetchPosts() {
    this.pstService.getPostList().valueChanges().subscribe(res => {
      console.log(res);
    });
  }



}
