<template>
  <div class="task">
    <TaskItem
      v-for="task in props.tasks"
      :key="task.id"
      :task="task"
      @toggle-completed="emit('toggle-completed', task.id)"
      @delete-task="emit('delete-task', task.id)"
      @edit-task="emit('edit-task', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import TaskItem from "./TaskItem.vue";
import type { Task } from "../stores/useTodoStore";

const props = defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  (e: "toggle-completed", id: number): void;
  (e: "delete-task", id: number): void;
  (e: "edit-task", payload: {id: number, text: string}): void;
}>();
</script>

<style scoped lang="scss">
.task {
  padding: 30px 20px;
  font-size: $stat-font-size;
  display: grid;
  width: 100%;
}

@include respond-to(mobile) {
  .task {
    font-size: 1.1em;
    padding: 20px 0px;
  }
}
</style>
