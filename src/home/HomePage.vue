<template>
  <div class="homepage">
    <TasksList :taskList="taskList" v-on:complete="onComplete($event)" />
    <CompletedTasksList
      :taskList="taskList"
      v-on:complete="onComplete($event)"
      v-on:delete="onDelete($event)"/>
  </div>
</template>

<script>
import CompletedTasksList from './components/CompletedTasksList.vue';
import TasksList from './components/TasksList.vue';

export default {
  data() {
    return {
      taskList: {},
    };
  },

  components: { TasksList, CompletedTasksList },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      if ('taskList' in localStorage) {
        this.taskList = JSON.parse(localStorage.getItem('taskList'));
      } else {
        const taskList = {
          IT: [],
          HR: [],
          'New Hire Paperwork': [],
          'Culture Orientation': [],
          Other: [],
        };
        localStorage.setItem('taskList', JSON.stringify(taskList));
        this.taskList = JSON.parse(localStorage.getItem('taskList'));
      }
    },
    onComplete(event) {
      const index = this.taskList[event.dept].findIndex((task) => task.id === event.id);
      this.taskList[event.dept][index].completed = !this.taskList[event.dept][index].completed;
      this.taskList[event.dept][index].completionDate = new Date().toLocaleDateString();
      localStorage.setItem('taskList', JSON.stringify(this.taskList));
      this.fetchTasks();
    },
    onDelete(event) {
      const index = this.taskList[event.dept].findIndex((task) => task.id === event.id);
      this.taskList[event.dept].splice(index, 1);
      localStorage.setItem('taskList', JSON.stringify(this.taskList));
      this.fetchTasks();
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Calistoga&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Calistoga&family=Merriweather&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Merriweather&display=swap');

.homepage {
  width: 100%;
}
</style>
