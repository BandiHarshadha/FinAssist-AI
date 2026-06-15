export const loanEligibility = (
    salary,
    obligations = 0
) => {

    const eligibleEMI = salary * 0.45 - obligations;

    return {

        salary,

        eligibleEMI,

        estimatedLoan:

            eligibleEMI * 100

    };

};