import { ISolanaConfig, IWalletContext, WalletTypeEnum } from '../types';
import MetamaskAdapter from './Metamask';
import PhantomAdapter from './Phantom';

class WalletAdapter implements IWalletContext {
  private metamaskAdapter: MetamaskAdapter;
  private phantomAdapter: PhantomAdapter;

  constructor(solanaConfig: ISolanaConfig) {
    this.metamaskAdapter = new MetamaskAdapter();
    this.phantomAdapter = new PhantomAdapter(solanaConfig);
  }

  public async connect(type: WalletTypeEnum): Promise<void> {
    if (type === WalletTypeEnum.EVM) {
      await this.metamaskAdapter.connect();
    } else if (type === WalletTypeEnum.SOLANA) {
      await this.phantomAdapter.connect();
    }
  }

  public isInstalled(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      return this.metamaskAdapter.isInstalled;
    } else if (type === WalletTypeEnum.SOLANA) {
      return this.phantomAdapter.isInstalled;
    }
    return false;
  }

  public isConnected(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      return this.metamaskAdapter.isConnected;
    } else if (type === WalletTypeEnum.SOLANA) {
      return this.phantomAdapter.isConnected;
    }
    return false;
  }

  public connectedAddress(type: WalletTypeEnum): string | undefined {
    if (type === WalletTypeEnum.EVM) {
      return this.metamaskAdapter.connectedAddress;
    } else if (type === WalletTypeEnum.SOLANA) {
      return this.phantomAdapter.connectedAddress;
    }
    return undefined;
  }

  public extensionInstallUrl(type: WalletTypeEnum): string | undefined {
    if (type === WalletTypeEnum.EVM) {
      return this.metamaskAdapter.extensionInstallUrl;
    } else if (type === WalletTypeEnum.SOLANA) {
      return this.phantomAdapter.extensionInstallUrl;
    }
    return undefined;
  }
}

export default WalletAdapter;