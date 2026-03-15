function nanoid() {
  return Math.random().toString(36).slice(2, 10);
}

export const PROPOSAL_TEMPLATES = {
  professional: {
    name: "Professional",
    description: "Clean and corporate design",
    icon: "📊",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 20,
            width: 90,
            height: 30,
            content: "Project Proposal",
            fontSize: 48,
            bold: true,
            color: "#1f2937",
            align: "center",
            fontFamily: "Georgia"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 55,
            width: 90,
            height: 15,
            content: "[Client Name]",
            fontSize: 20,
            color: "#6b7280",
            align: "center",
            fontFamily: "Georgia"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 10,
            width: 90,
            height: 20,
            content: "Project Overview",
            fontSize: 36,
            bold: true,
            color: "#1f2937",
            fontFamily: "Georgia"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 35,
            width: 90,
            height: 55,
            content: "• Describe your project vision\n• Key objectives and goals\n• Timeline and deliverables\n• Expected outcomes",
            fontSize: 18,
            color: "#374151",
            fontFamily: "Arial"
          }
        ]
      }
    ]
  },

  modern: {
    name: "Modern",
    description: "Contemporary and creative",
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
            width: 50,
            height: 100,
            content: "Your Project\nStarts Here",
            fontSize: 52,
            bold: true,
            color: "#ffffff",
            align: "left",
            fontFamily: "'Trebuchet MS', sans-serif",
            bgColor: "#0284c7"
          },
          {
            id: nanoid(),
            type: "text",
            x: 50,
            y: 35,
            width: 50,
            height: 30,
            content: "[Client Name]",
            fontSize: 24,
            color: "#0284c7",
            align: "center",
            fontFamily: "'Trebuchet MS', sans-serif"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 10,
            width: 90,
            height: 20,
            content: "Key Features",
            fontSize: 40,
            bold: true,
            color: "#0284c7",
            fontFamily: "'Trebuchet MS', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 35,
            width: 90,
            height: 55,
            content: "• Innovation & creativity\n• On-time delivery\n• Full transparency\n• Dedicated support",
            fontSize: 20,
            color: "#1f2937",
            fontFamily: "Arial"
          }
        ]
      }
    ]
  },

  minimalist: {
    name: "Minimalist",
    description: "Simple and elegant",
    icon: "⚪",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 35,
            width: 80,
            height: 25,
            content: "Proposal",
            fontSize: 56,
            bold: true,
            color: "#000000",
            align: "center",
            fontFamily: "Georgia"
          },
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 65,
            width: 80,
            height: 10,
            content: "[Client Name]",
            fontSize: 16,
            color: "#666666",
            align: "center",
            fontFamily: "Georgia"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 15,
            y: 15,
            width: 70,
            height: 15,
            content: "Scope & Details",
            fontSize: 32,
            bold: true,
            color: "#000000",
            fontFamily: "Georgia"
          },
          {
            id: nanoid(),
            type: "text",
            x: 15,
            y: 40,
            width: 70,
            height: 50,
            content: "What we'll do for you:\n\nDetailed description of services\nTimeline expectations\nInvestment details\nNext steps",
            fontSize: 16,
            color: "#444444",
            fontFamily: "Arial"
          }
        ]
      }
    ]
  },

  colorful: {
    name: "Colorful",
    description: "Vibrant and energetic",
    icon: "🎨",
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
            height: 50,
            content: "Let's Create\nSomething Amazing",
            fontSize: 48,
            bold: true,
            color: "#ffffff",
            align: "center",
            fontFamily: "'Trebuchet MS', sans-serif",
            bgColor: "#ec4899"
          },
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 50,
            width: 100,
            height: 50,
            content: "[Client Name] Proposal",
            fontSize: 28,
            color: "#ffffff",
            align: "center",
            fontFamily: "'Trebuchet MS', sans-serif",
            bgColor: "#f59e0b"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 10,
            width: 90,
            height: 15,
            content: "What We'll Deliver",
            fontSize: 36,
            bold: true,
            color: "#ec4899",
            fontFamily: "'Trebuchet MS', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 30,
            width: 90,
            height: 60,
            content: "✓ High-quality production\n✓ Creative direction\n✓ Professional results\n✓ Ongoing communication",
            fontSize: 20,
            color: "#1f2937",
            fontFamily: "Arial"
          }
        ]
      }
    ]
  },

  luxury: {
    name: "Luxury",
    description: "Premium and sophisticated",
    icon: "✨",
    slides: [
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 20,
            width: 80,
            height: 15,
            content: "PROPOSAL",
            fontSize: 44,
            bold: true,
            color: "#78350f",
            align: "center",
            fontFamily: "Georgia"
          },
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 40,
            width: 80,
            height: 3,
            content: "─────────────────",
            fontSize: 14,
            color: "#d97706",
            align: "center",
            fontFamily: "Georgia"
          },
          {
            id: nanoid(),
            type: "text",
            x: 10,
            y: 50,
            width: 80,
            height: 20,
            content: "[Client Name]",
            fontSize: 24,
            color: "#78350f",
            align: "center",
            fontFamily: "Georgia"
          }
        ]
      },
      {
        id: nanoid(),
        elements: [
          {
            id: nanoid(),
            type: "text",
            x: 12,
            y: 12,
            width: 76,
            height: 12,
            content: "Our Vision for Your Project",
            fontSize: 32,
            bold: true,
            color: "#78350f",
            fontFamily: "Georgia"
          },
          {
            id: nanoid(),
            type: "text",
            x: 12,
            y: 28,
            width: 76,
            height: 3,
            content: "─────────────",
            fontSize: 12,
            color: "#d97706",
            fontFamily: "Georgia"
          },
          {
            id: nanoid(),
            type: "text",
            x: 12,
            y: 35,
            width: 76,
            height: 55,
            content: "• Premium quality standards\n• Attention to every detail\n• Timeless elegance\n• Exclusive partnership approach",
            fontSize: 18,
            color: "#5b4a3a",
            fontFamily: "Georgia"
          }
        ]
      }
    ]
  }
};