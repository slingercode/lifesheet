import { jwtVerify, SignJWT } from "jose";
import { createCookie } from "@remix-run/node";

export const sessionCookie = createCookie("session", {
  sameSite: "lax",
});

const validateJwt = async (token: string, secret: string): Promise<boolean> => {
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));

    return true;
  } catch (error) {
    return false;
  }
};

export const auth = async (request: Request) => {
  try {
    const SECRET = process.env.JWT_TOKEN!;

    const cookieHeader = request.headers.get("Cookie");

    const session: string | null = await sessionCookie.parse(cookieHeader);

    if (session !== null) {
      if (await validateJwt(session, SECRET)) {
        return session;
      }
    }

    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (token === SECRET) {
      const jwt = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(SECRET));

      return jwt;
    }

    return "";
  } catch (error) {
    throw new Error();
  }
};
