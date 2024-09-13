"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { formatNumber } from "~/lib/utils";

import type { LeaderboardPosition } from "./data";
import { LEADERBOARD_POSITIONS } from "./data";
import styles from "./leaderboard.module.scss";

const columnHelper = createColumnHelper<LeaderboardPosition>();

const columns = [
  columnHelper.accessor("rank", {
    header: () => <span>rank</span>,
    cell: (info) => {
      const rank = info.getValue();
      return rank.toString().padStart(2, "0");
    },
  }),
  columnHelper.accessor("name", {
    header: () => <span>name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("invitedBy", {
    header: () => <span>invited by</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("multipliers", {
    header: () => <span>multipliers</span>,
    cell: (info) => null,
  }),
  columnHelper.accessor("meowAmount", {
    header: () => <span>meow</span>,
    cell: (info) => <span className={styles.meowAmount}>{formatNumber(info.getValue())}</span>,
  }),
];

export function Leaderboard({ className }: React.HTMLProps<HTMLTableElement>) {
  const table = useReactTable({
    data: LEADERBOARD_POSITIONS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className={className}>
      <thead className={styles.header}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={styles.headerItem}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={styles.leaderboardBody}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={styles.rowItem}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
