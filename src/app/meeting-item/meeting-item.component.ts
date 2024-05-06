import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Meeting, MeetingService } from '../services/meeting.service';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-meeting-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    CardModule,
    DialogModule,
    CalendarModule,
    ReactiveFormsModule,
    InputTextareaModule,
    FileUploadModule,
    InputTextModule,
  ],
  template: `
    <p-card header="{{ this.meeting.name | titlecase }}">
      <p>
        {{ this.meeting.description }}
      </p>
      <p>
        <span class="text-danger ">Start Date:</span>
        {{ this.meeting.startDate | date : 'medium' }}
      </p>
      <p>
        <span class="text-danger ">End Date:</span>
        {{ this.meeting.endDate | date : 'medium' }}
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
          (click)="showDialog()"
          icon="pi pi-file-edit"
          label="Modify"
        ></p-button>
        <p-button
          label="Delete"
          icon="pi pi-times"
          styleClass="p-button-secondary"
          [style]="{ 'margin-left': '.5em' }"
          (click)="deleteMeeting(meeting.id)"
        ></p-button>

        <p-dialog
          header="Modify Meeting"
          [(visible)]="visible"
          [style]="{ width: '450px', height: '100vh' }"
        >
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
                [minDate]="minDate"
                [maxDate]="maxDate"
                formControlName="startDate"
                required
                [showTime]="true"
                placeholder="Start Date"
              ></p-calendar>
            </label>
            <label class="p-2">
              <p-calendar
                [minDate]="minDate"
                [maxDate]="maxDate"
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
              ></textarea>
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
              class="row justify-content-center align-content-center  p-button-success w-50"
              [raised]="true"
              [rounded]="true"
              severity="success"
            ></button>
          </form>
        </p-dialog>
      </ng-template>
    </p-card>
  `,
  styleUrl: './meeting-item.component.scss',
})
export class MeetingItemComponent {
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
    document: new FormControl(null, Validators.required),
  });

  date: Date[] | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  visible: boolean = false;

  @Input() meeting: Meeting;
  @Output() meetingDeleted = new EventEmitter<string>();
  @Output() meetingUpdated = new EventEmitter<string>();
  datePipe = inject(DatePipe);

  meetingService = inject(MeetingService);
  documentHref: string;

  ngOnInit() {
    this.documentHref = `${environment.apiRoute}/Uploads/Documents/${this.meeting.documentUrl}`;
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  }

  ngAfterViewInit() {
    this.meetingService.fetchMeetingById(this.meeting.id).subscribe({
      next: (res) => {
        console.log(res);

        this.form.patchValue({
          id: this.meeting.id,
          name: res.name,
          startDate: res.startDate ? new Date(res.startDate) : null,
          endDate: res.endDate ? new Date(res.endDate) : null,
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

  deleteMeeting(meetingId: string) {
    this.meetingService.deleteMeeting(meetingId).subscribe({
      next: (res) => {
        console.log(res);
        this.meetingDeleted.emit(meetingId);
      },
      error: (err) => console.log(err),
    });
  }

  updateMeeting(formDataToBeUpdated: FormData) {
    this.meetingService
      .updateMeeting(formDataToBeUpdated, this.meeting.id)
      .subscribe({
        next: (res) => {
          this.meetingUpdated.emit()
          this.visible = false;
        },
        error: (err) => {
          console.error('Error modifying meeting:', err);
        },
      });
  }

  showDialog() {
    this.visible = true;
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

    this.updateMeeting(formDataToBeUpdated);
  }
}
