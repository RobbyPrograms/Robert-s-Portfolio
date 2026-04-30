export const projects = [
  {
    title: "RoliBot NBA",
    subtitle: "AI Picks & Props",
    description:
      "Live NBA research desk: ensemble ML on the full board—moneylines, props, optional book cross-checks—with injury-filtered lines and a graded track record. Built for quick decisions, not hype posts.",
    href: "https://nba-bot-one.vercel.app/",
    tags: ["Next.js", "Ensemble ML", "Supabase", "Live slate"],
    preview: {
      host: "nba-bot-one.vercel.app",
      eyebrow: "NBA",
      displayName: "RoliBot",
      tagline: "Ensemble ML · live slate · graded history",
      variant: "sports" as const,
    },
  },
  {
    title: "API Architecture Playground",
    subtitle: "Multi-protocol API lab",
    description:
      "Hands-on system with nine live services—REST, WebSocket, SSE, GraphQL, RPC, webhooks, SOAP, gRPC, and an event-driven model—plus a request playground to compare how each style behaves. Built to show system-design judgment, not just code.",
    href: "https://api-architecture-playground.vercel.app/",
    tags: ["Next.js", "System design", "Multi-protocol", "Live services"],
    preview: {
      host: "api-architecture-playground.vercel.app",
      eyebrow: "Protocols",
      displayName: "API Playground",
      tagline: "REST · real-time · GraphQL · gRPC · events",
      variant: "api" as const,
    },
  },
] as const;
