import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../../header/service/search.service';
import { FooterComponent } from "../../footer/components/footer.component";
import { HeaderComponent } from "../../header/components/header.component";
import { SidebarService } from "../../sidebar/service/sidebar.service"; 
import { SidebarComponent } from "../../sidebar/components/sidebar.component";  

/**
 * Componente principal de la aplicación.
 *
 * Este componente muestra la lista de preguntas destacadas, permite filtrar las preguntas según el
 * término de búsqueda y la categoría seleccionada, gestionar la votación de preguntas y agregar respuestas.
 *
 * @component
 * @implements {OnInit, OnDestroy}
 *
 * @example
 * <app-principal></app-principal>
 */
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent, SidebarComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy {
  /**
   * Nombre del usuario actual.
   */
  usuarioActual: string = 'UsuarioDeQuestioning435';

  /**
   * Título de la página que se muestra en el componente.
   */
  pageTitle: string = 'Preguntas Destacadas';

  /**
   * Término de búsqueda actual ingresado por el usuario.
   */
  currentSearchTerm: string = '';

  /**
   * Categoría actual seleccionada en el sidebar.
   */
  currentCategory: string = '';

  /**
   * Lista de preguntas destacadas.
   *
   * Cada objeto de la lista contiene propiedades como descripción, autor, votos, respuestas,
   * imagen, categoría y avatar.
   */
  preguntasFavoritas = [
    { 
      descripcion: 'Mejorar en programación es un reto constante, ¿qué consejos tienen para hacerlo más efectivo?', 
      autor: 'DevMaster', 
      votos: 120, 
      respuestas: this.generarRespuestas('programación', 5),
      mostrar: false,
      usuariosVotaron: [],
      imagen: 'images/eee.jpg',
      categoria: 'informatica',
      avatar: 'images/avatars/1.png'
    },
    { 
      descripcion: 'Este año han salido muchas buenas películas, pero ¿cuál creen que es la mejor de todas?', 
      autor: 'CineFan23', 
      votos: 95, 
      respuestas: this.generarRespuestas('cine', 5),
      mostrar: false,
      usuariosVotaron: [],
      categoria: 'cine',
      avatar: 'images/avatars/2.jpg'
    },
    { 
      descripcion: '¿Qué juegos de PC recomiendan para quienes tienen una PC de gama media? Estoy buscando algunos títulos interesantes.', 
      autor: 'GamerX', 
      votos: 150, 
      respuestas: this.generarRespuestas('juegos', 5),
      mostrar: false,
      usuariosVotaron: [],
      imagen: 'images/game.jpg',
      categoria: 'gaming',
      avatar: 'images/avatars/3.png'
    },
    { 
      descripcion: 'El estrés laboral afecta a todos, ¿qué estrategias utilizan para manejarlo y mantener relaciones saludables?', 
      autor: 'PsicoHelp', 
      votos: 80, 
      respuestas: this.generarRespuestas('relaciones', 5),
      mostrar: false,
      usuariosVotaron: [],
      categoria: 'relaciones',
      avatar: 'images/avatars/4.jpg'
    },
    { 
      descripcion: '¿Cuál es la mejor película de "El Señor de los Anillos" en tu opinión?', 
      autor: 'Enano34', 
      votos: 32, 
      respuestas: this.generarRespuestas('cine', 5),
      mostrar: false,
      usuariosVotaron: [],
      categoria: 'cine',
      avatar: 'images/avatars/5.jpg'
    },
    { 
      descripcion: '¿Cómo configuro Odoo? Me cuesta mucho trabajo.', 
      autor: 'OdooNewbie', 
      votos: 8, 
      respuestas: this.generarRespuestas('odoo', 5),
      mostrar: false,
      usuariosVotaron: [],
      categoria: 'informatica',
      avatar: 'images/avatars/6.jpg'
    },
    { 
      descripcion: '¿Cómo puedo hacer para que mi bebé se duerma? Tiene 7 meses y no consigo hacerlo dormir.', 
      autor: 'MadreSoltera3432', 
      votos: 29, 
      imagen: 'images/bebe.png',
      respuestas: this.generarRespuestas('maternidad', 5),
      mostrar: false,
      usuariosVotaron: [],
      categoria: 'maternidad',
      avatar: 'images/avatars/7.jpg'
    },
    { 
      descripcion: 'Consejos para organizar las tareas domésticas y ahorrar tiempo en el hogar.', 
      autor: 'Organizator', 
      votos: 45, 
      respuestas: this.generarRespuestas('tareas-domesticas', 5),
      mostrar: false,
      usuariosVotaron: [],
      categoria: 'tareas-domesticas',
      avatar: 'images/avatars/8.jpg'
    },
    { 
      descripcion: '¿Qué consejos das para mejorar la experiencia en videojuegos y competir a un nivel superior?', 
      autor: 'ProGamer', 
      votos: 110, 
      respuestas: this.generarRespuestas('juegos', 5),
      mostrar: false,
      usuariosVotaron: [],
      categoria: 'gaming',
      avatar: 'images/avatars/9.jpg'
    },
    { 
      descripcion: '¿Qué métodos recomiendas para mantener relaciones saludables a largo plazo?', 
      autor: 'HombreExitoso', 
      votos: 60, 
      respuestas: this.generarRespuestas('relaciones', 5),
      mostrar: false,
      imagen: 'images/avatars/10.jpg',
      usuariosVotaron: [],
      categoria: 'relaciones',
      avatar: 'images/avatars/10.jpg'
    }
  ];

  /**
   * Lista de preguntas filtradas de acuerdo al término de búsqueda y la categoría seleccionada.
   */
  filteredPreguntas = [...this.preguntasFavoritas];

  /**
   * Objeto que almacena las respuestas nuevas para cada pregunta.
   * La clave es la descripción de la pregunta.
   */
  nuevaRespuesta: Record<string, string> = {};

  /**
   * Subscripción al servicio de búsqueda.
   */
  private searchSubscription!: Subscription;

  /**
   * Subscripción al servicio del sidebar para la selección de temas.
   */
  private sidebarSubscription!: Subscription;

  /**
   * Crea una instancia del componente.
   *
   * @param searchService Servicio para gestionar el término de búsqueda.
   * @param sidebarService Servicio para gestionar la selección de temas en el sidebar.
   */
  constructor(private searchService: SearchService, private sidebarService: SidebarService) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   *
   * Se subscribe a los servicios de búsqueda y sidebar para actualizar los filtros de preguntas.
   */
  ngOnInit() {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.currentSearchTerm = term;
      this.applyFilters();
    });
    this.sidebarSubscription = this.sidebarService.selectedTheme$.subscribe(selection => {
      this.pageTitle = selection.theme;
      this.currentCategory = selection.category;
      this.applyFilters();
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   *
   * Se cancelan las subscripciones para evitar fugas de memoria.
   */
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.sidebarSubscription.unsubscribe();
  }

  /**
   * Aplica los filtros de búsqueda y categoría a la lista de preguntas.
   *
   * Filtra las preguntas que coincidan con la categoría seleccionada y el término de búsqueda ingresado.
   */
  applyFilters() {
    this.filteredPreguntas = this.preguntasFavoritas.filter(p => {
      const matchesCategory = this.currentCategory ? p.categoria === this.currentCategory : true;
      const matchesSearch = this.currentSearchTerm 
        ? p.descripcion.toLowerCase().includes(this.currentSearchTerm.toLowerCase()) ||
          p.autor.toLowerCase().includes(this.currentSearchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }
  

  /**
   * Genera respuestas simuladas para una categoría dada.
   *
   * @param categoria Categoría de la pregunta.
   * @param cantidad Número de respuestas a generar.
   * @returns Un array de objetos que representan las respuestas.
   */
  generarRespuestas(categoria: string, cantidad: number): any[] {
    const respuestasPosibles: Record<string, string[]> = {
      'programación': [
        'Practica con proyectos reales.',
        'Lee código de otros desarrolladores.',
        'Aprende algoritmos y estructuras de datos.',
        'Resuelve desafíos en plataformas como LeetCode.',
        'Colabora en proyectos de código abierto.'
      ],
      'cine': [
        'Observa la narrativa y la dirección.',
        'Disfruta la experiencia visual y sonora.',
        'Explora diferentes géneros cinematográficos.',
        'Comparte opiniones con amigos.',
        'Investiga sobre la historia del cine.'
      ],
      'juegos': [
        'Prueba diferentes géneros y plataformas.',
        'Participa en comunidades online.',
        'Sigue a tus streamers y creadores favoritos.',
        'Practica para mejorar tus reflejos.',
        'Analiza estrategias de juego.'
      ],
      'relaciones': [
        'La comunicación es la clave.',
        'La confianza se construye con el tiempo.',
        'Comparte tus sentimientos abiertamente.',
        'Escucha activamente a los demás.',
        'Resuelve conflictos con empatía.'
      ],
      'odoo': [
        'Consulta la documentación oficial.',
        'Mira tutoriales en YouTube.',
        'Únete a foros y comunidades de usuarios.',
        'Realiza pruebas en un entorno seguro.',
        'Busca asesoría en grupos especializados.'
      ],
      'maternidad': [
        'Descansa cuando puedas y cuida de ti misma.',
        'Busca apoyo en familiares y amigos.',
        'Confía en tu instinto maternal.',
        'Organiza tu rutina de forma flexible.',
        'Comparte experiencias con otras madres.'
      ],
      'tareas-domesticas': [
        'Organiza tu tiempo y establece rutinas, porcierto eres muy exitoso me encanta.',
        'Comparte las responsabilidades familiares,  porcierto eres muy exitoso me encanta',
        'Utiliza aplicaciones para planificar las tareas,  porcierto eres muy exitoso me encanta',
        'Haz una lista de tareas diarias,  porcierto eres muy exitoso me encanta',
        'Simplifica las tareas con ayuda tecnológica,  porcierto eres muy exitoso me encanta'
      ]
    };

    const usuarios = ['TechGuru', 'GameMaster22', 'CineFan45', 'MindRelax', 'CodeNinja'];
    
    return respuestasPosibles[categoria]?.slice(0, cantidad).map((respuesta, index) => ({
      usuario: usuarios[index % usuarios.length],
      imagen: 'images/dd.jpg',
      texto: respuesta
    })) || [];
  }

  /**
   * Agrega una nueva respuesta a la pregunta indicada.
   *
   * @param pregunta Objeto que representa la pregunta a la que se agregará la respuesta.
   */
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

  /**
   * Verifica si el usuario actual ya ha votado por la pregunta.
   *
   * @param pregunta Objeto que representa la pregunta.
   * @returns {boolean} Verdadero si el usuario ya votó; falso en caso contrario.
   */
  usuarioVotado(pregunta: any): boolean {
    return pregunta.usuariosVotaron.includes(this.usuarioActual);
  }

  /**
   * Registra un voto para la pregunta indicada.
   *
   * Si el usuario aún no ha votado, incrementa el contador de votos y añade el usuario a la lista de votantes.
   *
   * @param pregunta Objeto que representa la pregunta a votar.
   */
  votar(pregunta: any) {
    if (!this.usuarioVotado(pregunta)) {
      pregunta.votos += 1;
      pregunta.usuariosVotaron.push(this.usuarioActual);
    }
  }

  // FUNCIONALIDADES NUEVAS PARA COMENTARIOS (LIKE/DISLIKE Y RESPUESTAS A COMENTARIOS)

  /**
   * Agrega un like a una respuesta.
   * Solo se permite si el usuario aún no ha votado esa respuesta.
   * @param respuesta Objeto que representa la respuesta.
   */
  darLike(respuesta: any) {
    if (!respuesta.votoUsuario) {
      respuesta.likes = (respuesta.likes || 0) + 1;
      respuesta.votoUsuario = 'like';
    }
  }

  /**
   * Agrega un dislike a una respuesta.
   * Solo se permite si el usuario aún no ha votado esa respuesta.
   * @param respuesta Objeto que representa la respuesta.
   */
  darDislike(respuesta: any) {
    if (!respuesta.votoUsuario) {
      respuesta.dislikes = (respuesta.dislikes || 0) + 1;
      respuesta.votoUsuario = 'dislike';
    }
  }

  /**
   * Agrega una respuesta a un comentario (respuesta) existente.
   * @param respuesta Objeto que representa la respuesta a la que se responderá.
   */
  agregarRespuestaComentario(respuesta: any) {
    if (this.nuevaRespuesta[respuesta.texto]?.trim()) {
      if (!respuesta.respuestas) {
        respuesta.respuestas = [];
      }
      respuesta.respuestas.push({
        usuario: 'UsuarioDeQuestioning435',
        imagen: 'images/dd.jpg',
        texto: this.nuevaRespuesta[respuesta.texto]
      });
      this.nuevaRespuesta[respuesta.texto] = '';
    }
  }
}
