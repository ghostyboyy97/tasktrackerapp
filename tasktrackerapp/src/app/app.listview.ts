import { Component } from '@angular/core';

@Component({
  selector: "list-view",
  standalone: true,
  template: `
  <section>
    <h1>Select a list below or create a new list</h1>
    <div>
        <button>Add a list</button>
    </div>
  </section>
  `,
})

export class ListView {}

// MUST HAVES
    // add a list - change to list creation view
    // set up list creation view
    // changeable list title
    // ability to add list items
    // ability to delete list items
    // ability to modify text of list items
    // change status of list items (checked/unchecked)
    // save list locally on change
    // back to lists button
    // lists view populates saved lists
    // prettify everything
// NICE TO HAVES
    // progress bars
    // list item descriptions
    // help button goes to 