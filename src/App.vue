<script setup>
import { ref, computed } from "vue";
const greeting = ref("Hello World!");
const kaimonoItems = ref([
  {
    goods: "りんご",
    price: 100,
    count: 1,
    discountRate: 0,
    taxRate: 0.08,
  },
  {
    goods: "レモン",
    price: 80,
    count: 1,
    discountRate: 0,
    taxRate: 0.08,
  },
  {
    goods: "レモン",
    price: 80,
    count: 1,
    discountRate: 0,
    taxRate: 0.08,
  },
  {
    goods: "レモン",
    price: 80,
    count: 1,
    discountRate: 0,
    taxRate: 0.08,
  },
  {
    goods: "レモン",
    price: 80,
    count: 1,
    discountRate: 0,
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
    let discountRate=(Number)(ki.discountRate);

    ret += Math.floor(( (price-(price*discountRate)) * count) * (1 + taxRate));
  })

  return ret;
})
</script>

<template>
  <div class="container">
    <div class="item" v-for="(item, index) in kaimonoItems">
      <div class="cell">
      <div class="setumei">
        商品
      </div>
      <div class="goods">
        <input class="stringinput" v-model="item.goods" />
      </div>
    </div>

    <div class="cell">
      <div class="setumei">
        価格
      </div>
      <div class="price">
        <input class="numberinput" v-model="item.price" @keypress="isNumber($event)" />
      </div>
    </div>

    <div class="cell">
      <div class="setumei">
        個数
      </div>
      <div class="count">
        <input class="numberinput" v-model="item.count" @keypress="isNumber($event)" />
      </div>
      </div>

      <div class="cell">
      <div class="setumei">
        割引率
      </div>
      <div class="discount-rate">
        <input class="numberinput" v-model="item.discountRate" @keypress="isNumber($event)" />
      </div>
      </div>

      <div class="cell">
      <div class="setumei">
        税率
      </div>
      <div class="tax-rate">
        <input class="numberinput" v-model="item.taxRate" @keypress="isNumber($event)" />
      </div>
      </div>
    </div>

    <div class="item">
      {{ goukei }}
    </div>
  </div>
</template>

<style>

.container {
  width: 100%;
  margin: 0;
  padding: 10px;
  display: grid;
}

.item {
  background: steelblue;
  color: #fff;
  font-size: 20px;
  padding: 10px;
  border: skyblue 1px solid;

  display: flex;
}
.cell {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-left: 6px;
}
.setumei {
  font-size: medium;
}
input {
  font-size: large;
  padding: 5px;
  width: 100%;
}
.stringinput {
  text-align: center;
}
.numberinput {
  text-align: right;
}
.index {
  width: 16px;
}
</style>
