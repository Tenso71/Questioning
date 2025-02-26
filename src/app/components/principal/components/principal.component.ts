import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../../header/service/search.service';
import { FooterComponent } from "../../footer/components/footer.component";
import { HeaderComponent } from "../../header/components/header.component";
import { SidebarService } from "../../sidebar/service/sidebar.service"; 
import { SidebarComponent } from "../../sidebar/components/sidebar.component"; 
import { NewsService } from '../../services/news.service'; 

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent, SidebarComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy {

  noticias: any[] = [];
  private newsSubscription!: Subscription;
  private searchSubscription!: Subscription;
  private sidebarSubscription!: Subscription;

  usuarioActual: string = 'UsuarioDeQuestioning435';
  pageTitle: string = 'Preguntas Destacadas';
  currentSearchTerm: string = '';
  currentCategory: string = '';
  nuevaRespuesta: Record<string, string> = {};

  // Preguntas iniciales de diferentes categorías
  preguntasFavoritas: any[] = [
    { descripcion: 'Mejorar en programación es un reto constante, ¿qué consejos tienen para hacerlo más efectivo?', autor: 'DevMaster', votos: 120, respuestas: [], mostrar: false, usuariosVotaron: [], imagen: 'images/eee.jpg', categoria: 'informatica', avatar: 'images/avatars/1.png' },
    { descripcion: 'Este año han salido muchas buenas películas, pero ¿cuál creen que es la mejor de todas?', autor: 'CineFan23', votos: 95, respuestas: [], mostrar: false, usuariosVotaron: [], categoria: 'cine', avatar: 'images/avatars/2.jpg' },
    { descripcion: '¿Qué juegos de PC recomiendan para quienes tienen una PC de gama media?', autor: 'GamerX', votos: 150, respuestas: [], mostrar: false, usuariosVotaron: [], imagen: 'images/game.jpg', categoria: 'gaming', avatar: 'images/avatars/3.png' },
    { descripcion: '¿Qué consejos tienen sobre la maternidad en los primeros meses?', autor: 'MaternidadExpert', votos: 75, respuestas: [], mostrar: false, usuariosVotaron: [], categoria: 'maternidad', avatar: 'images/avatars/4.png' },
    { descripcion: '¿Cómo mantener una relación sana y duradera?', autor: 'RelacionesExpert', votos: 100, respuestas: [], mostrar: false, usuariosVotaron: [], categoria: 'relaciones', avatar: '/images/avatars/5.png' },
    { descripcion: '¿Cuál es la mejor forma de organizar las tareas domésticas diarias?', autor: 'OrganizaTodo', votos: 85, respuestas: [], mostrar: false, usuariosVotaron: [], categoria: 'tareas-domesticas', avatar: '/images/avatars/6.png' }
  ];

  filteredPreguntas = [...this.preguntasFavoritas];

  constructor(
    private searchService: SearchService, 
    private sidebarService: SidebarService, 
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.preguntasFavoritas.forEach(pregunta => {
      pregunta.respuestas = this.generarRespuestas(pregunta.categoria, 5);
    });

    this.filteredPreguntas = [...this.preguntasFavoritas];

    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.currentSearchTerm = term;
      this.applyFilters();
    });

    this.sidebarSubscription = this.sidebarService.selectedTheme$.subscribe(selection => {
      this.pageTitle = selection.theme;
      this.currentCategory = selection.category;
      this.applyFilters();
    });

    this.newsSubscription = this.newsService.getTopHeadlines('us', 'technology').subscribe({
      next: (data) => { this.noticias = data.articles; },
      error: (err) => console.error('Error al cargar noticias:', err)
    });
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
    this.sidebarSubscription?.unsubscribe();
    this.newsSubscription?.unsubscribe();
  }

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

  generarRespuestas(categoria: string, cantidad: number): any[] {
    const respuestasPosibles: Record<string, string[]> = {
      'programación': ['Practica con proyectos reales.', 'Lee código de otros desarrolladores.', 'Aprende algoritmos y estructuras de datos.', 'Resuelve desafíos en plataformas como LeetCode.', 'Colabora en proyectos de código abierto.'],
      'cine': ['Observa la narrativa y la dirección.', 'Disfruta la experiencia visual y sonora.', 'Explora diferentes géneros cinematográficos.', 'Comparte opiniones con amigos.', 'Investiga sobre la historia del cine.'],
      'gaming': ['Prueba diferentes géneros y plataformas.', 'Participa en comunidades online.', 'Sigue a tus streamers y creadores favoritos.', 'Practica para mejorar tus reflejos.', 'Analiza estrategias de juego.'],
      'maternidad': ['Busca apoyo en tu comunidad.', 'Mantén una rutina saludable.', 'Aprende sobre el desarrollo del bebé.', 'No tengas miedo de pedir ayuda.', 'Escucha a tu cuerpo y cuida de ti misma.'],
      'relaciones': ['Comunicación abierta es clave.', 'Haz tiempo para compartir con tu pareja.', 'Escucha activamente.', 'Resuelve los conflictos de manera constructiva.', 'Fomenta la confianza mutua.'],
      'tareas-domesticas': ['Haz una lista de tareas diarias.', 'Establece horarios y rutinas.', 'Distribuye las tareas entre todos los miembros del hogar.', 'Mantén un espacio limpio y organizado.', 'Haz de la limpieza una actividad diaria.']
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
        usuario: this.usuarioActual,
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

  darLike(respuesta: any) {
    if (!respuesta.votoUsuario) {
      respuesta.likes = (respuesta.likes || 0) + 1;
      respuesta.votoUsuario = 'like';
    }
  }

  darDislike(respuesta: any) {
    if (!respuesta.votoUsuario) {
      respuesta.dislikes = (respuesta.dislikes || 0) + 1;
      respuesta.votoUsuario = 'dislike';
    }
  }

  agregarRespuestaComentario(respuesta: any) {
    if (this.nuevaRespuesta[respuesta.texto]?.trim()) {
      if (!respuesta.respuestas) {
        respuesta.respuestas = [];
      }
      respuesta.respuestas.push({
        usuario: this.usuarioActual,
        imagen: 'images/dd.jpg',
        texto: this.nuevaRespuesta[respuesta.texto]
      });
      this.nuevaRespuesta[respuesta.texto] = '';
    }
  }
}
