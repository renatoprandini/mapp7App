import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  postListRef: AngularFireList<any>;
  postRef: AngularFireObject<any>;

  collectionName = 'Problemas';

  constructor(
    public firestore: AngularFirestore,
    public db: AngularFireDatabase,
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
      localizacao: pst.localizacao,
      urgente: pst.urgente,
      emailUsuario: pst.emailUsuario
    })
  }


  // Get Single
  getPost(id: string) {
    this.postRef = this.db.object('/post/' + id);
    return this.postRef;
  }

  // Get List
  getPostList() {
    this.postListRef = this.db.list('/post');
    return this.postListRef;
  }

  // Update
  updatePost(id, pst: Post) {
    return this.postRef.update({
      titulo: pst.titulo,
      descricao: pst.descricao,
      imagem: pst.imagem,
      localizacao: pst.localizacao,
      urgente: pst.urgente,
      emailUsuario: pst.emailUsuario
    })
  }

  // Delete
  deletePost(id: string) {
    this.postRef = this.db.object('/post/' + id);
    this.postRef.remove();
  }


}