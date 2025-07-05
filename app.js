// app.js

// ブラウザがService Workerに対応しているか確認
if ('serviceWorker' in navigator) {
  // ページが完全に読み込まれた後に、Service Workerファイルを登録
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker 登録成功:', registration);
      })
      .catch(error => {
        console.log('Service Worker 登録失敗:', error);
      });
  });
}
