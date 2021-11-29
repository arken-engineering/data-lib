
import { ItemAttribute, ItemAttributeDefinition, ItemAttributes, ItemAttributesById } from "./attributes"
import { ItemsMainCategoriesType } from "./categories"
import { itemData, RunewordDefinition } from "./data"
import { ActionMetadata } from "./metadata"

export type ItemMod = {
    attributeId?: number;
    value: number;
    variant: number;
}

function mergeAttribute(id: number, mod: ItemMod) {
    return ({
        ...((itemData[ItemsMainCategoriesType.OTHER] as RunewordDefinition[]).find(i => i.id === id)),
        ...(mod.attributeId ? ItemAttributesById[mod.attributeId] : {}),
        ...mod
    })
}
const ModToAttr: {[k: keyof typeof ItemAttributes]: (id: number, mod: ItemMod, branchAttribute: ItemAttributeDefinition, prevMod?: ItemMod) => ItemAttribute} = {
    [ItemAttributes.HarvestYield.id]: mergeAttribute,
    [ItemAttributes.HarvestFee.id]: mergeAttribute,
    [ItemAttributes.HarvestFeeToken.id]: mergeAttribute,
    [ItemAttributes.SendHarvestHiddenPool.id]: mergeAttribute,
    [ItemAttributes.BurnEntireHarvest.id]: mergeAttribute,
    [ItemAttributes.HarvestBurn.id]: mergeAttribute,
    [ItemAttributes.FindShard.id]: mergeAttribute,
    [ItemAttributes.RemoveFees.id]: mergeAttribute,
    [ItemAttributes.RandomRuneExchange.id]: mergeAttribute,
    [ItemAttributes.UnstakeLocked.id]: mergeAttribute,
    [ItemAttributes.SpecificClass.id]: mergeAttribute,
    [ItemAttributes.Rarity.id]: mergeAttribute,
    [ItemAttributes.SendHarvestHiddenPool.id]: mergeAttribute,
    
}

type MetadataMerger = (metadata: ActionMetadata, mod: ItemMod,  branchAttribute: ItemAttributeDefinition | ItemAttribute, prevMod: ItemMod) => ActionMetadata

const ModToMetadata: {[k: keyof typeof ItemAttributes]: MetadataMerger} = {
    [ItemAttributes.HarvestYield.id]: (metadata, mod) => ({...metadata, harvestYield: metadata.harvestYield + mod.value}),
    [ItemAttributes.HarvestFeeToken.id]: (metadata, mod, branchAttribute, prevMod) => ({...metadata, [branchAttribute.map[mod.value]]: prevMod.value}),
    [ItemAttributes.SendHarvestHiddenPool.id]: (metadata, mod) => ({...metadata, chanceToSendHarvestToHiddenPool: metadata.chanceToSendHarvestToHiddenPool + mod.value}),
    [ItemAttributes.BurnEntireHarvest.id]: (metadata, mod) => ({...metadata, chanceToLoseHarvest: metadata.chanceToLoseHarvest + mod.value}),
    [ItemAttributes.HarvestBurn.id]: (metadata, mod) => ({...metadata, harvestBurn: metadata.harvestBurn + mod.value}),
    [ItemAttributes.FindShard.id]: (metadata, mod, branchAttribute) => {
        return ({...metadata, worldstoneShardChance: branchAttribute.value || mod.value})

    }, //TODO can mod not have value here?
    [ItemAttributes.RemoveFees.id]: (metadata, mod) => ({...metadata, feeReduction: metadata.feeReduction + mod.value}),
    [ItemAttributes.RandomRuneExchange.id]: (metadata, mod) => ({...metadata, randomRuneExchange: metadata.randomRuneExchange + mod.value}),
    [ItemAttributes.UnstakeLocked.id]: (metadata, mod) => ({...metadata, unstakeLocked: true}),
    [ItemAttributes.SpecificClass.id]: (metadata, mod) => ({...metadata, classRequired: mod.value}),
    
}

export function modToAttribute(id: number, mod: ItemMod, branchAttributes: ItemAttributeDefinition | ItemAttribute, actionMetadata: any, prevMod: ItemMod): ItemAttribute {
    const fn = ModToAttr[mod.attributeId]
    if(fn) {
        return fn(id, mod, branchAttributes, prevMod)
    }
}