const pendingPrivacyMessages = new Map();

export function savePendingPrivacyMessage(id, payload) {
  pendingPrivacyMessages.set(id, {
    ...payload,
    createdAt: new Date().toISOString(),
  });
}

export function getPendingPrivacyMessage(id) {
  return pendingPrivacyMessages.get(id);
}

export function deletePendingPrivacyMessage(id) {
  pendingPrivacyMessages.delete(id);
}