export const ItemsMainCategoriesType = {
    WEAPONS: 'weapon',
    SHIELDS: 'shield',
    ARMORS: 'armor',
    ACCESSORIES: 'accessory',
    RUNES: 'rune',
    OTHER: 'runeword',
} as const

export const ItemCategoriesType = {
    WEAPON: 'weapon',
    SHIELD: 'shield',
    ARMOR: 'armor',
    GREAVE: 'greave',
    HELM: 'helm',
    RUNE: 'rune',
    ACCESSORY: 'accessory',
} as const

export type Category = string