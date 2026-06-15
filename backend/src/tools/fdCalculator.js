export const fdCalculator = (
    amount,
    rate,
    years
) => {

    const maturity =
        amount *
        Math.pow(
            1 + rate / 100,
            years
        );

    return {

        maturity:

            maturity.toFixed(2)

    };

};