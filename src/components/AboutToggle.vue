<template>
    <router-link class="about-link" to="/about">?</router-link>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.about-link {
    @include flex-center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-color: var(--color-switch);
    color: var(--color-font);
    border: 0;
    position: fixed;
    z-index: 1000;
    left: 25px;
    bottom: 25px;
    transition: 0.3s ease;
    font-size: 3em;
    text-decoration: none;

    &:hover {
        background: var(--color-switch-bg);
    }
}

@include respond-to(mobile) {
    .about-link {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        font-size: 1.8em;
    }
}
</style>
