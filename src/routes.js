import HomePage from './home/HomePage.vue';
import AddTaskForm from './home/components/AddTaskForm.vue';
import EditTaskForm from './home/components/EditTaskForm.vue';

export default [
  { path: '/', component: HomePage },
  { path: '/AddTask', component: AddTaskForm },
  {
    path: '/EditTask',
    name: 'edit',
    component: EditTaskForm,
    props: true,
  },
];
