const songButton = document.querySelector('.song-button');
const songMessage = document.querySelector('.song-message');

function ringBell(frequency, startTime, duration, context) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

songButton?.addEventListener('click', () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    songMessage.textContent = '森の歌を想像してみてね。';
    return;
  }
  const context = new AudioContext();
  const now = context.currentTime;
  [659.25, 783.99, 880, 783.99, 659.25].forEach((note, index) => ringBell(note, now + index * 0.17, 0.7, context));
  songButton.setAttribute('aria-pressed', 'true');
  songButton.classList.add('is-playing');
  songButton.querySelector('b').textContent = 'a little song is playing';
  songMessage.textContent = '♪ 風にのって、メジロちゃんの歌が聞こえてきた。';
  window.setTimeout(() => {
    songButton.setAttribute('aria-pressed', 'false');
    songButton.classList.remove('is-playing');
    songButton.querySelector('b').textContent = 'play a little song';
  }, 1200);
});
