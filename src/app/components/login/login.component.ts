import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { CommonModule } from '@angular/common'; // For common Angular directives like *ngIf
import { SharingService } from '../../core/sharing-service/sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // <-- Add FormsModule here
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginData: any = {};

  constructor(private sharingService: SharingService, private router: Router) {}

  onSubmit() {
    this.sharingService.getLoginCredentials().subscribe((data: any) => {
      const users = data.users;
      const user = users.find(
        (u: any) => u.email === this.email && u.password === this.password
      );

      if (user) {
        this.loginData = {
          email: this.email,
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem('loginData', JSON.stringify(this.loginData));
        this.router.navigate(['/']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
