
export const ItemAttributes: {[k: string]: ItemAttributeDefinition} = {
    HarvestYield: {
      id: 1,
      min: 0,
      max: 50,
      description: `{value}% Increased Harvest Yield`,
    },
    HarvestFee: {
      id: 2,
      min: 0,
      max: 50,
      description: `{value}% Harvest Fee`,
    },
    HarvestFeeToken: {
      id: 3,
      min: 0,
      max: 999,
      description: `Harvest Fee Token: {value}`,
    },
    SendHarvestHiddenPool: {
      id: 4,
      min: 0,
      max: 50,
      description: `{value}% Chance To Send Harvest To Hidden Pool`,
    },
    BurnEntireHarvest: {
      id: 5,
      min: 0,
      max: 50,
      description: `{value}% Chance To Lose Entire Harvest`,
    },
    HarvestBurn: {
      id: 6,
      min: 0,
      max: 50,
      description: `{value}% Harvest Burn`,
    },
    FindShard: {
      id: 7,
      min: 0,
      max: 100,
      description: `{value}% Chance To Find Worldstone Shard (Per Raid)`,
    },
    RemoveFees: {
      id: 8,
      min: 0,
      max: 100,
      description: `{value}% Reduced Harvest Fees`,
    },
    UnstakeLocked: {
      id: 9,
      min: 0,
      max: 100,
      description: `Unstake Locked Until Completion`,
    },
    EarlyUnstakeNoReward: {
      id: 10,
      min: 0,
      max: 100,
      description: `No Reward Early Unstake`,
    },
    RandomRuneExchange: {
      id: 11,
      min: 0,
      max: 50,
      description: `{value}% Random Rune Exchange`,
    },
    FindGuildToken: {
      id: 12,
      min: 0,
      max: 100,
      description: `{value}% Guild Token (Not Implemented)`,
    },
    MagicFind: {
      id: 13,
      min: 0,
      max: 999,
      description: `{value}% Magic Find`,
    },
    FractureItem: {
      id: 14,
      min: 0,
      max: 100,
      description: `{value}% Chance To Fracture Item (Not Implemented)`,
    },
    LaunchPoolReward: {
      id: 15,
      min: 0,
      max: 50,
      description: `{value}% Launchpool Reward (Not Implemented)`,
    },
    LaunchPoolToken: {
      id: 16,
      min: 0,
      max: 999,
      description: `Reward Token: {value}`,
    },
    FreezeFees: {
      id: 17,
      min: 0,
      max: 100,
      description: `{value}% Chance to Freeze Fees (Not Implemented)`,
    },
    UnableUseRuneword: {
      id: 18,
      min: 0,
      max: 999,
      description: `Unable To Use Runeword (Not Implemented)`,
    },
    CreateRandomRuneword: {
      id: 19,
      min: 0,
      max: 100,
      description: `{value}% Chance To Create Random Runeword (Not Implemented)`,
    },
    SpecificGuild: {
      id: 20,
      min: 0,
      max: 999,
      description: `Guild Only ({value})`,
    },
    SpecificClass: {
      id: 21,
      min: 0,
      max: 999,
      description: `{value} Required`,
    },
    RemoveTransferFees: {
      id: 22,
      min: 0,
      max: 100,
      description: `{value} Transfer Fees Removed`,
    },
    HarvestFeeToRandomRaider: {
      id: 23,
      min: 0,
      max: 100,
      description: `{value}% Harvest Donated To Random Raider`,
    },
    ShardOnHarvest: {
      id: 24,
      min: 0,
      max: 50,
      description: `{value}% Chance To Find Shard (On Harvest)`,
    },
    HarvestStartDelay: {
      id: 25,
      min: 0,
      max: 24,
      description: `Harvest Delayed By {value} Hours`,
    },
    HarvestClaimDelay: {
      id: 26,
      min: 0,
      max: 100,
      description: `{value}% Harvest Claim Delay`,
    },
    EarlyUnstakeFee: {
      id: 27,
      min: 0,
      max: 999,
      description: `{value}% Early Unstake Fee`,
    },
    EarlyUnstakeFeeValue: {
      id: 28,
      min: 0,
      max: 999,
      description: `Early Unstake Timeline: {value} Days`,
    },
    FreezeFeesValue: {
      id: 29,
      min: 0,
      max: 999,
      description: `Freeze Fees Timeline: {value} Hours`,
    },
    HarvestLockedLp: {
      id: 30,
      min: 0,
      max: 100,
      description: `{value}% Harvest Buy & Lock LP`,
    },
    DepositLockedLp: {
      id: 31,
      min: 0,
      max: 100,
      description: `{value}% Deposit Buy & Lock LP`,
    },
    WithdrawLockedLp: {
      id: 32,
      min: 0,
      max: 100,
      description: `{value}% Withdraw Buy & Lock LP`,
    },
    TransmuteItem: {
      id: 33,
      min: 0,
      max: 100,
      description: `{value}% Chance To Transmute Item (Not Implemented)`,
    },
    AvoidBurn: {
      id: 34,
      min: 0,
      max: 999,
      description: `{value}% Avoid All Burns (Not Implemented)`,
    },
    EarlyAccess: {
      id: 35,
      min: 0,
      max: 999,
      description: `Early Rune Access: {value} Minutes (Not Implemented)`,
    },
    NeverHarvestCurrentRune: {
      id: 36,
      min: 0,
      max: 999,
      description: `Can Never Harvest Current Rune (Not Implemented)`,
    },
    GameLottery: {
      id: 37,
      min: 0,
      max: 999,
      description: ``,
    },
    IncreasePoolMultiplier: {
      id: 38,
      min: 0,
      max: 999,
      description: `Increases Pool Multiplier {value}% (Not Implemented)`,
    },
    AddSkill: {
      id: 39,
      min: 0,
      max: 999,
      description: `Use Skill: {value} (Not Implemented)`,
    },
    Rarity: {
      id: 40,
      min: 0,
      max: 100,
      description: `Rarity: {value}`,
    },
    RandomPerfection1: {
      id: 41,
      min: 0,
      max: 100,
      description: ``,
    },
    RandomPerfection2: {
      id: 42,
      min: 0,
      max: 100,
      description: ``,
    },
    RandomPerfection3: {
      id: 43,
      min: 0,
      max: 100,
      description: ``,
    },
    RandomPerfection4: {
      id: 44,
      min: 0,
      max: 100,
      description: ``,
    },
    RandomPerfection5: {
      id: 45,
      min: 0,
      max: 100,
      description: ``,
    },
    SpecificRuneReward: {
      id: 46,
      min: 0,
      max: 100,
      description: ``,
    },
    ReduceBurn: {
      id: 47,
      min: 0,
      max: 100,
      description: `{value}% Reduced Burn (Not Implemented)`,
    },
    GuildMemberCapacity: {
      id: 48,
      min: 0,
      max: 100,
      description: `{value} Increased Inventory Spaces (Not Implemented)`,
    },
    GuildInventorySpaces: {
      id: 49,
      min: 0,
      max: 10,
      description: `{value} Increased Harvest Yield`,
    },
    GuildFarmingYield: {
      id: 50,
      min: 0,
      max: 33,
      description: `Staked Token: {value}`,
    },
    GuildTokenStakeRequired: {
      id: 51,
      min: 0,
      max: 100,
      description: `{value]% Reduced Burn`,
    },
    GuildTokenValueRequired: {
      id: 52,
      min: 0,
      max: 999,
      description: `Staked Token Amount: {value} (Not Implemented)`,
    },
    GuildRuneStakeRequired: {
      id: 53,
      min: 0,
      max: 999,
      description: `Staking required: {value} RUNE (Not Implemented)`,
    },
    PetFarmingYield: {
      id: 54,
      min: 0,
      max: 10,
      description: `{value} Increased Harvest Yield`,
    },
    Sockets: {
      id: 55,
      min: 0,
      max: 5,
      description: `{value} Sockets`,
    },
    SpecificRuneRewardToken: {
      id: 56,
      min: 0,
      max: 5,
      description: `Earn Rune: {value}`,
    },
    SpecificRuneRewardAmount: {
      id: 57,
      min: 0,
      max: 5,
      description: `Earned Amount: {value}`,
    },
    ResetSockets: {
      id: 58,
      min: 100,
      max: 100,
      description: `Resets Sockets (Not Implemented)`,
    },
    CrafterCertificate: {
      id: 59,
      min: 1,
      max: 999,
      description: `{value}`,
    },
    HarvestCritChance: {
      id: 61,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield (Not Implemented)`,
    },
    HarvestCritMultiplier: {
      id: 62,
      min: 0,
      max: 5,
      description: `{value}% Critical Harvest Bonus (Not Implemented)`,
    },
    HarvestOverTime: {
      id: 63,
      min: 0,
      max: 5,
      description: `Add {value}% to harvest, vested over time (Not Implemented)`,
    },
    HarvestVestmentReduction: {
      id: 64,
      min: 0,
      max: 5,
      description: `{value}% increase to vestment period (Not Implemented)`,
    },
    HarvestVestmentIncrease: {
      id: 65,
      min: 0,
      max: 5,
      description: `{value}% decrease to vestment period (Not Implemented)`,
    },
    HarvestTheft: {
      id: 66,
      min: 0,
      max: 5,
      description: `Enable the option to sacrifice up to x% of your harvest in order to steal x% of the next raider's harvest from the same pool (Not Implemented)`,
    },
    HarvestTheftMaxIncrease: {
      id: 67,
      min: 0,
      max: 5,
      description: `Maximum possible harvest theft increased by {value}% (Not Implemented)`,
    },
    HarvestTheftMinDecrease: {
      id: 68,
      min: 0,
      max: 5,
      description: `Minimum possible harvest theft decreased by {value}% (Not Implemented)`,
    },
    RandomRuneBonus: {
      id: 69,
      min: 0,
      max: 5,
      description: `{value}% bonus yield given as a random rune (Not Implemented)`,
    },
    YieldBonusSpecificWeapon: {
      id: 70,
      min: 0,
      max: 5,
      description: `{value}% increase to specific weapon harvest yield bonus (Not Implemented)`,
    },
    RandomRuneSpecificWeapon: {
      id: 71,
      min: 0,
      max: 5,
      description: `{value}% increase to specific weapon yield bonus, given as a random rune (Not Implemented)`,
    },
    SpecificWeaponType: {
      id: 72,
      min: 0,
      max: 5,
      description: `Specific weapon: {value} (Not Implemented)`,
    },
    HarvestTheftDefense: {
      id: 73,
      min: 0,
      max: 5,
      description: `{value}% chance to defend harvest theft, taking the thief's runes instead (Not Implemented)`,
    },
    RandomRuneExchangeSpecific: {
      id: 74,
      min: 0,
      max: 5,
      description: `{value}% chance that random rune exchange gives a specific rune (Not Implemented)`,
    },
    RandomRuneToken: {
      id: 75,
      min: 0,
      max: 5,
      description: `Random exchange target: {value} (Not Implemented)`,
    },
    SetBonusItems: {
      id: 76,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield`,
    },
    TwoItemSetBonus: {
      id: 77,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield`,
    },
    ThreeItemSetBonus: {
      id: 78,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield`,
    },
    FourItemSetBonus: {
      id: 79,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield`,
    },
    FiveItemSetBonus: {
      id: 80,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield`,
    },
    GuildTreasuryYieldBonus: {
      id: 81,
      min: 0,
      max: 100,
      description: `{value}% yield bonus, sent to guild treasury (Not Implemented)`,
    },
    HarvestToTreasury: {
      id: 82,
      min: 0,
      max: 100,
      description: `{value}% of harvest sent to guild treasury (Not Implemented)`,
    },
    GuildTreasuryAccessKey: {
      id: 83,
      min: 1,
      max: 1,
      description: `Ability to sign guild treasury transactions (Not Implemented)`,
    },
    KarmicInfluence: {
      id: 85,
      min: -1,
      max: 1,
      description: `Sway a pool or farm toward your alignment, receiving a bonus when it matches (Not Implemented)`,
    },
    VestingUnequipLock: {
      id: 86,
      min: 0,
      max: 999,
      description: `Can not unequip Runeword until vested payouts have completed (Not Implemented)`,
    },
    RaidUnequipLockOnStake: {
      id: 87,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield (Not Implemented)`,
    },
    AttributeUnlockOnEquipTime: {
      id: 89,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield (Not Implemented)`,
    },
    AttributeUnlockOnConsecutiveEquipTime: {
      id: 90,
      min: 0,
      max: 5,
      description: `{value}% increased chance to critically harvest yield (Not Implemented)`,
    },
  } as const

export const ItemAttributesById: {[k: number]: ItemAttributeDefinition} = Object.entries(ItemAttributes).reduce((acc, [k, v]) => ({...acc, [v.id]: v}), {})


export type ItemAttributeDefinition = {
    description: string;
    id: number;
    max: number;
    min: number;
    map?: {
      [k: string]: string | number
    };
}

export type ItemAttribute = ItemAttributeDefinition & {
  attributeId: number;
  value: number;
  variant: number;
    
}
