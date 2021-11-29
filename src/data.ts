
import { ItemAttribute, ItemAttributes } from "./attributes";
import { Category, ItemCategoriesType, ItemsMainCategoriesType } from "./categories";
import { Rune, RuneID, RuneId, RuneNames } from "./runes";
import { ItemSlot, ItemSlotID } from "./slots";
import { ItemType } from "./type";


export type BranchKey = "1" | "2" | "3" | "4";
export type ItemDistribution = "Crafted" | "Retired";
export type ItemMaxSupply = "Unknown" | number
export type Percentage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
export type ItemTypeID = number

export type ItemBranch = {
  attributes: ItemAttribute[];
  description: string | string[];
}

export type RunewordDetails = {
  Date: string;
  Distribution: ItemDistribution;
  "Max Supply": ItemMaxSupply;
  "Rune Word": string;
  Subtype: string;
  Type: string;
}

export type RuneDetails = {
  Symbol: Rune;
  Distribution?: string;
  Date?: string;
  'Max Supply'?: string;
  'Planned Distribution'?: string;
  'Planned Date'?: string;
  'Planned Max Supply'?: string;
  Reward?: string;
};

export type RecipeRequirement = {
  id: RuneID;
  quantity: number;
}

export type ItemDefinition<D = undefined> = {
  attributes: ItemAttribute[];
  branches: {
      [k in BranchKey]: ItemBranch
  } | {};
  description?: string | string[];
  category: Category;
  icon: string;
  id: number;
  isCraftable: boolean;
  isEquipable: boolean;
  isNew: boolean;
  isTradeable: boolean;
  isTransferable: boolean;
  value: string;
  name: string;
  details: D;
}

export type RunewordDefinition = ItemDefinition<RunewordDetails> & {
  isDisabled: boolean;
  isRetired: boolean;
  isUnequipable: boolean;
  isUpgradable: boolean;
  isRuneword: boolean;
  recipe: {
    requirement: RecipeRequirement[]
    name?: string;
  };
  createdDate: number;
  slots: ItemSlotID[];
  hotness: number;
  type: ItemTypeID;
}

export type RuneDefinition = ItemDefinition<RuneDetails> & {
  isDisabled?: boolean
}

export type ItemData = {
  [ItemsMainCategoriesType.OTHER]: RunewordDefinition[];
  [ItemsMainCategoriesType.RUNES]: RuneDefinition[];
  [ItemsMainCategoriesType.WEAPONS]: ItemDefinition[];
  [ItemsMainCategoriesType.SHIELDS]: ItemDefinition[];
  [ItemsMainCategoriesType.ARMORS]: ItemDefinition[];
}
export const itemData: ItemData = {
    [ItemsMainCategoriesType.OTHER]: [
      {
        id: 1,
        name: 'Steel',
        category: ItemCategoriesType.WEAPON,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/items/00001.png',
        value: '0',
        type: ItemType.OneHandedWeapon,
        slots: [ItemSlot.LeftHand, ItemSlot.RightHand],
        isNew: false,
        isEquipable: true,
        isUnequipable: false,
        isTradeable: true,
        isTransferable: true,
        isUpgradable: true,
        isCraftable: false,
        isDisabled: false,
        isRuneword: true,
        isRetired: true,
        createdDate: 0,
        hotness: 6,
        attributes: [],
        details: {
          Type: 'One-Handed Sword',
          Subtype: 'Night Blade',
          'Rune Word': 'Tir El',
          Distribution: 'Crafted',
          Date: 'April 20, 2021 - June 4, 2021',
          'Max Supply': 'Unknown',
        },
        recipe: {
          requirement: [
            { id: RuneId.TIR, quantity: 1 },
            { id: RuneId.EL, quantity: 1 },
          ],
        },
        branches: {
          1: {
            description: ['Made by Men, this blade is common but has minimal downsides.'],
            attributes: [
              { ...ItemAttributes.HarvestYield, min: 5, max: 15 },
              { ...ItemAttributes.HarvestFee, min: 0, max: 5 },
              {
                ...ItemAttributes.HarvestFeeToken,
                min: RuneId.EL,
                max: RuneId.TIR,
                map: RuneNames,
              },
              // { ...ItemAttributes.Sockets, value: 2, min: 2, max: 2 },
            ],
            perfection: [15, 0],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: 'Made by Men, this blade is common but has minimal downsides.',
            attributes: [
              { id: 1, min: 16, max: 20, description: `{value}% Increased Attack Speed` },
              { id: 3, min: 6, max: 8, description: `{value}% Less Damage` },
              { id: 4, min: 81, max: 100, description: `{value} Increased Maximum Rage` },
              { id: 5, min: 3, max: 5, description: `{value} Increased Elemental Resists` },
              { id: 7, min: 3, max: 5, description: `{value} Increased Minion Attack Speed` },
              { id: 8, value: 3, description: `{value} Increased Light Radius` },
            ],
          },
        },
      },
     
    ],
    [ItemsMainCategoriesType.RUNES]: [
      {
        id: 1,
        name: 'El Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/EL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        description: ["An ancient rune used in magical craft. It's #1 in the Rune Codex."],
        details: {
          Symbol: 'EL',
          Distribution: 'Farmed',
          Date: 'April 2, 2021 - April 9, 2021',
          'Max Supply': 'Burned to 40,000',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #1 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 2,
        name: 'Eld Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/ELD.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        description: ["An ancient rune used in magical craft. It's #2 in the Rune Codex."],
        details: {
          Symbol: 'ELD',
          Distribution: 'Airdropped on RUNE characters',
          Date: 'April 10, 2021',
          'Max Supply': '40,000',
          Reward: '57 ELD',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #2 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 3,
        name: 'Tir Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/TIR.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        description: ["An ancient rune used in magical craft. It's #3 in the Rune Codex."],
        details: {
          Symbol: 'TIR',
          'Planned Distribution': 'farmed',
          'Planned Date': 'April 11, 2021 - April 16, 2021',
          'Planned Max Supply': 'Burned to 50,000',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #3 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 4,
        name: 'Nef Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/NEF.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        description: ["An ancient rune used in magical craft. It's #4 in the Rune Codex."],
        details: {
          Symbol: 'NEF',
          'Planned Distribution': 'Farmed by RUNE characters',
          'Planned Date': 'April 20, 2021 - April 26, 2021',
          'Planned Max Supply': 'Burned to 50,000',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #4 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 5,
        name: 'Eth Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/ETH.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #5 in the Rune Codex."],
        details: {
          Symbol: 'ETH',
          'Planned Distribution': 'Airdropped on TIR holders',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBD',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #5 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 6,
        name: 'Ith Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/ITH.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #6 in the Rune Codex."],
        details: {
          Symbol: 'ITH',
          'Planned Distribution': 'Farmed',
          'Planned Date': 'April 26, 2021 - May 3, 2021',
          'Planned Max Supply': 'Burned to 50,000',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #6 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 7,
        name: 'Tal Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/TAL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #7 in the Rune Codex."],
        details: {
          Symbol: 'TAL',
          'Planned Distribution': 'Farmed',
          'Planned Date': 'May 3, 2021 - May 10, 2021',
          'Planned Max Supply': 'Burned to 50,000',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #7 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 8,
        name: 'Ral Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/RAL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #8 in the Rune Codex."],
        details: {
          Symbol: 'RAL',
          'Planned Distribution': 'Farmed',
          'Planned Date': 'May 10, 2021 - May 17, 2021',
          'Planned Max Supply': 'Burned to 50,000',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #8 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 9,
        name: 'Ort Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/ORT.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #9 in the Rune Codex."],
        details: {
          Symbol: 'ORT',
          'Planned Distribution': 'Farmed',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #9 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 10,
        name: 'Thul Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/THUL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #10 in the Rune Codex."],
        details: {
          Symbol: 'THUL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #10 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 11,
        name: 'Amn Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/AMN.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #11 in the Rune Codex."],
        details: {
          Symbol: 'AMN',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #11 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 12,
        name: 'Sol Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/SOL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #12 in the Rune Codex."],
        details: {
          Symbol: 'SOL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #12 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 13,
        name: 'Shael Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/SHAEL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #13 in the Rune Codex."],
        details: {
          Symbol: 'SHAEL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #13 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 14,
        name: 'Dol Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/DOL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #14 in the Rune Codex."],
        details: {
          Symbol: 'DOL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #14 in the Rune Codex."],
            attributes: [],
          },
          4: {
            description: ["An ancient rune used in magical craft. It's #14 in the Rune Codex."],
            attributes: [],
          },
        },
      },
      {
        id: 15,
        name: 'Hel Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/HEL.png',
        value: '0',
        isNew: true,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #15 in the Rune Codex."],
        details: {
          Symbol: 'HEL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #15 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 16,
        name: 'Io Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/IO.png',
        value: '0',
        isNew: true,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #16 in the Rune Codex."],
        details: {
          Symbol: 'IO',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #16 in the Rune Codex."],
            attributes: [],
          },
          4: {
            description: ["An ancient rune used in magical craft. It's #16 in the Rune Codex."],
            attributes: [],
          },
        },
      },
      {
        id: 17,
        name: 'Lum Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/LUM.png',
        value: '0',
        isNew: true,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #17 in the Rune Codex."],
        details: {
          Symbol: 'LUM',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #17 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 18,
        name: 'Ko Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/KO.png',
        value: '0',
        isNew: true,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #18 in the Rune Codex."],
        details: {
          Symbol: 'KO',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #18 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 19,
        name: 'Fal Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/FAL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #19 in the Rune Codex."],
        details: {
          Symbol: 'FAL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #19 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 20,
        name: 'Lem Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/LEM.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #20 in the Rune Codex."],
        details: {
          Symbol: 'LEM',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #20 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 21,
        name: 'Pul Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/PUL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #21 in the Rune Codex."],
        details: {
          Symbol: 'PUL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #21 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 22,
        name: 'Um Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/UM.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #22 in the Rune Codex."],
        details: {
          Symbol: 'UM',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #22 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 23,
        name: 'Mal Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/MAL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #23 in the Rune Codex."],
        details: {
          Symbol: 'MAL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #23 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 24,
        name: 'Ist Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/IST.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #24 in the Rune Codex."],
        details: {
          Symbol: 'IST',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #24 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 25,
        name: 'Gul Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/GUL.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #25 in the Rune Codex."],
        details: {
          Symbol: 'GUL',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #25 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 26,
        name: 'Vex Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/VEX.png',
        value: '0',
        isNew: true,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #26 in the Rune Codex."],
        details: {
          Symbol: 'VEX',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #26 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 27,
        name: 'Ohm Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/OHM.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #27 in the Rune Codex."],
        details: {
          Symbol: 'OHM',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #27 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 28,
        name: 'Lo Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/LO.png',
        value: '0',
        isNew: true,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #28 in the Rune Codex."],
        details: {
          Symbol: 'LO',
          'Planned Distribution': 'Farming',
          'Planned Date': 'August 25, 2021',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #28 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['Stake to access storage trunks across world.'],
            attributes: [],
          },
        },
      },
      {
        id: 29,
        name: 'Sur Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/SUR.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #29 in the Rune Codex."],
        details: {
          Symbol: 'SUR',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #29 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 30,
        name: 'Ber Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/BER.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #30 in the Rune Codex."],
        details: {
          Symbol: 'BER',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #30 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 31,
        name: 'Jah Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/JAH.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #31 in the Rune Codex."],
        details: {
          Symbol: 'JAH',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #31 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 32,
        name: 'Cham Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/CHAM.png',
        value: '0',
        isNew: false,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: true,
        description: ["An ancient rune used in magical craft. It's #32 in the Rune Codex."],
        details: {
          Symbol: 'CHAM',
          'Planned Distribution': 'TBA',
          'Planned Date': 'TBA',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #32 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
      {
        id: 33,
        name: 'Zod Rune',
        category: ItemCategoriesType.RUNE,
        icon: process.env.REACT_APP_PUBLIC_URL + 'images/new-runes/ZOD.png',
        value: '0',
        isNew: true,
        isEquipable: false,
        isTradeable: true,
        isTransferable: false,
        isCraftable: true,
        attributes: [],
        isDisabled: false,
        description: ["An ancient rune used in magical craft. It's #33 in the Rune Codex."],
        details: {
          Symbol: 'ZOD',
          'Planned Distribution': 'Arena Battles',
          'Planned Date': 'July 4, 2021',
          'Planned Max Supply': 'TBA',
        },
        branches: {
          1: {
            description: ["An ancient rune used in magical craft. It's #33 in the Rune Codex."],
            attributes: [],
          },
          2: {
            description: ['To be announced.'],
            attributes: [],
          },
          3: {
            description: ['To be announced.'],
            attributes: [],
          },
          4: {
            description: ['To be announced.'],
            attributes: [],
          },
        },
      },
    ],
    [ItemsMainCategoriesType.WEAPONS]: [
      // {
      //   name: "Swiftoak's Relic",
      //   category: ItemCategoriesType.WEAPON,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/weapons/BotW_Tree_Branch_Icon.png',
      //   value: '2',
      //   isNew: true,
      //   description:
      //     "These branches look common, but it's surprisingly rare relics of the once powerful Swiftoak ent. It doesn't do much damage but could be useful in powerful arcane recipes.",
      // },
      // {
      //   name: 'Etherwarp Blade',
      //   category: ItemCategoriesType.WEAPON,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/weapons/BotW_Ancient_Short_Sword_Icon.png',
      //   value: '40',
      //   description:
      //     'The blade of this sword was made using an ancient power lost to this modern age. Its blade appears only when drawn, and its cutting power surpasses known modern age swords.',
      // },
      // {
      //   name: 'Dragonhollow',
      //   category: ItemCategoriesType.WEAPON,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/weapons/BotW_Dragonbone_Boko_Club_Icon.png',
      //   value: '24',
      //   isNew: true,
      //   description:
      //     'The Dragonhollow club has been reinforced with fossilized bones to maximize clobbering potential. Only the brawniest of Cordema druids can manage its immense weight.',
      // },
      // {
      //   name: 'Feathered Edge',
      //   category: ItemCategoriesType.WEAPON,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/weapons/BotW_Feathered_Edge_Icon.png',
      //   value: '15',
      //   description:
      //     'Rito craftsmen forged this lightweight, double-edge sword so Rito warriors could soar into battle unhindered by its weight.',
      // },
      // {
      //   name: 'Flameblade',
      //   category: ItemCategoriesType.WEAPON,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/weapons/BotW_Flameblade_Icon.png',
      //   value: '24',
      //   description:
      //     'This magical sword was forged in the lava of Death Mountain. It leaves white-hot flames in its wake when the blade glows red.',
      // },
      // {
      //   name: 'Broadsword',
      //   category: ItemCategoriesType.WEAPON,
      //   isNew: true,
      //   icon: process.env.REACT_APP_PUBLIC_URL + "items/weapons/BotW_Soldier's_Broadsword_Icon.png",
      //   value: '14',
      //   description:
      //     'A sword brandished by the soldiers who once protected Hyrule Castle. Its durable blade is well tuned for slaying monsters.',
      // },
      // {
      //   name: 'Claymore',
      //   category: ItemCategoriesType.WEAPON,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/weapons/BotW_Royal_Claymore_Icon.png',
      //   value: '52',
      //   description:
      //     "A two-handed sword issued to the Hyrulean royal family's immediate guard detail. Its powerful strikes are said to crush an opponent's body and resolve alike.",
      // },
      // {
      //   name: 'Cloudstrike',
      //   category: ItemCategoriesType.WEAPON,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/weapons/BotW_Master_Sword_Icon.png',
      //   value: '30',
      //   description:
      //     'The legendary sword that seals the darkness. Its blade gleams with a sacred luster that can oppose the Calamity. Only a hero chosen by the sword itself may wield it.',
      // },
    ],
    [ItemsMainCategoriesType.SHIELDS]: [
      // {
      //   name: 'Wooden Shield',
      //   category: ItemCategoriesType.SHIELD,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/shields/BotW_Wooden_Shield_Icon.png',
      //   value: '2',
      //   description:
      //     'This lightweight, simple shield is ideal for less-experienced fighters. It can withstand light attacks, but blocking stronger blows is not recommended.',
      // },
      // {
      //   name: 'Buckler',
      //   category: ItemCategoriesType.SHIELD,
      //   icon: process.env.REACT_APP_PUBLIC_URL + "items/shields/BotW_Traveler's_Shield_Icon.png",
      //   value: '4',
      //   description:
      //     'A sturdy shield loved by many an adventurer. It is made of animal hide and sturdy wood and is best suited to defending against weak monsters or animals.',
      // },
      // {
      //   name: 'Scutum',
      //   category: ItemCategoriesType.SHIELD,
      //   isNew: true,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/shields/BotW_Gerudo_Shield_Icon.png',
      //   value: '20',
      //   description:
      //     "The design of this metal shield has changed over time to match the Gerudo's sword-and-shield fighting style. It's favored by soldiers and travelers alike.",
      // },
      // {
      //   name: 'Ancient Shield',
      //   category: ItemCategoriesType.SHIELD,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/shields/BotW_Ancient_Shield_Icon.png',
      //   value: '70',
      //   description:
      //     'This shield was made using ancient Sheikah technology. Its surface glows blue when raised in defense. Enhanced functionality allows it to deflect Guardian beams.',
      // },
    ],
    [ItemsMainCategoriesType.ARMORS]: [
      // {
      //   name: 'Zora Helm',
      //   category: ItemCategoriesType.HELM,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Zora_Helm_Icon.png',
      //   value: '3',
      //   bonus: 'swimming',
      //   description: 'Zora headgear made from dragon scales. Increases swimming speed and allows you to use Spin Attack.',
      // },
      // {
      //   name: 'Zora Armor',
      //   category: ItemCategoriesType.ARMOR,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Zora_Armor_Icon.png',
      //   value: '3',
      //   bonus: 'swimming',
      //   description:
      //     "Custom armor painstakingly crafted by each generation's Zora princess for her future husband. Wearing it will give you the ability to swim up waterfalls.",
      // },
      // {
      //   name: 'Zora Greaves',
      //   category: ItemCategoriesType.GREAVE,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Zora_Greaves_Icon.png',
      //   value: '3',
      //   bonus: 'swimming',
      //   description:
      //     "These greave have been passed down among the Zora for generations. It's been said they're crafted using dragon scales. Equip them to swim faster.",
      // },
      // {
      //   name: "Climber's Bandanna",
      //   category: ItemCategoriesType.HELM,
      //   icon: process.env.REACT_APP_PUBLIC_URL + "items/armors/BotW_Climber's_Bandanna_Icon.png",
      //   value: '3',
      //   bonus: 'climbing',
      //   description:
      //     "It may look like a regular bandanna, but it's actually infused with ancient technology that enhances core strength to improve your climbing ability.",
      // },
      // {
      //   name: 'Climbing Gear',
      //   category: ItemCategoriesType.ARMOR,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Climbing_Gear_Icon.png',
      //   value: '3',
      //   bonus: 'climbing',
      //   description:
      //     'The ancient technology in this gear will make you a better climber. The special no-slip gloves help you use your energy more efficiently to facilitate nimble climbing.',
      // },
      // {
      //   name: 'Climbing Boots',
      //   category: ItemCategoriesType.GREAVE,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Climbing_Boots_Icon.png',
      //   value: '3',
      //   bonus: 'climbing',
      //   description:
      //     'These rock-climbing boots have special no-slip toes that help you cling to walls. This ancient technology facilitates more nimble climbing.',
      // },
      // {
      //   name: 'Flamebreaker Helm',
      //   category: ItemCategoriesType.HELM,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Flamebreaker_Helm_Icon.png',
      //   value: '3',
      //   bonus: 'fire',
      //   description:
      //     "Stone headgear made by Goron craftsmen to protect tourists visiting Goron City. As if its flame resistance isn't enough of a selling point, it also covers your entire head!",
      // },
      // {
      //   name: 'Flamebreaker Armor',
      //   category: ItemCategoriesType.ARMOR,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Flamebreaker_Armor_Icon.png',
      //   value: '3',
      //   bonus: 'fire',
      //   description:
      //     "Armor crafted by Gorons for Hylians curious enough to visit Goron City. It's made from fire-resistant rocks to protect the wearer.",
      // },
      // {
      //   name: 'Flamebreaker Boots',
      //   category: ItemCategoriesType.GREAVE,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Flamebreaker_Boots_Icon.png',
      //   value: '3',
      //   bonus: 'fire',
      //   description:
      //     'Goron artisans used flame-resistant rocks to craft these fireproof boots for curious Hylians visiting Goron City.',
      // },
      // {
      //   name: 'Cap of the Hero',
      //   category: ItemCategoriesType.HELM,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Cap_of_the_Hero_Icon.png',
      //   value: '3',
      //   bonus: 'normal',
      //   description:
      //     "According to legend, this cap was once treasured by an ancient hero. It's quite the simple cap, yet there's something about it that's just so appealing...",
      // },
      // {
      //   name: "Champion's Tunic",
      //   category: ItemCategoriesType.ARMOR,
      //   isNew: true,
      //   icon: process.env.REACT_APP_PUBLIC_URL + "items/armors/BotW_Champion's_Tunic_Icon.png",
      //   value: '5',
      //   bonus: 'normal',
      //   description:
      //     "In ancient Hyrule, this garment could only be worn by one who had earned the respect of the royal family. Equipping it will reveal an enemy's life gauge.",
      // },
      // {
      //   name: 'Hylian Trousers',
      //   category: ItemCategoriesType.GREAVE,
      //   isNew: true,
      //   icon: process.env.REACT_APP_PUBLIC_URL + 'items/armors/BotW_Hylian_Trousers_Icon.png',
      //   value: '3',
      //   bonus: 'normal',
      //   description:
      //     'Traditional dress trousers of Hyrule. The plush fabric makes these trousers quite comfortable, and their high durability makes them ideal for travelers.',
      // },
    ],
  }