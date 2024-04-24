import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MeetingItemComponent } from '../meeting-item/meeting-item.component';
import { Meeting, MeetingService } from '../services/meeting.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [CommonModule, MeetingItemComponent],
  template: `
    <ul class="container d-flex flex-wrap  ">
      @if (meetings) { @for (meeting of meetings; track meeting.id) {
      <app-meeting-item
        [meeting]="meeting"
        (meetingDeleted)="onMeetingDeleted($event)"
      ></app-meeting-item>
      } }
    </ul>
  `,
  styleUrl: './meeting.component.scss',
})
export class MeetingComponent {
  meetingService = inject(MeetingService);
  userService = inject(UserService);
  meetings: Meeting[];

  constructor() {}

  ngOnInit() {
    this.meetingService
      .fetchMeetingsByUserId(this.userService.userId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.meetings = res;
          this.meetingService.meetings = res;
        },
        error: (err) => console.log(err),
      });
  }

  onMeetingDeleted(meetingId: string) {
    this.meetings = this.meetings.filter((meeting) => meeting.id !== meetingId);
    this.meetingService.updateMeetings(this.meetings);
  }

  ngDoCheck(){
    console.log(this.meetingService.meetings)
    console.log(this.meetings)
  }
}
