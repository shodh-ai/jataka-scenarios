public class AccountHandler {
    public static void updateContacts(List<Account> accList) {
        // BUG: Loop starts here
        for (Account acc : accList) {
            // CRITICAL ERROR: SOQL Query inside the loop
            // Jataka AI will flag this line
            List<Contact> contacts = [SELECT Id, LastName FROM Contact WHERE AccountId = :acc.Id];
            
            for(Contact c : contacts) {
                c.Description = 'Updated via Trigger';
                update c; // DML inside loop (Double error)
            }
        }
    }
}
