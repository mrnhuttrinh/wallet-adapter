import React from 'react';
import walletContext from '../contexts/walletContext';
import { IWalletProvider, WalletTypeEnum } from '../types';
import Logger from '../utils/logger';
import WalletAdapter from '../adapters';

const WalletProvider = ({
  children,
}: IWalletProvider): JSX.Element => {
  const connect = async (type: WalletTypeEnum): Promise<void> => {
    try {
      Logger.log('WalletProvider: connect start');
      await WalletAdapter.connect(type);
      Logger.log('WalletProvider: connect successed');
    } catch (e) {
      Logger.log('WalletProvider: connect error', e);
      throw e;
    } finally {
      Logger.log('WalletProvider: connect end');
    }
  }

  return (
    <walletContext.Provider
      value={{
        connect,
      }}
    >
      {children}
    </walletContext.Provider>
  )
}

export default WalletProvider;