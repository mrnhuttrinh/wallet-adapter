import Web3 from 'web3';
import {Contract} from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import Logger from '../utils/logger';
import { IAdapterBase, IChain, IEVMConfig } from '../types';
import axios from 'axios';

class MetamaskAdapter implements IAdapterBase {
  private name = 'Metamask';
  private provider: Web3;
  private chainList: IChain[] = [];
  public extensionInstallUrl = 'https://metamask.io/download/';
  private config?: IEVMConfig;
  public connectedAddress?: string;

  constructor(_config: IEVMConfig) {
    Logger.log(this.name, 'constructor start');
    this.config = _config;
    this.provider = new Web3(Object(window).ethereum);
    try {
      this.getChainListInfo();
      this.registerAccountChanged();
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

  private createContract(abi: AbiItem[], contractAddress: string): Contract {
    try {
      Logger.log(this.name, 'createContract start');
      return new this.provider.eth.Contract(abi as AbiItem[], contractAddress);
    } catch (e) {
      Logger.log(this.name, 'createContract error', e);
      throw e;
    } finally {
      Logger.log(this.name, 'createContract end');
    }
  }

  private handleAccountChanged(accounts: string[]): void {
    Logger.log(this.name, 'handleAccountChanged start');
    try {
      Logger.log(this.name, 'handleAccountChanged change', accounts);
      this.connectedAddress = accounts[0];
    } catch (e) {
      Logger.log(this.name, 'handleAccountChanged error', e);
    } finally {
      Logger.log(this.name, 'createConthandleAccountChangedract end');
    }
  }

  public registerAccountChanged(handler?: unknown): void {
    if (Object(window).ethereum) {
      if (handler) {
        Object(window).ethereum.on('accountsChanged', handler);
      } else {
        Object(window).ethereum.on('accountsChanged', this.handleAccountChanged);
      }
    }
  }

  public removeAccountChanged(handler?: unknown): void {
    if (Object(window).ethereum) {
      if (handler) {
        Object(window).ethereum.removeListener('accountsChanged', handler);
      } else {
        Object(window).ethereum.removeListener('accountsChanged', this.handleAccountChanged);
      }
    }
  }

  private handleChainChanged(chainId: string): void {
    Logger.log(this.name, 'handleChainChanged start');
    try {
      Logger.log(this.name, 'handleChainChanged changed', chainId);
    } catch (e) {
      Logger.log(this.name, 'handleChainChanged error', e);
    } finally {
      Logger.log(this.name, 'handleChainChanged end');
    }
  }

  public registerChainChanged(handler?: unknown): void {
    if (Object(window).ethereum) {
      if (handler) {
        Object(window).ethereum.on('chainChanged', handler);
      } else {
        Object(window).ethereum.on('chainChanged', this.handleChainChanged);
      }
    }
  }

  public removeChainChanged(handler?: unknown): void {
    if (Object(window).ethereum) {
      if (handler) {
        Object(window).ethereum.removeListener('chainChanged', handler);
      } else {
        Object(window).ethereum.removeListener('chainChanged', this.handleChainChanged);
      }
    }
  }

  private handleDisconnect(error: unknown): void {
    Logger.log(this.name, 'handleDisconnect start');
    Logger.log(this.name, 'handleDisconnect end');
  }

  public registerDisconnect(handler?: unknown): void {
    if (Object(window).ethereum) {
      if (handler) {
        Object(window).ethereum.on('disconnect', handler);
      } else {
        Object(window).ethereum.on('disconnect', this.handleDisconnect);
      }
    }
  }
}

export default MetamaskAdapter;