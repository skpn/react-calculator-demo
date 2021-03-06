import CalculatorKey from './CalculatorKey';

type Props = {
  keyboardClickHandler: (value: string, isActionKey: boolean) => void;
};

const keys = [
  { text: '^', isOperatorKey: true },
  { text: 'L', isOperatorKey: true },
  { text: 'LN', isOperatorKey: true },
  { text: '√', isOperatorKey: true },
  { text: '+', isOperatorKey: true },
  { text: '1' },
  { text: '2' },
  { text: '3' },
  { text: '-', isOperatorKey: true },
  { text: '4' },
  { text: '5' },
  { text: '6' },
  { text: '*', isOperatorKey: true },
  { text: '7' },
  { text: '8' },
  { text: '9' },
  { text: '/', isOperatorKey: true },
  { text: '(' },
  { text: '0' },
  { text: ')' },
  { text: 'C', isActionKey: true },
  { text: '=', isActionKey: true },
];

export default function CalculatorKeyboard({ keyboardClickHandler }: Props) {
  console.log('keyboard render');
  const keyItems = keys.map(({ text, isOperatorKey, isActionKey = false }) => (
    <CalculatorKey
      key={text}
      text={text}
      isActionKey={isActionKey}
      isOperatorKey={isOperatorKey}
      keyClickHandler={() => keyboardClickHandler(text, isActionKey)}
    />
  ));

  return (
    <div className='calculatorKeyboardBox gap-4 grid grid-cols-4 grid-rows-4 grow p-3'>
      {keyItems}
    </div>
  );
}
