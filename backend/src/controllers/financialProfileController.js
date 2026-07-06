import User from "../models/User.js";
import { calculateDigitalTwin } from "../tools/digitalTwinCalculator.js";

const recalculateAndSaveDigitalTwin = (userId) => {
  const user = User.findById(userId);
  const digitalTwin = calculateDigitalTwin(user);

  User.update(userId, {
    financialDigitalTwin: digitalTwin,
    savings: digitalTwin.monthlySavings,
    emi: digitalTwin.totalEmi,
  });

  return digitalTwin;
};

const addItem = (req, res, key, item, message) => {
  const currentUser = User.findById(req.user.id);

  const updatedUser = User.update(req.user.id, {
    [key]: [...(currentUser[key] || []), item],
  });

  const digitalTwin = recalculateAndSaveDigitalTwin(req.user.id);

  res.json({
    success: true,
    message,
    [key]: updatedUser[key],
    digitalTwin,
  });
};

const updateItem = (req, res, key, message) => {
  const currentUser = User.findById(req.user.id);

  const updatedList = (currentUser[key] || []).map((item) =>
    item.id === req.params.id
      ? {
          ...item,
          ...req.body,
          updatedAt: new Date().toISOString(),
        }
      : item
  );

  const updatedUser = User.update(req.user.id, {
    [key]: updatedList,
  });

  const digitalTwin = recalculateAndSaveDigitalTwin(req.user.id);

  res.json({
    success: true,
    message,
    [key]: updatedUser[key],
    digitalTwin,
  });
};

export const getFinancialProfile = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    res.json({ success: true, data: user });
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
      monthlyIncome: Number(req.body.monthlyIncome || currentUser.monthlyIncome || 0),
      annualIncome: Number(req.body.annualIncome || currentUser.annualIncome || 0),
      monthlyExpenses: Number(req.body.monthlyExpenses || currentUser.monthlyExpenses || 0),
    });

    const digitalTwin = recalculateAndSaveDigitalTwin(req.user.id);

    res.json({
      success: true,
      message: "Customer profile saved",
      customerProfile: updatedUser.customerProfile,
      digitalTwin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addBankAccount = async (req, res) => {
  try {
    addItem(
      req,
      res,
      "bankAccounts",
      {
        id: Date.now().toString(),
        ...req.body,
        currentBalance: Number(req.body.currentBalance || 0),
        availableBalance: Number(req.body.availableBalance || 0),
        interestRate: Number(req.body.interestRate || 0),
        status: req.body.status || "Active",
        createdAt: new Date().toISOString(),
      },
      "Bank account added"
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBankAccount = async (req, res) => {
  try {
    updateItem(req, res, "bankAccounts", "Bank account updated");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addCreditCard = async (req, res) => {
  try {
    addItem(
      req,
      res,
      "creditCards",
      {
        id: Date.now().toString(),
        ...req.body,
        creditLimit: Number(req.body.creditLimit || 0),
        usedLimit: Number(req.body.usedLimit || 0),
        availableLimit: Number(req.body.availableLimit || 0),
        outstandingAmount: Number(req.body.outstandingAmount || 0),
        rewardPoints: Number(req.body.rewardPoints || 0),
        annualFee: Number(req.body.annualFee || 0),
        status: req.body.status || "Active",
        createdAt: new Date().toISOString(),
      },
      "Credit card added"
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCreditCard = async (req, res) => {
  try {
    updateItem(req, res, "creditCards", "Credit card updated");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addLoan = async (req, res) => {
  try {
    addItem(
      req,
      res,
      "loans",
      {
        id: Date.now().toString(),
        ...req.body,
        loanAmount: Number(req.body.loanAmount || 0),
        outstanding: Number(req.body.outstanding || 0),
        interestRate: Number(req.body.interestRate || 0),
        emi: Number(req.body.emi || 0),
        remainingEmis: Number(req.body.remainingEmis || 0),
        tenureMonths: Number(req.body.tenureMonths || 0),
        status: req.body.status || "Active",
        createdAt: new Date().toISOString(),
      },
      "Loan added"
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLoan = async (req, res) => {
  try {
    updateItem(req, res, "loans", "Loan updated");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addInvestment = async (req, res) => {
  try {
    addItem(
      req,
      res,
      "investments",
      {
        id: Date.now().toString(),
        ...req.body,
        investedAmount: Number(req.body.investedAmount || 0),
        currentValue: Number(req.body.currentValue || 0),
        monthlyContribution: Number(req.body.monthlyContribution || 0),
        annualReturn: Number(req.body.annualReturn || 0),
        status: req.body.status || "Active",
        createdAt: new Date().toISOString(),
      },
      "Investment added"
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInvestment = async (req, res) => {
  try {
    updateItem(req, res, "investments", "Investment updated");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addInsurance = async (req, res) => {
  try {
    addItem(
      req,
      res,
      "insurance",
      {
        id: Date.now().toString(),
        ...req.body,
        coverageAmount: Number(req.body.coverageAmount || 0),
        premium: Number(req.body.premium || 0),
        status: req.body.status || "Active",
        createdAt: new Date().toISOString(),
      },
      "Insurance added"
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInsurance = async (req, res) => {
  try {
    updateItem(req, res, "insurance", "Insurance updated");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDigitalTwin = async (req, res) => {
  try {
    const digitalTwin = recalculateAndSaveDigitalTwin(req.user.id);

    res.json({
      success: true,
      data: digitalTwin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const recalculateDigitalTwin = async (req, res) => {
  try {
    const digitalTwin = recalculateAndSaveDigitalTwin(req.user.id);

    res.json({
      success: true,
      message: "Digital Twin recalculated successfully",
      data: digitalTwin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};