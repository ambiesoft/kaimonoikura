

const _c = {
    ENUM_VALUE_1: 'Value 1',
    ENUM_VALUE_2: 'Value 2',
    ENUM_VALUE_3: 'Value 3',

    appName: "kaimonoikura",
    appVersion: __APP_VERSION__,

    upChar: "↑",
    downChar: "↓",

    tapORclick: navigator.userAgent.match(/iPhone|Android.+Mobile/) ? "タップ" : "クリック",

    DEBUGGING: (((new URL(location.href)).hostname) == "127.0.0.1" ||
        (new URL(location.href)).hostname == "localhost"),

    HASUU_SYORI_ONCE: 1,
    HASUU_SYORI_ONEBYONE: 2,

    DISCOUNT_RATE_OK_3_103_S: "3/103",
    DISCOUNT_RATE_OK_3_103_N: 3 / 103,

    TAXRATE_ZERO: 0,
    TAXRATE_EIGHT: "8",
    TAXRATE_TEN: "10",
    TAXRATE_KOMI_EIGHT: "込8",
    TAXRATE_KOMI_TEN: "込10",
    TAXRATE_EIGHTF8: "F8",

    STOREPROFILE_WARIBIKI_FLOOR: "割引率切り下げ",
    STOREPROFILE_WARIBIKI_ROUND: "割引率四捨五入",
    STOREPROFILE_WARIBIKI_CEAL: "割引率切り上げ",
    STOREPROFILE_OKSTOREWITHKAIIN: "オーケーストアwith会員カード",

};

_c.TAXRATEVALUES = [
    _c.TAXRATE_ZERO,
    _c.TAXRATE_EIGHT,
    _c.TAXRATE_TEN,
    _c.TAXRATE_KOMI_EIGHT,
    _c.TAXRATE_KOMI_TEN,
];
_c.STOREPROFILES = [
    _c.STOREPROFILE_WARIBIKI_FLOOR,
    _c.STOREPROFILE_WARIBIKI_ROUND,
    _c.STOREPROFILE_WARIBIKI_CEAL,
    _c.STOREPROFILE_OKSTOREWITHKAIIN,
];
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