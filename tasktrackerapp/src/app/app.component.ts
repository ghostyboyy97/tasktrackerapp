import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListView } from './app.listview';
import {signal, computed} from '@angular/core';
import {List, ListItem} from './app.list';

const activeList = signal(0);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListView],
  styleUrl: './app.component.scss',
  template: `
    <main>
      <header>
        <h1>Task Tracker App</h1>
        <button>Help</button>
      </header>
      <list-view></list-view>
    </main>
  `,
})
export class AppComponent {
  title = 'tasktrackerapp';
  activeList = signal(0);
}
