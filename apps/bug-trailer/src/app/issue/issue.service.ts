import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private http: HttpClient) {}
  getIssues() {
    return this.http.get<any>('http://localhost:3333/api/issue');
  }
  createIssue(issue: any) {
    console.log('issue ', issue);
    return this.http.post<any>('http://localhost:3333/api/issue', {
      title: issue.title,
      description: issue.description,
      status: issue.status,
      priority: issue.priority,
      due_date: issue.dueDate,
      assignedTo: issue.userEmail,
      project: issue.project,
      createdByName: issue.createdByName,
      createdByEmail: issue.createdByEmail,
    });
  }
}
