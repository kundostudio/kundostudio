import { notFound } from "next/navigation";

export default function CatchAllNotFound() {
  // Route fallback: any unmatched path uses (kundo) not-found with its layout
  notFound();
}

