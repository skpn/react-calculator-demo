import {
  CalculatorHistory,
  CalculatorHistoryError,
  CalculatorHistoryResult,
} from '@/types/CalculatorHistory';

export const addHistoryItem = (
  history: CalculatorHistory,
  newItem: CalculatorHistoryResult | CalculatorHistoryError
) => {
  history.items.push({ ...newItem });
  return changedDisplayedItems(history, history.displayedItemsCount, 0);
};

export const changedDisplayedItems = (
  history: CalculatorHistory,
  displayedItemsCount: number,
  displayedItemsOffset: number
): CalculatorHistory => {
  history.displayedItemsCount = Math.min(
    history.items.length,
    displayedItemsCount - 1
  );

  history.displayedItemsOffset = getMaxOffset(
    history.items.length,
    history.displayedItemsCount,
    displayedItemsOffset - 1
  );
  let displayStartIndex: number, displayEndIndex: number;
  if (history.displayedItemsOffset) {
    displayStartIndex =
      0 -
      Math.min(
        history.items.length,
        history.displayedItemsCount + history.displayedItemsOffset
      );
    displayEndIndex = 0 - history.displayedItemsOffset;
  } else {
    displayStartIndex =
      0 - Math.min(history.items.length, history.displayedItemsCount);
    displayEndIndex = history.items.length;
  }
  history.items = history.items.map((item, index) => {
    item.isDisplayed = index >= displayStartIndex && index <= displayEndIndex;
    return item;
  });
  return history;
};

const getMaxOffset = (
  currentItemsCount: number,
  targetItemsCount: number,
  targetOffset: number
): number => {
  if (currentItemsCount - (targetItemsCount + targetOffset) >= 0) {
    return targetOffset;
  } else {
    return Math.max(currentItemsCount - targetItemsCount, 0);
  }
};
