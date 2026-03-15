function nanoid() {
  return Math.random().toString(36).slice(2, 10);
}

export const PROPOSAL_TEMPLATES = {
  clean: {
    name: "Clean",
    description: "Modern and minimal",
    icon: "✨",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 25,
            width: 84,
            height: 12,
            content: "Project Proposal",
            fontSize: 52,
            bold: true,
            color: "#0f172a",
            align: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 40,
            width: 84,
            height: 25,
            content: "[Client Name]",
            fontSize: 28,
            color: "#64748b",
            align: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 8,
            width: 84,
            height: 10,
            content: "Overview",
            fontSize: 40,
            bold: true,
            color: "#0f172a",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 22,
            width: 84,
            height: 68,
            content: "Project Goals\n[Add your main objectives and vision]\n\nDeliverables\n[List what we'll create]\n\nTimeline\n[Key milestones and dates]",
            fontSize: 16,
            color: "#334155",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      }
    ]
  },

  bold: {
    name: "Bold",
    description: "Eye-catching and modern",
    icon: "🎯",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 0,
            width: 100,
            height: 55,
            content: "Let's Build\nSomething Great",
            fontSize: 56,
            bold: true,
            color: "#ffffff",
            align: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'",
            bgColor: "#1e293b"
          },
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 55,
            width: 100,
            height: 45,
            content: "[Client Name]\nProject Proposal",
            fontSize: 24,
            color: "#0f172a",
            align: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'",
            bgColor: "#f1f5f9"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 10,
            width: 84,
            height: 12,
            content: "Our Approach",
            fontSize: 42,
            bold: true,
            color: "#1e293b",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 28,
            width: 84,
            height: 58,
            content: "Strategy & Planning\nCreate clear roadmap\n\nExecution\nDeliver quality results\n\nOptimization\nContinue improving",
            fontSize: 18,
            color: "#334155",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      }
    ]
  },

  professional: {
    name: "Professional",
    description: "Corporate and trustworthy",
    icon: "📊",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 15,
            width: 84,
            height: 15,
            content: "Proposal",
            fontSize: 56,
            bold: true,
            color: "#0369a1",
            align: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 35,
            width: 84,
            height: 8,
            content: "[Client Name]",
            fontSize: 20,
            color: "#64748b",
            align: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 50,
            width: 84,
            height: 40,
            content: "We're excited to work with you on this project",
            fontSize: 18,
            color: "#475569",
            align: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 8,
            width: 84,
            height: 10,
            content: "Project Scope",
            fontSize: 40,
            bold: true,
            color: "#0369a1",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 22,
            width: 42,
            height: 65,
            content: "Services\n—\n• Item one\n• Item two\n• Item three",
            fontSize: 16,
            color: "#334155",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 50,
            y: 22,
            width: 42,
            height: 65,
            content: "Timeline\n—\nPhase 1: Research\nPhase 2: Development\nPhase 3: Launch",
            fontSize: 16,
            color: "#334155",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      }
    ]
  },

  minimal: {
    name: "Minimal",
    description: "Simple and focused",
    icon: "⬜",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 30,
            width: 80,
            height: 20,
            content: "[Client Name]",
            fontSize: 44,
            bold: true,
            color: "#0f172a",
            align: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 53,
            width: 80,
            height: 12,
            content: "Project Proposal",
            fontSize: 18,
            color: "#64748b",
            align: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 12,
            width: 80,
            height: 10,
            content: "The Plan",
            fontSize: 36,
            bold: true,
            color: "#0f172a",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 28,
            width: 80,
            height: 60,
            content: "Phase 1  Understanding\nDive deep into your needs\n\nPhase 2  Execution\nBuild the solution\n\nPhase 3  Launch\nDeliver results",
            fontSize: 16,
            color: "#475569",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      }
    ]
  },

  modern: {
    name: "Modern",
    description: "Contemporary and vibrant",
    icon: "🚀",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            content: "Proposal",
            fontSize: 64,
            bold: true,
            color: "#ffffff",
            align: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'",
            bgColor: "#06b6d4"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 0,
            width: 100,
            height: 35,
            content: "[Client Name]",
            fontSize: 40,
            bold: true,
            color: "#ffffff",
            align: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'",
            bgColor: "#06b6d4"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 40,
            width: 84,
            height: 55,
            content: "What We'll Do\n\n✓ Understand your goals\n✓ Create a custom strategy\n✓ Deliver exceptional results\n✓ Provide ongoing support",
            fontSize: 18,
            color: "#0f172a",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      }
    ]
  }
};