import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "../components/Header/Header";
import {TxForm} from "../components/TxForm/TxForm";
import {Footer} from "../components/Footer/Footer";
import {TonProofDemo} from "../components/TonProofDemo/TonProofDemo";
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { useCallback, useLayoutEffect, useState } from 'react';
import { AppProvider, Cart, Product } from './AppContext';
import { useMiniApp, useViewport } from '@tma.js/sdk-react';
import { Routes } from '../constant';

const router = createBrowserRouter([
  {
    children: [
      {
        path: Routes.PRODUCTS,
        lazy: () =>
          import('../pages/Products').then((module) => ({
            Component: module.Products,
          })),
      },
      {
        path: Routes.CHECKOUT,
        lazy: () =>
          import('../pages/Checkout').then((module) => ({
            Component: module.Checkout,
          })),
      },
      {
        path: Routes.ORDER_HISTORY,
        lazy: () =>
          import('../pages/OrderHistory').then((module) => ({
            Component: module.OrderHistory,
          })),
      }
    ]
  }
])

function App() {
  const miniApp = useMiniApp();
  const viewport = useViewport();

  const [txHash, setTxHash] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart>({});

  const addProduct = useCallback((product: Product) => {
    setCart((previousState) => {
      if (!(product.id in previousState)) {
        return { ...previousState, [product.id]: { ...product, quantity: 1 }}
      }

      const previousQuantity = previousState[product.id].quantity

      return {
        ...previousState,
        [product.id]: { ...product, quantity: previousQuantity + 1}
      }
    })
  }, [])

  const removeProduct = useCallback((product: Product) => {
    setCart((previousState) => {
      if (!(product.id in previousState)) {
        return previousState;
      }

      const newQuantity = previousState[product.id].quantity - 1;

      if (newQuantity > 0) {
        return { ...previousState, [product.id]: { ...product, quantity: newQuantity }};
      }

      return Object.keys(previousState)
        .filter(key => key !== String(product.id))
        .reduce((accumulator, key) => ({
          ...accumulator,
          [key]: previousState[Number(key)]
        }), {});
    })
  }, [])

  useLayoutEffect(() => {
    miniApp.ready();
    miniApp.setHeaderColor('#ffffff');
    miniApp.setBackgroundColor('#ffffff');

    viewport.expand();
  }, [miniApp, viewport]);

  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"]
          }
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/tc_twa_demo_bot/start'
      }}
    >
      <AppProvider value={{ cart, addProduct, removeProduct, txHash, setTxHash }}>
        <div className="app">
          <RouterProvider router={router} />

          {/*<Header />*/}
          {/*<TxForm />*/}
          {/*<TonProofDemo />*/}
          {/*<Footer />*/}
        </div>
      </AppProvider>
    </TonConnectUIProvider>
  )
}

export default App
