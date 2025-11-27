<template>
  <div class="page">
    <div class="login-reg__container">
      <h1>Вход</h1>
      <form class="form" @submit.prevent="login">
        <input class="form-input" v-model="email" placeholder="Email" required />
        <input class="form-input" v-model="password" placeholder="Password" required />
        <button class="form-btn" type="submit">Войти</button>
        <p class="error" :class="{ show: error }" v-show="error">{{ error }}</p>
      </form>
      <div class="toggle-auth">
        <p>Нет аккаунта?</p>
        <router-link class="link" to="/register">
          Зарегистрироваться</router-link>
      </div>
    </div>
    <ThemeToggle />
    <AboutToggle />
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
const error = ref<string>("");

const useStore = useUserStore();
const router = useRouter();

async function login(): Promise<void> {
    error.value = ""
    const res = useStore.login(email.value, password.value)

    if (res.error){
        error.value = res.error
    } else{
        await router.push("/todo")
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