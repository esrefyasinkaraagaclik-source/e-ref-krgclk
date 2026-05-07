/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Basic list of forbidden keywords for adult/inappropriate content
// In a real production app, this would be much more extensive or use a dedicated API
const FORBIDDEN_WORDS = [
  "sex", "porno", "porn", "adult", "🔞", "seks", "çıplak", "naked", 
  "fuck", "shit", "sik", "amk", "pipi", "meme", "got", "göt", "yarrak",
  "dildo", "vibratör", "mastürbasyon", "prezervatif"
];

/**
 * Validates a nickname against adult content and inappropriate language.
 * @param nickname The nickname to check
 * @returns true if clean, false if inappropriate
 */
export function validateNickname(nickname: string): boolean {
  if (!nickname) return false;
  
  const normalized = nickname.toLowerCase().replace(/\s+/g, '');
  
  return !FORBIDDEN_WORDS.some(word => normalized.includes(word));
}
