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
            bgColor: "#ffffff"
          },
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 42,
            width: 100,
            height: 58,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#ea580c"
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
            y: 24,
            width: 90,
            height: 14,
            content: "Let's Create Something Great",
            fontSize: 60,
            bold: true,
            color: "#ffffff",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 50,
            width: 90,
            height: 3,
            content: "Project Proposal for [Client Name] • March 2025",
            fontSize: 11,
            color: "#ffffff",
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
            bgColor: "#ea580c"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 12,
            width: 90,
            height: 10,
            content: "Our Strategy",
            fontSize: 48,
            bold: true,
            color: "#ffffff",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 27,
            width: 90,
            height: 55,
            content: "Discovery\nWe understand your vision, market, and objectives through deep collaboration\n\nInnovation\nWe craft bold, original solutions that set you apart\n\nExecution\nWe deliver with precision and excellence\n\nGrowth\nWe support your continued success beyond launch",
            fontSize: 13,
            color: "#ffffff",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            lineHeight: 2
          }
        ]
      }
    ]
  },

  professional_blue: {
    name: "Professional Blue",
    description: "Corporate with navy accent",
    icon: "📋",
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
            bgColor: "#faf8f3"
          },
          {
            id: nanoid(),
            type: "text",
            x: 85,
            y: 0,
            width: 15,
            height: 100,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#1f3a5f"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 8,
            width: 40,
            height: 2,
            content: "October [Year]",
            fontSize: 10,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 25,
            width: 75,
            height: 20,
            content: "PROJECT\nPROPOSAL",
            fontSize: 56,
            bold: true,
            color: "#1f3a5f",
            fontFamily: "'Georgia', serif",
            lineHeight: 1.1
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 50,
            width: 35,
            height: 5,
            content: "Driving Visual Innovation Forward",
            fontSize: 10,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif",
            border: "2px solid #1f3a5f",
            padding: "8px 15px",
            borderRadius: "25px"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 80,
            width: 40,
            height: 2,
            content: "Presented by [Your Name]",
            fontSize: 10,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif"
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
            bgColor: "#faf8f3"
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
            bgColor: "#1f3a5f"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 20,
            width: 90,
            height: 8,
            content: "OUR CONTENTS",
            fontSize: 44,
            bold: true,
            color: "#1f3a5f",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 32,
            width: 90,
            height: 50,
            content: "01. My Profile\n02. Introduction\n03. Project Timeline\n04. The Vision\n05. Our Expert Team\n06. Objectives\n07. Idea Blueprint\n08. Conceptual Framework\n09. Visual Infographic\n10. Conclusion",
            fontSize: 12,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 2
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
            bgColor: "#faf8f3"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 8,
            width: 90,
            height: 10,
            content: "MY PROFILE",
            fontSize: 48,
            bold: true,
            color: "#1f3a5f",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 30,
            width: 45,
            height: 50,
            content: "[Your Name]\n\nAs a dedicated professional with a passion for visual communication, I bring a unique blend of creativity and strategic thinking to every project. My expertise lies in transforming complex ideas into compelling visual narratives that resonate with audiences and drive engagement.",
            fontSize: 12,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.8
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
            bgColor: "#faf8f3"
          },
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 0,
            width: 100,
            height: 20,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#1f3a5f"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 25,
            width: 90,
            height: 10,
            content: "INTRODUCTION",
            fontSize: 48,
            bold: true,
            color: "#1f3a5f",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 40,
            width: 90,
            height: 45,
            content: "In today's dynamic landscape, visual impact is paramount. This proposal outlines a transformative project designed to leverage cutting-edge visual graphics to solve challenges and create unparalleled opportunities. We aim to set new benchmarks in how information is conveyed and absorbed.",
            fontSize: 14,
            color: "#374151",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.9
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
            bgColor: "#faf8f3"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 8,
            width: 90,
            height: 8,
            content: "PROJECT TIMELINE",
            fontSize: 44,
            bold: true,
            color: "#1f3a5f",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 20,
            width: 40,
            height: 55,
            content: "Phase 1\nInitial Concept & Research\nLaying the groundwork for innovative visual strategies.\n\nPhase 2\nStrategic Planning & Development\nRefining methodologies and developing core frameworks.",
            fontSize: 11,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.8
          },
          {
            id: nanoid(),
            type: "text",
            x: 55,
            y: 20,
            width: 40,
            height: 55,
            content: "Phase 3\nImplementation & Execution\nBringing the vision to life with precision and creativity.\n\nPhase 4\nEvaluation & Future Scaling\nAssessing impact and planning for sustained growth.",
            fontSize: 11,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.8
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
            bgColor: "#faf8f3"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 8,
            width: 90,
            height: 8,
            content: "OBJECTIVES",
            fontSize: 44,
            bold: true,
            color: "#1f3a5f",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 22,
            width: 40,
            height: 55,
            content: "Objective 1\n\nTo develop and implement a robust visual graphics framework that enhances user engagement and clarifies complex data, ensuring seamless information delivery across all platforms.",
            fontSize: 12,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.8
          },
          {
            id: nanoid(),
            type: "text",
            x: 55,
            y: 22,
            width: 40,
            height: 55,
            content: "Objective 2\n\nTo establish a scalable and adaptable system for visual content creation, enabling rapid response to evolving market needs and maintaining a competitive edge through visual innovation.",
            fontSize: 12,
            color: "#1f3a5f",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.8
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
            bgColor: "#faf8f3"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 8,
            width: 90,
            height: 8,
            content: "CONCLUSION",
            fontSize: 44,
            bold: true,
            color: "#1f3a5f",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 22,
            width: 90,
            height: 60,
            content: "This proposal represents a comprehensive roadmap for transformative visual innovation. By implementing our strategic framework and leveraging cutting-edge design methodologies, we are confident in delivering exceptional results that will elevate your brand and drive measurable impact.",
            fontSize: 13,
            color: "#374151",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.9
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
            bgColor: "#faf8f3"
          },
          {
            id: nanoid(),
            type: "text",
            x: 0,
            y: 30,
            width: 100,
            height: 40,
            content: "",
            fontSize: 16,
            color: "#ffffff",
            bgColor: "#1f3a5f"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 35,
            width: 90,
            height: 8,
            content: "THANK YOU",
            fontSize: 56,
            bold: true,
            color: "#ffffff",
            fontFamily: "'Georgia', serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 50,
            width: 90,
            height: 2,
            content: "Thanks For Watching",
            fontSize: 12,
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif"
          },
          {
            id: nanoid(),
            type: "text",
            x: 5,
            y: 58,
            width: 90,
            height: 2,
            content: "[Your Name]",
            fontSize: 11,
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif"
          }
        ]
      }
    ]
  }
};