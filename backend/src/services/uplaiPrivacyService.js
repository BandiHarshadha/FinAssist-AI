const SENSITIVE_PATTERNS = [
  {
    type: "PAN",
    regex: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/g,
  },
  {
    type: "AADHAAR",
    regex: /\b\d{4}\s?\d{4}\s?\d{4}\b/g,
  },
  {
    type: "CARD_NUMBER",
    regex: /\b(?:\d[ -]*?){13,16}\b/g,
  },
  {
    type: "CVV",
    regex: /\b\d{3,4}\b/g,
  },
  {
    type: "PHONE",
    regex: /\b[6-9]\d{9}\b/g,
  },
  {
    type: "EMAIL",
    regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  },
];

export async function scanWithUPLAI(message) {
  try {
    const response = await fetch("http://localhost:3000/api/v3/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });

    const data = await response.json();

    const findings = data?.findings || data?.results || [];

    if (findings.length > 0) {
      return {
        hasSensitiveData: true,
        source: "UPLAI",
        findings,
        redactedText: redactText(message),
      };
    }

    return {
      hasSensitiveData: false,
      source: "UPLAI",
      findings: [],
      redactedText: message,
    };
  } catch (error) {
    return scanWithLocalFallback(message);
  }
}

export function scanWithLocalFallback(message) {
  let findings = [];

  for (const item of SENSITIVE_PATTERNS) {
    const matches = message.match(item.regex);

    if (matches?.length) {
      findings.push({
        type: item.type,
        matches,
      });
    }
  }

  return {
    hasSensitiveData: findings.length > 0,
    source: "LOCAL_PRIVACY_FALLBACK",
    findings,
    redactedText: redactText(message),
  };
}

export function redactText(message) {
  let redacted = message;

  for (const item of SENSITIVE_PATTERNS) {
    redacted = redacted.replace(item.regex, "XXXXX");
  }

  return redacted;
}