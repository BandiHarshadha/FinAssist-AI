import express from "express";
import {
  getFinancialProfile,
  updateFinancialProfile,
  updateCustomerProfile,
  updateCreditProfile,
  addBankAccount,
  addCreditCard,
  addLoan,
  addInvestment,
  addInsurance,
} from "../controllers/financialProfileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getFinancialProfile);
router.put("/me", protect, updateFinancialProfile);
router.post("/customer", protect, updateCustomerProfile);
router.post("/credit", protect, updateCreditProfile);
router.post("/bank-account", protect, addBankAccount);
router.post("/credit-card", protect, addCreditCard);
router.post("/loan", protect, addLoan);
router.post("/investment", protect, addInvestment);
router.post("/insurance", protect, addInsurance);

export default router;