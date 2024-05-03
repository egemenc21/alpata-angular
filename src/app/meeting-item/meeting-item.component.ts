import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Meeting, MeetingService } from '../services/meeting.service';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-meeting-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, CardModule],
  template: `
    <p-card header="{{ this.meeting.name | titlecase }}">
      <p>
        {{ this.meeting.description }}
      </p>
      <p>
        <span class="text-danger ">Start Date:</span>
        {{ meeting.startDate | date }}
      </p>
      <p>
        <span class="text-danger ">End Date:</span> {{ meeting.endDate | date }}
      </p>
      <div>
        <span class="text-danger ">Document Url:</span>
        <a
          href="{{ this.documentHref }}"
          target="_blank"
          class=" document-url "
          *ngIf="this.meeting.documentUrl !== ''"
        >
          See Document <i class="pi pi-external-link"></i>
        </a>
      </div>

      <ng-template pTemplate="footer">
        <p-button
          label="Modify"
          icon="pi pi-file-edit"
          routerLink="/dashboard/modify/{{ this.meeting.id }}"
        ></p-button>
        <p-button
          label="Delete"
          icon="pi pi-times"
          styleClass="p-button-secondary"
          [style]="{ 'margin-left': '.5em' }"
          (click)="deleteMeeting(meeting.id)"
        ></p-button>
      </ng-template>
    </p-card>
  `,
  styleUrl: './meeting-item.component.scss',
})
export class MeetingItemComponent {
  @Input() meeting: Meeting;
  @Output() meetingDeleted = new EventEmitter<string>();

  meetingService = inject(MeetingService);
  documentHref: string;
  constructor() {}

  ngOnInit() {
    this.documentHref = `${environment.apiRoute}/Uploads/Documents/${this.meeting.documentUrl}`;
  }

  deleteMeeting(meetingId: string) {
    this.meetingService.deleteMeeting(meetingId).subscribe({
      next: (res) => {
        console.log(res);
        this.meetingDeleted.emit(meetingId);
      },
      error: (err) => console.log(err),
    });
  }
}
