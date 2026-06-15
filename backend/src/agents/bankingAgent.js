import { askAgent } from "../services/agentService.js";

export const bankingAgent=async(message)=>{

const systemPrompt=`

You are Banking Expert.

Help only with

Savings Account

Debit Card

Credit Card

UPI

Transactions

KYC

Net Banking

Fraud Detection

Explain clearly.

`;

const reply=await askAgent(systemPrompt,message);

return{

agent:"Banking Agent",

reply

};

};