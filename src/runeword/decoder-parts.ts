import { ItemAttribute, ItemAttributes, ItemAttributesById } from "../attributes"
import { ItemsMainCategoriesType } from "../categories"
import { ClassIds } from "../classes"
import { itemData, Percentage } from "../data"
import { ActionMetadata, createEmptyActionMetadata } from "../metadata"
import { ItemMod } from "../mods"
import { ItemRarity, ItemRarityNameById } from "../rarity"
import { Rune } from "../runes"
import { createEmptyMeta, Runeword, RunewordMeta } from "./runeword"

type ModToAttrTransformer = (mod: ItemMod) => ItemAttribute
type MetadataProducer = (metadata: ActionMetadata, attribute: ItemAttribute, prevAttr?: ItemAttribute) => ActionMetadata
type RunewordModifier = (attribute: ItemAttribute) => (item: Runeword) => Runeword
type Merger = {
    metadataProducer?: MetadataProducer;
    runewordModifier?: RunewordModifier;
}

const mergeAttribute: ModToAttrTransformer = (mod) => {
    return ({
        ...(itemData[ItemsMainCategoriesType.OTHER].find(i => i.id === mod.attributeId)!),
        ...ItemAttributesById[mod.attributeId!],
        ...mod,
        attributeId: mod.attributeId! // fix it for the type
    })
}


const ModToMerger: {[k: keyof typeof ItemAttributes]: Merger} = {
    [ItemAttributes.HarvestYield.id]: {
        metadataProducer: (metadata, attr) => ({...metadata, harvestYield: metadata.harvestYield + attr.value})
    },
    [ItemAttributes.HarvestFeeToken.id]: {
        metadataProducer: (metadata, attr, prevAttr) => ({...metadata, [attr.map![attr.value]]: prevAttr!.value})
    },
    [ItemAttributes.SendHarvestHiddenPool.id]: {
        metadataProducer: (metadata, attr) => ({...metadata, chanceToSendHarvestToHiddenPool: metadata.chanceToSendHarvestToHiddenPool + attr.value})
    },
    [ItemAttributes.BurnEntireHarvest.id]: {
        metadataProducer: (metadata, attr) => ({...metadata, chanceToLoseHarvest: metadata.chanceToLoseHarvest + attr.value})
    },
    [ItemAttributes.HarvestBurn.id]: {
        metadataProducer: (metadata, attr) => ({...metadata, harvestBurn: metadata.harvestBurn + attr.value})
    },
    [ItemAttributes.FindShard.id]: {
        metadataProducer: (metadata, attr) => {
            return ({...metadata, worldstoneShardChance: attr.value || attr.value})
        }

    }, //TODO can attr not have value here?
    [ItemAttributes.RemoveFees.id]: {
        metadataProducer: (metadata, attr) => ({...metadata, feeReduction: metadata.feeReduction + attr.value})
    },
    [ItemAttributes.RandomRuneExchange.id]: {
        metadataProducer: (metadata, attr) => ({...metadata, randomRuneExchange: metadata.randomRuneExchange + attr.value})
    },
    [ItemAttributes.UnstakeLocked.id]: {
        metadataProducer: (metadata) => ({...metadata, unstakeLocked: true})
    },
    [ItemAttributes.Rarity.id]: {
        runewordModifier: attr => item => ({...item, rarity: ItemRarity[ItemRarityNameById[attr.value]]})
    },
    [ItemAttributes.SpecificClass.id]: {
        metadataProducer: (metadata, attr) => ({...metadata, classRequired: attr.value})
    },
    
}


export function modToAttribute(mod: ItemMod): ItemAttribute | undefined {
    if(!mod.attributeId) return; 
    return mergeAttribute(mod)
}

export function getAttributes(mods: ItemMod[]): ItemAttribute[] {
    return mods.reduce<ItemAttribute[]>((acc, mod) => {
        const attr = modToAttribute(mod)
        return attr ? [...acc, attr] : acc;
    }, [])
}

export function actionMetaToRunewordMeta(actionMetadata: ActionMetadata): RunewordMeta {
    let meta = createEmptyMeta()
    if (actionMetadata.harvestYield) {
        meta.harvestYield = actionMetadata.harvestYield
      }
      if (Object.keys(actionMetadata.harvestFees).length > 0) {
        meta.harvestFees = actionMetadata.harvestFees
        meta.harvestFeeToken = Object.keys(actionMetadata.harvestFees)[0] as Rune
        meta.harvestFeePercent = actionMetadata.harvestFees[Object.keys(actionMetadata.harvestFees)[0] as Rune] as Percentage
      }
      if (actionMetadata.chanceToSendHarvestToHiddenPool) {
        meta.chanceToSendHarvestToHiddenPool += actionMetadata.chanceToSendHarvestToHiddenPool
      }
      if (actionMetadata.chanceToLoseHarvest) {
        meta.chanceToLoseHarvest += actionMetadata.chanceToLoseHarvest
      }
      if (actionMetadata.harvestBurn) {
        meta.harvestBurn = actionMetadata.harvestBurn
      }
      if (actionMetadata.feeReduction) {
        meta.feeReduction = actionMetadata.feeReduction
      }
      if (actionMetadata.randomRuneExchange) {
        meta.randomRuneExchange = actionMetadata.randomRuneExchange
      }
      if (actionMetadata.worldstoneShardChance) {
        meta.worldstoneShardChance = actionMetadata.worldstoneShardChance as Percentage
      }
      if (actionMetadata.unstakeLocked) {
        meta.unstakeLocked = actionMetadata.unstakeLocked
      }
      if (actionMetadata.classRequired) {
        meta.classRequired = actionMetadata.classRequired as ClassIds
      }
      return meta;
} 


export function createRunewordModsMerger(attributes: ItemAttribute[]): (r: Runeword) => Runeword {
    type Reducer = {actionMetadata: ActionMetadata, runewordModifier: (r: Runeword) => Runeword}
    return runeword => {
        const {actionMetadata, runewordModifier} = attributes.reduce<Reducer>((acc, attr, idx, attrs) => {
            let {actionMetadata, runewordModifier} = acc
            const prevAttr = idx > 0 ? attrs[idx-1] : undefined;
            const merger: Merger = ModToMerger[attr.id];
            if(!merger) return acc;
            if(merger.metadataProducer) actionMetadata = merger.metadataProducer(actionMetadata, attr, prevAttr)
            if(merger.runewordModifier) runewordModifier = (r: Runeword) => merger.runewordModifier!(attr)(runewordModifier(r))
            return {actionMetadata, runewordModifier}
            
        }, {actionMetadata: createEmptyActionMetadata(), runewordModifier: r => r})
        return runewordModifier({...runeword, meta: actionMetaToRunewordMeta(actionMetadata)})
    }
}