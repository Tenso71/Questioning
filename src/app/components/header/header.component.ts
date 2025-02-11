import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Definimos la propiedad usuario correctamente
  usuario = {
    nombre: 'Usuario2834',
    foto: 'assets/images/dd.jpg'
  };

  // Método para redirigir
  irA(url: string) {
    window.location.href = url;
  }
}
