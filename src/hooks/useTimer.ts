import { useEffect, useRef, useState } from 'react';

const TICK_MS = 500;

/**
 * Countdown based on wall-clock deltas so background-tab throttling does not
 * drift the remaining time. `onExpire` fires exactly once when it hits zero.
 * Pass `null` for no timer. Set `running` to false to pause.
 */
export function useTimer(totalSeconds: number | null, onExpire: () => void, running = true) {
  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds ?? 0);
  const remainingRef = useRef<number>(totalSeconds ?? 0);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    remainingRef.current = totalSeconds ?? 0;
    expiredRef.current = false;
    setSecondsLeft(totalSeconds ?? 0);
  }, [totalSeconds]);

  useEffect(() => {
    if (totalSeconds === null || !running || expiredRef.current) return undefined;
    const base = remainingRef.current;
    const startedAt = Date.now();

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = Math.max(0, base - elapsed);
      remainingRef.current = left;
      setSecondsLeft(left);
      if (left === 0 && !expiredRef.current) {
        expiredRef.current = true;
        window.clearInterval(handle);
        onExpireRef.current();
      }
    };

    const handle = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(handle);
  }, [totalSeconds, running]);

  return { secondsLeft, expired: expiredRef.current, active: totalSeconds !== null };
}
