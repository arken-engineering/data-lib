export const ClassIdByName = {
    None: 0,
    Barbarian: 1,
    Sorceress: 2,
    Amazon: 3,
    Necromancer: 4,
    Paladin: 5,
    Assassin: 6,
    Druid: 7,
  }
  
  export const ClassNames = Object.entries(ClassIdByName).reduce((acc, [k, v]) => ({...acc, [v]: k}), {});