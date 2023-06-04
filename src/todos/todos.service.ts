import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    todos: Todo[] = [
        {
            id: 1,
            title: 'To do list',
            description: 'Faire une web app avec NestJs',
            done: true,
        },
        {
            id: 2,
            title: 'Postuler',
            description: 'Postuler à THESEUS AI',
            done: true,
        },
        {
            id: 3,
            title: 'App météo',
            description: 'Finir l\' intégration de mon application météorologique',
            done: false,
        },
        {
            id: 4,
            title: 'Alternance',
            description: 'Être recruté par THESEUS AI',
            done: false,
        },
    ];

    findOne(id: string) {
        return this.todos.find(todo => todo.id === Number(id));
    }

    findAll(): Todo[] {
        return this.todos;
    }

    create(todo: CreateTodoDto) {
        const newTodo: Todo = {
            id: new Date().getTime(),
            title: todo.title,
            description: todo.description,
            done: false,
        };
        this.todos.push(newTodo);
    }

    update(id: string, todo: Todo) {
        const todoToUpdate = this.todos.find(todo => todo.id === +id);
        if (!todoToUpdate) {
            return new NotFoundException('todo not found');
        }
        if (todo.title) {
            todoToUpdate.title = todo.title;
        }
        if (todo.description) {
            todoToUpdate.description = todo.description;
        }
        if (todo.hasOwnProperty('done')) {
            if (todoToUpdate.done === false) {
                todoToUpdate.done = true;
            } else {
                todoToUpdate.done = false;
            }
        }
        const updatedTodos = this.todos.map(todo => todo.id !== +id ? todo : todoToUpdate)
        this.todos = [...updatedTodos];
        return { updatedTodo: 1, todo: todoToUpdate};
    }

    delete(id: string) {
        const nbOfTodosBeforeDelete = this.todos.length;
        this.todos = [...this.todos.filter(todo => todo.id !== +id)];
        if(this.todos.length < nbOfTodosBeforeDelete) {
            return { deletedTodos: 1, nbTodos: this.todos.length }
        } else {
            return { deletedTodos: 0, nbTodos: this.todos.length }
        }
    }
}
