// DATZON AI V45 - chat page adapter.
// Chat hanya aktif saat main terpasang. Kalau settings dibuka, main diparkir.

export function enterChat(ctx){
  ctx.mount.mount('main');
  document.body.dataset.dzPage = 'chat';
  document.body.classList.remove('settings-route');
}

export function leaveChat(){
  // Tidak hapus chat. Riwayat dan listener V44 tetap aman.
}
