import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  postListRef: AngularFireList<any>;
  postRef: AngularFireObject<any>;
  postId: String;

  collectionName = 'Problemas';

  constructor(
    public firestore: AngularFirestore,
    public db: AngularFireDatabase,
    private activeRoute: ActivatedRoute
  ) { 

    this.postId = this.activeRoute.snapshot.params['id'];
  }

  createPost(pst: Post) {
    return this.postListRef.push({
      titulo: pst.titulo,
      descricao: pst.descricao,
      endereco: pst.endereco,
      urgente: pst.urgente,
      displayName: pst.displayName,
      emailUsuario: pst.emailUsuario,
      fotoUsuario: pst.fotoUsuario,
      dataPost: pst.dataPost,
      timePost: pst.timePost,
      options: pst.options,
	  avaliado:pst.avaliado
    })
  }

  getPost(id: string) {
    this.postRef = this.db.object('/post/' + id);
    return this.postRef;
  }


  getPostList() {
    this.postListRef = this.db.list('/post');
    return this.postListRef;
  }


  updatePost(id, pst: Post) {

    this.postRef = this.db.object('/post/' + id);
    return this.postRef.update({
      titulo: pst.titulo,
      descricao: pst.descricao,
      endereco: pst.endereco,
      urgente: pst.urgente,
      dataPost: pst.dataPost,
      timePost: pst.timePost
    });
  }


  deletePost(id: string) {
    this.postRef = this.db.object('/post/' + id);
    this.postRef.remove();
  }
}