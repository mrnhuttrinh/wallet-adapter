import React from 'react';
import walletContext from '../contexts/walletContext';
import { IWalletProvider, WalletTypeEnum } from '../types';
import WalletAdapter from '../adapters';
import http from '../api/http';

const WalletProvider = ({
  children,
  solanaConfig,
  evmConfig,
  apiConfig,
  userWallets,
}: IWalletProvider): JSX.Element => {
  const walletAdapter = React.useRef<WalletAdapter>();

  const connect = async (type: WalletTypeEnum): Promise<void> => {
    await walletAdapter.current?.connect(type);
  };

  const isInstalled = (type: WalletTypeEnum): boolean => {
    return !!walletAdapter.current?.isInstalled(type);
  };

  const isConnected = (type: WalletTypeEnum): boolean => {
    return !!walletAdapter.current?.isConnected(type);
  };

  const connectedAddress = (type: WalletTypeEnum): string | undefined => {
    return walletAdapter.current?.connectedAddress(type);
  };

  const extensionInstallUrl = (type: WalletTypeEnum): string | undefined => {
    return walletAdapter.current?.extensionInstallUrl(type);
  };

  React.useEffect(() => {
    walletAdapter.current = new WalletAdapter({
      solana: solanaConfig,
      evm: evmConfig
    });

    http.setConfig(apiConfig);
  }, []);

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