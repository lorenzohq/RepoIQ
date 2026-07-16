import { analyzeUser, GitHubError } from "@/lib/github";
import { normalizeHandle } from "@/lib/report";

export async function GET(request: Request) {
    const handle = normalizeHandle(
        new URL(request.url).searchParams.get("handle") ?? "",
    );

    if (!handle) {
        return Response.json({ error: "Enter a GitHub handle." }, { status: 400 });
    }

    try {
        return Response.json(await analyzeUser(handle));
    } catch (err) {
        if (err instanceof GitHubError) {
            return Response.json({ error: err.message }, { status: err.status });
        }
        return Response.json(
            { error: "Could not reach GitHub. Check the handle and try again." },
            { status: 502 },
        );
    }
}
