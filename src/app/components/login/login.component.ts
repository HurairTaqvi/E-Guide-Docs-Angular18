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
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginData: any = {};
  ipAddress: any = '';

  constructor(private sharingService: SharingService, private router: Router) {}

  onSubmit() {
    async function getIPAddress() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error('Error fetching the IP address:', error);
      }
    }

    getIPAddress().then((ip) => {
      this.ipAddress = ip;
      // console.log('Your IP Address is:', this.ipAddress);
    });

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
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
