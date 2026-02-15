import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1a365d 0%, #234681 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "16px",
              background: "rgba(13, 148, 136, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              color: "#5eead4",
            }}
          >
            {"#"}
          </div>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "white",
              margin: 0,
              textAlign: "center",
            }}
          >
            Účetnictví Kotmanová
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            Vedení účetnictví, daně a mzdy v Českých Budějovicích
          </p>
          <div
            style={{
              marginTop: "16px",
              padding: "10px 28px",
              borderRadius: "10px",
              background: "#0d9488",
              color: "white",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            ucetnicb.cz
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
