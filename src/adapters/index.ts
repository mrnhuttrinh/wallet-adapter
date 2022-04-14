import { IWalletContext, WalletTypeEnum } from "../types";
import metamaskAdapter from './Metamask';

class WalletAdapter implements IWalletContext {
  public async connect(type: WalletTypeEnum): Promise<void> {
    if (type === WalletTypeEnum.EVM) {
      await metamaskAdapter.connect();
    }
  }
}

const adapter = new WalletAdapter();
export default adapter;