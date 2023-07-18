<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import Constants from './constants';
import { computeDiscountedPriceFromRate } from '@/utils';
import { useFileDialog } from '@vueuse/core'
import { saveAs } from 'file-saver';
import Calculator from './Calculator.vue'
import { testFunc, clearTestResult, showTestResult, testData } from '@/debug';

console.log(`${Constants.appName} v${Constants.appVersion}`);
if (__DEBUG__) {
  console.log('__DEBUG__', __DEBUG__);
}

const DISCOUNTRATE_SEPARATOR = ' ';
const LOCALSTORAGE_DEFAULT = "defaultls";

function formatSpace(s) {
  return s.replace(/　/g, ' ');
}
function getTaxRateIndex(trv) {
  return Constants.TAXRATEVALUES.findIndex((v) => trv == v);
}

var doTest = null;
if (__DEBUG__) {
  doTest = () => {
    const saveCurrentStoreProfile = selectedStoreProfile.value;
    const saveCurrentCustomProfile = customStoreProfile.value;
    const saveCurrentItems = kaimonoItems.value;

    clearTestResult();

    testFunc("compute", 208, computeDiscountedPriceFromRate(298, 1, [0.3], {
      computeEach: Constants.COMPUTE_EACH_FALSE,
      hasuuSyori: Constants.HASUU_SYORI_ONCE,
      hasuuFunc: Math.ceil,
    }));
    testFunc("compute", 208, computeDiscountedPriceFromRate(298, 1, [0.3], {
      computeEach: Constants.COMPUTE_EACH_FALSE,
      hasuuSyori: Constants.HASUU_SYORI_ONEBYONE,
      hasuuFunc: Math.ceil,
    }));
    testFunc("compute maruetuManyWaribiki-niku", 188, computeDiscountedPriceFromRate(235, 1, [0.2], {
      computeEach: Constants.COMPUTE_EACH_FALSE,
      hasuuSyori: Constants.HASUU_SYORI_ONCE,
      hasuuFunc: Math.ceil,
    }));
    testFunc("compute maruetuManyWaribiki-niku", 188, computeDiscountedPriceFromRate(235, 1, [0.2], {
      computeEach: Constants.COMPUTE_EACH_FALSE,
      hasuuSyori: Constants.HASUU_SYORI_ONEBYONE,
      hasuuFunc: Math.ceil,
    }));

    selectedStoreProfile.value = testData.maruetsuNormal.selectedStoreProfile;
    kaimonoItems.value = testData.maruetsuNormal.kaimonoItems;
    testFunc("maruetsuNormal syoukei", 498, syoukei.value);
    testFunc("maruetsuNormal allItemHinCount", 4, allItemHinCount.value);
    testFunc("maruetsuNormal allItemCount", 4, allItemCount.value);
    testFunc("maruetsuNormal disp_syoukei", 498, disp_syoukei.value);
    testFunc("maruetsuNormal zeis len", 1, zeis.value.length);
    testFunc("maruetsuNormal zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("maruetsuNormal zeis[0].targetValue", 498, zeis.value[0].targetValue);
    testFunc("maruetsuNormal zeis[0].allvalue()", 39, zeis.value[0].allvalue());
    testFunc("maruetsuNormal goukei", 537, goukei.value);

    selectedStoreProfile.value = testData.berxNormal.selectedStoreProfile;
    kaimonoItems.value = testData.berxNormal.kaimonoItems;
    testFunc("berxNormal syoukei", 316, syoukei.value);
    testFunc("berxNormal allItemHinCount", 2, allItemHinCount.value);
    testFunc("berxNormal allItemCount", 4, allItemCount.value);
    testFunc("berxNormal disp_syoukei", 316, disp_syoukei.value);
    testFunc("berxNormal zeis len", 1, zeis.value.length);
    testFunc("berxNormal zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("berxNormal zeis[0].targetValue", 316, zeis.value[0].targetValue);
    testFunc("berxNormal zeis[0].allvalue()", 25, zeis.value[0].allvalue());
    testFunc("berxNormal goukei", 341, goukei.value);

    selectedStoreProfile.value = testData.parliamentNormal.selectedStoreProfile;
    kaimonoItems.value = testData.parliamentNormal.kaimonoItems;
    testFunc("parliamentNormal syoukei", 620, syoukei.value);
    testFunc("parliamentNormal allItemHinCount", 1, allItemHinCount.value);
    testFunc("parliamentNormal allItemCount", 1, allItemCount.value);
    testFunc("parliamentNormal disp_syoukei", 620, disp_syoukei.value);
    testFunc("parliamentNormal zeis len", 1, zeis.value.length);
    testFunc("parliamentNormal zeis[0].ratePercent", "込10", zeis.value[0].ratePercent);
    testFunc("parliamentNormal zeis[0].targetValue", 620, zeis.value[0].targetValue);
    testFunc("parliamentNormal zeis[0].allvalue()", 56, zeis.value[0].allvalue());
    testFunc("parliamentNormal goukei", 620, goukei.value);

    selectedStoreProfile.value = testData.seiyuNormal.selectedStoreProfile;
    kaimonoItems.value = testData.seiyuNormal.kaimonoItems;
    testFunc("seiyuNormal syoukei", 717, syoukei.value);
    testFunc("seiyuNormal allItemHinCount", 5, allItemHinCount.value);
    testFunc("seiyuNormal allItemCount", 6, allItemCount.value);
    testFunc("seiyuNormal disp_syoukei", 717, disp_syoukei.value);
    testFunc("seiyuNormal zeis len", 2, zeis.value.length);
    testFunc("seiyuNormal zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("seiyuNormal zeis[0].targetValue", 712, zeis.value[0].targetValue);
    testFunc("seiyuNormal zeis[0].allvalue()", 56, zeis.value[0].allvalue());
    testFunc("seiyuNormal zeis[1].ratePercent", "10", zeis.value[1].ratePercent);
    testFunc("seiyuNormal zeis[1].targetValue", 5, zeis.value[1].targetValue);
    testFunc("seiyuNormal zeis[1].allvalue()", 0, zeis.value[1].allvalue());
    testFunc("seiyuNormal goukei", 773, goukei.value);

    selectedStoreProfile.value = testData.okWith10.selectedStoreProfile;
    kaimonoItems.value = testData.okWith10.kaimonoItems;
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

    selectedStoreProfile.value = testData.okwithNotF8.selectedStoreProfile;
    kaimonoItems.value = testData.okwithNotF8.kaimonoItems;
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

    selectedStoreProfile.value = testData.okWithCashAndDiscount.selectedStoreProfile;
    kaimonoItems.value = testData.okWithCashAndDiscount.kaimonoItems;
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

    selectedStoreProfile.value = testData.okDiscountWithID.selectedStoreProfile;
    kaimonoItems.value = testData.okDiscountWithID.kaimonoItems;
    testFunc("okDiscountWithID syoukei", 391, syoukei.value);
    testFunc("okDiscountWithID allItemHinCount", 4, allItemHinCount.value);
    testFunc("okDiscountWithID allItemCount", 4, allItemCount.value);
    testFunc("okDiscountWithID disp_syoukei", 391, disp_syoukei.value);
    testFunc("okDiscountWithID zeis len", 1, zeis.value.length);
    testFunc("okDiscountWithID zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("okDiscountWithID zeis[0].targetValue", 391, zeis.value[0].targetValue);
    testFunc("okDiscountWithID zeis[0].allvalue()", 31, zeis.value[0].allvalue());
    testFunc("okDiscountWithID goukei", 422, goukei.value);

    selectedStoreProfile.value = testData.aeon1963.selectedStoreProfile;
    kaimonoItems.value = testData.aeon1963.kaimonoItems;
    testFunc("aeon1963 syoukei", 1818, syoukei.value);
    testFunc("aeon1963 allItemHinCount", 11, allItemHinCount.value);
    testFunc("aeon1963 allItemCount", 11, allItemCount.value);
    testFunc("aeon1963 disp_syoukei", 1818, disp_syoukei.value);
    testFunc("aeon1963 zeis len", 1, zeis.value.length);
    testFunc("aeon1963 zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("aeon1963 zeis[0].targetValue", 1818, zeis.value[0].targetValue);
    testFunc("aeon1963 zeis[0].allvalue()", 145, zeis.value[0].allvalue());
    testFunc("aeon1963 goukei", 1963, goukei.value);

    selectedStoreProfile.value = testData.aeon1092.selectedStoreProfile;
    kaimonoItems.value = testData.aeon1092.kaimonoItems;
    testFunc("aeon1092 syoukei", 993, syoukei.value);
    testFunc("aeon1092 allItemHinCount", 2, allItemHinCount.value);
    testFunc("aeon1092 allItemCount", 2, allItemCount.value);
    testFunc("aeon1092 disp_syoukei", 993, disp_syoukei.value);
    testFunc("aeon1092 zeis len", 1, zeis.value.length);
    testFunc("aeon1092 zeis[0].ratePercent", "10", zeis.value[0].ratePercent);
    testFunc("aeon1092 zeis[0].targetValue", 993, zeis.value[0].targetValue);
    testFunc("aeon1092 zeis[0].allvalue()", 99, zeis.value[0].allvalue());
    testFunc("aeon1092 goukei", 1092, goukei.value);

    selectedStoreProfile.value = testData.marinpia191.selectedStoreProfile;
    kaimonoItems.value = testData.marinpia191.kaimonoItems;
    testFunc("marinpia191 syoukei", 177, syoukei.value);
    testFunc("marinpia191 allItemHinCount", 2, allItemHinCount.value);
    testFunc("marinpia191 allItemCount", 2, allItemCount.value);
    testFunc("marinpia191 disp_syoukei", 177, disp_syoukei.value);
    testFunc("marinpia191 zeis len", 1, zeis.value.length);
    testFunc("marinpia191 zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("marinpia191 zeis[0].targetValue", 177, zeis.value[0].targetValue);
    testFunc("marinpia191 zeis[0].allvalue()", 14, zeis.value[0].allvalue());
    testFunc("marinpia191 goukei", 191, goukei.value);

    selectedStoreProfile.value = testData.ok2wariWithCash.selectedStoreProfile;
    kaimonoItems.value = testData.ok2wariWithCash.kaimonoItems;
    testFunc("ok2wariWithCash syoukei", 691, syoukei.value);
    testFunc("ok2wariWithCash allItemHinCount", 7, allItemHinCount.value);
    testFunc("ok2wariWithCash allItemCount", 7, allItemCount.value);
    testFunc("ok2wariWithCash disp_syoukei", 675, disp_syoukei.value);
    testFunc("ok2wariWithCash zeis len", 1, zeis.value.length);
    testFunc("ok2wariWithCash zeis[0].ratePercent", "F8", zeis.value[0].ratePercent);
    testFunc("ok2wariWithCash zeis[0].targetValue", 675, zeis.value[0].targetValue);
    testFunc("ok2wariWithCash zeis[0].allvalue()", 54, zeis.value[0].allvalue());
    testFunc("ok2wariWithCash goukei", 729, goukei.value);

    selectedStoreProfile.value = testData.maruetuManyWaribiki.selectedStoreProfile;
    kaimonoItems.value = testData.maruetuManyWaribiki.kaimonoItems;
    testFunc("maruetuManyWaribiki syoukei", 1695, syoukei.value);
    testFunc("maruetuManyWaribiki allItemHinCount", 13, allItemHinCount.value);
    testFunc("maruetuManyWaribiki allItemCount", 13, allItemCount.value);
    testFunc("maruetuManyWaribiki disp_syoukei", 1695, disp_syoukei.value);
    testFunc("maruetuManyWaribiki zeis len", 1, zeis.value.length);
    testFunc("maruetuManyWaribiki zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("maruetuManyWaribiki zeis[0].targetValue", 1695, zeis.value[0].targetValue);
    testFunc("maruetuManyWaribiki zeis[0].allvalue()", 135, zeis.value[0].allvalue());
    testFunc("maruetuManyWaribiki goukei", 1830, goukei.value);

    selectedStoreProfile.value = testData.okFunabashiKeiba.selectedStoreProfile;
    kaimonoItems.value = testData.okFunabashiKeiba.kaimonoItems;
    testFunc("okFunabashiKeiba syoukei", 7136, syoukei.value);
    testFunc("okFunabashiKeiba allItemHinCount", 16, allItemHinCount.value);
    testFunc("okFunabashiKeiba allItemCount", 21, allItemCount.value);
    testFunc("okFunabashiKeiba disp_syoukei", 6947, disp_syoukei.value);
    testFunc("okFunabashiKeiba zeis len", 2, zeis.value.length);
    testFunc("okFunabashiKeiba zeis[0].ratePercent", "F8", zeis.value[0].ratePercent);
    testFunc("okFunabashiKeiba zeis[0].targetValue", 6669, zeis.value[0].targetValue);
    testFunc("okFunabashiKeiba zeis[0].allvalue()", 533, zeis.value[0].allvalue());
    testFunc("okFunabashiKeiba zeis[1].ratePercent", "10", zeis.value[1].ratePercent);
    testFunc("okFunabashiKeiba zeis[1].targetValue", 278, zeis.value[1].targetValue);
    testFunc("okFunabashiKeiba zeis[1].allvalue()", 27, zeis.value[1].allvalue());
    testFunc("okFunabashiKeiba goukei", 7507, goukei.value);

    selectedStoreProfile.value = testData.okNoCash3Pepsi103Checked.selectedStoreProfile;
    kaimonoItems.value = testData.okNoCash3Pepsi103Checked.kaimonoItems;
    testFunc("okNoCash3Pepsi103Checked syoukei", 752, syoukei.value);
    testFunc("okNoCash3Pepsi103Checked allItemHinCount", 5, allItemHinCount.value);
    testFunc("okNoCash3Pepsi103Checked allItemCount", 7, allItemCount.value);
    testFunc("okNoCash3Pepsi103Checked disp_syoukei", 752, disp_syoukei.value);
    testFunc("okNoCash3Pepsi103Checked zeis len", 1, zeis.value.length);
    testFunc("okNoCash3Pepsi103Checked zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("okNoCash3Pepsi103Checked zeis[0].targetValue", 752, zeis.value[0].targetValue);
    testFunc("okNoCash3Pepsi103Checked zeis[0].allvalue()", 60, zeis.value[0].allvalue());
    testFunc("okNoCash3Pepsi103Checked goukei", 812, goukei.value);

    selectedStoreProfile.value = testData.itoyokado1.selectedStoreProfile;
    kaimonoItems.value = testData.itoyokado1.kaimonoItems;
    testFunc("itoyokado1 syoukei", 1342, syoukei.value);
    testFunc("itoyokado1 allItemHinCount", 8, allItemHinCount.value);
    testFunc("itoyokado1 allItemCount", 8, allItemCount.value);
    testFunc("itoyokado1 disp_syoukei", 1342, disp_syoukei.value);
    testFunc("itoyokado1 zeis len", 1, zeis.value.length);
    testFunc("itoyokado1 zeis[0].ratePercent", "込8", zeis.value[0].ratePercent);
    testFunc("itoyokado1 zeis[0].targetValue", 1342, zeis.value[0].targetValue);
    testFunc("itoyokado1 zeis[0].allvalue()", 99, zeis.value[0].allvalue());
    testFunc("itoyokado1 goukei", 1342, goukei.value);

    selectedStoreProfile.value = testData.maruetsuManyDiscount.selectedStoreProfile;
    kaimonoItems.value = testData.maruetsuManyDiscount.kaimonoItems;
    testFunc("maruetsuManyDiscount syoukei", 1491, syoukei.value);
    testFunc("maruetsuManyDiscount allItemHinCount", 15, allItemHinCount.value);
    testFunc("maruetsuManyDiscount allItemCount", 15, allItemCount.value);
    testFunc("maruetsuManyDiscount disp_syoukei", 1491, disp_syoukei.value);
    testFunc("maruetsuManyDiscount zeis len", 1, zeis.value.length);
    testFunc("maruetsuManyDiscount zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("maruetsuManyDiscount zeis[0].targetValue", 1491, zeis.value[0].targetValue);
    testFunc("maruetsuManyDiscount zeis[0].allvalue()", 119, zeis.value[0].allvalue());
    testFunc("maruetsuManyDiscount goukei", 1610, goukei.value);

    selectedStoreProfile.value = testData.okID500.selectedStoreProfile;
    kaimonoItems.value = testData.okID500.kaimonoItems;
    testFunc("okID500 syoukei", 464, syoukei.value);
    testFunc("okID500 allItemHinCount", 6, allItemHinCount.value);
    testFunc("okID500 allItemCount", 6, allItemCount.value);
    testFunc("okID500 disp_syoukei", 464, disp_syoukei.value);
    testFunc("okID500 zeis len", 2, zeis.value.length);
    testFunc("okID500 zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("okID500 zeis[0].targetValue", 458, zeis.value[0].targetValue);
    testFunc("okID500 zeis[0].allvalue()", 36, zeis.value[0].allvalue());
    testFunc("okID500 zeis[1].ratePercent", "10", zeis.value[1].ratePercent);
    testFunc("okID500 zeis[1].targetValue", 6, zeis.value[1].targetValue);
    testFunc("okID500 zeis[1].allvalue()", 0, zeis.value[1].allvalue());
    testFunc("okID500 goukei", 500, goukei.value);

    selectedStoreProfile.value = testData.cocos.selectedStoreProfile;
    customStoreProfile.value = testData.cocos.customStoreProfile;
    kaimonoItems.value = testData.cocos.kaimonoItems;
    testFunc("cocos syoukei", 2060, syoukei.value);
    testFunc("cocos allItemHinCount", 4, allItemHinCount.value);
    testFunc("cocos allItemCount", 4, allItemCount.value);
    testFunc("cocos disp_syoukei", 2060, disp_syoukei.value);
    testFunc("cocos zeis len", 1, zeis.value.length);
    testFunc("cocos zeis[0].ratePercent", "10", zeis.value[0].ratePercent);
    testFunc("cocos zeis[0].targetValue", 2060, zeis.value[0].targetValue);
    testFunc("cocos zeis[0].allvalue()", 206, zeis.value[0].allvalue());
    testFunc("cocos goukei", 2266, goukei.value);

    selectedStoreProfile.value = testData.AEON20230712_AEONwithWaribiki.selectedStoreProfile;
    customStoreProfile.value = testData.AEON20230712_AEONwithWaribiki.customStoreProfile;
    kaimonoItems.value = testData.AEON20230712_AEONwithWaribiki.kaimonoItems;
    testFunc("AEON20230712_AEONwithWaribiki syoukei", 1733, syoukei.value);
    testFunc("AEON20230712_AEONwithWaribiki allItemHinCount", 15, allItemHinCount.value);
    testFunc("AEON20230712_AEONwithWaribiki allItemCount", 15, allItemCount.value);
    testFunc("AEON20230712_AEONwithWaribiki disp_syoukei", 1733, disp_syoukei.value);
    testFunc("AEON20230712_AEONwithWaribiki zeis len", 1, zeis.value.length);
    testFunc("AEON20230712_AEONwithWaribiki zeis[0].ratePercent", "8", zeis.value[0].ratePercent);
    testFunc("AEON20230712_AEONwithWaribiki zeis[0].targetValue", 1733, zeis.value[0].targetValue);
    testFunc("AEON20230712_AEONwithWaribiki zeis[0].allvalue()", 138, zeis.value[0].allvalue());
    testFunc("AEON20230712_AEONwithWaribiki goukei", 1871, goukei.value);




    // 商品数1個の場合は、どんな場合でも２つのHASUU＿SYORIは同じ値になる
    if (false) {
      const syouhinnsuu = 2;
      let allLoopCount = 0;
      [[0], [0.3], [3 / 103], [3 / 103, 0.3], [3 / 103, 0.5]].forEach(rate => {
        [Constants.COMPUTE_EACH_FALSE, Constants.COMPUTE_EACH_TRUE].forEach(compeach => {
          [Math.ceil, Math.round, Math.floor].forEach(func => {
            for (let i = 1; i < 10000; ++i) {
              allLoopCount++;
              testFunc(`Result with price=${i}, rate=${rate}, each=${compeach}, hasuuFunc=${func}`,
                computeDiscountedPriceFromRate(i, syouhinnsuu, rate, {
                  computeEach: compeach,
                  hasuuSyori: Constants.HASUU_SYORI_ONCE,
                  hasuuFunc: func,
                }),
                computeDiscountedPriceFromRate(i, syouhinnsuu, rate, {
                  computeEach: compeach,
                  hasuuSyori: Constants.HASUU_SYORI_ONEBYONE,
                  hasuuFunc: func,
                })
              );
            }
          });
        });
      });
      console.log("All Loop Count", allLoopCount);
    }

    showTestResult();

    selectedStoreProfile.value = saveCurrentStoreProfile;
    customStoreProfile.value = saveCurrentCustomProfile;
    kaimonoItems.value = saveCurrentItems;
  }
}

const kaimonoItems = ref();
const customStoreProfile = ref();
const selectedStoreProfile = ref();
const memo = ref();
const keisanki = ref();

const showCustomVisible = ref(true);

function createDefaultStoreProfile() {
  return {
    name: Constants.CUSTOM_STOREPROFILE_NAME,
    discountProfile: Constants.STOREPROFILE_UNIMPLEMENTED.discountProfile,
    computeEach: Constants.STOREPROFILE_UNIMPLEMENTED.computeEach,
    hasuuSyori: Constants.STOREPROFILE_UNIMPLEMENTED.hasuuSyori,
  }
}
function applyObject(obj) {
  const refineStoreProfile = ((sp) => {
    if (sp) {
      if (typeof sp != "object") {
        const name = String(sp);
        sp = createDefaultStoreProfile();
        sp.name = name;
      }

      if (!sp.name) {
        sp = createDefaultStoreProfile();
      }

      let ok = false;
      for (let i = 0; i < Constants.STOREPROFILES.length; ++i) {
        if (sp.name == Constants.STOREPROFILES[i].name) {
          ok = true;
          break;
        }
      }
      if (!ok) {
        sp.name = Constants.CUSTOM_STOREPROFILE_NAME;
      }

      if (sp.computeEach != Constants.COMPUTE_EACH_FALSE &&
        sp.computeEach != Constants.COMPUTE_EACH_TRUE) {
        sp.computeEach = sp.computeEach ? Constants.COMPUTE_EACH_TRUE : Constants.COMPUTE_EACH_FALSE;
      }
      if (sp.hasuuSyori != Constants.HASUU_SYORI_ONCE &&
        sp.hasuuSyori != Constants.HASUU_SYORI_ONEBYONE) {
        sp.hasuuSyori = Constants.HASUU_SYORI_ONEBYONE;
      }
    }
    return sp;
  });

  obj.selectedStoreProfile = refineStoreProfile(obj.selectedStoreProfile);
  obj.customStoreProfile = refineStoreProfile(obj.customStoreProfile);

  selectedStoreProfile.value = obj.selectedStoreProfile ?? createDefaultStoreProfile();
  customStoreProfile.value = obj.customStoreProfile ?? createDefaultStoreProfile();
  kaimonoItems.value = obj.kaimonoItems ?? [];
  memo.value = obj.memo;
  keisanki.value = obj.keisanki;

  console.assert(isValidStoreProfile());
}
const loaded = loadFromLocalStorage(LOCALSTORAGE_DEFAULT);
applyObject(loaded);

if (__DEBUG__) {
  function setItems(loaded) {
    selectedStoreProfile.value = loaded.selectedStoreProfile;
    kaimonoItems.value = loaded.kaimonoItems;
  }
  // setItems(testData.maruetsuNormal);
  // setItems(testData.berxNormal);
  // setItems(testData.parliamentNormal);
  // setItems(testData.seiyuNormal);
  // setItems(testData.okWith10);
  // setItems(testData.okwithNotF8);
  // setItems(testData.okWithCashAndDiscount);
  // setItems(testData.okDiscountWithID);
  // setItems(testData.aeon1963);
  // setItems(testData.aeon1092);
  // setItems(testData.marinpia191);
  // setItems(testData.ok2wariWithCash);
  // setItems(testData.maruetuManyWaribiki);
  // setItems(testData.okFunabashiKeiba);
}
function isOKWithKaiinProfile() {
  return selectedStoreProfile.value.name == Constants.STOREPROFILE_OKSTOREWITHKAIIN.name;
}
function isOKWithoutKaiinProfile() {
  return selectedStoreProfile.value.name == Constants.STOREPROFILE_OKSTORE.name;
}

function loadFromLocalStorage(storageKey) {
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
  return true;
}

function getSaveJson() {
  return JSON.stringify({
    "kaimonoItems": kaimonoItems.value,
    "selectedStoreProfile": selectedStoreProfile.value,
    "customStoreProfile": customStoreProfile.value,
    "memo": memo.value,
    "keisanki": keisanki.value,
  });
}

function saveonLocalStorage() {
  localStorage.setItem(LOCALSTORAGE_DEFAULT, getSaveJson());
}
watch(kaimonoItems.value, (newItems) => {
  saveonLocalStorage();
})
watch(selectedStoreProfile, (newProfile, oldProfile) => {
  if (oldProfile.name != customStoreProfile.value.name &&
    newProfile.name == customStoreProfile.value.name) {
    // user selected 'カスタム'
    showCustomVisible.value = true;
  }
  if (selectedStoreProfile.value.name == customStoreProfile.value.name) {
    customStoreProfile.value = selectedStoreProfile.value;
  }
  saveonLocalStorage();
}, {
  deep: true,
})
watch(memo, () => {
  saveonLocalStorage();
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
function isNumberOrSpace(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode == 0x20) {
    return true;
  }
  return isNumber(evt);
}
function incrementCount(item, index) {
  countRefs.value[index].focus();
  item.count++;
}
function decrementCount(item, index) {
  countRefs.value[index].focus();
  if (item.count == 0) {
    return;
  }
  item.count--;
}

function incrementDiscountRate(item, index) {
  discountRateRefs.value[index].focus();
  if ((String(item.discountRate)).indexOf(':') >= 0) {
    return;
  }
  if (!item.discountRate) {
    item.discountRate = 0;
  }
  item.discountRate++;
}
function decrementDiscountRate(item, index) {
  discountRateRefs.value[index].focus();
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

function incrementDiscountValue(item, index) {
  discountValueRefs.value[index].focus();
  if (!item.discountValue) {
    item.discountValue = 0;
  }
  item.discountValue++;
}
function decrementDiscountValue(item, index) {
  discountValueRefs.value[index].focus();
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
  taxRateRefs.value[index].focus();

  let curRate = kaimonoItems.value[index].taxRate;
  const curIndex = Constants.TAXRATEVALUES.findIndex((v) => curRate == v);
  let incdec = (inc_or_dec == INCORDEC_INC ? 1 : -1);
  let newIndex = curIndex + incdec;
  if (newIndex >= Constants.TAXRATEVALUES.length || newIndex < 0) {
    return;
  }
  kaimonoItems.value[index].taxRate = Constants.TAXRATEVALUES[newIndex];
}
function incrementTaxRate(index) {
  incrementOrdecrementTaxRate(index, INCORDEC_INC);
}
function decrementTaxRate(index) {
  incrementOrdecrementTaxRate(index, INCORDEC_DEC);
}

function getDefaultTaxRate() {
  console.assert(selectedStoreProfile.value);
  if (!selectedStoreProfile.value.defaultZeiritsu) {
    return Constants.TAXRATE_EIGHT;
  }
  return selectedStoreProfile.value.defaultZeiritsu;
}

function addItem(event) {
  kaimonoItems.value.push({
    goods: "",
    price: null,
    count: 1,
    discountRate: null,
    ok3_103: isOKWithKaiinProfile(),
    discountValue: null,
    taxRate: getDefaultTaxRate(),
  });
  const buttonRect = addButtonRef.value.getBoundingClientRect();
  const buttonPosWidth = buttonRect.right - buttonRect.left;
  const clickPositionX = event.clientX - buttonRect.left;
  const left1_3PosWidth = buttonPosWidth / 3;
  const isLeftClick = clickPositionX < left1_3PosWidth;

  nextTick(() => {
    if (isLeftClick) {
      nameRefs.value[nameRefs.value.length - 1].focus();
    } else {
      kakakuRefs.value[kakakuRefs.value.length - 1].focus();
    }
  });
}
function clearAll() {
  if (kaimonoItems.value.length == 0 && !memo.value && !keisanki.value) {
    return;
  }
  if (window.confirm('アイテムをすべて削除しますか？')) {
    kaimonoItems.value.splice(0, kaimonoItems.value.length);
    memo.value = null;
    keisanki.value = null;
  }
}
function deleteItem(index) {
  kaimonoItems.value.splice(index, 1);
}
function getDiscountRates(item) {
  const rate = item.discountRate;
  if (!rate) {
    return [0];
  }
  if (typeof rate == "number") {
    return [rate / 100];
  }
  let ret = []
  formatSpace(rate).split(DISCOUNTRATE_SEPARATOR).map(String).forEach((r) => {
    ret.push(Number(r) / 100);
  })
  return ret;
}

function isValidStoreProfile() {
  if (!selectedStoreProfile.value) {
    return false;
  }
  if (typeof selectedStoreProfile.value != "object") {
    return false;
  }
  for (let i = 0; i < Constants.STOREPROFILES.length; ++i) {
    if (selectedStoreProfile.value.name == Constants.STOREPROFILES[i].name) {
      return true;
    }
  }
  if (selectedStoreProfile.value.name == Constants.CUSTOM_STOREPROFILE_NAME) {
    return true;
  }
  return false;
}
function getHasuuFunc() {
  switch (selectedStoreProfile.value.discountProfile) {
    case Constants.DISCOUNT_PROFILE_CEAL: return Math.ceil;
    case Constants.DISCOUNT_PROFILE_ROUND: return Math.round;
    case Constants.DISCOUNT_PROFILE_FLOOR: return Math.floor;
  }
  console.error("Invalid discountProfile", selectedStoreProfile.value);
  console.error("Invalid discountProfile", selectedStoreProfile.value.discountProfile);
}
function getHasuuSyori() {
  return selectedStoreProfile.value.hasuuSyori;
}
function isItemOk3_103(item) {
  return isOKWithKaiinProfile() && item.ok3_103;
}
function getComputeEach() {
  if (!selectedStoreProfile.value.computeEach) {
    return Constants.COMPUTE_EACH_FALSE;
  }
  return selectedStoreProfile.value.computeEach;
}
function getItemSyoukei(item, withoutOK3_103) {
  if (item.disabled) {
    return 0;
  }
  const price = Number(item.price);
  const count = Number(item.count);
  const taxRate = Number(item.taxRate);
  const discountValue = Number(item.discountValue ?? 0);

  const TODO_CURRENTLY_YENFIRST_RATELAST = true;

  const yenWaribikiFunc = (price) => {
    return price - discountValue;
  }

  const rateWaribikiFunc = (price) => {
    let discountRates = getDiscountRates(item);
    if (isItemOk3_103(item) && !withoutOK3_103) {
      discountRates.push(Constants.DISCOUNT_RATE_OK_3_103_N);
    }

    return computeDiscountedPriceFromRate(price, count, discountRates, {
      computeEach: getComputeEach(),
      hasuuFunc: getHasuuFunc(),
      hasuuSyori: getHasuuSyori(),
    });
  };

  if (TODO_CURRENTLY_YENFIRST_RATELAST) {
    return rateWaribikiFunc(yenWaribikiFunc(price));
  } else {
    return yenWaribikiFunc(rateWaribikiFunc(price));
  }
  console.error("Nazo");
}
function getSyoukei(withoutOK3_103) {
  let ret = 0;
  kaimonoItems.value.forEach((item) => {
    if (!item.disabled) {
      ret += getItemSyoukei(item, withoutOK3_103);
    }
  });

  return ret;
}
function getZeis() {
  let zeiGotoMap = {};
  kaimonoItems.value.forEach((item) => {
    if (!item.disabled) {
      let rate = item.taxRate;
      if (isItemOk3_103(item)) {
        console.assert(rate == Constants.TAXRATE_EIGHT);
        rate = Constants.TAXRATE_EIGHTF8;
      }

      if (!zeiGotoMap[rate]) {
        zeiGotoMap[rate] = [];
      }
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

    zeiGotoMap[key].forEach((v) => {
      if (v.ratePercent != Constants.TAXRATE_ZERO) {
        shrinkMap[key].targetValue += v;
      }
    });

  });


  let ret = [];
  Object.keys(shrinkMap).forEach(function (key) {
    if (shrinkMap[key].ratePercent != Constants.TAXRATE_ZERO) {
      let perTaxValue = 0;
      let perTaxKomiValue = 0;
      let rate;
      switch (shrinkMap[key].ratePercent) {
        case Constants.TAXRATE_EIGHT:
        case Constants.TAXRATE_EIGHTF8:
        case Constants.TAXRATE_TEN:
          if (shrinkMap[key].ratePercent == Constants.TAXRATE_TEN) {
            rate = 10 / 100;
          } else {
            rate = 8 / 100;
          }
          perTaxValue = Math.floor(shrinkMap[key].targetValue * rate);
          break;

        case Constants.TAXRATE_KOMI_EIGHT:
        case Constants.TAXRATE_KOMI_TEN:
          rate =
            shrinkMap[key].ratePercent == Constants.TAXRATE_KOMI_EIGHT ? 0.08 : 0.1;
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
  if (isOKWithoutKaiinProfile()) {
    if (item.taxRate != 8 && isItemOk3_103(item)) {
      return "税率が８％でないのに3/103が有効です"
    }
  }
  else {
    const rates = getDiscountRates(item);
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

  if (Constants.TAXRATEVALUES.findIndex((v) => v == item.taxRate) < 0) {
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
  return getSyoukei(false) + allZei.value;
});
function getContainerCellClass(item, index) {
  if (getItemErrorMessage(item)) {
    return 'empty_container_cell';
  }
  return index % 2 == 0 ? 'even_bg' : 'odd_bg';
}
const ok3_100kei = computed(() => {
  if (!isOKWithKaiinProfile()) {
    console.error("Profile must be 'OKStore'");
    return 0;
  }
  return getSyoukei(true) - getSyoukei(false);
});
const disp_syoukei = computed(() => {
  if (isOKWithKaiinProfile()) {
    return getSyoukei(false);
  }
  return syoukei.value;
})


function loadlocalFile() {
  const { files: filesFileDialog,
    open: openFileDialog,
    reset: resetFileDialog,
    onChange: onChangeFileDialog } = useFileDialog()
  resetFileDialog();
  openFileDialog();

  onChangeFileDialog((files) => {
    const TENMEGA = 10 * 1024 * 1024;
    const file = files[0];
    if (file.size > TENMEGA) {
      if (!confirm(`${file.name} のサイズは１０Mバイト以上あります。本当に読み込みますか？`)) {
        return;
      }
    }
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        if (reader.result.trim() === "") {
          alert("ファイルが空です。");
          return;
        }
        const loadedObj = JSON.parse(reader.result);
        if (!loadedObj.selectedStoreProfile &&
          !loadedObj.kaimonoItems) {
          alert("ファイルにデータがありません。");
          return;
        }
        applyObject(loadedObj);
        saveonLocalStorage();
      } catch (error) {
        console.error(error);
        alert("JSONの解析に失敗しました\n\n" + error);
      }
    };
    reader.onerror = function () {
      console.error(reader.error);
      alert(reader.error);
    };
    reader.onloadend = function () {
      // resetFileDialog();
    };
  })
}
function savelocalFile() {
  const jsonString = getSaveJson();
  const blob = new Blob([jsonString], { type: 'application/json' });

  const getDateString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  let filename = prompt("保存するファイル名を入力", getDateString() + '買い物');
  if (!filename) {
    return;
  }
  saveAs(blob, filename);
}

const kakaku_placeholder = computed(() => {
  if (isOKWithKaiinProfile() || isOKWithoutKaiinProfile()) {
    return "非会員の税抜価格";
  }

  switch (getDefaultTaxRate()) {
    case Constants.TAXRATE_ZERO:
      return "";
    case Constants.TAXRATE_EIGHT:
    case Constants.TAXRATE_TEN:
      return "税抜価格";
    case Constants.TAXRATE_KOMI_EIGHT:
    case Constants.TAXRATE_KOMI_TEN:
      return "税込価格";
  }
  console.assert(false);
  return "";
});

const nameRefs = ref([])
const kakakuRefs = ref([])
const countRefs = ref([])
const discountRateRefs = ref([])
const discountValueRefs = ref([])
const taxRateRefs = ref([])
const addButtonRef = ref()
onMounted(() => {

});

function onMemoChange() {

}

watch(keisanki, () => {
  saveonLocalStorage();
})
const calculatorChanged = ((v) => {
  keisanki.value = v;
});
function isReadyMadeStoreProfile() {
  if (!selectedStoreProfile.value) {
    return false;
  }
  for (let i = 0; i < Constants.STOREPROFILES.length; ++i) {
    if (selectedStoreProfile.value.name == Constants.STOREPROFILES[i].name) {
      return true;
    }
  }
  return false;
}
function isDebug() {
  return __DEBUG__;
}
</script>

<template>
  <div v-if="isDebug()">
    <button @click="doTest">doTest</button>
  </div>
  <div class="container">
    <h1>🛒買い物いくら🛒</h1>

    <div class="container-cell">
      <div class="cell3columns storeprofile">
        <div>
          <label class="label_storeselect" for="storeselect_top">会計方式：</label>
          <select id="storeselect_top" class="storeselect" v-model="selectedStoreProfile">
            <option disabled selected value="null">選択してください</option>
            <option v-for="sp in Constants.STOREPROFILES" :key="sp" :value="sp">{{ sp.name }}</option>
            <option :value='customStoreProfile'>カスタム</option>
          </select>
        </div>

        <div v-if="!isReadyMadeStoreProfile() && showCustomVisible">
          <div>
            <label class="label_storeselect" for="defaultzeiritsuselect_top">デフォルト税率：</label>
            <select id="defaultzeiritsuselect_top" v-model="selectedStoreProfile.defaultZeiritsu">
              <option v-for="tv in Constants.TAXRATEVALUES" :key="tv" :value="tv">
                {{ tv }}
              </option>
            </select>
          </div>

          <div>
            <label class="label_storeselect" for="discountselect_top">割引率計算：</label>
            <select id="discountselect_top" v-model="selectedStoreProfile.discountProfile">
              <option v-for="dp in Constants.DISCOUNT_PROFILES" :key="dp" :value="dp">
                {{ dp }}
              </option>
            </select>
          </div>

          <div>
            <label class="label_storeselect" for="computeeachselect_top">同じものを複数：</label>
            <select id="computeeachselect_top" v-model="selectedStoreProfile.computeEach">
              <option v-for="ce in Constants.COMPUTE_EACHES" :key="ce" :value="ce">
                {{ ce }}
              </option>
            </select>
          </div>

          <div>
            <label class="label_storeselect" for="hasuusyoriselect_top">複数割引率：</label>
            <select id="hasuusyoriselect_top" v-model="selectedStoreProfile.hasuuSyori">
              <option v-for="hs in Constants.HASUU_SYORIS" :key="hs" :value="hs">
                {{ hs }}
              </option>
            </select>
          </div>

          <button @click="showCustomVisible = false">閉じる</button>
        </div>
      </div>
    </div>

    <div class="container-cell" v-if="!isValidStoreProfile()">
      <p class="cell3columns">会計方式を選択してください</p>
    </div>
    <div class="container-cell" v-else-if="kaimonoItems.length == 0">
      <p class="cell3columns">追加を{{ Constants.tapORclick }}して商品を追加してください</p>
    </div>
    <transition-group name="fade">
      <div class="container-cell" :class="getContainerCellClass(item, index)" v-for="(item, index) in kaimonoItems"
        :key="item">
        <div class="cell">
          <div class="setumei">商品 {{ index + 1 }}</div>
          <div class="goods">
            <input ref="nameRefs" class="stringinput" placeholder="商品名（任意）" v-model="item.goods" />
          </div>
        </div>

        <div class="cell">
          <div class="setumei">価格</div>
          <div class="price">
            <input ref="kakakuRefs" class="numberinput" type="number"
              @focus="setItemInfoMessage(item, kakaku_placeholder)" @blur="setItemInfoMessage(item, null)"
              :placeholder="kakaku_placeholder" v-model="item.price" @keypress="isNumber($event)" />
          </div>
        </div>

        <div class="cell">
          <div class="setumei">個数</div>
          <div class="count">
            <input ref="countRefs" class="numberinput" type="number" v-model="item.count" @keypress="isNumber($event)" />
          </div>
          <div>
            <button class="twobutton" @click="decrementCount(item, index)">
              {{ Constants.downChar }}
            </button>
            <button class="twobutton" @click="incrementCount(item, index)">
              {{ Constants.upChar }}
            </button>
          </div>
        </div>

        <div class="cell">
          <div class="setumei">割引円</div>
          <div class="discount-value">
            <input ref="discountValueRefs" class="numberinput" type="number" v-model="item.discountValue"
              @keypress="isNumber($event)" />
          </div>
          <div>
            <button class="twobutton" @click="decrementDiscountValue(item, index)">
              {{ Constants.downChar }}
            </button>
            <button class="twobutton" @click="incrementDiscountValue(item, index)">
              {{ Constants.upChar }}
            </button>
          </div>
        </div>

        <div class="cell">
          <div class="setumei">割引％</div>
          <div class="discount-rate">
            <input ref="discountRateRefs" class="numberinput" inputmode="decimal" v-model="item.discountRate"
              @keypress="isNumberOrSpace($event)" />
          </div>
          <div>
            <button class="twobutton" @click="decrementDiscountRate(item, index)">
              {{ Constants.downChar }}
            </button>
            <button class="twobutton" @click="incrementDiscountRate(item, index)">
              {{ Constants.upChar }}
            </button>
          </div>
        </div>

        <div class="cell">
          <div class="setumei">税率％</div>
          <div class="tax-rate">
            <input ref="taxRateRefs" class="numberinput" v-model="item.taxRate" @keypress="isNumber($event)" />
          </div>
          <div>
            <button class="twobutton" @click="decrementTaxRate(index)">
              {{ Constants.downChar }}
            </button>
            <button class="twobutton" @click="incrementTaxRate(index)">
              {{ Constants.upChar }}
            </button>
          </div>
        </div>

        <div class="cell">
          <!-- <div class="setumei">有効</div> -->
          <div v-if="isOKWithKaiinProfile()">
            <div class="checklabel">
              <input :id="'ok3_103_check' + index" type="checkbox" @click="item.ok3_103 = !item.ok3_103"
                :checked="item.ok3_103" />
              <label :for="'ok3_103_check' + index">3/103</label>
            </div>
          </div>
          <div class="checklabel">
            <input :id="'enable_check' + index" type="checkbox" @click="item.disabled = !item.disabled"
              :checked="!item.disabled" />
            <label :for="'enable_check' + index">有効</label>
          </div>
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
    </transition-group>
    <!-- end of loop -->

    <div class="container-cell">
      <button ref="addButtonRef" @click="addItem" class="cell3columns">追加</button>
    </div>

    <div class="container-cell">
      <div class="cell3columns storeprofile">
        <div>
          <label class="label_storeselect" for="storeselect_top">会計方式：</label>
          <select id="storeselect_top" class="storeselect" v-model="selectedStoreProfile">
            <option disabled selected value="null">選択してください</option>
            <option v-for="sp in Constants.STOREPROFILES" :key="sp" :value="sp">{{ sp.name }}</option>
            <option :value='customStoreProfile'>カスタム</option>
          </select>
        </div>
      </div>
    </div>

    <div class="container-cell" v-if="isOKWithKaiinProfile()">
      <div class="kei cell3columns">割引前合計 ¥{{ syoukei }}</div>
    </div>
    <div class="container-cell" v-if="isOKWithKaiinProfile()">
      <div class="kei cell3columns">F食料品3/103割引 -{{ ok3_100kei }}</div>
    </div>

    <div class="container-cell">
      <div class="kei cell3columns">小計 {{ allItemHinCount }}品 {{ allItemCount }}点 ¥{{ disp_syoukei }}</div>
    </div>

    <div class="container-cell" v-if="zeis.length">
      <div class="kei cell3columns" v-for="(zei, index) in zeis">
        税{{ zei.ratePercent }}% 対象額 ¥{{ zei.targetValue }} 税額 ¥{{ zei.allvalue() }}
      </div>
    </div>

    <div class="container-cell">
      <div class="kei goukei cell3columns">合計 ¥{{ goukei }}</div>
    </div>

    <div class="container-cell">
      <div class="cell3columns">
        <Calculator :keisanki="keisanki" :goukei="goukei" :key="goukei" @keisan-changed="calculatorChanged" />
      </div>
    </div>

    <div class="container-cell">
      <div class="cell3columns">
        <textarea v-model="memo" @change="onMemoChange" id="t_message" name="message" placeholder="メモを記入"></textarea>
      </div>
    </div>

    <div class="container-cell">
      <button @click="loadlocalFile">🚚ロード</button>
      <button @click="savelocalFile">💾セーブ</button>
      <button @click="clearAll">❌すべて削除</button>
    </div>

    <div class="help">
      <h2>使い方</h2>
      <ul class="ulhelp">
        <li>
          店舗によって割引（％）の端数の計算方法が違います。「会計方式」から適切なものを選択してください。
        </li>
        <li>
          ２つ以上の割引がある場合があります。例えば１つめの商品そのものの割引でもう１つは会員割引などです。２つが例として２０％、５％の場合は「割引％」欄に「20 5」と２つの値をスペースで区切って指定してください。
        </li>
        <li>
          オーケーストアでは会員カードを提示して現金で支払うと3/103割引を受けられる食料品があります。その場合は「3/103」をチェックしてください。このような商品の場合値札には４つの価格が示されています。価格の欄に入力する値は割引前でかつ税抜きの価格です。通常は４つの価格のうち左下に表示されている価格です。
        </li>
        <li>
          簡易計算機では四則演算を行うことができ、カッコを使うこともできます。「合計」と記述することで合計を参照することができます。ほかにも例えば「合計 ％
          ２００」と記述すると、合計を２００で割ったあまりを求めることができます。</li>
      </ul>
    </div>
    <footer>
      {{ Constants.appName }} v{{ Constants.appVersion }} <a href="https://ambiesoft.com/" target="_blank">Ambiesoft</a>
    </footer>
  </div> <!-- end of container -->
  <div v-if="isDebug()">
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

.fade-enter-active,
.fade-leave-active {
  /* transition: opacity 0.5s; */
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  /* opacity: 0; */
  opacity: 0;
  transform: translateX(30px);
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

.label_storeselect {
  vertical-align: middle;
}

.storeselect {
  /* height: 100%; */
  /* vertical-align: middle; */
}

.storeselect :invalid {
  color: gray;
}

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

.goods {
  /* TODO: why 100? */
  grid-row: span 100;
}

.price {
  grid-row: span 100;
}

.checklabel {
  width: 100%;
  text-align: left;
}

input {
  font-size: large;
  padding: 5px;
  width: 100%;
}

input[type="checkbox"] {
  font-size: large;
  width: auto;
  margin-left: 3px;
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

.kei {
  width: 100%;
  text-align: right;
}

.goukei {
  font-size: x-large;
  font-weight: bold;
}

#t_message {
  width: 100%;
  height: 5em;
}



.help {
  margin-top: 10px;
  width: 100%;
}

ul {
  margin: 0;
  padding-left: 30px;
}

ul li {
  list-style-type: square;
}


ul.ulhelp {
  margin: 0 +10px 0 0;
}

ul.ulhelp li {
  padding-bottom: 15px;
}

footer {
  padding-top: 10px;
  text-align: right;
}
</style>
