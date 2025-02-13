// principal.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../service/search.service';
import * as lunr from 'lunr';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy {
  usuarioActual: string = 'UsuarioDeQuestioning435';

  preguntasFavoritas = [
    { 
      descripcion: 'Mejorar en programación es un reto constante, ¿qué consejos tienen para hacerlo más efectivo?', 
      autor: 'DevMaster', 
      votos: 120, 
      respuestas: this.generarRespuestas('programación', 15),
      mostrar: false,
      usuariosVotaron: [],
      imagen: 'images/eee.jpg'
    },
    { 
      descripcion: 'Este año han salido muchas buenas películas, pero ¿cuál creen que es la mejor de todas?', 
      autor: 'CineFan23', 
      votos: 95, 
      respuestas: this.generarRespuestas('películas', 8),
      mostrar: false,
      usuariosVotaron: [],
    },
    { 
      descripcion: '¿Qué juegos de PC recomiendan para quienes tienen una PC de gama media? Estoy buscando algunos títulos interesantes.', 
      autor: 'GamerX', 
      votos: 150, 
      respuestas: this.generarRespuestas('juegos', 25),
      mostrar: false,
      usuariosVotaron: [],
      imagen: 'images/game.jpg'
    },
    { 
      descripcion: 'El estrés laboral es algo que afecta a todos, ¿qué estrategias usan para mantenerlo bajo control?', 
      autor: 'PsicoHelp', 
      votos: 80, 
      respuestas: this.generarRespuestas('estrés', 10),
      mostrar: false,
      usuariosVotaron: [],
      imagen: ''
    },
    { 
      descripcion: 'Cual es la mejor pelicula de el señor de los anillos en vuestra opinion??', 
      autor: 'Enano34', 
      votos: 32, 
      respuestas: this.generarRespuestas('pelicula', 10),
      mostrar: false,
      usuariosVotaron: [],
      imagen: ''
    },
    { 
      descripcion: 'Como configuro Odoo??, me cuesta mucho trabajo', 
      autor: 'OdooNewbie', 
      votos: 8, 
      respuestas: this.generarRespuestas('odoo', 10),
      mostrar: false,
      usuariosVotaron: [],
      imagen: ''
    }
  ];

  // Variable para el filtrado
  filteredPreguntas = [...this.preguntasFavoritas];

  nuevaRespuesta: Record<string, string> = {};

  private searchSubscription!: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    // Se suscribe al observable del término de búsqueda
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.filterPreguntas(term);
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  filterPreguntas(term: string) {
    if (term.trim() === '') {
      this.filteredPreguntas = [...this.preguntasFavoritas];
    } else {
      const lowerTerm = term.toLowerCase();
      this.filteredPreguntas = this.preguntasFavoritas.filter(pregunta =>
        pregunta.descripcion.toLowerCase().includes(lowerTerm)
      );
    }
  }

  generarRespuestas(categoria: string, cantidad: number): any[] {
    const respuestasPosibles: Record<string, string[]> = {
      'programación': [
        'Practica con proyectos reales.',
        'Lee código de otros desarrolladores.',
        'Aprende algoritmos y estructuras de datos.',
        'Resuelve desafíos en plataformas como LeetCode.',
        'Colabora en proyectos de código abierto.'
      ],
      'películas': [
        'Para mí, "Oppenheimer" fue la mejor del año.',
        'Me encantó "Spider-Man: Across the Spider-Verse".',
        'Creo que "Barbie" sorprendió a muchos.',
        'La mejor fue "The Killer", una obra maestra de Fincher.'
      ],
      'estrés': [
        'Hago ejercicio regularmente para liberar el estrés.',
        'Meditar 10 minutos al día me ayuda mucho.',
        'Trato de organizar mejor mi tiempo para evitar sobrecarga.'
      ],
      'juegos': [
        'Recomiendo Hollow Knight, es ligero y excelente.',
        'The Witcher 3 en bajo rendimiento va bien.',
        'Celeste es un gran indie con historia profunda.',
        'Minecraft corre en casi cualquier PC.',
        'Disco Elysium es una joya narrativa que no exige mucho.',
        'Factorio es muy entretenido y optimizado.'
      ],
      'pelicula': [
        'La comunidad del anillo',
        'Las dos torres',
        'El retorno del rey'
      ],
      'odoo': [
        'Mira tutoriales en YouTube.',
        'Lee la documentación oficial.',
        'Pregunta en foros especializados.',
        'Practica con ejemplos sencillos.',
        'Participa en grupos de usuarios.'
      ]
    };

    const usuarios = ['TechGuru', 'GameMaster22', 'CineFan45', 'MindRelax', 'CodeNinja'];
    
    return respuestasPosibles[categoria]?.slice(0, cantidad).map((respuesta, index) => ({
      usuario: usuarios[index % usuarios.length],
      imagen: 'images/dd.jpg',
      texto: respuesta
    })) || [];
  }

  agregarRespuesta(pregunta: any) {
    if (this.nuevaRespuesta[pregunta.descripcion]?.trim()) {
      pregunta.respuestas.push({
        usuario: 'UsuarioDeQuestioning435',
        imagen: 'images/dd.jpg',
        texto: this.nuevaRespuesta[pregunta.descripcion]
      });
      this.nuevaRespuesta[pregunta.descripcion] = '';
    }
  }

  usuarioVotado(pregunta: any): boolean {
    return pregunta.usuariosVotaron.includes(this.usuarioActual);
  }

  votar(pregunta: any) {
    if (!this.usuarioVotado(pregunta)) {
      pregunta.votos += 1;
      pregunta.usuariosVotaron.push(this.usuarioActual);
    }
  }
}
