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
            x: 0,
            y: 0,
            width: 8,
            height: 100,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#1a1a2e"
          },
          {
            id: nanoid(),
            type: "text",
            x: 15,
            y: 25,
            width: 80,
            height: 6,
            content: "Proposal",
            fontSize: 64,
            bold: true,
            color: "#1a1a2e",
            fontFamily: "'Sora', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 15,
            y: 35,
            width: 80,
            height: 4,
            content: "[Client Name]",
            fontSize: 20,
            color: "#8a8a9e",
            fontFamily: "'Sora', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 15,
            y: 43,
            width: 80,
            height: 2,
            content: "March 2025",
            fontSize: 12,
            color: "#d4d4d4",
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
            bgColor: "#ffffff"
          },
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 0,
            width: 8,
            height: 100,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#16a34a"
          },
          {
            id: nanoid(),
            type: "text",
            x: 15,
            y: 10,
            width: 80,
            height: 8,
            content: "What We'll Do",
            fontSize: 48,
            bold: true,
            color: "#1a1a2e",
            fontFamily: "'Sora', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 15,
            y: 22,
            width: 35,
            height: 60,
            content: "Discovery\n\nWe listen and understand your vision, goals, and market position.\n\nStrategy\n\nWe develop a comprehensive roadmap tailored to your success.",
            fontSize: 14,
            color: "#4a4a5e",
            fontFamily: "'Sora', sans-serif",
            lineHeight: 1.7
          },
          {
            id: nanoid(),
            type: "text",
            x: 54,
            y: 22,
            width: 35,
            height: 60,
            content: "Execution\n\nWe deliver exceptional results with precision and care.\n\nGrowth\n\nWe support your continued success beyond launch.",
            fontSize: 14,
            color: "#4a4a5e",
            fontFamily: "'Sora', sans-serif",
            lineHeight: 1.7
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
            x: 0,
            y: 0,
            width: 100,
            height: 35,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#003d5c"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 40,
            width: 84,
            height: 12,
            content: "Project Proposal",
            fontSize: 52,
            bold: true,
            color: "#003d5c",
            fontFamily: "'Rubik', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 55,
            width: 40,
            height: 3,
            content: "Prepared for [Client Name]",
            fontSize: 12,
            color: "#7a7a8e",
            fontFamily: "'Rubik', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 52,
            y: 55,
            width: 40,
            height: 3,
            content: "Q1 2025",
            fontSize: 12,
            color: "#7a7a8e",
            align: "right",
            fontFamily: "'Rubik', sans-serif"
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
            bgColor: "#f8f9fa"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 8,
            width: 84,
            height: 2,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#0ea5e9",
            borderRadius: 1
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 14,
            width: 84,
            height: 8,
            content: "Our Approach",
            fontSize: 40,
            bold: true,
            color: "#003d5c",
            fontFamily: "'Rubik', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 8,
            y: 27,
            width: 38,
            height: 55,
            content: "01. Analysis\nComprehensive market and business analysis\n\n02. Planning\nStrategic roadmap development\n\n03. Execution\nPrecision implementation",
            fontSize: 12,
            color: "#4a4a5e",
            fontFamily: "'Rubik', sans-serif",
            lineHeight: 1.8
          },
          {
            id: nanoid(),
            type: "text",
            x: 54,
            y: 27,
            width: 38,
            height: 55,
            content: "04. Testing\nRigorous quality assurance\n\n05. Delivery\nSeamless go-live\n\n06. Support\nOngoing partnership",
            fontSize: 12,
            color: "#4a4a5e",
            fontFamily: "'Rubik', sans-serif",
            lineHeight: 1.8
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