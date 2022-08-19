<template>
  <div class="task-list">
    <div v-for="dept in completedDepts" :key="dept">
      <span class="dept-header">{{ dept }}</span>
      <ul class="mdc-list" role="group" aria-label="List with checkbox items">
        <li
          v-for="task in completedTaskList[dept]"
          :key="task.id"
          class="mdc-list-item list-item"
          aria-checked="false">
          <input
            type="checkbox"
            class="task-checkbox"
            :checked="task.completed"
            v-on:change="checked(task.id, dept)"/>
          <label class="mdc-list-item__text list-item-label">
            <span class="task-desc">{{ task.title }} </span>
            <span class="task-assignee-date">
              Completed by {{ task.assignee }} on {{ task.completionDate }}
            </span>
          </label>
          <button class="delete-task-btn" @click="deleteTask(task.id, dept)">
            <span class="material-icons"> delete </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    taskList: {
      type: Object,
      required: true,
    },
  },
  methods: {
    checked(id, dept) {
      this.$emit('complete', { id, dept });
    },
    deleteTask(id, dept) {
      this.$emit('delete', { id, dept });
    },
  },
  computed: {
    completedTaskList() {
      const depts = Object.keys(this.taskList);
      const filtered = {};
      depts.forEach((dept) => {
        if (this.taskList[dept].length !== 0) {
          this.taskList[dept].forEach((task) => {
            if (task.completed) {
              if (dept in filtered) filtered[dept].push(task);
              else filtered[dept] = [task];
            }
          });
        }
      });
      return filtered;
    },
    completedDepts() {
      return Object.keys(this.completedTaskList);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@material/list/mdc-list';
@use '@material/button/styles';
@use '@material/checkbox';
@use '@material/form-field';
</style>

<style scoped>
.task-list {
  margin-top: 1rem;
  padding: 0 0;
}

.dept-header {
  color: rgb(92, 92, 92);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

.task-checkbox {
  height: 1rem;
  width: 1rem;
}

.list-item {
  cursor: auto;
}
.list-item-label {
  font-family: 'Lato', sans-serif;
}

.task-desc {
  padding: 0 1rem;
  text-decoration: line-through;
}
.task-assignee-date {
  color: rgb(86, 86, 86);
  font-size: 0.9rem;
}
.delete-task-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: 0;
}
</style>
