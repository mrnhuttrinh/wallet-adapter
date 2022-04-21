import React from 'react';
import walletContext from '../contexts/walletContext';
import { IWalletProvider, WalletTypeEnum } from '../types';
import walletAdapter from '../adapters';
import http from '../api/http';

const WalletProvider = ({
  children,
  solanaConfig,
  evmConfig,
  apiConfig,
  userWallets,
}: IWalletProvider): JSX.Element => {

  const connect = async (type: WalletTypeEnum): Promise<void> => {
    await walletAdapter.connect(type);
  };

  const isInstalled = (type: WalletTypeEnum): boolean => {
    return !!walletAdapter.isInstalled(type);
  };

  const isConnected = (type: WalletTypeEnum): boolean => {
    return !!walletAdapter.isConnected(type);
  };

  const connectedAddress = (type: WalletTypeEnum): string | undefined => {
    return walletAdapter.connectedAddress(type);
  };

  const extensionInstallUrl = (type: WalletTypeEnum): string | undefined => {
    return walletAdapter.extensionInstallUrl(type);
  };

  React.useEffect(() => {
    http.setConfig(apiConfig);
  }, [apiConfig]);

  React.useEffect(() => {
    walletAdapter.setPhantomConfig(solanaConfig);
  }, [solanaConfig]);

  React.useEffect(() => {
    walletAdapter.setMetamaskConfig(evmConfig);
  }, [evmConfig]);

  React.useEffect(() => {
    walletAdapter.setUserWallets(userWallets);
  }, [userWallets]);

  return (
    <walletContext.Provider
      value={{
        connect,
        isInstalled,
        isConnected,
        connectedAddress,
        extensionInstallUrl,
      }}
    >
      {children}
    </walletContext.Provider>
  );
};

export default WalletProvider;