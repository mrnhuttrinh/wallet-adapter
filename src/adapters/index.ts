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
      metamaskAdapter.connect();
    }
    return false;
  }

  public isConnected(type: WalletTypeEnum): boolean {
    if (type === WalletTypeEnum.EVM) {
      metamaskAdapter.connect();
    }
    return false;
  }
}

const adapter = new WalletAdapter();
export default adapter;