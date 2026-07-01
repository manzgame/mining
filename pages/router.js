// DATZON AI V45 - lightweight page router / mount-unmount guard.
// Bukan framework sok keren. Cuma penjaga supaya profile nggak numpuk di atas chatbox.

import { createMountRegistry } from '../components/mount.js';
import { enterHome, leaveHome } from './home.js';
import { enterChat, leaveChat } from './chat.js';
import { enterSettings, leaveSettings } from './profile.js';

const mount = createMountRegistry();
mount.register('main', 'main');

const ctx = { mount };
let current = null;

function settingsOpen(){
  const settings = document.getElementById('settingsPage');
  return !!settings && settings.classList.contains('show') && settings.getAttribute('aria-hidden') !== 'true';
}

function wantedPage(){
  if(settingsOpen()) return 'settings';
  if(document.body.classList.contains('chat-started')) return 'chat';
  return 'home';
}

function leave(page){
  if(page === 'settings') leaveSettings(ctx);
  if(page === 'chat') leaveChat(ctx);
  if(page === 'home') leaveHome(ctx);
}

function enter(page){
  if(page === 'settings') enterSettings(ctx);
  if(page === 'chat') enterChat(ctx);
  if(page === 'home') enterHome(ctx);
}

function syncPage(reason='sync'){
  const next = wantedPage();
  if(next === current){
    document.body.dataset.dzPage = next;
    return;
  }
  if(current) leave(current);
  current = next;
  enter(next);
  window.dispatchEvent(new CustomEvent('datzon:pagechange', { detail:{ page:next, reason } }));
}

function observeSettings(){
  const settings = document.getElementById('settingsPage');
  if(!settings) return;
  const mo = new MutationObserver(() => syncPage('settings-mutation'));
  mo.observe(settings, { attributes:true, attributeFilter:['class','aria-hidden'] });
}

function observeBodyMode(){
  const mo = new MutationObserver(() => syncPage('body-mode'));
  mo.observe(document.body, { attributes:true, attributeFilter:['class'] });
}

function addHardFallbackCss(){
  const style = document.createElement('style');
  style.id = 'datzon-v45-route-guard';
  style.textContent = `
    body[data-dz-page="settings"] main,
    body.settings-route main,
    body.settings-route .composer-card{
      display:none !important;
      pointer-events:none !important;
    }
    body[data-dz-page="settings"]{
      overflow:hidden !important;
    }
  `;
  document.head.appendChild(style);
}

function init(){
  addHardFallbackCss();
  observeSettings();
  observeBodyMode();
  requestAnimationFrame(() => syncPage('init'));
  window.DatzonRouter = {
    sync: syncPage,
    get page(){ return current; },
    mount
  };
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
else init();
