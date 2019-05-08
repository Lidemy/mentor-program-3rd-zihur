const isPrime = require('./hw3');

describe('hw3', () => {
  it('should return correct answer when n = 1', () => {
    expect(isPrime(1)).toBe(false);
  });

  it('should return correct answer when n = 3.0002', () => {
    expect(isPrime(3.0002)).toBe(false);
  });
});
