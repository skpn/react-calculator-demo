import { operators } from '@/lib/calculator/operators';
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

const validateInnerTokenListToken = (token: InnerTokenListToken): boolean => {
  const [stringStart, stringEnd]: [string, string] = [
    token.rawTokenString.slice(0, 1),
    token.rawTokenString.slice(-1),
  ];
  if (stringStart !== `(`) {
    throw `missing opening parenthesis: ${token.rawTokenString}`;
  } else if (stringEnd !== `)`) {
    throw `missing closing parenthesis: ${token.rawTokenString}`;
  }
  return true;
};

const validateIrrationalNumberToken = (
  token: IrrationalNumberToken
): boolean => {
  const numberExpression: string = token.rawTokenString.slice(
    token.irrationalOperator.length
  );
  if (!isRationalNumberExpression(numberExpression)) {
    throw `invalid expression: ${token.rawTokenString}`;
  }
  return true;
};

const validateRationalNumberToken = (token: RationalNumberToken): boolean => {
  if (!isRationalNumberExpression(token.rawTokenString)) {
    throw `invalid expression: ${token.rawTokenString}`;
  }
  return true;
};

const validateOperatorToken = (token: OperatorToken): boolean => {
  if (!Object.keys(operators).includes(token.rawTokenString)) {
    throw `invalid expression: ${token.rawTokenString}`;
  }
  return true;
};

const validateTokenFuncions: validateTokenFunction = {
  innerTokenList: validateInnerTokenListToken,
  irrationalNumber: validateIrrationalNumberToken,
  rationalNumber: validateRationalNumberToken,
  operator: validateOperatorToken,
};

export const validateToken = (token: CalculationToken): boolean => {
  return validateTokenFuncions[token.tokenType](token);
};

export const tokensAreOrdered = (tokenList: CalculationToken[]): boolean => {
  if (tokenList[0].tokenType === 'operator') {
    throw `expression should not start with ${tokenList[0].rawTokenString}`;
  } else if (tokenList[tokenList.length - 1].tokenType === 'operator') {
    throw `expression should not end with ${
      tokenList[tokenList.length - 1].rawTokenString
    }`;
  }
  tokenList.map((token, index) => {
    if (index % 2 === 0 && token.tokenType !== 'operator') {
      throw `${
        tokenList[index - 1].rawTokenString
      } should be followed by operator`;
    }
  });
  return true;
};
