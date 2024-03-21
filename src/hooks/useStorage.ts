import {NoopStorage} from "@ton-community/assets-sdk";
import {useState} from "react";

export function useStorage() {
  const [storage] = useState(() => new NoopStorage());
  return storage;
}
