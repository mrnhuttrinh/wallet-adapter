import { IWalletContext, WalletTypeEnum } from '../types';
import metamaskAdapter from './Metamask';
import phantomAdapter from './Phantom';

class WalletAdapter implements IWalletContext {
  public async connect(type: WalletTypeEnum): Promise<void> {
    if (type === WalletTypeEnum.EVM) {
      await metamaskAdapter.connect();
    } else if (type === WalletTypeEnum.SOLANA) {
      await phantomAdapter.connect();
    }
  }

  public isInstalled(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      return metamaskAdapter.isInstalled;
    } else if (type === WalletTypeEnum.SOLANA) {
      return phantomAdapter.isInstalled;
    }
    return false;
  }

  public isConnected(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      return metamaskAdapter.isConnected;
    } else if (type === WalletTypeEnum.SOLANA) {
      return phantomAdapter.isConnected;
    }
    return false;
  }

  public connectedAddress(type: WalletTypeEnum): string | undefined {
    if (type === WalletTypeEnum.EVM) {
      return metamaskAdapter.connectedAddress;
    } else if (type === WalletTypeEnum.SOLANA) {
      return phantomAdapter.connectedAddress;
    }
    return undefined;
  }
}

const adapter = new WalletAdapter();
export default adapter;