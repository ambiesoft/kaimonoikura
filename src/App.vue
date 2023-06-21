<script setup>
import { ref } from "vue";
const greeting = ref("Hello World!");
const kaimonoItems = ref([
  {
    goods: "りんご",
    price: 100,
    count: 1,
    taxRate: 0.8,
  },
  {
    goods: "レモン",
    price: 80,
    count: 2,
    taxRate: 0.8,
  },
]);
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
  <div v-for="(item, index) in kaimonoItems">
    {{ index }}
    {{ item.goods }}
    {{ item.price }}
  </div>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
