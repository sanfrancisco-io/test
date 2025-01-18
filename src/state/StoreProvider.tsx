'use client'

import { PropsWithChildren, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from "@/state/store";

export default function StoreProvider({
  children,
}: PropsWithChildren) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
