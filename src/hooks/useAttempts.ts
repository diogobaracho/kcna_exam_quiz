import { useCallback, useState } from 'react';
import type { Attempt } from '../domain/types';
import { clearAttempts, deleteAttempt, loadAttempts } from '../storage/attemptsStore';
import { saveAttempt } from '../storage/attemptsStore';
import type { SaveResult } from '../storage/storage';

/** Reactive view over the persisted attempt history. */
export function useAttempts() {
  const [state, setState] = useState(() => loadAttempts());

  const refresh = useCallback(() => setState(loadAttempts()), []);

  const save = useCallback(
    (attempt: Attempt): SaveResult => {
      const result = saveAttempt(attempt);
      refresh();
      return result;
    },
    [refresh],
  );

  const remove = useCallback(
    (id: string): SaveResult => {
      const result = deleteAttempt(id);
      refresh();
      return result;
    },
    [refresh],
  );

  const clear = useCallback((): SaveResult => {
    const result = clearAttempts();
    refresh();
    return result;
  }, [refresh]);

  return { attempts: state.attempts, corrupt: state.corrupt, save, remove, clear, refresh };
}
