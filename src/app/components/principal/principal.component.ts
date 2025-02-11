import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de importar CommonModule
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  preguntasFavoritas = [
    { 
      descripcion: 'Mejorar en programación es un reto constante, ¿qué consejos tienen para hacerlo más efectivo?', 
      autor: 'DevMaster', 
      votos: 120, 
      respuestas: 15 
    },
    { 
      descripcion: 'Este año han salido muchas buenas películas, pero ¿cuál creen que es la mejor de todas?', 
      autor: 'CineFan23', 
      votos: 95, 
      respuestas: 8 
    },
    { 
      descripcion: 'El estrés laboral es algo que afecta a todos, ¿qué estrategias usan para mantenerlo bajo control?', 
      autor: 'PsicoHelp', 
      votos: 80, 
      respuestas: 10 
    },
    { 
      descripcion: '¿Qué juegos de PC recomiendan para quienes tienen una PC de gama media? Estoy buscando algunos títulos interesantes.',
      autor: 'GamerX', 
      votos: 150, 
      respuestas: 25 
    },
    { 
      descripcion: 'Soy nuevo en el mundo de la programación, ¿qué lenguaje me recomiendan aprender primero?',
      autor: 'Felipe23', 
      votos: 72, 
      respuestas: 5 
    }
  ];
}
