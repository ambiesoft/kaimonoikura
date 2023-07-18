

const _c = {
    appName: "kaimonoikura",
    appVersion: __APP_VERSION__,

    upChar: "↑",
    downChar: "↓",

    tapORclick: navigator.userAgent.match(/iPhone|Android.+Mobile/) ? "タップ" : "クリック",

    HASUU_SYORI_ONCE: "割引率を足して計算",
    HASUU_SYORI_ONEBYONE: "割引率を１つづつ計算",

    DISCOUNT_RATE_OK_3_103_N: 3 / 103,

    TAXRATE_ZERO: "0",
    TAXRATE_EIGHT: "8",
    TAXRATE_TEN: "10",
    TAXRATE_KOMI_EIGHT: "込8",
    TAXRATE_KOMI_TEN: "込10",
    TAXRATE_EIGHTF8: "F8",

    CUSTOM_STOREPROFILE_NAME: "カスタム",

    DISCOUNT_PROFILE_FLOOR: "割引率切り下げ",
    DISCOUNT_PROFILE_ROUND: "割引率四捨五入",
    DISCOUNT_PROFILE_CEAL: "割引率切り上げ",

    COMPUTE_EACH_TRUE: "１個づつ計算",
    COMPUTE_EACH_FALSE: "まとめて計算",
};

_c.TAXRATEVALUES = [
    _c.TAXRATE_ZERO,
    _c.TAXRATE_EIGHT,
    _c.TAXRATE_TEN,
    _c.TAXRATE_KOMI_EIGHT,
    _c.TAXRATE_KOMI_TEN,
];

_c.STOREPROFILE_DEFAULT_WITHOUTTAX = {
    name: "税抜デフォルト",
    discountProfile: _c.DISCOUNT_PROFILE_CEAL,
    computeEach: _c.COMPUTE_EACH_FALSE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
    defaultZeiritsu: _c.TAXRATE_EIGHT,
}
_c.STOREPROFILE_DEFAULT_WITHTAX = {
    name: "税込デフォルト",
    discountProfile: _c.DISCOUNT_PROFILE_CEAL,
    computeEach: _c.COMPUTE_EACH_FALSE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
    defaultZeiritsu: _c.TAXRATE_KOMI_EIGHT,
}
_c.STOREPROFILE_AEON = {
    name: "イオン",
    discountProfile: _c.DISCOUNT_PROFILE_CEAL,
    computeEach: _c.COMPUTE_EACH_FALSE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
}

_c.STOREPROFILE_ITOYOKADO = {
    name: "イトーヨーカドー",
    discountProfile: _c.DISCOUNT_PROFILE_CEAL,
    computeEach: _c.COMPUTE_EACH_FALSE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
    defaultZeiritsu: _c.TAXRATE_KOMI_EIGHT,
}
_c.STOREPROFILE_OKSTORE = {
    name: "オーケーストア",
    discountProfile: _c.DISCOUNT_PROFILE_FLOOR,
    computeEach: _c.COMPUTE_EACH_TRUE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
}
_c.STOREPROFILE_OKSTOREWITHKAIIN = {
    name: "オーケーストアwith会員カード",
    discountProfile: _c.DISCOUNT_PROFILE_FLOOR,
    computeEach: _c.COMPUTE_EACH_TRUE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
}
_c.STOREPROFILE_BERX = {
    name: "ベルクス",
    discountProfile: _c.DISCOUNT_PROFILE_CEAL,
    computeEach: _c.COMPUTE_EACH_FALSE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
}
_c.STOREPROFILE_MARINEPIA = {
    name: "マリンピア",
    discountProfile: _c.DISCOUNT_PROFILE_ROUND,
    computeEach: _c.COMPUTE_EACH_FALSE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
}
_c.STOREPROFILE_MARUETSU = {
    name: "マルエツ",
    discountProfile: _c.DISCOUNT_PROFILE_CEAL,
    computeEach: _c.COMPUTE_EACH_FALSE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
}
_c.STOREPROFILE_UNIMPLEMENTED = {
    name: "未実装",
    discountProfile: _c.DISCOUNT_PROFILE_CEAL,
    computeEach: _c.COMPUTE_EACH_FALSE,
    hasuuSyori: _c.HASUU_SYORI_ONEBYONE,
}

_c.DISCOUNT_PROFILES = [
    _c.DISCOUNT_PROFILE_CEAL,
    _c.DISCOUNT_PROFILE_ROUND,
    _c.DISCOUNT_PROFILE_FLOOR,
]
_c.STOREPROFILES = [
    _c.STOREPROFILE_DEFAULT_WITHOUTTAX,
    _c.STOREPROFILE_DEFAULT_WITHTAX,
    _c.STOREPROFILE_AEON,
    _c.STOREPROFILE_ITOYOKADO,
    _c.STOREPROFILE_OKSTORE,
    _c.STOREPROFILE_OKSTOREWITHKAIIN,
    _c.STOREPROFILE_MARINEPIA,
    _c.STOREPROFILE_MARUETSU,
];
_c.COMPUTE_EACHES = [
    _c.COMPUTE_EACH_TRUE,
    _c.COMPUTE_EACH_FALSE,
]
_c.HASUU_SYORIS = [
    _c.HASUU_SYORI_ONEBYONE,
    _c.HASUU_SYORI_ONCE,
]
const deepFreeze = (object) => {
    Object.freeze(object);

    for (const key in object) {
        if (typeof object[key] === 'object' && !Object.isFrozen(object[key])) {
            deepFreeze(object[key]);
        }
    }
};

const Constants = _c;
deepFreeze(Constants);
export default Constants;