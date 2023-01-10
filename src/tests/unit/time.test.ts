import { roundMins } from '../../utils/time';

// Positive test cases
test('roundMins(0) returns 0', () => {
  expect(roundMins(0)).toBe(0);
});

test('roundMins(1) returns 5', () => {
  expect(roundMins(1)).toBe(5);
});

test('roundMins(1, 15) returns 15', () => {
  expect(roundMins(1, 15)).toBe(15);
});

test('roundMins(4, 15) returns 15', () => {
  expect(roundMins(4, 15)).toBe(15);
});

test('roundMins(7, 15) returns 15', () => {
  expect(roundMins(7, 15)).toBe(15);
});

test('roundMins(60) returns 60', () => {
  expect(roundMins(60)).toBe(60);
});

test('roundMins(65) returns 65', () => {
  expect(roundMins(65)).toBe(65);
});

test('roundMins(71, 15) returns 75', () => {
  expect(roundMins(71, 15)).toBe(75);
});

test('roundMins(65,25) returns 85', () => {
  expect(roundMins(65,25)).toBe(85);
});

test('roundMins(90, 15) returns 90', () => {
  expect(roundMins(90, 15)).toBe(90);
});

test('roundMins(90, 10) returns 90', () => {
  expect(roundMins(90, 10)).toBe(90);
});

// Negative test cases
test('roundMins(-1) throws an error', () => {
  expect(() => roundMins(-1)).toThrow();
});

test('roundMins(null) throws an error', () => {
  expect(() => roundMins(null)).toThrow();
});

test('roundMins(60, 0) throws an error', () => {
  expect(() => roundMins(60, 0)).toThrow();
});

test('roundMins(60, -5) throws an error', () => {
  expect(() => roundMins(60, -5)).toThrow();
});
