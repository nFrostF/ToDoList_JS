import {Todo, TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';
import './styles.css';

export const todolist = new TodoList();

todolist.todos.forEach(todo=>crearTodoHtml (todo));