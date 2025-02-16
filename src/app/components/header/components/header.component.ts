import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuario = {
    nombre: 'Usuario435',
    foto: 'assets/images/dd.jpg'
  };

  dropdownOpen = false;

  constructor(private searchService: SearchService, private router: Router) {}

  recargarPagina(event: Event): void {
    event.preventDefault();
    window.location.reload();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    console.log('dropdownOpen:', this.dropdownOpen);
  }

  irA(url: string): void {
    console.log("Navegando a:", url);  // Verifica la URL antes de navegar
    this.router.navigate([url]).then(() => {
      console.log("Navegación exitosa.");
    }).catch(err => {
      console.error("Error de navegación:", err);  // Verifica si hay errores
    });
  }

  onSearchChange(term: string): void {
    this.searchService.updateSearchTerm(term);
  }
}
