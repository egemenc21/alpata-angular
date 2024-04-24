import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Meeting, MeetingService } from '../services/meeting.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-meeting-item',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `<li
    *ngIf="meeting"
    class="border p-4 mx-2 rounded-lg d-flex flex-column align-items-center"
  >
    <div class="p-2">
      <div class="text-center">{{ meeting.name | uppercase }}</div>
      <div>
        <span class="text-danger ">Desc: </span>{{ meeting.description }}
      </div>
      <div>
        <span class="text-danger ">StartDate:</span>
        {{ meeting.startDate | date }}
      </div>
      <div>
        <span class="text-danger ">EndDate:</span> {{ meeting.endDate | date }}
      </div>
      <div>
        <span class="text-danger ">DocumentUrl:</span> {{ meeting.documentUrl }}
      </div>
    </div>

    <button
      pButton
      pRipple
      type="button"
      label="Delete"
      class="p-button-success w-50"
      [raised]="true"
      [rounded]="true"
      severity="danger"
      (click)="deleteMeeting(meeting.id)"
    ></button>
  </li>`,
  styleUrl: './meeting-item.component.scss',
})
export class MeetingItemComponent {
  @Input() meeting: Meeting;
  @Output() meetingDeleted = new EventEmitter<string>();

  meetingService = inject(MeetingService);

  constructor() {}

  deleteMeeting(meetingId: string) {
    this.meetingService.deleteMeeting(meetingId).subscribe({
      next: (res) => {
        console.log(res);
        this.meetingDeleted.emit(meetingId)
      },
      error: (err) => console.log(err),
    });
  }
}
