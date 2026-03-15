function nanoid() {
  return Math.random().toString(36).slice(2, 10);
}

export const PROPOSAL_TEMPLATES = {
  elegant: {
    name: "Elegant",
    description: "Premium and sophisticated",
    icon: "✨",
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
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#1e3a5f"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 4,
            width: 20,
            height: 4,
            content: "YOUR STUDIO",
            fontSize: 11,
            bold: true,
            color: "#ffffff",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 12,
            y: 22,
            width: 76,
            height: 8,
            content: "Project",
            fontSize: 32,
            color: "#cbd5e1",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 12,
            y: 32,
            width: 76,
            height: 14,
            content: "Proposal.",
            fontSize: 64,
            bold: true,
            color: "#ffffff",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 12,
            y: 50,
            width: 35,
            height: 4,
            content: "Prepared for [Client Name]",
            fontSize: 13,
            color: "#cbd5e1",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 53,
            y: 50,
            width: 35,
            height: 4,
            content: "JAN 08 2024",
            fontSize: 13,
            color: "#cbd5e1",
            align: "right",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 92,
            width: 20,
            height: 3,
            content: "www.yoursite.com",
            fontSize: 10,
            color: "#94a3b8",
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
            x: 6,
            y: 6,
            width: 12,
            height: 3,
            content: "December 2024",
            fontSize: 13,
            color: "#64748b",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 6,
            y: 18,
            width: 88,
            height: 18,
            content: "PROJECT\nPROPOSAL",
            fontSize: 56,
            bold: true,
            color: "#1e3a5f",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 6,
            y: 40,
            width: 40,
            height: 4,
            content: "Driving Success Forward",
            fontSize: 14,
            color: "#64748b",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 6,
            y: 75,
            width: 35,
            height: 4,
            content: "Presented by [Your Name]",
            fontSize: 13,
            color: "#64748b",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 82,
            y: 0,
            width: 18,
            height: 100,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#1e3a5f"
          }
        ]
      }
    ]
  },

  minimal: {
    name: "Minimal",
    description: "Clean and spacious",
    icon: "⬜",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 25,
            width: 80,
            height: 12,
            content: "Proposal",
            fontSize: 72,
            bold: true,
            color: "#0f172a",
            align: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 42,
            width: 80,
            height: 5,
            content: "[Client Name]",
            fontSize: 24,
            color: "#94a3b8",
            align: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 52,
            width: 80,
            height: 3,
            content: "January 2024",
            fontSize: 13,
            color: "#cbd5e1",
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
            x: 10,
            y: 8,
            width: 80,
            height: 12,
            content: "What We'll Do",
            fontSize: 48,
            bold: true,
            color: "#0f172a",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 25,
            width: 80,
            height: 65,
            content: "Discovery & Strategy\nUnderstand your goals and vision\n\nDesign & Development\nCreate quality deliverables\n\nLaunch & Support\nBring your project to life",
            fontSize: 16,
            color: "#475569",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      }
    ]
  },

  professional: {
    name: "Professional",
    description: "Corporate excellence",
    icon: "📊",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 20,
            width: 84,
            height: 10,
            content: "Proposal",
            fontSize: 60,
            bold: true,
            color: "#164e63",
            align: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 33,
            width: 40,
            height: 4,
            content: "Prepared for",
            fontSize: 12,
            color: "#78716c",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 39,
            width: 40,
            height: 6,
            content: "[Client Name]",
            fontSize: 20,
            bold: true,
            color: "#0f172a",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 52,
            y: 33,
            width: 40,
            height: 12,
            content: "2024",
            fontSize: 40,
            bold: true,
            color: "#e5e7eb",
            align: "right",
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
            fontSize: 44,
            bold: true,
            color: "#164e63",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 22,
            width: 40,
            height: 65,
            content: "Timeline\n\n01 Research\n02 Strategy\n03 Execution\n04 Launch",
            fontSize: 15,
            color: "#475569",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 52,
            y: 22,
            width: 40,
            height: 65,
            content: "Deliverables\n\n• Strategic plan\n• Design assets\n• Technical setup\n• Documentation",
            fontSize: 15,
            color: "#475569",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      }
    ]
  },

  bold: {
    name: "Bold",
    description: "Modern and striking",
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
            height: 100,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#0f172a"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 28,
            width: 84,
            height: 20,
            content: "Let's Create\nSomething Great",
            fontSize: 56,
            bold: true,
            color: "#ffffff",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 55,
            width: 84,
            height: 6,
            content: "Project Proposal for [Client Name]",
            fontSize: 18,
            color: "#cbd5e1",
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
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#06b6d4"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 15,
            width: 84,
            height: 14,
            content: "Our Approach",
            fontSize: 48,
            bold: true,
            color: "#ffffff",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 35,
            width: 84,
            height: 55,
            content: "Discovery\nUnderstand your needs deeply\n\nExecution\nDeliver quality results\n\nOptimization\nEnsure your success",
            fontSize: 17,
            color: "#ffffff",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI'"
          }
        ]
      }
    ]
  }
};