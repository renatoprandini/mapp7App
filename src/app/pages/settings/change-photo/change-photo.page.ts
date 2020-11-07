import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';




@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.page.html',
  styleUrls: ['./change-photo.page.scss'],
})
export class ChangePhotoPage implements OnInit {

  user: User;
  photoURL: any;
  pickUrl: string;
  userRef: AngularFireObject<any>;
  teste: string;

  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  userInfo = {};



  constructor(
    public authService: AuthService,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage,
    private toastCtrl: ToastController,
    public db: AngularFireDatabase,

  ) { }

  ngOnInit() {
    this.fetchUsersByEmail();
  }



  async openGalery() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try {
      const fileUri: string = await this.camera.getPicture(options);

      let file: string;

      if (this.platform.is('ios')) {
        file = fileUri.split('/').pop();
      } else {
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'));
      }

      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);

      const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });

      this.uploadPicture(blob);

    } catch (error) {
      console.error(error);
    }
  }


  uploadPicture(blob: Blob) {
    const ref = this.afStorage.ref(`users/${this.userLocal.email}`);
    const task = ref.put(blob);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(data => {
          console.log(`URL: ${data}`);
          this.pickUrl = data;
          this.userLocal.photoURL = this.pickUrl;
          this.db.database.ref(`/users/${this.userLocal.email}/photoURL`).set(this.pickUrl);
          this.authService.SetUserData(this.user);
        });
      })
    ).subscribe();


  }

  async showMessage(message: string) {
    await this.toastCtrl.create({
      message: message,
      duration: 5000,
      cssClass: "toastError"
    })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
  }


  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
      // console.log(res);
    });
  }
  
}
