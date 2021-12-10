//@ts-nocheck
import { ItemAttributes, ItemAttributesById, itemData, ItemRarity, ItemRarityNameById } from './items'
import { ItemsMainCategoriesType } from './items.type'

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length

export function decodeItem(tokenId) {
  const defaultItem = {
    tokenId,
    details: {},
    branches: {},
    shorthand: '',
    mods: [],
    attributes: [],
    perfection: null,
    category: ItemsMainCategoriesType.WEAPONS,
    slots: [],
    meta: {
      harvestYield: 0,
      harvestFeeToken: '',
      harvestFeePercent: 0,
      harvestFees: {},
      chanceToSendHarvestToHiddenPool: 0,
      chanceToLoseHarvest: 0,
      harvestBurn: 0,
    },
  }

  if (!tokenId || parseInt(tokenId) === 0 || Number.isNaN(parseInt(tokenId))) return defaultItem

  try {
    const version = parseInt(tokenId.slice(1, 4))
    const id = parseInt(tokenId.slice(4, 9))

    let type = 0
    let modStart = 9

    if (version === 1) {
      modStart = 9
    } else {
      type = parseInt(tokenId.slice(9, 11))
      modStart = 11
    }

    const mods = []

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

    const item = {
      ...defaultItem,
      id,
      ...itemData[ItemsMainCategoriesType.OTHER].find((i) => i.id === id),
      type,
      version,
      mods,
      shortTokenId: `${tokenId.slice(0, 23)}...${tokenId.slice(-3)}`,
    }

    const branch = item.branches[1]
    const branchAttributes = branch ? JSON.parse(JSON.stringify(branch.attributes)) : {}

    const actionMetadata = {
      harvestYield: 0,
      pending: 0,
      bonus: 0,
      harvestBurn: 0,
      chanceToSendHarvestToHiddenPool: 0,
      chanceToLoseHarvest: 0,
      guildId: null,
      characterId: null,
      tokenId: null,
      itemIndex: 0,
      itemLength: 0,
      modIndex: 0,
      modLength: 0,
      rand: 0,
      removeFees: 0,
      freezeFees: 0,
      magicFind: 0,
      unableUseRuneword: null,
      currentRewardToken: null,
      hasEarlyUnstakeLocked: null,
      hasEarlyUnstakeNoReward: null,
      hiddenPoolPid: null,
      swapToken: null,
      swapAmount: null,
      feeToken: null,
      feeAmount: null,
      feeReduction: 0,
      unstakeLocked: false,
      classRequired: 0,
      harvestFeeToken: '',
      harvestFeePercent: 0,
      worldstoneShardChance: 0,
      randomRuneExchange: 0,
      harvestFees: {},
    }

    item.attributes = branchAttributes

    let prevMod = null

    if (item.id === 1) {
      item.mods[0].attributeId = ItemAttributes.HarvestYield.id
      item.mods[1].attributeId = ItemAttributes.HarvestFee.id
      item.mods[2].attributeId = ItemAttributes.HarvestFeeToken.id
    } else if (item.id === 2) {
      item.mods[0].attributeId = ItemAttributes.HarvestYield.id
      item.mods[1].attributeId = ItemAttributes.SendHarvestHiddenPool.id
      item.mods[2].attributeId = ItemAttributes.BurnEntireHarvest.id
    } else if (item.id === 3) {
      item.mods[0].attributeId = ItemAttributes.HarvestYield.id
      item.mods[1].attributeId = ItemAttributes.HarvestBurn.id
      item.mods[2].attributeId = ItemAttributes.FindShard.id

      if (item.mods[2].value === 0) item.mods[2].value = 100
    } else if (item.id === 4) {
      item.mods[0].attributeId = ItemAttributes.FindShard.id

      if (item.mods[0].value === 0) item.mods[0].value = 100
    }

    for (const i in item.mods) {
      const mod = item.mods[i]
      const branchAttribute = branchAttributes[i]
      if (mod.attributeId === ItemAttributes.HarvestYield.id) {
        actionMetadata.harvestYield += mod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.HarvestFee.id) {
        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.HarvestFeeToken.id) {
        actionMetadata.harvestFees[branchAttribute.map[mod.value]] = prevMod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.SendHarvestHiddenPool.id) {
        actionMetadata.chanceToSendHarvestToHiddenPool += mod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.BurnEntireHarvest.id) {
        actionMetadata.chanceToLoseHarvest += mod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.HarvestBurn.id) {
        actionMetadata.harvestBurn += mod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.FindShard.id) {
        if (branchAttribute.value !== undefined) mod.value = branchAttribute.value

        actionMetadata.worldstoneShardChance += mod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.RemoveFees.id) {
        actionMetadata.feeReduction += mod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.RandomRuneExchange.id) {
        actionMetadata.randomRuneExchange += mod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.UnstakeLocked.id) {
        actionMetadata.unstakeLocked = true

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.SpecificClass.id) {
        actionMetadata.classRequired = mod.value

        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId === ItemAttributes.Rarity.id) {
        item.rarity = ItemRarity[ItemRarityNameById[mod.value]]
        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      } else if (mod.attributeId > 0 && ItemAttributesById[mod.attributeId]) {
        item.attributes[i] = {
          ...(item.attributes[i] || {}),
          ...ItemAttributesById[mod.attributeId],
          ...branchAttribute,
          ...mod,
        }
      }

      prevMod = mod
    }

    if (actionMetadata.harvestYield) {
      item.meta.harvestYield = actionMetadata.harvestYield
    }
    if (Object.keys(actionMetadata.harvestFees).length > 0) {
      item.meta.harvestFees = actionMetadata.harvestFees
      item.meta.harvestFeeToken = Object.keys(actionMetadata.harvestFees)[0]
      item.meta.harvestFeePercent = actionMetadata.harvestFees[Object.keys(actionMetadata.harvestFees)[0]]
    }
    if (actionMetadata.chanceToSendHarvestToHiddenPool) {
      item.meta.chanceToSendHarvestToHiddenPool += actionMetadata.chanceToSendHarvestToHiddenPool
    }
    if (actionMetadata.chanceToLoseHarvest) {
      item.meta.chanceToLoseHarvest += actionMetadata.chanceToLoseHarvest
    }
    if (actionMetadata.harvestBurn) {
      item.meta.harvestBurn = actionMetadata.harvestBurn
    }
    if (actionMetadata.feeReduction) {
      item.meta.feeReduction = actionMetadata.feeReduction
    }
    if (actionMetadata.randomRuneExchange) {
      item.meta.randomRuneExchange = actionMetadata.randomRuneExchange
    }
    if (actionMetadata.worldstoneShardChance) {
      item.meta.worldstoneShardChance = actionMetadata.worldstoneShardChance
    }
    if (actionMetadata.unstakeLocked) {
      item.meta.unstakeLocked = actionMetadata.unstakeLocked
    }
    if (actionMetadata.classRequired) {
      item.meta.classRequired = actionMetadata.classRequired
    }

    if (branch && branch.perfection) {
      const perfection = JSON.parse(JSON.stringify(branch.perfection))

      // if (item.tokenId === '1001000041000100015647') {
      //   console.log(perfection)
      //   console.log(item.attributes)
      //   console.log(branch.attributes)
      // }

      if (perfection.length) {
        item.shorthand = []

        for (let i = 0; i < perfection.length; i++) {
          if (perfection[i] === undefined || perfection[i] === null || !item.attributes[i] || !branch.attributes[i]) {
            perfection[i] = undefined
            continue
          }

          perfection[i] =
            perfection[i] === branch.attributes[i].max
              ? perfection[i] - branch.attributes[i].min === 0
                ? 1
                : (item.attributes[i].value - branch.attributes[i].min) / (perfection[i] - branch.attributes[i].min)
              : branch.attributes[i].max - perfection[i] === 0
              ? 1
              : 1 - (item.attributes[i].value - perfection[i]) / (branch.attributes[i].max - perfection[i])

          item.shorthand.push(
            branch.attributes[i].map ? branch.attributes[i].map[item.attributes[i].value] : item.attributes[i].value,
          )
        }

        item.shorthand = item.shorthand.join('-')

        item.perfection = average(perfection.filter((p) => p !== undefined))

        // if (item.tokenId === '1001000041000100015647') {
        //   console.log(perfection, branch.attributes[0].max, perfection[0], 1)
        // }

        if (Number.isFinite(item.perfection)) {
          item.perfection = parseFloat((Math.floor(item.perfection * 100) / 100).toFixed(2))
        } else {
          item.perfection = null
        }
      } else {
        item.perfection = null
      }
    }

    if (tokenId === '100300014012001002201900120130012011001200200720030122039008202100600000875') item.perfection = -13
    if (tokenId === '100301201142040003200100520130200000000000000000000000000000000000000000001')
      item.branches[1].description[1] = '"So long, I barely knew thee."'

    // item.meta = {
    //   harvestYield: 0,
    //   harvestFeeToken: '',
    //   harvestFeePercent: 0,
    //   harvestFees: {},
    //   chanceToSendHarvestToHiddenPool: 0,
    //   chanceToLoseHarvest: 0,
    //   harvestBurn: 0,
    // }a
    if (!item.rarity) {
      if (item.attributes.find((a) => a.id === 40)?.value) {
        item.rarity = ItemRarityNameById[item.attributes.find((a) => a.id === 40)?.value || 5]
      } else if (item.perfection === 1) {
        item.rarity = ItemRarity.Mythic
      } else if (item.perfection >= 0.9) {
        item.rarity = ItemRarity.Epic
      } else if (item.perfection >= 0.7) {
        item.rarity = ItemRarity.Rare
      } else if (item.perfection >= 0) {
        item.rarity = ItemRarity.Magical
      }
    }

    return {
      ...item,
      tokenId,
    }
  } catch (e) {
    // console.log('Token is invalid', tokenId)
    // console.warn(e)
  }

  return defaultItem
}
