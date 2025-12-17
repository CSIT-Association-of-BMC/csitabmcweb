import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const BRAND_COLOR = "#1f2b5c";
const ACCENT_COLOR = "#ff7f6a";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "CSIT Association of BMC";
  const subtitle =
    searchParams.get("subtitle") || "Tech Community • Butwal, Nepal";
  const type = searchParams.get("type") || "page";

  const typeLabels: Record<string, string> = {
    page: "CSIT Association of BMC",
    event: "Event",
    workshop: "Workshop",
    hackathon: "Hackathon",
    notice: "Notice",
  };

  const typeLabel = typeLabels[type] || typeLabels.page;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BRAND_COLOR,
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 35%),
                              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06) 0%, transparent 40%)`,
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255, 127, 106, 0.15)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(96, 212, 200, 0.12)",
            filter: "blur(80px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Logo placeholder */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                C
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  CSIT Association
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Butwal Multiple Campus
                </span>
              </div>
            </div>

            {type !== "page" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: ACCENT_COLOR,
                  padding: "8px 20px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  color: BRAND_COLOR,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {typeLabel}
              </div>
            )}
          </div>

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxWidth: "90%",
            }}
          >
            <h1
              style={{
                fontSize: title.length > 50 ? 48 : 64,
                fontWeight: 700,
                color: "white",
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 24,
                color: "rgba(255,255,255,0.8)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              paddingTop: 24,
            }}
          >
            <span
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              csitabmc.com
            </span>
            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  padding: "6px 14px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 50,
                }}
              >
                Tech Community
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  padding: "6px 14px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 50,
                }}
              >
                Butwal, Nepal
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
