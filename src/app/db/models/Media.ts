import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({}, { discriminatorKey: "kind" });

const Media = mongoose.model("Media", mediaSchema);

const spotifyMediaSchema = new mongoose.Schema({
	uri: String,
});

const SpotifyMedia = Media.discriminator(
	"SpotifyMedia",
	spotifyMediaSchema
);

const youtubeMediaSchema = new mongoose.Schema({
	videoId: String,
});

const YoutubeMedia = Media.discriminator(
	"YoutubeMedia",
	youtubeMediaSchema
);

const textMediaSchema = new mongoose.Schema({
	text: String,
});

const TextMedia = Media.discriminator("TextMedia", textMediaSchema);

export {
	Media,
	SpotifyMedia,
	YoutubeMedia,
	TextMedia
};