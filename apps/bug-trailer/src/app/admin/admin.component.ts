import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IssueService } from '../issue/issue.service';
// import { Chart } from 'chart.js';
@Component({
  selector: 'bug-trailer-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private issueService: IssueService
  ) {}
  isLoggedIn = this.authService.isLoggedIn;
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');
  allIssues: any;
  public pieChartLabels = ['Started', 'In Progress', 'Finished'];
  // issuesAnalytics = { Started: 0, inProgress: 0, finished: 0 };
  public pieChartData: any;
  //  = [
  //   this.issuesAnalytics.Started,
  //   this.issuesAnalytics.inProgress,
  //   this.issuesAnalytics.finished,
  // ];
  public pieChartType: any = 'pie';
  ngOnInit(): void {
    this.issueService.getIssues().subscribe(async (issues) => {
      const issuesAnalytics = await this.countStatus(issues);
      console.log('issues ', issuesAnalytics);
      this.allIssues = issues;
      this.pieChartData = [
        issuesAnalytics.Started,
        issuesAnalytics.inProgress,
        issuesAnalytics.finished,
      ];
    });
  }
  async countStatus(
    issues: any
  ): Promise<{ Started: number; inProgress: number; finished: number }> {
    const issuesAnalytics = { Started: 0, inProgress: 0, finished: 0 };
    for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      if (issue.status == 'Started') {
        issuesAnalytics.Started = issuesAnalytics.Started + 1;
      }
      if (issue.status == 'In progress') {
        issuesAnalytics.inProgress = issuesAnalytics.inProgress + 1;
      }
      if (issue.status == 'finished') {
        issuesAnalytics.finished = issuesAnalytics.finished + 1;
      }
    }
    return new Promise((resolve) => {
      resolve(issuesAnalytics);
    });
    // console.log('issues ', this.issuesAnalytics);
  }
  loggout() {
    this.authService.loggOut();
    this.router.navigate(['/']);
  }
  updateIfIssueBelongToYou(issue: any) {
    if (issue.createdByEmail == this.email) {
      this.router.navigate(['/issue/' + issue.title]);
    } else {
      window.alert('you did not create this ticket. You cant update it');
    }
  }
}
