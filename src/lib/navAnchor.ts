/**
 * Tiny module-level store for a pending scroll anchor.
 * NexusNav writes it before navigating home; NexusHome reads+clears it on mount.
 */

let _pendingAnchor: string | null = null;

export function setPendingAnchor(id: string): void {
  _pendingAnchor = id;
}

export function consumePendingAnchor(): string | null {
  const v = _pendingAnchor;
  _pendingAnchor = null;
  return v;
}
