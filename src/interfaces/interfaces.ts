import { Moment } from 'moment'

export interface Task {
    text: string;
    id: string;
    done: boolean;
}
export interface Todo {
    period: string,
    task: Task
}

export interface RootState {
    selectedDate: Moment,
    todoList: { [key: string]: Array<Task> }
}
