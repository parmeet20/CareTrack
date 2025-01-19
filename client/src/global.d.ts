// global.d.ts
import { EthereumProvider } from '@metamask/providers';  // Import EthereumProvider type from @metamask/providers

declare global {
  interface Window {
    ethereum?: EthereumProvider; // Declaring ethereum object on window with EthereumProvider type
  }
}

export {}; // This makes this file a module to avoid global conflicts
