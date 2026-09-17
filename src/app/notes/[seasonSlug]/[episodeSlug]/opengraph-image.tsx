import { ImageResponse } from "next/og";
import { join } from "node:path";
import sharp from "sharp";
import { seasonsData, buildEpisodeSlug, getEpisodeBySlug } from "@/data/notesData";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export function generateStaticParams() {
  return seasonsData.flatMap(season =>
    season.episodes.map(ep => ({
      seasonSlug: season.id,
      episodeSlug: buildEpisodeSlug(ep),
    }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ seasonSlug: string; episodeSlug: string }>;
}) {
  const { seasonSlug, episodeSlug } = await params;
  const result = getEpisodeBySlug(seasonSlug, episodeSlug);

  if (!result) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111113",
          color: "#fafaf9",
          fontSize: 48,
        }}
      >
        Namaste AI
      </div>,
      { ...size }
    );
  }

  const { season, episode } = result;
  const firstPage = episode.pages[0];

  let imageSrc = "";
  if (firstPage) {
    const imagePath = join(process.cwd(), "public", firstPage.imageUrl);
    const pngBuffer = await sharp(imagePath).png().toBuffer();
    imageSrc = `data:image/png;base64,${pngBuffer.toString("base64")}`;
  }

  const epNum = episode.episodeNumber < 10 ? `0${episode.episodeNumber}` : episode.episodeNumber;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#111113",
      }}
    >
      {imageSrc ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "460px",
            height: "100%",
            padding: "20px",
          }}
        >
          <img
            src={imageSrc}
            width={420}
            height={590}
            style={{
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          padding: "40px 40px 40px 0",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#f59e0b",
            fontWeight: 600,
          }}
        >
          {`Season ${season.seasonNumber} — Episode ${epNum}`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#fafaf9",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {episode.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 16,
            color: "#a8a29e",
            lineHeight: 1.5,
          }}
        >
          {`${episode.pages.length} Handwritten Notes`}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: "#f59e0b",
            }}
          >
            Namaste AI
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
