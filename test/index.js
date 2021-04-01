const expect = require('chai').expect
const mortgageCalculator = require("../src/index");

function runScenario(input, expected) {
    const output = mortgageCalculator(input);

    if ( expected.errorMessage ) {
        expect(output.errorMessage).to.equal(expected.errorMessage);
        expect(output.monthlyPayments).to.equal(null);
        expect(output.interestOnlyMonthlyPayments).to.equal(null);
        return;
    } 

    expect(output.errorMessage).to.be.undefined;
    expect(output.monthlyPayments).to.equal(expected.monthlyPayments);
    expect(Number.isInteger(output.monthlyPayments)).to.be.true;
    expect(output.interestOnlyMonthlyPayments).to.equal(expected.interestOnlyMonthlyPayments);
    expect(Number.isInteger(output.interestOnlyMonthlyPayments)).to.be.true;

}


describe("Mortgage calculator", () => {
    it("Calculates mortgage from good inputs", () => { 
        const inputs = {
            durationYears: 25,
            annualInterestRate: 0.05,
            depositAmount: 10_000,
            totalMortgage: 250_000
        }

        const expectations = {
            errorMessage: null,
            monthlyPayments: 1403,
            interestOnlyMonthlyPayments: 1000,
        }
        runScenario(inputs, expectations);
    });

    it("Error if principal is 0 or less", () => { 
        const inputs = {
            durationYears: 25,
            annualInterestRate: 0.05,
            depositAmount: 250_000,
            totalMortgage: 250_000
        }

        const expectations = {
            errorMessage: "The value of the loan must be positive",
            monthlyPayments: null,
            interestOnlyMonthlyPayments: null,
        }
        runScenario(inputs, expectations);
    });

    it("Error if interest rate is 0 or less", () => { 
        const inputs = {
            durationYears: 25,
            annualInterestRate: 0,
            depositAmount: 10_000,
            totalMortgage: 250_000
        }

        const expectations = {
            errorMessage: "The interest rate must be positive",
            monthlyPayments: null,
            interestOnlyMonthlyPayments: null,
        }
        runScenario(inputs, expectations);
    });

    it("Error if duration is 0 or less", () => { 
        const inputs = {
            durationYears: 0,
            annualInterestRate: 0.05,
            depositAmount: 10_000,
            totalMortgage: 250_000
        }

        const expectations = {
            errorMessage: "The duration must be positive",
            monthlyPayments: null,
            interestOnlyMonthlyPayments: null,
        }
        runScenario(inputs, expectations);
    });
})