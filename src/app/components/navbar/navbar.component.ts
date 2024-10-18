import { Component } from '@angular/core';
import { SharingService } from '../../core/sharing-service/sharing.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Corrected property name
})
export class NavbarComponent {
  serviceList!: any[];
  isLoggedIn: boolean = false; // Track login status
  loginData: any = null; // Store login data
  dropdownOpen: boolean = false; // Track dropdown visibility

  constructor(private sharingService: SharingService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.loginData = localStorage.getItem('loginData');
      this.isLoggedIn = !!this.loginData; // Convert to boolean
    } else {
      console.log("'loginData' in localStorage not found");
    }
    this.loadServiceData();
  }

  private loadServiceData(): void {
    this.sharingService.getDocumentTitle().subscribe({
      next: (response: any) => {
        try {
          if (response?.Result) {
            const parsedResponse = JSON.parse(response.Result.Response);
            const parsedData = JSON.parse(response.Result.Data);

            if (parsedResponse[0]?.Code === '00') {
              this.serviceList = parsedData;
            } else {
              console.error('Error in response:', parsedResponse[0]?.message);
            }
          } else {
            console.error('Invalid response format:', response);
          }
        } catch (error) {
          console.error('Error while processing the response:', error);
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });

    // // JSON based Work
    // this.sharingService.getServiceData().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.serviceList = res;
    //   },
    //   error: (err) => {
    //     console.error('Error loading service data:', err);
    //   },
    // });
  }

  routetoservicedetail(id: number): void {
    this.router.navigate(['service'], {
      queryParams: { id },
    });
  }

  // Method to toggle dropdown visibility
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen; // Toggle the dropdown state
  }

  // logout(): void {
  //   try {
  //     localStorage.removeItem('loginData'); // Remove login data from local storage
  //     this.isLoggedIn = false; // Update login status
  //     console.log('You have been logged out successfully.');
  //     // location.reload(); // Refresh the page to reflect the changes
  //     this.router.navigate(['/login']);
  //   } catch (error) {
  //     console.error('Logout failed:', error); // Handle any errors
  //   }
  // }
}
