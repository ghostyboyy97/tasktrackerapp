# TasktrackerAngular

This project was the initial jQuery-based prototype of the task tracking application, later [refactored into Angular](https://ghostyboyy97.github.io/tasktracker_angular/). It utilizes localStorage to dynamicaly save and load task lists.

## How to create a list

Opening the app starts on the All Lists view. Click "Add a new list" to enter the tasklist view. You will be prompted with three potential inputs:
- "Back to all lists", which returns you to the All Lists view
- "Add a title", a text input to name your current tasklist
- A + button to add a task to the list
Fill in a title for your list and then click + to start adding tasks to your list!

## Task management

Each task has its own title and optional description field. Name the task in its title field, and then add any extra notes about the task or a list of subtasks in the description text input below.

To delete a task, press the trash can icon.

Each task can have four statuses, selectable from a dropdown on the left:
- To Do, for tasks not started yet
- In Progress, for tasks that are started but not complete
- On Hold, for tasks that cannot be started yet
- Completed, for finished tasks

## Development server

To start a local development server, run `http-server` with npm http-server installed.

## Building and deployment

This app is a static site deployed through GitHub Pages. The page is currently live at GitHub Pages right now, pushing code to main will push the code live to the web app.