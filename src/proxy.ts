import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_REALM = 'Basic realm="Sitehub Admin"';
const ADMIN_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
};

function withAdminHeaders(response: NextResponse | Response) {
  response.headers.set("X-Robots-Tag", ADMIN_HEADERS["X-Robots-Tag"]);
  return response;
}

function decodeCredentials(value: string) {
  try {
    return atob(value);
  } catch {
    return null;
  }
}

function unauthorizedResponse() {
  return withAdminHeaders(
    new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        ...ADMIN_HEADERS,
        "WWW-Authenticate": ADMIN_REALM,
      },
    }),
  );
}

export function proxy(request: NextRequest) {
  const username = process.env.SITEHUB_ADMIN_USERNAME;
  const password = process.env.SITEHUB_ADMIN_PASSWORD;

  if (!username || !password) {
    return withAdminHeaders(
      new NextResponse("Admin access is not configured.", {
        status: 503,
        headers: ADMIN_HEADERS,
      }),
    );
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encodedCredentials = authorization.slice("Basic ".length).trim();
  const decodedCredentials = decodeCredentials(encodedCredentials);

  if (!decodedCredentials) {
    return unauthorizedResponse();
  }

  const separatorIndex = decodedCredentials.indexOf(":");

  if (separatorIndex === -1) {
    return unauthorizedResponse();
  }

  const suppliedUsername = decodedCredentials.slice(0, separatorIndex);
  const suppliedPassword = decodedCredentials.slice(separatorIndex + 1);

  if (suppliedUsername !== username || suppliedPassword !== password) {
    return unauthorizedResponse();
  }

  if (request.nextUrl.pathname === "/admin" || request.nextUrl.pathname === "/admin/") {
    const adminIndexUrl = request.nextUrl.clone();
    adminIndexUrl.pathname = "/admin/index.html";

    return withAdminHeaders(NextResponse.rewrite(adminIndexUrl));
  }

  return withAdminHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*"],
};
