import { irrationalOperators, operators } from '@/lib/calculator/operators';
import {
  CalculationToken,
  OperatorToken,
  RationalNumberToken,
} from '@/types/CalculationTokens';

export const processTokenList = (
  calculationTokens: CalculationToken[]
): number => {
  while (calculationTokens.length > 1) {
    calculationTokens = processPriorityTokens(calculationTokens);
  }
  const remainingToken = calculationTokens[0];
  if (remainingToken.tokenType === 'operator') {
    throw `remaining token is an operator`;
  } else if (remainingToken.tokenType === 'rationalNumber') {
    return remainingToken.value;
  } else {
    return getResultFromToken(remainingToken.tokenType, [remainingToken]);
  }
};

const processPriorityTokens = (
  tokenList: CalculationToken[]
): CalculationToken[] => {
  for (let index = tokenList.length - 1; index > -1; --index) {
    if (tokenAtIndexHasPriority(tokenList, index)) {
      const priorityToken: CalculationToken = tokenList[index];
      const processedTokensIndexes: number[] = getProcessedTokensIndexes(
        priorityToken.tokenType,
        index
      );
      const processedTokens: CalculationToken[] = processedTokensIndexes.map(
        (tokenIndex: number) => tokenList[tokenIndex]
      );
      const result: number = getResultFromToken(
        priorityToken.tokenType,
        processedTokens
      );
      const newToken: RationalNumberToken = getNewTokenFromResult(result);
      tokenList = replaceProcessedTokens(
        tokenList,
        processedTokensIndexes,
        newToken
      );
    }
  }
  return tokenList;
};

const getResultFromToken = (
  priorityTokenType: string,
  processedTokens: CalculationToken[]
): number => {
  if (
    processedTokens.length > 1 &&
    processedTokens[1].tokenType === 'operator'
  ) {
    return processOperatorToken(processedTokens);
  } else if (processedTokens[0].tokenType === 'innerTokenList') {
    return processTokenList(processedTokens[0].tokens);
  } else if (processedTokens[0].tokenType === 'irrationalNumber') {
    return processIrrationalNumberToken(processedTokens[0]);
  } else {
    throw `bad token type - can't get result from ${priorityTokenType}`;
  }
};

const processOperatorToken = (tokens: any): number => {
  const [leftMember, operatorToken, rightMember]: [
    RationalNumberToken,
    OperatorToken,
    RationalNumberToken
  ] = tokens;
  if (operatorToken.operator === '/' && rightMember.value === 0) {
    throw `division by 0 is illegal`;
  }
  return operators[operatorToken.operator].func(
    leftMember.value,
    rightMember.value
  );
};

const processIrrationalNumberToken = (token: any): number => {
  return irrationalOperators[token.irrationalOperator](token.value);
};

const tokenAtIndexHasPriority = (
  tokenList: CalculationToken[],
  index: number
): boolean => {
  const token: CalculationToken = tokenList[index];
  if (token.tokenType === 'rationalNumber') {
    // this type never triggers a calculation
    return false;
  }
  if (
    token.tokenType === 'irrationalNumber' ||
    token.tokenType === 'innerTokenList'
  ) {
    // these types are not related to their neighbors, they have automatic priority
    return true;
  } else if (
    token.tokenType === 'operator' &&
    tokenHasOperatorPriority(tokenList, token, index)
  ) {
    // the token at index + 1 has already been checked and does not have priority
    // the first neighbor could have type priority, and the second could have operator priority
    return true;
  }
  return false;
};

const tokenHasOperatorPriority = (
  tokenList: CalculationToken[],
  token: OperatorToken,
  index: number
): boolean => {
  const firstNeighbor: CalculationToken = tokenList[index - 1];
  const secondNeighbor: CalculationToken = tokenList[index - 2];
  if (
    firstNeighbor.tokenType === 'rationalNumber' &&
    (!secondNeighbor ||
      ('operator' in secondNeighbor &&
        operators[secondNeighbor.operator].priority <=
          operators[token.operator].priority))
  ) {
    return true;
  }
  return false;
};

const getProcessedTokensIndexes = (
  priorityTokenType: string,
  index: number
): number[] => {
  if (priorityTokenType === 'operator') {
    return [index - 1, index, index + 1];
  } else {
    return [index];
  }
};

const getNewTokenFromResult = (result: number): RationalNumberToken => {
  return {
    tokenType: 'rationalNumber',
    rawTokenString: result.toString(),
    value: result,
  };
};

const replaceProcessedTokens = (
  tokenList: CalculationToken[],
  processedTokensIndexes: number[],
  newToken: RationalNumberToken
): CalculationToken[] => {
  tokenList.splice(
    processedTokensIndexes[0],
    processedTokensIndexes.length,
    newToken
  );
  return tokenList;
};
