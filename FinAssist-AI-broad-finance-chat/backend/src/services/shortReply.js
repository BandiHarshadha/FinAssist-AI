export function shortReply(text, maxWords = 55) {
  if (!text) return "I understood. Please share more details.";

  let clean = text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = clean.split(" ");

  if (words.length > maxWords) {
    clean = words.slice(0, maxWords).join(" ") + "...";
  }

  return clean;
}