import { Schema, Types, model } from "mongoose";

export type IMedia = {
	kind: string,
}

const mediaSchema = new Schema<IMedia>({}, { discriminatorKey: "kind" });

export const Media = model("Media", mediaSchema);

export type ISpotifyMedia = {
	uri: string,
}

const spotifyMediaSchema = new Schema<ISpotifyMedia>({
	uri: String,
});

export const SpotifyMedia = Media.discriminator(
	"SpotifyMedia",
	spotifyMediaSchema
);

export type IToutubeMedia = {
	videoId: string,
}

const youtubeMediaSchema = new Schema<IToutubeMedia>({
	videoId: String,
});

export const YoutubeMedia = Media.discriminator(
	"YoutubeMedia",
	youtubeMediaSchema
);

export type ITextMedia = {
	text: string,
}

const textMediaSchema = new Schema<ITextMedia>({
	text: String,
});

export const TextMedia = Media.discriminator("TextMedia", textMediaSchema);