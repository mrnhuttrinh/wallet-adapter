import Web3 from 'web3';
import Logger from '../utils/logger';
import { IAdapterBase } from '../types';

class PhantomAdapter implements IAdapterBase {
  private name = 'Phantom';
  private provider?: Web3;

  public connectedAddress?: string;

  constructor() {
    try {
      Logger.log(this.name, 'constructor start');
      this.provider = new Web3(Object(window).ethereum);
      Logger.log(this.name, 'constructor successed');
    } catch (e) {
      Logger.log(this.name, 'constructor error', e);
    } finally {
      Logger.log(this.name, 'constructor end');
    }
  }

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

const adapter = new PhantomAdapter();
export default adapter;