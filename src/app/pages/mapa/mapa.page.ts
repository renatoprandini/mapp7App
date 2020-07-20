import { Component, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit {
  public post: Post = new Post('', '', null);

  constructor() {
    const data = localStorage.getItem('baltagram.post');
    if (data) { this.post = JSON.parse(data); }
  }

  ngAfterViewInit() {
    // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
    const html = '<iframe style="height: 100vh;" width="100%" height="99%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyC1ilEHVEk6QAzrv_DxUalfFL_Ya2-of2k&origin=' + this.post.localizacao + '&destination=' + this.post.localizacao + '" allowfullscreen></iframe>';
    document.getElementById('map').innerHTML = html;
  }

}
