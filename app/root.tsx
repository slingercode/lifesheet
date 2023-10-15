import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { TooltipProvider } from "~/ui/tooltip";

import { connectDb } from "./db";
import styles from "./globals.css";
import { Header } from "./components";
import { auth } from "./session/auth.server";
import { ThemeProvider } from "./theme.provider";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    await auth(request);
    const db = connectDb();

    if (db === undefined) {
      return json({ session: true, db: false });
    }

    return json({ session: true, db: true });
  } catch (error) {
    return json({ session: false, db: false });
  }
};

export default function App() {
  const { session, db } = useLoaderData<typeof loader>();

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <TooltipProvider>
            <Header session={session} db={db} />

            <main className="w-screen">
              <Outlet />
            </main>
          </TooltipProvider>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
