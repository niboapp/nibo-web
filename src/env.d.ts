interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
    // add more environment variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }