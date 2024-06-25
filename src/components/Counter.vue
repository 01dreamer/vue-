<!-- src/components/Counter.vue -->
<template>
    <div>
        <h1>Counter: {{ counterStore.count }}</h1>
        <button @click="counterStore.increment">Increment</button>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useCounterStore } from '@/store/counter'

const counterStore = useCounterStore()

</script>