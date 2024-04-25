import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MeetingService } from '../services/meeting.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-meeting',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    CalendarModule,
    DatePipe,
  ],
  template: `<section>
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
        >
        </p-fileUpload>
      </label>

      <button
        pButton
        pRipple
        type="submit"
        label="Update Meeting"
        class="row justify-content-center align-content-center  p-button-success w-50 col-lg-2"
        [raised]="true"
        [rounded]="true"
        severity="success"
      ></button>
    </form>
  </section>`,
  styleUrl: './modify-meeting.component.scss',
})
export class ModifyMeetingComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  datePipe = inject(DatePipe);
  meetingService = inject(MeetingService);
  meetingId: string;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
    document: new FormControl(null, Validators.required),
  });

  ngAfterViewInit() {
    this.meetingId = this.route.snapshot.params['id'];
    this.meetingService.fetchMeetingById(this.meetingId).subscribe({
      next: (res) => {
        console.log(res);

        this.form.patchValue({
          id: this.meetingId,
          name: res.name,
          startDate: res.startDate ? new Date(res.startDate) : null,
          endDate: res.startDate ? new Date(res.startDate) : null,
          description: res.description,
        });
      },
    });
  }

  onSelect($event: FileSelectEvent) {
    const file = $event.files[0];
    if (file) {
      this.form.value.document = file;
    }
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
    const formDataToBeUpdated = await this.meetingService.toFormData(formValue);

    console.log(formDataToBeUpdated)

    this.meetingService
      .updateMeeting(formDataToBeUpdated, this.meetingId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          console.error('Error creating meeting:', err);
          if (err.status === 400) {
            const validationErrors = err.error;
            // Iterate over the validationErrors object and display each error message
            Object.keys(validationErrors).forEach((key) => {
              const errorMessage = validationErrors[key];
              console.error(`Validation error for ${key}: ${errorMessage}`);
              // You can display the error messages to the user here
            });
          }
        },
      });
  }
}
