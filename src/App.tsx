import { Component, Vue } from 'vue-property-decorator';
import Calendar from '@/components/calendar/calendar'
import Todo from '@/components/todo/todo'
import styles from './App.css?module'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
       <div class={styles.main}>
          <Calendar />
          <Todo />
       </div>
      </div>
    )
  }
}
