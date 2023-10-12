import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Lifesheet" },
    { name: "description", content: "Personal data for ednoesco 👀" },
  ];
};

export default function Index() {
  return <div />;
}
