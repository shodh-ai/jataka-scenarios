#!/bin/bash
# Initialize a simulated git repo
mkdir shop-api
cd shop-api
git init
git config user.email "student@jataka.ai"
git config user.name "Student"

# Commit 1
echo "const DISCOUNT = 0.10;" > settings.js
git add .
git commit -m "Initial commit"

# Simulate Colleague pushing to main
echo "const DISCOUNT = 0.20;" > settings.js
git add .
git commit -m "Manager updated discount to 20%"

# Simulate Student working on old branch
git checkout -b feature-black-friday HEAD~1
echo "const DISCOUNT = 0.50;" > settings.js
git add .
git commit -m "Added Black Friday discount"

# Return to main
git checkout main

echo "SETUP COMPLETE: 'shop-api' repository created."
echo "TASK: Merge 'feature-black-friday' into 'main' and resolve the conflict."
