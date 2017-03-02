import { IsDebug } from './debug';

export function Debug(...args) {
  if (IsDebug()) {
    console.log.apply(null, args);
  }
}

export function Info(...args) {
  console.log.apply(null, args);
}

export function Error(...args) {
  console.error.apply(null, args);
}