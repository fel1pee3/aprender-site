"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
// Native form controls must not accept changes before their URL handlers exist.
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
