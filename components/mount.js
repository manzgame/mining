// DATZON AI V45 - mount helper.
// Tugasnya simpel: elemen halaman yang lagi nggak dipakai diparkir dari DOM,
// bukan cuma disembunyikan pakai z-index. Browser juga butuh napas, ternyata.

export function createMountRegistry(){
  const parking = document.createDocumentFragment();
  const registry = new Map();

  function register(name, selector){
    const node = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if(!node) return null;
    if(registry.has(name)) return registry.get(name);

    const anchor = document.createComment(`DATZON_${String(name).toUpperCase()}_ANCHOR`);
    node.parentNode.insertBefore(anchor, node);
    const entry = { name, node, anchor, mounted:true };
    registry.set(name, entry);
    return entry;
  }

  function mount(name){
    const item = registry.get(name);
    if(!item || item.mounted) return;
    const parent = item.anchor.parentNode || document.body;
    parent.insertBefore(item.node, item.anchor.nextSibling);
    item.mounted = true;
  }

  function unmount(name){
    const item = registry.get(name);
    if(!item || !item.mounted) return;
    parking.appendChild(item.node);
    item.mounted = false;
  }

  function isMounted(name){
    return !!registry.get(name)?.mounted;
  }

  function get(name){
    return registry.get(name)?.node || null;
  }

  return { register, mount, unmount, isMounted, get };
}
