<template>
  <div class="modal">
    <div class="modal-task">
      <form class="modal-task-form" @submit.prevent="submitTask">
        <label class="modal-task-label">Новая задача</label>
        <input class="modal-task-input" v-model="newText" placeholder="Введите текст задачи" required />
        <div class="modal-task-btns">
          <button type="button" class="modal-task-cancel" @click="$emit('close')">
            Отмена
          </button>
          <button type="submit" class="modal-task-add">Добавить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Task } from "../stores/useTodoStore";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "add-task", payload: Task): void;
}>();

const newText = ref<string>("");

function submitTask(): void {
  if (!newText.value.trim()) return;

  const task: Task = {
    id: Date.now(),
    text: newText.value.trim(),
    completed: false,
    email: "",
  };

  emit("add-task", task);
  newText.value = "";
}
</script>


<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-color);
  @include flex-center;
  align-items: center;
  z-index: 1000;

  &-task {
    background: $color-dark-purple;
    padding: 20px;
    @include border;
    min-width: 300px;
    height: 200px;
    margin-bottom: 10%;

    &-form {
      display: flex;
      flex-direction: column;
      height: 100%;

      .modal-task-label {
        color: $color-white;
        font-size: $stat-font-size*1.3;
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
      }

      .modal-task-input {
        border: 0;
        border-radius: 10px;
        width: 90%;
        height: 40px;
        padding-left: 20px;
        font-size: $stat-font-size;
        outline: none;
        transition: 0.3s ease;

          &:hover {
            background: $color-grey;
          }
      }

      .modal-task-btns {
        margin-top: auto;
        display: flex;
        justify-content: space-between;

        .modal-task-cancel {
          background: $color-light-red;
          font-size: $stat-font-size*0.9;
          color: $color-white;
          border: 0;
          border-radius: 5px;
          padding: 5px;
          transition: 0.3s ease;

          &:hover {
            background: $color-red;
          }
        }

        .modal-task-add {
          background: $color-light-green;
          font-size: $stat-font-size*0.9;
          color: $color-black;
          border: 0;
          border-radius: 5px;
          transition: 0.3s ease;

          &:hover {
            background: $color-green;
          }
        }
      }
    }
  }
}

@include respond-to(mobile) {
  .modal {
    &-task {
      min-width: 220px;

      &-form {
        .modal-task-input {
          font-size: 1.1em;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
