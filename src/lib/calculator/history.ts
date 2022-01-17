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
  targetDisplayedItemsCount: number,
  targetDisplayedItemsOffset: number
): CalculatorHistory => {
  const displayedItemsCount = Math.min(
    history.items.length,
    targetDisplayedItemsCount
  );

  const displayedItemsOffset = getMaxOffset(
    history.items.length,
    displayedItemsCount,
    targetDisplayedItemsOffset
  );
  let displayStartIndex: number, displayEndIndex: number;
  if (displayedItemsOffset) {
    displayStartIndex =
      0 -
      Math.min(
        history.items.length,
        displayedItemsCount + displayedItemsOffset
      );
    displayEndIndex = history.items.length - displayedItemsOffset;
  } else {
    displayStartIndex =
      history.items.length -
      Math.min(history.items.length, displayedItemsCount);
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
