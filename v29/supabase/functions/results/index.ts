import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

serve(async () => {
  try {
    const apiKey = Deno.env.get("FOOTBALL_DATA_API_KEY");

    if (!apiKey) {
      return new Response("Missing API key", { status: 500 });
    }

    const response = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches",
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch results",
        details: err.message,
      }),
      { status: 500 }
    );
  }
});