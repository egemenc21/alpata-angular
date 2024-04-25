import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
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
      <form
        class="container d-flex flex-column justify-content-center  align-items-center "
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
            mode="basic"
            chooseLabel="Choose"
            name="demo[]"
            accept=".pdf"
            maxFileSize="1000000"
            (onSelect)="onSelect($event)"
          ></p-fileUpload>
        </label>

        <button
          pButton
          pRipple
          type="submit"
          label="Create Meeting"
          class="row justify-content-center  align-content-center  p-button-success w-50 col-lg-2"
          [raised]="true"
          [rounded]="true"
          severity="success"
        ></button>
      </form>

      <ul class="container d-flex flex-wrap  ">
        @if (meetings) { @for (meeting of meetings; track meeting.id) {
        <app-meeting-item
          [meeting]="meeting"
          (meetingDeleted)="onMeetingDeleted($event)"
        ></app-meeting-item>
        } }
      </ul>
    </section>
  `,
  styleUrl: './meeting.component.scss',
})
export class MeetingComponent {
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

  // ngDoCheck() {
  //   console.log(this.meetingService.meetings);
  //   console.log(this.meetings);
  // }

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
    this.meetingService.createMeeting(formData, this.userService.userId).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
    console.log(this.form.value);
  }
}
