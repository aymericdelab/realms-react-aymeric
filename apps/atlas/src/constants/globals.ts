/* eslint-disable @typescript-eslint/naming-convention */

// Baseline square meter for building capacity calculations.

export enum RealmBuildingsSize {
  House = 4,
  StoreHouse = 2,
  Granary = 3,
  Farm = 3,
  FishingVillage = 3,
  Barracks = 16,
  MageTower = 16,
  ArcherTower = 16,
  Castle = 16,
}

export enum RealmBuildingId {
  House = 1,
  StoreHouse = 2,
  Granary = 3,
  Farm = 4,
  FishingVillage = 5,
  Barracks = 6,
  MageTower = 7,
  ArcherTower = 8,
  Castle = 9,
}

const barracks = '/realm-buildings/castle.png';

export const buildingImageById = (id: RealmBuildingId) => {
  let name = 'n/a';
  switch (id) {
    case RealmBuildingId.House:
      name = '/realm-buildings/storehouse.jpg';
      break;
    case RealmBuildingId.StoreHouse:
      name = '/realm-buildings/storehouse.jpg';
      break;
    case RealmBuildingId.Granary:
      name = barracks;
      break;
    case RealmBuildingId.Farm:
      name = '/realm-buildings/farm.jpg';
      break;
    case RealmBuildingId.FishingVillage:
      name = '/realm-buildings/mj_fishing_village.png';
      break;
    case RealmBuildingId.Barracks:
      name = '/realm-buildings/barracks.jpg';
      break;
    case RealmBuildingId.MageTower:
      name = '/realm-buildings/mageTower.jpg';
      break;
    case RealmBuildingId.ArcherTower:
      name = '/realm-buildings/archerTower.jpg';
      break;
    case RealmBuildingId.Castle:
      name = '/realm-buildings/castle.jpg';
      break;
  }
  return name;
};

export const buildingIdToString = (id: RealmBuildingId) => {
  let name = 'n/a';
  switch (id) {
    case RealmBuildingId.House:
      name = 'House';
      break;
    case RealmBuildingId.StoreHouse:
      name = 'Store House';
      break;
    case RealmBuildingId.Granary:
      name = 'Granary';
      break;
    case RealmBuildingId.Farm:
      name = 'Farm';
      break;
    case RealmBuildingId.FishingVillage:
      name = 'Fishing Village';
      break;
    case RealmBuildingId.Barracks:
      name = 'Barracks';
      break;
    case RealmBuildingId.MageTower:
      name = 'Mage Tower';
      break;
    case RealmBuildingId.ArcherTower:
      name = 'Archer Tower';
      break;
    case RealmBuildingId.Castle:
      name = 'Castle';
      break;
  }
  return name;
};

export const buildingIntegrity = (id: RealmBuildingId) => {
  let name = 0;
  switch (id) {
    case RealmBuildingId.House:
      name = 3 * DAY;
      break;
    case RealmBuildingId.Barracks:
      name = 7 * DAY;
      break;
    case RealmBuildingId.MageTower:
      name = 7 * DAY;
      break;
    case RealmBuildingId.ArcherTower:
      name = 7 * DAY;
      break;
    case RealmBuildingId.Castle:
      name = 7 * DAY;
      break;
  }
  return name;
};

export enum HarvestType {
  Export = 1,
  Store = 2,
}

export const BASE_SQM = 100;
export const MAX_DAYS_ACCURED = 3;
export const BASE_RESOURCES_PER_DAY = 252;

export const BASE_RESOURCES_PER_CYCLE = BASE_RESOURCES_PER_DAY / 12;

export const WONDER_RATE = BASE_RESOURCES_PER_DAY / 10;

export const VAULT_LENGTH = 4;
export const DAY = 86400;
export const VAULT_LENGTH_SECONDS = VAULT_LENGTH * DAY;

export const HAPPINESS_TIME_PERIOD_TICK = DAY / 2;

export const ARMY_DESERTION_DAMAGE = 150;

export const BASE_LORDS_PER_DAY = 25;

export const WORK_HUT_COST_IN_BP = 5;
export const WORK_HUT_COST = 75;
export const WORK_HUT_OUTPUT = 50;

export const PILLAGE_AMOUNT = 25;

export const STORE_HOUSE_SIZE = 650000;

export const BASE_HARVESTS = 24;
export const MAX_HARVESTS = BASE_HARVESTS / 4;
export const HARVEST_LENGTH = DAY / 10;

export const FARM_LENGTH = (DAY / 3) * BASE_HARVESTS;
export const FISHING_TRAPS = (DAY / 3) * BASE_HARVESTS;
export const BASE_FOOD_PRODUCTION = 14000;

export const FISH_ID = 10001;
export const WHEAT_ID = 10000;

export const SECONDS_PER_KM = 200;

export const BASE_HAPPINESS = 100;

// Happiness loss effects
export const NO_RELIC_LOSS = 12;
export const NO_FOOD_LOSS = 5;
export const NO_DEFENDING_ARMY_LOSS = 5;

// number of potentially random events
export const NUMBER_OF_RANDOM_EVENTS = 9;

export const MAX_BATTALIONS = 30;

export const ATTACK_COOLDOWN_PERIOD = DAY / 10;

export const BASE_LABOR_UNITS = DAY / 12;

export enum RealmBuildingIntegrity {
  House = 3 * DAY,
  StoreHouse = 2000,
  Granary = 2000,
  Farm = 2000,
  FishingVillage = 2000,
  Barracks = 7 * DAY,
  MageTower = 7 * DAY,
  ArcherTower = 7 * DAY,
  Castle = 7 * DAY,
}

export const buildingPopulation = (id: RealmBuildingId) => {
  let pop = 0;
  switch (id) {
    case RealmBuildingId.House:
      pop = 12;
      break;
    case RealmBuildingId.Barracks:
      pop = 5;
      break;
    case RealmBuildingId.MageTower:
      pop = 5;
      break;
    case RealmBuildingId.ArcherTower:
      pop = 5;
      break;
    case RealmBuildingId.Castle:
      pop = 5;
      break;
  }
  return pop;
};

export enum RealmHappinessImages {
  Abundant = '/realm/happiness/abundance.jpg',
  Average = '/realm/happiness/average.png',
  Unhappy = '/realm/happiness/unhappy.jpg',
}

export const RelicImage = '/mj_relic.png';

export enum CombatImages {
  win = '/combat/win.jpg',
  loss = '/combat/loss.jpg',
}