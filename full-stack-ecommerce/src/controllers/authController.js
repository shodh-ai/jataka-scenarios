exports.register = async (req, res) => {
    const { username, password } = req.body;

    // TICKET 1.2 BUG: The Validator is too strict.
    // It only allows lowercase letters. No numbers, no special chars.
    // Student must fix this to: /^[a-zA-Z0-9!@#$%^&*]{8,}$/
    const passwordRegex = /^[a-z]+$/; 

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            error: "Invalid Password format. (Hint: Current regex is too strict)" 
        });
    }

    // ... registration logic ...
    res.status(201).json({ message: "User created" });
};
