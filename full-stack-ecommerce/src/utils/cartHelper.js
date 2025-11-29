exports.calculateTotal = (price, quantity) => {
    // TICKET 1.4: Student must write a unit test to catch this.
    // If quantity is 0, it should return 0.
    // If quantity is string "5", it should cast it.
    
    // Current Buggy Implementation:
    if (quantity < 0) return 0;
    return price * quantity; // Fails on string inputs or null
};
