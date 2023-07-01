<script setup>
import { ref, computed, watch } from "vue";

const DEBUGGING = ref(((new URL(location.href)).hostname) == "127.0.0.1" ||
  (new URL(location.href)).hostname == "localhost");

const appName = "kaimonoikura";
const appVersion = __APP_VERSION__;

const upChar = "↑";
const downChar = "↓";

const tapORclick = navigator.userAgent.match(/iPhone|Android.+Mobile/) ? "タップ" : "クリック";

const HASUU_SYORI_ONCE = 1;
const HASUU_SYORI_ONEBYONE = 2;
function computeDiscountValueFromRate(price, count, rates, option = {}) {
  if (option.computeEach) {
    option.computeEach = false;
    let ret = 0;
    for (let i = 0; i < count; ++i) {
      ret += computeDiscountValueFromRate(price, 1, rates, option);
    }
    return ret;
  } else {
    price *= count;
  }

  let skippedOK = false;
  let lastRates = [];
  rates.forEach((r) => {
    if (option.withoutOK3_103 && r == DISCOUNT_RATE_OK_3_103_N) {
      if (!skippedOK) {
        skippedOK = true;
        return;
      }
    }
    switch (option.hasuuSyori) {
      case HASUU_SYORI_ONCE:
        lastRates.push(r);
        break;
      case HASUU_SYORI_ONEBYONE:
        const d = price * r;
        price -= option.hasuuFunc(d);
        break;
      default:
        console.error("Unknown hasuuSyori");
    }
  });

  lastRates.forEach((r) => {
    price -= option.hasuuFunc(price * r);
  })
  return price;
}
/** maruetsuNormal */
const maruetsuNormal = {
  selectedStoreProfile: STOREPROFILE_WARIBIKI_CEAL,
  kaimonoItems: [
    {
      goods: "ファンタ２０００",
      price: 178,
      count: 1,
      taxRate: 8,
    },
    {
      goods: "アイスまんじゅう",
      price: 180,
      count: 1,
      taxRate: 8,
    },
    {
      goods: "爽",
      price: 80,
      count: 1,
      taxRate: 8,
    },
    {
      goods: "ソーダフロート",
      price: 60,
      count: 1,
      taxRate: 8,
    },
  ]
};

/** berxNormal */
const berxNormal = {
  selectedStoreProfile: STOREPROFILE_WARIBIKI_FLOOR,
  kaimonoItems: [
    {
      goods: "エッセルS",
      price: 79,
      count: 3,
      taxRate: 8,
    },
    {
      goods: "エッセルSC",
      price: 79,
      count: 1,
      taxRate: 8,
    },
  ]
};

/** PARLIAMENT */
const parliamentNormal = [
  {
    goods: "パーラメント",
    price: 620,
    count: 1,
    taxRate: TAXRATE_KOMI_TEN,
  },
];

/** SeiyuNormal */
const seiyuNormal = [
  {
    goods: "ふくろ",
    price: 5,
    count: 1,
    taxRate: TAXRATE_TEN,
  },
  {
    goods: "なっちゃん",
    price: 199,
    count: 1,
    taxRate: TAXRATE_EIGHT,
  },
  {
    goods: "牛乳",
    price: 119,
    count: 1,
    taxRate: TAXRATE_EIGHT,
  },
  {
    goods: "いちご練乳",
    price: 198,
    count: 1,
    taxRate: TAXRATE_EIGHT,
  },
  {
    goods: "Qsメロン",
    price: 98,
    count: 2,
    taxRate: TAXRATE_EIGHT,
  },
];
/** OKwith10% */
const okWith10 = {
  selectedStoreProfile: STOREPROFILE_OKSTOREWITHKAIIN,
  kaimonoItems: [
    {
      goods: "ソーダフロート",
      price: 60,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "いちごフロート",
      price: 60,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ソフフラノメロン",
      price: 90,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "単1電池",
      price: 540,
      count: 1,
      taxRate: TAXRATE_TEN,
    },
    {
      goods: "飴",
      price: 139,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
  ]
};
/** okwithNotF8 */
const okwithNotF8 = {
  selectedStoreProfile: STOREPROFILE_OKSTOREWITHKAIIN,
  kaimonoItems: [
    {
      goods: "炭酸ナトリウム",
      price: 275,
      count: 1,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "キリマンジャロ",
      price: 399,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "はくさい",
      price: 100,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "A抹茶",
      price: 194,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ミロ",
      price: 234,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "バターロール",
      price: 95,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
  ]
};

/** okWithCashAndDiscount */
const okWithCashAndDiscount = {
  selectedStoreProfile: STOREPROFILE_OKSTOREWITHKAIIN,
  kaimonoItems: [
    {
      goods: "キルシェ",
      price: 188,
      count: 1,
      taxRate: TAXRATE_TEN,
    },
    {
      goods: "ゴミ袋",
      price: 240,
      count: 1,
      taxRate: TAXRATE_ZERO,
    },
    {
      goods: "オカメ",
      price: 66,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ノーマット",
      price: 862,
      count: 1,
      taxRate: TAXRATE_TEN,
    },
    {
      goods: "Nドレダイエット",
      price: 119,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "カワミツ",
      price: 98,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "黒豆もやし",
      price: 30,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "フジッコ",
      price: 153,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "紀文はんぺん",
      price: 109,
      count: 1,
      discountRate: "10:3/103",
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ハウスニンニク",
      price: 168,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "QPマヨネーズ",
      price: 149,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ほねとりフィレ",
      price: 358,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ニラ",
      price: 68,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
  ]
};

/** okDiscountWithID */
const okDiscountWithID = {
  selectedStoreProfile: STOREPROFILE_WARIBIKI_FLOOR,
  kaimonoItems: [
    {
      goods: "練乳イチゴ",
      price: 195,
      count: 1,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "おかめ納豆",
      price: 66,
      count: 1,
      discountRate: "3",
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "キントキ",
      price: 60,
      count: 1,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "こしあん",
      price: 74,
      count: 1,
      discountRate: "5",
      taxRate: TAXRATE_EIGHT,
    },
  ]
};

/** aeon1963 */
const aeon1963 = {
  selectedStoreProfile: STOREPROFILE_WARIBIKI_CEAL,
  kaimonoItems: [
    {
      goods: "井村屋　宇治抹茶金時",
      price: 188,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "TVチョコアイス",
      price: 398,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "BPまろやかな味わいY",
      price: 98,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "BPとろけるスライス",
      price: 188,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "BPバター風味",
      price: 198,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "塩バターメロンパン",
      price: 118,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "パスコ　超熟８枚",
      price: 148,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "お肉屋さんのコロッケ小",
      price: 120,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "スペシャルサンド",
      price: 297,
      count: 1,
      discountRate: "20:5",
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "TVツナマヨ巻",
      price: 118,
      count: 1,
      discountRate: "10:5",
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "やわらかぶどうぱん",
      price: 118,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
  ]
};

/** aeon1092 */
const aeon1092 = {
  selectedStoreProfile: STOREPROFILE_WARIBIKI_CEAL,
  kaimonoItems: [
    {
      goods: "TV蚊取り線香",
      price: 468,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_TEN,
    },
    {
      goods: "ネオパラエース",
      price: 578,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_TEN,
    },
  ]
};

/** marinpia191 */
const marinpia191 = {
  selectedStoreProfile: STOREPROFILE_WARIBIKI_ROUND,
  kaimonoItems: [
    {
      goods: "ほうれん草",
      price: 98,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "にら",
      price: 88,
      count: 1,
      discountRate: 5,
      taxRate: TAXRATE_EIGHT,
    },
  ]
};

/** ok2wariWithCash */
const ok2wariWithCash = {
  selectedStoreProfile: STOREPROFILE_OKSTOREWITHKAIIN,
  kaimonoItems: [
    {
      goods: "ＣＣレモン",
      price: 141,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ホームカフェ無糖",
      price: 178,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "氷菓イチゴ",
      price: 60,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "イチゴフロート",
      price: 60,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "コーヒーフロート",
      price: 60,
      count: 1,
      discountRate: DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "Ｙクリームパン",
      price: 101,
      count: 1,
      discountRate: "5:" + DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "Ｙクリームパン",
      price: 101,
      count: 1,
      discountRate: "5:" + DISCOUNT_RATE_OK_3_103_S,
      taxRate: TAXRATE_EIGHT,
    },
  ]
};

/** maruetuManyWaribiki normal */
const maruetuManyWaribiki = {
  selectedStoreProfile: STOREPROFILE_WARIBIKI_CEAL,
  kaimonoItems: [
    {
      goods: "いわし生姜煮",
      price: 80,
      count: 1,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "手作りロースかつ",
      price: 298,
      count: 1,
      discountRate: 30,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "いも天",
      price: 80,
      count: 1,
      discountRate: 30,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "天丼",
      price: 390,
      count: 1,
      discountRate: 30,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "いなり",
      price: 158,
      count: 1,
      discountRate: 30,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "南瓜サラダ",
      price: 198,
      count: 1,
      discountRate: 40,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "プチ白菜漬",
      price: 50,
      count: 1,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "バナナ",
      price: 188,
      count: 1,
      discountRate: 20,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "あんかけ",
      price: 158,
      count: 1,
      discountRate: 30,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ひじき煮",
      price: 128,
      count: 1,
      discountRate: 50,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "国産若鳥手羽元",
      price: 235,
      count: 1,
      discountRate: 20,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "ミラノ風ドリア",
      price: 398,
      count: 1,
      discountRate: 40,
      taxRate: TAXRATE_EIGHT,
    },
    {
      goods: "調理パン",
      price: 50,
      count: 1,
      taxRate: TAXRATE_EIGHT,
    },
  ]
};

let okCount = 0;
let ngCount = 0;
function testFunc(name, expect, actual) {
  let message = "testing " + name + " ... ";
  let ok = expect === actual;
  if (ok) {
    message += "OK";
    okCount++;
  } else {
    message += "NG";
    ngCount++;
  }
  message += `(expect=${expect}, actual=${actual})`;
  ok ? console.log(message) : console.error(message);
}
function doTest() {
  okCount = ngCount = 0;
  const saveCurrentStoreProfile = selectedStoreProfile.value;
  const saveCurrentItems = kaimonoItems.value;

  testFunc("compute", 208, computeDiscountValueFromRate(298, 1, [0.3], {
    withoutOK3_103: false,
    computeEach: false,
    hasuuSyori: HASUU_SYORI_ONCE,
    hasuuFunc: Math.ceil,
  }));
  testFunc("compute", 208, computeDiscountValueFromRate(298, 1, [0.3], {
    withoutOK3_103: false,
    computeEach: false,
    hasuuSyori: HASUU_SYORI_ONEBYONE,
    hasuuFunc: Math.ceil,
  }));
  testFunc("compute maruetuManyWaribiki-niku", 188, computeDiscountValueFromRate(235, 1, [0.2], {
    withoutOK3_103: false,
    computeEach: false,
    hasuuSyori: HASUU_SYORI_ONCE,
    hasuuFunc: Math.ceil,
  }));
  testFunc("compute maruetuManyWaribiki-niku", 188, computeDiscountValueFromRate(235, 1, [0.2], {
    withoutOK3_103: false,
    computeEach: false,
    hasuuSyori: HASUU_SYORI_ONEBYONE,
    hasuuFunc: Math.ceil,
  }));

  selectedStoreProfile.value = maruetsuNormal.selectedStoreProfile;
  kaimonoItems.value = maruetsuNormal.kaimonoItems;
  testFunc("maruetsuNormal syoukei", 498, syoukei.value);
  testFunc("maruetsuNormal allItemHinCount", 4, allItemHinCount.value);
  testFunc("maruetsuNormal allItemCount", 4, allItemCount.value);
  testFunc("maruetsuNormal disp_syoukei", 498, disp_syoukei.value);
  testFunc("maruetsuNormal zeis len", 1, zeis.value.length);
  testFunc("maruetsuNormal zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
  testFunc("maruetsuNormal zeis[0].targetValue", 498, zeis.value[0].targetValue);
  testFunc("maruetsuNormal zeis[0].allvalue()", 39, zeis.value[0].allvalue());
  testFunc("maruetsuNormal goukei", 537, goukei.value);

  selectedStoreProfile.value = berxNormal.selectedStoreProfile;
  kaimonoItems.value = berxNormal.kaimonoItems;
  testFunc("berxNormal syoukei", 316, syoukei.value);
  testFunc("berxNormal allItemHinCount", 2, allItemHinCount.value);
  testFunc("berxNormal allItemCount", 4, allItemCount.value);
  testFunc("berxNormal disp_syoukei", 316, disp_syoukei.value);
  testFunc("berxNormal zeis len", 1, zeis.value.length);
  testFunc("berxNormal zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
  testFunc("berxNormal zeis[0].targetValue", 316, zeis.value[0].targetValue);
  testFunc("berxNormal zeis[0].allvalue()", 25, zeis.value[0].allvalue());
  testFunc("berxNormal goukei", 341, goukei.value);

  selectedStoreProfile.value = okWith10.selectedStoreProfile;
  kaimonoItems.value = okWith10.kaimonoItems;
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

  selectedStoreProfile.value = okwithNotF8.selectedStoreProfile;
  kaimonoItems.value = okwithNotF8.kaimonoItems;
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

  selectedStoreProfile.value = okWithCashAndDiscount.selectedStoreProfile;
  kaimonoItems.value = okWithCashAndDiscount.kaimonoItems;
  testFunc("okWithCashAndDiscount syoukei", 2598, syoukei.value);
  testFunc("okWithCashAndDiscount ok3_100kei", 31, ok3_100kei.value);
  testFunc("okWithCashAndDiscount allItemHinCount", 13, allItemHinCount.value);
  testFunc("okWithCashAndDiscount allItemCount", 13, allItemCount.value);
  testFunc("okWithCashAndDiscount disp_syoukei", 2567, disp_syoukei.value);
  testFunc("okWithCashAndDiscount zeis len", 2, zeis.value.length);
  testFunc("okWithCashAndDiscount zeis[0].ratePercent", "F8", zeis.value[0].ratePercent);
  testFunc("okWithCashAndDiscount zeis[0].targetValue", 1277, zeis.value[0].targetValue);
  testFunc("okWithCashAndDiscount zeis[0].allvalue()", 102, zeis.value[0].allvalue());
  testFunc("okWithCashAndDiscount zeis[1].ratePercent", "10", zeis.value[1].ratePercent);
  testFunc("okWithCashAndDiscount zeis[1].targetValue", 1050, zeis.value[1].targetValue);
  testFunc("okWithCashAndDiscount zeis[1].allvalue()", 105, zeis.value[1].allvalue());
  testFunc("okWithCashAndDiscount goukei", 2774, goukei.value);

  selectedStoreProfile.value = okDiscountWithID.selectedStoreProfile;
  kaimonoItems.value = okDiscountWithID.kaimonoItems;
  testFunc("okDiscountWithID syoukei", 391, syoukei.value);
  testFunc("okDiscountWithID allItemHinCount", 4, allItemHinCount.value);
  testFunc("okDiscountWithID allItemCount", 4, allItemCount.value);
  testFunc("okDiscountWithID disp_syoukei", 391, disp_syoukei.value);
  testFunc("okDiscountWithID zeis len", 1, zeis.value.length);
  testFunc("okDiscountWithID zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
  testFunc("okDiscountWithID zeis[0].targetValue", 391, zeis.value[0].targetValue);
  testFunc("okDiscountWithID zeis[0].allvalue()", 31, zeis.value[0].allvalue());
  testFunc("okDiscountWithID goukei", 422, goukei.value);

  selectedStoreProfile.value = aeon1963.selectedStoreProfile;
  kaimonoItems.value = aeon1963.kaimonoItems;
  testFunc("aeon1963 syoukei", 1818, syoukei.value);
  testFunc("aeon1963 allItemHinCount", 11, allItemHinCount.value);
  testFunc("aeon1963 allItemCount", 11, allItemCount.value);
  testFunc("aeon1963 disp_syoukei", 1818, disp_syoukei.value);
  testFunc("aeon1963 zeis len", 1, zeis.value.length);
  testFunc("aeon1963 zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
  testFunc("aeon1963 zeis[0].targetValue", 1818, zeis.value[0].targetValue);
  testFunc("aeon1963 zeis[0].allvalue()", 145, zeis.value[0].allvalue());
  testFunc("aeon1963 goukei", 1963, goukei.value);

  selectedStoreProfile.value = aeon1092.selectedStoreProfile;
  kaimonoItems.value = aeon1092.kaimonoItems;
  testFunc("aeon1092 syoukei", 993, syoukei.value);
  testFunc("aeon1092 allItemHinCount", 2, allItemHinCount.value);
  testFunc("aeon1092 allItemCount", 2, allItemCount.value);
  testFunc("aeon1092 disp_syoukei", 993, disp_syoukei.value);
  testFunc("aeon1092 zeis len", 1, zeis.value.length);
  testFunc("aeon1092 zeis[0].ratePercent", "10", zeis.value[0].ratePercent);
  testFunc("aeon1092 zeis[0].targetValue", 993, zeis.value[0].targetValue);
  testFunc("aeon1092 zeis[0].allvalue()", 99, zeis.value[0].allvalue());
  testFunc("aeon1092 goukei", 1092, goukei.value);

  selectedStoreProfile.value = marinpia191.selectedStoreProfile;
  kaimonoItems.value = marinpia191.kaimonoItems;
  testFunc("marinpia191 syoukei", 177, syoukei.value);
  testFunc("marinpia191 allItemHinCount", 2, allItemHinCount.value);
  testFunc("marinpia191 allItemCount", 2, allItemCount.value);
  testFunc("marinpia191 disp_syoukei", 177, disp_syoukei.value);
  testFunc("marinpia191 zeis len", 1, zeis.value.length);
  testFunc("marinpia191 zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
  testFunc("marinpia191 zeis[0].targetValue", 177, zeis.value[0].targetValue);
  testFunc("marinpia191 zeis[0].allvalue()", 14, zeis.value[0].allvalue());
  testFunc("marinpia191 goukei", 191, goukei.value);

  selectedStoreProfile.value = ok2wariWithCash.selectedStoreProfile;
  kaimonoItems.value = ok2wariWithCash.kaimonoItems;
  testFunc("ok2wariWithCash syoukei", 691, syoukei.value);
  testFunc("ok2wariWithCash allItemHinCount", 7, allItemHinCount.value);
  testFunc("ok2wariWithCash allItemCount", 7, allItemCount.value);
  testFunc("ok2wariWithCash disp_syoukei", 675, disp_syoukei.value);
  testFunc("ok2wariWithCash zeis len", 1, zeis.value.length);
  testFunc("ok2wariWithCash zeis[0].ratePercent", "F8", zeis.value[0].ratePercent);
  testFunc("ok2wariWithCash zeis[0].targetValue", 675, zeis.value[0].targetValue);
  testFunc("ok2wariWithCash zeis[0].allvalue()", 54, zeis.value[0].allvalue());
  testFunc("ok2wariWithCash goukei", 729, goukei.value);

  selectedStoreProfile.value = maruetuManyWaribiki.selectedStoreProfile;
  kaimonoItems.value = maruetuManyWaribiki.kaimonoItems;
  testFunc("maruetuManyWaribiki syoukei", 1695, syoukei.value);
  testFunc("maruetuManyWaribiki allItemHinCount", 13, allItemHinCount.value);
  testFunc("maruetuManyWaribiki allItemCount", 13, allItemCount.value);
  testFunc("maruetuManyWaribiki disp_syoukei", 1695, disp_syoukei.value);
  testFunc("maruetuManyWaribiki zeis len", 1, zeis.value.length);
  testFunc("maruetuManyWaribiki zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
  testFunc("maruetuManyWaribiki zeis[0].targetValue", 1695, zeis.value[0].targetValue);
  testFunc("maruetuManyWaribiki zeis[0].allvalue()", 135, zeis.value[0].allvalue());
  testFunc("maruetuManyWaribiki goukei", 1830, goukei.value);

  console.log(`done testing. OK=${okCount}, NG=${ngCount}`);

  selectedStoreProfile.value = saveCurrentStoreProfile;
  kaimonoItems.value = saveCurrentItems;
}

const TAXRATE_ZERO = 0;
const TAXRATE_EIGHT = "8";
const TAXRATE_TEN = "10";
const TAXRATE_KOMI_EIGHT = "込8";
const TAXRATE_KOMI_TEN = "込10";
const TAXRATE_EIGHTF8 = "F8";

const TAXRATEVALUES = [
  TAXRATE_ZERO,
  TAXRATE_EIGHT,
  TAXRATE_TEN,
  TAXRATE_KOMI_EIGHT,
  TAXRATE_KOMI_TEN,
];
function getTaxRateIndex(trv) {
  return TAXRATEVALUES.findIndex((v) => trv == v);
}

const DISCOUNT_RATE_OK_3_103_S = "3/103";
const DISCOUNT_RATE_OK_3_103_N = 3 / 103;

const LOCALSTORAGE_DEFAULT = "defaultls";

const STOREPROFILE_WARIBIKI_FLOOR = "割引率切り下げ";
const STOREPROFILE_WARIBIKI_ROUND = "割引率四捨五入";
const STOREPROFILE_WARIBIKI_CEAL = "割引率切り上げ";
const STOREPROFILE_OKSTOREWITHKAIIN = "オーケーストアwith会員カード";

const STOREPROFILES = ref([
  STOREPROFILE_WARIBIKI_FLOOR,
  STOREPROFILE_WARIBIKI_ROUND,
  STOREPROFILE_WARIBIKI_CEAL,
  STOREPROFILE_OKSTOREWITHKAIIN,
]);

const loaded = loadItems(LOCALSTORAGE_DEFAULT);
const kaimonoItems = ref(loaded.kaimonoItems ?? []);
const selectedStoreProfile = ref(loaded.selectedStoreProfile ?? STOREPROFILE_WARIBIKI_FLOOR);

if (DEBUGGING) {
  // selectedStoreProfile.value = maruetsuNormal.selectedStoreProfile;
  // kaimonoItems.value = maruetsuNormal.kaimonoItems;

  // const kaimonoItems = ref(berxNormal);
  // const kaimonoItems = ref(parliamentNormal);
  // const kaimonoItems = ref(seiyuNormal);
  // const kaimonoItems = ref(okWith10);
  // const kaimonoItems = ref(okwithNotF8);
  // const kaimonoItems = ref(okWithCashAndDiscount);
  // const kaimonoItems = ref(okDiscountWithID);
  // const kaimonoItems = ref(aeon1963);
  // const kaimonoItems = ref(aeon1092);
  // const kaimonoItems = ref(marinpia191);

  // selectedStoreProfile.value = ok2wariWithCash.selectedStoreProfile;
  // kaimonoItems.value = ok2wariWithCash.kaimonoItems;

  // selectedStoreProfile.value = maruetuManyWaribiki.selectedStoreProfile;
  // kaimonoItems.value = maruetuManyWaribiki.kaimonoItems;
}
function isOKProfile() {
  return selectedStoreProfile.value == STOREPROFILE_OKSTOREWITHKAIIN;
}
function isOK3_103Item(item) {
  let discountRates = getDiscountRates(item.discountRate ?? 0);
  return discountRates[discountRates.length - 1] == DISCOUNT_RATE_OK_3_103_N;
}
function isWaribikiCeal() {
  return selectedStoreProfile.value == STOREPROFILE_WARIBIKI_CEAL;
}
function isWaribikiRound() {
  return selectedStoreProfile.value == STOREPROFILE_WARIBIKI_ROUND;
}
function loadItems(storageKey) {
  let ls = localStorage.getItem(storageKey);
  if (ls && ls[0] != "{") {
    ls = undefined;
  }
  const ret = ls ? JSON.parse(ls) : {};
  if (!isValidKaimonoitems(ret)) {
    return {};
  }
  return ret;
}
function isValidKaimonoitems(kis) {
  if (!kis) {
    return true;
  }
  if (typeof kis != "object") {
    return false;
  }
  if (!Array.isArray(kis.kaimonoItems)) {
    return false;
  }
  if (!kis.selectedStoreProfile) {
    return true;
  }
  if (typeof kis.selectedStoreProfile != "string") {
    return false;
  }
  return true;
}

function getSaveJson() {
  return JSON.stringify({
    "kaimonoItems": kaimonoItems.value,
    "selectedStoreProfile": selectedStoreProfile.value,
  });
}
function saveItems() {
  localStorage.setItem(LOCALSTORAGE_DEFAULT, getSaveJson());
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
function isNumberOrComma(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode == 58 || charCode == 47) {
    return true;
  }
  return isNumber(evt);
}
function incrementCount(item) {
  item.count++;
}
function decrementCount(item) {
  if (item.count == 0) {
    return;
  }
  item.count--;
}

function incrementDiscountRate(item) {
  if ((String(item.discountRate)).indexOf(':') >= 0) {
    return;
  }
  if (!item.discountRate) {
    item.discountRate = 0;
  }
  item.discountRate++;
}
function decrementDiscountRate(item) {
  if ((String(item.discountRate)).indexOf(':') >= 0) {
    return;
  }
  if (!item.discountRate) {
    return;
  }
  item.discountRate--;
  if (item.discountRate == 0) {
    item.discountRate = null;
  }
}

function incrementDiscountValue(item) {
  if (!item.discountValue) {
    item.discountValue = 0;
  }
  item.discountValue++;
}
function decrementDiscountValue(item) {
  if (!item.discountValue) {
    return;
  }
  item.discountValue--;
  if (item.discountValue == 0) {
    item.discountValue = null;
  }
}

const INCORDEC_INC = 1;
const INCORDEC_DEC = 2;
function incrementOrdecrementTaxRate(index, inc_or_dec) {
  let curRate = kaimonoItems.value[index].taxRate;
  const curIndex = TAXRATEVALUES.findIndex((v) => curRate == v);
  let incdec = (inc_or_dec == INCORDEC_INC ? 1 : -1);
  let newIndex = curIndex + incdec;
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
    goods: "",
    price: null,
    count: 1,
    discountRate: isOKProfile() ? "3/103" : null,
    discountValue: null,
    taxRate: TAXRATE_EIGHT,
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
function getDiscountRates(rate) {
  if (!rate) {
    return [0];
  }
  if (typeof rate == "number") {
    return [rate / 100];
  }
  if (rate == DISCOUNT_RATE_OK_3_103_S) {
    return [DISCOUNT_RATE_OK_3_103_N];
  }
  let ret = []
  rate.split(':').map(String).forEach((r) => {
    if (r == DISCOUNT_RATE_OK_3_103_S) {
      r = DISCOUNT_RATE_OK_3_103_N;
    }
    if (r == DISCOUNT_RATE_OK_3_103_N) {
      ret.push(DISCOUNT_RATE_OK_3_103_N);
    } else {
      ret.push(Number(r) / 100);
    }
  })
  return ret;
}
function isComputeEach() {
  if (isOKProfile()) {
    return false;
  }
  return false;
}
function getHasuuFunc() {
  if (isWaribikiCeal()) {
    return Math.ceil;
  } else if (isWaribikiRound()) {
    return Math.round;
  } else {
    return Math.floor;
  }
}
function getHasuuSyori() {
  if (isOKProfile()) {
    return HASUU_SYORI_ONCE;
  }
  return HASUU_SYORI_ONEBYONE;
}
function getItemSyoukei(item, withoutOK3_103) {
  if (item.disabled) {
    return 0;
  }
  const price = Number(item.price);
  const count = Number(item.count);
  const taxRate = Number(item.taxRate);
  const discountRates = getDiscountRates(item.discountRate ?? 0);

  return computeDiscountValueFromRate(price, count, discountRates, {
    withoutOK3_103,
    computeEach: isComputeEach(),
    hasuuFunc: getHasuuFunc(),
    hasuuSyori: getHasuuSyori(),
  });
}
function getSyoukei(withoutOK3_103, computeEach) {
  let ret = 0;
  kaimonoItems.value.forEach((item) => {
    if (!item.disabled) {
      ret += getItemSyoukei(item, withoutOK3_103, computeEach);
    }
  });

  return ret;
}
function getZeis() {
  let zeiGotoMap = {};
  kaimonoItems.value.forEach((item) => {
    if (!item.disabled) {
      let rate = item.taxRate;
      if (isOK3_103Item(item)) {
        console.assert(rate == TAXRATE_EIGHT);
        rate = TAXRATE_EIGHTF8;
      }

      if (!zeiGotoMap[rate]) {
        zeiGotoMap[rate] = [];
      }
      // zeiGotoMap[rate].push(getItemSyoukei(item, (rate == TAXRATE_EIGHTF8 ? true : false)));
      zeiGotoMap[rate].push(getItemSyoukei(item));
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
    // console.log(zeiGotoMap);
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
      let rate;
      switch (shrinkMap[key].ratePercent) {
        case TAXRATE_EIGHT:
        case TAXRATE_EIGHTF8:
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

function getItemInfoMessage(item) {
  return item.message;
}
function setItemInfoMessage(item, v) {
  item.message = v;
}
function getItemErrorMessage(item) {
  if (item.disabled) {
    return "無効です";
  }
  if (!item.price || item.price == 0) {
    return "価格がゼロです";
  }
  if (!item.count || item.count == 0) {
    return "個数がゼロです";
  }
  if (!isOKProfile()) {
    const rates = getDiscountRates(item.discountRate ?? 0);
    if (rates.findIndex((r) => DISCOUNT_RATE_OK_3_103_N == r) >= 0) {
      return "3/103割引はオーケーストア専用です";
    }
    if (rates.some(r => isNaN(r))) {
      return "不正な割引率です";
    }
    if (rates.findIndex((r) => r >= 1) >= 0) {
      return "割引率が１００％を超えています";
    }
  }

  const syoukei = getItemSyoukei(item);
  if (syoukei < 0) {
    return "マイナスです";
  }
  if (syoukei == 0) {
    return "ゼロです";
  }

  if (TAXRATEVALUES.findIndex((v) => v == item.taxRate) < 0) {
    return "税の値が不正です";
  }
  return "";
}
function getItemMessage(item) {
  const error = getItemErrorMessage(item);
  if (error) {
    return error;
  }
  return getItemInfoMessage(item);
}

const syoukei = computed(() => {
  return getSyoukei(true);
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
  return getSyoukei(false, false) + allZei.value;
});
function getContainerCellClass(item, index) {
  if (getItemErrorMessage(item)) {
    return 'empty_container_cell';
  }
  return index % 2 == 0 ? 'even_bg' : 'odd_bg';
}
const ok3_100kei = computed(() => {
  if (!isOKProfile()) {
    console.error("Profile must be 'OKStore'");
    return 0;
  }
  return getSyoukei(true) - getSyoukei(false);
});
const disp_syoukei = computed(() => {
  if (isOKProfile()) {
    return getSyoukei(false, true);
  }
  return syoukei.value;
})

function savelocal() {
  const jsonString = getSaveJson();
  const blob = new Blob([jsonString], { type: 'application/json' });

  // ダウンロードリンクを作成
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'kaimono.json'; // ダウンロード時のファイル名を指定
  downloadLink.click();
}

const kakaku_placeholder = computed(() => {
  if (isOKProfile()) {
    return "非会員の税抜価格";
  }
  return "税抜価格";
});
</script>

<template>
  <div v-if="DEBUGGING">
    <button @click="doTest">doTest</button>
  </div>
  <div class="container">
    <h1>🛒買い物いくら？🛒</h1>

    <div class="container-cell">
      <div class="cell3columns storeprofile">
        <label id="label_storeselect" for="storeselect">会計方式：</label>
        <select id="storeselect" v-model="selectedStoreProfile">
          <option v-for="sp in STOREPROFILES">{{ sp }}</option>
        </select>
      </div>
    </div>

    <div class="container-cell" v-if="kaimonoItems.length == 0">
      <p class="cell3columns">追加を{{ tapORclick }}して商品を追加してください</p>
    </div>
    <div class="container-cell" :class="getContainerCellClass(item, index)" v-for="(item, index) in kaimonoItems">
      <div class="cell">
        <div class="setumei">商品 {{ index + 1 }}</div>
        <div class="goods">
          <input class="stringinput" placeholder="商品名（任意）" v-model="item.goods" />
        </div>
        <div></div>
      </div>

      <div class="cell">
        <div class="setumei">価格</div>
        <div class="price">
          <input class="numberinput" type="number" @focus="setItemInfoMessage(item, kakaku_placeholder)"
            @blur="setItemInfoMessage(item, null)" :placeholder="kakaku_placeholder" v-model="item.price"
            @keypress="isNumber($event)" />
        </div>
        <div></div>
      </div>

      <div class="cell">
        <div class="setumei">個数</div>
        <div class="count">
          <input class="numberinput" type="number" v-model="item.count" @keypress="isNumber($event)" />
        </div>
        <div>
          <button class="twobutton" @click="decrementCount(item)">
            {{ downChar }}
          </button>
          <button class="twobutton" @click="incrementCount(item)">
            {{ upChar }}
          </button>
        </div>
      </div>

      <div class="cell">
        <div class="setumei">割引％</div>
        <div class="discount-rate">
          <input class="numberinput" v-model="item.discountRate" @keypress="isNumberOrComma($event)" />
        </div>
        <div>
          <button class="twobutton" @click="decrementDiscountRate(item)">
            {{ downChar }}
          </button>
          <button class="twobutton" @click="incrementDiscountRate(item)">
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
          <button class="twobutton" @click="decrementDiscountValue(item)">
            {{ downChar }}
          </button>
          <button class="twobutton" @click="incrementDiscountValue(item)">
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
        <div class="setumei cell3rows">{{ getItemMessage(item) }}</div>
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
      <button @click="savelocal">保存</button>
    </div>

    <div class="help">
      <ul>
        <li>オーケーストアでは会員カードを提示して現金で支払うと3/103割引を受けられる食料品があります。その場合は税率に「F8」を指定してください。このような商品の場合値札には４つの価格が示されています。
        </li>
        <li>イオンの割引％は切り上げとなります。また２つの割引がある場合があります。例えば１つめの商品そのものの割引でもう１つは会員割引です。２つが例として２０％、５％の場合は割引％欄に「20:5」と指定してください。</li>
      </ul>
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

.storeprofile {
  margin: 0 auto;
}

#label_storeselect {
  vertical-align: middle;
}

#storeselect {
  height: 100%;
  vertical-align: middle;
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

.cell3rows {
  grid-row: 1/4;
  align-self: center;
  text-align: center;
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
