import { ScreenLine } from '@/types/ScreenLines';

type Props = {
  line: ScreenLine;
  key?: number;
};
export const CalculatorScreenLine = ({ line, key = 0 }: Props) => {
  console.log('line:', line);
  return (
    <div></div>
    // <pre
    //   key={key || ''}
    //   className={
    //     'text-zinc-600 text-xl font-medium whitespace-pre-line ' +
    //     (line.type === 'error' ? 'text-red-700 ' : '') +
    //     (line.type === 'result' ? 'text-emerald-700' : '')
    //   }
    // >
    //   {(line.type === 'error' ? 'error: ' : '') + line.text}
    // </pre>
  );
};
