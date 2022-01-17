import { Fragment, useEffect, useRef, useState } from 'react';
import { CalculatorScreenLine } from '@/components/calculator/CalculatorScreenLine';
import {
  CalculatorHistoryError,
  CalculatorHistoryItem,
  CalculatorHistoryResult,
} from '@/types/CalculatorHistory';
import { ScreenLine } from '@/types/ScreenLines';
import styles from './calculatorScreen.module.scss';

type Props = {
  displayedItems: CalculatorHistoryItem[];
  keyboardInput: string;
  activeLineIndex: number;
};

export default function CalculatorScreen({
  displayedItems,
  keyboardInput,
  activeLineIndex,
}: Props) {
  // TODO: use CalculatorHistoryItem union type, maybe with typeguard ?
  const getLineFromHistoryItem = (item: any): ScreenLine => {
    return {
      type: item.error ? 'error' : 'expression',
      text: item.error ? item.error : item.result.toFixed(2),
    };
  };

  const getLineFromKeyboardInput = (keyboardInput: string): ScreenLine => {
    return {
      type: 'expression',
      text: keyboardInput,
    };
  };
  const screenLines: ScreenLine[] = [
    ...displayedItems.map(getLineFromHistoryItem),
    getLineFromKeyboardInput(keyboardInput),
  ];
  useEffect(() => {});

  const lineItems = screenLines.map((line, index) => (
    <Fragment key={index}>
      <CalculatorScreenLine
        line={line}
        active={screenLines.length - activeLineIndex - 1 === index}
      />
    </Fragment>
  ));

  const ScrollToBottom = () => {
    const elementRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView();
      }
    }, [screenLines]);
    return <div ref={elementRef} />;
  };

  return (
    <div
      className={
        styles.calculatorScreenBox + ' overflow-y-auto bg-white p-3 h-full'
      }
    >
      {lineItems}
      <ScrollToBottom />
    </div>
  );
}
