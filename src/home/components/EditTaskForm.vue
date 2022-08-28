<template>
  <div class="body-wrapper">
    <button class="mdc-button" @click="goBack">
      <span class="material-icons back-icon"> arrow_back </span>
      <span class="back-btn-text"> Back</span>
    </button>
    <div class="edit-task-container">
      <div class="edit-task-heading">Edit Task</div>
      <form class="edit-task-form" target="_blank" @submit.prevent="onSubmit">
        <div class="task-title input-span">
          <span class="input-label">Title:</span>
          <label
          class="input-field
          mdc-text-field
          mdc-text-field--outlined
          mdc-text-field--no-label">
            <span class="mdc-notched-outline">
              <span class="mdc-notched-outline__leading"></span>
              <span class="mdc-notched-outline__trailing"></span>
            </span>
            <input
              class="mdc-text-field__input"
              v-model="title"
              @change="onChange"
              type="text"
              placeholder="Title"
              aria-label="Title"
              required />
          </label>
        </div>
        <div class="task-assignee input-span">
          <span class="input-label">Assignee:</span>
          <label
          class="input-field
          mdc-text-field
          mdc-text-field--outlined
          mdc-text-field--no-label">
            <span class="mdc-notched-outline">
              <span class="mdc-notched-outline__leading"></span>
              <span class="mdc-notched-outline__trailing"></span>
            </span>
            <input
              class="mdc-text-field__input"
              v-model="assignee"
              @change="onChange"
              type="text"
              placeholder="Assignee's Name"
              aria-label="Name"
              required/>
          </label>
        </div>
        <div class="task-date input-span">
          <span class="input-label">Date:</span>
          <label
            class="input-field
            mdc-text-field
            mdc-text-field--outlined
            mdc-text-field--no-label">
            <span class="mdc-notched-outline">
              <span class="mdc-notched-outline__leading"></span>
              <span class="mdc-notched-outline__trailing"></span>
            </span>
            <input
              class="mdc-text-field__input"
              v-model="date"
              @change="onChange"
              type="text"
              placeholder="DD/MM/YYYY"
              aria-label="Date"
              required/>
          </label>
        </div>
        <div class="task-dept input-span">
          <span class="input-label">Department:</span>
          <div id="demo-menu" class="mdc-menu-surface--anchor">
            <label
              class="input-field
              mdc-text-field
              mdc-text-field--outlined
              mdc-text-field--no-label">
              <span class="mdc-notched-outline">
                <span class="mdc-notched-outline__leading"></span>
                <span class="mdc-notched-outline__trailing"></span>
              </span>
              <input
                @input="toggleDropdown"
                @click="toggleDropdown"
                v-model="dept"
                type="text"
                class="mdc-text-field__input"
                placeholder="Select Department..."
                required/>
            </label>

            <div
              class="mdc-menu mdc-menu-surface"
              v-on:MDCMenu:selected.prevent="select">
              <ul
                class="mdc-list"
                role="menu"
                aria-hidden="true"
                aria-orientation="vertical"
                tabindex="-1">
                <li class="mdc-list-item" role="menuitem">
                  <span class="mdc-list-item__ripple"></span>
                  <span class="mdc-list-item__text">IT</span>
                </li>
                <li class="mdc-list-item" role="menuitem">
                  <span class="mdc-list-item__ripple"></span>
                  <span class="mdc-list-item__text">HR</span>
                </li>
                <li class="mdc-list-item" role="menuitem">
                  <span class="mdc-list-item__ripple"></span>
                  <span class="mdc-list-item__text">New Hire Paperwork</span>
                </li>
                <li class="mdc-list-item" role="menuitem">
                  <span class="mdc-list-item__ripple"></span>
                  <span class="mdc-list-item__text">Culture Orientation</span>
                </li>
                <li class="mdc-list-item" role="menuitem">
                  <span class="mdc-list-item__ripple"></span>
                  <span class="mdc-list-item__text">Other</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button
          class="edit-task-button mdc-button mdc-button--unelevated"
          type="submit"
          :disabled="submitButtonDisabled">
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__label btn-label">Save</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { MDCTextField } from '@material/textfield';
import { MDCMenu } from '@material/menu';

export default {
  props: {

    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      assignee: '',
      completed: false,
      date: '',
      dept: '',
      menu: null,
      submitButtonDisabled: true,
      task: {},
      title: '',
    };
  },

  created() {
    this.$http.get('http://localhost:5000/api/dept')
      .then((res) => {
        this.dept = res.data;
      });
    this.$http.get(`http://localhost:5000/api/task/${this.id}`)
      .then((res) => {
        this.task = res.data;
        // how to proceed when both dept and task are fetched
        // use watcher
        this.updateValues();
      });
  },
  mounted() {
    [].map.call(
      document.querySelectorAll('.mdc-text-field'),
      (el) => new MDCTextField(el),
    );
    this.menu = new MDCMenu(document.querySelector('.mdc-menu'));
    this.submitButtonDisabled = true;
  },
  methods: {
    updateValues() {
      this.title = this.task.title;
      this.assignee = this.task.assignee;
      this.date = this.task.date;
      this.dept = this.currentDept;
      this.completed = this.task.completed;
    },
    select(event) {
      this.dept = event.detail.item.innerText;
      this.submitButtonDisabled = false;
    },
    toggleDropdown() {
      this.menu.open = !this.menu.open;
    },
    onChange() {
      this.submitButtonDisabled = false;
    },
    onSubmit() {
      const index = this.taskList[this.currentDept].findIndex(
        (task) => task.id === this.id,
      );
      if (this.currentDept === this.dept) {
        this.taskList[this.currentDept][index].title = this.title;
        this.taskList[this.currentDept][index].assignee = this.assignee;
        this.taskList[this.currentDept][index].date = this.date;
      } else {
        this.taskList[this.currentDept].splice(index, 1);
        this.taskList[this.dept].push({
          id: this.id,
          title: this.title,
          assignee: this.assignee,
          date: this.date,
          completed: this.completed,
        });
      }
      localStorage.setItem('taskList', JSON.stringify(this.taskList));
      this.$router.replace('/');
    },
    goBack() {
      this.$router.replace('/');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@material/textfield';
@use '@material/textfield/mdc-text-field';
@use '@material/floating-label/mdc-floating-label';
@use '@material/line-ripple/mdc-line-ripple';
@use '@material/notched-outline/mdc-notched-outline';
@use '@material/button/styles';
@use '@material/checkbox';
@use '@material/form-field';
@use '@material/notched-outline';
@use '@material/list/mdc-list';
@use '@material/menu-surface/mdc-menu-surface';
@use '@material/menu/mdc-menu';
</style>

<style scoped>
.body-wrapper {
  margin-top: 2rem;
}
.back-icon {
  color: #ff4014;
  font-size: 1.3rem;
}
.back-btn-text {
  color: #ff4014;
  font-size: 1.3rem;
  text-transform: capitalize;
}
.edit-task-container {
  align-items: center;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  height: 28rem;
  margin: 1rem 0;
  padding: 2rem;
  width: 40rem;
}

.edit-task-heading {
  font-family: 'merriweather';
  font-size: 2rem;
  font-weight: 600;
}

.edit-task-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  width: 100%;
}

.input-span {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
}

.input-label {
  font-family: Cantarell;
  font-size: 1.2rem;
  padding-left: 1rem;
  width: 8rem;
}

.input-field {
  height: 3rem;
  width: 19rem;
}

.edit-task-button {
  --mdc-theme-primary: #ff4014;
  --mdc-theme-on-primary: #a1260a;
  align-self: center;
}

.btn-label {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
