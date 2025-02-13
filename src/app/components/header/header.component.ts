import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuario = {
    nombre: 'Usuario2834',
    foto: 'assets/images/dd.jpg'
  };

  dropdownOpen = false;

  constructor(private searchService: SearchService) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log('dropdownOpen:', this.dropdownOpen);
  }

  irA(url: string) {
    window.location.href = url;
  }

  // Actualiza el término de búsqueda en el servicio
  onSearchChange(term: string) {
    this.searchService.updateSearchTerm(term);
  }
}
