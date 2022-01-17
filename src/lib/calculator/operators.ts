type operator = {
  [name: string]: {
    priority: number;
    func: (a: number, b: number) => number;
  };
};

export const operators: operator = {
  '+': {
    priority: 0,
    func: (a, b) => a + b,
  },
  '-': {
    priority: 0,
    func: (a, b) => a - b,
  },
  '*': {
    priority: 1,
    func: (a, b) => a * b,
  },
  '/': {
    priority: 2,
    func: (a, b) => a / b,
  },
  '^': {
    priority: 3,
    func: (a, b) => a ** b,
  },
};

type irrationalOperator = {
  [name: string]: (a: number) => number;
};

export const irrationalOperators: irrationalOperator = {
  '√': (a) => Math.sqrt(a),
  LN: (a) => Math.log(a),
  L: (a) => Math.log10(a),
};
