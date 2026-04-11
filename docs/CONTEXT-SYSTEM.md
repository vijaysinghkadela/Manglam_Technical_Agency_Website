# Context Summary System

## 🎯 Purpose

This system automatically generates a comprehensive context summary when you're approaching the token/context limit in AI conversations. It preserves all project knowledge, recent work, and current state so you can seamlessly continue in a new conversation.

---

## 🚀 Quick Start

### Generate a Context Summary

Run this command when you're nearing the token limit:

```bash
npm run context
```

Or directly:

```bash
node scripts/generate-context-summary.js
```

This creates: **`CONTEXT-SUMMARY.md`** (~18KB)

### Use the Summary

1. Open `CONTEXT-SUMMARY.md`
2. Copy **the entire contents**
3. Start a new AI conversation
4. Paste the contents as your first message
5. Add: "Continue working on the MTA website based on the above context"

The AI will have full knowledge of:
- ✅ All optimizations applied
- ✅ Project structure
- ✅ Recent git commits
- ✅ Current file modifications
- ✅ Performance improvements
- ✅ Browser compatibility status
- ✅ Build configuration
- ✅ Known issues
- ✅ Next steps

---

## 📋 What's Included

The context summary automatically includes:

### 1. Project Overview
- Package info (name, version, dependencies)
- Tech stack (Next.js, React, TypeScript, etc.)
- Client information (MTA, contact details)

### 2. Recent Work
- Last 10 git commits
- Current git status (modified/untracked files)
- Recent optimizations from docs
- Build status

### 3. Project Structure
- Complete `src/` directory tree
- Key files and their purpose
- API routes
- Component organization

### 4. Technical Context
- Browser compatibility targets
- Performance optimizations applied
- Animation strategy
- Known issues
- Environment variables

### 5. Documentation References
- Links to all docs
- Build commands
- Common tasks
- Testing recommendations

### 6. AI Assistant Guidelines
- Performance best practices
- Code style guidelines
- Browser compatibility requirements
- Animation principles

---

## 🔄 When to Use

### Use this system when:
1. **Approaching token limit** - Getting close to 1M tokens
2. **Switching conversations** - Moving to a new chat session
3. **After major work** - Completed significant features/fixes
4. **Handing off work** - Transferring to another developer/AI
5. **Weekly updates** - Preserving project state regularly

### Recommended workflow:
```bash
# Before closing a long conversation
npm run context

# Copy CONTEXT-SUMMARY.md contents
# Start new conversation with that context
```

---

## 📊 Context Summary Contents

### Section Breakdown:

| Section | Purpose | Lines |
|---------|---------|-------|
| Project Overview | Basic info, tech stack | ~80 |
| Recent Work | Git commits, optimizations | ~100 |
| Project Structure | Directory tree | ~150 |
| Key Files | File purposes | ~80 |
| Browser Compat | Supported browsers, issues | ~60 |
| Optimizations | Performance improvements | ~100 |
| Animation Strategy | GPU acceleration, best practices | ~60 |
| Build & Deploy | Commands, env vars | ~50 |
| Documentation | Links to all docs | ~40 |
| Common Tasks | Frequent commands | ~60 |
| Current State | Status, next steps | ~80 |
| AI Guidelines | Rules for assistants | ~100 |
| Quick Summary | TL;DR version | ~60 |

**Total**: ~1,000 lines, ~18KB

---

## 🛠️ Customization

### Add Custom Sections

Edit `scripts/generate-context-summary.js`:

```javascript
function getCustomInfo() {
  // Add your custom data extraction here
  return 'Your custom content';
}

// Then add to the summary template:
const summary = `
...
## Your Custom Section
${getCustomInfo()}
...
`;
```

### Include Additional Files

```javascript
function getAdditionalContext() {
  const customFile = readFileIfExists(path.join(projectRoot, 'your-file.md'));
  return customFile || 'Not found';
}
```

### Adjust Verbosity

Modify these constants in the script:

```javascript
const GIT_COMMITS_COUNT = 10;  // Change number of commits
const STRUCTURE_DEPTH = 3;     // Limit directory depth
const SUMMARY_LINES = 50;      // Lines from optimization doc
```

---

## 📁 Files in This System

```
MTA Website/
├── scripts/
│   └── generate-context-summary.js    # Main generator script
├── docs/
│   ├── CONTEXT-SYSTEM.md              # This file (documentation)
│   ├── BROWSER-OPTIMIZATION.md        # Referenced in summary
│   └── OPTIMIZATION-SUMMARY.md        # Referenced in summary
├── CONTEXT-SUMMARY.md                 # Generated output (gitignored)
└── package.json                       # npm run context command
```

### Gitignore Configuration

`CONTEXT-SUMMARY.md` is **NOT** tracked in git because:
- It's auto-generated
- Contains current state (changes frequently)
- Personal to each developer's session
- Can be regenerated anytime with `npm run context`

---

## 🎨 Output Format

The generated summary uses Markdown with:
- ✅ Clear sections with emoji headers
- ✅ Code blocks with syntax highlighting
- ✅ Tables for structured data
- ✅ Checklists for status tracking
- ✅ Collapsible sections for long content
- ✅ Links to referenced files

### Optimized for AI Parsing:
- Clear section delimiters
- Consistent formatting
- Hierarchical structure
- Context markers ("Summary for Quick Context")
- Direct copy/paste instructions

---

## 💡 Pro Tips

### 1. Regular Snapshots
Generate context summaries regularly, not just at token limit:
```bash
# Every major milestone
git commit -m "Feature complete"
npm run context
# Save CONTEXT-SUMMARY.md with a date
cp CONTEXT-SUMMARY.md "backups/context-$(date +%Y%m%d).md"
```

### 2. Team Handoffs
When passing work to another developer:
```bash
npm run context
# Share CONTEXT-SUMMARY.md via Slack/email
# They paste it into their AI assistant
```

### 3. Weekly Archives
Keep weekly snapshots for project history:
```bash
# Add to .gitignore
backups/context-*.md

# Weekly script
npm run context && mv CONTEXT-SUMMARY.md "backups/context-week-$(date +%U).md"
```

### 4. Version-Specific Context
Generate before major version changes:
```bash
npm run context
mv CONTEXT-SUMMARY.md "docs/context-v0.1.0.md"
git add docs/context-v0.1.0.md
git commit -m "Archive context for v0.1.0"
```

---

## 🔍 Troubleshooting

### Issue: Script fails to run

**Solution**: Check Node.js version
```bash
node --version  # Should be 18+ for fs promises
```

### Issue: Git commands fail

**Solution**: Ensure you're in a git repository
```bash
git status  # Should not error
```

### Issue: Missing files in output

**Solution**: Check file paths in script
```javascript
// Add debug logging
console.log('Looking for:', filePath);
console.log('Exists?', fs.existsSync(filePath));
```

### Issue: Context too large

**Solution**: Reduce verbosity
```javascript
// In generate-context-summary.js
const GIT_COMMITS_COUNT = 5;      // Fewer commits
const STRUCTURE_DEPTH = 2;        // Shallower structure
// Remove less critical sections
```

---

## 📊 Context Size Guidelines

| Context Size | When to Use | Tokens (approx) |
|--------------|-------------|-----------------|
| **Full** (18KB) | New conversation, major handoff | ~6,000 |
| **Medium** (12KB) | Quick context switch | ~4,000 |
| **Light** (6KB) | Simple continuations | ~2,000 |

Current default: **Full** (18KB, ~6,000 tokens)

You can customize by commenting out sections in `generate-context-summary.js`.

---

## 🚀 Future Enhancements

Planned improvements:

1. **Interactive Mode**
   ```bash
   npm run context -- --interactive
   # Prompts: Which sections to include?
   ```

2. **Diff Mode**
   ```bash
   npm run context -- --diff
   # Shows what changed since last summary
   ```

3. **Compression**
   ```bash
   npm run context -- --compress
   # Generates smaller context (50% reduction)
   ```

4. **AI-Optimized Output**
   ```bash
   npm run context -- --format=json
   # JSON format for AI systems
   ```

5. **Multi-Project Support**
   ```bash
   npm run context -- --project=gymos
   # Generate for different projects
   ```

---

## 🎯 Best Practices

### DO:
✅ Run `npm run context` **before** hitting token limits  
✅ Copy **the entire** CONTEXT-SUMMARY.md  
✅ Paste at the **start** of a new conversation  
✅ Add specific instructions after pasting  
✅ Keep CONTEXT-SUMMARY.md in `.gitignore`  
✅ Archive important snapshots with dates  

### DON'T:
❌ Manually edit CONTEXT-SUMMARY.md (regenerate instead)  
❌ Wait until conversation errors to generate  
❌ Copy only parts of the summary  
❌ Paste in the middle of a conversation  
❌ Commit CONTEXT-SUMMARY.md to git  
❌ Share summaries with sensitive data  

---

## 📚 Related Documentation

- **BROWSER-OPTIMIZATION.md** - Full optimization details
- **OPTIMIZATION-SUMMARY.md** - Quick reference
- **AGENTS.md** - AI assistant instructions
- **PRD.md** - Product requirements
- **README.md** - Project readme

---

## 🎉 Success Metrics

A good context summary should:
- ✅ Enable seamless conversation continuation
- ✅ Preserve all critical project knowledge
- ✅ Take < 30 seconds to generate
- ✅ Be copy/paste ready
- ✅ Work with any AI assistant
- ✅ Stay under 20KB
- ✅ Update automatically with git/file changes

---

## 💬 Example Usage

### Scenario: Hitting Token Limit

```bash
# In terminal
$ npm run context

# Output:
✓ Context summary generated successfully!
Output: CONTEXT-SUMMARY.md
Size: 17.79 KB

# Open CONTEXT-SUMMARY.md
# Copy all contents
# Start new conversation:
```

**New conversation:**
```
[Paste CONTEXT-SUMMARY.md contents]

Continue working on the MTA website. I need to:
1. Add a new feature to the contact form
2. Optimize images
3. Fix any remaining warnings
```

AI will have full context and can continue seamlessly! 🎉

---

**Maintained by**: MTA Development Team  
**Last Updated**: 2026-04-06  
**Version**: 1.0.0
