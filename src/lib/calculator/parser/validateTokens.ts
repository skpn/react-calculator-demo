import { irrationalOperators, operators } from '@/lib/calculator/operators';
import { isRationalNumberExpression } from '@/lib/helper';
import {
  CalculationToken,
  InnerTokenListToken,
  IrrationalNumberToken,
  OperatorToken,
  RationalNumberToken,
} from '@/types/CalculationTokens';

// TODO: use CalculationToken union type, maybe with typeguard ?
type validateTokenFunction = {
  [name: string]: (token: any) => boolean;
};

export const validateInnerTokenListToken = (
  rawTokenString: string
): boolean => {
  const [stringStart, stringEnd]: [string, string] = [
    rawTokenString.slice(0, 1),
    rawTokenString.slice(-1),
  ];
  if (stringStart !== `(`) {
    throw `missing opening parenthesis`;
  } else if (stringEnd !== `)`) {
    throw `missing closing parenthesis`;
  }
  return true;
};

export const validateIrrationalNumberToken = (
  rawTokenString: string,
  valueString: string
): boolean => {
  if (!isRationalNumberExpression(valueString)) {
    throw `invalid expression: ${rawTokenString}`;
  }
  return true;
};

export const validateRationalNumberToken = (
  rawTokenString: string
): boolean => {
  if (!isRationalNumberExpression(rawTokenString)) {
    throw `invalid number: ${rawTokenString}`;
  }
  return true;
};

export const validateOperatorToken = (rawTokenString: string): boolean => {
  if (!Object.keys(operators).includes(rawTokenString)) {
    throw `invalid operator: ${rawTokenString}`;
  }
  return true;
};

export const tokensAreOrdered = (tokenList: CalculationToken[]): boolean => {
  if (tokenList[0].tokenType === 'operator') {
    throw `expression should not start with ${tokenList[0].rawTokenString}`;
  } else if (
    tokenList.length > 1 &&
    tokenList[tokenList.length - 1].tokenType === 'operator'
  ) {
    throw `expression should not end with ${
      tokenList[tokenList.length - 1].rawTokenString
    }`;
  }
  tokenList.slice(1).map((token, index) => {
    if (index % 2 === 0 && token.tokenType !== 'operator') {
      throw `${
        tokenList[index - 1].rawTokenString
      } should be followed by operator`;
    }
  });
  return true;
};
