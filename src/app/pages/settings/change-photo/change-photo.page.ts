import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.page.html',
  styleUrls: ['./change-photo.page.scss'],
})
export class ChangePhotoPage implements OnInit {

  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;


  constructor(
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
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

      if(this.platform.is('ios')) {
        file = fileUri.split('/').pop();
      } else {
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'));
      }

      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);

      const blob: Blob = new Blob([buffer], {type: 'image/jpeg' });

      this.uploadPicture(blob);

    } catch(error){
      console.error(error);
    }
  }

  uploadPicture( blob: Blob ) {
    const ref = this.afStorage.ref('images/ionic.jpg');
    const task = ref.put(blob);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
  }

  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'textT',
      message: 'Aguarde...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Carregamento cancelado!');
  }

}
