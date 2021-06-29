import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IssueService } from '../issue/issue.service';
import { ProjectService } from '../project/project.service';
import { OneIssueService } from './one-issue.service';

@Component({
  selector: 'bug-trailer-one-issue',
  templateUrl: './one-issue.component.html',
  styleUrls: ['./one-issue.component.scss'],
})
export class OneIssueComponent implements OnInit {
  name = localStorage.getItem('name');
  email = localStorage.getItem('email')?.trim()?.toLowerCase();
  allUsers: any;
  projects: any;
  oneIssue: any;
  issueTitle = this.route.snapshot.paramMap.get('id');
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private issueService: IssueService,
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService,
    private oneIssueService: OneIssueService
  ) {}
  issueForm = this.fb.group({
    title: '',
    description: '',
    status: [''],
    priority: [''],
    due_date: '',
    assignedTo: [''],
    project: [''],
  });
  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
    this.projectService.projects$.subscribe((projects) => {
      // console.log('projects ', projects);
      this.projects = projects;
    });
    this.oneIssueService.getOneIssue(this.issueTitle).subscribe((issue) => {
      this.oneIssue = issue;
      // this.issueForm.value.title = issue.title;
      this.issueForm.controls['title'].setValue(issue?.title);
      this.issueForm.controls['description'].setValue(issue?.description);
      // this.issueForm.controls['due_date'].setValue(issue?.due_date);
    });
  }

  loggout() {
    this.authService.loggOut();
    this.router.navigate(['/']);
  }
  updateIssue() {
    let duedate = this.oneIssue.due_date;
    let assignedTo = this.issueForm.value.assignedTo;
    if (this.issueForm.value.due_date) {
      duedate = `${this.issueForm.value.due_date.year}-${this.issueForm.value.due_date.month}-${this.issueForm.value.due_date.day}`;
    }
    if (!assignedTo) {
      assignedTo = this.oneIssue.userName;
    }
    const issue = {
      title: this.issueForm.value.title?.toLowerCase()?.trim(),
      description: this.issueForm.value.description,
      status: this.issueForm.value.status || this.oneIssue.status,
      priority: this.issueForm.value.priority || this.oneIssue.priority,
      due_date: duedate,
      assignedTo: assignedTo,
      project: this.issueForm.value.project || this.oneIssue.projectName,
      updatedBy: this.email,
    };
    console.log(
      'update issue ',
      this.issueForm.value.assignedTo,
      ' this.oneIssue.userName ',
      this.oneIssue.userName,
      'whole issue',
      issue
    );
    this.oneIssueService.updateIssue(this.issueTitle, issue).subscribe(
      (res) => {
        console.log('res ', res);
        this.router.navigate(['/admin']);
      },
      (err) => {
        console.log('err ', err);
        window.alert(err);
        // window.location.reload()
      }
    );
    // this.oneIssueService.updateIssue()
  }
}
