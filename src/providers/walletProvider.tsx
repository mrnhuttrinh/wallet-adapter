import React from 'react';
import walletContext from '../contexts/walletContext';
import { IWalletProvider, WalletTypeEnum } from '../types';
import WalletAdapter from '../adapters';

const WalletProvider = ({
  children,
}: IWalletProvider): JSX.Element => {
  const connect = async (type: WalletTypeEnum): Promise<void> => {
    await WalletAdapter.connect(type);
  };

  const isInstalled = (type: WalletTypeEnum): boolean => {
    return WalletAdapter.isInstalled(type);
  };

  const isConnected = (type: WalletTypeEnum): boolean => {
    return WalletAdapter.isConnected(type);
  };

  const connectedAddress = (type: WalletTypeEnum): string | undefined => {
    return WalletAdapter.connectedAddress(type);
  };

  return (
    <walletContext.Provider
      value={{
        connect,
        isInstalled,
        isConnected,
        connectedAddress,
      }}
    >
      {children}
    </walletContext.Provider>
  );
};

export default WalletProvider;