# Team Page & Auth Redirect — Handoff

**Author:** Arnav Sharma
**Status:** Complete
**Branch:** feature/team-page-auth-redirect (merged to main)
**Commit:** https://github.com/Lozdaa/capstone-boilerplater-team16/commit/eeeb317e48163047649e13e93c6a9117b86902c8

## What's done
- Team page built at `/dashboard`, replacing the placeholder dashboard content.
- Displays team name, project name, and one card per member (name, role, blurb, placeholder avatar).
- Login (email/password and Google) redirects to the team page on success, reusing the existing auth flow — no changes made to login logic.
- Team page is only reachable when logged in, via the existing `(dashboard)/layout.tsx` session check.
- Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop.
- Card colours match the design doc: `#63ABF2` card background, `#406EF9` surrounding the photo and name.

## For the next person
- Member data is static, in `frontend/src/lib/team-data.ts`.
- No Firestore reads/writes are used for this feature.
- Photos aren't required per the requirements doc; placeholder avatar shows when `photoUrl` is missing or fails to load.

## Sign-off

| Role | Name | Reviewed |
| --- | --- | --- |
| PM | Syed Raees Hussain | yes |
| UX Designer | Maxwell Taylor | yes |
| BA | Imas Imthiyas | yes |