import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "~/ui/button";
import {
  Table as UITable,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "~/ui/table";

import { columns } from "./columns";

import type { PgSelectData } from "~/db";

type TableProps = {
  data: any[];
};

export const Table = ({ data }: TableProps) => {
  const table = useReactTable({
    data: data as PgSelectData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="rounded-lg border">
        <UITable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
      <div className="flex w-full items-center justify-between px-3 pt-5">
        <div className="flex">
          <p className="text-sm">{`Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()}`}</p>
        </div>
        <div className="flex gap-5">
          <Button
            variant="secondary"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Prev
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
