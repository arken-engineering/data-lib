import { ItemsMainCategoriesType } from "../categories";
import { ClassIds } from "../classes";
import { itemData, Percentage, RunewordDefinition } from "../data";
import { ItemMod } from "../mods";
import { Rune } from "../runes";
import { ItemTypeID } from "../type";

export const ItemsBonusType = {
    SWIMMING: 'swimming',
    CLIMBING: 'climbing',
    JUMPING: 'jumping',
}

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
}

  

export type RunewordMeta = {
    chanceToLoseHarvest: number;
    chanceToSendHarvestToHiddenPool: number;
    harvestBurn: number;
    harvestFeePercent: Percentage;
    harvestFeeToken: Rune | '';
    harvestFees: {
        [k in Rune]: number
    } | {};
    harvestYield: number;
    unstakeLocked: boolean,
    feeReduction: number;
    classRequired: ClassIds,
    worldstoneShardChance: Percentage, // number? canit be higher than 100 ?
    randomRuneExchange: number // is there a better type?
}

export type Runeword = RunewordDefinition & {
    tokenId: string;
    shortTokenId: string;
    shorthand: string | null;
    meta: RunewordMeta;
    mods: ItemMod[];
    version: number;
    perfection: number | null;
}

export const createEmptyMeta = (): RunewordMeta => ({
    harvestYield: 0,
    harvestFeeToken: '',
    harvestFeePercent: 0,
    harvestFees: {},
    chanceToSendHarvestToHiddenPool: 0,
    chanceToLoseHarvest: 0,
    harvestBurn: 0,
    feeReduction: 0,
    unstakeLocked: false,
    classRequired: 0,
    worldstoneShardChance: 0,
    randomRuneExchange: 0,
})

export const createEmptyItem = (tokenId: string, id: number, type: ItemTypeID): Partial<Runeword> => ({
    branches: {},
    shorthand: '',
    mods: [],
    attributes: [],
    perfection: null,
    category: ItemsMainCategoriesType.WEAPONS,
    slots: [],
    type,
    ...itemData[ItemsMainCategoriesType.OTHER].find((i) => i.id === id),
    meta: createEmptyMeta(),
    tokenId,
    id,
    shortTokenId: `${tokenId.slice(0, 23)}...${tokenId.slice(-3)}`
})