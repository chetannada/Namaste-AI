import { seasonsData, buildEpisodeSlug, buildPageSlug } from "@/data/notesData";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/notes`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = seasonsData.flatMap(season => {
    const seasonUrl: MetadataRoute.Sitemap[number] = {
      url: `${BASE_URL}/notes/${season.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    };

    const episodePages = season.episodes.flatMap(episode => {
      const epSlug = buildEpisodeSlug(episode);

      const episodeUrl: MetadataRoute.Sitemap[number] = {
        url: `${BASE_URL}/notes/${season.id}/${epSlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      };

      const notePages: MetadataRoute.Sitemap = episode.pages.map(page => ({
        url: `${BASE_URL}/notes/${season.id}/${epSlug}/${buildPageSlug(page)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      }));

      return [episodeUrl, ...notePages];
    });

    return [seasonUrl, ...episodePages];
  });

  return [...staticPages, ...dynamicPages];
}
