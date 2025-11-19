# Pull Request

## Description

<!-- Describe your changes in detail -->

## Type of Change

<!-- Check all that apply -->

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring
- [ ] Database migration

## Related Issue

<!-- Link to the issue this PR addresses -->

Closes #

## How Has This Been Tested?

<!-- Describe the tests you ran to verify your changes -->

- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Manual testing

**Test Configuration:**
- Browser(s):
- Device(s):
- Environment:

## Screenshots (if applicable)

<!-- Add screenshots to help explain your changes -->

## Checklist

<!-- Check all that apply -->

### Code Quality
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings or errors
- [ ] I have removed any console.log statements

### Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested my changes in the preview deployment

### Documentation
- [ ] I have updated the documentation accordingly
- [ ] I have updated the API documentation (if applicable)
- [ ] I have added/updated JSDoc comments

### Database
- [ ] I have created necessary database migrations
- [ ] Migrations have been tested in staging
- [ ] I have updated seed data if needed
- [ ] Database changes are backward compatible

### Security
- [ ] I have not introduced any security vulnerabilities
- [ ] I have not committed any secrets or sensitive data
- [ ] Input validation is implemented where needed
- [ ] Authentication/authorization is properly handled

### Performance
- [ ] I have optimized queries and API calls
- [ ] Images are optimized and lazy-loaded
- [ ] I have tested performance impact
- [ ] No unnecessary re-renders (React components)

## Deployment Notes

<!-- Any special considerations for deployment -->

- [ ] Requires environment variable changes
- [ ] Requires database migration
- [ ] Requires manual intervention
- [ ] Safe to auto-deploy

### Environment Variables (if needed)

```bash
# List new environment variables
NEW_VAR="value"
```

## Post-Deployment Verification

<!-- Steps to verify after deployment -->

- [ ] Health check passes
- [ ] Critical user flows work
- [ ] No errors in Sentry
- [ ] Performance metrics are acceptable

## Rollback Plan

<!-- How to rollback if something goes wrong -->

1.
2.

## Additional Notes

<!-- Any additional information for reviewers -->

---

## For Reviewers

**Priority:** [ ] High [ ] Medium [ ] Low

**Review Focus:**
- [ ] Code quality and best practices
- [ ] Security implications
- [ ] Performance impact
- [ ] Test coverage
- [ ] Documentation completeness

**Estimated Review Time:** <!-- e.g., 15 minutes, 1 hour -->
