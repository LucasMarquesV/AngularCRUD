import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../interfaces/profile'; // ajuste o caminho conforme necessário

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profiles: Profile[] = []; // utilize o tipo Profiles

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.buscarTodos().subscribe((result: Profile[]) => {
      this.profiles = result;
    }, error => {
      console.error(error);
    });
  }
}
