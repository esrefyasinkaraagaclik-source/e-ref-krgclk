



const FORBIDDEN_WORDS = [
  "sex", "porno", "porn", "adult", "🔞", "seks", "çıplak", "naked", 
  "fuck", "shit", "sik", "amk", "pipi", "meme", "got", "göt", "yarrak",
  "dildo", "vibratör", "mastürbasyon", "prezervatif"
];


export function validateNickname(nickname: string): boolean {
  if (!nickname) return false;
  
  const normalized = nickname.toLowerCase().replace(/\s+/g, '');
  
  return !FORBIDDEN_WORDS.some(word => normalized.includes(word));
}
