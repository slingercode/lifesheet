import { useLoaderData } from "@remix-run/react";

import { loader } from "~/server/data";

export { loader };

export default function Data() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      {data.map(({ id, timestamp, formatted }) => (
        <div key={id}>
          <p>{id}</p>
          <p>{timestamp}</p>
          <p>{formatted}</p>
        </div>
      ))}
    </div>
  );
}
