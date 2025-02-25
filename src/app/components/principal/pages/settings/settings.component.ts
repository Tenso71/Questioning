// Importación de módulos necesarios de Angular
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { HeaderComponent } from "../../../header/components/header.component";

/**
 * @component SettingsComponent
 * @description Componente para la configuración de la cuenta del usuario.
 * Este componente permite actualizar el correo electrónico, cambiar la contraseña,
 * seleccionar el idioma preferido y cerrar sesión.
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [FormsModule, CommonModule, HeaderComponent]  
})
export class SettingsComponent {
  // Variables de estado para almacenar datos de usuario y validaciones
  email: string = '';  // Correo del usuario
  oldPassword: string = '';  // Contraseña actual
  newPassword: string = '';  // Nueva contraseña
  confirmPassword: string = '';  // Confirmación de la nueva contraseña
  language: string = 'es';  // Idioma seleccionado (valor por defecto: español)
  message: string = '';  // Mensaje de confirmación/error
  emailValid: boolean = true;  // Indicador de si el correo es válido
  passwordValid: boolean = true;  // Indicador de si la contraseña es válida
  passwordsMatch: boolean = true;  // Indicador de si las contraseñas coinciden

  constructor() {}

  /**
   * @method actualizarCorreo
   * @description Actualiza el correo del usuario y valida su formato.
   * Si el correo es válido, se muestra un mensaje de éxito.
   * Si no es válido, se muestra un mensaje de error.
   */
  actualizarCorreo() {
    // Expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (this.email && emailPattern.test(this.email)) {
      this.message = 'Correo actualizado correctamente!';
      this.emailValid = true;
    } else {
      this.message = 'Por favor, ingresa un correo válido.';
      this.emailValid = false;
    }
  }

  /**
   * @method cambiarPassword
   * @description Cambia la contraseña del usuario.
   * Valida que las contraseñas coincidan y que la nueva contraseña tenga una longitud mínima.
   */
  cambiarPassword() {
    // Validación de coincidencia de contraseñas y longitud mínima
    this.passwordsMatch = this.newPassword === this.confirmPassword;
    const minPasswordLength = 6;

    if (!this.passwordsMatch) {
      this.message = 'Las contraseñas no coinciden.';
      this.passwordValid = false;
    } else if (this.newPassword.length < minPasswordLength) {
      this.message = 'La contraseña debe tener al menos 6 caracteres.';
      this.passwordValid = false;
    } else {
      this.message = 'Contraseña cambiada correctamente!';
      this.passwordValid = true;
    }
  }

  /**
   * @method cambiarIdioma
   * @description Cambia el idioma de la aplicación.
   * Muestra un mensaje de confirmación con el idioma seleccionado.
   */
  cambiarIdioma() {
    console.log(`Idioma cambiado a: ${this.language}`);
    this.message = `Idioma cambiado a: ${this.language}`;
  }

  /**
   * @method logout
   * @description Cierra la sesión del usuario.
   * Muestra un mensaje de confirmación al cerrar sesión.
   */
  logout() {
    console.log('Sesión cerrada');
    this.message = 'Has cerrado sesión correctamente.';
  }
}
