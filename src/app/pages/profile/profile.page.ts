import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private user:User;
  private id: string = '';

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) {

     this.id = this.activeRoute.snapshot.params['email'];

     if(this.id) this.userProfile();
   }

  ngOnInit() {
  }

  userProfile(){
    this.authService.readUsuarioById(this.id).valueChanges().subscribe(data =>{
      this.user = data;
    });
  }

}
