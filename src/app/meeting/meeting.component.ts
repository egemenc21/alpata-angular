import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MeetingItemComponent } from '../meeting-item/meeting-item.component';
import { MeetingService } from '../services/meeting.service';
import { UserService } from '../services/user.service';

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
export class MeetingComponent {
  meetingService = inject(MeetingService);
  userService = inject(UserService);

  constructor() {}

  ngOnInit() {
    console.log(this.userService.userId, "useridddd")
    this.meetingService
      .fetchMeetingsByUserId(this.userService.userId)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
  }

  ngDoCheck(){
    console.log(this.userService.userId, "useridddd")
  }
}
