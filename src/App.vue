<script setup>
import { ref, computed } from "vue";

const upChar = '☝';
const downChar = '👇';

let id = 0;

/** maruetsu normal */
const maruetsuNormal = [
  {
    id: id++,
    goods: "ファンタ２０００",
    price: 178,
    count: 1,
    taxRate: 8,
  },
  {
    id: id++,
    goods: "アイスまんじゅう",
    price: 180,
    count: 1,
    taxRate: 8,
  },
  {
    id: id++,
    goods: "爽",
    price: 80,
    count: 1,
    taxRate: 8,
  },
  {
    id: id++,
    goods: "ソーダフロート",
    price: 60,
    count: 1,
    taxRate: 8,
  },
  // end of maruetsu */
];

const kaimonoItems = ref(maruetsuNormal);

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
  if (!kaimonoItems.value[index].discountRate) {
    return;
  }
  kaimonoItems.value[index].discountRate--;
  if (kaimonoItems.value[index].discountRate == 0) {
    kaimonoItems.value[index].discountRate = null;
  }
}

function incrementDiscountValue(index) {
  kaimonoItems.value[index].discountValue++;
}
function decrementDiscountValue(index) {
  if (!kaimonoItems.value[index].discountValue) {
    return;
  }
  kaimonoItems.value[index].discountValue--;
  if (kaimonoItems.value[index].discountValue == 0) {
    kaimonoItems.value[index].discountValue = null;
  }
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
function isZeroItem(item) {
  return getItemSyoukei(item) <= 0;
}

function addItem() {
  kaimonoItems.value.push({
    id: kaimonoItems.value.length,
    goods: "",
    price: null,
    count: 1,
    discountRate: null,
    discountValue: null,
    taxRate: 8,
  })
  console.log(kaimonoItems.value);
}
function deleteItem(index) {
  kaimonoItems.value.splice(index, 1);
}
function getItemSyoukei(item) {
  let ret = 0;
  let price = (Number)(item.price);
  let count = (Number)(item.count);
  let taxRate = (Number)(item.taxRate);
  let discountRate = (Number)(item.discountRate);

  // return Math.floor(((price - (price * (discountRate / 100))) * count) * ((100 + taxRate) / 100));
  return price * count;
}
function getSyoukei() {
  let ret = 0;
  kaimonoItems.value.forEach((item) => {
    ret += getItemSyoukei(item);
  })

  return ret;
}
function getZei8() {
  return Math.floor(getSyoukei() * 0.08);
}
function getGoukei() {
  return getSyoukei() + getZei8();
}

const syoukei = computed(() => {
  return getSyoukei();
})
const zei8 = computed(() => {
  return getZei8();
})
const goukei = computed(() => {
  return getGoukei();
})
const zeis = computed(() => {
  let zeiGotoMap = {};
  kaimonoItems.value.forEach((item) => {
    if (!zeiGotoMap[item.taxRate]) {
      zeiGotoMap[item.taxRate] = [];
    }
    zeiGotoMap[item.taxRate].push(getItemSyoukei(item));
  });

  let shrinkMap = {};
  Object.keys(zeiGotoMap).forEach(function (key) {
    // key is taxRate, value is itemSyoukei
    if (!shrinkMap[key]) {
      shrinkMap[key] = {
        ratePercent: key,
        targetValue: 0,
        value: 0,
      };
    }
    zeiGotoMap[key].forEach((v) => {
      shrinkMap[key].targetValue += v;
    });

  });

  let ret = [];
  Object.keys(shrinkMap).forEach(function (key) {
    shrinkMap[key].value = Math.floor(shrinkMap[key].targetValue * (((Number)(shrinkMap[key].ratePercent)) / 100));
    ret.push(shrinkMap[key]);
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
        <div class="setumei">割引円</div>
        <div class="discount-value">
          <input class="numberinput" v-model="item.discountValue" @keypress="isNumber($event)" />
        </div>
        <div>
          <button class="twobutton" @click="decrementDiscountValue(index)">
            {{ downChar }}
          </button>
          <button class="twobutton" @click="incrementDiscountValue(index)">
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
    </div> <!-- end of loop -->

    <div class="item">
      <button @click="addItem">追加</button>
    </div>

    <div class="item">
      <div class="goukei cell3">
        小計：{{ syoukei }} 円
      </div>
    </div>
    <div class="item">
      <div class="goukei cell3" v-for="(zei, index) in zeis">
        税 {{ zei.ratePercent }}％ 対象額 {{ zei.targetValue }}円　税額 {{ zei.value }} 円
      </div>
    </div>
    <div class="item">
      <div class="goukei cell3">
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

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

.cell3 {
  grid-column: 1/4;
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
