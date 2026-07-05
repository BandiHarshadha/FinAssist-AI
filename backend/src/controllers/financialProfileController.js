import User from "../models/User.js";

export const getFinancialProfile = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFinancialProfile = async (req, res) => {
  try {
    const updatedUser = User.update(req.user.id, { ...req.body });
    res.json({ success: true, message: "Financial profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCustomerProfile = async (req, res) => {
  try {
    const currentUser = User.findById(req.user.id);

    const updatedUser = User.update(req.user.id, {
      customerProfile: {
        ...(currentUser.customerProfile || {}),
        ...req.body,
      },
    });

    res.json({ success: true, customerProfile: updatedUser.customerProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCreditProfile = async (req, res) => {
  try {
    const currentUser = User.findById(req.user.id);

    const updatedUser = User.update(req.user.id, {
      creditProfile: {
        ...(currentUser.creditProfile || {}),
        ...req.body,
      },
    });

    res.json({ success: true, creditProfile: updatedUser.creditProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addBankAccount = async (req, res) => {
  try {
    const currentUser = User.findById(req.user.id);

    const newAccount = {
      id: Date.now().toString(),
      bankName: req.body.bankName || "",
      accountType: req.body.accountType || "Savings",
      branch: req.body.branch || "",
      ifsc: req.body.ifsc || "",
      maskedAccountNumber: req.body.maskedAccountNumber || "",
      currentBalance: Number(req.body.currentBalance || 0),
      availableBalance: Number(req.body.availableBalance || 0),
      interestRate: Number(req.body.interestRate || 0),
      status: req.body.status || "Active",
      createdAt: new Date().toISOString(),
    };

    const updatedUser = User.update(req.user.id, {
      bankAccounts: [...(currentUser.bankAccounts || []), newAccount],
    });

    res.json({ success: true, message: "Bank account added", bankAccounts: updatedUser.bankAccounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addCreditCard = async (req, res) => {
  try {
    const currentUser = User.findById(req.user.id);

    const newCard = {
      id: Date.now().toString(),
      cardName: req.body.cardName || "",
      bankName: req.body.bankName || "",
      cardNetwork: req.body.cardNetwork || "",
      maskedCardNumber: req.body.maskedCardNumber || "",
      creditLimit: Number(req.body.creditLimit || 0),
      usedLimit: Number(req.body.usedLimit || 0),
      availableLimit: Number(req.body.availableLimit || 0),
      outstandingAmount: Number(req.body.outstandingAmount || 0),
      dueDate: req.body.dueDate || "",
      billingCycle: req.body.billingCycle || "",
      rewardPoints: Number(req.body.rewardPoints || 0),
      annualFee: Number(req.body.annualFee || 0),
      status: req.body.status || "Active",
      createdAt: new Date().toISOString(),
    };

    const updatedUser = User.update(req.user.id, {
      creditCards: [...(currentUser.creditCards || []), newCard],
    });

    res.json({ success: true, message: "Credit card added", creditCards: updatedUser.creditCards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addLoan = async (req, res) => {
  try {
    const currentUser = User.findById(req.user.id);

    const newLoan = {
      id: Date.now().toString(),
      loanType: req.body.loanType || "",
      lenderName: req.body.lenderName || "",
      loanAmount: Number(req.body.loanAmount || 0),
      outstanding: Number(req.body.outstanding || 0),
      interestRate: Number(req.body.interestRate || 0),
      emi: Number(req.body.emi || 0),
      remainingEmis: Number(req.body.remainingEmis || 0),
      tenureMonths: Number(req.body.tenureMonths || 0),
      nextDueDate: req.body.nextDueDate || "",
      status: req.body.status || "Active",
      createdAt: new Date().toISOString(),
    };

    const allLoans = [...(currentUser.loans || []), newLoan];

    const totalEmi = allLoans
      .filter((loan) => loan.status === "Active")
      .reduce((sum, loan) => sum + Number(loan.emi || 0), 0);

    const updatedUser = User.update(req.user.id, {
      loans: allLoans,
      emi: totalEmi,
    });

    res.json({ success: true, message: "Loan added", loans: updatedUser.loans, totalEmi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addInvestment = async (req, res) => {
  try {
    const currentUser = User.findById(req.user.id);

    const newInvestment = {
      id: Date.now().toString(),
      investmentType: req.body.investmentType || "",
      investmentName: req.body.investmentName || "",
      investedAmount: Number(req.body.investedAmount || 0),
      currentValue: Number(req.body.currentValue || 0),
      monthlyContribution: Number(req.body.monthlyContribution || 0),
      annualReturn: Number(req.body.annualReturn || 0),
      status: req.body.status || "Active",
      createdAt: new Date().toISOString(),
    };

    const updatedUser = User.update(req.user.id, {
      investments: [...(currentUser.investments || []), newInvestment],
    });

    res.json({ success: true, message: "Investment added", investments: updatedUser.investments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addInsurance = async (req, res) => {
  try {
    const currentUser = User.findById(req.user.id);

    const newInsurance = {
      id: Date.now().toString(),
      insuranceType: req.body.insuranceType || "",
      insurer: req.body.insurer || "",
      policyNumber: req.body.policyNumber || "",
      coverageAmount: Number(req.body.coverageAmount || 0),
      premium: Number(req.body.premium || 0),
      renewalDate: req.body.renewalDate || "",
      status: req.body.status || "Active",
      createdAt: new Date().toISOString(),
    };

    const updatedUser = User.update(req.user.id, {
      insurance: [...(currentUser.insurance || []), newInsurance],
    });

    res.json({ success: true, message: "Insurance added", insurance: updatedUser.insurance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};