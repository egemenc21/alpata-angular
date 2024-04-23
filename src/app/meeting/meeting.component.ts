import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MeetingItemComponent } from '../meeting-item/meeting-item.component';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [CommonModule, MeetingItemComponent],
  template: `
  <div class="container">
      <app-meeting-item></app-meeting-item>
  </div>
  
`,
  styleUrl: './meeting.component.scss',
})
export class MeetingComponent {}
