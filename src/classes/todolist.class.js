import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        this.cargarLocalStorage();
    }

    newTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }
  
    deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id)
        this.guardarLocalStorage();
        
    }

    completed(id){
        for (const todo of this.todos){
            
            if (todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();              
                return todo.completado;
               
            }
            
        }
    }

    deleteAllCompleted(){
        this.todos = this.todos.filter(todo=> todo.completado == false);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
        
    }

    cargarLocalStorage(){

        this.todos = localStorage.getItem('todo')? JSON.parse(localStorage.getItem('todo')): [];

        this.todos = this.todos.map(obj => Todo.fromJson(obj));
           
        
    }
}