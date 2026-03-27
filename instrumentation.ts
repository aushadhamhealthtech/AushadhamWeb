export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node 25+ creates a broken localStorage global when --localstorage-file
    // is passed without a valid path (which Next.js does in dev). This causes
    // SSR crashes because typeof localStorage !== "undefined" is true but
    // localStorage.getItem is not a function. Remove it so SSR code correctly
    // treats localStorage as unavailable.
    if (
      typeof globalThis.localStorage !== "undefined" &&
      typeof globalThis.localStorage.getItem !== "function"
    ) {
      // @ts-expect-error — intentionally deleting broken experimental global
      delete globalThis.localStorage;
    }
  }
}
