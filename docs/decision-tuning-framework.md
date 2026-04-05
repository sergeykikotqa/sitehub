# Decision Tuning Framework

This document defines how product decisions are made after the decision engine has shipped.

It is intentionally narrow:

- no new analytics events
- no structural redesign based on intuition
- no reaction to low-volume noise

If a proposed product tweak conflicts with this document, the document takes priority.

This framework is mandatory for any product or UX changes after launch.
Any deviation must be justified with data from the observation layer.

## Current observation layer

Use only the current analytics contract:

- `cta_click`
- `portfolio_case_open`
- `page_view`

Required analytics dimensions:

- `surface`: `hero | home | portfolio | detail | generic`
- `scenario`: `system | editorial | generic`
- `tier`: `primary | secondary`

These dimensions are the decision model itself.
Do not rename them, widen them, or infer them downstream.

## Core principle

Metrics are interpreted relative to the current product model, not relative to a generic landing page benchmark.

This site is a decision engine:

- `hero` diagnoses
- `home` reinforces
- `/portfolio` validates
- `detail` persuades

Every metric must be read in that context.

## Minimum data rules

### Minimum data threshold

Do not make product decisions until there are at least `50–100` unique users on the relevant layer.

If user-level uniqueness is unavailable, use the closest stable equivalent such as `unique sessions`, and use it consistently across all reports.

### Time window guardrail

Do not evaluate the metrics on a single day of traffic.

Use one of these windows:

- at least `5–7` days
- or enough traffic to pass the minimum data threshold

Whichever happens later is the safer decision point.

## Correlation rule

Never act on a single metric in isolation.

A signal must be confirmed by at least one related metric before it triggers a change.

Examples:

- low `CTA`, high `case_open` = proof-seeking behavior, not necessarily a problem
- low `CTA`, low `case_open` = real signal
- skewed `scenario share`, normal `detail CTA rate` = watch first, do not immediately rewrite the split

## Benchmarks

### 1. Scenario share

| Metric | Normal | Warning | Action |
| --- | --- | --- | --- |
| `system/editorial CTA share` | `40–60% / 60–40%` | `>75%` to one side | Check whether one scenario is overemphasized |
| `editorial share` | `>=25%` | `<25%` | Strengthen editorial proof on `hero/home` |
| `system share` | `>=25%` | `<25%` | Check whether editorial entry is too easy and dominant |

### 2. CTA vs case ratio

| Metric | Normal | Warning | Action |
| --- | --- | --- | --- |
| `cta_click / portfolio_case_open` | `0.7–1.5` | `<0.5` | Trust is too weak above the proof layer; strengthen proof on `home` |
| `cta_click / portfolio_case_open` | `<=2.0` | `>2.0` | Check whether case pages are underperforming as proof |

### 3. Portfolio drop-off

| Metric | Normal | Warning | Action |
| --- | --- | --- | --- |
| `portfolio page_view -> case_open` | `40–70%` | `<30%` | `/portfolio` is too unclear or too heavy |
| `case_open -> detail page_view` | `~100%` | `<90%` | Investigate link, click, or navigation integrity |

### 4. Scenario switch rate

| Metric | Normal | Warning | Action |
| --- | --- | --- | --- |
| `system <-> editorial switch` | `10–25%` | `>35%` | The split is unclear; re-check `hero` |
| `system <-> editorial switch` | `>=5%` | `<5%` | One scenario may be too invisible |

### 5. Detail CTA rate

| Metric | Normal | Warning | Action |
| --- | --- | --- | --- |
| `detail CTA / detail page_view` | `8–20%` | `<5%` | Narrative or proof is too weak |
| `editorial detail CTA` | `12–25%` | `<8%` | Strengthen early impulse |
| `system detail CTA` | `6–15%` | `<4%` | Strengthen trust and structure |

### 6. Hero CTA engagement

| Metric | Normal | Warning | Action |
| --- | --- | --- | --- |
| `hero CTA / home page_view` | `15–35%` | `<10%` | Diagnostic block or copy is too weak |

If `hero CTA` is low but `case/detail engagement` is healthy, treat it as an observation, not an emergency.

## Decision rules

### Do nothing is valid

If the metrics are healthy, the correct decision is to change nothing.

No change is a valid product outcome.

### One signal = one micro-fix

If one metric falls outside the acceptable range:

- make one micro-fix
- tied to one hypothesis
- then observe again

Do not open a new redesign pass for one weak signal.

### Two or more connected signals = go to one layer

If two or more related metrics fail together, go back to one specific layer only:

- `hero`
- `home`
- `/portfolio`
- `detail`

Do not change multiple layers in one pass unless the data makes that unavoidable.

### Interpretation priority

When several signals conflict, read them in this order:

1. `detail CTA rate`
2. `CTA vs case ratio`
3. `scenario share`
4. `switch rate`
5. `portfolio drop-off`

## Micro-fix scope

`Micro-fix` means a local adjustment that does **not** change:

- page structure
- block order
- CTA logic
- the `system/editorial` split

Allowed micro-fixes:

- local rhythm
- proof density
- spacing
- emphasis
- a short copy fragment inside the existing structure

If a change touches structure or scenario logic, it is not a micro-fix anymore.

## Forbidden reactions

Do not:

- add more events before the current layer proves insufficient
- react to one bad day of traffic
- optimize every metric upward at once
- redesign the split without a confirmed behavioral signal
- treat curiosity about metrics as a reason to change the product

## Practical reading guide

Expected healthy patterns:

- some users choose a scenario immediately
- some users go into cases for proof
- detail pages close the remaining hesitation

Likely problem patterns:

- everyone goes to cases and few click CTA
  - trust is too weak above the proof layer
- editorial is consistently under-selected
  - editorial proof is too weak or too hidden
- detail CTA is low after healthy detail traffic
  - persuasion on the detail page is not finishing the job

## Operating default

Until the site has enough real users:

- do not open new product/presentation passes
- do not expand analytics
- do not treat low-volume variance as insight

Observe first.
Tune only when the signal is stable.
