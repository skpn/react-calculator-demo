import { useState } from 'react';

import styles from './calculator.module.scss';

import CalculatorKeyboard from './CalculatorKeyboard';
import CalculatorScreen from './CalculatorScreen';
import { getCalculationResult } from '@/lib/calculator/calculations';
import { parseCalculationInput } from '@/lib/calculator/parser/parser';
import { CalculationToken } from '@/types/CalculationTokens';
import { CalculatorHistory } from '@/types/CalculatorHistory';
import { addHistoryItem } from '@/lib/calculator/history';

type calculatorActions = {
  [name: string]: (value: string) => void;
};

export default function Calculator() {
  let [history, updateHistory] = useState<CalculatorHistory>({
    items: [],
    displayedItemsCount: 5,
    displayedItemsOffset: 0,
  });
  let [keyboardInput, updateKeyboardInput] = useState('');

  const actions: calculatorActions = {
    C: () => updateKeyboardInput(''),
    '=': (value) => performCalculation(value),
  };

  const keyboardClickHandler = (value: string, isActionKey: boolean) => {
    if (isActionKey) {
      actions[value](keyboardInput);
    } else {
      updateKeyboardInput(keyboardInput + value);
      console.log('keyboardInput:', keyboardInput);
    }
  };

  const performCalculation = (keyboardInput: string) => {
    if (keyboardInput === '') {
      return;
    }
    try {
      const calculationTokens: CalculationToken[] =
        parseCalculationInput(keyboardInput);
      console.log('calculationTokens:', calculationTokens);
      const result: number = 0; // getCalculationResult(calculationTokens);
      const updatedHistory: CalculatorHistory = addHistoryItem(history, {
        isDisplayed: true,
        rawInput: keyboardInput,
        calculationTokens,
        result,
      });
      updateHistory(updatedHistory);
      updateKeyboardInput(result.toString());
    } catch (error) {
      console.log('error:', error);
      const updatedHistory: CalculatorHistory = addHistoryItem(history, {
        rawInput: keyboardInput,
        isDisplayed: true,
        error: typeof error === 'string' ? error : `unknown error`,
      });
      updateHistory(updatedHistory);
    }
  };

  return (
    <div
      className={
        styles.calculatorBox +
        ` flex flex-col p-3 h-4/6 w-2/5 rounded-lg border-x border-y bg-primary-100 border-primary-500`
      }
    >
      <CalculatorScreen
        displayedItems={history.items.filter((item) => item.isDisplayed)}
        newItem={keyboardInput}
      />
      <CalculatorKeyboard keyboardClickHandler={keyboardClickHandler} />
    </div>
  );
}
