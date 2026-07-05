import {
  PiggyBank,
  CreditCard,
  Home,
  Car,
  TrendingUp,
  Landmark,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

export const bankingCategories = [
  {
    title: "Savings",
    description: "Manage savings accounts and deposits.",
    icon: PiggyBank,
    path: "/services/savings",
  },
  {
    title: "Credit Cards",
    description: "Card offers, rewards and billing.",
    icon: CreditCard,
    path: "/services/credit-cards",
  },
  {
    title: "Home Loans",
    description: "EMI, eligibility and home financing.",
    icon: Home,
    path: "/services/home-loans",
  },
  {
    title: "Vehicle Loans",
    description: "Finance your dream vehicle.",
    icon: Car,
    path: "/services/vehicle-loans",
  },
  {
    title: "Investments",
    description: "Grow your wealth wisely.",
    icon: TrendingUp,
    path: "/services/investments",
  },
  {
    title: "Fixed Deposits",
    description: "Safe and secure investment plans.",
    icon: Landmark,
    path: "/services/fixed-deposits",
  },
  {
    title: "Insurance",
    description: "Protect what matters most.",
    icon: ShieldCheck,
    path: "/services/insurance",
  },
  {
    title: "Financial Planning",
    description: "Plan your future confidently.",
    icon: CalendarCheck,
    path: "/services/financial-planning",
  },
];