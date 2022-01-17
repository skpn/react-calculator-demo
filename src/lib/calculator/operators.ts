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
};

export const irrationalOperators: operator = {
  '√': {
    priority: 0,
    func: (a) => Math.sqrt(a),
  },
  L: {
    priority: 0,
    func: (a) => Math.log10(a),
  },
  LN: {
    priority: 1,
    func: (a) => Math.log(a),
  },
};
