/**
 * @component SidebarComponent
 * @description Componente que maneja la visualización y selección del Sidebar,
 * permitiendo al usuario cambiar el tema de la aplicación.
 *
 * @example
 * <app-sidebar></app-sidebar>
 */
import { Component } from '@angular/core';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  /**
   * Bandera que indica si el Sidebar está activo (visible) o no.
   */
  isActive: boolean = false;

  /**
   * Crea una instancia del componente Sidebar.
   *
   * @param sidebarService Servicio para la gestión del tema seleccionado en el Sidebar.
   */
  constructor(private sidebarService: SidebarService) {}

  /**
   * Alterna la visibilidad del Sidebar.
   *
   * @description Cambia el estado de {@link isActive} para mostrar u ocultar el Sidebar.
   */
  toggleSidebar(): void {
    this.isActive = !this.isActive;
  }

  /**
   * Selecciona un tema y actualiza la categoría en el servicio del Sidebar.
   *
   * @param theme Nombre del tema a seleccionar.
   * @param category Categoría asociada al tema.
   *
   * @description Actualiza el tema seleccionado a través del {@link SidebarService} y cierra el Sidebar.
   */
  selectTheme(theme: string, category: string): void {
    // Actualiza el tema seleccionado en el servicio.
    this.sidebarService.updateTheme(theme, category);
    // Opcional: cierra el sidebar al seleccionar un tema.
    this.isActive = false;
  }
}
