import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bug-trailer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // isDisabled = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  contactForm = this.fb.group({
    name: '',
    Email_Address: ['', Validators.email],
    pass: '',
  });
  ngOnInit(): void {
    console.log('in login ');
  }
  register() {
    this.router.navigate(['/register']);
  }
  logAsAdmin() {
    console.log('log as admin');
    this.contactForm.value.name = 'admin';
    this.contactForm.value.Email_Address = 'admin@gmail.com';
    this.contactForm.value.pass = 'admin';
    this.loginUser();
  }
  loginUser() {
    const re = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const name = this.contactForm.value.name;
    const email = this.contactForm.value.Email_Address;
    const pass = this.contactForm.value.pass;
    if (
      !this.contactForm.value.pass ||
      !this.contactForm.value.name ||
      !this.contactForm.value.Email_Address
    ) {
      window.alert('invalid form');
    } else if (!re.test(this.contactForm.value.Email_Address)) {
      window.alert('invalid email address');
    } else {
      this.authService.getUserDetails(name, pass, email).subscribe(
        (res) => {
          console.log('successful login ', res);
          //
          this.router.navigate(['/admin']);
          this.authService.setLoggedIn(true);
          localStorage.setItem('token', res.toString());
          // localStorage.setItem('name', name);
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
        },
        (err) => {
          console.log('err we got from server ', err.error.error);
          // this.authService.setLoggedIn(false);
          window.alert(err.error.error);
        }
      );
    }

    console.log('email ', email, ' pass ', pass, ' name ', name);
  }
}
