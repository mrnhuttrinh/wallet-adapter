import { IWalletContext, WalletTypeEnum } from "../types";
import metamaskAdapter from './Metamask';

class WalletAdapter implements IWalletContext {
  public async connect(type: WalletTypeEnum): Promise<void> {
    if (type === WalletTypeEnum.EVM) {
      await metamaskAdapter.connect();
    }
  }

  public isInstalled(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      return metamaskAdapter.isInstalled;
    }
    return false;
  }

  public isConnected(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      return metamaskAdapter.isConnected;
    }
    return false;
  }

  public connectedAddress(type: WalletTypeEnum): string | undefined {
    if (type === WalletTypeEnum.EVM) {
      return metamaskAdapter.connectedAddress;
    }
    return undefined;
  }
}

const adapter = new WalletAdapter();
export default adapter;