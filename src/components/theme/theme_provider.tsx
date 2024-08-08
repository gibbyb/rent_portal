"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export default function Theme_Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <div className="w-full justify-end items-end p-3 flex flex-col">
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </div>
  )
}
