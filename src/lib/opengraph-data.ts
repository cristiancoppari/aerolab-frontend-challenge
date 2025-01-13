import { Metadata } from "next";

export const OG_DATA_BASE: Metadata["openGraph"] = {
  title: "Gaming Haven Z",
  description:
    "Application for searching video games and their reviews from your favorite platforms.",
  siteName: "Gaming Haven Z",
  locale: "en_US",
  type: "website",
};

export const TWITTER_DATA_BASE: Metadata["twitter"] = {
  title: OG_DATA_BASE.title,
  description: OG_DATA_BASE.description,
  creator: "@cristiancoppari",
  site: "@cristiancoppari",
};
