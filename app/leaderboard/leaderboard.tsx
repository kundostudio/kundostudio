"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { Line } from "~/components/Line";
import { useViewport } from "~/hooks/useViewport";
import { fetcher } from "~/lib/fetcher";
import { formatNumber } from "~/lib/utils";

import styles from "./leaderboard.module.scss";

const ITEMS_PER_PAGE = 50;

const columnHelper = createColumnHelper<{
  rank: number;
  name: string;
  invitedBy: string | null;
  rewards: {
    amount: string;
    unit: string;
    precision: number;
  };
}>();

const formatWithPrecision = (amount: string, precision: number) => {
  const value = Number(amount) / Math.pow(10, precision);
  return formatNumber(value);
};

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
    cell: (info) => info.getValue() || "-",
  }),
  columnHelper.accessor("rewards", {
    header: () => <span>meow</span>,
    cell: (info) => {
      const rewards = info.getValue();
      return (
        <span className={styles.meowAmount}>
          {formatWithPrecision(rewards.amount, rewards.precision)}
        </span>
      );
    },
  }),
];

export function Leaderboard({ className }: React.HTMLProps<HTMLTableElement>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const viewport = useViewport();

  const fetchLeaderboardData = useCallback(({ pageParam = 0 }) => {
    return fetcher(`/api/leaderboard?page=${pageParam + 1}&limit=${ITEMS_PER_PAGE}`);
  }, []);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboardData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length < ITEMS_PER_PAGE) return undefined;
      return pages.length;
    },
  });

  const allData = useMemo(() => data?.pages?.flatMap((page) => page.data) || [], [data]);

  const table = useReactTable({
    data: allData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowHeight = {
    mobile: 32,
    mobileXL: 32,
    tablet: 36,
    laptop: 40,
    desktop: 48,
    desktopXL: 48,
  }[viewport || "desktop"];

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => rowHeight,
    getScrollElement: () => tableContainerRef.current,
    overscan: 5,
  });

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching]
  );

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      const handleScroll = () => fetchMoreOnBottomReached(container);
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [fetchMoreOnBottomReached]);

  return (
    <div className={className}>
      <Line direction="horizontal" className={styles.leaderboardHeaderLine} />
      <div ref={tableContainerRef} className={styles.leaderboardWrapper}>
        <table className={styles.leaderboard}>
          <thead className={styles.header}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ display: "flex", width: "100%" }}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={styles.headerItem}
                    style={{ display: "flex", flex: 1 }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className={styles.leaderboardBody}
            style={{
              display: "grid",
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  className={styles.row}
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={styles.rowItem}
                      style={{ display: "flex", flex: 1 }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {isFetching && <div className={styles.loading}>Loading more...</div>} */}
      </div>
    </div>
  );
}
