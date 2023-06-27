<script setup>
import { ref, computed, watch } from "vue";

const upChar = "↑";
const downChar = "↓";

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

/** PARLIAMENT */
id = 0;
const parliamentNormal = [
  {
    id: id++,
    goods: "パーラメント",
    price: 620,
    count: 1,
    taxRate: TAXRATE_KOMI_TEN,
  },
];

/** SeiyuNormal */
id = 0;
const seiyuNormal = [
  {
    id: id++,
    goods: "ふくろ",
    price: 5,
    count: 1,
    taxRate: TAXRATE_TEN,
  },
  {
    id: id++,
    goods: "なっちゃん",
    price: 199,
    count: 1,
    taxRate: TAXRATE_EIGHT,
  },
  {
    id: id++,
    goods: "牛乳",
    price: 119,
    count: 1,
    taxRate: TAXRATE_EIGHT,
  },
  {
    id: id++,
    goods: "いちご練乳",
    price: 198,
    count: 1,
    taxRate: TAXRATE_EIGHT,
  },
  {
    id: id++,
    goods: "Qsメロン",
    price: 98,
    count: 2,
    taxRate: TAXRATE_EIGHT,
  },
];

const TAXRATE_ZERO = 0;
const TAXRATE_EIGHT = 8;
const TAXRATE_TEN = 10;
const TAXRATE_KOMI_EIGHT = "込8";
const TAXRATE_KOMI_TEN = "込10";

const TAXRATEVALUES = [
  TAXRATE_ZERO,
  TAXRATE_EIGHT,
  TAXRATE_TEN,
  TAXRATE_KOMI_EIGHT,
  TAXRATE_KOMI_TEN,
];

const LOCALSTORAGE_DEFAULT = "defaultls";
let ls = localStorage.getItem(LOCALSTORAGE_DEFAULT);
if (ls == "undefined") {
  ls = undefined;
}
const storedArray = ls ? JSON.parse(ls) : [];
// const kaimonoItems = ref(maruetsuNormal);
// const kaimonoItems = ref(berxNormal);
// const kaimonoItems = ref(parliamentNormal);
// const kaimonoItems = ref(seiyuNormal);
const kaimonoItems = ref(storedArray ?? []);

function saveItems(items) {
  localStorage.setItem(LOCALSTORAGE_DEFAULT, JSON.stringify(items));
}
watch(kaimonoItems.value, (newItems) => {
  saveItems(newItems);
})

function isNumber(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
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

const INCORDEC_INC = 1;
const INCORDEC_DEC = 2;
function incrementOrdecrementTaxRate(index, inc_or_dec) {
  let curRate = kaimonoItems.value[index].taxRate;
  const curIndex = TAXRATEVALUES.findIndex((v) => curRate == v);
  let newIndex = curIndex + (inc_or_dec == INCORDEC_INC ? 1 : -1);
  if (newIndex >= TAXRATEVALUES.length || newIndex < 0) {
    return;
  }
  kaimonoItems.value[index].taxRate = TAXRATEVALUES[newIndex];
}
function incrementTaxRate(index) {
  incrementOrdecrementTaxRate(index, INCORDEC_INC);
}
function decrementTaxRate(index) {
  incrementOrdecrementTaxRate(index, INCORDEC_DEC);
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
  });
}
function clearAll() {
  if (kaimonoItems.value.length == 0) {
    return;
  }
  if (window.confirm('アイテムをすべて削除しますか？')) {
    kaimonoItems.value.splice(0, kaimonoItems.value.length);
  }
}
function deleteItem(index) {
  kaimonoItems.value.splice(index, 1);
}
function getItemSyoukei(item) {
  if (item.disabled) {
    return 0;
  }
  let ret = 0;
  let price = Number(item.price);
  let count = Number(item.count);
  let taxRate = Number(item.taxRate);
  let discountRate = Number(item.discountRate);

  // return Math.floor(((price - (price * (discountRate / 100))) * count) * ((100 + taxRate) / 100));
  return price * count;
}
function getSyoukei() {
  let ret = 0;
  kaimonoItems.value.forEach((item) => {
    ret += getItemSyoukei(item);
  });

  return ret;
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
      if (v.ratePercent != TAXRATE_ZERO) {
        shrinkMap[key].targetValue += v;
      }
    });
  });

  let ret = [];
  Object.keys(shrinkMap).forEach(function (key) {
    if (shrinkMap[key].ratePercent != TAXRATE_ZERO) {
      let perTaxValue = 0;
      let perTaxKomiValue = 0;
      if (
        shrinkMap[key].ratePercent == TAXRATE_EIGHT ||
        shrinkMap[key].ratePercent == TAXRATE_TEN
      ) {
        perTaxValue = Math.floor(
          shrinkMap[key].targetValue *
          (Number(shrinkMap[key].ratePercent) / 100)
        );
      } else if (
        shrinkMap[key].ratePercent == TAXRATE_KOMI_EIGHT ||
        shrinkMap[key].ratePercent == TAXRATE_KOMI_TEN
      ) {
        const rate =
          shrinkMap[key].ratePercent == TAXRATE_KOMI_EIGHT ? 0.08 : 0.1;
        perTaxKomiValue = Math.floor(
          (shrinkMap[key].targetValue / (1 + rate)) * rate
        );
      } else {
        console.error("Illegal rate percent");
      }
      shrinkMap[key].value = perTaxValue;
      shrinkMap[key].komivalue = perTaxKomiValue;
      ret.push(shrinkMap[key]);
    }
  });
  return ret;
}
function getGoukei() {
  let ret = getSyoukei();
  getZeis().forEach((zei) => {
    ret += zei.value;
  });
  return ret;
}
function getItemMessage(item) {
  if (item.disabled) {
    return "無効です";
  }
  if (!item.price || item.price == 0) {
    return "価格がゼロです";
  }
  if (!item.count || item.count == 0) {
    return "個数がゼロです";
  }
  if (getItemSyoukei(item) < 0) {
    return "マイナスです";
  }
  if (getItemSyoukei(item) == 0) {
    return "ゼロです";
  }
  if (TAXRATEVALUES.findIndex((v) => v == item.taxRate) < 0) {
    return "税の値が不正";
  }
  return "";
}
const syoukei = computed(() => {
  return getSyoukei();
});
const goukei = computed(() => {
  return getGoukei();
});
const zeis = computed(() => {
  return getZeis();
});

function getContainerCellClass(item, index) {
  if (getItemMessage(item)) {
    return 'empty_container_cell';
  }
  return index % 2 == 0 ? 'even_bg' : 'odd_bg';
}
</script>

<template>
  <div class="container">
    <div class="container-cell" :class="getContainerCellClass(item, index)" v-for="(item, index) in kaimonoItems"
      :key="item.id">
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
          <input class="numberinput" type="number" v-model="item.price" @keypress="isNumber($event)" />
        </div>
        <div></div>
      </div>

      <div class="cell">
        <div class="setumei">個数</div>
        <div class="count">
          <input class="numberinput" type="number" v-model="item.count" @keypress="isNumber($event)" />
        </div>
        <div>
          <button class="twobutton" @click="decrementCount(index)">
            {{ downChar }}
          </button>
          <button class="twobutton" @click="incrementCount(index)">
            {{ upChar }}
          </button>
        </div>
      </div>

      <div class="cell">
        <div class="setumei">割引％</div>
        <div class="discount-rate">
          <input class="numberinput" type="number" v-model="item.discountRate" @keypress="isNumber($event)" />
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
          <input class="numberinput" type="number" v-model="item.discountValue" @keypress="isNumber($event)" />
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
        <input :id="'check' + index" type="checkbox" @click="item.disabled = !item.disabled" :checked="!item.disabled" />
        <label :for="'check' + index"></label>
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
    </div>
    <!-- end of loop -->

    <div class="container-cell">
      <button @click="addItem" class="cell3columns">追加</button>
    </div>

    <div class="container-cell">
      <div class="goukei cell3columns">小計：{{ syoukei }} 円</div>
    </div>
    <div class="container-cell" v-if="zeis.length">
      <div class="goukei cell3columns" v-for="(zei, index) in zeis">
        税 {{ zei.ratePercent }}％ 対象額 {{ zei.targetValue }}円　税額
        {{ zei.value + zei.komivalue }} 円
      </div>
    </div>
    <div class="container-cell">
      <div class="goukei cell3columns">合計：{{ goukei }} 円</div>
    </div>

    <div class="container-cell">
      <button @click="clearAll">すべて削除</button>
      <button @click="clearAll">すべて削除</button>
      <button @click="clearAll">すべて削除</button>
    </div>

  </div>
</template>

<style>
.container {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  max-width: 680px;
  padding: 10px;
  display: grid;
  margin: 0 auto;
}



.container-cell {
  background: white;
  /* color: #fff; */
  font-size: 20px;
  padding: 10px;
  border: skyblue 1px solid;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

/* .container > :nth-child(odd) {
  background-color: lightblue;
}

.container > :nth-child(even) {
  background-color: lightgray;
} */

.empty_container_cell {
  background-color: lightcoral;
}

.even_bg {
  background-color: lightblue;
}

.odd_bg {
  background-color: lightgray;
}

.cell {
  display: grid;
  grid-template-columns: 1fr;

  flex-direction: column;
  text-align: center;
  padding-left: 6px;
}

.cell2columns {
  grid-column: 1/3;
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
