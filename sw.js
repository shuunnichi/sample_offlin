// sw.js

// キャッシュの名前とバージョンを定義
const CACHE_NAME = 'my-offline-cache-v1';
// キャッシュするファイルのリスト
const FILES_TO_CACHE = [
  './',
  './index.html',
  './main.css',
  './app.js'
];

// `self` はService Worker自身を指す
// installイベントは、Service Workerがインストールされるときに一度だけ実行される
self.addEventListener('install', (event) => {
  // install処理が終わるまで、他のイベントを待機させる
  event.waitUntil(
    // `caches`はブラウザのキャッシュストレージAPI
    // 指定した名前でキャッシュを開く
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('キャッシュを開きました');
        // 指定したファイルをすべてキャッシュに追加する
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// fetchイベントは、ページがリクエストを送信するたびに発生する
self.addEventListener('fetch', (event) => {
  // ブラウザのデフォルトのfetch処理を上書きする
  event.respondWith(
    // まずキャッシュ内にリクエストと一致するものがあるか探す
    caches.match(event.request)
      .then((response) => {
        // もしキャッシュにあれば、それを返す (ネットワーク通信は発生しない)
        if (response) {
          console.log('キャッシュから応答:', event.request.url);
          return response;
        }

        // キャッシュになければ、通常通りネットワークから取得する
        console.log('ネットワークから取得:', event.request.url);
        return fetch(event.request);
      })
  );
});
