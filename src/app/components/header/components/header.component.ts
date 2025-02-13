import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router'; // Importamos Router

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

  constructor(private searchService: SearchService, private router: Router) {} // Inyectamos Router

  recargarPagina(event: Event) {
    event.preventDefault(); // Evita la navegación predeterminada de la etiqueta <a>
    window.location.reload(); // Recarga la página completamente
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log('dropdownOpen:', this.dropdownOpen);
  }

  irA(url: string) {
    this.router.navigate([url]); // Navegación con Router
  }

  // Actualiza el término de búsqueda en el servicio
  onSearchChange(term: string) {
    this.searchService.updateSearchTerm(term);
  }
}
