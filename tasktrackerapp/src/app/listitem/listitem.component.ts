import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Listitem } from '../listitem';

@Component({
  selector: 'app-listitem',
  standalone: true,
  imports: [],
  templateUrl: './listitem.component.html',
  styleUrl: './listitem.component.scss'
})
export class ListitemComponent {
  @Input() item!: Listitem;
  @Output() remove = new EventEmitter<Listitem>();
  @Output() saveItems = new EventEmitter<any>();

}
