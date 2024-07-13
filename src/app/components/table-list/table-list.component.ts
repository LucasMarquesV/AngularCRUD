import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../interfaces/profile';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  @Input() profiles: Profile[] = [];
  @Output() deleteProfile = new EventEmitter<string>();

  onDeleteProfile(id: string) {
      this.deleteProfile.emit(id);
  }
}
