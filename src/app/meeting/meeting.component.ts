import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Inject, ViewChild, viewChild } from '@angular/core';
import { MeetingItemComponent } from '../meeting-item/meeting-item.component';
import { Meeting, MeetingService } from '../services/meeting.service';
import { UserService } from '../services/user.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [
    CommonModule,
    MeetingItemComponent,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    CalendarModule,
    DatePipe,
    SpinnerComponent,
  ],
  template: `
    <section>
      <h1 class="h3 text-center mt-4">Create A Meeting</h1>
      <form
        class="container d-flex flex-column justify-content-center align-items-center"
        [formGroup]="form"
        (submit)="onSubmit()"
      >
        <label class="p-2">
          <input
            type="text"
            pInputText
            formControlName="name"
            placeholder="Meeting Name"
            class=""
            required
          />
        </label>
        <label class="p-2">
          <p-calendar
            formControlName="startDate"
            required
            placeholder="Start Date"
            [showTime]="true"
          ></p-calendar>
        </label>
        <label class="p-2">
          <p-calendar
            formControlName="endDate"
            required
            placeholder="End Date"
            [showTime]="true"
          ></p-calendar>
        </label>
        <label class="p-2 ">
          <textarea
            rows="5"
            cols="30"
            pInputTextarea
            formControlName="description"
            required
          ></textarea>
        </label>

        <label class="row ">
          <p-fileUpload
            name="demo[]"
            (onSelect)="onSelect($event)"
            accept=".pdf"
            maxFileSize="1000000"
            mode="advanced"
            #upload
          >
          </p-fileUpload>
        </label>

        <button
          pButton
          pRipple
          type="submit"
          label="Create Meeting"
          class="row justify-content-center align-content-center  p-button-success w-50 col-lg-2"
          [raised]="true"
          [rounded]="true"
          severity="success"
          [disabled]="!isFormValid()" 
        ></button>
      </form>
      <div class="h-50">
        <app-spinner *ngIf="isSpinning"></app-spinner>
      </div>

      <ul class="container d-flex flex-row flex-wrap  mt-4">
        @if (meetings && isSpinning === false) { @for (meeting of meetings;
        track meeting.id) {
        <app-meeting-item
          [meeting]="meeting"
          (meetingDeleted)="onMeetingDeleted($event)"
          (meetingUpdated)="onMeetingUpdated()"
          class="col-md-6 col-lg-4 my-2 "
        ></app-meeting-item>
        } }
      </ul>
    </section>
  `,
  styleUrl: './meeting.component.scss',
})
export class MeetingComponent {
  @ViewChild('upload') fileUploadButton;
  meetingService = inject(MeetingService);
  isSpinning: boolean = true;
  userService = inject(UserService);
  datePipe = inject(DatePipe);
  meetings: Meeting[];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    document: new FormControl(null),
  });

  ngOnInit() {
    this.fetchMeetings();
  }

  onMeetingDeleted(meetingId: string) {
    this.meetings = this.meetings.filter((meeting) => meeting.id !== meetingId);
    this.meetingService.updateMeetings(this.meetings);
  }

  onMeetingUpdated() {
    this.fetchMeetings();
    this.meetingService.updateMeetings(this.meetings);
  }

  onSelect($event: FileSelectEvent) {
    const file = $event.files[0];
    if (file) {
      this.form.value.document = file;
    }
  }
  isFormValid(): boolean {
    return this.form.valid;
  }
  

  async onSubmit() {
    this.isSpinning = true;
    const formValue = this.form.value;
    formValue.startDate = this.datePipe.transform(
      formValue.startDate,
      'yyyy-MM-dd HH:mm:ss.SSSSSS ZZZZZ'
    );
    formValue.endDate = this.datePipe.transform(
      formValue.endDate,
      'yyyy-MM-dd HH:mm:ss.SSSSSS ZZZZZ'
    );
    const formData = await this.meetingService.toFormData(formValue);

    this.meetingService
      .createMeeting(formData, this.userService.userId)
      .subscribe({
        next: (res) => {
          console.log('Meeting created successfully:', res);
          this.fetchMeetings();
          this.isSpinning = false;
        },
        error: (err) => {
          console.error('Error creating meeting:', err);
        },
      });
    this.form.reset();
    this.fileUploadButton.clear();
  }

  fetchMeetings() {
    this.meetingService
      .fetchMeetingsByUserId(this.userService.userId)
      .subscribe({
        next: (res) => {
          this.meetings = this.meetingService.sortMeetingsByStartDate(res);
          this.meetingService.meetings =
            this.meetingService.sortMeetingsByStartDate(res);

          this.isSpinning = false;
        },
        error: (err) => console.log(err),
      });
  }
}
