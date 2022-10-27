import { createClient } from "@supabase/supabase-js";
import type { Database } from "./lib/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// type ICreator = Database["public"]['Tables']["creators"]["Row"]
type ITag = Database["public"]["Tables"]["tags"]["Row"];
// type IPodcastDetail = Database["public"]['Tables']["podcasts"]["Row"] & {tags: ITag[]}


export async function getCreator(id: number) {
  try {
    const { data, error, status } = await supabase
      .from("creators")
      .select("id, name, links")
      .eq("id", id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      return data;
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export async function getPodcasts(limit = 10) {
  try {
    const { data, error, status } = await supabase
      .from("podcasts")
      .select("id, creators(id, name), title, podcasts_tags(tags(id, name, color))")
      .limit(limit)

    if (error && status !== 406) throw error;

    if (data) {
      return data.map((res) => ({
        id: res.id,
        creator: (Array.isArray(res.creators) ? res.creators[0] : res.creators),
        title: res.title,
        tags: (
          res.podcasts_tags as Array<{
            tags: ITag;
          }>
        ).map((tag) => tag.tags),
      }));
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export async function getPodcastsOfCreator(creatorId: number) {
  try {
    const { data, error, status } = await supabase
      .from("podcasts")
      .select("id, title, podcasts_tags(tags(id, name, color))")
      .eq("creator_id", creatorId);

    if (error && status !== 406) throw error;

    if (data) {
      return data.map((res) => ({
        id: res.id,
        creatorId: creatorId,
        title: res.title,
        tags: (
          res.podcasts_tags as Array<{
            tags: ITag;
          }>
        ).map((tag) => tag.tags),
      }));
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export async function getPodcast(podcastId: number) {
  try {
    const { data, error, status } = await supabase
      .from("podcasts")
      .select("id, creators(id, name), title, podcasts_tags(tags(id, name, color)), transcription")
      .eq("id", podcastId)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      return {
        id: data.id,
        creator: (Array.isArray(data.creators) ? data.creators[0] : data.creators),
        title: data.title,
        tags: (
          data.podcasts_tags as Array<{
            tags: ITag;
          }>
        ).map((tag) => tag.tags),
        transcripton: data.transcription,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}
