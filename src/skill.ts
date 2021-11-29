
export const SkillIdByName = {
    'None': 0,
    'Whirlwind': 1,
    'Fire Wall': 2,
    'Sanctuary Aura': 3,
    'Wolf Strike': 4,
    'Time Warp': 5,
    'Sacrifice': 6,
    'Hidden Shot': 7,
    'Fade': 8,
    'Phase': 9,
    'Deep Impact': 10,
    'Mystic Insight': 11,
    'Battle Rage': 12,
    'White Lightning': 13,
    'Inferno Fire Blast': 14,
    'Cosmic Flare': 15,
    'Veil of Night': 16,
    'Sky Swarm': 17,
    'Flurry Assault': 18,
    'Destructive Impact': 19,
    'Nova Breath': 20,
  }
  
  export const SkillNames = Object.entries(SkillIdByName).reduce((acc, [k, v]) => ({...acc, [v]: k}), {});