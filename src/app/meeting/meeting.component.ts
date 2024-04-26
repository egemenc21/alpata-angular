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
          ></p-calendar>
        </label>
        <label class="p-2">
          <p-calendar
            formControlName="endDate"
            required
            placeholder="End Date"
          ></p-calendar>
        </label>
        <label class="p-2 ">
          <input
            type="text"
            pInputText
            formControlName="description"
            placeholder="Meeting Description"
            class=""
            required
          />
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
        ></button>
      </form>

      <ul class="container d-flex flex-row flex-wrap  mt-4">
        @if (meetings) { @for (meeting of meetings; track meeting.id) {
        <app-meeting-item
          [meeting]="meeting"
          (meetingDeleted)="onMeetingDeleted($event)"
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
  userService = inject(UserService);
  datePipe = inject(DatePipe);
  meetings: Meeting[];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    document: new FormControl(null, Validators.required),
  });

  ngOnInit() {
    this.fetchMeetings();
  }

  onMeetingDeleted(meetingId: string) {
    this.meetings = this.meetings.filter((meeting) => meeting.id !== meetingId);
    this.meetingService.updateMeetings(this.meetings);
  }

  onSelect($event: FileSelectEvent) {
    console.log($event);

    const file = $event.files[0];
    if (file) {
      this.form.value.document = file;
    }

    console.log(this.form.value);
  }

  async onSubmit() {
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
        },
        error: (err) => {
          console.error('Error creating meeting:', err);
          if (err.status === 422) {
            const validationErrors = err.error;
            // Iterate over the validationErrors object and display each error message
            Object.keys(validationErrors).forEach((key) => {
              const errorMessage = validationErrors[key];
              console.error(`Validation error for ${key}: ${errorMessage}`);
              // You can display the error messages to the user here
            });
          }
          // Handle other errors
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
          this.meetings = res.sort(m => parseInt(m.id) );
          this.meetingService.meetings = res.sort(m => parseInt(m.id) );
        },
        error: (err) => console.log(err),
      });
  }
}
