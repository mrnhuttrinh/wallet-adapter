import { ISolanaConfig, IEVMConfig, IWalletContext, WalletTypeEnum, IWalletByType } from '../types';
import MetamaskAdapter from './Metamask';
import PhantomAdapter from './Phantom';

class WalletAdapter implements IWalletContext {
  private metamaskAdapter?: MetamaskAdapter;
  private phantomAdapter?: PhantomAdapter;
  private userWallets?: IWalletByType;

  public setMetamaskConfig(_c: IEVMConfig): void {
    this.metamaskAdapter = new MetamaskAdapter(_c);
  }

  public setPhantomConfig(_c: ISolanaConfig): void {
    this.phantomAdapter = new PhantomAdapter(_c);
  }

  public setUserWallets(_c: IWalletByType): void {
    this.userWallets = _c;
  }

  public async connect(type: WalletTypeEnum): Promise<void> {
    if (type === WalletTypeEnum.EVM) {
      await this.metamaskAdapter?.connect();
    } else if (type === WalletTypeEnum.SOLANA) {
      await this.phantomAdapter?.connect();
    }
  }

  public isInstalled(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      return !!this.metamaskAdapter?.isInstalled;
    } else if (type === WalletTypeEnum.SOLANA) {
      return !!this.phantomAdapter?.isInstalled;
    }
    return false;
  }

  public isConnected(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      return !!this.metamaskAdapter?.isConnected;
    } else if (type === WalletTypeEnum.SOLANA) {
      return !!this.phantomAdapter?.isConnected;
    }
    return false;
  }

  public connectedAddress(type: WalletTypeEnum): string | undefined {
    if (type === WalletTypeEnum.EVM) {
      return this.metamaskAdapter?.connectedAddress;
    } else if (type === WalletTypeEnum.SOLANA) {
      return this.phantomAdapter?.connectedAddress;
    }
    return undefined;
  }

  public extensionInstallUrl(type: WalletTypeEnum): string | undefined {
    if (type === WalletTypeEnum.EVM) {
      return this.metamaskAdapter?.extensionInstallUrl;
    } else if (type === WalletTypeEnum.SOLANA) {
      return this.phantomAdapter?.extensionInstallUrl;
    }
    return undefined;
  }
}

const walletAdapter = new WalletAdapter();
export default walletAdapter;