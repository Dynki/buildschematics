import type {
  Build,
  StructureCategory,
  AestheticStyle,
  CategoryMeta,
} from "./types";

// ─────────────────────────────────────────────────────────────
// Mock Builds
// ─────────────────────────────────────────────────────────────

export const builds: Build[] = [
  {
    id: "1",
    title: "Gothic Mountain Castle",
    slug: "gothic-mountain-castle",
    structure: "Castles",
    styles: ["Gothic", "Medieval"],
    difficulty: "Advanced",
    survivalFriendly: false,
    estimatedTime: "8–12 hours",
    description:
      "A towering gothic fortress carved into the mountainside, featuring dark spires, gargoyle parapets, and a grand courtyard.",
    materials: [
      "Deepslate Bricks",
      "Polished Blackstone",
      "Dark Oak Wood",
      "Iron Bars",
      "Soul Lanterns",
      "Crying Obsidian",
    ],
    images: [
      "https://picsum.photos/seed/castle1/800/500",
      "https://picsum.photos/seed/castle1a/800/500",
      "https://picsum.photos/seed/castle1b/800/500",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Lay the Foundation",
        description:
          "Clear a 60×60 area on the mountainside and place your deepslate brick foundation two blocks deep. Mark the four corner towers at each edge.",
        image: "https://picsum.photos/seed/castle1s1/600/400",
      },
      {
        stepNumber: 2,
        title: "Build the Corner Towers",
        description:
          "Raise each corner tower to 30 blocks using a circular pattern of 7-block diameter. Add arrow slits every 5 blocks.",
      },
      {
        stepNumber: 3,
        title: "Construct the Curtain Walls",
        description:
          "Connect all four towers with 3-block thick curtain walls, including crenellations at the top using polished blackstone slabs.",
      },
      {
        stepNumber: 4,
        title: "Add the Main Keep",
        description:
          "Build the central keep 40 blocks tall, with a great hall, throne room, and dungeon level. Use dark oak logs for interior framing.",
        image: "https://picsum.photos/seed/castle1s4/600/400",
      },
      {
        stepNumber: 5,
        title: "Detail and Lighting",
        description:
          "Add soul lanterns to all parapets, crying obsidian accents on the spires, and iron bar grating on all windows.",
      },
    ],
  },
  {
    id: "2",
    title: "Cottagecore Woodland Cottage",
    slug: "cottagecore-woodland-cottage",
    structure: "Houses",
    styles: ["Cottagecore", "Fantasy"],
    difficulty: "Beginner",
    survivalFriendly: true,
    estimatedTime: "1–2 hours",
    description:
      "A cozy overgrown cottage nestled among the birch trees, with a living roof, flower boxes, and a herb garden out front.",
    materials: [
      "Birch Wood",
      "Moss Blocks",
      "Flowering Azalea Leaves",
      "Mud Bricks",
      "Barrel",
      "Lanterns",
      "Bee Nest",
    ],
    images: [
      "https://picsum.photos/seed/cottage1/800/500",
      "https://picsum.photos/seed/cottage1a/800/500",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Frame the Walls",
        description:
          "Place a 9×7 footprint using mud bricks for the walls, leaving openings for the front door and two side windows.",
        image: "https://picsum.photos/seed/cottage1s1/600/400",
      },
      {
        stepNumber: 2,
        title: "Birch Wood Framing",
        description:
          "Add exposed birch log beams at each corner and a central support beam running the length of the ridge.",
      },
      {
        stepNumber: 3,
        title: "Living Roof",
        description:
          "Use moss blocks and flowering azalea leaves for the roof with a gentle 45° pitch. Add hanging vines on the eaves.",
      },
      {
        stepNumber: 4,
        title: "Garden and Details",
        description:
          "Plant a 3×5 herb garden in front, add flower box window planters, hang a bee nest under the eaves, and place lanterns at the door.",
      },
    ],
  },
  {
    id: "3",
    title: "Modern Glass Cliff House",
    slug: "modern-glass-cliff-house",
    structure: "Houses",
    styles: ["Modern"],
    difficulty: "Intermediate",
    survivalFriendly: true,
    estimatedTime: "3–5 hours",
    description:
      "A sleek minimalist house cantilevered over a cliff edge, featuring floor-to-ceiling glass walls and a rooftop infinity pool.",
    materials: [
      "Smooth Quartz",
      "Tinted Glass",
      "Smooth Stone Slab",
      "White Concrete",
      "Sea Lanterns",
      "Cyan Terracotta",
    ],
    images: [
      "https://picsum.photos/seed/modern1/800/500",
      "https://picsum.photos/seed/modern1a/800/500",
      "https://picsum.photos/seed/modern1b/800/500",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Site Preparation",
        description:
          "Find a cliff edge with at least a 20-block drop. Excavate a flat 20×12 platform extending 8 blocks over the cliff.",
      },
      {
        stepNumber: 2,
        title: "Support Structure",
        description:
          "Build the steel-look support columns using smooth quartz pillars. Add horizontal beams of white concrete.",
      },
      {
        stepNumber: 3,
        title: "Glass Exterior",
        description:
          "Fill all exterior walls with tinted glass, leaving a thin smooth quartz border around each panel for a framed look.",
        image: "https://picsum.photos/seed/modern1s3/600/400",
      },
      {
        stepNumber: 4,
        title: "Rooftop Pool",
        description:
          "Create a 6×4 infinity pool on the roof using water source blocks at the cliff edge. Line the bottom with cyan terracotta.",
      },
      {
        stepNumber: 5,
        title: "Interior and Lighting",
        description:
          "Place sea lanterns flush in the floor for recessed lighting. Add minimal furniture using slabs and stairs.",
      },
    ],
  },
  {
    id: "4",
    title: "Desert Trading Outpost",
    slug: "desert-trading-outpost",
    structure: "Villages",
    styles: ["Desert"],
    difficulty: "Intermediate",
    survivalFriendly: true,
    estimatedTime: "4–6 hours",
    description:
      "A bustling sandstone trading outpost in the desert, with market stalls, a camel stable, and a central well.",
    materials: [
      "Sandstone",
      "Cut Sandstone",
      "Terracotta",
      "Chiseled Sandstone",
      "Cactus",
      "Dead Bush",
      "Hay Bale",
    ],
    images: [
      "https://picsum.photos/seed/desert1/800/500",
      "https://picsum.photos/seed/desert1a/800/500",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Layout the Streets",
        description:
          "Mark out a cross-shaped street layout with a central plaza of 15×15 blocks using cut sandstone paths.",
      },
      {
        stepNumber: 2,
        title: "Build the Market Stalls",
        description:
          "Place 6 market stalls along the streets using sandstone walls and terracotta slab awnings in warm tones.",
        image: "https://picsum.photos/seed/desert1s2/600/400",
      },
      {
        stepNumber: 3,
        title: "Central Well and Inn",
        description:
          "Build a decorative well in the plaza using chiseled sandstone and add the main inn building behind it.",
      },
      {
        stepNumber: 4,
        title: "Decorative Touches",
        description:
          "Scatter hay bales, dead bushes, cactus pots, and hanging lanterns throughout. Add carpet banners on the stalls.",
      },
    ],
  },
  {
    id: "5",
    title: "Snowy Fantasy Castle",
    slug: "snowy-fantasy-castle",
    structure: "Castles",
    styles: ["Fantasy", "Snow"],
    difficulty: "Advanced",
    survivalFriendly: false,
    estimatedTime: "10–15 hours",
    description:
      "A ethereal ice castle set in the frozen tundra, with glowing blue spires, frozen moat, and aurora-lit towers.",
    materials: [
      "Packed Ice",
      "Blue Ice",
      "Prismarine",
      "Sea Lanterns",
      "Snow Blocks",
      "Glass",
      "Amethyst Blocks",
    ],
    images: [
      "https://picsum.photos/seed/snowcastle1/800/500",
      "https://picsum.photos/seed/snowcastle1a/800/500",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Frozen Moat",
        description:
          "Dig a 4-block wide, 3-block deep moat around an 80×80 area. Fill with blue ice and add packed ice shores.",
      },
      {
        stepNumber: 2,
        title: "Ice Towers",
        description:
          "Build 6 spire towers using packed ice with blue ice accents. Taper each tower to a point capped with amethyst.",
        image: "https://picsum.photos/seed/snowcastle1s2/600/400",
      },
      {
        stepNumber: 3,
        title: "Prismarine Walls",
        description:
          "Connect towers with prismarine walls for the dark-ice contrast look. Add sea lantern crenellations.",
      },
      {
        stepNumber: 4,
        title: "Crystal Interior",
        description:
          "Fill the interior with snow block floors, amethyst block pillars, and sea lantern ceilings for the aurora effect.",
      },
    ],
  },
  {
    id: "6",
    title: "Mega Medieval Village",
    slug: "mega-medieval-village",
    structure: "Villages",
    styles: ["Medieval"],
    difficulty: "Advanced",
    survivalFriendly: true,
    estimatedTime: "20+ hours",
    description:
      "A sprawling medieval village complete with blacksmith, tavern, market, church, and surrounding farmland.",
    materials: [
      "Oak Wood",
      "Cobblestone",
      "Stone Bricks",
      "Thatch (Hay Bale)",
      "Glass Pane",
      "Spruce Wood",
      "Flower Pots",
    ],
    images: [
      "https://picsum.photos/seed/megavillage1/800/500",
      "https://picsum.photos/seed/megavillage1a/800/500",
      "https://picsum.photos/seed/megavillage1b/800/500",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Town Planning",
        description:
          "Mark a 200×200 area and lay out the main roads using cobblestone paths. Position all major buildings on paper first.",
      },
      {
        stepNumber: 2,
        title: "Build the Church",
        description:
          "The church is the tallest building at the town centre. Use stone bricks and stained glass for the windows.",
        image: "https://picsum.photos/seed/megavillage1s2/600/400",
      },
      {
        stepNumber: 3,
        title: "Residential Homes",
        description:
          "Build 8–12 varied houses using the half-timbered style: oak frames with cobblestone infill and hay bale roofs.",
      },
      {
        stepNumber: 4,
        title: "Trades and Services",
        description:
          "Add the blacksmith forge, tavern, market stalls, and a mill at the edge of town near the farmland.",
      },
      {
        stepNumber: 5,
        title: "Farmland and Walls",
        description:
          "Surround the town with stone brick defensive walls. Add farmland plots between the walls and the outer houses.",
      },
    ],
  },
  {
    id: "7",
    title: "Automatic Crop Mega Farm",
    slug: "automatic-crop-mega-farm",
    structure: "Farms",
    styles: ["Medieval"],
    difficulty: "Intermediate",
    survivalFriendly: true,
    estimatedTime: "2–4 hours",
    description:
      "A fully automatic harvesting farm supporting wheat, carrots, potatoes, and beetroot with water-flush collection.",
    materials: [
      "Dispensers",
      "Observers",
      "Redstone Dust",
      "Hoppers",
      "Chests",
      "Water Buckets",
      "Farmland",
      "Glass",
    ],
    images: [
      "https://picsum.photos/seed/farm1/800/500",
      "https://picsum.photos/seed/farm1a/800/500",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Build the Crop Layer",
        description:
          "Create a 16×16 grid of farmland blocks hydrated by central water channels. Plant your chosen crops.",
      },
      {
        stepNumber: 2,
        title: "Observer Network",
        description:
          "Place observers facing each crop row. When crops mature they trigger the flush mechanism.",
        image: "https://picsum.photos/seed/farm1s2/600/400",
      },
      {
        stepNumber: 3,
        title: "Dispenser Flush System",
        description:
          "Connect observers via redstone to dispensers loaded with water buckets above the crop rows.",
      },
      {
        stepNumber: 4,
        title: "Collection and Storage",
        description:
          "Funnel harvested items with water streams into hoppers feeding into a chest room below the farm.",
      },
    ],
  },
  {
    id: "8",
    title: "Sky Island Mega Build",
    slug: "sky-island-mega-build",
    structure: "Mega Builds",
    styles: ["Fantasy"],
    difficulty: "Advanced",
    survivalFriendly: false,
    estimatedTime: "30+ hours",
    description:
      "A chain of floating sky islands connected by rope bridges, each themed differently with waterfalls cascading into the void.",
    materials: [
      "End Stone",
      "Purpur Blocks",
      "Chorus Flowers",
      "Mossy Cobblestone",
      "Chain",
      "Lanterns",
      "Various Logs",
      "Grass Blocks",
    ],
    images: [
      "https://picsum.photos/seed/skyisland1/800/500",
      "https://picsum.photos/seed/skyisland1a/800/500",
      "https://picsum.photos/seed/skyisland1b/800/500",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Build the Main Island",
        description:
          "Start at Y=150 and build the primary island 60×60 with a natural teardrop shape using layers of grass and stone.",
      },
      {
        stepNumber: 2,
        title: "Secondary Islands",
        description:
          "Build 4 smaller islands at varying heights around the main island, each with a unique biome theme.",
        image: "https://picsum.photos/seed/skyisland1s2/600/400",
      },
      {
        stepNumber: 3,
        title: "Rope Bridges",
        description:
          "Connect islands using chain bridges. Use fence posts and chains with plank walkways. Add lanterns along the rails.",
      },
      {
        stepNumber: 4,
        title: "Waterfalls",
        description:
          "Add water source blocks at island edges so water cascades down endlessly into the void for a dramatic effect.",
      },
      {
        stepNumber: 5,
        title: "Structures and Details",
        description:
          "Add a ruined tower on the main island, small shrines on secondary islands, and chorus flower gardens on the outer islands.",
      },
    ],
  },
  {
    id: "9",
    title: "Moss Fairy Cottage",
    slug: "moss-fairy-cottage",
    structure: "Houses",
    styles: ["Fantasy", "Cottagecore"],
    difficulty: "Advanced",
    survivalFriendly: true,
    estimatedTime: "3–5 hours",
    description:
      "A traditional Japanese-style house nestled in a cherry blossom biome, featuring a curved pagoda roof, koi pond, lantern-lit garden paths, and a cozy interior.",
    materials: [
      "Moss Block (12 stacks)",
      "Acacia Planks (9 stacks)",
      "Spruce Stairs (8 stacks)",
      "Spruce Trapdoor (7 stacks)",
      "Oak Wood (5 stacks)",
      "Stripped Spruce Logs (5 stacks)",
      "Birch Slab (4 stacks)",
      "Calcite (4 stacks)",
      "Diorite Slab (4 stacks)",
      "Jungle Trapdoor (3 stacks)",
      "Azalea Leaves (3 stacks)",
      "Flowering Azalea Leaves (3 stacks)",
      "Polished Diorite Slab (3 stacks)",
      "Light Blue Stained Glass (2 stacks)",
      "Dark Oak Planks (2 stacks)",
      "Birch Leaves (2 stacks)",
      "Dark Oak Slab (2 stacks)",
      "Melon (2 stacks)",
      "Barrel (1x59)",
      "Dark Oak Fence Gate (1x59)",
      "Dark Oak Stairs (1x59)",
      "Mossy Cobblestone (1x58)",
      "Torch (1x56)",
      "Dark Oak Fence (1x50)",
      "Oak Leaves (1x49)",
      "Spruce Planks (1x48)",
      "Jungle Stairs (1x46)",
      "Light Gray Carpet (1x43)",
      "Podzol (1x44)",
      "Cherry Trapdoor (1x32)",
      "Mossy Cobblestone Slab (1x25)",
      "Mossy Cobblestone Stairs (1x21)",
      "Coarse Dirt (1x19)",
      "Cobblestone (1x19)",
      "Lantern (1x19)",
      "Polished Diorite (1x18)",
      "Chain (1x17)",
      "Stone Bricks (1x17)",
      "Cyan Stained Glass Pane (1x16)",
      "Diorite (1x16)",
      "Chiseled Bookshelf (1x15)",
      "Cobblestone Slab (1x13)",
      "Spruce Log (1x13)",
      "Vine (1x13)",
      "Cyan Stained Glass (1x12)",
      "Spruce Fence (1x11)",
      "Granite (1x10)",
      "Jungle Slab (1x10)",
      "Ladder (1x10)",
      "Mossy Stone Bricks (1x10)",
      "Spruce Wood (1x10)",
      "Stripped Spruce Wood (1x10)",
      "Brown Banner (1x8)",
      "Mossy Cobblestone Wall (1x8)",
      "Spruce Button (1x7)",
      "Spruce Door (1x7)",
    ],
    images: [
      "/moss-fairy-cottage-1.png",
      "/moss-fairy-cottage-2.png",
      "/moss-fairy-cottage-3.png",
    ],
    videoUrl: "AQlbt5nGn38",
    requiresResourcePack: true,
    steps: [
      {
        stepNumber: 1,
        title: "Choose Your Location",
        description:
          "Find a flat area within a cherry blossom biome. Clear a 20×20 plot and lay a deepslate tile foundation, raised one block above ground.",
      },
      {
        stepNumber: 2,
        title: "Frame the Walls",
        description:
          "Use cherry wood logs for the four corner pillars and wall frames. Fill the walls with cherry wood planks, leaving gaps for shoji-style white stained glass pane windows.",
        image: "https://picsum.photos/seed/cherryjapanese1s2/600/400",
      },
      {
        stepNumber: 3,
        title: "Build the Curved Roof",
        description:
          "Create a classic Japanese upturned roof using cherry wood stairs and slabs. Layer the stair blocks outward at each level so the eaves curve upward at the corners.",
        image: "https://picsum.photos/seed/cherryjapanese1s3/600/400",
      },
      {
        stepNumber: 4,
        title: "Design the Interior",
        description:
          "Furnish the inside with crafting tables, barrels, and flower pots. Use bamboo blocks for pillars and add lanterns for warm ambient lighting.",
      },
      {
        stepNumber: 5,
        title: "Create the Koi Pond & Garden",
        description:
          "Dig a small 5×5 pond outside the front entrance, line it with deepslate and add tropical fish. Surround with bamboo shoots, lantern posts, and cherry blossom saplings.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Structure category metadata
// ─────────────────────────────────────────────────────────────

export const structureCategories: CategoryMeta[] = [
  {
    label: "Castles",
    slug: "castles",
    description: "Imposing fortresses, towers, and keeps",
    emoji: "🏰",
    color: "bg-rose-900",
  },
  {
    label: "Houses",
    slug: "houses",
    description: "Cozy cottages to grand mansions",
    emoji: "🏠",
    color: "bg-pink-900",
  },
  {
    label: "Villages",
    slug: "villages",
    description: "Full settlements and town layouts",
    emoji: "🏘️",
    color: "bg-fuchsia-900",
  },
  {
    label: "Mega Builds",
    slug: "mega-builds",
    description: "Colossal projects for dedicated builders",
    emoji: "🌍",
    color: "bg-purple-900",
  },
  {
    label: "Farms",
    slug: "farms",
    description: "Efficient food and resource farms",
    emoji: "🌾",
    color: "bg-rose-800",
  },
];

// ─────────────────────────────────────────────────────────────
// Style category metadata
// ─────────────────────────────────────────────────────────────

export const styleCategories: CategoryMeta[] = [
  {
    label: "Gothic",
    slug: "gothic",
    description: "Dark stone, spires, and gargoyles",
    emoji: "🦇",
    color: "bg-rose-950",
  },
  {
    label: "Medieval",
    slug: "medieval",
    description: "Classic cobblestone villages and keeps",
    emoji: "⚔️",
    color: "bg-pink-950",
  },
  {
    label: "Modern",
    slug: "modern",
    description: "Sleek glass and concrete architecture",
    emoji: "🏙️",
    color: "bg-fuchsia-950",
  },
  {
    label: "Cottagecore",
    slug: "cottagecore",
    description: "Rustic, overgrown, and charming",
    emoji: "🌿",
    color: "bg-purple-950",
  },
  {
    label: "Fantasy",
    slug: "fantasy",
    description: "Magical builds from another world",
    emoji: "✨",
    color: "bg-violet-900",
  },
  {
    label: "Desert",
    slug: "desert",
    description: "Sandstone cities and desert ruins",
    emoji: "🏜️",
    color: "bg-rose-900",
  },
  {
    label: "Snow",
    slug: "snow",
    description: "Icy tundra palaces and frozen builds",
    emoji: "❄️",
    color: "bg-pink-900",
  },
];
