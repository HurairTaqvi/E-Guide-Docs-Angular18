import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor() {}

  onSubmit(form: any) {
    if (form.valid) {
      // Log the user data (you can replace this with your own logic)
      console.log('User Data:', {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });

      // Save to localStorage (optional)
      localStorage.setItem('signupData', JSON.stringify(form.value));

      // Reset the form
      form.reset();
    }
  }
}
