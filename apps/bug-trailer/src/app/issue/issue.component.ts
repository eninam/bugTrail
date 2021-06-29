import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IssueService } from './issue.service';

@Component({
  selector: 'bug-trailer-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private issueService: IssueService
  ) {}
  name = localStorage.getItem('name');
  email = localStorage.getItem('email')?.trim()?.toLowerCase();
  allUsers: any;
  projects: any;
  allIssues: any;
  issueForm = this.fb.group({
    title: '',
    description: '',
    status: [''],
    priority: [''],
    due_date: '',
    assignedTo: [''],
    project: [''],
  });
  // title = 'appBootstrap';

  // model;
  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
    this.projectService.projects$.subscribe((projects) => {
      // console.log('projects ', projects);
      this.projects = projects;
    });
    this.issueService.getIssues().subscribe((issues) => {
      this.allIssues = issues;
    });
  }

  loggout() {
    this.authService.loggOut();
    this.router.navigate(['/']);
  }
  createIssue() {
    const title = this.issueForm.value.title;
    const description = this.issueForm.value.description;
    const status = this.issueForm.controls['status'].value;
    const priority = this.issueForm.controls['priority'].value;
    const due_date = this.issueForm.value.due_date;
    const assignedTo = this.issueForm.controls['assignedTo'].value;
    const project = this.issueForm.controls['project'].value;
    let userEmail;
    for (let i = 0; i < this.allUsers.length; i++) {
      const user = this.allUsers[i];
      if (user.name == assignedTo) {
        userEmail = user.email;
      }
    }

    if (
      !title ||
      !description ||
      !status ||
      !priority ||
      !due_date ||
      !assignedTo ||
      !project
    ) {
      window.alert('invalid form. Fill in every part of the form');
    } else if (!userEmail) {
      window.alert('user assigned to ticket is not found ');
    } else {
      const dueDate = `${due_date.year}-${due_date.month}-${due_date.day}`;
      const createdByName = this.name;
      const createdByEmail = this.email;
      this.issueService
        .createIssue({
          title,
          description,
          status,
          priority,
          dueDate,
          userEmail,
          project,
          createdByName,
          createdByEmail,
        })
        .subscribe(
          (res) => {
            console.log('issue created ', res);
            window.location.reload();
          },
          (err) => {
            console.log('err ', err);
            window.alert(err.error.error);
          }
        );
    }
  }
}
