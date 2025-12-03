<template>
    <div class="flex gap-2 my-5">
        <div v-for="i in amount" class="ball" :style="{ '--i': i }"></div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ amount: number }>();
</script>

<style>
.ball {
    background-color: var(--primary);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    animation: bounce 0.6s infinite ease-in-out;
    animation-delay: calc(var(--i) * 0.1s);
}

@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}
</style>
