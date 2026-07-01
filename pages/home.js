// DATZON AI V45 - home page adapter.
// Home tetap memakai DOM lama V44 biar fitur lama nggak kabur.

export function enterHome(ctx){
  ctx.mount.mount('main');
  document.body.dataset.dzPage = 'home';
  document.body.classList.add('home-mode');
  document.body.classList.remove('settings-route');
}

export function leaveHome(){
  document.body.classList.remove('home-mode');
}
