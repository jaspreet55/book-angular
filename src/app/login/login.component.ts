import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService,CommonService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';
  constructor(
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  onSubmit() {
     // stop here if form is invalid
     if (this.loginForm.invalid) {
      this.commonService.MarkAllAllCtrlDirty(this.loginForm);
      return;
    }
    if(this.loginForm.valid) {
      this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
        if (res.code == 200) {
          //Complete load require to manage the Local storage
          this.router.navigate(['/home']);
        }
      }, (err) => {
      
        if (err.status == 500) {
          localStorage.clear();
          this.router.navigate(['/login']);
        } else {
          this.error = err.errors;
        }
        // this.errors = error.error.message;
      });
    }
  }
}
