export const ItemSlot = {
    None: 0,
    LeftHand: 1,
    RightHand: 2,
    Head: 3,
    Pet: 4,
    Neck: 5,
    Legs: 6,
    Chest: 7,
    Waist: 8,
    Hands: 9,
    Wrists: 10,
    // Legs: 11,
    Feet: 12,
    Finger1: 13,
    Finger2: 14,
    Trinket1: 15,
    Trinket2: 16,
    Trinket3: 17,
    Body: 18,
    Companion: 19,
    Mount: 20
} as const

export type ItemSlotID = typeof ItemSlot[keyof typeof ItemSlot]