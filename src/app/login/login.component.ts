import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmitLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.userlogin(email, password)
      .subscribe(
        response => {
          console.log('Server response:', response);
          // Assuming response contains user data
          this.authService.setLoggedInUser(response);
          // Set the active tab to 'admin'
          this.authService.setActiveTab('admin');
          // Navigate to the 'admin' route instead of directly to 'dashboard'
          this.router.navigate(['/dashboard']).then(() => {
            // Update activeTab after navigation
            this.authService.setActiveTab('admin');
          });
          // Reset the form after successful submission
          this.loginForm.reset();
          alert('Logged in successfully!');
        },
        error => {
          console.error('Error', error);
          this.errorMessage = error;
          alert('Invalid credentials. Please try again.');
        }
      );
  }
}
