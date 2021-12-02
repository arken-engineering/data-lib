import { Rune } from "./runes"

const emptyMeta = {
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
    harvestFees: {} as {[k in Rune]: number},
  }

  export type ActionMetadata = typeof emptyMeta

  export function createEmptyActionMetadata(): ActionMetadata {
      return ({...emptyMeta})
  }