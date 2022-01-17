import { CalculationToken } from '@/types/CalculationTokens';
import { irrationalOperators, operators } from '@/lib/calculator/operators';
import { isRationalNumberExpression } from '@/lib/helper';
import {
  tokensAreOrdered,
  validateIrrationalNumberToken,
  validateOperatorToken,
  validateRationalNumberToken,
} from '@/lib/calculator/parser/validateTokens';

type getTokenFunction = {
  [name: string]: (inputString: string) => CalculationToken;
};

export const parseCalculationInput = (
  inputString: string
): CalculationToken[] => {
  const getTokenFunctions: getTokenFunction = {
    irrationalNumber: getIrrationalNumberToken,
    rationalNumber: getRationalNumberToken,
    operator: getOperatorToken,
  };
  const tokenStrings: string[] = inputString
    .replaceAll('**', '^')
    .split(/([\+,\-,\/,\*,\^])/g)
    .filter((tokenString) => tokenString.length > 0);
  const tokenList: CalculationToken[] = tokenStrings.map((rawTokenString) => {
    const tokenType: string = getTokenType(rawTokenString);
    const token = getTokenFunctions[tokenType](rawTokenString);
    return token;
  });
  if (tokensAreOrdered(tokenList)) {
    return tokenList;
  }
  return [];
};

const getTokenType = (rawTokenString: string): string => {
  if (
    Object.keys(irrationalOperators).some((irrationalOperator) =>
      rawTokenString.startsWith(irrationalOperator)
    )
  ) {
    return 'irrationalNumber';
  } else if (
    Object.keys(operators).some((operator) => {
      return rawTokenString.startsWith(operator);
    })
  ) {
    return 'operator';
  } else if (isRationalNumberExpression(rawTokenString)) {
    return 'rationalNumber';
  }
  throw `invalid token: '${rawTokenString}'`;
};

const getIrrationalNumberToken = (rawTokenString: string): CalculationToken => {
  const operator: string = Object.keys(irrationalOperators).filter((operator) =>
    rawTokenString.startsWith(operator)
  )[0];
  const valueString = rawTokenString.slice(operator.length);
  validateIrrationalNumberToken(rawTokenString, valueString);
  return {
    rawTokenString,
    tokenType: 'irrationalNumber',
    irrationalOperator: operator,
    value: getTokenValue(valueString),
  };
};

const getOperatorToken = (rawTokenString: string): CalculationToken => {
  validateOperatorToken(rawTokenString);
  return {
    rawTokenString,
    tokenType: 'operator',
    operator: rawTokenString,
  };
};

const getRationalNumberToken = (rawTokenString: string): CalculationToken => {
  validateRationalNumberToken(rawTokenString);
  return {
    rawTokenString,
    tokenType: 'rationalNumber',
    value: getTokenValue(rawTokenString),
  };
};

const getTokenValue = (valueString: string): number => {
  const value = Number(valueString);
  if (Number.isNaN(value)) {
    throw `incorrect expression: ${valueString}`;
  }
  return value;
};
