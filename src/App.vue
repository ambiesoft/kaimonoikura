<script setup>
import { ref, computed, watch } from "vue";

const DEBUGGING = ref(((new URL(location.href)).hostname) == "127.0.0.1" ||
  (new URL(location.href)).hostname == "localhost");

const appName = "kaimonoikura";
const appVersion = "0.0.2";

const upChar = "↑";
const downChar = "↓";

const tapORclick = navigator.userAgent.match(/iPhone|Android.+Mobile/) ? "タップ" : "クリック";
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
/** OKwith10% */
id = 0;
const okWith10 = [
  {
    id: id++,
    goods: "ソーダフロート",
    price: 60,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
  {
    id: id++,
    goods: "いちごフロート",
    price: 60,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
  {
    id: id++,
    goods: "ソフフラノメロン",
    price: 90,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
  {
    id: id++,
    goods: "単1電池",
    price: 540,
    count: 1,
    taxRate: TAXRATE_TEN,
  },
  {
    id: id++,
    goods: "飴",
    price: 139,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
];
/** okwithNotF8 */
id = 0;
const okwithNotF8 = [
  {
    id: id++,
    goods: "炭酸ナトリウム",
    price: 275,
    count: 1,
    taxRate: TAXRATE_EIGHT,
  },
  {
    id: id++,
    goods: "キリマンジャロ",
    price: 399,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
  {
    id: id++,
    goods: "はくさい",
    price: 100,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
  {
    id: id++,
    goods: "A抹茶",
    price: 194,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
  {
    id: id++,
    goods: "ミロ",
    price: 234,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
  {
    id: id++,
    goods: "バターロール",
    price: 95,
    count: 1,
    taxRate: TAXRATE_OKFOODEIGHT,
  },
];

let okCount = 0;
let ngCount = 0;
function testFunc(name, expect, actual) {
  let message = "testing " + name + " ... ";
  if (expect === actual) {
    message += "OK";
    okCount++;
  } else {
    message += "NG";
    ngCount++;
  }
  message += `(expect=${expect}, actual=${actual})`;
  console.log(message);
}
function doTest() {
  okCount = ngCount = 0;
  selectedStoreProfile.value = STOREPROFILE_NORMAL;
  kaimonoItems.value = maruetsuNormal;
  testFunc("maruetsuNormal syoukei", 498, syoukei.value);
  testFunc("maruetsuNormal allItemHinCount", 4, allItemHinCount.value);
  testFunc("maruetsuNormal allItemCount", 4, allItemCount.value);
  testFunc("maruetsuNormal disp_syoukei", 498, disp_syoukei.value);

  testFunc("maruetsuNormal zeis len", 1, zeis.value.length);
  testFunc("maruetsuNormal zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
  testFunc("maruetsuNormal zeis[0].targetValue", 498, zeis.value[0].targetValue);
  testFunc("maruetsuNormal zeis[0].allvalue()", 39, zeis.value[0].allvalue());

  testFunc("okWith10 goukei", 537, goukei.value);


  selectedStoreProfile.value = STOREPROFILE_OKSTOREWITHKAIIN;
  kaimonoItems.value = okWith10;
  testFunc("okWith10 syoukei", 889, syoukei.value);
  testFunc("okWith10 ok3_100kei", 8, ok3_100kei.value);
  testFunc("okWith10 allItemHinCount", 5, allItemHinCount.value);
  testFunc("okWith10 allItemCount", 5, allItemCount.value);
  testFunc("okWith10 disp_syoukei", 881, disp_syoukei.value);

  testFunc("okWith10 zeis len", 2, zeis.value.length);
  testFunc("okWith10 zeis[0].ratePercent", "F8", zeis.value[0].ratePercent);
  testFunc("okWith10 zeis[0].targetValue", 341, zeis.value[0].targetValue);
  testFunc("okWith10 zeis[0].allvalue()", 27, zeis.value[0].allvalue());
  testFunc("okWith10 zeis[1].ratePercent", "10", zeis.value[1].ratePercent);
  testFunc("okWith10 zeis[1].targetValue", 540, zeis.value[1].targetValue);
  testFunc("okWith10 zeis[1].allvalue()", 54, zeis.value[1].allvalue());

  testFunc("okWith10 goukei", 962, goukei.value);


  selectedStoreProfile.value = STOREPROFILE_OKSTOREWITHKAIIN;
  kaimonoItems.value = okwithNotF8;
  testFunc("okwithNotF8 syoukei", 1297, syoukei.value);
  testFunc("okwithNotF8 ok3_100kei", 26, ok3_100kei.value);
  testFunc("okwithNotF8 allItemHinCount", 6, allItemHinCount.value);
  testFunc("okwithNotF8 allItemCount", 6, allItemCount.value);
  testFunc("okwithNotF8 disp_syoukei", 1271, disp_syoukei.value);

  testFunc("okwithNotF8 zeis len", 2, zeis.value.length);
  testFunc("okwithNotF8 zeis[0].ratePercent", "F8", zeis.value[0].ratePercent);
  testFunc("okwithNotF8 zeis[0].targetValue", 996, zeis.value[0].targetValue);
  testFunc("okwithNotF8 zeis[0].allvalue()", 79, zeis.value[0].allvalue());
  testFunc("okwithNotF8 zeis[1].ratePercent", "8", zeis.value[1].ratePercent);
  testFunc("okwithNotF8 zeis[1].targetValue", 275, zeis.value[1].targetValue);
  testFunc("okwithNotF8 zeis[1].allvalue()", 22, zeis.value[1].allvalue());

  testFunc("okwithNotF8 goukei", 1372, goukei.value);

  console.log(`done testing. OK=${okCount}, NG=${ngCount}`);
}

const TAXRATE_ZERO = 0;
const TAXRATE_OKFOODEIGHT = "F8";
const TAXRATE_EIGHT = "8";
const TAXRATE_TEN = "10";
const TAXRATE_KOMI_EIGHT = "込8";
const TAXRATE_KOMI_TEN = "込10";

const TAXRATEVALUES = [
  TAXRATE_ZERO,
  TAXRATE_OKFOODEIGHT,
  TAXRATE_EIGHT,
  TAXRATE_TEN,
  TAXRATE_KOMI_EIGHT,
  TAXRATE_KOMI_TEN,
];
function getTaxRateIndex(trv) {
  return TAXRATEVALUES.findIndex((v) => trv == v);
}
const LOCALSTORAGE_DEFAULT = "defaultls";
const loaded = loadItems(LOCALSTORAGE_DEFAULT);


const kaimonoItems = ref(loaded.kaimonoItems ?? []);
// const kaimonoItems = ref(maruetsuNormal);
// const kaimonoItems = ref(berxNormal);
// const kaimonoItems = ref(parliamentNormal);
// const kaimonoItems = ref(seiyuNormal);
// const kaimonoItems = ref(okWith10);
// const kaimonoItems = ref(okwithNotF8);

const STOREPROFILE_NORMAL = "通常";
const STOREPROFILE_OKSTOREWITHKAIIN = "オーケーストアwith会員カード";

const STOREPROFILES = ref([
  STOREPROFILE_NORMAL,
  STOREPROFILE_OKSTOREWITHKAIIN,
]);
const selectedStoreProfile = ref(loaded.selectedStoreProfile);

function isOKProfile() {
  return selectedStoreProfile.value == STOREPROFILE_OKSTOREWITHKAIIN;
}

function loadItems(storageKey) {
  let ls = localStorage.getItem(storageKey);
  if (ls && ls[0] != "{") {
    ls = undefined;
  }
  return ls ? JSON.parse(ls) : {};
}
function saveItems() {
  localStorage.setItem(LOCALSTORAGE_DEFAULT, JSON.stringify({
    "kaimonoItems": kaimonoItems.value,
    "selectedStoreProfile": selectedStoreProfile.value,
  }));
}
watch(kaimonoItems.value, (newItems) => {
  saveItems();
})
watch(selectedStoreProfile, () => {
  saveItems();
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
    if (!item.disabled) {
      ret += getItemSyoukei(item);
    }
  });

  return ret;
}
function getZeis() {
  let zeiGotoMap = {};
  kaimonoItems.value.forEach((item) => {
    if (!item.disabled) {
      if (!zeiGotoMap[item.taxRate]) {
        zeiGotoMap[item.taxRate] = [];
      }
      zeiGotoMap[item.taxRate].push(getItemSyoukei(item));
    }
  });

  let shrinkMap = {};
  Object.keys(zeiGotoMap).forEach(function (key) {
    // key is taxRate, value is itemSyoukei
    if (!shrinkMap[key]) {
      shrinkMap[key] = {
        ratePercent: key,
        targetValue: 0,
        value: 0,
        komivalue: 0,
        allvalue: function () {
          return this.value + this.komivalue;
        },
      };
    }

    zeiGotoMap[key].forEach((v) => {
      if (v.ratePercent != TAXRATE_ZERO) {
        shrinkMap[key].targetValue += v;
      }
    });

    // override ok8
    if (isOKProfile() && key == TAXRATE_OKFOODEIGHT) {
      shrinkMap[key].targetValue -= getOk3_100kei();
    }
  });

  let ret = [];
  Object.keys(shrinkMap).forEach(function (key) {
    if (shrinkMap[key].ratePercent != TAXRATE_ZERO) {
      let perTaxValue = 0;
      let perTaxKomiValue = 0;
      let rate;
      switch (shrinkMap[key].ratePercent) {
        case TAXRATE_EIGHT:
        case TAXRATE_OKFOODEIGHT:
        case TAXRATE_TEN:
          if (shrinkMap[key].ratePercent == TAXRATE_TEN) {
            rate = 10 / 100;
          } else {
            rate = 8 / 100;
          }
          perTaxValue = Math.floor(shrinkMap[key].targetValue * rate);
          break;

        case TAXRATE_KOMI_EIGHT:
        case TAXRATE_KOMI_TEN:
          rate =
            shrinkMap[key].ratePercent == TAXRATE_KOMI_EIGHT ? 0.08 : 0.1;
          perTaxKomiValue = Math.floor(
            (shrinkMap[key].targetValue / (1 + rate)) * rate
          );
          break;

        default:
          console.error("Illegal rate percent", key, shrinkMap[key]);
          break;
      }
      shrinkMap[key].value = perTaxValue;
      shrinkMap[key].komivalue = perTaxKomiValue;
      ret.push(shrinkMap[key]);
    }
  });

  ret = ret.sort((a, b) => {
    return getTaxRateIndex(a.ratePercent) - getTaxRateIndex(b.ratePercent);
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
function getOk3_100kei() {
  if (!isOKProfile()) {
    console.error("Profile must be 'OKStore'");
    return 0;
  }
  let ret = 0;
  kaimonoItems.value.forEach((item) => {
    if (!item.disabled && item.taxRate == TAXRATE_OKFOODEIGHT) {
      for (let i = 0; i < item.count; ++i) {
        ret += Math.floor(item.price * (3 / 103));
      }
    }
  })
  return ret;
}
const syoukei = computed(() => {
  return getSyoukei();
});
const zeis = computed(() => {
  return getZeis();
});
const allZei = computed(() => {
  let ret = 0;
  getZeis().forEach((z) => {
    ret += z.value;
  })
  return ret;
})
const allItemCount = computed(() => {
  let ret = 0;
  kaimonoItems.value.forEach((item) => {
    if (!item.disabled) {
      ret += item.count;
    }
  })
  return ret;
});
const allItemHinCount = computed(() => {
  let ret = 0;
  kaimonoItems.value.forEach((item) => {
    if (!item.disabled) {
      ret += 1
    }
  })
  return ret;
});
const goukei = computed(() => {
  if (isOKProfile()) {
    return syoukei.value - ok3_100kei.value + allZei.value;
  } else {
    return syoukei.value + allZei.value;
  }
});
function getContainerCellClass(item, index) {
  if (getItemMessage(item)) {
    return 'empty_container_cell';
  }
  return index % 2 == 0 ? 'even_bg' : 'odd_bg';
}
const ok3_100kei = computed(() => {
  return getOk3_100kei();
});
const disp_syoukei = computed(() => {
  return isOKProfile() ? syoukei.value - ok3_100kei.value : syoukei.value;
})
</script>

<template>
  <div v-if="DEBUGGING">
    <button @click="doTest">doTest</button>
  </div>
  <div class="container">
    <h1>🛒買い物いくら？🛒</h1>

    <div class="container-cell">
      <div class="cell3columns">
        <label for="storeselect">会計方式：</label>
        <select id="storeselect" v-model="selectedStoreProfile">
          <option v-for="sp in STOREPROFILES">{{ sp }}</option>
        </select>
      </div>
    </div>

    <div class="container-cell" v-if="kaimonoItems.length == 0">
      <p class="cell3columns">追加を{{ tapORclick }}して商品を追加してください</p>
    </div>
    <div class="container-cell" :class="getContainerCellClass(item, index)" v-for="(item, index) in kaimonoItems"
      :key="item.id">
      <div class="cell">
        <div class="setumei">商品 {{ index + 1 }}</div>
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

    <div class="container-cell" v-if="isOKProfile()">
      <div class="goukei cell3columns">割引前合計 ¥{{ syoukei }}</div>
    </div>
    <div class="container-cell" v-if="isOKProfile()">
      <div class="goukei cell3columns">F食料品3/103割引 -{{ ok3_100kei }}</div>
    </div>

    <div class="container-cell">
      <div class="goukei cell3columns">小計 {{ allItemHinCount }}品 {{ allItemCount }}点 ¥{{ disp_syoukei }}</div>
    </div>

    <div class="container-cell" v-if="zeis.length">
      <div class="goukei cell3columns" v-for="(zei, index) in zeis">
        税{{ zei.ratePercent }}% 対象額 ¥{{ zei.targetValue }} 税額 ¥{{ zei.allvalue() }}
      </div>
    </div>

    <div class="container-cell">
      <div class="goukei cell3columns">合計 ¥{{ goukei }}</div>
    </div>

    <div class="container-cell">
      <button @click="clearAll">すべて削除</button>
      <button @click="clearAll">すべて削除</button>
      <button @click="clearAll">すべて削除</button>
    </div>

    <footer>
      {{ appName }} v{{ appVersion }} <a href="https://ambiesoft.com/" target="_blank">Ambiesoft</a>
    </footer>
  </div> <!-- end of container -->
  <div v-if="DEBUGGING">
    <button @click="doTest">doTest</button>
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

h1 {
  text-align: center;
}

p {
  text-align: center;
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

footer {
  padding-top: 10px;
  text-align: right;
}
</style>
