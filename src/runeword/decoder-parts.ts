import { ItemAttribute, ItemAttributeDefinition, ItemAttributes, ItemAttributesById } from "../attributes"
import { ItemsMainCategoriesType } from "../categories"
import { ClassIds } from "../classes"
import { Branches, ItemBranch, itemData, Percentage } from "../data"
import { ActionMetadata, createEmptyActionMetadata } from "../metadata"
import { ItemMod } from "../mods"
import { ItemRarity, ItemRarityNameById, Rarity } from "../rarity"
import { Rune } from "../runes"
import { createEmptyMeta, Runeword, RunewordMeta } from "./runeword"

type ModToAttrTransformer = (id: number, mod: ItemMod, branchAttributes: ItemAttributeDefinition[]) => ItemAttribute
type MetadataProducer = (metadata: ActionMetadata, attribute: ItemAttribute, prevAttr?: ItemAttribute) => ActionMetadata
type RunewordModifier = (attribute: ItemAttribute) => (item: Runeword) => Runeword
type Merger = {
    metadataProducer?: MetadataProducer;
    runewordModifier?: RunewordModifier;
}


export function getModsFromToken(tokenId: string, id: number, modStart: number): ItemMod[] {
    
    let mods: ItemMod[] = []

    let modIndex = modStart
    while (modIndex < tokenId.length) {
        const variant = parseInt(tokenId.slice(modIndex, modIndex + 1))

        if (variant === 2) {
            const attributeId = parseInt(tokenId.slice(modIndex + 1, modIndex + 4))
            const value = parseInt(tokenId.slice(modIndex + 4, modIndex + 7))

            if (Number.isNaN(value)) break

            mods.push({
                variant,
                attributeId,
                value,
            })

            modIndex += 7
        } else {
            const value = parseInt(tokenId.slice(modIndex + 1, modIndex + 4))

            if (Number.isNaN(value)) break

            mods.push({
            variant,
            value,
            })

            modIndex += 4
        }
    }
    switch (id){
        case 1:
            mods[0].attributeId = ItemAttributes.HarvestYield.id
            mods[1].attributeId = ItemAttributes.HarvestFee.id
            mods[2].attributeId = ItemAttributes.HarvestFeeToken.id
            break;
        case 2: 
            mods[0].attributeId = ItemAttributes.HarvestYield.id
            mods[1].attributeId = ItemAttributes.SendHarvestHiddenPool.id
            mods[2].attributeId = ItemAttributes.BurnEntireHarvest.id
            break;
        case 3:
            mods[0].attributeId = ItemAttributes.HarvestYield.id
            mods[1].attributeId = ItemAttributes.HarvestBurn.id
            mods[2].attributeId = ItemAttributes.FindShard.id
            if (mods[2].value === 0) mods[2].value = 100
            break;
        case 4:
            mods[0].attributeId = ItemAttributes.FindShard.id
            if (mods[0].value === 0) mods[0].value = 100
            break;
    }

    return mods;
}


const mergeAttribute: ModToAttrTransformer = (id, mod, branchAttributes) => {
    const attribute = itemData[ItemsMainCategoriesType.OTHER].find(i => i.id === id)!.attributes[mod.attributeId!]
    return ({
        ...attribute,
        ...branchAttributes.find(a => a.id === mod.attributeId ),
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
        metadataProducer: (metadata, attr, prevAttr) => {
            
            return ({...metadata, harvestFees: {...metadata.harvestFees, [attr.map![attr.value]]: prevAttr!.value}})}
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


export function modToAttribute(runewordID: number, mod: ItemMod, branchAttribute: ItemAttributeDefinition[]): ItemAttribute | undefined {
    if(!mod.attributeId) return; 
    return mergeAttribute(runewordID, mod, branchAttribute)
}

export function getAttributes(runewordID: number, mods: ItemMod[], branchAttribute: ItemAttributeDefinition[]): ItemAttribute[] {
    return mods.reduce<ItemAttribute[]>((acc, mod) => {
        const attr = modToAttribute(runewordID, mod, branchAttribute)
        console.log("mod to attribute: ", attr)
        return attr ? [...acc, attr] : acc;
    }, [])
}

function actionMetaToRunewordMeta(actionMetadata: ActionMetadata): RunewordMeta {
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
            console.debug("current:", attr)
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

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length

export function getPerfectionAndShorthand(branch: ItemBranch, attributes: ItemAttribute[]): {shorthand: string | null, perfection: number | null} {
    let perfection: number | null = null
    let shorthand: string | null = null
    if (branch && branch.perfection) {
        const perfectionArr: (number | undefined)[] = JSON.parse(JSON.stringify(branch.perfection))

        // if (item.tokenId === '1001000041000100015647') {
        //   console.log(perfection)
    //   console.log(item.attributes)
        //   console.log(branch.attributes)
        // }

        if (perfectionArr.length) {
            let shorthandArr: (number | string)[] = []

            for (let i = 0; i < perfectionArr.length; i++) {
            if (perfectionArr[i] === undefined || perfectionArr[i] === null || !attributes[i] || !branch.attributes[i]) {
                perfectionArr[i] = undefined
                continue
            }

            perfectionArr[i] =
                perfectionArr[i] === branch.attributes[i].max
                ? perfectionArr[i]! - branch.attributes[i].min === 0
                    ? 1
                    : (attributes[i].value - branch.attributes[i].min) / (perfectionArr[i]! - branch.attributes[i].min)
                : branch.attributes[i].max - perfectionArr[i]! === 0
                ? 1
                : 1 - (attributes[i].value - perfectionArr[i]!) / (branch.attributes[i].max - perfectionArr[i]!)

            shorthandArr = [...shorthandArr, branch.attributes[i].map ? branch.attributes[i].map![attributes[i].value] : attributes[i].value]
            }

            shorthand = shorthandArr.join('-')

            perfection = average(perfectionArr.filter((p) => p !== undefined) as number[])

            // if (item.tokenId === '1001000041000100015647') {
            //   console.log(perfection, branch.attributes[0].max, perfection[0], 1)
            // }

            if (Number.isFinite(perfection)) {
            perfection = parseFloat((Math.floor(perfection * 100) / 100).toFixed(2))
            }
        }
    }
    return {perfection, shorthand}
}

export function buildRarity(attributes: ItemAttribute[], perfection: number): Rarity | undefined {
    if (attributes.find((a) => a.id === 40)?.value) {
        return ItemRarity[ItemRarityNameById[attributes.find((a) => a.id === 40)?.value || 5]]
    } else if (perfection === 1) {
        return ItemRarity.Mythic
    } else if (perfection >= 0.9) {
        return ItemRarity.Epic
    } else if (perfection >= 0.7) {
        return ItemRarity.Rare
    } else if (perfection >= 0) {
        return ItemRarity.Magical
    }
    return;
}

export function includeCommunityRequests(tokenId: string): (r: Runeword) => Runeword {
    return (r: Runeword) => {
        if (tokenId === '100300014012001002201900120130012011001200200720030122039008202100600000875') {
            return {...r, perfection: r.perfection! - 13}
        }
        if (tokenId === '100301201142040003200100520130200000000000000000000000000000000000000000001') {
            const first: ItemBranch = (r.branches as Branches)["1"] as ItemBranch;
            const [descHead, desc, descTail] = first.description as string[]
            const modified = {...first, description: [descHead, '"So long, I barely knew thee."', ...descTail]}
            return {...r, branches: {...r.branches, 1: first}}
        }
        return r;
    }
}