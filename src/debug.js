import Constants from "./constants"
import { computeDiscountedPriceFromRate } from '@/utils';

export const testData = {
    /** maruetsuNormal */
    maruetsuNormal: {
        selectedStoreProfile: Constants.STOREPROFILE_MARUETSU,
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
        selectedStoreProfile: Constants.STOREPROFILE_BERX,
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
        selectedStoreProfile: Constants.STOREPROFILE_UNIMPLEMENTED,
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
        selectedStoreProfile: Constants.STOREPROFILE_UNIMPLEMENTED,
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
        selectedStoreProfile: Constants.STOREPROFILE_OKSTORE,
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
        selectedStoreProfile: Constants.STOREPROFILE_AEON,
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
                discountRate: "20　5 ",
                taxRate: Constants.TAXRATE_EIGHT,
            },
            {
                goods: "TVツナマヨ巻",
                price: 118,
                count: 1,
                discountRate: "10 5",
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
        selectedStoreProfile: Constants.STOREPROFILE_AEON,
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
        selectedStoreProfile: Constants.STOREPROFILE_MARINEPIA,
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
        selectedStoreProfile: Constants.STOREPROFILE_MARUETSU,
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
    },


    /** okFunabashiKeiba normal */
    okFunabashiKeiba: {
        selectedStoreProfile: Constants.STOREPROFILE_OKSTOREWITHKAIIN,
        kaimonoItems: [
            {
                "goods": "コーラゼロケース",
                "price": 960,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "フレッシュベーコン",
                "price": 199,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "国産バラ",
                "price": 1006,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "R-1",
                "price": 1236,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "芳醇ウインナー",
                "price": 839,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "８品目大根",
                "price": 108,
                "count": 3,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "８品目キャベツ",
                "price": 108,
                "count": 3,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "ミニクロワッサン",
                "price": 125,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "ミックスブドウ",
                "price": 306,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "エノキタケ",
                "price": 68,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "緑豆モヤシ",
                "price": 18,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "ピーマン",
                "price": 98,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "タカラグラハム",
                "price": 229,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "QP",
                "price": 513,
                "count": 2,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "ロリエ",
                "price": 278,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "10",
                "message": null
            },
            {
                "goods": "Yフンワリ",
                "price": 100,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            }
        ],
    },

    okNoCash3Pepsi103Checked: {
        selectedStoreProfile: Constants.STOREPROFILE_OKSTORE,
        "kaimonoItems": [
            {
                "goods": "ホームカフェ無糖",
                "price": 178,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "あずきバー",
                "price": 189,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "ペプシ",
                "price": 75,
                "count": 3,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "爽メロンソーダ",
                "price": 80,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "爽バニラ",
                "price": 80,
                "count": 1,
                "discountRate": null,
                "ok3_103": true,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            }
        ],
    },


    /** itoyokado1 */
    itoyokado1: {
        selectedStoreProfile: Constants.STOREPROFILE_OKSTOREWITHKAIIN,
        "kaimonoItems": [
            {
                "goods": "７Pさば水煮",
                "price": 181,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "込8",
                "message": null
            },
            {
                "goods": "７Pさばみそ煮",
                "price": 181,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "込8",
                "message": null
            },
            {
                "goods": "UCC1114 ９０G瓶",
                "price": 213,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "込8",
                "message": null
            },
            {
                "goods": "濃いめのカルピス",
                "price": 84,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "込8",
                "message": null
            },
            {
                "goods": "味の素ギョーザ",
                "price": 170,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "込8",
                "message": null
            },
            {
                "goods": "７P梅しそ漬",
                "price": 321,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "込8",
                "message": null
            },
            {
                "goods": "りんご",
                "price": 95,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "込8",
                "message": null
            },
            {
                "goods": "天ぷら",
                "price": 97,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "込8",
                "message": null
            }
        ],
        "memo": null,
        "keisanki": null
    },

    /** maruetsuManyDiscount */
    maruetsuManyDiscount: {
        selectedStoreProfile: Constants.STOREPROFILE_MARUETSU,

        "kaimonoItems": [
            {
                "goods": "おいしいYG",
                "price": 139,
                "count": 1,
                "discountRate": "20",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "えびくるみ",
                "price": 60,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "金平ごぼう",
                "price": 128,
                "count": 1,
                "discountRate": "30",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "岩もずく",
                "price": 60,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "巻きずし",
                "price": 258,
                "count": 1,
                "discountRate": "40",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "いも天",
                "price": 80,
                "count": 1,
                "discountRate": "20",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "コロッケ",
                "price": 138,
                "count": 1,
                "discountRate": "20",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "おいしいはんぺん",
                "price": 99,
                "count": 1,
                "discountRate": "20",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "大きなおむすび",
                "price": 158,
                "count": 1,
                "discountRate": "20",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "おにぎり",
                "price": 118,
                "count": 1,
                "discountRate": "20",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "食卓ロール",
                "price": 189,
                "count": 1,
                "discountRate": 30,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "くるみあんぱん",
                "price": 109,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "クリームツイスト",
                "price": 99,
                "count": 1,
                "discountRate": "30",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "白あんぱん",
                "price": 109,
                "count": 1,
                "discountRate": "30",
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "玉ねぎ",
                "price": 177,
                "count": 1,
                "discountRate": "0",
                "ok3_103": false,
                "discountValue": 19,
                "taxRate": "8",
                "message": null
            }
        ],

        "memo": null,
        "keisanki": null
    },

    /** okID500 */
    okID500: {
        "selectedStoreProfile": Constants.STOREPROFILE_OKSTORE,
        "kaimonoItems": [
            {
                "goods": "ホームカフェ無糖",
                "price": 178,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "（Yスイートブレッド",
                "price": 111,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "おかめ納豆",
                "price": 66,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "センタン いちごフロート",
                "price": 60,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "ガリガリ君ソーダ",
                "price": 43,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "8",
                "message": null
            },
            {
                "goods": "レジ袋",
                "price": 6,
                "count": 1,
                "discountRate": null,
                "ok3_103": false,
                "discountValue": null,
                "taxRate": "10",
                "message": null
            }
        ],
        "memo": "ぴったり",
        "keisanki": ""
    },
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
