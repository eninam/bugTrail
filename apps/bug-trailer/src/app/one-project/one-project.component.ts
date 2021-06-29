import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project/project.service';
import { OneProjectService } from './one-project.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'bug-trailer-one-project',
  templateUrl: './one-project.component.html',
  styleUrls: ['./one-project.component.scss'],
})
export class OneProjectComponent implements OnInit {
  projectName = this.route.snapshot.paramMap.get('id');
  project: any;
  projectUsers: any[] = [];
  allUsers: any;
  name = localStorage.getItem('name');
  constructor(
    private route: ActivatedRoute,
    private oneProjectService: OneProjectService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  projectForm = this.fb.group({
    projectUsers: [''],
  });
  async ngOnInit() {
    this.oneProjectService.getProject(this.projectName).subscribe((project) => {
      // project.populate();
      this.project = project;
      for (let i = 0; i < this.project.assignedUsers.length; i++) {
        const id = this.project.assignedUsers[i];
        this.oneProjectService.getUserByID(id).subscribe((res) => {
          this.projectUsers.push(res);
        });
      }
      // console.log('project ', project);
      // this.projectUsers = project.assignedUsers;
    });
    this.authService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  removeUser(projectUser: any) {
    console.log('in remove user ', projectUser._id);
    // remove user from projectUser and project.assigned user in the back end
    this.oneProjectService
      .deleteAssignedUser(this.project.projectName, projectUser._id)
      .subscribe(
        (res) => {
          console.log('delete user in project ', res);
          window.location.reload();
        },
        (err) => {
          console.log('err , ', err);
        }
      );
    //  window.location.reload();
  }
  addUserToProject() {
    // console.log(
    //   'adding user to Project',
    //   this.projectForm.controls['projectUsers'].value
    // );
    if (!this.projectForm.controls['projectUsers'].value) {
      window.alert('please choose a user before submiting the form');
    } else {
      console.log('in else ', this.allUsers);
      for (let i = 0; i < this.allUsers.length; i++) {
        const projectUser = this.allUsers[i];
        console.log(
          'projectUser ',
          projectUser.name,
          ' form value ',
          this.projectForm.controls['projectUsers'].value
        );
        if (
          projectUser.name == this.projectForm.controls['projectUsers'].value
        ) {
          this.oneProjectService
            .updateProject(projectUser.email, this.projectName)
            .subscribe(
              (res) => {
                console.log('successfully added ', res);
                window.location.reload();
                // this.oneProjectService
                //   .getUserByID(projectUser.email)
                //   .subscribe((res) => {
                //     this.projectUsers.push(res);
                //     window.location.reload();
                //   });
              },
              (err) => {
                console.log('err ', err);
                window.alert('invalid');
              }
            );
        }
      }
    }
  }
  loggout() {
    this.authService.loggOut();
    this.router.navigate(['/']);
  }
}
