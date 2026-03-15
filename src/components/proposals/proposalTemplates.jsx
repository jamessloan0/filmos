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
            bgColor: "#ffffff"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 8,
            width: 90,
            height: 3,
            content: "YOUR STUDIO",
            fontSize: 9,
            bold: true,
            color: "#1f2937",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            letterSpacing: 1.5
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 35,
            width: 90,
            height: 20,
            content: "[Project Name]",
            fontSize: 64,
            bold: true,
            color: "#1f2937",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 58,
            width: 90,
            height: 2,
            content: "Prepared for [Client Name] • March 2025",
            fontSize: 11,
            color: "#6b7280",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif"
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
            bgColor: "#ffffff"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 12,
            width: 90,
            height: 12,
            content: "Our Approach",
            fontSize: 48,
            bold: true,
            color: "#1f2937",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 28,
            width: 43,
            height: 55,
            content: "Discovery\n\nWe listen deeply to understand your vision, goals, and market position. Every successful project begins with clarity.\n\nStrategy\n\nBased on our findings, we develop a comprehensive roadmap tailored to drive measurable results.",
            fontSize: 12,
            color: "#374151",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            lineHeight: 1.8
          },
          {
            id: nanoid(),
            type: "text",
            x: 52,
            y: 28,
            width: 43,
            height: 55,
            content: "Execution\n\nOur team delivers with precision and excellence. Every detail matters, and we maintain quality at every stage.\n\nPartnership\n\nYour success is our success. We collaborate throughout, ensuring transparency and continuous improvement.",
            fontSize: 12,
            color: "#374151",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            lineHeight: 1.8
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
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#ffffff"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 10,
            width: 90,
            height: 2,
            content: "YOUR STUDIO",
            fontSize: 8,
            bold: true,
            color: "#000000",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            letterSpacing: 2
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 38,
            width: 90,
            height: 18,
            content: "Proposal",
            fontSize: 72,
            bold: true,
            color: "#000000",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 60,
            width: 90,
            height: 2,
            content: "[Client Name] • March 2025",
            fontSize: 11,
            color: "#6b7280",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif"
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
            bgColor: "#ffffff"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 14,
            width: 90,
            height: 10,
            content: "What We'll Do",
            fontSize: 48,
            bold: true,
            color: "#000000",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 30,
            width: 90,
            height: 55,
            content: "We take a collaborative, four-phase approach:\n\n01. Discovery — Understanding your vision and goals deeply\n\n02. Strategy — Developing a comprehensive roadmap\n\n03. Execution — Delivering excellence with precision\n\n04. Growth — Supporting your continued success",
            fontSize: 13,
            color: "#374151",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            lineHeight: 2
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
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#ffffff"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 8,
            width: 90,
            height: 2,
            content: "YOUR STUDIO",
            fontSize: 8,
            bold: true,
            color: "#003d5c",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            letterSpacing: 2
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 16,
            width: 90,
            height: 2,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#0ea5e9"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 35,
            width: 90,
            height: 16,
            content: "Project Proposal",
            fontSize: 56,
            bold: true,
            color: "#003d5c",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 54,
            width: 42,
            height: 3,
            content: "Prepared for [Client Name]",
            fontSize: 11,
            color: "#6b7280",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 53,
            y: 54,
            width: 42,
            height: 3,
            content: "Q1 2025",
            fontSize: 11,
            color: "#6b7280",
            align: "right",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif"
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
            bgColor: "#ffffff"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 12,
            width: 90,
            height: 10,
            content: "Our Approach",
            fontSize: 48,
            bold: true,
            color: "#003d5c",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 27,
            width: 42,
            height: 55,
            content: "01. Discovery\nUnderstanding your business, market, and objectives\n\n02. Strategy\nDeveloping a comprehensive roadmap\n\n03. Execution\nDelivering with precision and excellence",
            fontSize: 12,
            color: "#374151",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            lineHeight: 1.9
          },
          {
            id: nanoid(),
            type: "text",
            x: 53,
            y: 27,
            width: 42,
            height: 55,
            content: "04. Testing\nRigorous quality assurance\n\n05. Launch\nSeamless deployment\n\n06. Support\nOngoing partnership and growth",
            fontSize: 12,
            color: "#374151",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            lineHeight: 1.9
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
            x: 0,
            y: 35,
            width: 100,
            height: 30,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#f97316"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 12,
            width: 84,
            height: 8,
            content: "Let's Create",
            fontSize: 56,
            bold: true,
            color: "#f97316",
            fontFamily: "'Sora', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 42,
            width: 84,
            height: 8,
            content: "Something Great",
            fontSize: 56,
            bold: true,
            color: "#0f172a",
            fontFamily: "'Sora', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 72,
            width: 84,
            height: 4,
            content: "Project Proposal for [Client Name]",
            fontSize: 16,
            color: "#cbd5e1",
            fontFamily: "'Sora', sans-serif"
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
            bgColor: "#f97316"
          },
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 0,
            width: 100,
            height: 12,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#0f172a"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 20,
            width: 84,
            height: 8,
            content: "Our Strategy",
            fontSize: 48,
            bold: true,
            color: "#ffffff",
            fontFamily: "'Sora', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 32,
            width: 84,
            height: 50,
            content: "Discovery\nUnderstanding your vision and market needs\n\nInnovation\nCrafting bold, original solutions\n\nExecution\nDelivering excellence with precision\n\nGrowth\nSupporting your success forward",
            fontSize: 15,
            color: "#ffffff",
            fontFamily: "'Sora', sans-serif",
            lineHeight: 2
          }
        ]
      }
    ]
  }
};