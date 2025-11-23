# Contributing to Aptus

This guide explains **exactly how our team works together safely** using branches, pull requests, code reviews, and Git best practices. No prior Git or GitHub experience is required.

Following these rules protects the `main` branch, prevents app-breaking mistakes, and keeps everyone in sync.

---

# 🔒 1. Core Principles (Must Follow)

### **1. Never work directly on `main`.**

All work happens on branches.

### **2. One branch = one feature or fix.**

Small, focused branches keep reviews easy.

### **3. Every branch must go through a Pull Request (PR).**

Nothing gets merged without review.

### **4. No one merges their own PR.**

Another teammate must approve it.

### **5. Keep branches up-to-date before merging.**

This prevents conflicts.

---

# 🧱 2. Branch Workflow (The Only Workflow We Use)

This is the process **every time** you want to start working.

### **Step 1 — Update your local main**

```bash
git checkout main
git pull
nvm use
npm install
```

### **Step 2 — Create a new branch**

```bash
git checkout -b yourname-feature-name
```

Examples:

* `chris-login-ui`
* `alex-api-setup`
* `sam-fix-navigation`

### **Step 3 — Do your coding**

Use VS Code, run Expo, etc.

### **Step 4 — Save your work (commit)**

```bash
git add .
git commit -m "Short description of what changed"
```

### **Step 5 — Push your branch to GitHub**

```bash
git push -u origin yourname-feature-name
```

---

# 📝 3. Pull Request (PR) Rules

When your feature is ready:

### **1. Go to GitHub → Create Pull Request**

You’ll see a banner: *“Compare & Pull Request”*.

### **2. PR Description Format**

Every PR must include:

* **What you built**
* **Why you built it**
* **Screenshots if UI**
* **Testing steps** (how reviewers can verify it works)

Example:

```
### What I built
Basic login screen layout.

### Why
Foundation for authentication flow.

### Screenshots
(Insert Expo Go screenshots)

### How to Test
1. Run npx expo start
2. Navigate to Login
3. Verify layout renders correctly
```

### **3. Assign a Reviewer**

Choose any teammate.

### **4. Address Feedback**

Make changes on your branch, commit, and push again.
Your PR updates automatically.

### **5. Reviewer Approves → Maintainer Merges**

Nobody merges their own PR.

---

# 🔄 4. Keeping Your Branch Updated

Before merging your PR, run:

```bash
git checkout yourname-feature-name
git pull --rebase origin main
```

Fix conflicts (we can help).

Push updated branch:

```bash
git push --force-with-lease
```

---

# 🛑 5. Things You Should **Never** Do

### ⛔ Don’t push to `main`.

### ⛔ Don’t write code without pulling first.

### ⛔ Don’t merge your own PR.

### ⛔ Don’t install packages without telling the team.

### ⛔ Don’t force-push `main`.

---

# 📦 6. Adding Packages

If you need a new dependency:

```bash
npm install <package-name>
```

Then commit the updated:

* `package.json`
* `package-lock.json`

Mention new dependencies in your PR description.

---

# 🧹 7. Cleaning Up Merged Branches

Once your PR is merged:

### Locally delete your branch:

```bash
git branch -d yourname-feature-name
```

### From GitHub (optional):

Click **Delete branch** after merge.

---

# 🧰 8. Troubleshooting

### **“My push is rejected”**

Run:

```bash
git pull --rebase
git push
```

### **Expo not loading**

Try:

```bash
npx expo start --tunnel
```

### **Dependencies broken**

```bash
rm -rf node_modules
npm install
```

---

# 🚀 9. Developer Tools We Use

### VS Code Extensions

* ESLint
* Prettier
* Expo Tools
* React Native Tools

### Branch Naming Style

```
yourname-feature-description
```

Examples:

* `chris-profile-page`
* `alex-hooks-refactor`
* `sam-api-client`

---

# 🤝 10. Final Notes

This workflow makes development:

* Safe
* Organized
* Easy for beginners
* Scalable as our team grows

If anything is confusing, ask — we’re building this together.

---

End of CONTRIBUTING.md
