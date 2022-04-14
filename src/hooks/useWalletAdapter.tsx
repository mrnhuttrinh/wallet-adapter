import React from 'react';
import { IWalletContext } from "../types";
import walletContext from '../contexts/walletContext';

const useUnityEvent = (): IWalletContext => {
  const context = React.useContext(walletContext)
  return context;
};

export default useUnityEvent;
