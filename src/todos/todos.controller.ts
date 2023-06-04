import { Controller, Get, Post, Body, Param, Patch, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
    constructor (private readonly todosService: TodosService ) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todosService.findOne(id);
    }

    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Post()
    createTodo(@Body() newTodo: CreateTodoDto, @Res() res: Response) {
        this.todosService.create(newTodo);
        res.set('Location', '/');
        res.status(302).send();
    }

    @Post(':id')
    updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto, @Res() res: Response) {
        this.todosService.update(id, todo);
        res.set('Location', '/');
        res.status(302).send();
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        return this.todosService.delete(id);
    }
}