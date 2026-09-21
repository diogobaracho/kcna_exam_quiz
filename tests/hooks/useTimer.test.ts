import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTimer } from '../../src/hooks/useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-21T10:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('counts down on wall-clock time and expires exactly once', () => {
    const onExpire = vi.fn();
    const { result } = renderHook(() => useTimer(5, onExpire));
    expect(result.current.secondsLeft).toBe(5);
    expect(result.current.active).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.secondsLeft).toBe(3);
    expect(onExpire).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(result.current.secondsLeft).toBe(0);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it('is inactive with a null duration', () => {
    const onExpire = vi.fn();
    const { result } = renderHook(() => useTimer(null, onExpire));
    expect(result.current.active).toBe(false);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(onExpire).not.toHaveBeenCalled();
  });

  it('pauses and resumes without losing time', () => {
    const onExpire = vi.fn();
    const { result, rerender } = renderHook(({ running }) => useTimer(10, onExpire, running), {
      initialProps: { running: true },
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.secondsLeft).toBe(7);

    rerender({ running: false });
    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(result.current.secondsLeft).toBe(7);
    expect(onExpire).not.toHaveBeenCalled();

    rerender({ running: true });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.secondsLeft).toBe(5);
  });

  it('uses the latest onExpire callback', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ cb }) => useTimer(1, cb), { initialProps: { cb: first } });
    rerender({ cb: second });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
