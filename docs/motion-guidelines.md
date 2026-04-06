# Motion Guidelines

This document defines non-negotiable motion rules for the product.

Any UI change that introduces or modifies animation must follow these rules.
If a proposed change conflicts with this document, the document takes priority.

Implementation architecture for hero and motion work lives here:
→ /docs/premium-showcase-architecture.md

This document remains the source of truth for motion tone and restraint.

## Core principle

Animation must never slow down understanding of the page.

This site prioritizes:

- fast comprehension
- calm premium feel
- minimal interaction noise

## Forbidden

- No typewriter / per-letter animation
- No delayed text reveal that blocks reading
- No attention-grabbing effects in hero (bounce, scale-in, parallax, etc.)
- No repeated or looping hero animations

## Hero rules

- Hero content must be readable immediately on load
- No animation is the default and preferred state
- If animation is used:

  - it must be optional and removable without layout changes
  - it must not delay reading

## Allowed (optional, very restrained)

- Line-based fade/translate-in (not per-letter)
- Duration: 150–250ms
- Stagger between lines: 60–100ms
- Trigger: once on initial load only
- Easing: ease-out or standard ease
- No re-trigger on scroll

## Tone

Animation should feel:

- invisible
- supportive
- intentional

If animation is noticeable, it is too strong.

## Implementation constraint

All animations must degrade gracefully:

- no layout shift
- no dependency on JS for content visibility
- content should remain fully accessible without animation

## Decision rule

If unsure — remove the animation.

Premium = calm + immediate clarity.
