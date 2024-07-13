import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../interfaces/profile';
import Swal from 'sweetalert2';


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
    Swal.fire({
      title: 'Tem certeza que deseja excluir este perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deletar(id).subscribe(
          () => {
            Swal.fire({
              title: 'Perfil excluído com sucesso!',
              icon: 'success'
            });
            this.carregarProfiles();
          },
          error => {
            console.error(error);
            Swal.fire({
              title: 'Erro ao excluir perfil',
              text: 'Ocorreu um erro ao tentar excluir o perfil.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  
}
