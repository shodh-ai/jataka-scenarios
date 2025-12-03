const { 
    calculateTotal,
    applyPercentageDiscount,
    isEligibleForFreeShipping
} = require('../src/utils/cartHelper');

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

describe('Cart Helper - discounts and shipping', () => {
    it('should apply a percentage discount correctly', () => {
        const discounted = applyPercentageDiscount(200, 10);
        // Expected: 10% of 200 is 20, so final should be 180.
        expect(discounted).toBe(180);
    });

    it('should consider exact threshold as eligible for free shipping', () => {
        const eligible = isEligibleForFreeShipping(500, 500);
        // Current buggy implementation returns false here.
        expect(eligible).toBe(true);
    });

    it('should not be eligible when below the free shipping threshold', () => {
        const eligible = isEligibleForFreeShipping(400, 500);
        expect(eligible).toBe(false);
    });
});
