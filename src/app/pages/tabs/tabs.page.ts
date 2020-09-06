import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: User;
  foto: any;
  pickUrl: string;
  userLocal = JSON.parse(localStorage.getItem('user').replace(/[.#$]+/g, ':'));
  userInfo = {};

  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit() {
  }


  fetchUsersByEmail() {
    // Pega os valores do caminho os subscreve no 'res'
    this.authService.readUsuarioByEmail(this.userLocal.email).valueChanges().subscribe(res => {
      this.userInfo = res;
      console.log(res);
    });
  }

}
