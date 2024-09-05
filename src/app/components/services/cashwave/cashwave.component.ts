import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { HomeComponent } from "../../home/home.component";

@Component({
  selector: 'app-cashwave',
  standalone: true,
  imports: [NavbarComponent, HomeComponent],
  templateUrl: './cashwave.component.html',
  styleUrl: './cashwave.component.css'
})
export class CashwaveComponent {

}
