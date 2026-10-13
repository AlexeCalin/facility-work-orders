/* Service Worker for Facility Work Orders push notifications */
self.addEventListener('push', event => {
 let msg={};try{msg=event.data?event.data.json():{}}catch{}
 const title=String(msg.title||'Facility Work Orders');
 const opts={body:String(msg.body||'Ai o notificare nouă.'),icon:'./icon.svg',badge:'./icon.svg',tag:String(msg.tag||'facility-alert'),renotify:true,data:{url:'./'}};
 event.waitUntil(self.registration.showNotification(title,opts));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 event.waitUntil((async()=>{const target=new URL('./',self.registration.scope).href;const clientsList=await clients.matchAll({type:'window',includeUncontrolled:true});for(const c of clientsList){if(c.url.startsWith(target)){await c.focus();return;}}await clients.openWindow(target)})());
});
