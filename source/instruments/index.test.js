import { sum, delay, getUniqueID, getFullApiUrl } from './';


describe('instruments:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as second argument', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('sum function should throw, when called with non-number type as first argument', () => {
        expect(() => sum('hello', 2)).toThrow();
    });

    test('sum function should return an addition of two arguments pass', () => {
        expect(sum(4, 3)).toBe(7);
        expect(sum(1, 2)).toBe(3);
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID should throw, when called with non-number type as second argument', () => {
        expect(() => getUniqueID('Hello')).toThrow();
    });

    test('getUniqueID function should produce a string of a desired g', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(15)).toHaveLength(15);
    });

    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('should return string devided by slash', () => {
        expect(getFullApiUrl('api', 'GROUP_ID')).toBe('api/GROUP_ID');
    });

    test('should throw when !string argument1', () => {
        expect(() => getFullApiUrl(1, 'sasf')).toThrow();
    });

    test('should throw when !string argument2', () => {
        expect(() => getFullApiUrl('sasf', 1)).toThrow();
    });
});
