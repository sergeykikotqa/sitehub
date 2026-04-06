# Premium Showcase Architecture

This document is the internal standard for premium showcase work in this repo.

It is also the technical architecture reference for any future hero or motion changes in `Next.js App Router`.

This pass does not change runtime behavior.

## Purpose

- keep premium showcase decisions repo-specific and repeatable
- define the default hero architecture for this codebase
- prevent future hero/motion work from drifting into hydration-heavy or fragile patterns

## Repo Baseline

- stack: `Next.js 16 App Router`, `React 19`, `Tailwind 4`
- current site is server-first and calm by default
- current hero is the correct baseline unless a later pass proves otherwise

## Premium Showcase Standard

In this repo, premium means:

- immediate clarity
- visual confidence
- calm control
- low interaction noise

Preferred patterns:

- typography-first hero
- editorial rhythm
- restrained microinteractions
- subtle supportive motion

Avoided patterns:

- scrolljacking
- always-on parallax
- long intros
- motion that delays comprehension

## Case Visual Proof Rules

Invariant:

- each flagship case must prove `I understand`
- each flagship case must prove `I trust`
- each flagship case must prove `I act`
- if one of the three is missing or duplicated, the case is invalid

Implementation rules:

- `proofFrames` contains exactly `understand`, `trust`, and `act`
- `og` stays separate as a social asset and is not part of proof logic
- anti-cheating rule: a visual is valid only if the benefit is readable without the caption
- asset quality gate: unloaded images, empty placeholders, skeleton states, and unreadable crops are rejected
- each proof frame must have one clear focal point
- no fallback rule: missing proof frames must fail explicitly instead of substituting another frame
- frame limit rule: each flagship case contains exactly 3 proof frames
- flagship cases fail explicitly if the proof system is invalid

## Default Hero Pattern

The default pattern for this repo is locked as:

`Static final base (SSR) + optional one-shot client overlay + dual CSS composition + single HeroSpec`

Internal concepts:

- `HeroSpec`: content, order, motion tokens, reduced-motion policy
- `HeroLayout`: layout and composition only
- `HeroOverlay.client`: optional motion layer only
- `static final base`: final headline, CTA, visual anchor, readable without JS

## Server/Client Boundaries

Must remain server-rendered:

- final headline
- final CTA
- base visual / LCP layer
- base layout structure

May be client-only:

- optional one-shot overlay
- isolated pointer accents
- isolated interactive details that do not affect first-render structure

`'use client'` is a boundary, not a convenience flag. Keep the client boundary as small as possible.

## Hydration and Motion Guardrails

Forbidden:

- viewport-based conditional rendering on initial render
- reduced-motion branching that changes DOM structure
- `return null` or mounted-gates for hero content
- random, time-based, locale-based, or browser-dependent first-render output
- multiple transient hero layers active at once
- motion that depends on JS for content visibility

Required:

- content remains readable without animation
- motion is removable without layout changes
- hero final state exists in the static base, not only in transient overlays

## Motion Tooling Position

Repo defaults:

- CSS / `transform` / `opacity` first
- no motion library is introduced by this pass
- `GSAP`, `Motion`, and `WebGL` are future options with trade-offs, not current commitments

Any future tooling decision must preserve the current server-first baseline.

## Locked Defaults for This Project

- current hero stays static-first and immediately readable
- no smooth-scroll baseline on mobile
- reduced motion must reduce or remove non-essential animation without changing content structure
- no future hero work may weaken `LCP`, `CLS`, `INP`, or comprehension

## Stop Rules

Freeze hero work back to static if:

- it requires runtime viewport branching for the base composition
- it depends on frequent mounted-gates or fragile restarts
- content edits routinely break the scene
- motion makes the hero slower to understand or less stable to load

If unsure, keep the static base and remove the extra motion layer.
