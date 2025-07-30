import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal, computed } from '@angular/core';
import { Listitem } from './listitem';
import { ListitemComponent } from './listitem/listitem.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListitemComponent],
  styleUrl: './app.component.scss',
  templateUrl: `./app.component.html`,
})
export class AppComponent {
  title = 'Task Tracker App';
  LOCAL_STORAGE_KEY = "__ng_tasktrackerapp_data__";

  // for loop - track parameter is used to keep the dom association, can pass in any parameter and then access all parts of the child easily
  allItems:Array<Listitem> = [
    // {
    //   uuid: 0,
    //   title: "Landing page",
    //   desc: "Set up the user interface for choosing a list",
    //   status: "in_progress",
    // },
    // {
    //   uuid: 1,
    //   title: "List page",
    //   desc: "Set up the user interface for adding/modifying/removing items from an individual list",
    //   status: "to_do",
    // },
    // {
    //   uuid: 2,
    //   title: "Saving and loading",
    //   desc: "Autosave changes to list items, and load those lists at runtine",
    //   status: "to_do",
    // },
    // {
    //   uuid: 3,
    //   title: "Styling",
    //   desc: "Make it all look pretty!",
    //   status: "on_hold",
    // },
  ];

  addItem(){
    this.allItems.push({
      uuid: Date.now(),
      title: "",
      desc: "",
      status: "to_do",
    });
    this.saveItems();
  }

  get items() {
    return this.allItems;
  }

  remove(item: Listitem){
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.saveItems();
  }

  saveItems(){
    console.log("save")
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.allItems));
  }

  ngOnInit(){
    console.log("setup")
    let itemsToLoad = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    console.log(itemsToLoad);
    if (typeof itemsToLoad){
      this.allItems = JSON.parse(itemsToLoad || "[]");

    }
  }

}
