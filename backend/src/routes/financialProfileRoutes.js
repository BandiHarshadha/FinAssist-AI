import express from "express";
import {
  getFinancialProfile,
  updateCustomerProfile,
  addBankAccount,
  updateBankAccount,
  addCreditCard,
  updateCreditCard,
  addLoan,
  updateLoan,
  addInvestment,
  updateInvestment,
  addInsurance,
  updateInsurance,
  getDigitalTwin,
  recalculateDigitalTwin,
} from "../controllers/financialProfileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getFinancialProfile);

router.post("/customer", protect, updateCustomerProfile);

router.post("/bank-account", protect, addBankAccount);
router.put("/bank-account/:id", protect, updateBankAccount);

router.post("/credit-card", protect, addCreditCard);
router.put("/credit-card/:id", protect, updateCreditCard);

router.post("/loan", protect, addLoan);
router.put("/loan/:id", protect, updateLoan);

router.post("/investment", protect, addInvestment);
router.put("/investment/:id", protect, updateInvestment);

router.post("/insurance", protect, addInsurance);
router.put("/insurance/:id", protect, updateInsurance);

router.get("/digital-twin", protect, getDigitalTwin);
router.post("/recalculate-digital-twin", protect, recalculateDigitalTwin);

export default router;