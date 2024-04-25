import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meeting {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  documentUrl: string;
}
@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  meetings: Meeting[];
  constructor(private httpClient: HttpClient) {}

  fetchMeetingsByUserId(userId: string): Observable<Meeting[]> {
    return this.httpClient.get<Meeting[]>(
      `${environment.apiRoute}/api/Meeting/User/${userId}`
    );
  }
  fetchMeetingById(meetingId: string): Observable<Meeting> {
    return this.httpClient.get<Meeting>(
      `${environment.apiRoute}/api/Meeting/${meetingId}`
    );
  }

  deleteMeeting(meetingId: string) {
    return this.httpClient.delete(
      `${environment.apiRoute}/api/Meeting/${meetingId}`
    );
  }

  updateMeeting(meetingToBeUpdated:FormData, meetingId:string){
    return this.httpClient.put(`${environment.apiRoute}/api/Meeting/${meetingId}`, meetingToBeUpdated)
  } 

  createMeeting(
    newMeeting: FormData,
    userId: string
  ): Observable<HttpResponse<string>> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.post<HttpResponse<string>>(
      `${environment.apiRoute}/api/Meeting/`,
      newMeeting,
      { params }
    );
  }

  updateMeetings(updatedMeetings: Meeting[]) {
    this.meetings = updatedMeetings;
  }

  async toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

}
