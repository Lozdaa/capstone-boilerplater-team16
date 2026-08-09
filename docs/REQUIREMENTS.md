# Requirements: Team Page and Login Styling

- **Feature:** Bootstrap Restyling (styled login page leading into a team page)
- **Author:** Business Analyst
- **Reviewers:** PM, UX Designer
- **Status:** Draft for review
- **Version:** 1.1
- **Last updated:** 9 August 2026
- **Location:** Team Git repository, linked from the Planner card

---

## 1. Document Control

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 August 2026 | BA | Initial requirements for team page and login styling |
| 1.1 | 9 August 2026 | BA | Aligned TP-10 and TP-12 with the approved card header layout. Recorded that Create Account and Continue With Google are pre-existing login elements. |

---

## 2. Scope

### In scope

- A team page showing the team name, project name, and a card for every team member.
- Visual restyling of the existing login page.
- Static team data for the mock sprint.

### Out of scope

- Any change to authentication logic or configuration.
- Firestore reads or writes, backend endpoints, or database schema changes.
- Editing team member details from the user interface.
- Sign up, password reset, or account recovery screens.

### Assumptions

| ID | Assumption |
| --- | --- |
| A-01 | The feature is built on the existing boilerplate. No new framework is introduced. |
| A-02 | Authentication already works and does not need changes. |
| A-03 | Team data is static for this sprint and comes from one agreed source. |
| A-04 | The page is read only. There is no create, edit, or delete behaviour. |
| A-05 | The team has up to 5 members. The layout must not break if a member is added or removed. |

---

## 3. Team Page Requirements

### 3.1 Page level

| ID | Requirement | Rule |
| --- | --- | --- |
| TP-01 | Display the team name. | Required. Shown once at the top of the page as the primary heading. |
| TP-02 | Display the project name. | Required. Shown near the team name as a secondary heading. |
| TP-03 | Display one card per team member. | Required. Cards render in a consistent grid or list. |
| TP-04 | All cards use identical structure and styling. | No card is visually favoured over another. |

### 3.2 Member fields

| ID | Field | Required | Display rule | Validation and fallback |
| --- | --- | --- | --- | --- |
| TP-10 | Photo | No | Left of the card header at a fixed size and aspect ratio. Cropped to fill, not stretched. | If missing or it fails to load, show the placeholder avatar (TP-11). |
| TP-11 | Placeholder avatar | Conditional | Same position and size as a real photo. | Used whenever TP-10 has no usable image. |
| TP-12 | Name | Yes | Beside the photo in the card header, as the card heading. | Must not be empty. Recommended maximum 40 characters. Longer names wrap within the header. |
| TP-13 | Role | Yes | Below the card header, visually distinct from the name. | Allowed values: Project Manager, Business Analyst, UX Designer, Developer. A member may hold more than one, separated by a comma. Must not be empty. |
| TP-14 | About us blurb | Yes | Under the role. Supports multiple lines. | Recommended 150 to 300 characters, hard maximum 400. Must wrap and must not overflow the card. |

### 3.3 Data

| ID | Requirement |
| --- | --- |
| TP-20 | Each member record holds: identifier, name, role, photo reference, blurb. Team level data holds team name and project name. |
| TP-21 | Adding or removing a member must not require a change to the page layout. |

---

## 4. Login Page Styling Scope

The login work is **visual styling only**. No functional change is permitted.

### Allowed

| ID | Allowed |
| --- | --- |
| LG-01 | Layout and positioning of existing elements. |
| LG-02 | Colours, and background. |
| LG-03 | Fonts, font sizes, and weights. |
| LG-04 | Spacing, padding, and alignment. |
| LG-05 | Button styling, including hover, focus, active, and disabled states. |
| LG-06 | Input field styling, labels, and placeholder text. |
| LG-07 | Styling of existing error and loading messages. |
| LG-08 | Logo, imagery, and decorative elements. |

### Not allowed

| ID | Must remain unchanged |
| --- | --- |
| LG-20 | Authentication logic and the authentication provider. |
| LG-21 | Login validation behaviour and the rules that decide success or failure. |
| LG-22 | Authentication configuration, environment variables, and keys. |
| LG-23 | Session handling and token storage. |
| LG-24 | The existing login flow, including the number of steps and the redirect on success. |
| LG-25 | Existing input field names, types, and identifiers used by the authentication code. |
| LG-26 | The set of fields on the form. No field is added or removed. |

NOTE: The Create Account link and the Continue With Google button are existing elements of the login page, confirmed by UX on 9 August 2026. They are restyled in place. Enabling, removing, or reconfiguring either sign in path is a functional change and is not permitted under LG-20, LG-22, LG-24, or LG-26.

NOTE: If a styling change appears to require a functional change, the developer can raise it with me (BA) and PM before proceeding rather than changing the logic.

---

## 5. Navigation and Access

| ID | Requirement |
| --- | --- |
| NV-01 | The team page is reachable only after a successful login. |
| NV-02 | A user who is not logged in and requests the team page directly by URL is redirected to the login page. |
| NV-03 | On successful login the user lands on the team page. |
| NV-04 | The existing login flow and redirect are reused, not rewritten. |

---

## 6. Non Functional Requirements

| ID | Requirement |
| --- | --- |
| NFR-01 | The layout remains readable and usable on a phone, a tablet, and a desktop screen. |
| NFR-02 | Cards stack in a single column on small screens and use a multi column grid on desktop. |
| NFR-03 | No horizontal scrolling at any supported width. |
| NFR-04 | Member photos are optimised for web delivery. |
| NFR-05 | The team page and the login page share a consistent palette, typography, and component styling. |

---

## 7. Edge Cases

| ID | Edge case | Expected behaviour |
| --- | --- | --- |
| EC-01 | Member has no photo | Show the placeholder avatar at the same size and position. Card height stays consistent with other cards. |
| EC-02 | Photo reference is broken or the image fails to load | Fall back to the placeholder avatar rather than showing a broken image icon. |
| EC-03 | Very long member name | Wrap onto a second line within the card header, or truncate if wrapping would break the layout. The header grows to fit rather than overlapping the photo. |
| EC-04 | Very long blurb | Allow multiple lines. Text must not overflow the card or overlap other content. |
| EC-05 | Very short blurb | Card keeps a consistent minimum height so the grid stays even. |
| EC-06 | Member holds more than one role | Roles display on one line separated by a comma and wrap if needed. |
| EC-07 | Team data is empty or fails to load | Show a message such as "Team information is unavailable." Do not show a blank page or an error trace. |
| EC-08 | Team page URL requested without logging in | Redirect to the login page, per NV-02. |
| EC-09 | Invalid credentials submitted after restyling | The same behaviour as before the restyle. Only the appearance of the message changes. |

---

## 8. Acceptance Criteria

Verified by the Developers.

### Team page

- [ ] AC-01 Team name and project name are displayed (TP-01, TP-02).
- [ ] AC-02 Every member appears with a photo or placeholder, name, role, and blurb (TP-03, TP-10 to TP-14).
- [ ] AC-03 A member with no photo shows the placeholder avatar and the card layout is unchanged (EC-01).
- [ ] AC-04 A broken photo reference falls back to the placeholder avatar (EC-02).
- [ ] AC-05 A long name and a long blurb do not break or overflow the layout (EC-03, EC-04).

### Login page

- [ ] AC-06 The login page styling has been updated and matches the agreed design.
- [ ] AC-07 Login with valid credentials still succeeds and lands on the team page (NV-03).
- [ ] AC-08 Login with invalid credentials produces the same outcome as before the restyle (EC-09).
- [ ] AC-09 No authentication logic, configuration, or session code has been changed (LG-20 to LG-26).

### Both pages

- [ ] AC-10 Both pages display correctly on a phone, a tablet, and a desktop screen, with no horizontal scrolling (NFR-01 to NFR-03).
- [ ] AC-11 The team page cannot be reached without logging in (NV-02).
- [ ] AC-12 The two pages share a consistent visual style (NFR-05).

---

## 9. Handoff Notes

**Done:** Requirements for the team page and login restyle are documented, covering field level display and validation rules, the styling only boundary for login, and edge cases.

**Deliverable:** This document in the team Git repository, linked from the Planner card.

**For UX**

- Design one reusable member card. All members use the same card.
- Provide a placeholder avatar treatment for members without a photo.
- Design for a long name and a long blurb, not just ideal length content.
- Provide both a desktop and a mobile layout.
- Keep the login form fields exactly as they are. Restyle them, do not restructure them.
- Please review and sign off at the bottom.

**For the PM**

- Please review and sign off at the bottom.

**Shared with**

| Role | Name | Shared on | Reviewed |
| --- | --- | --- | --- |
| PM | Syed Raees Hussain | 09/08/2026 | yes |
| UX Designer | Maxwell Taylor | 08/08/2026 | yes |