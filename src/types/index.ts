import { Cluster } from '@solana/web3.js';
import { AbiItem } from 'web3-utils';

export interface IAdapterBase {
  connect(): Promise<unknown>;
  extensionInstallUrl: string;
  isInstalled: boolean;
  isConnected: boolean;
  connectedAddress?: string;
  // linkWalletToUser(logData: unknown): Promise<unknown>;
  // requestDisconnectAddress(walletAddress: string): Promise<boolean>;
  // mintEnvironmentNFT(rock: unknown, logData: unknown): Promise<unknown>;
  // buyNFTs(nftSell: unknown, logData: unknown): Promise<unknown>;
  // publishTicket(rock: unknown, payload: unknown, logData: unknown): Promise<unknown>;
  // buyTicket(environmentId: string): Promise<unknown>;
}

export interface IWalletContext {
  connect(type: WalletTypeEnum): Promise<void>;
  extensionInstallUrl(type: WalletTypeEnum): string | undefined;
  isInstalled(type: WalletTypeEnum): boolean;
  isConnected(type: WalletTypeEnum): boolean;
  connectedAddress(type: WalletTypeEnum): string | undefined;
  // linkWalletToUser(logData: unknown): Promise<unknown>;
  // requestDisconnectAddress(walletAddress: string): Promise<boolean>;
  // mintEnvironmentNFT(rock: unknown, logData: unknown): Promise<unknown>;
  // buyNFTs(nftSell: unknown, logData: unknown): Promise<unknown>;
  // publishTicket(rock: unknown, payload: unknown, logData: unknown): Promise<unknown>;
  // buyTicket(environmentId: string): Promise<unknown>;
}

export enum WalletTypeEnum {
  EVM = 0,
  SOLANA = 1
}

export enum WalletNetworkEnum {
  EVM = 'EVM',
  SOLANA = 'SOLANA'
}

export interface ISolanaConfig {
  solanaNetwork: Cluster;
  solanaRpcHost: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEVMConfig {
  //
}


export interface IAPIConfig {
  apiBaseUrl: string;
  appVersion: string;
  accessTokenStorageKey: string;
  refreshTokenStorageKey: string;
}

export interface IUserWallet {
  id: string;
  userId: string;
  address: string;
  type: WalletTypeEnum;
}

export interface IWalletByType {
  [key: number]: IUserWallet[];
}
export interface IWalletProvider {
  children: any;
  solanaConfig: ISolanaConfig;
  evmConfig: IEVMConfig;
  apiConfig: IAPIConfig;
  userWallets: IWalletByType;
}


export interface IExplore {
  name: string;
  standard: string;
  url: string;
}

export interface INativeCurrency {
  decimals: number;
  name: string;
  symbol: string;
}

export interface IEns {
  registry: string;
}

export interface IChain {
  name: string;
  chain: string;
  icon: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: INativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44: number;
  ens: IEns;
  explorers: IExplore[];
}