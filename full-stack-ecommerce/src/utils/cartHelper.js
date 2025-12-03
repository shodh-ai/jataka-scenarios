exports.calculateTotal = (price, quantity) => {
    // TICKET 1.4: Student must write a unit test to catch this.
    // If quantity is 0, it should return 0.
    // If quantity is string "5", it should cast it.
    
    // Current Buggy Implementation:
    if (quantity < 0) return 0;
    return price * quantity; // Fails on string inputs or null
};

// TICKET 2.1 BUG: Percentage discount is applied incorrectly.
// Expected: applyPercentageDiscount(200, 10) -> 180
// Current implementation divides the discount twice, barely changing the price.
exports.applyPercentageDiscount = (subtotal, percent) => {
    if (percent < 0) return subtotal;
    const discount = subtotal * (percent / 100);
    // BUG: discount is divided by 100 again
    return subtotal - (discount / 100);
};

// TICKET 2.2 BUG: Free shipping threshold off-by-one.
// Expected: total >= threshold should be eligible for free shipping.
exports.isEligibleForFreeShipping = (total, threshold) => {
    // BUG: This excludes the exact threshold value.
    return total > threshold;
};
