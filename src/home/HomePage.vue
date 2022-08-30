<template>
  <div class="homepage">
    <TasksList :taskList="taskList" :depts="depts" :fetchTasks="fetchTasks" />
    <CompletedTasksList :taskList="taskList" :depts="depts" :fetchTasks="fetchTasks"/>
  </div>
</template>

<script>
import CompletedTasksList from './components/CompletedTasksList.vue';
import TasksList from './components/TasksList.vue';

export default {
  data() {
    return {
      depts: [],
      taskList: [],
    };
  },

  components: { TasksList, CompletedTasksList },
  created() {
    this.fetchDepts();
    this.fetchTasks();
  },
  methods: {
    fetchDepts() {
      this.$http.get('http://localhost:5000/api/dept')
        .then((res) => { this.depts = res.data; });
    },
    fetchTasks() {
      this.$http.get('http://localhost:5000/api/task')
        .then((res) => { this.taskList = res.data; });
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
