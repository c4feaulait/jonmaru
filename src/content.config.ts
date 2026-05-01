import { defineCollection, z } from "astro:content";
import { createClient } from "microcms-js-sdk";

const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY,
});

// microCMSのコンテンツローダー
const microCMSLoader = (endpoint: string) => {
    return async () => {
    try {
        console.log(`microCMSから${endpoint}データを取得中...`);
        const response = await client.getAllContents({
        endpoint
        });
        console.log(`${response.length}件の${endpoint}を取得しました`);
        return response;
    } catch (error) {
        console.error(`microCMSからの${endpoint}取得に失敗:`, error);
        return [];
    }
    };
};

// 共通のフィールド
const microCMSDateFields = {
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    revisedAt: z.string(),
};

// コレクションの定義
const blogs = defineCollection({
    loader: microCMSLoader('blogs'),
    schema: z.object({
    title: z.string(),
    content: z.string(),
    ...microCMSDateFields,
    thumbnail: z.object({
        url:z.string(),
        height: z.number().optional(),
        width: z.number().optional(),
    }).optional(),
    }),
});

// コレクションのエクスポート
export const collections = {
    blogs,
};