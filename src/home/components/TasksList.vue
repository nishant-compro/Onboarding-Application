<template>
  <div class="task-list-container">
    <div v-for="deptId in Object.keys(activeDepts)" :key="deptId">
      <div class="dept-header">{{ activeDepts[deptId] }}</div>
      <ul class="mdc-list task-list" role="group" aria-label="List with checkbox items">
        <div class="list-item" v-for="task in activeTaskList[deptId]" :key="task._id">
          <li class="mdc-list-item">
            <input
              type="checkbox"
              class="task-checkbox"
              :checked="task.completed"
              v-on:change="checked(task)"/>
            <label class="mdc-list-item__text list-item-label" @click="edit(task._id)">
              <span class="task-desc">{{ task.title }} </span>
              <span class="task-assignee-date"> {{ task.assignee }} - {{ task.endDate }} </span>
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
      required: true,
    },
    depts: {
      required: true,
    },
    fetchTasks: {
      required: true,
    },
  },

  methods: {
    checked(task) {
      const updatedTask = { ...task, completed: true };
      // eslint-disable-next-line no-underscore-dangle
      this.$http.put(`http://localhost:5000/api/task/${task._id}`, updatedTask)
        .then(() => {
          this.fetchTasks();
        });
    },
    edit(id) {
      this.$router.push({
        name: 'edit',
        params: { id },
      });
    },
  },

  computed: {
    activeTaskList() {
      const filtered = {};
      this.taskList.forEach((task) => {
        if (!task.completed) {
          if (task.department in filtered) {
            filtered[task.department].push(task);
          } else {
            filtered[task.department] = [task];
          }
        }
      });
      return filtered;
    },
    activeDepts() {
      const deptKeys = Object.keys(this.activeTaskList);
      const active = {};
      deptKeys.forEach((key) => {
        this.depts.forEach((dp) => {
          // eslint-disable-next-line no-underscore-dangle
          if (dp._id === key) {
            active[key] = dp.name;
          }
        });
      });
      return active;
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
  border: 0.1rem solid lightgrey;
  border-top: 0.2rem solid rgb(212, 0, 0);
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
