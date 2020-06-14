import { Component } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import TodoElement from '@/components/todo/todoElement/todoelement';
import { Moment } from 'moment';
import styles from './todo.css?module';
import { Task } from '@/interfaces/interfaces';
import { RootStore } from '@/store';
import { useStore } from 'vuex-simple';

interface Props {
}

@Component
export default class Todo extends VueComponent<Props> {

  public store: RootStore = useStore(this.$store);
  private textInput = '';

  get selected(): Moment {
    return this.store.state.selectedDate;
  }

  get todo(): Array<Task> {
    return this.store.state.todoList[this.selected.format('YYYY-MM-DD')] || [];
  }

  addTodo(event: Event | any): void {
    if (event.keyCode !== 13) {
      return;
    }
    this.store.addTodo({
      period: this.selected.format('YYYY-MM-DD'),
      task: {
        text: this.textInput,
        id: this.selected.format('YYYY-MM-DD') + (this.todo.length + 1),
        done: false
      },
    });
    this.textInput = '';
  }

  render() {
    return (
      <div class={styles.todo}>
        <div class={styles.todoCaption}>
          <p>События</p>
        </div>
        {this.todo.map((todo, index) => {
          return <TodoElement key={'todo-' + this.selected + index} task={todo}/>;
        })}
        <div class={styles.todoInputWrapper}>
          <span></span>
          <input
            type="text"
            v-model={this.textInput}
            placeholder={'Текст'}
            onkeydown={this.addTodo}
            class={styles.todoInput}
          />
        </div>
      </div>
    );
  }
}
