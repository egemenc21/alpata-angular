import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Meeting, MeetingService } from '../services/meeting.service';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-meeting-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  template: `<li
    *ngIf="meeting"
    class="border p-4 rounded-lg d-flex flex-column align-items-center h-100 w-100 "
  >
    <div class="p-2">
      <h3 class="text-center h5">{{ meeting.name | uppercase }}</h3>
      <div>
        <span class="text-danger ">Description: </span>{{ meeting.description }}
      </div>
      <div>
        <span class="text-danger ">Start Date:</span>
        {{ meeting.startDate | date }}
      </div>
      <div>
        <span class="text-danger ">End Date:</span> {{ meeting.endDate | date }}
      </div>
      <div class="">
        <span class="text-danger ">Document Url:</span>
        <a
          href="{{ this.documentHref }}"
          target="_blank"
          class=" document-url "
        >
          See Document <i class="pi pi-external-link"></i>
        </a>
      </div>
    </div>
    <div class="d-flex flex-column flex-md-row align-items-center w-100">
      <button
        pButton
        pRipple
        type="button"
        label="Modify"
        class="p-button-success w-50"
        [raised]="true"
        [rounded]="true"
        severity="success"
        routerLink="/dashboard/modify/{{ this.meeting.id }}"
      ></button>

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
    </div>
  </li>`,
  styleUrl: './meeting-item.component.scss',
  styles: [
    `
      .document-url {
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
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
