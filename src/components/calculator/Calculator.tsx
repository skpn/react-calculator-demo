import { useState } from 'react';

import styles from './calculator.module.scss';

import CalculatorKeyboard from './CalculatorKeyboard';
import CalculatorScreen from './CalculatorScreen';
import { CalculatorHistory } from '@/types/CalculatorHistory';
import { addHistoryItem } from '@/lib/calculator/history';
import { calculateExpressionResult } from '@/lib/calculator/calculateExpressionResult';

type calculatorActions = {
  [name: string]: (value: string) => void;
};

export default function Calculator() {
  let [history, updateHistory] = useState<CalculatorHistory>({
    items: [],
    displayedItemsCount: 5,
    displayedItemsOffset: 0,
  });
  // let [keyboardInput, updateKeyboardInput] = useState('(-1)+3');
  let [keyboardInput, updateKeyboardInput] = useState('(-1)+3');

  const actions: calculatorActions = {
    C: () => updateKeyboardInput(''),
    '=': (value) => performCalculation(value),
  };

  const keyboardClickHandler = (value: string, isActionKey: boolean) => {
    if (isActionKey) {
      actions[value](keyboardInput);
    } else {
      updateKeyboardInput(keyboardInput + value);
    }
  };

  const performCalculation = (keyboardInput: string) => {
    if (keyboardInput === '') {
      return;
    }
    try {
      const result: number = calculateExpressionResult(keyboardInput);
      const updatedHistory: CalculatorHistory = addHistoryItem(history, {
        isDisplayed: true,
        rawInput: keyboardInput,
        result,
      });
      updateHistory(updatedHistory);
    } catch (error) {
      const updatedHistory: CalculatorHistory = addHistoryItem(history, {
        rawInput: keyboardInput,
        isDisplayed: true,
        error: typeof error === 'string' ? error : `unknown error`,
      });
      updateHistory(updatedHistory);
    } finally {
      updateKeyboardInput('');
    }
  };

  return (
    <div
      className={
        styles.calculatorBox +
        ` flex flex-col p-3 h-4/6 w-2/5 rounded-lg border-x border-y bg-primary-100 border-primary-500`
      }
    >
      <div className={styles.screenDiv}>
        <CalculatorScreen
          displayedItems={history.items.filter((item) => item.isDisplayed)}
          keyboardInput={keyboardInput}
          activeLineIndex={0}
        />
      </div>
      <CalculatorKeyboard keyboardClickHandler={keyboardClickHandler} />
    </div>
  );
}
