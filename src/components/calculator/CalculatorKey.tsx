import { MouseEventHandler } from 'react';

type Props = {
  text: string;
  isOperatorKey?: boolean;
  isActionKey?: boolean;
  keyClickHandler: MouseEventHandler;
};

export default function CalculatorKey({
  text,
  isOperatorKey,
  isActionKey,
  keyClickHandler,
}: Props) {
  return (
    <button
      onClick={keyClickHandler}
      className={
        'text-zinc-400 flex justify-center items-center h-full bg-white shadow-sm active:text-zinc-900 rounded-md active:shadow-inner ' +
        (isActionKey ? 'font-semibold' : '') +
        (isOperatorKey ? 'text-blue-600' : '')
      }
    >
      {text}
    </button>
  );
}
