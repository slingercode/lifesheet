import type { ColumnDef } from "@tanstack/react-table";
import type { PgSelectData } from "~/db";

export const columns: ColumnDef<PgSelectData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue<PgSelectData["id"]>("id")}</div>,
  },
  {
    accessorKey: "question_id",
    header: "Question",
    cell: ({ row }) => (
      <div>{row.getValue<PgSelectData["question_id"]>("question_id")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div>{row.getValue<PgSelectData["category"]>("category")}</div>
    ),
  },
  {
    accessorKey: "responseString",
    header: "Response string",
    cell: ({ row }) => (
      <div>
        {String(row.getValue<PgSelectData["responseString"]>("responseString"))}
      </div>
    ),
  },
  {
    accessorKey: "responseNumber",
    header: "Response number",
    cell: ({ row }) => (
      <div>
        {String(row.getValue<PgSelectData["responseNumber"]>("responseNumber"))}
      </div>
    ),
  },
  {
    accessorKey: "responseBoolean",
    header: "Response boolean",
    cell: ({ row }) => (
      <div>
        {String(
          row.getValue<PgSelectData["responseBoolean"]>("responseBoolean"),
        )}
      </div>
    ),
  },
  {
    accessorKey: "formatted",
    header: "Date",
    cell: ({ row }) => (
      <div>{String(row.getValue<PgSelectData["formatted"]>("formatted"))}</div>
    ),
  },
];
