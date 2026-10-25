export interface SecretSpot {
  id: string;
  name: string;
  section: string;
  clue: string;
  elementId: string;
}

export const SECRET_SPOTS: SecretSpot[] = [
  {
    id: 'hero-badge',
    name: "Avik's Explorer Badge",
    section: "Welcome Hero",
    clue: "🔍 Clue: Search right by Avik's Official Portal badge near the top of the page!",
    elementId: 'hero'
  },
  {
    id: 'passport-seal',
    name: "Passport Photo Stamp",
    section: "About Me",
    clue: "🔍 Clue: Look closely at Avik's Explorer Passport photo ID in the About section!",
    elementId: 'about'
  },
  {
    id: 'math-chalkboard',
    name: "Math Speed Arena",
    section: "Math & EVS",
    clue: "🔍 Clue: Peek around the Math Mania challenge cards in the Math & EVS Lab!",
    elementId: 'subjects'
  },
  {
    id: 'lego-brick',
    name: "LEGO Secret Trapdoor",
    section: "Hobbies & Activities",
    clue: "🔍 Clue: Check the LEGO Master Builder card in the Hobbies section!",
    elementId: 'hobbies'
  },
  {
    id: 'treehouse-pin',
    name: "Society Treehouse HQ",
    section: "Neighborhood Map",
    clue: "🔍 Clue: Explore the Sunlight Meadows society map around the secret Treehouse pin!",
    elementId: 'neighborhood'
  }
];

// Simple event-based listener for triggering the 1-second flash from anywhere
type FlashListener = () => void;
const listeners: Set<FlashListener> = new Set();

export const subscribeToCodeFlash = (listener: FlashListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const triggerGlobalCodeFlash = () => {
  listeners.forEach(fn => fn());
};
