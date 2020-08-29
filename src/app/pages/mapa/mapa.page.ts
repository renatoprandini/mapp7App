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
   
  }

}
