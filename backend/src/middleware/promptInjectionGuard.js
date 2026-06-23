export const promptInjectionGuard = (req, res, next) => {
  const message = req.body?.message;

  if (!message || typeof message !== "string") {
    return next();
  }

  const lowerMessage = message.toLowerCase();

  const blockedPatterns = [
    "ignore previous instructions",
    "forget all instructions",
    "system prompt",
    "developer message",
    "jailbreak"
  ];

  const isBlocked = blockedPatterns.some((pattern) =>
    lowerMessage.includes(pattern)
  );

  if (isBlocked) {
    return res.status(400).json({
      success: false,
      message: "Prompt injection attempt detected"
    });
  }

  next();
};