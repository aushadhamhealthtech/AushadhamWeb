"use client";

/**
 * SidebarShell — structural scaffold shared by DoctorSidebar and PatientSidebar.
 *
 * Handles:
 *   - fixed left-0 aside with z-50 and h-screen
 *   - smooth width transition between collapsed (collapsedWidth) and expanded (expandedWidth)
 *   - optional dim backdrop that closes the sidebar on click
 *   - uncontrolled (internal useState) or controlled (expanded + onExpandedChange) expand state
 *
 * Content is rendered via a render prop:
 *   children({ expanded, open, close, toggle })
 * so any sidebar content can react to the current expand state.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";

export type SidebarCtx = {
  expanded: boolean;
  open:     () => void;
  close:    () => void;
  toggle:   () => void;
};

type SidebarShellProps = {
  children:           (ctx: SidebarCtx) => React.ReactNode;
  expandedWidth?:     string;   // Tailwind width class — default "w-60"
  collapsedWidth?:    string;   // Tailwind width class — default "w-20"
  asideClassName?:    string;   // extra classes appended to <aside>
  backdrop?:          boolean;  // show dim overlay when expanded — default true
  backdropClassName?: string;   // extra classes on the backdrop div
  // Optional controlled mode — omit both to use uncontrolled (internal) state
  expanded?:          boolean;
  onExpandedChange?:  (v: boolean) => void;
};

export function SidebarShell({
  children,
  expandedWidth     = "w-60",
  collapsedWidth    = "w-20",
  asideClassName,
  backdrop          = true,
  backdropClassName,
  expanded: controlledExpanded,
  onExpandedChange,
}: SidebarShellProps) {
  const [internalExpanded, setInternal] = useState(false);
  const expanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  function setExpanded(v: boolean) {
    if (onExpandedChange) onExpandedChange(v);
    else setInternal(v);
  }

  const ctx: SidebarCtx = {
    expanded,
    open:   () => setExpanded(true),
    close:  () => setExpanded(false),
    toggle: () => setExpanded(!expanded),
  };

  return (
    <>
      {backdrop && (
        <div
          aria-hidden="true"
          onClick={ctx.close}
          className={cn(
            "fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] transition-all duration-300",
            expanded
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
            backdropClassName
          )}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen flex flex-col z-50",
          "transition-[width] duration-300 ease-in-out",
          expanded ? expandedWidth : collapsedWidth,
          asideClassName
        )}
      >
        {children(ctx)}
      </aside>
    </>
  );
}
