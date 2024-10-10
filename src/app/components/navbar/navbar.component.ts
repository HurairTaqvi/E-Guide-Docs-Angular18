import { Component } from '@angular/core';
import { SharingService } from '../../core/sharing-service/sharing.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  serviceList!: any[];
  isLoggedIn: boolean = false; // Initialize a property

  constructor(private sharingService: SharingService, private route: Router) {}

  ngOnInit(): void {
    this.sharingService.getServiceData().subscribe({
      next: (res) => {
        this.serviceList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.isLoggedIn = !!localStorage.getItem('loginData'); // Set property based on localStorage
  }

  routetoservicedetail(id: number) {
    // console.log('id' + id);
    this.route.navigate(['service'], {
      queryParams: {
        id: id,
      },
    });
  }

  // Logout function
  logout() {
    // Remove login data from localStorage
    localStorage.removeItem('loginData');

    // Update the isLoggedIn status
    this.isLoggedIn = false;

    // Optionally, you can redirect the user to the login page or home page
    // For example:
    // this.router.navigate(['/login']);
  }
}
