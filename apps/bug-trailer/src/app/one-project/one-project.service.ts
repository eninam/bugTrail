import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OneProjectService {
  constructor(private http: HttpClient) {}
  getProject(name: string | null) {
    console.log('getProject ran with name ' + name);
    return this.http.get<any>(`/api/project/${name}`);
  }
  updateProject(email: string, projectName: any) {
    console.log('in update email', email, ' projectname ', projectName);
    return this.http.patch<any>(`/api/project/${projectName}`, {
      assignedUser: email,
    });
  }
  deleteAssignedUser(projectName: string | null, userID: string | null) {
    // console.log('in deleteassigned user');
    // :id/deleteUser/:userID
    // :id/user/:userID/delete
    return this.http.patch<any>(
      `/api/project/${projectName}/user/${userID}/delete`,
      {
        userID,
      }
    );
  }
  getUserByID(id: string) {
    return this.http.get<any>(`/api/user/id/${id}`);
  }
}
