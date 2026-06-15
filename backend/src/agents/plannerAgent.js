export const plannerAgent=async(userMessage,agentResult)=>{

return{

agent:"Planner Agent",

reply:`

📋 Financial Plan

User Goal:

${userMessage}

--------------------------------

AI Recommendation

${agentResult.reply}

--------------------------------

Suggested Next Steps

✅ Compare available options

✅ Check eligibility

✅ Prepare required documents

✅ Use financial calculator

✅ Contact financial advisor if required

`

};

};