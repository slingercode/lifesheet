import { useLoaderData } from "@remix-run/react";
import { Table } from "~/components/data";

import { loader } from "~/server/data";

export { loader };

export default function Data() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="p-5">
      <Table data={data} />
    </div>
  );
}
