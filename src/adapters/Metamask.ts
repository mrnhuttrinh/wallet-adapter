import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import Logger from '../utils/logger';
import { IAdapterBase, IChain } from '../types';
import axios from 'axios';

class MetamaskAdapter implements IAdapterBase {
  private name = 'Metamask';
  private provider?: Web3;
  private connectedAddress?: string;
  private chainList: IChain[] = [];

  constructor() {
    try {
      Logger.log(this.name, 'constructor start');
      this.provider = new Web3(Object(window).ethereum);
      this.getChainListInfn();
      Logger.log(this.name, 'constructor successed');
    } catch (e) {
      Logger.log(this.name, 'constructor error', e);
    } finally {
      Logger.log(this.name, 'constructor end');
    }
  }

  private async getChainListInfn(): Promise<void> {
    try {
      Logger.log(this.name, 'getChainListInfn start');
      const res = await axios.get('https://chainid.network/chains.json');

      if (res.data) {
        this.chainList = res.data
      }
      Logger.log(this.name, 'getChainListInfn successed', this.chainList);
    } catch (e) {
      Logger.log(this.name, 'getChainListInfn error', e);
    } finally {
      Logger.log(this.name, 'getChainListInfn end');
    }
  }

  // private createContract(abi: AbiItem[], contractAddress: string): Contract {
  //   try {
  //     Logger.log('MetamaskWalletService: getMetamaskSelectedAddress start', contractAddress);
  //     return new this.provider()?.eth.Contract(abi as AbiItem[], contractAddress);
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: getMetamaskSelectedAddress error', e);
  //     throw e;
  //   } finally {
  //     Logger.log('MetamaskWalletService: getMetamaskSelectedAddress end');
  //   }
  // }

  // private async getMetamaskSelectedAddress(): Promise < string > {
  //   try {
  //     Logger.log('MetamaskWalletService: getMetamaskSelectedAddress start');
  //     const ethereum = Object(window).ethereum;
  //     const addresses = await ethereum.request({
  //       method: 'eth_requestAccounts',
  //       params: [{
  //         eth_accounts: {}
  //       }]
  //     });
  //     Logger.log('MetamaskWalletService: getMetamaskSelectedAddress successed');
  //     return addresses[0];
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: getMetamaskSelectedAddress error: ', e);
  //     throw e;
  //   } finally {
  //     Logger.log('MetamaskWalletService: getMetamaskSelectedAddress end');
  //   }
  // }

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

  // private handleAccountChanged(accounts: string[]): void {
  //   Logger.log('MetamaskWalletService: metamask account changed event start');
  //   try {
  //     Logger.log('MetamaskWalletService: metamask account changed event', accounts);
  //     this._connectedAddress = accounts[0];
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: metamask account changed event error', e);
  //   }
  //   Logger.log('MetamaskWalletService: metamask account changed event end');
  // }

  // public registerAccountChanged(handler ? : any): void {
  //   if (Object(window).ethereum) {
  //     if (handler) {
  //       Object(window).ethereum.on('accountsChanged', handler);
  //     } else {
  //       Object(window).ethereum.on('accountsChanged', this.handleAccountChanged);
  //     }
  //   }
  // }

  // public removeAccountChanged(handler ? : any): void {
  //   if (Object(window).ethereum) {
  //     if (handler) {
  //       Object(window).ethereum.removeListener('accountsChanged', handler);
  //     } else {
  //       Object(window).ethereum.removeListener('accountsChanged', this.handleAccountChanged);
  //     }
  //   }
  // }

  // private handleChainChanged(chainId: string): void {
  //   Logger.log('MetamaskWalletService: metamask chain changed event start');
  //   try {
  //     Logger.log('MetamaskWalletService: metamask chain changed event', chainId);
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: metamask chain changed eventerror', e);
  //   }
  //   Logger.log('MetamaskWalletService: metamask chain changed end event');
  // }

  // public registerChainChanged(handler ? : any): void {
  //   if (Object(window).ethereum) {
  //     if (handler) {
  //       Object(window).ethereum.on('chainChanged', handler);
  //     } else {
  //       Object(window).ethereum.on('chainChanged', this.handleChainChanged);
  //     }
  //   }
  // }

  // public removeChainChanged(handler ? : any): void {
  //   if (Object(window).ethereum) {
  //     if (handler) {
  //       Object(window).ethereum.removeListener('chainChanged', handler);
  //     } else {
  //       Object(window).ethereum.removeListener('chainChanged', this.handleChainChanged);
  //     }
  //   }
  // }

  // private handleDisconnect(error: any): void {
  //   Logger.log('MetamaskWalletService: metamask disconnect event start', error);
  //   Logger.log('MetamaskWalletService: metamask disconnect event end');
  // }

  // public registerDisconnect(handler ? : any): void {
  //   if (Object(window).ethereum) {
  //     if (handler) {
  //       Object(window).ethereum.on('disconnect', handler);
  //     } else {
  //       Object(window).ethereum.on('disconnect', this.handleDisconnect);
  //     }
  //   }
  // }

  // public removeDisconnect(handler ? : any): void {
  //   if (Object(window).ethereum) {
  //     if (handler) {
  //       Object(window).ethereum.removeListener('disconnect', handler);
  //     } else {
  //       Object(window).ethereum.removeListener('disconnect', this.handleDisconnect);
  //     }
  //   }
  // }

  // private handleConnect(connectInfo: any): void {
  //   // private handleConnect(connectInfo: ConnectInfo): void {
  //   Logger.log('MetamaskWalletService: metamask connect event start', connectInfo);
  //   Logger.log('MetamaskWalletService: metamask connect event  end');
  // }

  // public registerConnect(handler ? : any): void {
  //   if (Object(window).ethereum) {
  //     if (handler) {
  //       Object(window).ethereum.on('connect', handler);
  //     } else {
  //       Object(window).ethereum.on('connect', this.handleConnect);
  //     }
  //   }
  // }

  // public removeConnect(handler ? : any): void {
  //   if (Object(window).ethereum) {
  //     if (handler) {
  //       Object(window).ethereum.removeListener('connect', handler);
  //     } else {
  //       Object(window).ethereum.removeListener('connect', this.handleConnect);
  //     }
  //   }
  // }

  // private requestSwitchChain = async (chain: WalletNamespace.IChain): Promise < void > => {
  //   try {
  //     Logger.log('MetamaskWalletService: requestSwitchChain start');
  //     const ethereum = Object(window).ethereum;
  //     await ethereum.request({
  //       method: 'wallet_switchEthereumChain',
  //       params: [{
  //         chainId: this.web3.utils.toHex(chain.chainId)
  //       }], // chainId must be in hexadecimal numbers
  //     });
  //     Logger.log('MetamaskWalletService: requestSwitchChain successed');
  //   } catch (e) {
  //     // if network isn't added, pop-up metamask to add
  //     Logger.log('MetamaskWalletService: requestSwitchChain error', e);
  //     await this.addChain(chain);
  //   } finally {
  //     Logger.log('MetamaskWalletService: requestSwitchChain end');
  //   }
  // }

  // public linkWalletToUser = async (logData: any): Promise < UserNamespace.IUserWallet | null > => {
  //   try {
  //     Logger.log('MetamaskWalletService: linkWalletToUser start');
  //     logData.extension = this.name;

  //     const coinbase = await this.getMetamaskSelectedAddress();

  //     if (!coinbase) throw new Error('coinbase-notfound');

  //     logData.coinbase = coinbase;
  //     // verify address has been link or not


  //     const isExistAddress = store.getState().auth ? .userWallets ? .find(w => w.address === coinbase);

  //     if (isExistAddress) {
  //       throw new Error('wallet-exist');
  //     }

  //     const walletAddress = coinbase.toLowerCase();

  //     logData.walletAddress = walletAddress;

  //     const nonceMessage = await UserWalletService.getInstance().generateNonceMessage({
  //       walletAddress,
  //       type: WalletTypeEnum.EVM,
  //     });

  //     logData.nonceMessage = nonceMessage;

  //     const signature = await this.web3.eth.personal.sign(
  //       Web3.utils.fromUtf8(nonceMessage),
  //       walletAddress,
  //       '',
  //     );

  //     logData.signature = signature;

  //     const userWallet = await UserWalletService.getInstance().connect({
  //       walletAddress,
  //       type: WalletTypeEnum.EVM,
  //       signature
  //     });

  //     Logger.log('MetamaskWalletService: linkWalletToUser successed');
  //     return userWallet;
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: linkWalletToUser error: ', e);
  //     throw e;
  //   } finally {
  //     Logger.log('MetamaskWalletService: linkWalletToUser end');
  //   }
  // }

  // public requestDisconnectAddress = async (walletAddress: string): Promise < boolean > => {
  //   try {
  //     Logger.log('MetamaskWalletService: metamask disconnect event start');
  //     const result = await UserWalletService.getInstance().disconnect({
  //       walletAddress,
  //       type: WalletTypeEnum.EVM,
  //     });
  //     return result;
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: metamask disconnect event error', e);
  //   } finally {
  //     Logger.log('MetamaskWalletService: metamask disconnect event end');
  //   }
  //   return false;
  // }

  // public async sendTransaction(payload: TransactionConfig): Promise < TransactionReceipt > {
  //   const receipt = await this.web3.eth.sendTransaction(payload);
  //   return receipt;
  // }

  // public handleBeforeUnload(e: any): string {
  //   const message = 'You have pending transaction need to confirm!';

  //   alert.error(message);

  //   e.returnValue = `${message} Sure you want to leave?`;
  //   return `${message} Sure you want to leave?`;
  // }

  // private async getEstimateGas(nftItem: any, priceToken: number | string): Promise < number > {
  //   try {
  //     const gas = await nftItem.estimateGas({
  //       value: priceToken
  //     });
  //     return gas;
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: getEstimateGas error', e);
  //   }
  //   return 0;
  // }

  // public getNftInfo = (environment: MetaverseNamespace.Environment): MetaverseNamespace.INFTInfo | undefined => {
  //   return environment ? .nftInfos.find(i => i.walletType === WalletTypeEnum.EVM);
  // }

  // private getChainById = (chainId: number | string): WalletNamespace.IChain | undefined => {
  //   return store.getState().config.chainList.find(i => `${i.chainId}` === `${chainId}`);
  // }

  // private addChain = async (chain: WalletNamespace.IChain): Promise < void > => {
  //   try {
  //     Logger.log('MetamaskWalletService: addChain start');
  //     const account = (await this.web3.eth.getAccounts())[0];
  //     if (chain) {
  //       const params = {
  //         // chainId: '0x' + chain?.chainId.toString(16), // A 0x-prefixed hexadecimal string
  //         chainId: this.web3.utils.toHex(chain.chainId),
  //         chainName: chain.name,
  //         nativeCurrency: {
  //           name: chain.nativeCurrency.name,
  //           symbol: chain.nativeCurrency.symbol, // 2-6 characters long
  //           decimals: chain.nativeCurrency.decimals,
  //         },
  //         rpcUrls: chain.rpc,
  //         blockExplorerUrls: [chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url ? chain.explorers[0].url : chain.infoURL],
  //       };

  //       const ethereum = Object(window).ethereum;
  //       await ethereum.request({
  //         method: 'wallet_addEthereumChain',
  //         params: [params, account],
  //       });
  //       Logger.log('MetamaskWalletService: addChain successed');
  //     }
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: addChain error', e);
  //     throw e;
  //   } finally {
  //     Logger.log('MetamaskWalletService: addChain end');
  //   }
  // }

  // private verifyEnvironementSupported = async (environmentId: string): Promise < {
  //   environment: MetaverseNamespace.Environment;
  //   nftInfo: MetaverseNamespace.INFTInfo;
  //   chain: WalletNamespace.IChain;
  // } > => {
  //   const environment = await EnvironmentService.getInstance().getListEnvironmentById(environmentId);
  //   Logger.log('MetamaskWalletService: verifyEnvironementSupported environment', environment);

  //   if (!environment) {
  //     Logger.log('MetamaskWalletService: verifyEnvironementSupported Environment not found');
  //     throw Error('Environment not found');
  //   }

  //   const nftInfo = this.getNftInfo(environment);
  //   if (!nftInfo) {
  //     Logger.log('MetamaskWalletService: verifyEnvironementSupported NFT environment info not found');
  //     throw Error('NFT environment info not found');
  //   }

  //   const chain = await this.getChainById(nftInfo.chainId);

  //   if (!chain) {
  //     Logger.log('MetamaskWalletService: verifyEnvironementSupported Chain not found');
  //     throw Error('Chain not found');
  //   }

  //   const chainSupported = await this.testChainSupported(chain);

  //   if (!chainSupported) {
  //     // add chain
  //     try {
  //       await this.requestSwitchChain(chain);
  //     } catch (e) {
  //       throw Object({
  //         verify: true,
  //         message: 'Chain unsupported!'
  //       });
  //     }
  //   }

  //   return {
  //     environment,
  //     nftInfo,
  //     chain,
  //   };
  // }

  // public async mintEnvironmentNFT < TransactionReceipt > (rock: MetaverseNamespace.Rock | undefined, logData: any): Promise < TransactionReceipt | undefined | void > {
  //   let activity: NftNamespace.INFTActivity | undefined = undefined;
  //   try {
  //     Logger.log('MetamaskWalletService: mintEnvironmentNFT start', rock);
  //     logData.extenstion = this.name;
  //     const activities = await RockNftService.getInstance().findItemNFTActivities(rock ? .id || '', NFTItemTypeEnum.ENVIRONMENT);
  //     if (activities) {
  //       const cancelStatus = [ENUM.mintNFTstatus.SUBMITTING, ENUM.mintNFTstatus.SUBMITTED, ENUM.mintNFTstatus.SUCCEEDED];
  //       // cancel mint nft if user have minted or minting
  //       const activity = activities.find(ac => cancelStatus.includes(ac.status));
  //       if (activity) {
  //         if (activity.status === ENUM.mintNFTstatus.SUBMITTING) {
  //           throw Object({
  //             verify: true,
  //             message: 'Transaction initiated. Minting...'
  //           });
  //         }
  //         if (activity.status === ENUM.mintNFTstatus.SUBMITTED) {
  //           throw Object({
  //             verify: true,
  //             message: 'Minting complete. Your Home NFT will soon appear in your wallet.'
  //           });
  //         }
  //         if (activity.status === ENUM.mintNFTstatus.SUCCEEDED) {
  //           throw Object({
  //             verify: true,
  //             message: 'Success. You minted your Home NFT.'
  //           });
  //         }
  //       }
  //     }

  //     const {
  //       nftInfo,
  //       chain
  //     } = await this.verifyEnvironementSupported(rock ? .environmentId || '');

  //     logData.tokenId = nftInfo ? .tokenId;
  //     Logger.log('MetamaskWalletService: mintEnvironmentNFT tokenId', nftInfo ? .tokenId);

  //     if (!nftInfo ? .tokenId) {
  //       throw Error('Wrong environment token: empty tokenId');
  //     }

  //     let from = '';
  //     try {
  //       from = await this.getLinkedAddress();
  //     } catch (e) {
  //       throw Object({
  //         verify: true,
  //         message: Object(e).message,
  //       });
  //     }
  //     logData.from = from;
  //     Logger.log('MetamaskWalletService: mintEnvironmentNFT from', from);

  //     const to = nftInfo.contractAddress;
  //     Logger.log('MetamaskWalletService: mintEnvironmentNFT to', to);

  //     if (!to) {
  //       throw Error('Wrong wallet address');
  //     }
  //     const quantity = 1;

  //     const tokenId = nftInfo.tokenId;

  //     const contract = this.createContract(environmentABI.abi as AbiItem[], to);
  //     let maxSupplyToken = await contract.methods.getMaxSupplyToken(tokenId).call();
  //     logData.maxSupplyToken = maxSupplyToken;
  //     if (typeof maxSupplyToken === 'string') {
  //       maxSupplyToken = Number(maxSupplyToken);
  //     }
  //     Logger.log('MetamaskWalletService maxSupplyToken', maxSupplyToken);

  //     let totalSupply = await contract.methods.totalSupply(tokenId).call();
  //     logData.totalSupply = totalSupply;
  //     if (typeof totalSupply === 'string') {
  //       totalSupply = Number(totalSupply);
  //     }
  //     Logger.log('MetamaskWalletService totalSupply', totalSupply);

  //     // over max supply token
  //     if ((totalSupply + quantity) > maxSupplyToken) {
  //       Logger.log('MetamaskWalletService: mintEnvironmentNFT error: over max supply token');
  //       throw Object({
  //         verify: true,
  //         message: 'Ran out tokens.'
  //       });
  //     }

  //     let priceToken = await contract.methods.getPriceToken(tokenId).call();
  //     logData.priceToken = priceToken;
  //     if (typeof priceToken === 'string') {
  //       priceToken = Number(priceToken);
  //     }
  //     Logger.log('MetamaskWalletService priceToken', priceToken);

  //     Logger.log('MetamaskWalletService: proccess mint nft start');
  //     const nftItem = contract.methods.userMint(from, tokenId, quantity, '0x0');
  //     Logger.log('MetamaskWalletService: proccess mint nft end');

  //     Logger.log('MetamaskWalletService get estimate gas start', );
  //     const gas = await this.getEstimateGas(nftItem, priceToken);
  //     logData.gas = gas;
  //     Logger.log('MetamaskWalletService get estimate gas end', gas);

  //     const currentBalanceStr = await this.web3.eth.getBalance(from);
  //     const currentBalance = Number(currentBalanceStr);
  //     logData.currentBalance = currentBalance;
  //     Logger.log('MetamaskWalletService currentBalance', currentBalance);

  //     LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTParameter, logData);

  //     if (currentBalance === 0 || currentBalance < ((priceToken * quantity) + gas)) {
  //       Logger.log('MetamaskWalletService: mintEnvironmentNFT error: Insufficient balance');
  //       if (priceToken === 0) {
  //         throw Object({
  //           verify: true,
  //           message: `Please top up enough ${chain.nativeCurrency.name} to cover gas fees. Everything else is free.`
  //         });
  //       }
  //       throw Object({
  //         verify: true,
  //         message: `Please top up enough ${chain.nativeCurrency.name} to cover the minting fee.`
  //       });
  //     }

  //     Logger.log('MetamaskWalletService: send nft item');
  //     const receipt = await nftItem.send({
  //         to,
  //         from,
  //         value: priceToken * quantity,
  //       })
  //       .once('sending', (payload: any): void => {
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT sending', payload);
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTSending, logData);
  //         window.addEventListener('beforeunload', this.handleBeforeUnload);
  //       })
  //       .once('sent', (payload: any): void => {
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTSent, logData);
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT sent', payload);
  //       })
  //       .once('transactionHash', (hash: any): void => {
  //         logData.transactionHash = hash;
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTHash, logData);
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT transactionHash', hash);
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT send activity', hash);
  //         RockNftService.getInstance().createItemNFTActivity({
  //           txHash: hash,
  //           walletAddress: from,
  //           rockId: rock ? .id || '',
  //           chainId: `${chain.chainId}`,
  //           contractAddress: to,
  //           type: NFTItemTypeEnum.ENVIRONMENT,
  //           walletType: WalletTypeEnum.EVM,
  //         }).then((data) => {
  //           activity = data;
  //           store.dispatch(updateItemNFTActivity(activity));
  //           Logger.log('MetamaskWalletService: mintEnvironmentNFT addEnvironmentActivity successed', data);
  //         }).catch((error) => {
  //           Logger.log('MetamaskWalletService: mintEnvironmentNFT addEnvironmentActivity failed', error);
  //         });
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //       })
  //       .once('receipt', (receipt: any): void => {
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT receipt', receipt);
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTReceipt, {
  //           ...logData,
  //           receipt,
  //         });
  //       })
  //       .on('confirmation', (confirmationNumber: any, receipt: any): void => {
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT confirmation', confirmationNumber, receipt);
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTConfirmation, {
  //           ...logData,
  //           confirmationNumber,
  //           receipt
  //         });
  //       })
  //       .on('error', (error: any, receipt: any): void => {
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT error', error, receipt);
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTError, {
  //           ...logData,
  //           error,
  //           receipt
  //         });
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //       });
  //     Logger.log('MetamaskWalletService: mintEnvironmentNFT receipt', receipt);
  //     if (activity) {
  //       store.dispatch(updateItemNFTActivity({
  //         ...Object(activity),
  //         status: ENUM.mintNFTstatus.SUCCEEDED
  //       }));
  //     }
  //     window.removeEventListener('beforeunload', this.handleBeforeUnload);

  //     Logger.log('MetamaskWalletService: mintEnvironmentNFT successed');
  //     return receipt;
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: mintEnvironmentNFT error', e);
  //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //     if (activity) {
  //       store.dispatch(updateItemNFTActivity({
  //         ...Object(activity),
  //         status: ENUM.mintNFTstatus.FAILED
  //       }));
  //       RockNftService.getInstance().updateEnvironmentActivity(Object(activity).id, {
  //         status: ENUM.mintNFTstatus.FAILED
  //       }).then((data) => {
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT updateEnvironmentActivity successed', data);
  //       }).catch((error) => {
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT updateEnvironmentActivity failed', error);
  //       });
  //     }
  //     throw e;
  //   } finally {
  //     Logger.log('MetamaskWalletService: mintEnvironmentNFT end');
  //   }
  // }

  // //buy nfts
  // async buyNFTs < TransactionReceipt > (nftSell: NftStoreNamespace.NftItem, logData: any): Promise < TransactionReceipt | undefined | void > {
  //   try {
  //     Logger.log('MetamaskWalletService: Buy Nft start', nftSell);
  //     logData.extenstion = this.name;

  //     const {
  //       nftInfo
  //     } = await this.verifyEnvironementSupported(nftSell ? .id || '');

  //     let from = '';
  //     try {
  //       from = await this.getLinkedAddress();
  //     } catch (e) {
  //       throw Object({
  //         verify: true,
  //         message: Object(e).message,
  //       });
  //     }

  //     logData.from = from;
  //     Logger.log('MetamaskWalletService: Buy Nft from', from);

  //     const to = nftInfo.contractAddress;

  //     Logger.log('MetamaskWalletService: Buy Nft to', to);
  //     const quantity = 1;
  //     const tokenId = nftInfo ? .tokenId;
  //     logData.tokenId = tokenId;

  //     const contract = this.createContract(environmentABI.abi as AbiItem[], to);

  //     let maxSupplyToken = await contract.methods.getMaxSupplyToken(tokenId).call();
  //     logData.maxSupplyToken = maxSupplyToken;
  //     if (typeof maxSupplyToken === 'string') {
  //       maxSupplyToken = Number(maxSupplyToken);
  //     }
  //     Logger.log('MetamaskWalletService maxSupplyToken', maxSupplyToken);

  //     let totalSupply = await contract.methods.totalSupply(tokenId).call();
  //     logData.totalSupply = totalSupply;
  //     if (typeof totalSupply === 'string') {
  //       totalSupply = Number(totalSupply);
  //     }
  //     Logger.log('MetamaskWalletService totalSupply', totalSupply);

  //     // over max supply token
  //     if ((totalSupply + quantity) > maxSupplyToken) {
  //       Logger.log('MetamaskWalletService: Buy Nft error: over max supply token');
  //       throw Object({
  //         verify: true,
  //         message: 'Ran out tokens.'
  //       });
  //     }

  //     let priceToken = await contract.methods.getPriceToken(tokenId).call();
  //     logData.priceToken = priceToken;
  //     if (typeof priceToken === 'string') {
  //       priceToken = Number(priceToken);
  //     }
  //     Logger.log('MetamaskWalletService priceToken', priceToken);

  //     Logger.log('MetamaskWalletService: proccess buy nft start');
  //     const nftItem = contract.methods.userMint(from, tokenId, quantity, '0x0');
  //     Logger.log('MetamaskWalletService: proccess buy nft end');

  //     Logger.log('MetamaskWalletService get estimate gas buy nft start', );
  //     const gas = await this.getEstimateGas(nftItem, priceToken);
  //     logData.gas = gas;
  //     Logger.log('MetamaskWalletService get estimate gas buy nft end', gas);

  //     const currentBalanceStr = await this.web3.eth.getBalance(from);
  //     const currentBalance = Number(currentBalanceStr);
  //     logData.currentBalance = currentBalance;
  //     Logger.log('MetamaskWalletService buy nft currentBalance', currentBalance);

  //     LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTParameter, logData);

  //     if (currentBalance === 0 || currentBalance < ((priceToken * quantity) + gas)) {
  //       Logger.log('MetamaskWalletService: Buy Nft error: Insufficient balance');
  //       if (priceToken === 0) {
  //         throw Object({
  //           verify: true,
  //           message: 'Please top up enough ETH to cover gas fees. Everything else is free.'
  //         });
  //       }
  //       throw Object({
  //         verify: true,
  //         message: 'Please top up enough ETH to cover the minting fee.'
  //       });
  //     }

  //     Logger.log('MetamaskWalletService: send nft item');
  //     const receipt = await nftItem.send({
  //         to,
  //         from,
  //         value: Number(this.web3.utils.toWei(String(nftSell ? .price), 'ether')) * quantity,
  //       })
  //       .once('sending', (payload: any): void => {
  //         Logger.log('MetamaskWalletService: Buy Nft sending', payload);
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTSending, logData);
  //         window.addEventListener('beforeunload', this.handleBeforeUnload);
  //       })
  //       .once('sent', (payload: any): void => {
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTSent, logData);
  //         Logger.log('MetamaskWalletService: Buy Nft sent', payload);
  //       })
  //       .once('transactionHash', (hash: any): void => {
  //         logData.transactionHash = hash;
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTHash, logData);
  //         Logger.log('MetamaskWalletService: Buy Nft transactionHash', hash);
  //         Logger.log('MetamaskWalletService: Buy Nft send activity', hash);
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //       })
  //       .once('receipt', (receipt: any): void => {
  //         Logger.log('MetamaskWalletService: Buy Nft receipt', receipt);
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTReceipt, {
  //           ...logData,
  //           receipt,
  //         });
  //       })
  //       .on('confirmation', (confirmationNumber: any, receipt: any): void => {
  //         Logger.log('MetamaskWalletService: Buy Nft confirmation', confirmationNumber, receipt);
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTConfirmation, {
  //           ...logData,
  //           confirmationNumber,
  //           receipt
  //         });
  //       })
  //       .on('error', (error: any, receipt: any): void => {
  //         Logger.log('MetamaskWalletService: Buy Nft error', error, receipt);
  //         LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTError, {
  //           ...logData,
  //           error,
  //           receipt
  //         });
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //       });
  //     Logger.log('MetamaskWalletService: Buy Nft receipt', receipt);
  //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //     return receipt;
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: Buy Nft error', e);
  //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //     throw e;
  //   }
  // }

  // public async getNetWorkId(): Promise < number > {
  //   try {
  //     return await this.web3.eth.net.getId();
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: getNetWorkId', e);
  //   }
  //   return 0;
  // }

  // public async getChainId(): Promise < number > {
  //   try {
  //     return await this.web3.eth.getChainId();
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: getChainId', e);
  //   }
  //   return 0;
  // }

  // private testChainSupported = async (chain: WalletNamespace.IChain): Promise < boolean > => {
  //   try {
  //     Logger.log('MetamaskWalletService: testChainSupported start');
  //     const currentChainId = await this.getChainId();
  //     return chain.chainId === currentChainId;
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: testChainSupported error', e);
  //     return false;
  //   } finally {
  //     Logger.log('MetamaskWalletService: testChainSupported end');
  //   }
  // }

  // public getChainInfo = (chainId: string | number): WalletNamespace.IChain => {
  //   try {
  //     Logger.log('MetamaskWalletService: getChainInfo start');
  //     const chain = store.getState().config.chainList.find(item => `${item.chainId}` === `${chainId}`);
  //     if (chain) {
  //       return chain;
  //     }
  //     throw Error('Cannot found chain');
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: getChainInfo error', e);
  //     throw e;
  //   } finally {
  //     Logger.log('MetamaskWalletService: getChainInfo end');
  //   }
  // }

  // public publishTicket = async (rock: MetaverseNamespace.Rock | undefined, payload: IPublishTicketPayload, logData: any): Promise < void > => {
  //   let activity: NftNamespace.INFTActivity | undefined = undefined;
  //   try {
  //     Logger.log('MetamaskWalletService: publishTicket start');
  //     logData.extenstion = this.name;
  //     const activities = await RockNftService.getInstance().findItemNFTActivities(rock ? .id || '', NFTItemTypeEnum.TICKET);
  //     if (activities) {
  //       const cancelStatus = [ENUM.mintNFTstatus.SUBMITTING, ENUM.mintNFTstatus.SUBMITTED, ENUM.mintNFTstatus.SUCCEEDED];
  //       // cancel mint nft if user have minted or minting
  //       const activity = activities.find(ac => cancelStatus.includes(ac.status));
  //       if (activity) {
  //         if (activity.status === ENUM.mintNFTstatus.SUBMITTING) {
  //           throw Object({
  //             verify: true,
  //             message: 'Transaction initiated. Minting...'
  //           });
  //         }
  //         if (activity.status === ENUM.mintNFTstatus.SUBMITTED) {
  //           throw Object({
  //             verify: true,
  //             message: 'Minting complete. Your Home NFT will soon appear in your wallet.'
  //           });
  //         }
  //         if (activity.status === ENUM.mintNFTstatus.SUCCEEDED) {
  //           throw Object({
  //             verify: true,
  //             message: 'Success. You minted your Home NFT.'
  //           });
  //         }
  //       }
  //     }

  //     const {
  //       nftInfo,
  //       chain
  //     } = await this.verifyEnvironementSupported(rock ? .environmentId || '');

  //     logData.tokenId = nftInfo ? .tokenId;
  //     Logger.log('MetamaskWalletService: publishTicket tokenId', nftInfo ? .tokenId);

  //     if (!nftInfo ? .tokenId) {
  //       throw Error('Wrong environment token: empty tokenId');
  //     }

  //     let from = '';
  //     try {
  //       from = await this.getLinkedAddress();
  //     } catch (e) {
  //       throw Object({
  //         verify: true,
  //         message: Object(e).message,
  //       });
  //     }

  //     logData.from = from;
  //     Logger.log('MetamaskWalletService: publishTicket from', from);

  //     // const to = nftInfo.contractAddress;
  //     const to = '0x66DE1100C691e707165fA8660D8ac7de9f893953';
  //     Logger.log('MetamaskWalletService: publishTicket to', to);

  //     if (!to) {
  //       throw Error('Wrong wallet address');
  //     }

  //     Logger.log('MetamaskWalletService: publishTicket ethPrice', payload.ethPrice);
  //     const price = this.web3.utils.toWei(String(payload.ethPrice), 'ether');
  //     Logger.log('MetamaskWalletService: publishTicket wei price', price);

  //     // over max supply token
  //     if (payload.initialSupply > payload.maxSupply) {
  //       Logger.log('MetamaskWalletService: publishTicket error: over max supply token');
  //       throw Object({
  //         verify: true,
  //         message: 'Incorrect the total ticket supply',
  //       });
  //     }

  //     const contract = this.createContract(ticketABI.abi as AbiItem[], to);

  //     Logger.log('MetamaskWalletService: publishTicket proccess mint nft start', {
  //       from,
  //       initialSupply: payload.initialSupply,
  //       tokenURI: payload.tokenURI,
  //       price,
  //       maxSupply: payload.maxSupply
  //     });
  //     const ticket = contract.methods.publishTicket(from, payload.initialSupply, payload.tokenURI, price, payload.maxSupply);
  //     Logger.log('MetamaskWalletService: publishTicket proccess mint nft end', ticket);

  //     Logger.log('MetamaskWalletService publishTicket get estimate gas start');
  //     let gas = await this.getEstimateGas(ticket, price);
  //     if (gas < 50000) {
  //       gas = 50000;
  //     }
  //     logData.gas = gas;
  //     Logger.log('MetamaskWalletService: publishTicket get estimate gas end', gas);

  //     const currentBalanceStr = await this.web3.eth.getBalance(from);
  //     const currentBalance = Number(currentBalanceStr);
  //     logData.currentBalance = currentBalance;
  //     Logger.log('MetamaskWalletService: publishTicket currentBalance', currentBalance);

  //     // LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTParameter, logData);

  //     if (currentBalance === 0 || currentBalance < gas) {
  //       Logger.log('MetamaskWalletService: publishTicket error: Insufficient balance');
  //       if (Number(price) === 0) {
  //         throw Object({
  //           verify: true,
  //           message: `Please top up enough ${chain.nativeCurrency.name} to cover gas fees. Everything else is free.`
  //         });
  //       }
  //       throw Object({
  //         verify: true,
  //         message: `Please top up enough ${chain.nativeCurrency.name} to cover the minting fee.`
  //       });
  //     }

  //     Logger.log('MetamaskWalletService: publishTicket send nft item');
  //     const receipt = await ticket.send({
  //         to,
  //         from,
  //         gas,
  //       })
  //       .once('sending', (payload: any): void => {
  //         Logger.log('MetamaskWalletService: publishTicket sending', payload);
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTSending, logData);
  //         window.addEventListener('beforeunload', this.handleBeforeUnload);
  //       })
  //       .once('sent', (payload: any): void => {
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTSent, logData);
  //         Logger.log('MetamaskWalletService: publishTicket sent', payload);
  //       })
  //       .once('transactionHash', (hash: any): void => {
  //         // logData.transactionHash = hash;
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTHash, logData);
  //         Logger.log('MetamaskWalletService: publishTicket transactionHash', hash);
  //         Logger.log('MetamaskWalletService: publishTicket send activity', hash);

  //         RockNftService.getInstance().createItemNFTActivity({
  //           txHash: hash,
  //           walletAddress: from,
  //           rockId: rock ? .id || '',
  //           chainId: `${chain.chainId}`,
  //           contractAddress: to,
  //           type: NFTItemTypeEnum.TICKET,
  //           walletType: WalletTypeEnum.EVM,
  //         }).then((data) => {
  //           activity = data;
  //           store.dispatch(updateItemNFTActivity(activity));
  //           Logger.log('MetamaskWalletService: mintEnvironmentNFT addEnvironmentActivity successed', data);
  //         }).catch((error) => {
  //           Logger.log('MetamaskWalletService: mintEnvironmentNFT addEnvironmentActivity failed', error);
  //         });
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //       })
  //       .once('receipt', (receipt: any): void => {
  //         Logger.log('MetamaskWalletService: publishTicket receipt', receipt);
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTReceipt, {
  //         //     ...logData,
  //         //     receipt,
  //         // });
  //       })
  //       .on('confirmation', (confirmationNumber: any, receipt: any): void => {
  //         Logger.log('MetamaskWalletService: publishTicket confirmation', confirmationNumber, receipt);
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTConfirmation, {
  //         //     ...logData,
  //         //     confirmationNumber,
  //         //     receipt
  //         // });
  //       })
  //       .on('error', (error: any, receipt: any): void => {
  //         Logger.log('MetamaskWalletService: publishTicket error', error, receipt);
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.mintNFT.mintNFTError, {
  //         //     ...logData,
  //         //     error,
  //         //     receipt
  //         // });
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //       });
  //     Logger.log('MetamaskWalletService: publishTicket receipt', receipt);
  //     if (activity) {
  //       store.dispatch(updateItemNFTActivity({
  //         ...Object(activity),
  //         status: ENUM.mintNFTstatus.SUCCEEDED
  //       }));
  //     }
  //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //     Logger.log('MetamaskWalletService: publishTicket successed');
  //     return receipt;
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: publishTicket error', e);
  //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //     if (activity) {
  //       store.dispatch(updateItemNFTActivity({
  //         ...Object(activity),
  //         status: ENUM.mintNFTstatus.FAILED
  //       }));
  //       RockNftService.getInstance().updateEnvironmentActivity(Object(activity).id, {
  //         status: ENUM.mintNFTstatus.FAILED
  //       }).then((data) => {
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT updateEnvironmentActivity successed', data);
  //       }).catch((error) => {
  //         Logger.log('MetamaskWalletService: mintEnvironmentNFT updateEnvironmentActivity failed', error);
  //       });
  //     }
  //     throw e;
  //   } finally {
  //     Logger.log('MetamaskWalletService: publishTicket end');
  //   }
  // }

  // public buyTicket = async (environmentId: string): Promise < void > => {
  //   try {
  //     Logger.log('MetamaskWalletService: buyTicket start');
  //     // logData.extenstion = this.name;

  //     const {
  //       nftInfo
  //     } = await this.verifyEnvironementSupported(environmentId || '');

  //     let from = '';
  //     try {
  //       from = await this.getLinkedAddress();
  //     } catch (e) {
  //       throw Object({
  //         verify: true,
  //         message: Object(e).message,
  //       });
  //     }

  //     // logData.from = from;
  //     const to = nftInfo.contractAddress;
  //     const quantity = 1;
  //     const tokenId = 'nftSell?.tokenId';
  //     // logData.tokenId = tokenId;

  //     const contract = this.createContract(ticketABI.abi as AbiItem[], to);

  //     let maxSupplyToken = await contract.methods.getMaxSupplyToken(tokenId).call();
  //     // logData.maxSupplyToken = maxSupplyToken;
  //     if (typeof maxSupplyToken === 'string') {
  //       maxSupplyToken = Number(maxSupplyToken);
  //     }
  //     Logger.log('MetamaskWalletService maxSupplyToken', maxSupplyToken);

  //     let totalSupply = await contract.methods.totalSupply(tokenId).call();
  //     // logData.totalSupply = totalSupply;
  //     if (typeof totalSupply === 'string') {
  //       totalSupply = Number(totalSupply);
  //     }
  //     Logger.log('MetamaskWalletService totalSupply', totalSupply);

  //     // over max supply token
  //     if ((totalSupply + quantity) > maxSupplyToken) {
  //       Logger.log('MetamaskWalletService: Buy Nft error: over max supply token');
  //       throw Object({
  //         verify: true,
  //         message: 'Ran out tokens.'
  //       });
  //     }

  //     let priceToken = await contract.methods.getPriceToken(tokenId).call();
  //     // logData.priceToken = priceToken;
  //     if (typeof priceToken === 'string') {
  //       priceToken = Number(priceToken);
  //     }
  //     Logger.log('MetamaskWalletService priceToken', priceToken);

  //     Logger.log('MetamaskWalletService: proccess buy nft start');
  //     const nftItem = contract.methods.userMint(from, tokenId, quantity, '0x0');
  //     Logger.log('MetamaskWalletService: proccess buy nft end');

  //     Logger.log('MetamaskWalletService get estimate gas buy nft start', );
  //     const gas = await this.getEstimateGas(nftItem, priceToken);
  //     // logData.gas = gas;
  //     Logger.log('MetamaskWalletService get estimate gas buy nft end', gas);

  //     const currentBalanceStr = await this.web3.eth.getBalance(from);
  //     const currentBalance = Number(currentBalanceStr);
  //     // logData.currentBalance = currentBalance;
  //     Logger.log('MetamaskWalletService buy nft currentBalance', currentBalance);

  //     // LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTParameter, logData);

  //     if (currentBalance === 0 || currentBalance < ((priceToken * quantity) + gas)) {
  //       Logger.log('MetamaskWalletService: Buy Nft error: Insufficient balance');
  //       if (priceToken === 0) {
  //         throw Object({
  //           verify: true,
  //           message: 'Please top up enough ETH to cover gas fees. Everything else is free.'
  //         });
  //       }
  //       throw Object({
  //         verify: true,
  //         message: 'Please top up enough ETH to cover the minting fee.'
  //       });
  //     }

  //     Logger.log('MetamaskWalletService: send nft item');
  //     const receipt = await nftItem.send({
  //         to,
  //         from,
  //         // value: Number(this.web3.utils.toWei(String(nftSell?.price),'ether')) * quantity,
  //       })
  //       .once('sending', (payload: any): void => {
  //         Logger.log('MetamaskWalletService: Buy Nft sending', payload);
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTSending, logData);
  //         window.addEventListener('beforeunload', this.handleBeforeUnload);
  //       })
  //       .once('sent', (payload: any): void => {
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTSent, logData);
  //         Logger.log('MetamaskWalletService: Buy Nft sent', payload);
  //       })
  //       .once('transactionHash', (hash: any): void => {
  //         // logData.transactionHash = hash;
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTHash, logData);
  //         Logger.log('MetamaskWalletService: Buy Nft transactionHash', hash);
  //         Logger.log('MetamaskWalletService: Buy Nft send activity', hash);
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //       })
  //       .once('receipt', (receipt: any): void => {
  //         Logger.log('MetamaskWalletService: Buy Nft receipt', receipt);
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTReceipt, {
  //         //     ...logData,
  //         //     receipt,
  //         // });
  //       })
  //       .on('confirmation', (confirmationNumber: any, receipt: any): void => {
  //         Logger.log('MetamaskWalletService: Buy Nft confirmation', confirmationNumber, receipt);
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTConfirmation, {
  //         //     ...logData,
  //         //     confirmationNumber,
  //         //     receipt
  //         // });
  //       })
  //       .on('error', (error: any, receipt: any): void => {
  //         Logger.log('MetamaskWalletService: Buy Nft error', error, receipt);
  //         // LoggingService.instance.info(LOGGING_ENUMS.tracking.buyNFT.buyNFTError, {
  //         //     ...logData,
  //         //     error,
  //         //     receipt
  //         // });
  //         window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //       });
  //     Logger.log('MetamaskWalletService: Buy Nft receipt', receipt);
  //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //     return receipt;
  //   } catch (e) {
  //     Logger.log('MetamaskWalletService: Buy Nft error', e);
  //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //     throw e;
  //   }
  // }

  // public async getTransactionReceipt(txHash: string): Promise < TransactionReceipt > {
  //   const receipt = await this.web3.eth.getTransactionReceipt(txHash);
  //   return receipt;
  // }

  // public async getNFTPrice(environment: MetaverseNamespace.Environment): Promise < string > {
  //   const nftInfo = this.getNftInfo(environment);
  //   if (nftInfo) {
  //     const contract = this.createContract(environmentABI.abi as AbiItem[], nftInfo ? .contractAddress);
  //     const priceToken = await contract.methods.getPriceToken(nftInfo.tokenId).call();
  //     return this.web3.utils.fromWei(priceToken);
  //   }
  //   throw Error('Cannot get contract price');
  // }
}

const adapter = new MetamaskAdapter();
export default adapter;