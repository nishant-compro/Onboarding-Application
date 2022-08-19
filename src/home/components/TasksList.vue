<template>
  <div class="task-list-container">
    <div v-for="dept in activeDepts" :key="dept">
      <div class="dept-header">{{ dept }}</div>
      <ul class="mdc-list task-list" role="group" aria-label="List with checkbox items">
        <div class="list-item" v-for="task in activeTaskList[dept]" :key="task.id">
          <li class="mdc-list-item">
            <input
              type="checkbox"
              class="task-checkbox"
              :checked="task.completed"
              v-on:change="checked(task.id, dept)"/>
            <label class="mdc-list-item__text list-item-label" @click="edit(task.id, dept)">
              <span class="task-desc">{{ task.title }} </span>
              <span class="task-assignee-date"> {{ task.assignee }} - {{ task.date }} </span>
            </label>
          </li>
        </div>
        <li role="separator" class="mdc-list-divider"></li>
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
  data() {
    return {
      depts: [],
    };
  },
  created() {
    this.depts = Object.keys(this.taskList);
  },
  methods: {
    checked(id, dept) {
      this.$emit('complete', { id, dept });
    },
    edit(id, dept) {
      this.$router.push({
        name: 'edit',
        params: { id, currentDept: dept },
      });
    },
  },

  computed: {
    activeTaskList() {
      const depts = Object.keys(this.taskList);
      const filtered = {};
      depts.forEach((dept) => {
        if (this.taskList[dept].length !== 0) {
          this.taskList[dept].forEach((task) => {
            if (!task.completed) {
              if (dept in filtered) {
                filtered[dept].push(task);
              } else {
                filtered[dept] = [task];
              }
            }
          });
        }
      });
      return filtered;
    },
    activeDepts() {
      return Object.keys(this.activeTaskList);
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
.task-list-container {
  background-color: white;
  border-radius: 0.2rem;
  border-top: 0.2rem solid rgb(212, 0, 0);
  border: 0.1rem solid lightgrey;
  padding: 0 0;
}
.task-list {
  padding: 0 0;
}
.list-item {
  height: 2rem;
}

.dept-header {
  background-color: whitesmoke;
  border: 0.1rem solid lightgrey;
  color: rgb(54, 54, 54);
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  padding: 0.2rem 1rem;
}

.task-checkbox {
  height: 1rem;
  width: 1rem;
}

.list-item-label {
  cursor: pointer;
  font-family: 'Lato', sans-serif;
}

.task-desc {
  padding: 0 1rem;
}
.task-assignee-date {
  color: rgb(86, 86, 86);
  font-size: 0.9rem;
}
</style>
