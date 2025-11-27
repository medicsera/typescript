<template>
  <div class="page">
    <div class="login-reg__container">
      <h1>Регистрация</h1>
      <form class="form" @submit.prevent="register">
        <input
          class="form-input"
          v-model="email"
          placeholder="Email"
          required
        />
        <input
          class="form-input"
          v-model="password"
          placeholder="Password"
          required
        />
        <input
          class="form-input"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <button class="form-btn" type="submit">Зарегистрироваться</button>
        <p class="error" v-if="error">{{ error }}</p>
      </form>
      <div class="toggle-auth">
        <p>Есть аккаунт?</p>
        <router-link class="link" to="/login">Войти</router-link>
      </div>
    </div>
    <ThemeToggle></ThemeToggle>
    <AboutToggle></AboutToggle>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useUserStore } from "../stores/useUserStore";
import { useRouter } from "vue-router";
import ThemeToggle from "../components/ThemeToggle.vue";
import AboutToggle from "../components/AboutToggle.vue";

const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const error = ref<string>("");

const userStore = useUserStore();
const router = useRouter();

async function register(): Promise<void> {
  error.value = "";

  if (password.value != confirmPassword.value) {
    error.value = "Пароли не совпадают";
    return;
  }

  const res = userStore.register(email.value, password.value);

  if (res.error) {
    error.value = res.error;
  } else {
    await router.push("/todo");
  }
}
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  justify-content: center;
  color: $color-white;
}
</style>
