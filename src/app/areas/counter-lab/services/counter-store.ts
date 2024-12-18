import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
export const BY_VALUES = [1, 3, 5] as const;
type ByValues = (typeof BY_VALUES)[number];
type CounterState = {
  current: number;
  by: ByValues;
};
export const CounterStore = signalStore(
  withState<CounterState>({ current: 0, by: 1 }),
  withMethods((store) => {
    return {
      setBy: (by: ByValues) => patchState(store, { by }),
      increment: () =>
        patchState(store, { current: store.current() + store.by() }),
      decrement: () =>
        patchState(store, { current: store.current() - store.by() }),
    };
  }),
  withComputed((store) => {
    return {
      byValues: computed(() => BY_VALUES),
      decrementDisabled: computed(() => store.current() - store.by() < 0),
      fizzBuzz: computed(() => fizzBuzzIfy(store.current())),
    };
  }),
);

export function fizzBuzzIfy(val: number): '' | 'Fizz' | 'Buzz' | 'FizzBuzz' {
  const isFizz = (n: number) => n % 3 === 0;
  const isBuzz = (n: number) => n % 5 === 0;
  const isFizzBuzz = (n: number) => isFizz(n) && isBuzz(n);

  if (val === 0) return '';
  if (isFizzBuzz(val)) return 'FizzBuzz';
  if (isFizz(val)) return 'Fizz';
  if (isBuzz(val)) return 'Buzz';
  return '';
}
