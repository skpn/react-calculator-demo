import { processTokenList } from '@/lib/calculator/calculations';
import { parseCalculationInput } from '@/lib/calculator/parser/parser';
import { extractInnerSections } from '@/lib/calculator/parser/sections';
import { CalculationToken } from '@/types/CalculationTokens';

export const calculateExpressionResult = (
  calculationString: string
): number => {
  if (calculationString.includes('(')) {
    const inputSections: string[] = extractInnerSections(calculationString);
    const calculatedStrings: string[] = inputSections.map((section) => {
      if (section.startsWith('(')) {
        const valueString = section.slice(1, -1);
        const directTranslation = Number(valueString);
        if (!Number.isNaN(directTranslation) && valueString.startsWith('-')) {
          return '0-' + directTranslation.toString().slice(1);
        }
        const sectionResult = calculateExpressionResult(valueString);
        return sectionResult.toString();
      }
      return section;
    });
    calculationString = calculatedStrings.join('');
  }
  const calculationTokens: CalculationToken[] =
    parseCalculationInput(calculationString);
  const result: number = processTokenList(calculationTokens);
  return result;
};
