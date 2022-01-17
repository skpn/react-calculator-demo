import { calculateExpressionResult } from '@/lib/calculator/calculateExpressionResult';

describe('calculateExpressionResult should give correct result', () => {
  it('should return a correct sum', () => {
    let result;

    result = calculateExpressionResult('1+1');
    expect(result).toBe(2);

    result = calculateExpressionResult('1+1+3');
    expect(result).toBe(5);

    result = calculateExpressionResult('1+0');
    expect(result).toBe(1);
  });

  it('should return a correct substraction', () => {
    let result;

    result = calculateExpressionResult('1-1');
    expect(result).toBe(0);

    result = calculateExpressionResult('1-1-3');
    expect(result).toBe(-3);

    result = calculateExpressionResult('1-0');
    expect(result).toBe(1);
  });

  it('should return a correct multiplication', () => {
    let result;

    result = calculateExpressionResult('1*1');
    expect(result).toBe(1);

    result = calculateExpressionResult('1*1*3');
    expect(result).toBe(3);

    result = calculateExpressionResult('1*0');
    expect(result).toBe(0);
  });

  it('should return a correct division', () => {
    let result;

    result = calculateExpressionResult('1/1');
    expect(result).toBe(1);

    result = calculateExpressionResult('1/1/3');
    expect(result).toBe(1 / 3);
  });

  it('should throw division error', () => {
    expect(() => {
      calculateExpressionResult('1/0');
    }).toThrow('division by 0 is illegal');
  });

  it('should return a correct square root', () => {
    let result;

    result = calculateExpressionResult('√1');
    expect(result).toBe(1);

    result = calculateExpressionResult('√4');
    expect(result).toBe(2);
  });

  it('should return a correct log', () => {
    let result;

    result = calculateExpressionResult('L10');
    expect(result).toBe(1);

    result = calculateExpressionResult('L1');
    expect(result).toBe(0);
  });

  it('should exponentiate correctly', () => {
    let result;

    result = calculateExpressionResult('2^1');
    expect(result).toBe(2);

    result = calculateExpressionResult('2^2');
    expect(result).toBe(4);

    result = calculateExpressionResult('2**2');
    expect(result).toBe(4);

    result = calculateExpressionResult('2^0');
    expect(result).toBe(1);

    result = calculateExpressionResult('2^2^2');
    expect(result).toBe(16);
  });

  it('should respect operator priority', () => {
    let result;

    result = calculateExpressionResult('1-3+1');
    expect(result).toBe(-1);

    result = calculateExpressionResult('2+3/4');
    expect(result).toBe(2.75);

    result = calculateExpressionResult('4*6/2');
    expect(result).toBe(12);

    result = calculateExpressionResult('3*2**2');
    expect(result).toBe(12);

    result = calculateExpressionResult('L10*3');
    expect(result).toBe(3);
  });

  it('should respect parenthesis priority', () => {
    let result;

    result = calculateExpressionResult('1-(3+1)');
    expect(result).toBe(-3);

    result = calculateExpressionResult('(2+3)/4');
    expect(result).toBe(1.25);

    result = calculateExpressionResult('4*(9/(2*3))');
    expect(result).toBe(6);
  });

  it('should respect allow negative numbers when in parenthesis', () => {
    let result;

    result = calculateExpressionResult('(-3)+1');
    expect(result).toBe(-2);
  });

  it('should throw division error', () => {
    expect(() => {
      calculateExpressionResult('-3+1');
    }).toThrow('expression should not start with -');
  });
});
