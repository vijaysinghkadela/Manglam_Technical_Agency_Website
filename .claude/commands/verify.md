# Verify Completion

Verify that work is complete and ready to merge/deploy.

## Usage
/verify

## Process
1. Run all verification commands
2. Check test results
3. Verify build succeeds
4. Confirm feature works as specified
5. Report status

## Output
Verification report with evidence.

---

Run full verification on the current work.

Use the `verification-before-completion` skill:

### Verification Commands

```bash
# Frontend
cd frontend
npx tsc --noEmit
npm run lint
npm test
npm run build

# Backend
cd backend
npm run lint
npm test
npm start & # Start server
curl http://localhost:5000/api/health # Health check
```

### Checklist
- [ ] TypeScript compiles without errors
- [ ] No lint warnings or errors
- [ ] All tests pass
- [ ] Build completes successfully
- [ ] Feature works as specified (manual check)
- [ ] No console errors in browser
- [ ] Works on mobile viewport

### Report Format
```markdown
## Verification Report

### Results
| Check | Status | Details |
|-------|--------|---------|
| TypeScript | ✅/❌ | [details] |
| Lint | ✅/❌ | [details] |
| Tests | ✅/❌ | X passed, Y failed |
| Build | ✅/❌ | [time/errors] |
| Manual | ✅/❌ | [notes] |

### Overall Status
Ready to merge: Yes/No

### Issues Found
[List any issues]
```

Run all checks and report results with evidence.
