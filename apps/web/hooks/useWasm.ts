'use client';

import { useState, useEffect } from 'react';

interface WasmModule {
  [key: string]: unknown;
}

interface UseWasmResult {
  module: WasmModule | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to dynamically load a WebAssembly module.
 * Usage: const { module, loading, error } = useWasm(() => import('../lib/wasm/my-module.wasm'));
 */
export function useWasm(loader: () => Promise<WasmModule>): UseWasmResult {
  const [module, setModule] = useState<WasmModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((mod) => {
        if (!cancelled) {
          setModule(mod);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { module, loading, error };
}
