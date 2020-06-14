import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { Moment } from 'moment';
import { Todo, RootState } from '@/interfaces/interfaces';
import { Mutation, State, createVuexStore } from 'vuex-simple';
Vue.use(Vuex);

export class RootStore {
  @State()
  public state: RootState;
  constructor() {
    this.state = {
      selectedDate: moment(),
      todoList: {
        '2020-06-13': [
          { text: 'Купить хлеб', id: '1234', done: false },
          { text: 'Купить чего-нибудь вкусненького', id: '5678', done: false }
        ],
      },
    };
  }
  @Mutation()
  _setSelectedDate(payload: Moment) {
    this.state.selectedDate = payload;
  }

  @Mutation()
  _addTodo(payload: Todo) {
    const period = payload.period;

    if (this.state.todoList[period]) {
      this.state.todoList[period].push(payload.task);
    } else {
      this.state.todoList = { ...this.state.todoList, [period]: [payload.task] };
    }
  }

  @Mutation()
  _commitTask(payload: any) {
    this.state.todoList[payload.period].forEach((task) => {
      if (task.id === payload.taskId) {
        task.done = payload.done;
      }
    });
  }

  setSelectedDate(payload: Moment) {
    this._setSelectedDate(payload);
  }
  addTodo(payload: Todo) {
    this._addTodo(payload);
  }
  commitTask(payload: any) {
    this._commitTask(payload);
  }
}

const store = new RootStore();
export default createVuexStore(store, {
  strict: false,
  modules: {},
  plugins: [],
});
