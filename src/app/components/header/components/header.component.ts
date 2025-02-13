/**
 * @component HeaderComponent
 * @description Componente que representa el encabezado (header) de la aplicación.
 * Incluye el logo, la barra de búsqueda y la información del usuario, así como funcionalidades
 * para recargar la página y navegar entre rutas.
 *
 * @example
 * <app-header></app-header>
 */
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
  /**
   * Información del usuario que se muestra en el header.
   */
  usuario = {
    nombre: 'Usuario2834',
    foto: 'assets/images/dd.jpg'
  };

  /**
   * Bandera que indica si el menú desplegable del usuario está abierto.
   */
  dropdownOpen = false;

  /**
   * Crea una instancia del HeaderComponent.
   *
   * @param searchService Servicio para actualizar el término de búsqueda.
   * @param router Servicio para la navegación entre rutas.
   */
  constructor(private searchService: SearchService, private router: Router) {}

  /**
   * Recarga la página actual.
   *
   * @param event Evento disparado al hacer clic en el enlace del logo.
   *
   * @description Previene la acción predeterminada del enlace y recarga la página.
   */
  recargarPagina(event: Event): void {
    event.preventDefault(); // Evita la navegación predeterminada de la etiqueta <a>
    window.location.reload(); // Recarga la página completamente
  }

  /**
   * Alterna la visibilidad del menú desplegable del usuario.
   *
   * @description Cambia el valor de {@link dropdownOpen} para mostrar u ocultar el menú.
   */
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    console.log('dropdownOpen:', this.dropdownOpen);
  }

  /**
   * Navega a la ruta especificada.
   *
   * @param url Ruta a la que se desea navegar.
   *
   * @description Utiliza el servicio {@link Router} para cambiar de ruta.
   */
  irA(url: string): void {
    this.router.navigate([url]);
  }

  /**
   * Actualiza el término de búsqueda en el servicio de búsqueda.
   *
   * @param term Término de búsqueda ingresado por el usuario.
   *
   * @description Invoca el método {@link SearchService.updateSearchTerm} para actualizar el término de búsqueda.
   */
  onSearchChange(term: string): void {
    this.searchService.updateSearchTerm(term);
  }
}
