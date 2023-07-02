import Constants from "./constants"
import { computeDiscountedPriceFromRate } from '@/utils';

export const testData = {
    /** maruetsuNormal */
    maruetsuNormal: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_CEAL,
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
    },


    /** berxNormal */
    berxNormal: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_FLOOR,
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
    },


    /** PARLIAMENT */
    parliamentNormal: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_FLOOR,
        kaimonoItems: [
            {
                goods: "パーラメント",
                price: 620,
                count: 1,
                taxRate: Constants.TAXRATE_KOMI_TEN,
            },
        ]
    },

    /** SeiyuNormal */
    seiyuNormal: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_FLOOR,
        kaimonoItems: [
            {
                goods: "ふくろ",
                price: 5,
                count: 1,
                taxRate: Constants.TAXRATE_TEN,
            },
            {
                goods: "なっちゃん",
                price: 199,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "牛乳",
                price: 119,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "いちご練乳",
                price: 198,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "Qsメロン",
                price: 98,
                count: 2,
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    },

    /** OKwith10% */
    okWith10: {
        selectedStoreProfile: Constants.STOREPROFILE_OKSTOREWITHKAIIN,
        kaimonoItems: [
            {
                goods: "ソーダフロート",
                price: 60,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "いちごフロート",
                price: 60,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ソフフラノメロン",
                price: 90,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "単1電池",
                price: 540,
                count: 1,
                taxRate: Constants.TAXRATE_TEN,
            },
            {
                goods: "飴",
                price: 139,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    },
    /** okwithNotF8 */
    okwithNotF8: {
        selectedStoreProfile: Constants.STOREPROFILE_OKSTOREWITHKAIIN,
        kaimonoItems: [
            {
                goods: "炭酸ナトリウム",
                price: 275,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "キリマンジャロ",
                price: 399,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "はくさい",
                price: 100,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "A抹茶",
                price: 194,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ミロ",
                price: 234,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "バターロール",
                price: 95,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    },

    /** okWithCashAndDiscount */
    okWithCashAndDiscount: {
        selectedStoreProfile: Constants.STOREPROFILE_OKSTOREWITHKAIIN,
        kaimonoItems: [
            {
                goods: "キルシェ",
                price: 188,
                count: 1,
                taxRate: Constants.TAXRATE_TEN,
            },
            {
                goods: "ゴミ袋",
                price: 240,
                count: 1,
                taxRate: Constants.TAXRATE_ZERO,
            },
            {
                goods: "オカメ",
                price: 66,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ノーマット",
                price: 862,
                count: 1,
                taxRate: Constants.TAXRATE_TEN,
            },
            {
                goods: "Nドレダイエット",
                price: 119,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "カワミツ",
                price: 98,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "黒豆もやし",
                price: 30,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "フジッコ",
                price: 153,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "紀文はんぺん",
                price: 109,
                count: 1,
                discountRate: "10",
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ハウスニンニク",
                price: 168,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "QPマヨネーズ",
                price: 149,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ほねとりフィレ",
                price: 358,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ニラ",
                price: 68,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    },

    /** okDiscountWithID */
    okDiscountWithID: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_FLOOR,
        kaimonoItems: [
            {
                goods: "練乳イチゴ",
                price: 195,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "おかめ納豆",
                price: 66,
                count: 1,
                discountRate: "3",
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "キントキ",
                price: 60,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "こしあん",
                price: 74,
                count: 1,
                discountRate: "5",
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    },

    /** aeon1963 */
    aeon1963: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_CEAL,
        kaimonoItems: [
            {
                goods: "井村屋　宇治抹茶金時",
                price: 188,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "TVチョコアイス",
                price: 398,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "BPまろやかな味わいY",
                price: 98,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "BPとろけるスライス",
                price: 188,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "BPバター風味",
                price: 198,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "塩バターメロンパン",
                price: 118,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "パスコ　超熟８枚",
                price: 148,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "お肉屋さんのコロッケ小",
                price: 120,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "スペシャルサンド",
                price: 297,
                count: 1,
                discountRate: "20:5",
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "TVツナマヨ巻",
                price: 118,
                count: 1,
                discountRate: "10:5",
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "やわらかぶどうぱん",
                price: 118,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    },

    /** aeon1092 */
    aeon1092: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_CEAL,
        kaimonoItems: [
            {
                goods: "TV蚊取り線香",
                price: 468,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_TEN,
            },
            {
                goods: "ネオパラエース",
                price: 578,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_TEN,
            },
        ]
    },

    /** marinpia191 */
    marinpia191: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_ROUND,
        kaimonoItems: [
            {
                goods: "ほうれん草",
                price: 98,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "にら",
                price: 88,
                count: 1,
                discountRate: 5,
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    },

    /** ok2wariWithCash */
    ok2wariWithCash: {
        selectedStoreProfile: Constants.STOREPROFILE_OKSTOREWITHKAIIN,
        kaimonoItems: [
            {
                goods: "ＣＣレモン",
                price: 141,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ホームカフェ無糖",
                price: 178,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "氷菓イチゴ",
                price: 60,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "イチゴフロート",
                price: 60,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "コーヒーフロート",
                price: 60,
                count: 1,
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "Ｙクリームパン",
                price: 101,
                count: 1,
                discountRate: "5",
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "Ｙクリームパン",
                price: 101,
                count: 1,
                discountRate: "5",
                ok3_103: true,
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    },

    /** maruetuManyWaribiki normal */
    maruetuManyWaribiki: {
        selectedStoreProfile: Constants.STOREPROFILE_WARIBIKI_CEAL,
        kaimonoItems: [
            {
                goods: "いわし生姜煮",
                price: 80,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "手作りロースかつ",
                price: 298,
                count: 1,
                discountRate: 30,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "いも天",
                price: 80,
                count: 1,
                discountRate: 30,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "天丼",
                price: 390,
                count: 1,
                discountRate: 30,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "いなり",
                price: 158,
                count: 1,
                discountRate: 30,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "南瓜サラダ",
                price: 198,
                count: 1,
                discountRate: 40,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "プチ白菜漬",
                price: 50,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "バナナ",
                price: 188,
                count: 1,
                discountRate: 20,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "あんかけ",
                price: 158,
                count: 1,
                discountRate: 30,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ひじき煮",
                price: 128,
                count: 1,
                discountRate: 50,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "国産若鳥手羽元",
                price: 235,
                count: 1,
                discountRate: 20,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "ミラノ風ドリア",
                price: 398,
                count: 1,
                discountRate: 40,
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "調理パン",
                price: 50,
                count: 1,
                taxRate: Constants.TAXRATE_EIGHT,
            },
        ]
    }
};

let okCount = 0;
let ngCount = 0;
let firstError;
const separator = "-------------------------------------------------------------------";
export function clearTestResult() {
    okCount = ngCount = 0;
    firstError = "";
}
export function testFunc(name, expect, actual) {
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
    if (ok) {
        console.log(message);
    } else {
        if (!firstError) {
            firstError = message;
        }
        console.error(message)
    }
}
export function showTestResult() {
    console.log(separator);
    console.log(`done testing. OK=${okCount}, NG=${ngCount}`);
    if (firstError) {
        console.log(separator);
        console.error(firstError);
    }
}
