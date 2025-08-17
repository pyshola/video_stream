export const constants = {
    siteName: "Video Stream",
    siteDescription: "A platform to share and watch videos",
}

export const appUrl = process.env.APP_PUBLIC_URL || "http://localhost:3000/api";
export const bunnyVideoLibraryId = process.env.NEXT_PUBLIC_BUNNY_VIDEO_LIBRARY_ID;
export const bunnyVideoLibraryUrl = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE_URL;
export const bunnyStorageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL;
export const bunnyTusEndpoint = process.env.NEXT_PUBLIC_BUNNY_TUS_ENDPOINT;
export const bunnyStreamKey = process.env.BUNNY_STREAM_API_KEY;
export const bunnyStreamSecurtyKey = process.env.BUNNY_STREAM_SECURITY_KEY;
export const bunnyStreamUrl = process.env.NEXT_PUBLIC_BUNNY_VIDEO_STREAM_URL;

export const bunnyStorageRegion = process.env.BUNNY_STORAGE_REGION;
export const bunnyStorageBaseHostName = process.env.BUNNY_STORAGE_HOSTNAME;
export const bunnyStorageZone = process.env.BUNNY_STORAGE_ZONE;
export const bunnyStorageApiKey = process.env.BUNNY_STORAGE_API_KEY;
export const bunnyFilenameUID = process.env.NEXT_PUBLIC_BUNNY_STORAGE_UPLOAD_FILE_UID;
export const bunnyPullZoneUrl = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE_URL;
export const bunnyPullZone = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE;
export const bunnyWebhookApiKey = process.env.BUNNY_STREAM_API_WEBHOOK_KEY;
export const bunnyWebhookUrl = process.env.BUNNY_STREAM_API_WEBHOOK_URL;


export const playCookieName = "play_cookie";
export const playCookieMaxAge = 60 * 60 * 24 * 30;
export const playCookieSameKey = "v__s_k_e_y";