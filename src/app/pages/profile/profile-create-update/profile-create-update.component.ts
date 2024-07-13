import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-profile-create-update',
  templateUrl: './profile-create-update.component.html',
  styleUrls: ['./profile-create-update.component.css']
})
export class ProfileCreateUpdateComponent {

  constructor(private profileService: ProfileService, private router: Router) {}

  profileForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    perfil: new FormControl('', Validators.required),
    idade: new FormControl(0, [Validators.required, Validators.min(0)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    ativo: new FormControl(true),
    pais: new FormControl(''),
    nivelDeExperiencia: new FormControl('')
  });

  onSubmit() {
    const profile: Profile = this.profileForm.value as Profile;
    console.log(profile);
    this.profileService.cadastrar(profile).subscribe(result => {
      console.log(result);
      Swal.fire({
        title: 'Pessoa cadastrada com sucesso!',
        text: 'PARABÉNS CHAMPS!!',
        icon: 'success',
      });
      this.router.navigateByUrl('/profile');
    });
  }
}
