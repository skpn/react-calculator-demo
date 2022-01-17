import { CalculationToken } from '@/types/CalculationTokens';
import { irrationalOperators, operators } from '@/lib/calculator/operators';
import { isRationalNumberExpression } from '@/lib/helper';
import { tokensAreOrdered } from '@/lib/calculator/parser/validateTokens';

type getTokenFunction = {
  [name: string]: (inputString: string) => CalculationToken;
};

export const parseCalculationInput = (
  inputString: string
): CalculationToken[] => {
  const getTokenFunctions: getTokenFunction = {
    innerTokenList: getInnerTokenListToken,
    irrationalNumber: getIrrationalNumberToken,
    rationalNumber: getRationalNumberToken,
    operator: getOperatorToken,
  };
  const tokenStrings: string[] = inputString.split(/[\+,\-,\/,\*]/g);
  console.log('inputString:', inputString);
  console.log('tokenStrings:', tokenStrings);
  if (tokenStrings.includes('')) {
    const emptyTokenIndex: number = tokenStrings.indexOf('');
    throw `${tokenStrings[emptyTokenIndex - 1]} should not be followed by ${
      tokenStrings[emptyTokenIndex + 1]
    }`;
  }
  const tokenList: CalculationToken[] = tokenStrings.map((inputString) => {
    const tokenType: string = getTokenType(inputString);
    return getTokenFunctions[tokenType](inputString);
  });
  console.log('tokenList:', tokenList);
  if (tokensAreOrdered(tokenList)) {
    return tokenList;
  }
  return [];
};

const getTokenType = (inputString: string): string => {
  if (inputString[0] === '(') {
    return 'innerTokenList';
  } else if (
    Object.keys(irrationalOperators).some((irrationalOperator) =>
      inputString.startsWith(irrationalOperator)
    )
  ) {
    return 'irrationalNumber';
  } else if (
    Object.keys(operators).some((operator) => inputString.startsWith(operator))
  ) {
    return 'operator';
  } else if (isRationalNumberExpression(inputString)) {
    return 'rationalNumber';
  }
  throw `invalid token: '${inputString}'`;
};

const getInnerTokenListToken = (inputString: string): CalculationToken => {
  return {
    rawTokenString: inputString,
    tokenType: 'innerTokenList',
    tokens: parseCalculationInput(inputString.slice(1, -1)),
  };
};

const getIrrationalNumberToken = (inputString: string): CalculationToken => {
  const operator: string = Object.keys(irrationalOperators).filter((operator) =>
    inputString.startsWith(operator)
  )[0];
  const valueString = inputString.slice(operator.length);
  return {
    rawTokenString: inputString,
    tokenType: 'irrationalNumber',
    irrationalOperator: operator,
    value: getTokenValue(valueString),
  };
};

const getOperatorToken = (inputString: string): CalculationToken => {
  return {
    rawTokenString: inputString,
    tokenType: 'operator',
    operator: inputString,
  };
};

const getRationalNumberToken = (inputString: string): CalculationToken => {
  return {
    rawTokenString: inputString,
    tokenType: 'rationalNumber',
    value: getTokenValue(inputString),
  };
};

const getTokenValue = (inputString: string): number => {
  if (!isRationalNumberExpression(inputString)) {
    throw `incorrect expression: ${inputString}`;
  }
  return parseFloat(inputString);
};
