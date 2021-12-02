import { Runeword } from "."
import { ItemAttributes } from "../attributes"
import { ItemMod } from "../mods"
import { ItemRarity, ItemRarityNameById } from "../rarity"


function getModsFromToken(tokenId: string, id: number, modStart: number): ItemMod[] {
    
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



function mergeModsAndAttributesIntoItem(item: Runeword): Runeword {
    const rarity = item.mods.find(m => m.attributeId === ItemAttributes.Rarity.id)
    const rarityToMerge = rarity ? {rarity: ItemRarity[ItemRarityNameById[rarity.value]]} : {}
    const 
}


function tokenParser(tokenId: string) {
    
    const version = parseInt(tokenId.slice(1, 4));;
    const id = parseInt(tokenId.slice(4, 9));
    const type = version === 1 ? 0 : parseInt(tokenId.slice(9, 11));
    const modStart = version === 1 ? 9 : 11;

    const mods = getModsFromToken(tokenId, id, modStart)
    const attributes = getAttributes(mods)
}