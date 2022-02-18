import React from "react";
import { MouseEventHandler } from "react";
export type GameStatus = "active" | "completed" | "expired";

interface Owner {
  address: string;
  realmsHeld: Number;
  bridgedRealmsHeld: Number;
}

export interface Realm {
  id: String;
  resourceIds: Array<String>;
  order: String;
  wonder: String;
  cities: Number;
  harbours: Number;
  rivers: Number;
  regions: Number;
  name: String;
  rarityScore: Number;
  rarityRank: Number;
  currentOwner: Owner;
}

export interface Data {
  realm: Realm;
}

export interface RealmProps {
  realm: Realm;
  loading: boolean;
  size?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export interface WalletRealmsData {
  realms: Realm[];
  bridgedRealms: Realm[]
  wallet: Owner;
}

export interface UiState {
  isMenuOpen: boolean;
  toggleMenu: Function;
}

export interface TowerProps {
  gameStatus: GameStatus;
  gameIdx?: number;
  currentBoostBips?: number;
  children?: React.ReactNode[] | React.ReactNode;
}

export interface RealmFilters {
  address?: string;
  resources?: number[]
  orders?: string[];
  first?: number,
  skip?: number,
  orderBy?: string,
  orderDirection?: string,
}