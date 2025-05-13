import { useCallback, useState } from 'react';

export function useModal(initial = false) {
  const [open, setOpen] = useState(initial);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return { open, show, hide };
}