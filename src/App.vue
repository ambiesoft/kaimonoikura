<script setup>
import { ref, computed } from "vue";

const upChar = '☝';
const downChar = '👇';

let id = 0;
const kaimonoItems = ref([
  {
    id: id++,
    goods: "りんご",
    price: 100,
    count: 1,
    discountRate: 0,
    taxRate: 8,
  },
  {
    id: id++,
    goods: "レモン",
    price: 80,
    count: 1,
    discountRate: 0,
    taxRate: 8,
  },
  {
    id: id++,
    goods: "レモン",
    price: 80,
    count: 1,
    discountRate: 0,
    taxRate: 8,
  },
  {
    id: id++,
    goods: "レモン",
    price: 80,
    count: 1,
    discountRate: 0,
    taxRate: 8,
  },
  {
    id: id++,
    goods: "レモン",
    price: 80,
    count: 1,
    discountRate: 0,
    taxRate: 8,
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
function incrementCount(index) {
  kaimonoItems.value[index].count++;
}
function decrementCount(index) {
  if (kaimonoItems.value[index].count == 0) {
    return;
  }
  kaimonoItems.value[index].count--;
}
function incrementDiscountRate(index) {
  kaimonoItems.value[index].discountRate++;
}
function decrementDiscountRate(index) {
  if (kaimonoItems.value[index].discountRate == 0) {
    return;
  }

  kaimonoItems.value[index].discountRate--;
}
function incrementTaxRate(index) {
  let curRate = kaimonoItems.value[index].taxRate;
  let setRate = 0;
  if (0 <= curRate && curRate < 8) {
    setRate = 8;
  } else if (8 <= curRate && curRate < 10) {
    setRate = 10;
  } else {
    return;
  }
  kaimonoItems.value[index].taxRate = setRate;
}
function decrementTaxRate(index) {
  let curRate = kaimonoItems.value[index].taxRate;
  let setRate = 0;
  if (10 < curRate) {
    setRate = 8;
  } else if (8 < curRate) {
    setRate = 8;
  } else {
    setRate = 0;
  }
  kaimonoItems.value[index].taxRate = setRate;
}
function getItemKei(item) {
  let price = (Number)(item.price);
  let count = (Number)(item.count);
  let taxRate = (Number)(item.taxRate);
  let discountRate = (Number)(item.discountRate);

  return Math.floor(((price - (price * (discountRate / 100))) * count) * ((100 + taxRate) / 100));
}
function isZeroItem(item) {
  return getItemKei(item) == 0;
}

function addItem() {
  kaimonoItems.value.push({
    id: kaimonoItems.value.length,
    goods: "",
    price: 0,
    count: 1,
    discountRate: 0,
    taxRate: 8,
  })
  console.log(kaimonoItems.value);
}
function deleteItem(index) {
  kaimonoItems.value.splice(index, 1);
}
const goukei = computed(() => {
  let ret = 0;
  kaimonoItems.value.forEach((ki) => {
    ret += getItemKei(ki);
  })

  return ret;
})

</script>

<template>
  <div class="container">
    <div class="item" :class="{ emptyitem: isZeroItem(item) }" v-for="(item, index) in kaimonoItems">
      <div class="cell">
        <div class="setumei">商品</div>
        <div class="goods">
          <input class="stringinput" v-model="item.goods" />
        </div>
      </div>

      <div class="cell">
        <div class="setumei">価格</div>
        <div class="price">
          <input class="numberinput" v-model="item.price" @keypress="isNumber($event)" />
        </div>
      </div>

      <div class="cell">
        <div class="setumei">個数</div>
        <div class="count">
          <input class="numberinput" v-model="item.count" @keypress="isNumber($event)" />
        </div>
        <div>
          <button class="twobutton" @click="decrementCount(index)">{{ downChar }}</button>
          <button class="twobutton" @click="incrementCount(index)">{{ upChar }}</button>
        </div>
      </div>

      <div class="cell">
        <div class="setumei">割引％</div>
        <div class="discount-rate">
          <input class="numberinput" v-model="item.discountRate" @keypress="isNumber($event)" />
        </div>
        <div>
          <button class="twobutton" @click="decrementDiscountRate(index)">
            {{ downChar }}
          </button>
          <button class="twobutton" @click="incrementDiscountRate(index)">
            {{ upChar }}
          </button>
        </div>
      </div>

      <div class="cell">
        <div class="setumei">税率％</div>
        <div class="tax-rate">
          <input class="numberinput" v-model="item.taxRate" @keypress="isNumber($event)" />
        </div>
        <div>
          <button class="twobutton" @click="decrementTaxRate(index)">
            {{ downChar }}
          </button>
          <button class="twobutton" @click="incrementTaxRate(index)">
            {{ upChar }}
          </button>
        </div>
      </div>

      <div class="cell">
        <div class="setumei">削除</div>
        <button @click="deleteItem(index)">❌</button>
      </div>
    </div>

    <div class=" item">
      <button @click="addItem">追加</button>
    </div>

    <div class="item">
      <div class="goukei">
        支払金額：{{ goukei }} 円
      </div>
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

.emptyitem {
  background: lightcoral;
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

button {
  padding: 0px;
  height: 2em;
}

.twobutton {
  width: 50%;
}

.threebutton {
  width: 33%;
}

.stringinput {
  text-align: center;
}

.numberinput {
  text-align: center;
}

.index {
  width: 16px;
}

.goukei {
  width: 100%;
  text-align: right;
}
</style>
