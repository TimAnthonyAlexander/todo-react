# Todo App

Eine einfache und moderne Aufgabenliste, gebaut mit React und TypeScript.
Sortierung und Filtern leicht gemacht.

## Demo

Hier online ausprobieren: [todo.timanthonyalexander.de](https://todo.timanthonyalexander.de)

## Repo

Der Code liegt öffentlich auf GitHub: 
[github.com/TimAnthonyAlexander/todo-react](https://github.com/TimAnthonyAlexander/todo-react)

## Components

### Die App nutzt:
- React + TypeScript
- Material-UI (hab ich verwendet, da ich mich damit auskenne und bei euch auch noch Material-UI verwendet wird)
- @dnd-kit für Drag-and-Drop (hatte erst react-beautiful-dnd)
- LocalStorage zur Datenspeicherung
- Vite zum Bauen (auch zur Erstellung des Projekts genutzt)

### Todo
Container

### TodoInput
Aufgaben erstellen

### TodoList
Zeigt deine Aufgaben nach Status gefiltert an; sortierbar per Drag-and-Drop.  

### TodoItem
Das Aufgaben-Item, das sich auch per Drag'n'Drop neu sortieren lässt.

### TodoFilter
Toggle:
- allen Aufgaben
- offenen Aufgaben
- erledigten Aufgaben

### SortableTodo
Per dnd-kit sortierbarer Container für die Todo-Items.
Ich hatte erst react-beautiful-dnd verwendet aber das ist deprecated und funktionierte nicht sonderbar gut mit MUI.
