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
    this.carregarProfiles();
  }

  carregarProfiles() {
    this.profileService.buscarTodos().subscribe(
      (result: Profile[]) => {
        this.profiles = result;
      },
      error => {
        console.error(error);
      }
    );
  }

  deletarProfile(id: string) {
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      this.profileService.deletar(id).subscribe(
        () => {
          this.carregarProfiles();
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
