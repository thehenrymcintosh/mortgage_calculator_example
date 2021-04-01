function normalise(amount) {
    return Math.round(amount);
}

class MortgageRepaymentCalculator {
    constructor(input) {
        this.durationYears = input.durationYears;
        this.annualInterestRate = input.annualInterestRate;
        this.depositAmount = input.depositAmount;
        this.totalMortgage = input.totalMortgage;
        this.calculateDerivedInputs();
    }

    calculate() {
        const error = this.checkForInputErrors();
        if (error) return this.formatError(error);
        return {
            monthlyPayments: this.calculateMonthlyPayments(),
            interestOnlyMonthlyPayments: this.calculateInterestOnlyMonthlyPayments(),
        }
    }

    // private 
    calculateDerivedInputs() {
        this.principal = this.totalMortgage - this.depositAmount;
        this.monthlyInterestRate = this.annualInterestRate / 12;
        this.durationMonths = this.durationYears * 12;
    }

    calculateMonthlyPayments() {
        const { monthlyInterestRate, durationMonths, principal } = this;
        const compoundedInterestRate = Math.pow( (monthlyInterestRate + 1), durationMonths);
        const monthlyPayments = principal * monthlyInterestRate * compoundedInterestRate / ( compoundedInterestRate - 1);
        return normalise(monthlyPayments);
    }


    calculateInterestOnlyMonthlyPayments() {
        const interestOnlyMonthlyPayments = this.principal * this.monthlyInterestRate;
        return normalise(interestOnlyMonthlyPayments);
    }

    checkForInputErrors() {
        if (this.principal <= 0) return "The value of the loan must be positive";
        if (this.monthlyInterestRate <= 0) return "The interest rate must be positive";
        if (this.durationMonths <= 0) return "The duration must be positive";
    }

    formatError(errorMessage) {
        return {
            errorMessage,
            monthlyPayments: null,
            interestOnlyMonthlyPayments: null,
        }
    }
}

function mortgageCalculator(input) {
    const MortgageRepayments = new MortgageRepaymentCalculator(input);
    return MortgageRepayments.calculate();
}

module.exports = mortgageCalculator;