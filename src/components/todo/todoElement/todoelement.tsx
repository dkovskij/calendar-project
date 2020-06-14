import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import { Task } from '@/interfaces/interfaces';
import styles from './todoElement.css?module';
import { Moment } from 'moment';
import { useStore } from 'vuex-simple';
import { RootStore } from '@/store';
interface Props {
  task: Task;
}

@Component
export default class TodoElement extends VueComponent<Props> {

  @Prop()
  private task!: Task;

  public store: RootStore = useStore(this.$store);
  private confirm: boolean = this.task.done;

  get selectedDate(): Moment {
    return this.store.state.selectedDate;
  }

  checkTask() {
    this.store.commitTask( {
      period: this.selectedDate.format('YYYY-MM-DD'),
      taskId: this.task.id,
      done: this.confirm
    });
  }

  render() {
    return (
      <div class={styles.todo}>
        <label class={styles.checkboxLabel}>
          <input
            v-model={this.confirm}
            onchange={this.checkTask}
            class={styles.checkboxInput}
            type="checkbox" />
          <span></span>
        </label>
        <p class={[this.task.done ? styles.taskDone : '', styles.todoText]}>
          {this.task.text}
        </p>
      </div>
    );
  }
}
