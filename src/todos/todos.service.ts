import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    todos: Todo[] = [
    {
        id: 1,
        title: 'Manger',
        description: 'Faire à manger',
        done: false,
    },
    {
        id: 2,
        title: 'Boire',
        description: 'Se préparer un chocolat chaud',
        done: true,
    },
    {
        id: 3,
        title: 'Se doucher',
        description: 'Aller prendre une douche',
        done: false,
    },
    ];

    findOne(id: string) {
        return this.todos.find(todo => todo.id === Number(id));
    }

    findAll(): Todo[] {
        return this.todos;
    }

    //! tuto yt
    // create(todo: CreateTodoDto) {
    //     this.todos = [...this.todos, todo];
    // }

    create(todo: CreateTodoDto) {
        const newTodo: Todo = {
            id: this.todos.length + 1,
            title: todo.title,
            description: todo.description,
            done: false,
        };
        this.todos.push(newTodo);
    }

    update(id: string, todo: Todo) {
        const todoToUpdate = this.todos.find(todo => todo.id === +id); // +id = Number(id)
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
            todoToUpdate.done = todo.done;
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
