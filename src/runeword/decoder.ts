import { Runeword } from ".";
import { Branches } from "../data";
import { ItemTypeID } from "../type";
import { buildRarity, createRunewordModsMerger, getAttributes, getModsFromToken, getPerfectionAndShorthand, includeCommunityRequests } from "./decoder-parts";
import { createEmptyItem } from "./runeword";


export function decodeItem(tokenId: string) {
    
    const version = parseInt(tokenId.slice(1, 4));;
    const id = parseInt(tokenId.slice(4, 9));
    const type = version === 1 ? 0 : parseInt(tokenId.slice(9, 11)) as ItemTypeID;
    const modStart = version === 1 ? 9 : 11;
    let runewordInTheBuild: Partial<Runeword> = createEmptyItem(tokenId, id, type);

    const mods = getModsFromToken(tokenId, id, modStart)
    
    const attributes = getAttributes(id, mods, runewordInTheBuild.attributes || [], (runewordInTheBuild.branches as Branches)["1"].attributes);
    runewordInTheBuild = {
        ...runewordInTheBuild,
        mods,
        attributes
    }
    const applyMetaAndMergeAttributes = createRunewordModsMerger(attributes);
    const {perfection, shorthand} = getPerfectionAndShorthand((runewordInTheBuild.branches as Branches)["1"], attributes);
    const rarity = buildRarity(attributes, 1);
    const applyCommunityRequests = includeCommunityRequests(tokenId)
    runewordInTheBuild = applyMetaAndMergeAttributes(runewordInTheBuild as Runeword)
    runewordInTheBuild = {
        ...runewordInTheBuild, 
        rarity,
        perfection,
        shorthand
    }
    return applyCommunityRequests(runewordInTheBuild as Runeword)
}