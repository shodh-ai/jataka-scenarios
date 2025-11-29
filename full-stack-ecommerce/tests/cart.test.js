const { calculateTotal } = require('../src/utils/cartHelper');

describe('Cart Helper - calculateTotal', () => {
    it('should return 0 when quantity is 0', () => {
        const total = calculateTotal(100, 0);
        expect(total).toBe(0);
    });

    it('should correctly handle numeric string quantities', () => {
        const total = calculateTotal(100, '5');
        expect(total).toBe(500);
    });

    it('should not return NaN for weird quantities and instead return 0', () => {
        const total = calculateTotal(100, 'five');
        // Current buggy implementation returns NaN here.
        expect(total).toBe(0);
    });
});
