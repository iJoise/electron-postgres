/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_DB_USER: string
  readonly VITE_DB_PASS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
