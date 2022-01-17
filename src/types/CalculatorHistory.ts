import { CalculationToken } from '@/types/CalculationTokens';

export type CalculatorHistoryResult = {
  isDisplayed: boolean;
  rawInput: string;
  result: number;
};

export type CalculatorHistoryError = {
  isDisplayed: boolean;
  rawInput: string;
  error: string;
};

export type CalculatorHistoryItem =
  | CalculatorHistoryResult
  | CalculatorHistoryError;

export type CalculatorHistory = {
  items: CalculatorHistoryItem[];
  displayedItemsCount: number;
  displayedItemsOffset: number;
};
