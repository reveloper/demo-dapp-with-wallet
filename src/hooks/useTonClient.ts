import {TonClient4} from "@ton/ton";
import {useState} from "react";

export function useTonClient() {
  const [client] = useState(() => new TonClient4({
    endpoint: 'https://mainnet-v4.tonhubapi.com'
  }));

  return client;
}
