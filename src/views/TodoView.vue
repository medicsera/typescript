<template>
  <div class="page">
    <div class="page__container">
      <SearchBar v-model="searchQuery" @open-modal="showModal = true" @logout="handleLogout" />
      <TaskList
        :tasks="sortedTasks"
        @toggle-completed="toggleCompleted"
        @delete-task="deleteTask"
        @edit-task="editTask"
      />
      <TaskForm
        v-if="showModal"
        @close="showModal = false"
        @add-task="addTask"
      />
    </div>
    <ThemeToggle />
    <AboutToggle />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";
import SearchBar from "../components/SearchBar.vue";
import ThemeToggle from "../components/ThemeToggle.vue";
import AboutToggle from "../components/AboutToggle.vue";
import { useTodoStore, type Task } from "../stores/useTodoStore";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/useUserStore";

const showModal = ref<boolean>(false);
const searchQuery = ref<string>("");

const todoStore = useTodoStore();
const userStore = useUserStore();
const router = useRouter();

type NewTaskPayload = {
  text: string
}

function addTask(task: NewTaskPayload): void {
  if (!userStore.currentUser) return;

  const taskWithUser: Task = {
    id: Date.now(),
    text: task.text,
    completed: false,
    email: userStore.currentUser.email,
  };

  todoStore.addTask(taskWithUser);
  showModal.value = false;
}

function editTask(payload: { id: number; text: string }): void {
  todoStore.editTask(payload);
}

function deleteTask(id: number): void {
  if (confirm("Вы точно хотите удалить эту задачу?")) {
    todoStore.deleteTask(id);
  }
}

function toggleCompleted(id: number): void {
  todoStore.toggleCompleted(id);
}

const sortedTasks = computed<Task[]>(() => {
  if (!userStore.currentUser) return [];

  let filtered = todoStore.tasks.filter(
    (task) => task.email === userStore.currentUser!.email
  );

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter((t) => t.text.toLowerCase().includes(q));
  }

  return filtered.slice().sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });
});

function handleLogout(): void {
  userStore.logout();
  router.push("/login");
}
</script>


<style scoped lang="scss"></style>
