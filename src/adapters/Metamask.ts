import Web3 from 'web3';
import Logger from '../utils/logger';
import { IAdapterBase, IChain } from '../types';
import axios from 'axios';

class MetamaskAdapter implements IAdapterBase {
  private name = 'Metamask';
  private provider?: Web3;
  private chainList: IChain[] = [];
  public extensionInstallUrl = 'https://metamask.io/download/';

  public connectedAddress?: string;

  constructor() {
    try {
      Logger.log(this.name, 'constructor start');
      this.provider = new Web3(Object(window).ethereum);
      this.getChainListInfo();
      Logger.log(this.name, 'constructor successed');
    } catch (e) {
      Logger.log(this.name, 'constructor error', e);
    } finally {
      Logger.log(this.name, 'constructor end');
    }
  }

  private async getChainListInfo(): Promise<void> {
    try {
      Logger.log(this.name, 'getChainListInfo start');
      const res = await axios.get('https://chainid.network/chains.json');

      if (res.data) {
        this.chainList = res.data;
      }
      Logger.log(this.name, 'getChainListInfo successed', this.chainList);
    } catch (e) {
      Logger.log(this.name, 'getChainListInfo error', e);
    } finally {
      Logger.log(this.name, 'getChainListInfo end');
    }
  }

  public get isInstalled(): boolean {
    try {
      return Object(window).ethereum.isMetaMask;
    } catch (e) {
      Logger.log('ERROR', e);
      return false;
    }
  }

  public get isConnected(): boolean {
    try {
      return Object(window).ethereum.isConnected();
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
      const ethereum = Object(window).ethereum;
      const addresses = await ethereum.request({
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

export default MetamaskAdapter;