export const ItemRarity: {[k: string]: Rarity} = {
    Legendary: { id: 1, name: 'Legendary' },
    Unique: { id: 2, name: 'Unique' },
    Mythic: { id: 3, name: 'Mythic' },
    Epic: { id: 4, name: 'Epic' },
    Rare: { id: 5, name: 'Rare' },
    Magical: { id: 6, name: 'Magical' },
    Normal: { id: 7, name: 'Normal' },
    Set: { id: 8, name: 'Set' },
    Quest: { id: 9, name: 'Quest' },
    Trash: { id: 10, name: 'Trash' },
}

export const ItemRarityNameById: {[k: number]: keyof typeof ItemRarity} = Object.values(ItemRarity).reduce((acc, e) => ({...acc, [e.id]: e.name }), {})
export type Rarity = {id: number; name: string}