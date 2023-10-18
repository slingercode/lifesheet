import { json, redirect } from "@remix-run/node";

import { getData } from "~/db";
import { auth, sessionCookie } from "~/session/auth.server";

import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await auth(request);
    const data = await getData();

    return json(
      { data },
      {
        headers: {
          "Set-Cookie": await sessionCookie.serialize(session),
        },
      },
    );
  } catch (error) {
    return redirect("/");
  }
};
