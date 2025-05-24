export const client = microcms.createClient({
    serviceDomain: 'ghibli',
    apiKey: 'tDIM8H888ZqLJvum9mLkVrBSELtF8A6QzTwr',
});

// APIからデータを取得する関数（ジブリ作品のリスト）
export async function fetchGhibliWorks() {
    try {
        const res = await client.get({
            endpoint: 'ghibliworks',
            queries: {limit: 16}, /* デフォルトは10件→16件取得に指定 */
            orders: 'rank' /* ランク昇順（1位が最初） */
        });
        return res.contents;
    } catch (err) {
        console.error('API取得失敗:', err);
        return []; /* 失敗時に空配列を返す */
    }
}

