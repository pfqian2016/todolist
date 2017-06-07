const TODO_KEY = 'todo-list';
export default {
  fetch() {
    return JSON.parse(window.localStorage.getItem(TODO_KEY) || '[]')
  },
  save(items) {
    window.localStorage.setItem(TODO_KEY,JSON.stringify(items))
  },
  clear() {
    window.localStorage.removeItem(TODO_KEY);
  }
}
