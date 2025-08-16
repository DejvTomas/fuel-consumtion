import { IItem } from '../structures/item';

/** Id of end of missing interval id */
export const missingIntervals = [
  { idOfNewInterval: '46', missingKilometers: 40105 - 19127 },
];

export function getMissingKilometers(
  index: number,
  items: IItem[],
  id?: string
): number {
  let missingKilometersForItem = 0;
  missingIntervals.forEach((m) => {
    if (index > items.findIndex((i) => i.id === m.idOfNewInterval)) {
      missingKilometersForItem += m.missingKilometers;
    }
  });
  return missingKilometersForItem;
}

export function isIdOfNewInterval(id?: string): boolean {
  return !!missingIntervals.find((m) => m.idOfNewInterval === id);
}

export function getMissingIntervalsFilter(): (item: IItem) => boolean {
  return (item: IItem) =>
    !missingIntervals.find((interval) => interval.idOfNewInterval === item.id);
}

export function getTotalMissingKilometers(): number {
  return missingIntervals.reduce(
    (previous, current) => previous + current.missingKilometers,
    0
  );
}
