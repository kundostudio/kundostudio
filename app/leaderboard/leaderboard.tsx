"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";

import { Line } from "~/components/Line";
import { Medal } from "~/components/medal";
import { cn, formatNumber } from "~/lib/utils";
import { LeaderboardPosition, Multiplier } from "~/types";

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
    cell: (info) => <Medals multipliers={info.getValue()} />,
  }),
  columnHelper.accessor("meowAmount", {
    header: () => <span>meow</span>,
    cell: (info) => <span className={styles.meowAmount}>{formatNumber(info.getValue())}</span>,
  }),
];

function Medals({ multipliers }: { multipliers: Multiplier[] }) {
  const {
    medalYOffset1,
    medalBlur1,
    medalYOffset2,
    medalBlur2,
    logoYOffset1,
    logoBlur1,
    logoYOffset2,
    logoBlur2,
  } = useControls({
    medalYOffset1: {
      value: 3.76,
      min: 0,
      max: 5,
      step: 0.1,
    },
    medalBlur1: {
      value: 15.06,
      min: 0,
      max: 20,
      step: 0.1,
    },
    medalYOffset2: {
      value: 1.88,
      min: 0,
      max: 5,
      step: 0.1,
    },
    medalBlur2: {
      value: 5.65,
      min: 0,
      max: 20,
      step: 0.1,
    },
    logoYOffset1: {
      value: 3.76,
      min: 0,
      max: 5,
      step: 0.1,
    },
    logoBlur1: {
      value: 15.06,
      min: 0,
      max: 20,
      step: 0.1,
    },
    logoYOffset2: {
      value: 0.94,
      min: 0,
      max: 5,
      step: 0.1,
    },
    logoBlur2: {
      value: 3.76,
      min: 0,
      max: 10,
      step: 0.1,
    },
  });

  return (
    <div className={styles.multipliers}>
      {multipliers.map((value, i) => (
        <Medal
          key={i}
          type={value}
          className={styles.medal}
          medalYOffset1={medalYOffset1}
          medalBlur1={medalBlur1}
          medalYOffset2={medalYOffset2}
          medalBlur2={medalBlur2}
          logoYOffset1={logoYOffset1}
          logoBlur1={logoBlur1}
          logoYOffset2={logoYOffset2}
          logoBlur2={logoBlur2}
        />
      ))}
    </div>
  );
}

export function Leaderboard({ className }: React.HTMLProps<HTMLTableElement>) {
  const wrapper = useRef<HTMLDivElement>(null);
  const leaderboard = useRef<HTMLTableElement>(null);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const table = useReactTable({
    data: LEADERBOARD_POSITIONS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const w = wrapper.current;

    const checkOverflow = () => {
      if (w && leaderboard.current) {
        const wrapperWidth = w.clientWidth;
        const tableWidth = leaderboard.current.scrollWidth;
        const scrollLeft = w.scrollLeft;

        const isAtRightEdge = Math.ceil(wrapperWidth + scrollLeft) >= tableWidth;
        console.log("pepe");
        setShowRightButton(!isAtRightEdge);
        setShowLeftButton(scrollLeft > 0);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    w?.addEventListener("scroll", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      w?.removeEventListener("scroll", checkOverflow);
    };
  }, []);

  const handleButtonClick = (direction: "left" | "right") => {
    if (wrapper.current && leaderboard.current) {
      const scrollContainer = wrapper.current;
      const table = leaderboard.current;
      const currentScroll = scrollContainer.scrollLeft;

      // Find the first fully visible column
      const columns = table.querySelectorAll("th");
      let nextColumnIndex = 0;

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        const columnLeftEdge = column.offsetLeft - currentScroll;
        if (columnLeftEdge >= 0) {
          nextColumnIndex = direction === "right" ? i + 1 : i - 1;
          break;
        }
      }

      // If there's a next/previous column, scroll to it
      if (nextColumnIndex >= 0 && nextColumnIndex < columns.length) {
        const targetColumn = columns[nextColumnIndex];
        scrollContainer.scrollTo({
          left: targetColumn.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className={className}>
      <Line direction="horizontal" className={styles.leaderboardHeaderLine} />
      {showLeftButton && (
        <button
          className={cn(styles.learboardButton, styles.leaderboardLeftButton)}
          onClick={() => handleButtonClick("left")}
        >
          {"<"}
        </button>
      )}
      {showRightButton && (
        <button
          className={cn(styles.learboardButton, styles.leaderboardRightButton)}
          onClick={() => handleButtonClick("right")}
        >
          {">"}
        </button>
      )}
      <div ref={wrapper} className={styles.leaderboardWrapper}>
        <table ref={leaderboard} className={styles.leaderboard}>
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
              <tr key={row.id} className={styles.row}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.rowItem}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
