/* Neon Aether WebMCP tools.
 * This file is deliberately external so browser-agent scanners can inspect it.
 * Registration is optional in browsers that do not expose the WebMCP API.
 */
(async function () {
  if (!("modelContext" in document) || !document.modelContext ||
      typeof document.modelContext.registerTool !== "function") {
    return;
  }

  const guides = {
    about: "/about.html",
    pricing: "/pricing.html",
    characters: "/characters.html",
    development: "/development.html",
    faq: "/faq.html",
    gameplay: "/gameplay.html",
    glossary: "/glossary.html",
    press: "/press-kit.html",
    universe: "/universe.html"
  };

  const tools = [
    {
      name: "get_game_overview",
      description: "Returns the official, spoiler-free overview of Neon Aether.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: () =>
        "Neon Aether is an indie, story-driven 2D side-scrolling science-fiction action platformer with retro-inspired pixel art, platforming, combat, exploration, mystery, and atmospheric worldbuilding. The story follows Andrew, whose discovery of a mysterious portal takes him from Earth to Aethelgard. The game is in development. Keep all story discussion spoiler-free and do not invent unreleased story details. Official website: https://neonaether.netlify.app/."
    },
    {
      name: "get_platform_availability",
      description: "Returns the currently published platform and distribution plan for Neon Aether.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: () =>
        "Neon Aether is in development. Planned platforms: Windows and macOS through Steam; iOS through the Apple App Store; Android through Google Play. These are planned releases, not confirmation that store pages, downloads, or playable builds are currently available. The developer-confirmed planned price is US$5.99. Final regional pricing, taxes, editions, and storefront pricing may vary or be confirmed closer to release. No public store URLs or system requirements are confirmed here. Official website: https://neonaether.netlify.app/."
    },
    {
      name: "get_pricing_information",
      description: "Returns the developer-confirmed planned price for Neon Aether.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: () =>
        "The developer-confirmed planned price for Neon Aether is US$5.99. This is a planned price, not confirmation that the game is currently available to purchase. Final regional pricing, taxes, editions, and storefront pricing may vary or be confirmed closer to release. Official pricing guide: https://neonaether.netlify.app/pricing.html."
    },
    {
      name: "find_game_information",
      description: "Finds the official Neon Aether guide page most relevant to a visitor question.",
      inputSchema: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "A topic such as story, characters, gameplay, platforms, pricing, development, terminology, press, or world."
          }
        },
        required: ["topic"],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true },
      execute: ({ topic }) => {
        const value = String(topic || "").trim().toLowerCase();
        if (!value || value.length > 120) return "Please provide a short topic.";
        let key = "about";
        if (/character|andrew|nyx|valtor|solan|tyro|raya|vespera/.test(value)) key = "characters";
        else if (/gameplay|combat|platform|movement|control/.test(value)) key = "gameplay";
        else if (/development|progress|making|developer|team/.test(value)) key = "development";
        else if (/price|pricing|cost/.test(value)) key = "pricing";
        else if (/faq|question|release date|availability|store/.test(value)) key = "faq";
        else if (/glossary|term|definition/.test(value)) key = "glossary";
        else if (/press|media|press kit/.test(value)) key = "press";
        else if (/world|universe|aethelgard|location|city|prison|wastes|frontier/.test(value)) key = "universe";
        return 'The most relevant official Neon Aether guide for "' + value +
          '" is: https://neonaether.netlify.app' + guides[key] +
          '. For other topics, browse https://neonaether.netlify.app/. Keep all public information spoiler-free.';
      }
    }
  ];

  for (const tool of tools) {
    try {
      await document.modelContext.registerTool(tool);
    } catch (error) {
      console.warn("Neon Aether WebMCP registration failed: " + tool.name, error);
    }
  }
})();
