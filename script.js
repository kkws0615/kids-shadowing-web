// script.js

// 1. 準備好我們的劇本與時間軸 (這裡以 Level A: Letter B 為例)
const levelData = [
    { text: "B is for Bear.", end: 3.5 },   // 在 3.5 秒時暫停
    { text: "B is for Ball.", end: 6.0 },   // 在 6.0 秒時暫停
    { text: "B is for Banana.", end: 8.5 }, // 在 8.5 秒時暫停
    { text: "B is for Bus.", end: 11.0 },
    { text: "B is for Bird.", end: 13.5 }
];

// 2. 抓取 HTML 元素
const video = document.getElementById('mainVideo');
const subtitle = document.getElementById('subtitle');
const startBtn = document.getElementById('startBtn');
const shadowBtn = document.getElementById('shadowBtn');
const nextBtn = document.getElementById('nextBtn');

// 3. 狀態變數
let isShadowMode = false;
let currentSentenceIndex = 0;

// 4. 完整觀看模式 (Watch Mode)
startBtn.addEventListener('click', () => {
    isShadowMode = false;
    video.currentTime = 0;
    subtitle.innerText = "Let's watch!";
    nextBtn.style.display = 'none'; // 隱藏 Next 按鈕
    video.play();
});

// 5. 進入跟讀模式 (Shadow Mode)
shadowBtn.addEventListener('click', () => {
    isShadowMode = true;
    currentSentenceIndex = 0;
    video.currentTime = 0;
    
    updateSubtitle(); // 顯示第一句字幕
    nextBtn.style.display = 'none'; // 剛開始先隱藏
    video.play();
});

// 6. 核心：監聽影片播放時間 (Time Update)
video.addEventListener('timeupdate', () => {
    // 只有在跟讀模式下，才需要自動暫停
    if (isShadowMode && currentSentenceIndex < levelData.length) {
        let currentTargetTime = levelData[currentSentenceIndex].end;
        
        // 當影片時間到達或超過這句話的結束時間
        if (video.currentTime >= currentTargetTime) {
            video.pause(); // 暫停影片
            nextBtn.style.display = 'inline-block'; // 顯示 NEXT 讓孩子點擊
        }
    }
});

// 7. 點擊 NEXT 按鈕繼續下一句
nextBtn.addEventListener('click', () => {
    currentSentenceIndex++; // 進入下一句
    
    if (currentSentenceIndex < levelData.length) {
        updateSubtitle(); // 更新字幕
        nextBtn.style.display = 'none'; // 隱藏按鈕
        video.play(); // 繼續播放
    } else {
        subtitle.innerText = "Great Job! You finished!";
        nextBtn.style.display = 'none';
        // 可以加入煙火特效或恭喜音效
    }
});

// 更新字幕內容的輔助函數
function updateSubtitle() {
    subtitle.innerText = levelData[currentSentenceIndex].text;
}
