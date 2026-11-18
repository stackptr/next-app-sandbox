import type { ReactElement } from "react";

export function SiteFooter(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-gray-200 py-4 text-center text-sm text-gray-500">
      © {year} next-app-sandbox
    </footer>
  );
}
