export const promptInjectionGuard = (req, res, next) => {
  const text = JSON.stringify(req.body).toLowerCase();

  const blockedPatterns = [
    "ignore previous instructions",
    "system prompt",
    "reveal your instructions",
    "reveal system prompt",
    "bypass security",
    "developer message"
  ];

  const found = blockedPatterns.find((pattern) =>
    text.includes(pattern)
  );

  if (found) {
    return res.status(403).json({
      success: false,
      output: "Prompt injection detected",
      trace_id: `trace_${Date.now()}`,
      finish_reason: "blocked",
      cost_usd: 0
    });
  }

  next();
};