import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects$;
  constructor(private http: HttpClient) {
    this.projects$ = this.http.get<any>('http://localhost:3333/api/project');
    // console.log('projects ', this.projects$);
  }
  createProject(projectName: any, projectDescription: any) {
    return this.http.post<any>('http://localhost:3333/api/project', {
      projectName: projectName,
      projectDescription: projectDescription,
    });
  }

  // getProject() {
  //   return this.http.get<any>('http://localhost:3000/project');
  // }
}
