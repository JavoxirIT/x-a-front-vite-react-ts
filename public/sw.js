self.addEventListener('install', () => {
    console.log('Service Worker установлен');
});
self.addEventListener('fetch', () => {
    // можно пока ничего не кэшировать
});
