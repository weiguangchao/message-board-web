import { MessageService } from './MessageService';
import { MetaMaskServiceImpl } from './wallet/impl/MetaMaskServiceImpl';
import { WalletService } from './wallet/WalletService';

const messageService = new MessageService();
const walletService: WalletService = new MetaMaskServiceImpl();

export {
  messageService,
  walletService
};