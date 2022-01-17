import { operators } from './operators';
import { CalculationToken } from '@/types/CalculationTokens';

export const getCalculationResult = (
  calculationTokens: CalculationToken[]
): number => {
  while (calculationTokens.length > 1) {
    const priorityToken = getPriorityToken(calculationTokens);
    const rationalNumberToken = process;
  }
  const;
};

const extractHighestPriorityOperation = (
  calculationString: string
): string[] => {
  return ['', calculationString, ''];
};

const calculateOperation = (calculationString: string): number => {
  const [a, operator, b] = calculationString.split(/([+,-,\/,\*])/);
  return operators[operator].func(parseFloat(a), parseFloat(b));
};
