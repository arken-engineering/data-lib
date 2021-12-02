export const ClassIdByName = {
  None: 0,
  Barbarian: 1,
  Sorceress: 2,
  Amazon: 3,
  Necromancer: 4,
  Paladin: 5,
  Assassin: 6,
  Druid: 7,
} as const
  
export const ClassNames = Object.entries(ClassIdByName).reduce((acc, [k, v]) => ({...acc, [v]: k}), {});

export type Classes = keyof typeof ClassIdByName
export type ClassIds = typeof ClassIdByName[Classes]
