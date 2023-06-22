<script setup>
import { ref, computed } from "vue";
const greeting = ref("Hello World!");
const kaimonoItems = ref([
  {
    goods: "りんご",
    price: 100,
    count: 1,
    taxRate: 0.08,
  },
  {
    goods: "レモン",
    price: 80,
    count: 1,
    taxRate: 0.08,
  },
  {
    goods: "レモン",
    price: 80,
    count: 1,
    taxRate: 0.08,
  },
  {
    goods: "レモン",
    price: 80,
    count: 1,
    taxRate: 0.08,
  },
  {
    goods: "レモン",
    price: 80,
    count: 1,
    taxRate: 0.08,
  },
]);

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();;
  } else {
    return true;
  }
}

const goukei = computed(() => {
  let ret = 0;
  kaimonoItems.value.forEach((ki) => {
    let price = (Number)(ki.price);
    let count = (Number)(ki.count);
    let taxRate = (Number)(ki.taxRate);

    ret += Math.floor((price * count) * (1 + taxRate));
  })

  return ret;
})
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
  <div class="container">
    <div class="item" v-for="(item, index) in kaimonoItems">
      <div class="index">{{ index + 1 }}</div>
      <div class="goods"><input v-model="item.goods" /></div>
      <div class="price"><input v-model="item.price" @keypress="isNumber($event)" /></div>
      <div class="count"><input v-model="item.count" @keypress="isNumber($event)" /></div>
      <div class="tax-rate"><input v-model="item.taxRate" @keypress="isNumber($event)" /></div>
    </div>

    <div class="item">
      {{ goukei }}
    </div>
  </div>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}

.container {
  max-width: 960px;
  margin: 100px auto;
  padding: 10px;
  display: grid;
}

.item {
  background: steelblue;
  color: #fff;
  font-size: 20px;
  padding: 20px;
  border: skyblue 1px solid;

  display: flex;
}

.index {
  width: 16px;
}
</style>
