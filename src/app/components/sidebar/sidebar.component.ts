import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone : true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isActive: boolean = false;

  // Función para alternar el estado del sidebar
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
