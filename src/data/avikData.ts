import { ToyItem, MathQuestion, MathRiddle, EVSFact, Hobby, SocietySpot, GuestbookEntry } from '../types';

export const AVIK_PROFILE = {
  name: 'Avik',
  age: 8,
  grade: '3rd Grade',
  title: "3rd Grade Adventurer & Explorer 🚀",
  location: 'Sunlight Meadows Society',
  superpower: "Asking 'Why?' & Building Mega LEGO Spaceships 🛸",
  favoriteSnack: 'Cheesy Nachos & Mango Kulfi 🧀🥭',
  motto: 'Always be curious, ride fast, and never stop building!',
  stats: [
    { label: 'Curiosity Level', value: '10,000+', icon: 'Sparkles', color: 'from-amber-400 to-orange-500' },
    { label: 'LEGO Bricks Assembled', value: '4,850+', icon: 'Layers', color: 'from-blue-500 to-indigo-600' },
    { label: 'Hot Wheels Speed Score', value: '99 MPH', icon: 'Flame', color: 'from-red-500 to-pink-600' },
    { label: 'Math Streak Record', value: '18 Days', icon: 'Award', color: 'from-emerald-400 to-teal-600' },
  ],
  funFacts: [
    'Can solve a 3x3 Rubik\'s Cube in under 2 minutes!',
    'Knows the names of all 8 planets plus 5 dwarf planets in order!',
    'Has organized a neighborhood Hot Wheels Grand Prix 4 times.',
    'Favorite school subject is Math because numbers feel like secret spy codes.',
    'Helps water 14 flower pots in the balcony every single morning.'
  ]
};

export const MATH_QUESTIONS: MathQuestion[] = [
  {
    id: 1,
    question: 'Avik has 4 Hot Wheels racing tracks. If each track holds 6 race cars, how many total cars can race at once?',
    options: ['18 cars', '24 cars', '20 cars', '28 cars'],
    correctAnswer: 1,
    explanation: '4 tracks × 6 cars each = 24 total cars! 🏎️💨',
    category: 'arithmetic',
    difficulty: 'Rookie'
  },
  {
    id: 2,
    question: 'Which 3D shape has 6 square faces, 8 vertices (corners), and 12 equal edges?',
    options: ['Cylinder', 'Sphere', 'Cube', 'Pyramid'],
    correctAnswer: 2,
    explanation: 'A Cube has 6 square flat faces and equal sides, just like a LEGO brick or a playing die! 🎲',
    category: 'shapes',
    difficulty: 'Explorer'
  },
  {
    id: 3,
    question: 'Avik started cycling around the society track at 4:15 PM and rode for 45 minutes. What time did he finish?',
    options: ['4:45 PM', '5:00 PM', '5:15 PM', '5:30 PM'],
    correctAnswer: 1,
    explanation: '4:15 PM + 45 minutes = exactly 5:00 PM! Time for evening snacks! ⏰',
    category: 'word-problem',
    difficulty: 'Explorer'
  },
  {
    id: 4,
    question: 'Spot the pattern rule: 3, 7, 11, 15, 19, ___. What comes next?',
    options: ['21', '22', '23', '25'],
    correctAnswer: 2,
    explanation: 'We add 4 each time (+4)! 19 + 4 = 23! You are a master pattern detective! 🔍',
    category: 'patterns',
    difficulty: 'Master Whiz'
  },
  {
    id: 5,
    question: 'If 1 LEGO spaceship needs 8 blue bricks and 5 yellow bricks, how many bricks does Avik need for 3 spaceships?',
    options: ['35 bricks', '39 bricks', '42 bricks', '26 bricks'],
    correctAnswer: 1,
    explanation: '1 spaceship = 8 + 5 = 13 bricks. For 3 spaceships: 13 × 3 = 39 bricks! 🚀',
    category: 'arithmetic',
    difficulty: 'Master Whiz'
  },
  {
    id: 6,
    question: 'What is the perimeter of a rectangular play mat that is 5 meters long and 3 meters wide?',
    options: ['15 meters', '16 meters', '8 meters', '18 meters'],
    correctAnswer: 1,
    explanation: 'Perimeter = 5 + 3 + 5 + 3 = 16 meters around the edge! 📏',
    category: 'shapes',
    difficulty: 'Master Whiz'
  }
];

export const MATH_RIDDLES: MathRiddle[] = [
  {
    id: 'riddle-1',
    title: 'The Odd Number Mystery',
    riddle: 'I am an odd number. Take away one letter and I become even! What number am I?',
    hint: 'Think about how the number is spelled in English!',
    answer: 'SEVEN! (Remove the letter "S" and it becomes "EVEN"!) 😄',
    category: 'Spelling & Math'
  },
  {
    id: 'riddle-2',
    title: 'The Heavy Feather Challenge',
    riddle: 'What is heavier: A kilogram of LEGO bricks or a kilogram of bird feathers?',
    hint: 'Look closely at the unit of weight!',
    answer: 'They weigh the EXACT same — both are 1 kilogram! (Though the LEGO bricks hurt more if you step on them!) 🧱',
    category: 'Logic & Weights'
  },
  {
    id: 'riddle-3',
    title: 'The Pizza Slices Dilemma',
    riddle: 'Avik cuts a round pizza with 3 straight cuts across. What is the maximum number of pieces he can make?',
    hint: 'You can overlap the lines so they cut existing pieces into smaller ones!',
    answer: '7 pieces! (1 cut = 2, 2 cuts = 4, 3 cuts = 7 pieces!) 🍕',
    category: 'Geometry Puzzle'
  },
  {
    id: 'riddle-4',
    title: 'The Time Traveler Clock',
    riddle: 'If you have a 3-minute hourglass and a 7-minute hourglass, how can you measure exactly 4 minutes?',
    hint: 'Start both at the exact same moment!',
    answer: 'Flip both hourglasses together. When the 3-minute glass runs out, start timing! The remaining sand in the 7-minute glass is exactly 4 minutes! ⏳',
    category: 'Time Detective'
  }
];

export const EVS_FACTS: EVSFact[] = [
  {
    id: 'evs-1',
    title: 'Solar System Super-Giant: Jupiter',
    category: 'space',
    iconName: 'Orbit',
    summary: 'Jupiter is so huge that more than 1,300 Earths could fit inside it!',
    coolFact: 'Jupiter has 95 known moons and a famous storm called the Great Red Spot that has been spinning for over 300 years!',
    avikNotes: 'My dream is to view Europa (Jupiter\'s icy moon) through a giant space observatory telescope!',
    badge: 'Space Explorer 🪐',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'evs-2',
    title: 'Cheetah: The Lightning Runner',
    category: 'animals',
    iconName: 'Zap',
    summary: 'The fastest land animal on Earth, sprinting from 0 to 60 MPH in just 3 seconds!',
    coolFact: 'Cheetahs use their long bushy tails like a boat rudder to make sharp, high-speed turns while chasing dinner.',
    avikNotes: 'I try to run like a cheetah during evening tag games with my friends on the grass turf!',
    badge: 'Speed King 🐆',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'evs-3',
    title: 'Photosynthesis: Plant Food Factory',
    category: 'plants',
    iconName: 'Leaf',
    summary: 'Plants make their own food using sunlight, water, and air, while producing fresh oxygen for us to breathe!',
    coolFact: 'A single mature leafy tree can provide a full day\'s supply of oxygen for up to 4 human beings.',
    avikNotes: 'I planted a sunflower seed in our balcony pot — it grew 4 feet tall and followed the sun all day long!',
    badge: 'Green Thumb 🌱',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'evs-4',
    title: 'Earth Hero: Water Conservation',
    category: 'planet-hero',
    iconName: 'Droplets',
    summary: 'Turning off the tap while brushing saves up to 8 liters of clean water every time!',
    coolFact: 'Only 3% of all the water on Planet Earth is fresh water that animals and humans can drink.',
    avikNotes: 'My family has a rainwater harvesting system in our society that waters all the gardens!',
    badge: 'Eco Guardian 💧',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'evs-5',
    title: 'Chameleons: Master Color Shifters',
    category: 'animals',
    iconName: 'Eye',
    summary: 'Chameleons change colors not just for camouflage, but to communicate emotions and control body temperature!',
    coolFact: 'Their eyes can move independently in two different directions at the same time to spot insects 360° around.',
    avikNotes: 'I drew a chameleon in art class with rainbow scales and glowing neon spots!',
    badge: 'Wild Wonders 🦎',
    color: 'from-lime-500 to-emerald-600'
  },
  {
    id: 'evs-6',
    title: 'Moon Phases & Ocean Tides',
    category: 'space',
    iconName: 'Moon',
    summary: 'The gravitational pull of the Moon creates high and low tides in oceans across our planet!',
    coolFact: 'Footprints left by astronauts on the Moon will stay there for at least 100 million years because there is no wind or rain.',
    avikNotes: 'I love looking at the crescent moon through my mini binoculars from my bedroom window.',
    badge: 'Lunar Pilot 🌙',
    color: 'from-blue-600 to-slate-800'
  }
];

export const HOBBIES: Hobby[] = [
  {
    id: 'cycling',
    title: 'Turbo Cycling',
    icon: 'Bike',
    tagline: 'Speed demon on two wheels around the society track',
    description: 'Riding my neon blue mountain bike every evening with the neighborhood bike crew. Best at zooming down slopes and testing brake skid marks!',
    skillLevel: 'Expert Track Racer 🏁',
    favoriteGear: 'Neon Blue Helmet & LED Wheel Spoke Lights',
    funStat: '14 Society Laps in 20 Minutes',
    bgGradient: 'from-blue-500 to-cyan-500',
    accentColor: 'bg-blue-600 text-white',
    badges: ['Speed King', 'Trail Blazer', 'Night Rider']
  },
  {
    id: 'lego',
    title: 'LEGO Master Building',
    icon: 'Blocks',
    tagline: 'Architect of futuristic starships & medieval fortresses',
    description: 'Spending weekend mornings sorting thousands of colorful bricks, designing secret escape trapdoors, and engineering gear-powered crane lifts.',
    skillLevel: 'Master Builder Tier 🧱',
    favoriteGear: 'Brick Separator Tool & 48x48 Green Baseplate',
    funStat: 'Built a 3-Foot Tall Rocket in 1 Day',
    bgGradient: 'from-red-500 to-amber-500',
    accentColor: 'bg-red-600 text-white',
    badges: ['Architect', 'Precision Snapper', 'Custom Creator']
  },
  {
    id: 'gaming',
    title: 'Gaming & Minecraft',
    icon: 'Gamepad2',
    tagline: 'Survival mode fortress builder & Mario Kart racer',
    description: 'Constructing redstone-automated farm machines in Minecraft and mastering drift boosts on Rainbow Road in Mario Kart with cousins.',
    skillLevel: 'Redstone Engineer 🎮',
    favoriteGear: 'Wireless Controller & Diamond Pickaxe Plush',
    funStat: 'Zero Deaths Nether Fortress Run',
    bgGradient: 'from-purple-500 to-pink-500',
    accentColor: 'bg-purple-600 text-white',
    badges: ['Redstone Whiz', 'Kart Drift Master', 'Boss Slayer']
  },
  {
    id: 'football',
    title: 'Outdoor Football & Tag',
    icon: 'Trophy',
    tagline: 'Midfield playmaker and unstoppable goal-scorer',
    description: 'Evening 5v5 football matches on the society green turf. Love striking curving free-kicks and playing intense games of Freeze Tag.',
    skillLevel: 'Turf Captain ⚽',
    favoriteGear: 'Fluorescent Yellow Cleats & Captain Armband',
    funStat: 'Hat-trick in Last Weekend\'s Cup',
    bgGradient: 'from-emerald-500 to-teal-500',
    accentColor: 'bg-emerald-600 text-white',
    badges: ['Golden Boot', 'Fast Sprinter', 'Team Captain']
  },
  {
    id: 'drawing',
    title: 'Comic & Hero Drawing',
    icon: 'Palette',
    tagline: 'Creator of the original "Robo-Pug" superhero universe',
    description: 'Sketching colorful comic strips featuring Robo-Pug and Professor Whiskers. Love experimenting with dual-tip alcohol brush markers.',
    skillLevel: 'Comic Creator 🎨',
    favoriteGear: '48-Color Dual Marker Set & Hardbound Sketchbook',
    funStat: '12 Full Comic Chapters Completed',
    bgGradient: 'from-orange-500 to-rose-500',
    accentColor: 'bg-orange-600 text-white',
    badges: ['Visual Storyteller', 'Marker Maestro', 'Character Designer']
  },
  {
    id: 'reading',
    title: 'Adventure Bookworm',
    icon: 'BookOpen',
    tagline: 'Devouring mystery quests, space sci-fi & mythologies',
    description: 'Reading chapter books under my blanket with a flashlight. Favorite series: Geronimo Stilton, Roald Dahl, and Percy Jackson!',
    skillLevel: 'Book Wizard 📚',
    favoriteGear: 'Glow-in-the-Dark Bookmark & Clip Reading Light',
    funStat: '24 Chapter Books Finished This Year',
    bgGradient: 'from-indigo-500 to-blue-600',
    accentColor: 'bg-indigo-600 text-white',
    badges: ['Fast Reader', 'Mystery Solver', 'Vocabulary Champ']
  }
];

export const TOY_ITEMS: ToyItem[] = [
  {
    id: 'hw-track-ripper',
    name: 'Hot Wheels "Track Ripper" GT',
    category: 'hotwheels',
    categoryLabel: 'Hot Wheels',
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=600&auto=format&fit=crop&q=80',
    badge: 'Speed Champ 🏎️',
    rating: 5,
    stats: { label1: 'Top Track Speed', val1: '100 / 100', label2: 'Loop Stability', val2: '98%' },
    description: 'High-downforce aero racer with dual chrome exhaust pipes and ultra-low friction axles for loop-the-loop stunts.',
    story: 'Won 1st place in the 2025 Summer Society Track Showdown after doing 3 consecutive double loops without crashing!',
    favoriteFeature: 'Aerodynamic spoiler and metallic neon paint that glows under ultraviolet light.',
    color: 'from-red-500 to-amber-500'
  },
  {
    id: 'hw-twin-mill',
    name: 'Hot Wheels Legendary "Twin Mill"',
    category: 'hotwheels',
    categoryLabel: 'Hot Wheels',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80',
    badge: 'Iconic Classic 🔥',
    rating: 5,
    stats: { label1: 'Twin Superchargers', val1: '1,400 HP', label2: 'Weight Balance', val2: 'Die-cast Heavy' },
    description: 'The legendary Hot Wheels twin-engine monster car featuring exposed blowers and sleek retro green bodywork.',
    story: 'Gifted by uncle on Avik\'s 7th birthday — has the heaviest metal base, making it unbeatable on steep downhill ramps.',
    favoriteFeature: 'Dual supercharger intake scoops on both sides of the cockpit.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'hw-night-shifter',
    name: 'Hot Wheels "Night Shifter" Racer',
    category: 'hotwheels',
    categoryLabel: 'Hot Wheels',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80',
    badge: 'Night Stunt 🌙',
    rating: 4.8,
    stats: { label1: 'Drift Radius', val1: 'Tight Angle', label2: 'Ramp Jump', val2: '1.2 Meters' },
    description: 'A tuned drift coupe with aerodynamic diffusers and red spoke wheels designed for asphalt track launches.',
    story: 'Custom tuned with micro graphite lube to glide across the living room wooden floor like ice.',
    favoriteFeature: 'High-rise race spoiler and twin turbo intercooler grille.',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'lego-space-shuttle',
    name: 'LEGO Deep Space Shuttle & Rocket Lab',
    category: 'lego',
    categoryLabel: 'LEGO Builds',
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80',
    badge: '1,420 Bricks 🚀',
    rating: 5,
    stats: { label1: 'Total Brick Count', val1: '1,420 pcs', label2: 'Build Time', val2: '6.5 Hours' },
    description: 'Authentic space research orbiter featuring opening payload bay doors, robotic satellite arm, and staging thrusters.',
    story: 'Built over an entire rainy Sunday with mom supplying hot chocolate and dad helping sort the white hull plates.',
    favoriteFeature: 'Deployable Canadarm robotic arm that can grab and release mini communication satellites.',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'lego-pirate-fortress',
    name: 'LEGO Skull Island Pirate Fortress',
    category: 'lego',
    categoryLabel: 'LEGO Builds',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    badge: 'Hidden Traps 🏴‍☠️',
    rating: 4.9,
    stats: { label1: 'Cannons Fired', val1: '4 Working Spring', label2: 'Secret Rooms', val2: '3 Trapdoors' },
    description: 'A swashbuckling island stronghold with a crane for unloading treasure chests and a working skull jail cell.',
    story: 'Avik modified this set with his own custom red laser defense grid to protect the pirate gold from rival ships!',
    favoriteFeature: 'A lever behind the waterfall that drops skeleton guards directly into the moat.',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'lego-city-police',
    name: 'LEGO City High-Speed Pursuit Cruiser',
    category: 'lego',
    categoryLabel: 'LEGO Builds',
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=600&auto=format&fit=crop&q=80',
    badge: 'Custom Modded 🚔',
    rating: 4.7,
    stats: { label1: 'Mini-figs Included', val1: '4 Officers + K9', label2: 'Working Sirens', val2: 'Translucent Neon' },
    description: 'Armored all-terrain pursuit vehicle with roof spotlight and mobile command radar dish.',
    story: 'Avik added twin rocket boosters to the back so it can catch escaping alien bank robbers!',
    favoriteFeature: 'K-9 police dog passenger seat and deployable spike strip trap.',
    color: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'hero-iron-man',
    name: 'Marvel Avengers Iron Man Mark 85',
    category: 'superhero',
    categoryLabel: 'Superheroes',
    image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=600&auto=format&fit=crop&q=80',
    badge: 'Nanotech Armor ⚡',
    rating: 5,
    stats: { label1: 'Articulation Points', val1: '24 Joints', label2: 'Arc Reactor', val2: 'LED Glow Core' },
    description: 'Detailed 7-inch collectible figure with swappable energy blasters, lightning refocuser, and nano shield accessories.',
    story: 'The guardian of Avik\'s study desk, standing watch next to his math notebook.',
    favoriteFeature: 'Posable repulsor blast hands that can balance while standing on one foot.',
    color: 'from-red-600 to-yellow-500'
  },
  {
    id: 'hero-spiderman',
    name: 'Spider-Man Web-Slinger Stealth Suit',
    category: 'superhero',
    categoryLabel: 'Superheroes',
    image: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=600&auto=format&fit=crop&q=80',
    badge: 'Wall Crawler 🕷️',
    rating: 4.9,
    stats: { label1: 'Web Lines', val1: '3 Flexible Ropes', label2: 'Acrobatic Poses', val2: '360° Hip Swivel' },
    description: 'Highly agile superhero figure equipped with magnetic hands that stick to the metal refrigerator door.',
    story: 'Spidey hangs upside down from Avik\'s bunk bed ladder every night on patrol!',
    favoriteFeature: 'Bendable magnetic webs that can hang from any metal shelf or door handle.',
    color: 'from-blue-600 to-red-600'
  },
  {
    id: 'hero-batman',
    name: 'Batman Tactical Armor & Batmobile',
    category: 'superhero',
    categoryLabel: 'Superheroes',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    badge: 'Gotham Guardian 🦇',
    rating: 4.8,
    stats: { label1: 'Batarangs', val1: '4 Metal Alloy', label2: 'Grappling Hook', val2: 'Spring Eject' },
    description: 'Caped Crusader figure with fabric cape, grappling launcher, and armored Batmobile cockpit.',
    story: 'Used in dramatic action movies filmed by Avik on mom\'s phone with LEGO sound effects.',
    favoriteFeature: 'Fabric cape with wired edges for flying glide poses.',
    color: 'from-slate-800 to-zinc-900'
  },
  {
    id: 'bg-monopoly-junior',
    name: 'Monopoly Junior & Real Estate Empire',
    category: 'boardgames',
    categoryLabel: 'Board Games',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80',
    badge: 'Family Champion 🎩',
    rating: 4.8,
    stats: { label1: 'Player Count', val1: '2 - 4 Players', label2: 'Avik Win Rate', val2: '85% Streak' },
    description: 'Fast-paced property trading game where kids buy fun properties like the Ice Cream Parlor and Skate Park.',
    story: 'Avik always buys the Amusement Park and Roller Coaster tiles first to bankrupt his dad with ticket tolls!',
    favoriteFeature: 'Single dollar kid-friendly banknotes and cute little puppy player tokens.',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'bg-rubiks-speedcube',
    name: 'Magnetic 3x3 Speedcube Pro',
    category: 'boardgames',
    categoryLabel: 'Board Games',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    badge: 'Personal Best 1:42 🧩',
    rating: 5,
    stats: { label1: 'Personal Best Time', val1: '1 min 42 sec', label2: 'Core Type', val2: 'Magnetic Center' },
    description: 'High-speed stickerless puzzle cube with rounded corner-cutting edges and tension adjusters.',
    story: 'Learned the Fridrich CFOP method algorithms during summer vacation to beat his older cousin.',
    favoriteFeature: 'Smooth magnetic snaps that never pop or lock up during fast finger-tricks.',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'bg-guess-who',
    name: 'Guess Who? Classic Detective Edition',
    category: 'boardgames',
    categoryLabel: 'Board Games',
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&auto=format&fit=crop&q=80',
    badge: 'Mystery Sleuth 🕵️',
    rating: 4.6,
    stats: { label1: 'Questions Needed', val1: 'Avg. 4 Guesses', label2: 'Face Cards', val2: '24 Characters' },
    description: 'Interactive deduction guessing game with flip-down red and blue window frames.',
    story: 'Secret strategy: Always ask "Does your person wear glasses or a hat?" on the first turn to eliminate half the board!',
    favoriteFeature: 'Satisfying snap sound when flipping down 8 suspect cards at once.',
    color: 'from-amber-500 to-red-500'
  }
];

export const SOCIETY_SPOTS: SocietySpot[] = [
  {
    id: 'spot-playground',
    name: 'The Central Green Park & Swings',
    tagline: 'The epic launchpad for swings & jungle gym climbing',
    x: 28,
    y: 35,
    icon: 'Trees',
    color: 'bg-emerald-500 text-white border-emerald-300',
    bestTime: '4:30 PM - 5:30 PM',
    avikTip: 'The big blue swing on the left has the smoothest chains — you can jump from 5 feet in the air onto soft sand!',
    activity: 'Swings, monkey bars & high-altitude jump contests',
    secretCode: 'SWING-CHAMP'
  },
  {
    id: 'spot-cycling-loop',
    name: 'The Turbo Cycling Loop (Track A)',
    tagline: 'A smooth 600m paved track looping around the gardens',
    x: 65,
    y: 25,
    icon: 'Bike',
    color: 'bg-blue-500 text-white border-blue-300',
    bestTime: '5:30 PM - 6:30 PM',
    avikTip: 'Watch out for the gentle slope near Tower 3 — that\'s where you get maximum aerodynamic speed!',
    activity: 'Time trials, bike races & sunset sprint challenges',
    secretCode: 'TURBO-RACER'
  },
  {
    id: 'spot-football-turf',
    name: 'The Sunset Football & Sports Turf',
    tagline: 'Floodlit green turf for 5v5 soccer & dodgeball matches',
    x: 75,
    y: 65,
    icon: 'Trophy',
    color: 'bg-amber-500 text-white border-amber-300',
    bestTime: '6:00 PM - 7:30 PM',
    avikTip: 'Avik plays right striker. If you pass to his left foot, he shoots top corner 9 out of 10 times!',
    activity: 'Penalty shootouts, golden goal matches & dodgeball',
    secretCode: 'GOAL-MACHINE'
  },
  {
    id: 'spot-treehouse',
    name: 'The Banyan Tree Secret HQ',
    tagline: 'Shaded wooden bench & lookout post near the old banyan',
    x: 20,
    y: 72,
    icon: 'Sparkles',
    color: 'bg-purple-500 text-white border-purple-300',
    bestTime: 'Sunday Mornings 10:00 AM',
    avikTip: 'Where the gang plans comic stories, trades Pokémon cards, and swaps Hot Wheels racers.',
    activity: 'Card trading, secret club meetings & comic sketches',
    secretCode: 'SECRET-BASE'
  },
  {
    id: 'spot-clubhouse',
    name: 'The Clubhouse & Table Tennis Room',
    tagline: 'Indoor games arena with carrom, chess & table tennis',
    x: 48,
    y: 52,
    icon: 'Castle',
    color: 'bg-rose-500 text-white border-rose-300',
    bestTime: 'Monsoon afternoons & rainy days',
    avikTip: 'Table #2 has the best bounce. Also, there\'s free cold water in the cooler after intense matches!',
    activity: 'Carrom queen captures, chess tournaments & ping-pong rallies',
    secretCode: 'CHESS-MASTER'
  },
  {
    id: 'spot-icecream',
    name: 'Sunday Ice Cream Van Stop',
    tagline: 'Near the main gate every Sunday evening at 5:00 PM sharp',
    x: 52,
    y: 88,
    icon: 'IceCream',
    color: 'bg-pink-500 text-white border-pink-300',
    bestTime: 'Sundays at 5:00 PM',
    avikTip: 'Double scoop Mango + Chocolate cone is Avik\'s legendary signature order!',
    activity: 'Post-playdate sweet treat celebration',
    secretCode: 'MANGO-SCOOP'
  }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'entry-1',
    senderName: 'Kabir & Rohan',
    relation: 'Classmate',
    activity: 'Turbo Cycling & Hot Wheels Showdown',
    message: 'Hey Avik! Bring your Twin Mill car to school on Friday. We built an insane triple ramp in the courtyard! 🏎️',
    timestamp: 'Yesterday at 4:20 PM',
    avatarColor: 'bg-blue-500',
    favoriteEmoji: '🚀'
  },
  {
    id: 'entry-2',
    senderName: 'Ananya (Anya)',
    relation: 'Best Friend',
    activity: 'LEGO Spaceship Co-Op Build',
    message: 'Loved your Robo-Pug comic chapter 3! The part where he uses rocket paws was hilarious. Can you draw my cat in chapter 4? 🐱🎨',
    timestamp: '2 days ago',
    avatarColor: 'bg-pink-500',
    favoriteEmoji: '⭐'
  },
  {
    id: 'entry-3',
    senderName: 'Uncle Vikram',
    relation: 'Cousin / Family',
    activity: 'Math Quiz Battle & Board Games',
    message: 'Still can\'t believe you solved that 3-digit multiplication in 10 seconds flat during dinner! Keep exploring, champ! 💡🧠',
    timestamp: '3 days ago',
    avatarColor: 'bg-emerald-500',
    favoriteEmoji: '🏆'
  }
];
