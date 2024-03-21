import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type ProductEntity = {
  id: number;
  shortName: string;
  description: string;
  price: number;
  image: string;
}

export type Product = ProductEntity & {
  quantity: number;
}

export type Cart = Record<number, Product>;


type AppContextProviderValue = {
  cart: Cart;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;

  txHash: string | null;
  setTxHash: Dispatch<SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextProviderValue>({
  cart: {},
  addProduct: () => {},
  removeProduct: () => {},

  txHash: null,
  setTxHash: () => {},
});

export const AppProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);
