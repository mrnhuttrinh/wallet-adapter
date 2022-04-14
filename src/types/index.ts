export interface IAdapterBase {
  connect(): Promise<unknown>;
  // linkWalletToUser(logData: unknown): Promise<unknown>;
  // requestDisconnectAddress(walletAddress: string): Promise<boolean>;
  // mintEnvironmentNFT(rock: unknown, logData: unknown): Promise<unknown>;
  // buyNFTs(nftSell: unknown, logData: unknown): Promise<unknown>;
  // publishTicket(rock: unknown, payload: unknown, logData: unknown): Promise<unknown>;
  // buyTicket(environmentId: string): Promise<unknown>;
}

export interface IWalletContext {
  connect(type: WalletTypeEnum): Promise<void>;
  isInstalled(type: WalletTypeEnum): boolean;
  isConnected(type: WalletTypeEnum): boolean;
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

export interface IWalletProvider {
  children: any;
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