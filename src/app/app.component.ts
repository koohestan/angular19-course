
import { Component } from '@angular/core';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-root',
  imports: [SidebarMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'computer-academy';
}
