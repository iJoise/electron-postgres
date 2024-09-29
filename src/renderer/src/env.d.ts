/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_DB_USER: string
  readonly VITE_DB_PASS: string
  readonly VITE_DB_ROOT_PASS: string
  readonly VITE_DB_ROOT_USER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
