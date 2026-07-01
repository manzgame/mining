// DATZON AI V45 - profile/settings adapter.
// Ini inti opsi dua: saat settings aktif, halaman chat/home dicabut dari DOM.

export function enterSettings(ctx){
  document.body.dataset.dzPage = 'settings';
  document.body.classList.add('settings-route');
  ctx.mount.unmount('main');
}

export function leaveSettings(ctx){
  document.body.classList.remove('settings-route');
  ctx.mount.mount('main');
}
