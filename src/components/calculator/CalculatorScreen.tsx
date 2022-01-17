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
  newItem: CalculatorHistoryItem;
  activeLineIndex?: number;
};

export default function CalculatorScreen({
  displayedItems,
  newItem,
  activeLineIndex,
}: Props) {
  // TODO: use CalculatorHistoryItem union type, maybe with typeguard ?
  const getLineFromHistoryItem = (item: any): ScreenLine => {
    return {
      type: item.error ? 'error' : 'expression',
      text: item.error ? item.error : item.rawInput,
    };
  };
  console.log('displayedItems:', displayedItems);
  const screenLines: ScreenLine[] = [
    ...displayedItems.map(getLineFromHistoryItem),
    getLineFromHistoryItem(newItem),
  ];

  const lineItems = screenLines.map((line, index) => (
    <CalculatorScreenLine line={line} key={index} />
  ));

  return (
    <div
      className={
        styles.calculatorScreenBox +
        ' flex flex-col items-start justify-end bg-white p-3 h-2/6'
      }
    >
      {lineItems}
    </div>
  );
}
