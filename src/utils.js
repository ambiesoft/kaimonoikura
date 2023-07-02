import Constants from './constants';

export function computeDiscountedPriceFromRate(price, count, rates, option = {}) {
    if (option.computeEach) {
        option.computeEach = false;
        let ret = 0;
        for (let i = 0; i < count; ++i) {
            ret += computeDiscountedPriceFromRate(price, 1, rates, option);
        }
        return ret;
    } else {
        price *= count;
    }

    let lastRates = [];
    rates.forEach((r) => {
        switch (option.hasuuSyori) {
            case Constants.HASUU_SYORI_ONCE:
                lastRates.push(r);
                break;
            case Constants.HASUU_SYORI_ONEBYONE:
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
