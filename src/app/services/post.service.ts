import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  postListRef: AngularFireList<any>;
  postRef: AngularFireObject<any>;

  collectionName = 'Problemas';

  constructor(
    public firestore: AngularFirestore,
    public db: AngularFireDatabase
  ) { }


  /*createProblema(post) {
    return this.firestore.collection(this.collectionName).add(post);
  }

  readProblema() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  readProblemaById(postId) {
    return this.firestore.collection(this.collectionName + '/' + postId).snapshotChanges();
  }

  updateProblema(postId, post) {
    this.firestore.doc(this.collectionName + '/' + postId).update(post);
  }

  deleteProblema(postId) {
    this.firestore.doc(this.collectionName + '/' + postId).delete();
  } */


  // Create

  createPost(pst: Post) {
    return this.postListRef.push({
      titulo: pst.titulo,
      descricao: pst.descricao,
      imagem: pst.imagem,
      urgente: pst.urgente,
      displayName: pst.displayName,
      emailUsuario: pst.emailUsuario,
      fotoUsuario: pst.fotoUsuario,
      dataPost: pst.dataPost,
      timePost: pst.timePost,
      options: pst.options
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
    return this.postRef.update({
      titulo: pst.titulo,
      descricao: pst.descricao,
      urgente: pst.urgente,
      dataPost: pst.dataPost,
      timePost: pst.timePost
    })
  }


  deletePost(id: string) {
    this.postRef = this.db.object('/post/' + id);
    this.postRef.remove();
  }

}