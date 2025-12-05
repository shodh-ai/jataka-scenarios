#!/bin/bash
# 1. Create a "Fake Remote" folder
mkdir -p /var/simulated-remote/repo.git
cd /var/simulated-remote/repo.git
git init --bare

# 2. Setup the Student's Repo
cd /home/appuser/workspace/full-stack-ecommerce
git init
git add .
git commit -m "Initial Corporate Commit"

# 3. Link them
git remote add origin /var/simulated-remote/repo.git
git push -u origin main

# 4. Create the "Colleague's" branch (The Conflict Creator)
cd /tmp
git clone /var/simulated-remote/repo.git colleague-repo
cd colleague-repo
# Make a change that will conflict later
echo "// Conflict here" >> src/server.js
git add .
git commit -m "Colleague update"
git push origin main
rm -rf /tmp/colleague-repo
