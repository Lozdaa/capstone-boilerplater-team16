# Team Page and Authentication Redirect Testing

# Summary

Team Page - ✓ tests/unit/lib/team-page.test.tsx (6 tests):
Visual Elements have been tested:
- Name
- Blurbs (with long-blurbs tested)
- Member Photos (Placeholder and images existing in text)
- Fallbacks for if no Team Members

Authentication Redirect - ✓ tests/unit/lib/auth-redirect.test.tsx (13 tests):
- Tested if any of the protected pages (i.e. /dashboard) could be accessed by a logged-out user
- Tested if redirects would keep the correct page to go back to once logged in for both nested and root pages
- Tested to see if direct access to sign-up and sign-in were allowed since they should not be protected
- Tested to see if logged in users can access the protected pages

Tested by: Marceline Andreopoulos


**Shared with**

| Role | Name | Shared on | Reviewed |
| --- | --- | --- | --- |
| PM | Syed Raees Hussain | 16/08/2026 | yes |
| DEV | Arnav | 15/08/2026 | yes |