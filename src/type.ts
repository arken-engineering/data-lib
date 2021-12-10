export const ItemType = {
    None: 0,
    OneHandedWeapon: 1,
    TwoHandedWeapon: 2,
    Shield: 3,
    Arrow: 4,
    Helm: 5,
    Pet: 6,
    BodyArmor: 7,
    LegArmor: 8,
    Glove: 9,
    Belt: 10,
    Boot: 11,
    Ring: 12,
    Amulet: 13,
    Trinket: 14,
    Potion: 15,
    Gem: 16,
    Rune: 17,
    Ingredient: 18,
    Quest: 19,
    Undercloth: 20,
    Mount: 21,
    Key: 22,
    Container: 23,
    Misc: 24,
    WristArmor: 24,
} as const

export type ItemType = keyof typeof ItemType
export type ItemTypeID = typeof ItemType[ItemType]

function spaceify(str: string) {
    return str.trim().split("").reduce((acc, c, i) => {
        if(i === 0) return c;
        if(c.toUpperCase() === c) return `${acc} ${c}`;
        return acc + c;
    }, "")
}

export const ItemTypeToText = Object.entries(ItemType).reduce((acc, [k, v]) => ({...acc, [v]: k === "LegArmor" ? "Leggings" : spaceify(k)}), {});
/*
export const ItemTypeToText = {
    [ItemType.None]: 'None',
    [ItemType.OneHandedWeapon]: 'One Handed Weapon',
    [ItemType.TwoHandedWeapon]: 'Two Handed Weapon',
    [ItemType.Shield]: 'Shield',
    [ItemType.Arrow]: 'Arrow',
    [ItemType.Helm]: 'Helm',
    [ItemType.Pet]: 'Pet',
    [ItemType.BodyArmor]: 'Body Armor',
    [ItemType.LegArmor]: 'Leggings',
    [ItemType.Glove]: 'Glove',
    [ItemType.Belt]: 'Belt',
    [ItemType.Boot]: 'Boot',
    [ItemType.Ring]: 'Ring',
    [ItemType.Amulet]: 'Amulet',
    [ItemType.Trinket]: 'Trinket',
    [ItemType.Potion]: 'Potion',
    [ItemType.Gem]: 'Gem',
    [ItemType.Rune]: 'Rune',
    [ItemType.Ingredient]: 'Ingredient',
    [ItemType.Quest]: 'Quest',
    [ItemType.Undercloth]: 'Undercloth',
    [ItemType.Mount]: 'Mount',
    [ItemType.Key]: 'Key',
    [ItemType.Container]: 'Container',
    [ItemType.Misc]: 'Misc',
    [ItemType.WristArmor]: 'Wrist Armor',
}
*/

