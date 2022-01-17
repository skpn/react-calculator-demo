import { ScreenLine } from '@/types/ScreenLines';
import styles from './calculatorScreenLine.module.scss';

type Props = {
  line: ScreenLine;
  active: boolean;
};

export const CalculatorScreenLine = ({ line, active }: Props) => {
  return (
    <pre
      className={
        'text-zinc-600 text-xl font-medium whitespace-pre-line text-left ' +
        (line.type === 'error' ? 'text-red-700 ' : '') +
        (line.type === 'result' ? 'text-emerald-700' : '')
      }
    >
      {(active ? '> ' : '') +
        (line.type === 'error' ? 'error: ' : '') +
        line.text}
      {active ? <span className={styles.blink}>|</span> : ''}
    </pre>
  );
};
