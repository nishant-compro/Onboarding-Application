<template>
  <div class="onboarding-topbar">
    <div class="onboarding-title">Onboarding Tasks</div>
    <button
      class="add-task-btn
      mdc-button mdc-button--outlined
       mdc-button--icon-leading"
      @click="ToAddTask">
      <span class="material-icons add-icon"> add_circle </span>
      <span class="mdc-button__ripple"></span>
      <span class="mdc-button__label btn-label">Add Task</span>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    ToAddTask() {
      this.$router.push('/AddTask');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@material/button/styles';
@use '@material/checkbox';
@use '@material/form-field';
@use '@material/line-ripple/mdc-line-ripple';
</style>

<style scoped>
.onboarding-topbar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.onboarding-title {
  font-family: 'merriweather', sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 1rem 0;
}
.add-task-btn.mdc-button--outlined {
  background-color: white;
  color: rgb(71, 71, 71);
  letter-spacing: 0;
  text-transform: capitalize;
}

.btn-label {
  font-family: 'Lato';
  font-weight: 600;
}
.add-icon {
  margin-right: 0.5rem;
}
</style>
