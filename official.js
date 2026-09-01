const modal = document.querySelector('#costume-modal');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');
const modalCopy = document.querySelector('#modal-copy');

document.querySelectorAll('.costume-card').forEach((card) => card.addEventListener('click', () => {
  modal.classList.remove('gallery-modal');
  modalTitle.textContent = card.dataset.title;
  if (card.dataset.image) {
    modalImage.src = card.dataset.image;
    modalImage.hidden = false;
    modalCopy.textContent = `${card.dataset.title}のメジロちゃん。衣装の細部も、ゆっくり見てみてね。`;
  } else {
    modalImage.hidden = true;
    modalCopy.textContent = 'この衣装の設定画は、ただいま準備中です。公開を楽しみにしていてね。';
  }
  modal.showModal();
}));
document.querySelector('.close').addEventListener('click', () => modal.close());

const galleryHeader = document.querySelector('.gallery-head');
if (galleryHeader) galleryHeader.insertAdjacentHTML('afterend', '<p class="gallery-guide">気になる作品をタップすると、大きくご覧いただけます。</p>');
document.addEventListener('click', (event) => {
  const item = event.target.closest('.gallery-scenes figure');
  if (!item) return;
  const image = item.querySelector('img');
  const title = item.querySelector('figcaption b')?.textContent || 'メジロちゃんの作品';
  modal.classList.add('gallery-modal');
  modalTitle.textContent = title;
  modalImage.src = image.currentSrc || image.src;
  modalImage.alt = image.alt;
  modalImage.hidden = false;
  modalCopy.textContent = 'タップでもう一度閉じることができます。';
  modal.showModal();
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

function chime() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  const context = new Ctx(); const now = context.currentTime;
  [659.25, 783.99, 880, 783.99].forEach((frequency, index) => {
    const oscillator = context.createOscillator(); const gain = context.createGain();
    oscillator.type = 'sine'; oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.0001, now + index * .13);
    gain.gain.exponentialRampToValueAtTime(.1, now + index * .13 + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, now + index * .13 + .52);
    oscillator.connect(gain).connect(context.destination); oscillator.start(now + index * .13); oscillator.stop(now + index * .13 + .55);
  });
}
document.querySelectorAll('.play').forEach((button) => button.addEventListener('click', () => {
  chime(); document.querySelector('.music-note').textContent = `♪ ${button.dataset.song} の小さなチャイムを再生しました。`;
}));
const places = { '紫陽花の小道':'雨あがりには、紫陽花の色がいっそう鮮やか。', '木漏れ日の丘':'歌うと、光の粒がふわりと踊る丘。', '歌の泉':'メジロちゃんの歌声が、森じゅうへ届く泉。', 'おひるね広場':'やわらかい苔のベッドで、ひとやすみ。', '小鳥たちの森':'たくさんの小鳥が、朝の挨拶をする場所。' };
document.querySelectorAll('.map button').forEach((button) => button.addEventListener('click', () => document.querySelector('#world-message').textContent = places[button.dataset.world]));

const sunoProfile = 'https://suno.com/@utau_mejiro';
document.querySelector('.official-movie')?.setAttribute('href', 'https://www.youtube.com/@うたうめじろ');
const featuredSongs = ['ことり会議', '若葉色モノローグ', 'さえずりのない夜', 'めじろ音頭〜チュルッと夏まつり！〜', 'クリームソーダ・サマー'];
document.querySelectorAll('.song-grid article').forEach((card, index) => {
  if (featuredSongs[index]) card.querySelector('h3').textContent = featuredSongs[index];
});
document.querySelectorAll('.play').forEach((button) => {
  const link = document.createElement('a');
  link.href = sunoProfile;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'play';
  link.textContent = 'Suno で聴く ↗';
  button.replaceWith(link);
});
const musicHeading = document.querySelector('.music .title-center');
if (musicHeading) musicHeading.insertAdjacentHTML('beforeend', '<a class="platform-link" href="https://suno.com/@utau_mejiro" target="_blank" rel="noopener noreferrer">Suno で楽曲を聴く ↗</a>');
const goodsGrid = document.querySelector('.goods-grid');
if (goodsGrid) goodsGrid.innerHTML = '<article class="suzuri-card"><i>🛍</i><div><h3>SUZURI のメジロちゃんグッズ</h3><p>メジロちゃんのグッズは、SUZURIのショップでご覧いただけます。<br>新しいアイテムも、ここからチェックしてね。</p></div><a href="https://suzuri.jp/utau_mejiro" target="_blank" rel="noopener noreferrer">SUZURI ショップへ ↗</a></article><article class="stamp-card"><i>💬</i><div><p class="card-label">NOW ON SALE</p><h3>メジロちゃん LINEスタンプ</h3><p>森から届く、やさしいひとこと。メジロちゃんのLINEスタンプを販売中です。</p></div><a href="https://store.line.me/stickershop/product/35247520/ja" target="_blank" rel="noopener noreferrer">LINEスタンプを購入 ↗</a></article>';

const entrustedCharacterNote = document.querySelector('.rin-rights p:last-child');
if (entrustedCharacterNote) entrustedCharacterNote.insertAdjacentHTML('beforebegin', '<p><strong>Nell（ちびキャラ）</strong><br>権利者：かなめ（X <a href="https://x.com/kaname_mbembe" target="_blank" rel="noopener noreferrer">@kaname_mbembe</a>）<br>公式サイト：<a href="https://www.mokele-mbembe.jp" target="_blank" rel="noopener noreferrer">www.mokele-mbembe.jp</a></p>');

const worldSection = document.querySelector('.world');
if (worldSection) worldSection.insertAdjacentHTML('beforebegin', `<section class="schedule" id="schedule"><div class="schedule-inner"><div><p class="overline">SCHEDULE</p><h2>出演実績</h2></div><div class="schedule-list"><article class="schedule-item"><time>2026年7月20日　20時から</time><div><b>新しい盆踊りの音　第二回</b><span>出演済み</span></div></article><article class="schedule-item"><time>2026年8月16日　20時から</time><div><b>新しい盆踊りの音　第三回</b><span>出演済み</span></div></article><article class="schedule-item"><time>2026年8月18日・19日<br>24日・25日のいずれか</time><div><b>サマテイ2026 夏とゾンビ〜</b><span>出演済み</span></div></article></div></div></section>`);
document.querySelectorAll('.schedule-item span').forEach((status) => { status.textContent = '出演済み'; });
const scheduleTitle = document.querySelector('.schedule h2');
if (scheduleTitle) scheduleTitle.textContent = '出演実績';
const scheduleList = document.querySelector('.schedule-list');
if (scheduleList) scheduleList.insertAdjacentHTML('beforeend', '<article class="schedule-item"><time>2026年9月1日</time><div><b>AI MUSIC MEMORY FIREWORKS</b><span>出演済み</span></div></article>');

const gallery = document.querySelector('.masonry');
if (gallery) gallery.insertAdjacentHTML('beforeend', '<figure class="scene"><img src="assets/gallery/waffle-with-friends.png" alt="ワッフルを楽しむメジロちゃんとおともだち"><figcaption><b>ワッフルの時間</b><span>2026.08.06</span></figcaption></figure><figure class="scene"><img src="assets/gallery/rainy-day-friends.png" alt="雨宿りするメジロちゃんとおともだち"><figcaption><b>雨の日のよりみち</b><span>2026.08.06</span></figcaption></figure><figure class="scene"><img src="assets/gallery/flower-shop-friends.png" alt="花屋さんのメジロちゃんとおともだち"><figcaption><b>花屋さんの午後</b><span>2026.08.06</span></figcaption></figure><figure class="scene"><img src="assets/gallery/watermelon-friends.png" alt="スイカを楽しむメジロちゃんとおともだち"><figcaption><b>すいか日和</b><span>2026.08.06</span></figcaption></figure><figure class="scene"><img src="assets/gallery/monja-friends.png" alt="もんじゃ焼きを楽しむメジロちゃんとおともだち"><figcaption><b>もんじゃ焼きパーティー</b><span>2026.08.06</span></figcaption></figure><figure class="scene"><img src="assets/gallery/sunflower-friends.png" alt="ひまわり畑のメジロちゃんとおともだち"><figcaption><b>ひまわりの小道</b><span>2026.08.06</span></figcaption></figure><figure class="scene"><img src="assets/gallery/beach-mochi.png" alt="海辺でおもちちゃんと遊ぶメジロちゃん"><figcaption><b>海辺のおもちちゃん</b><span>2026.08.06</span></figcaption></figure>');

if (gallery) {
  const scenes = [
    { title: '紫陽花の季節', copy: '雨あがりの小道で、ゆっくり深呼吸。', works: ['紫陽花の小道', '白い紫陽花', 'あじさい散歩', '紫陽花浴衣', '浴衣スタイル・スケッチ'] },
    { title: '森のひみつ', copy: '羽根のきらめきと、守護鳥に出会う物語。', works: ['森の歌姫', '守護鳥の祝福', 'ネラダイナーの冒険', '花かんむりの午後', '羽根衣装・スケッチ'] },
    { title: '夏のきらめき', copy: '海、ひまわり、そして甘いクリームソーダ。', works: ['夏のステージ', 'チェリーパイ・タイム', 'クリームソーダをどうぞ', '夏の海辺で', 'すいか日和', 'ひまわりの小道', '海辺のおもちちゃん', '夏のステージ・スケッチ'] },
    { title: 'おともだちとの時間', copy: 'おしゃべりして、笑って、今日も思い出が増えていく。', works: ['るーと森の約束', '乾杯のひととき', 'ワッフルの時間', '雨の日のよりみち', '花屋さんの午後', 'もんじゃ焼きパーティー'] },
  ];
  const figures = [...gallery.querySelectorAll('figure')];
  const byTitle = new Map(figures.map((figure) => [figure.querySelector('figcaption b')?.textContent, figure]));
  const collection = document.createElement('div');
  collection.className = 'gallery-scenes';
  scenes.forEach((scene, index) => {
    const section = document.createElement('section');
    section.className = 'gallery-scene';
    section.innerHTML = `<div class="scene-heading"><span>SCENE ${String(index + 1).padStart(2, '0')}</span><div><h3>${scene.title}</h3><p>${scene.copy}</p></div></div><div class="scene-grid"></div>`;
    const grid = section.querySelector('.scene-grid');
    scene.works.forEach((title) => { const figure = byTitle.get(title); if (figure) grid.append(figure); });
    if (grid.children.length) collection.append(section);
  });
  const characterSheetGroups = [
    { title: '基本・季節の装い', copy: 'メジロちゃんらしさを彩る、定番から季節の装いまで。', sheets: ['森の妖精・通常衣装', '若葉浴衣', 'サマー衣装', 'ステージ衣装', 'サマーフェアリーステージ', '白花ワンピース', '白レースワンピース', 'レースワンピース'] },
    { title: '日常・おでかけコーデ', copy: 'おさんぽ、カフェ、ステージへ。日々のとっておき。', sheets: ['きぐるみパジャマ', 'アイドル衣装（白）', 'チャイナミニワンピース', 'アイドル衣装（モノトーン）', 'セーラーアイドル衣装', 'フラワーワンピース', 'いちごアイドル衣装', '紫陽花浴衣', 'いちごケーキワンピース', 'ストライプワンピース', 'サマテイコーデ', '黒トップスコーデ'] },
    { title: '夏・イベント衣装', copy: '夏の歌とお祭りを彩る、軽やかな衣装たち。', sheets: ['サマーフェアリーステージ（SD）', 'ネラダイナー衣装', 'レース浴衣', '紫陽花浴衣（ネイビー帯）', '麻の葉浴衣'] },
    { title: '物語の衣装', copy: '森の魔法と冒険へ連れていく、ファンタジーコレクション。', sheets: ['Rinとおそろいの街歩きコーデ', '着ぐるみ衣装', '星読みの魔法使い', 'かぼちゃの森の妖精', '森のキノコ魔女', '鳥かごゴシック姫'] },
    { title: 'ハロウィン・特別設定', copy: '秋の夜の装いと、細部まで楽しむ設定シート。', sheets: ['ハロウィンコーデ', '月夜のからくり人形', '深海クラゲゴースト', 'キャンディ魔女', 'ハロウィン白おばけ', 'ねこゴシック', 'かぼちゃの森の妖精・設定', '鳥かごゴシック姫・設定', '着ぐるみ衣装・設定'] },
  ];
  const sheetAlbum = document.createElement('section');
  sheetAlbum.className = 'gallery-scene character-sheet-album';
  sheetAlbum.innerHTML = '<div class="scene-heading"><span>SCENE 05</span><div><h3>キャラクターシート・アルバム</h3><p>衣装やデザインの細部まで楽しめる、メジロちゃんの設定画集。</p></div></div><div class="character-sheet-groups"></div>';
  const sheetGroups = sheetAlbum.querySelector('.character-sheet-groups');
  let sheetIndex = 0;
  characterSheetGroups.forEach(({ title, copy, sheets }) => {
    const group = document.createElement('section');
    group.className = 'character-sheet-group';
    group.innerHTML = `<header><h4>${title}</h4><p>${copy}</p></header><div class="character-sheet-grid"></div>`;
    const sheetGrid = group.querySelector('.character-sheet-grid');
    sheets.forEach((sheetTitle) => {
      sheetIndex += 1;
      const number = String(sheetIndex).padStart(2, '0');
      sheetGrid.insertAdjacentHTML('beforeend', `<figure class="character-sheet"><img src="assets/character-sheets/sheet-${number}.png" alt="${sheetTitle}のキャラクターシート" loading="lazy"><figcaption><b>${sheetTitle}</b><span>sheet ${number}</span></figcaption></figure>`);
    });
    sheetGroups.append(group);
  });
  collection.append(sheetAlbum);
  gallery.replaceWith(collection);
  document.querySelector('.gallery-head .filters')?.replaceChildren(Object.assign(document.createElement('span'), { textContent: 'SCENE ALBUM' }));
  const galleryGuide = document.querySelector('.gallery-guide');
  if (galleryGuide) galleryGuide.textContent = '季節や場面ごとのアルバムです。気になる作品をタップすると、大きくご覧いただけます。';
}

const friendGrid = document.querySelector('.friend-grid');
if (friendGrid) friendGrid.innerHTML = '<article class="future recruit"><i>＋</i><h3>森のおともだち、募集中</h3><p>これからメジロちゃんと出会う、素敵な仲間たちを順番にご紹介していきます。</p></article><article class="friend-banner"><a href="https://momuandteasteam.com/" target="_blank" rel="noopener noreferrer"><img src="https://momuandteasteam.com/linkbanners/official-banner-square.jpg" alt="Momu & Tea Team 公式サイトを開く"></a></article><article class="friend-banner jackpot-banner"><a href="https://jackpot031.studio.site" target="_blank" rel="noopener noreferrer"><img src="assets/friends/jackpot031-banner.jpg" alt="JACKPOT031 Official Site を開く"></a></article><article class="friend-banner chronoconnex-banner"><a href="https://www.mokele-mbembe.jp/" target="_blank" rel="noopener noreferrer"><img src="assets/friends/chronoconnex-banner.png" alt="Chronoconnex 公式サイトを開く"></a></article><article class="friend-banner jayzaimusic-banner"><a href="https://lit.link/jayzaimusic" target="_blank" rel="noopener noreferrer"><img src="assets/friends/jayzaimusic-banner.jpg" alt="JayZaiMusic を開く"></a></article><article class="friend-banner elemayu-banner"><a href="https://elemayu-official.netlify.app/" target="_blank" rel="noopener noreferrer"><img src="assets/friends/elemayu-banner.jpg" alt="ELE MAYU 公式サイトを開く"></a></article>';

document.querySelector('.news')?.remove();
document.querySelectorAll('a[href="#news"]').forEach((link) => link.remove());
