import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile';


@Component({
  selector: 'app-profile-create-update',
  templateUrl: './profile-create-update.component.html',
  styleUrls: ['./profile-create-update.component.css']
})
export class ProfileCreateUpdateComponent implements OnInit {
  profileForm: FormGroup;
  isEditMode: boolean = false;
  profileId: string | null = null;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.profileForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      perfil: new FormControl('', Validators.required),
      idade: new FormControl(0, [Validators.required, Validators.min(0)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      ativo: new FormControl(true),
      pais: new FormControl(''),
      nivelDeExperiencia: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.profileId = params.get('id');
      if (this.profileId) {
        this.isEditMode = true;
        this.profileService.buscarPorId(this.profileId).subscribe(profile => {
          this.profileForm.patchValue(profile);
        });
      }
    });
  }

  onSubmit() {
    const profile: Profile = this.profileForm.value as Profile;
    if (this.isEditMode && this.profileId) {
      profile.id = this.profileId;
      console.log(profile);
      this.profileService.editar(profile).subscribe(result => {
        Swal.fire({
          title: 'Perfil atualizado com sucesso!',
          text: 'PARABÉNS CHAMPS!!',
          icon: 'success',
        });
        this.router.navigateByUrl('/profile');
      });
    } else {
      this.profileService.cadastrar(profile).subscribe(result => {
        Swal.fire({
          title: 'Pessoa cadastrada com sucesso!',
          text: 'PARABÉNS CHAMPS!!',
          icon: 'success',
        });
        this.router.navigateByUrl('/profile');
      });
    }
  }
}
