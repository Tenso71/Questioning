import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de incluir CommonModule aquí
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  preguntasFavoritas = [
    { 
      titulo: '¿Cómo mejorar en programación?', 
      autor: 'DevMaster', 
      votos: 120, 
      respuestas: 15 
    },
    { 
      titulo: '¿Cuál es la mejor película del año?', 
      autor: 'CineFan23', 
      votos: 95, 
      respuestas: 8 
    },
    { 
      titulo: '¿Cómo manejar el estrés en el trabajo?', 
      autor: 'PsicoHelp', 
      votos: 80, 
      respuestas: 10 
    },
    { 
      titulo: '¿Qué juegos recomendados para PC de gama media?', 
      autor: 'GamerX', 
      votos: 150, 
      respuestas: 25 
    }
  ];
}
