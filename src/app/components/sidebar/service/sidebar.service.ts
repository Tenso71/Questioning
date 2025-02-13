// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private selectedThemeSubject = new BehaviorSubject<{ theme: string, category: string }>({ theme: 'Temas Destacados', category: '' });
  selectedTheme$ = this.selectedThemeSubject.asObservable();

  updateTheme(theme: string, category: string): void {
    this.selectedThemeSubject.next({ theme, category });
  }
}
