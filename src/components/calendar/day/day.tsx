import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import { Moment } from 'moment';
import styles from './day.css?module';
import { RootStore } from '@/store/index';
import { useStore } from 'vuex-simple';

interface Props {
  date: Moment;
  curMonth: number;
}

@Component
export default class Day extends VueComponent<Props> {
  public store: RootStore = useStore(this.$store);
  @Prop()
  private date!: Moment;
  @Prop()
  private curMonth!: number;
  get selected(): Moment {
    return this.store.state.selectedDate;
  }
  get todo(): Array<any> {
    return this.store.state.todoList[this.date.format('YYYY-MM-DD')] || [];
  }
  setSelected(): void {
    this.store.setSelectedDate(this.date);
  }
  render() {
    const curMonthClass: any = this.curMonth === this.date.month() ? '' : styles.lastPrevMonth;
    const selectedDayClass: any = this.selected.isSame(this.date, 'day')
      ? [styles.selected, 'text-white']
      : '';
    const dayWithTodoClass: any = this.todo.length > 0 ? styles.dayWithTodo : '';
    return (
      <div
        class={styles.date}
        onClick={this.setSelected}
      >
        <div class={[curMonthClass, selectedDayClass, dayWithTodoClass]}>
          <span class={styles.dateSpan}>
            {this.date.date()}
          </span>
        </div>
      </div>
    );
  }
}
