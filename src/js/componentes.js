import { Todo, TodoList } from '../classes';
import {todolist} from '../index'
import '../css/componentes.css';
// referencias al html

const divTodoList = document.querySelector('.todo-list');
const inputTodo = document.querySelector('.new-todo');
const divClearCompleted = document.querySelector('.clear-completed');
const filters = document.querySelector('.filters')


export const crearTodoHtml = (todo)=>{
    const htmlTodo = `
    <li class="${todo.completado? 'completed':'active'}" data-id=${todo.id}>
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado? 'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}


//eventos

inputTodo.addEventListener('keyup', (event)=>{
    if(event.keyCode === 13 && inputTodo.value.length > 0){
        const newTodo = new Todo(inputTodo.value)
        todolist.newTodo(newTodo);
        crearTodoHtml(newTodo);
        inputTodo.value = '';
    }
    
})

divTodoList.addEventListener('click', (event)=>{
    
    const elementName = event.target.localName; 
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if (elementName.includes('input')){
        const classChildBool = todolist.completed(todoId);
        todoElement.classList.remove('completed');
        todoElement.classList.remove('active');
        todoElement.classList.toggle(classChildBool? 'completed':'active');

        
    }

    else if (elementName.includes('button')){
        todolist.deleteTodo(todoId);
        divTodoList.removeChild(todoElement);
    }

   
})

divClearCompleted.addEventListener('click', (event)=>{

    const completedTasks = divTodoList.querySelectorAll('.completed');
    for (const each of completedTasks){
        divTodoList.removeChild(each)
    }
    todolist.deleteAllCompleted();

    
})

filters.addEventListener('click', (event)=>{

    
    for (const each of divTodoList.querySelectorAll('.completed')){
        each.classList.remove('hidden');
    }
    for (const each of divTodoList.querySelectorAll('.active')){
        each.classList.remove('hidden');
    }
   
    if (event.target.type == 'active'){

        for (const each of divTodoList.querySelectorAll('.completed')){
              each.classList.add('hidden');
              console.log(each)
            
        }

    }else if (event.target.type == 'completed'){
       
        for (const each of divTodoList.querySelectorAll('.active')){
            
            each.classList.add('hidden');
            console.log(each)
            
      }
    }                   

})
