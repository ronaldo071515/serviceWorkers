
//Cuando se instala el service worker
self.addEventListener('install', e => {
    console.log('Instalado el service worker');

    console.log(e);
});

//Activar el Service Worker
self.addEventListener('activate', e => {
    console.log('Service Worker Acticado');

    console.log(e);
});