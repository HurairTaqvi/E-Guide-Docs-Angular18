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
  constructor(private sharingService: SharingService, private route: Router) {}

  ngOnInit(): void {
    this.sharingService.getServiceData().subscribe({
      next: (res) => {
        // console.log(res);
        this.serviceList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  routetoservicedetail(id: number) {
    // console.log('id' + id);
    this.route.navigate(['service'], {
      queryParams: {
        id: id,
      },
    });
  }
}
