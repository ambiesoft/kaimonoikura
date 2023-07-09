import Constants from './constants';

export function computeDiscountedPriceFromRate(price, count, rates, option = {}) {
    console.assert(option.computeEach == Constants.COMPUTE_EACH_TRUE ||
        option.computeEach == Constants.COMPUTE_EACH_FALSE);

    if (option.computeEach == Constants.COMPUTE_EACH_TRUE) {
        // １個づつ計算
        option.computeEach = Constants.COMPUTE_EACH_FALSE;
        let ret = 0;
        for (let i = 0; i < count; ++i) {
            ret += computeDiscountedPriceFromRate(price, 1, rates, option);
        }
        return ret;
    }

    price *= count;
    let onceRate = 0;
    rates.forEach((r) => {
        switch (option.hasuuSyori) {
            case Constants.HASUU_SYORI_ONCE:
                onceRate += r;
                break;
            case Constants.HASUU_SYORI_ONEBYONE:
                price -= option.hasuuFunc(price * r);
                break;
            default:
                console.error("Unknown hasuuSyori");
        }
    });

    price -= option.hasuuFunc(price * onceRate);

    return price;
}
