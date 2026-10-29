/*
  RELEASE SWITCH.

  allowUnresolvedInProduction: false (default)
    The production build (Vercel, branch main) FAILS while any content is
    missing(...) or approved: false. Vercel then keeps the previous version
    of the site live. This is what makes placeholders impossible to ship by
    accident.

  DO NOT MERGE website changes into main while anything is unresolved: /add-member and the
  Dex title sync commit straight to main, and every one of those builds would then fail too,
  so new community members would not appear on the live site.

  allowUnresolvedInProduction: true
    Only flip this with Avishag's OK. Production then builds, and every
    missing or unapproved item is silently left out of the public site.
*/
export const release = {
  allowUnresolvedInProduction: false,
}
