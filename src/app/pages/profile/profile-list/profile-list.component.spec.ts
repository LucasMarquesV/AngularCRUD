import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../interfaces/profile'; 

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.buscarTodos().subscribe((result: Profile[]) => {
      this.profiles = result;
    }, error => {
      console.error(error);
    });
  }
}
