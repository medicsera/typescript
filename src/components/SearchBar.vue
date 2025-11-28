<template>
  <div class="search-task-form">
    <div class="search-task">
      <input class="search-task-input" type="text" placeholder="Search task" :value="modelValue"
        @input="onInput" />
      <img class="search-task-lupe" src="../assets/lupe.svg" />
    </div>
    <button class="open-modal-btn" @click="$emit('open-modal')">+</button>
    <button class="logout" @click="logout">
      <img class="exit" src="../assets/exit.svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

defineProps<{
  modelValue: string
}>();

const emit = defineEmits<{
  (e: "open-modal"): void;
  (e: "logout"): void;
  (e: "update:modelValue", value: string): void;
}>();

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value)
}

function logout(): void {
  emit("logout");
}
</script>

<style scoped lang="scss">
.search-task-form {
  @include flex-center;
  width: 100%;
  height: 40px;
  max-width: 560px;
  padding-top: 20px;

  .search-task {
    display: flex;
    align-items: center;
    margin: 0 10px 0 0;
    border: 4px;
    border-radius: 10px;
    background: $color-white;

    .search-task-input {
      max-width: 360px;
      font-size: $stat-font-size;
      margin-left: 10px;
      border: 0;
      height: 90%;
      outline: none;
    }

    .search-task-lupe {
      width: 30px;
      height: 100%;
      border: 0;
      background: $color-white;
      margin-right: 10px;
    }
  }

  .open-modal-btn {
    font-size: 1.5em;
    height: 100%;
    width: 40px;
    @include border;
    background: $color-light-purple;
    margin-right: 10px;
    transition: 0.3s ease;

    &:hover {
      background: $color-purple;
    }
  }

  .logout {
    @include border;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-light-purple;
    width: 40px;
    height: 40px;
    transition: 0.3s ease;

    &:hover {
      background: $color-purple;
    }
  }
}

@include respond-to(mobile) {
  .search-task-form {
    height: 30px;

    .search-task {
      width: 160px;
      margin: 0 5px;

      .search-task-input {
        width: 110px;
        font-size: 0.9em;
      }

      .search-task-lupe {
        width: 22px;
        margin-right: 0;
        margin-left: 5px;
      }
    }

    .open-modal-btn {
      height: 30px;
      width: 30px;
      font-size: 1.3em;
    }

    .logout {
      height: 30px;
      width: 30px;

      .exit {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
