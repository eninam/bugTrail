import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'bug-trailer-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isDisabled = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  contactForm = this.fb.group({
    name: '',
    Email_Address: '',
    pass: '',
  });

  ngOnInit(): void {
    console.log('in register');
  }
  // validateEmail(newInput) {
  //   console.log(
  //     'pass ',
  //     this.contactForm.value.pass,
  //     ' name ',
  //     this.contactForm.value.name
  //   );
  //   console.log('in on change ');
  //   console.log(newInput);
  //   const re = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  //   if (!newInput) {
  //     this.isDisabled = true;
  //   }
  //   if (!re.test(newInput)) {
  //     this.isDisabled = true;
  //   }
  //   if (!this.contactForm.value.pass || !this.contactForm.value.name) {
  //     this.isDisabled = true;
  //   } else {
  //     this.isDisabled = false;
  //   }
  // }
  register() {
    console.log('in register');
  }
  registerUser() {
    const re = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const name = this.contactForm.value.name;
    const email = this.contactForm.value.Email_Address;
    const pass = this.contactForm.value.pass;
    console.log('in registerUser');
    if (
      !this.contactForm.value.pass ||
      !this.contactForm.value.name ||
      !this.contactForm.value.Email_Address
    ) {
      window.alert('invalid form');
    } else if (!re.test(this.contactForm.value.Email_Address)) {
      window.alert('invalid email address');
    } else {
      console.log('in valid form ');
      this.authService
        .register(name, pass, email?.toLowerCase()?.trim())
        .subscribe(
          (res) => {
            console.log('successful register ');
            //
            this.router.navigate(['/admin']);
            this.authService.setLoggedIn(true);
            localStorage.setItem('token', res.toString());
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
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
