export type OperatorToken = {
  rawTokenString: string;
  tokenType: 'operator';
  operator: string;
};

export type InnerTokenListToken = {
  rawTokenString: string;
  tokenType: 'innerTokenList';
  tokens: CalculationToken[];
};

export type IrrationalNumberToken = {
  rawTokenString: string;
  tokenType: 'irrationalNumber';
  irrationalOperator: string;
  value: number;
};

export type RationalNumberToken = {
  rawTokenString: string;
  tokenType: 'rationalNumber';
  value: number;
};

export type CalculationToken =
  | OperatorToken
  | InnerTokenListToken
  | IrrationalNumberToken
  | RationalNumberToken;
