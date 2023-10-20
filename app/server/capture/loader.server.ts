import { json, redirect } from "@remix-run/node";

import { auth, sessionCookie } from "~/session/auth.server";

import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await auth(request);

    if (session === "") {
      throw new Error();
    }

    return json(
      {},
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
