import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from './project.service';

@Component({
  selector: 'bug-trailer-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');
  projects: any;
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.projectService.projects$.subscribe((projects) => {
      // console.log('projects ', projects);
      this.projects = projects;
    });
  }
  projectForm = this.fb.group({
    projectName: '',
    projectDescription: '',
    // pass: '',
  });
  ngOnInit(): void {
    console.log('in project');
  }
  loggout() {
    this.authService.loggOut();
    this.router.navigate(['/']);
  }
  createProject() {
    console.log(
      'in create projexct ',
      this.projectForm.value.projectName,
      ' description ',
      this.projectForm.value.projectDescription
    );
    if (!this.projectForm.value.projectName) {
      window.alert('project Name is empty');
    }
    if (!this.projectForm.value.projectDescription) {
      window.alert('project Description is empty');
    } else {
      this.projectService
        .createProject(
          this.projectForm.value.projectName?.toLowerCase()?.trim(),
          this.projectForm.value.projectDescription
        )
        .subscribe(
          (res) => {
            console.log('successful creation of project ', res);
            window.location.reload();
            // this.router.navigate(['/project']);
          },
          (err) => {
            console.log('err we got from server ', err);
            // this.authService.setLoggedIn(false);
            window.alert(err.error.error);
          }
        );
    }
  }
}
