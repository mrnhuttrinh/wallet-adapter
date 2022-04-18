import { PublicKey, Transaction, Connection, clusterApiUrl } from '@solana/web3.js';
import * as bs58 from 'bs58';

import { IAdapterBase, ISolanaConfig } from '../types';
import Logger from '../utils/logger';

type DisplayEncoding = 'utf8' | 'hex';
type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged';
type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}


class PhantomAdapter implements IAdapterBase {
  private name = 'Phantom';
  private provider: PhantomProvider | undefined;
  private connection?: Connection;
  public extensionInstallUrl = 'https://phantom.app/';
  private config?: ISolanaConfig;

  public connectedAddress?: string;

  constructor(_config: ISolanaConfig) {
    try {
      Logger.log(this.name, 'constructor start');
      this.config = _config;
      this.provider = this.getProvider();
      this.connection = new Connection(clusterApiUrl(_config.solanaNetwork));
      Logger.log(this.name, 'constructor successed');
    } catch (e) {
      Logger.log(this.name, 'constructor error', e);
    } finally {
      Logger.log(this.name, 'constructor end');
    }
  }

  private getProvider = (): PhantomProvider | undefined => {
    if ('solana' in window) {
      const provider = Object(window).solana as any;
      if (provider.isPhantom) return provider as PhantomProvider;
    }
  };

  public get isInstalled(): boolean {
    try {
      return Object(window).solana && Object(window).solana.isPhantom;
    } catch (e) {
      Logger.log('ERROR', e);
      return false;
    }
  }

  public get isConnected(): boolean {
    try {
      return Object(window).solana.isConnected();
    } catch (e) {
      Logger.log('ERROR', e);
      return false;
    }
  }

  /**
   * Connect to the wallet and get an account
   * @returns account in wallet
   */
  public async connect(): Promise<void> {
    try {
      Logger.log(this.name, 'connect start');
      const solana = Object(window).solana;
      const addresses = await solana.request({
        method: 'eth_requestAccounts',
        params: [{
          eth_accounts: {}
        }]
      });
      this.connectedAddress = addresses[0];
      Logger.log(this.name, 'connect success', this.connectedAddress);
    } catch (e) {
      Logger.log(this.name, 'error end', e);
      throw e;
    } finally {
      Logger.log(this.name, 'connect end');
    }
  }
}

export default PhantomAdapter;