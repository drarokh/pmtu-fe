import { Component, input, output } from '@angular/core';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  value = input('');
  changed = output<string>();
}
