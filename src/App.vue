<script setup>
import { ref, computed } from "vue";

const upChar = '↑';
const downChar = '↓';

let id;

/** maruetsu normal */
id = 0;
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
];

/** maruetsu normal */
id = 0;
const berxNormal = [
  {
    id: id++,
    goods: "エッセルS",
    price: 79,
    count: 3,
    taxRate: 8,
  },
  {
    id: id++,
    goods: "エッセルSC",
    price: 79,
    count: 1,
    taxRate: 8,
  },
];

// const kaimonoItems = ref(maruetsuNormal);
const kaimonoItems = ref(berxNormal);

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
  if (!kaimonoItems.value[index].discountRate) {
    kaimonoItems.value[index].discountRate = 0;
  }
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
  if (!kaimonoItems.value[index].discountValue) {
    kaimonoItems.value[index].discountValue = 0;
  }
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
function isInvalidItem(item) {
  return getItemSyoukei(item) <= 0 || item.disabled;
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
  if(item.disabled) {
    return 0;
  }
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
function getZeis() {
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
}
function getGoukei() {
  let ret = getSyoukei();
  getZeis().forEach((zei) => {
    console.log(zei);
    ret += zei.value;
  });
  return ret;
}
function getItemMessage(item) {
  if(item.disabled) {
    return "無効です";
  }
  if(getItemSyoukei(item) < 0) {
    return "マイナスです";
  }
  if(getItemSyoukei(item) ==0) {
    return "ゼロです";
  }
  return "";
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
  return getZeis();
})
</script>

<template>
  <div class="container">
    <div class="container-cell" :class="{ empty_container_cell: isInvalidItem(item) }" v-for="(item, index) in kaimonoItems">
      <div class="cell">
        <div class="setumei">商品</div>
        <div class="goods">
          <input class="stringinput" v-model="item.goods" />
        </div>
        <div></div>
      </div>

      <div class="cell">
        <div class="setumei">価格</div>
        <div class="price">
          <input class="numberinput" v-model="item.price" @keypress="isNumber($event)" />
        </div>
        <div></div>
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
        <div class="setumei">有効</div>
          <input :id='"check" + index' type="checkbox" @click="item.disabled = !item.disabled" :checked="!item.disabled" />
          <label :for='"check" + index'></label>
      </div>
      <div class="cell">
          <div class="setumei"></div>
          <div></div>
          <div>{{ getItemMessage(item) }}</div>
      </div>
      <div class="cell">
        <div v-if="item.disabled">
          <div class="setumei">削除</div>
          <button @click="deleteItem(index)">❌</button>
        </div>
      </div>
    </div> <!-- end of loop -->

    <div class="container-cell">
      <button @click="addItem">追加</button>
    </div>

    <div class="container-cell">
      <div class="goukei cell3columns">
        小計：{{ syoukei }} 円
      </div>
    </div>
    <div class="container-cell">
      <div class="goukei cell3columns" v-for="(zei, index) in zeis">
        税 {{ zei.ratePercent }}％ 対象額 {{ zei.targetValue }}円　税額 {{ zei.value }} 円
      </div>
    </div>
    <div class="container-cell">
      <div class="goukei cell3columns">
        支払金額：{{ goukei }} 円
      </div>
    </div>
  </div>
</template>

<style>
.container {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  margin: 0;
  padding: 10px;
  display: grid;
}

.container-cell {
  background: steelblue;
  color: #fff;
  font-size: 20px;
  padding: 10px;
  border: skyblue 1px solid;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}


.empty_container_cell {
  background: lightcoral;
}

.cell {
  display: grid;
  grid-template-columns: 1fr;

  flex-direction: column;
  text-align: center;
  padding-left: 6px;
}

.cell3columns {
grid-column: 1/4;
}
.cell2rows {
grid-row: 1/3;
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
  width: 100%;
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
