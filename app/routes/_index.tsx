import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getData } from "~/db";

export const meta: MetaFunction = () => {
  return [
    { title: "Lifesheet" },
    { name: "description", content: "Personal data for ednoesco 👀" },
  ];
};

export async function loader() {
  const data = await getData();

  return json({ data });
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      {data.map(({ id, question, formatted, category }) => (
        <div key={id}>
          <p>{question}</p>
          <p>{formatted}</p>
          <p>{category}</p>
        </div>
      ))}
    </div>
  );
}
