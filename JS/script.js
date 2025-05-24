import { fetchGhibliWorks } from './api.js';

async function displayGhibliList() {
    const contents = await fetchGhibliWorks(); /* APIから作品リストを取得 */
    const worksList = document.getElementById('worksList'); /* worksListをjs側から操作するために取得 */
    
    if(contents.length === 0) {
        worksList.textContent = '作品データが取得できませんでした。';
        return;
    }

    // HTMLを作成（data-index属性を付与）
    const html = contents.slice(0, 16).map((work, index) => {
        const overview = work.overview;
        const imageUrl = work.moviePoster.url;
        const rank = work.rank;

        return `
            <div class="work-item">
                <div><strong>${rank}位</strong></div>
                <p id="overview-${index}" style="display: none;">${overview}</p>
                <img src="${imageUrl}" alt="ポスター画像" data-index="${index}" style="cursor: pointer;"/>
            </div>
        `;
    }).join(''); /* join('')→html文字列を結合*/

    worksList.innerHTML = html;

    // 「imgタグをすべて取得してクリック処理を追加」
    // data-index属性を持つimg要素（ポスター画像）をすべて取得
    document.querySelectorAll('img[data-index]').forEach((img) => { /* forEach()を使って順番に処理 */
        const index = img.getAttribute('data-index'); /* data-indexを取り出してindexに格納 */
        const overview = contents[index].overview;
        const imageUrl = contents[index].moviePoster.url;

        img.addEventListener('click', () => {
            const modal = document.getElementById('modalOverlay');
            const modalOverview = document.getElementById('modalOverview');
            modal.style.display = 'block'; /* modalを表示状態に */
            modal.style.backgroundImage = `url(${imageUrl})`;
            modalOverview.textContent = overview;
        });
    });

    // 閉じるボタン処理
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('modalOverlay').style.display = 'none';
    });
}

displayGhibliList();
