import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import moment from 'moment';
import { Moment } from 'moment';
import Day from '@/components/calendar/day/day';
import styles from './calendar.css?module';
interface Props {
}

@Component
export default class Calendar extends VueComponent<Props> {

  private date: Moment = moment();
  private days: Array<string> = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  get monthStart(): Moment {
    return moment([this.date.year(), this.date.month()]);
  }
  get monthName(): string {
    const arr = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    return arr[this.date.month()];
  }

  incMonth(): void {
    this.date = this.date.add(1, 'month').clone();
  }
  decMonth(): void {
    this.date = this.date.add(-1, 'month').clone();
  }
  render() {
    let dayStart: number = this.monthStart.day();
    let day: Moment = moment(this.monthStart);
    const table: Array<Array<Moment>> = [];
    let week: number = 0;
    table[week] = [];
    for (let i = 0; i < dayStart; i++) {
      table[week].push(moment([day.year(), day.month()]).subtract(dayStart - i, 'd'));
    }
    while (day.month() === this.date.month()) {
      table[week].push(day.clone());
      if (day.day() === 6) {
        week += 1;
        table[week] = [];
      }
      day.add(1, 'd');
    }
    if (day.day() !== 0) {
      for (let i = 0; i < 7 - day.day(); i++) {
        table[week].push(moment([day.year(), day.month()]).add(i, 'd'));
      }
    }
    return (
      <div class={styles.calendar}>
        <div class={styles.header}>
          <div>
            <p class={styles.month}>
              {this.monthName} {this.date.year()}
            </p>
          </div>
        </div>
        <div class={styles.calendarWrapper}>
          <div>
            <div class={styles.calendarDays}>
              {this.days.map((day, index) => (
                <span class={styles.dayName} key={index + 'day'}>{day}</span>
              ))}
            </div>
            {table.map((week, index) => (
              <div class={styles.dateRow} key={index + 'week'}>
                {week.map((day, index) => (
                  <Day
                    key={index + 'day'}
                    date={day}
                    curMonth={this.monthStart.month()}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
