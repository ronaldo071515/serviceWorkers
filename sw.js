const nombreCache = 'apv-v3';

const archivos = [
    "/",
    "index.html",
    "error.html",
    "./css/bootstrap.css",
    "./css/styles.css",
    "./js/app.js",
    "./js/apv.js",
  ];


//Cuando se instala el service worker
self.addEventListener('install', e => {
    console.log('Instalado el service worker');

    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                console.log('Cacheando');
                cache.addAll(archivos);
            })
    )

});

//Activar el Service Worker
self.addEventListener('activate', e => {
    console.log('Service Worker Acticado');

    e.waitUntil(
        caches.keys()
            .then( keys => {

                return Promise.all(
                    keys.filter( key => key !== nombreCache)
                        .map( key => caches.delete(key) )//Borra versiones anteriores
                )
            })
    )

});

//Evento fetch para descargar archivos estaticos
/* self.addEventListener('fetch', e => {
    //console.log('Fetch....', e);

    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache || fetch(e.request);
            })
            .catch( () => caches.match('/error.html'))
    )

}); */

self.addEventListener('fetch', function(event) {
    event.respondWith(
      // Try the cache
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function(response) {
          if (response.status === 404) {
            return caches.match('error.html');
          }
          return response
        });
      })
    );
  });