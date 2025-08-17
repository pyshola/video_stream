namespace NodeJS{
    interface ProcessEnv{
        AUTH_SECRET:string;
        MONGO_URI:string;
        APP_PUBLIC_URL:string;
        BUNNY_API_KEY:string;
        NEXT_PUBLIC_BUNNY_VIDEO_STREAM_URL:string;
        NEXT_PUBLIC_BUNNY_VIDEO_LIBRARY_ID:string;
        NEXT_PUBLIC_BUNNY_TUS_ENDPOINT:string;
        BUNNY_STREAM_API_KEY:string;
        BUNNY_STREAM_SECURITY_KEY:string;
        BUNNY_STREAM_API_WEBHOOK_URL:string;
        BUNNY_STREAM_API_WEBHOOK_KEY:string;
        NEXT_PUBLIC_BUNNY_PULL_ZONE_URL:string;
        NEXT_PUBLIC_BUNNY_PULL_ZONE:string;
        BUNNY_STORAGE_REGION:string;
        BUNNY_STORAGE_HOSTNAME:string;
        BUNNY_STORAGE_ZONE:string;
        BUNNY_STORAGE_API_KEY:string;
        NEXT_PUBLIC_BUNNY_STORAGE_UPLOAD_FILE_UID:string;
        NEXT_PUBLIC_BUNNY_STORAGE_URL:string;

    }
}