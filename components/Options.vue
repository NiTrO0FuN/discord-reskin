<template>
    <div class="optionRow">
        <label for="avatar">{{ browser.i18n.getMessage("avatarStyle") }}</label>
        <img
            src="https://cdn.discordapp.com/embed/avatars/0.png"
            width="32px"
            id="avatar"
            :class="config.avatar"
            @click="toggleAvatar"
        />
    </div>
    <div class="optionRow">
        <label for="backgroundImage">{{ browser.i18n.getMessage("backgroundImage") }}</label>
        <input
            id="backgroundImage"
            type="url"
            :placeholder="browser.i18n.getMessage('backgroundImageLink')"
            :class="config.avatar"
            v-model="config.backgroundImage"
        />
    </div>
</template>

<script lang="ts" setup>
import { useConfig } from "@/composables/config";

const config = await useConfig();
const backgroundImageURL = computed(() => `url(${config.backgroundImage})`);

function toggleAvatar() {
    config.avatar == "round" ? (config.avatar = "rect") : (config.avatar = "round");
}
</script>

<style>
.optionRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 5%;
    margin: 0 0 10px;
    color: white;
}

label {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
        Geneva, Verdana, sans-serif;
}

#avatar {
    cursor: pointer;
    border-radius: 20%;
    &.round {
        border-radius: 50%;
    }
    transition: border-radius 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

#backgroundImage {
    padding: 0 5px;
    &.round {
        border-radius: 10px;
    }
    border: 2px solid var(--primary);
    transition: border-radius 300ms cubic-bezier(0.4, 0, 0.2, 1);
    &:focus-visible {
        outline: 2px solid var(--primary);
    }
}

div:has(> #backgroundImage) {
    background-image: v-bind("backgroundImageURL");
    background-size: cover;
}
</style>
