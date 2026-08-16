# Login Page Restyle Testing

## Summary

Login Page (Restyled) — manual testing of invalid login flows, checking that Marceline's visual restyle did not change any underlying authentication behaviour.

Auth flows tested:
- Wrong password → correct error shown, no redirect
- Unverified email → correctly blocked with verification message, no redirect
- Non-existent email → correct generic error shown, no redirect
- Empty fields → caught by existing form validation before submission
- Google sign-in cancelled → correct failure state, no crash
- Error message styling → matches restyled design (red, legible, correctly positioned)
- Confirmed no change to auth logic, validation, or redirect behaviour (LG-20 to LG-26, AC-08, AC-09)

No bugs found.

Tested by: Arnav Sharma

**Shared with**

| Role | Name | Shared on | Reviewed |
| --- | --- | --- | --- |
| PM | Syed Raees Hussain | | yes |
| DEV | Marceline | 16/08/2026 | yes |
