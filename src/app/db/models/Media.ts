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

export type IFileMedia = {
	url: string;
	publicId: string;
	type: string;
	size: number;
	createdAt: Date;
}

const fileMediaSchema = new Schema<IFileMedia>({
	url: {type: String, required: true},
	publicId: {type: String, required: true},
	type: {type: String, required: true},
	size: {type: Number, required: true},
	createdAt: {type: Date, required: true},
});

export const FileMedia = Media.discriminator("FileMedia", fileMediaSchema);