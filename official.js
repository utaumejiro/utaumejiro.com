const modal = document.querySelector('#costume-modal');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');
const modalCopy = document.querySelector('#modal-copy');

document.querySelectorAll('.costume-card').forEach((card) => card.addEventListener('click', () => {
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
const featuredSongs = ['ことり会議', '若葉色モノローグ', 'さえずりのない夜'];
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
if (goodsGrid) goodsGrid.innerHTML = '<article class="suzuri-card"><i>🛍</i><div><h3>SUZURI のメジロちゃんグッズ</h3><p>メジロちゃんのグッズは、SUZURIのショップでご覧いただけます。<br>新しいアイテムも、ここからチェックしてね。</p></div><a href="https://suzuri.jp/utau_mejiro" target="_blank" rel="noopener noreferrer">SUZURI ショップへ ↗</a></article>';

const worldSection = document.querySelector('.world');
if (worldSection) worldSection.insertAdjacentHTML('beforebegin', `<section class="schedule" id="schedule"><div class="schedule-inner"><div><p class="overline">SCHEDULE</p><h2>出演予定</h2></div><div class="schedule-list"><article class="schedule-item"><time>2026年7月20日</time><div><b>新しい盆踊りの音　第二回</b><span>出演予定</span></div></article><article class="schedule-item"><time>2026年8月18日・19日<br>24日・25日のいずれか</time><div><b>サマテイ</b><span>出演予定</span></div></article></div></div></section>`);

const friendGrid = document.querySelector('.friend-grid');
if (friendGrid) friendGrid.innerHTML = '<article class="future recruit"><i>＋</i><h3>森のおともだち、募集中</h3><p>これからメジロちゃんと出会う、素敵な仲間たちを順番にご紹介していきます。</p></article><article class="friend-banner"><img src="https://momuandteasteam.com/linkbanners/official-banner-square.jpg" alt="Momu & Tea Team 公式バナー"></article>';

document.querySelector('.news')?.remove();
document.querySelectorAll('a[href="#news"]').forEach((link) => link.remove());
