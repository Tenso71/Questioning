import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/components/header.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/components/sidebar.component';
import { PrincipalComponent } from './components/principal/components/principal.component';
import { FooterComponent } from './components/footer/components/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, PrincipalComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'questioning';
}
