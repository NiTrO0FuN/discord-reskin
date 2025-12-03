<template>
    <div class="flex flex-col items-center">
        <img src="/title.png" alt="ReSkin title" width="150px" class="mx-10 mt-5" />
        <div class="separator"></div>
        <Suspense>
            <Options />
            <template #fallback>
                <Loader :amount="3" />
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts" setup>
import Loader from "@/components/Loader.vue";
import Options from "~/components/Options.vue";
</script>

<style>
.separator {
    width: 90%;
    border: 1px solid var(--primary);
    border-radius: 5px;
    box-shadow: 0 0 0 1px var(--secondary);
    margin: 20px 0;
}
</style>
