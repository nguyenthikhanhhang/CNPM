import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './staff.html',
  styleUrl: './staff.css'
})
export class StaffComponent {}