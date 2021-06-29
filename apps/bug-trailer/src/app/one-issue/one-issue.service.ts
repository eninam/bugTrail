import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OneIssueService {
  constructor(private http: HttpClient) {}
  updateIssue(title: string | null, updatedIssue: any) {
    return this.http.patch<any>(`http://localhost:3333/api/issue/${title}`, {
      title: updatedIssue?.title,
      description: updatedIssue?.description,
      status: updatedIssue?.status,
      priority: updatedIssue?.priority,
      due_date: updatedIssue?.due_date,
      assignedTo: updatedIssue?.userEmail,
      project: updatedIssue?.project,
      updatedBy: updatedIssue?.updatedBy,
    });
  }
  getOneIssue(title: string | null) {
    return this.http.get<any>(`http://localhost:3333/api/issue/${title}`);
  }
}
