import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';  // Importar Router para navegación
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../header/components/header.component';

/**
 * @component SubirPublicacionComponent
 * @description Componente para gestionar la subida de publicaciones. Permite al usuario ingresar una descripción, seleccionar una categoría y subir una imagen.
 */
@Component({
  selector: 'app-subir-publicacion',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent], 
  templateUrl: '../subirpublicacion/subirpublicacion.component.html',
  styleUrl: '../subirpublicacion/subirpublicacion.component.css'
})
export class SubirPublicacionComponent {
  /** @description Descripción de la publicación */
  descripcion: string = '';
  
  /** @description Categoría seleccionada para la publicación */
  categoria: string = '';
  
  /** @description Imagen seleccionada para la publicación */
  imagen: File | null = null;

  /** @description Mensaje de retroalimentación para el usuario */
  mensaje: string = '';

  /**
   * @constructor
   * @param cdr - ChangeDetectorRef para manejar la detección de cambios manualmente.
   * @param router - Router para la navegación entre rutas.
   */
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  /**
   * @method onFileSelected
   * @description Maneja el evento de selección de archivo para la imagen. Al seleccionar un archivo, se asigna a la propiedad `imagen`.
   * @param event - Evento que contiene el archivo seleccionado.
   */
  onFileSelected(event: any) {
    this.imagen = event.target.files[0] || null;
    this.cdr.detectChanges(); // Forzar detección de cambios
  }

  /**
   * @method subirPublicacion
   * @description Método que se ejecuta cuando el usuario envía el formulario para subir la publicación.
   * Se verifica que la descripción y la categoría no estén vacías antes de proceder.
   * Si los campos son válidos, simula un retraso y muestra un mensaje de éxito.
   */
  subirPublicacion() {
    if (!this.descripcion || !this.categoria) {
      this.mensaje = '❌ Por favor, completa la descripción y la categoría.';
      return;
    }

    setTimeout(() => {
      this.mensaje = '✅ Publicación subida correctamente!';
      this.descripcion = '';
      this.categoria = '';
      this.imagen = null;
      this.cdr.detectChanges();
    }, 1000);
  }

  /**
   * @method volverAPaginaPrincipal
   * @description Método para redirigir al usuario a la página principal.
   * Al hacer clic en el botón "Volver a la Página Principal", el usuario será redirigido a la ruta raíz (home).
   */
  volverAPaginaPrincipal() {
    this.router.navigate(['/']);  // Redirige a la ruta principal (home)
  }
}
