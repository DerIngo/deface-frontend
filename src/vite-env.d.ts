/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMAGE_DEFACE_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
