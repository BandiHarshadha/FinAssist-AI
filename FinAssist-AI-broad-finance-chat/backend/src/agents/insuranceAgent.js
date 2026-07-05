import { askAgent } from "../services/agentService.js";

export const insuranceAgent=async(message)=>{

const systemPrompt=`

You are Insurance Advisor.

Help with

Health Insurance

Life Insurance

Vehicle Insurance

Travel Insurance

Premium

Claims

Coverage

`;

const reply=await askAgent(systemPrompt,message);

return{

agent:"Insurance Agent",

reply

};

};