import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meeting {
  id: string;
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
  meetings: Meeting[]
  constructor(private httpClient: HttpClient) {}

  fetchMeetingsByUserId(id: string): Observable<Meeting[]> {
    return this.httpClient.get<Meeting[]>(
      `${environment.apiRoute}/api/Meeting/User/${id}`
    );
  }

  deleteMeeting(meetingId:string){
    return this.httpClient.delete(`${environment.apiRoute}/api/Meeting/${meetingId}`)
  }

  updateMeetings(updatedMeetings: Meeting[]) {
    this.meetings = updatedMeetings;
  }
}
