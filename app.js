const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

    const promptEl = $('#prompt');
    const sendBtn = $('#sendBtn');
    const sendIcon = $('#sendIcon');
    const attachBtn = $('#attachBtn');
    const fileInput = $('#fileInput');
    const attachmentsEl = $('#attachments');
    const chatLog = $('#chatLog');
    const styleBtn = $('#styleBtn');
    const styleMenu = $('#styleMenu');
    const styleLabel = $('#styleLabel');
    const micBtn = $('#micBtn');
    const micIcon = $('#micIcon');
    const voiceWave = $('#voiceWave');
    const viewer = $('#viewer');
    const viewerBody = $('#viewerBody');
    const viewerTitle = $('#viewerTitle');
    const viewerClose = $('#viewerClose');
    const composerCard = $('#composerCard');
    const heroEl = $('#heroEl');
    const modelButton = $('#modelButton');
    const modelMenu = $('#modelMenu');
    const modelLabel = $('#modelLabel');
    const tempBtn = $('#tempBtn');
    const chatActions = $('#chatActions');
    const newChatBtn = $('#newChatBtn');
    const topMoreBtn = $('#topMoreBtn');
    const topChatMenu = $('#topChatMenu');
    const sidebarBtn = $('#sidebarBtn');
    const sidebar = $('#sidebar');
    const sidebarBackdrop = $('#sidebarBackdrop');
    const sideClose = $('#sideClose');
    const sideSearchBtn = $('#sideSearchBtn');
    const sideSearchPanel = $('#sideSearchPanel');
    const sideSearchInput = $('#sideSearchInput');
    const sideSearchClear = $('#sideSearchClear');
    const recentChatsEl = $('#recentChats');
    const recentEmptyEl = $('#recentEmpty');
    const answerMenuPortal = $('#answerMenuPortal');
    const floatingShield = (() => {
      let el = document.getElementById('floatingMenuShield');
      if(!el){
        el = document.createElement('div');
        el.id = 'floatingMenuShield';
        el.className = 'floating-menu-shield';
        el.setAttribute('aria-hidden','true');
        document.body.appendChild(el);
      }
      el.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        if(modelMenu?.classList?.contains('show')){
          closeAllFloatingMenus(modelMenu);
          closeModelMenuWithSectionCollapse();
          return;
        }
        closeAllFloatingMenus();
      });
      return el;
    })();
    const settingsPage = $('#settingsPage');
    const settingsBack = $('#settingsBack');
    const sideProfileCard = $('.side-profile-card');
    let activeMoreStack = null;


    let selectedStyle = 'Normal';
    let selectedLevel = 'Tinggi';
    let selectedEngine = 'Mistral';
    let uploadedFiles = [];
    let isSending = false;
    let isListening = false;
    let hasStartedChat = false;
    let temporaryMode = false;
    let lastUserText = '';
    let lastFilesSnapshot = [];
    let autoFollowAI = false;
    let currentChatRegistered = false;
    let currentChatId = null;
    let chatHistory = [];
    let recentFilter = '';
    let activeChatFiles = [];
    let currentSearchHits = [];
    let currentSearchIndex = -1;
    let topSearchReady = false;
    let pendingBugContext = null;
    const codeBlockStore = new Map();
    let codeBlockSeq = 0;
    let renderStreamingCode = false;
    let imagePageActive = false;
    let selectedImageProvider = 'Pollination';
    let selectedImageStyle = 'auto';
    let selectedImageRatio = '1:1';
    let selectedImageResolution = 'balanced';
    let imageSeedCounter = 0;
    let imageRatioMenu = null;
    let checkinClaimBusy = false;
    let freeMissionTimers = new Map();
    const LIMIT_STATE_KEY = 'datzonGuestLimitRequestV7';
    const LIMIT_WINDOW_MS = 12 * 60 * 60 * 1000;
    const LIMIT_CAPS = { chat:20, image:5 };
    const OWN_API_KEYS_KEY = 'datzonOwnCustomApiKeysV33';
    const OWN_API_ACTIVE_KEY = 'datzonActiveProviderKeyIndexV33';
    const API_KEY_LINKS = {
      googleStudio:'https://aistudio.google.com/app/apikey',
      mistral:'https://admin.mistral.ai/organization/api-keys',
      groq:'https://console.groq.com/keys'
    };
    let ownApiKeys = [];
    let selectedOwnApiKeySnapshot = null;
    let defaultProviderMenuOpen = false;
    let ownProviderMenuOpen = false;
    let lastDefaultEngine = 'Mistral';
    let modelMenuClosing = false;
    const FREE_AD_MISSIONS = [
      {id:'ad1', label:'Iklan 1', seconds:10, url:'https://www.effectivecpmnetwork.com/bcyp9feud?key=69f7d0eb112e630797b50786728d7b16'},
      {id:'ad2', label:'Iklan 2', seconds:10, url:'https://www.effectivecpmnetwork.com/fun79qde?key=f23c4db3393a77a42ef5412b1a75053a'},
      {id:'ad3', label:'Iklan 3', seconds:10, url:'https://www.effectivecpmnetwork.com/d36pkfnfb?key=98d72eaac9931c3e080dcce9d4d807a0'},
      {id:'ad4', label:'Iklan 4', seconds:10, url:'https://www.effectivecpmnetwork.com/uyd5pi1y7g?key=ecda7388108e4bf6b485ab620343f53a'},
      {id:'ad5', label:'Iklan 5', seconds:10, url:'https://www.effectivecpmnetwork.com/z55w4h3qx2?key=b3e81a33d4a9ac5be6d499f5f1bd6274'},
      {id:'ad6', label:'Iklan 6', seconds:10, url:'https://www.effectivecpmnetwork.com/ei197f8i?key=7296ce5ce218473810261eabd049ad7d'}
    ];
    const FREE_SOCIAL_MISSIONS = [
      {id:'youtube', label:'Subscribe YouTube', type:'youtube', seconds:5, url:'https://youtube.com/@danzcoze?si=suZi-4YeKFJKBYl2'},
      {id:'whatsapp', label:'Join Saluran WhatsApp', type:'whatsapp', seconds:5, url:'https://whatsapp.com/channel/0029VaLWvFyKWEKjhLtp0H3j'},
      {id:'tiktok', label:'Follow TikTok', type:'tiktok', seconds:5, url:'https://www.tiktok.com/@datzonn?_r=1&_t=ZS-97d1sWQcDII'}
    ];
    const chatUiCache = { heroHTML:'', modelMenuHTML:'', attachHTML:'', placeholder:'Tanya apa saja...' };
    const IMAGE_STYLES = [
      {id:'auto', label:'Auto', desc:'Ikut prompt, DATZON tambah polish ringan.', prompt:'high quality, clean composition'},
      {id:'realistic', label:'Realistis', desc:'Foto realistis dan natural.', prompt:'realistic photo, natural lighting, detailed textures, natural proportions'},
      {id:'anime', label:'Anime', desc:'Ilustrasi anime clean dan aesthetic.', prompt:'anime style, clean lineart, vibrant colors, cinematic anime lighting'},
      {id:'3d', label:'3D Render', desc:'Visual 3D modern dan halus.', prompt:'3D render, smooth materials, studio lighting, high detail'},
      {id:'cinematic', label:'Cinematic', desc:'Nuansa film, dramatis, detail.', prompt:'cinematic shot, dramatic lighting, depth of field, high detail'},
      {id:'poster', label:'Poster', desc:'Komposisi poster yang tegas.', prompt:'poster design, bold composition, clean layout, high contrast'},
      {id:'pixel', label:'Pixel Art', desc:'Gaya game retro pixel.', prompt:'pixel art style, retro game aesthetic, crisp pixels'},
      {id:'logo', label:'Logo / Icon', desc:'Cocok untuk brand dan maskot.', prompt:'logo icon design, centered composition, clean vector-like shape, minimal background'},
      {id:'fantasy', label:'Fantasy', desc:'Magis, epik, imajinatif.', prompt:'fantasy art, magical atmosphere, epic lighting, highly detailed'},
      {id:'cyberpunk', label:'Cyberpunk', desc:'Neon, futuristik, kota malam.', prompt:'cyberpunk neon lighting, futuristic atmosphere, rain reflections, dramatic colors'}
    ];
    const IMAGE_RESOLUTIONS = [
      {id:'fast', label:'Cepat', pixels:768, steps:18, desc:'Ringan, cocok coba prompt.'},
      {id:'balanced', label:'Seimbang', pixels:1024, steps:24, desc:'Default, kualitas aman.'},
      {id:'detail', label:'Detail', pixels:1280, steps:30, desc:'Lebih tajam, agak lama.'},
      {id:'hd', label:'HD Eksperimental', pixels:1536, steps:36, desc:'Paling berat, bisa gagal di API gratis.'}
    ];
    

    const DATZON_CLOUDINARY_TARGETS = {
      profile:{cloudName:'dwmgmf6zu', uploadPreset:'profile'},
      imageAttach:{cloudName:'djnyszgcx', uploadPreset:'imageattch'},
      fileAttach:{cloudName:'dsrnownxj', uploadPreset:'filedll'},
      generatedImage:{cloudName:'dsqrftzpi', uploadPreset:'gambarai'}
    };
    function normalizeCloudinaryTarget(kind='imageAttach'){
      const cfg = window.DATZON_CLOUDINARY_CONFIG || {};
      const fallback = DATZON_CLOUDINARY_TARGETS[kind] || DATZON_CLOUDINARY_TARGETS.imageAttach;
      const target = cfg.targets?.[kind] || cfg[kind] || {};
      const cloudName = String(target.cloudName || fallback.cloudName || '').trim();
      const uploadPreset = String(target.uploadPreset || target.preset || cfg.presets?.[kind] || fallback.uploadPreset || '').trim();
      const uploadUrl = String(target.uploadUrl || (cloudName ? `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload` : '')).trim();
      return {cloudName, uploadPreset, uploadUrl};
    }
    function cloudinaryConfig(kind='imageAttach'){
      return normalizeCloudinaryTarget(kind);
    }
    function cloudinaryPreset(kind){
      const cfg = cloudinaryConfig(kind);
      if(!cfg.uploadPreset) throw new Error(`Preset Cloudinary ${kind || 'upload'} belum disetel.`);
      return cfg.uploadPreset;
    }
    function cloudinaryAttemptForm(fileOrUrl, kind, options={}){
      const fd = new FormData();
      if(fileOrUrl instanceof Blob){
        const filename = options.filename || (fileOrUrl.name || `${kind}-${Date.now()}`);
        fd.append('file', fileOrUrl, filename);
      }else{
        fd.append('file', String(fileOrUrl));
      }
      fd.append('upload_preset', cloudinaryPreset(kind));
      // Unsigned upload Cloudinary hanya boleh kirim file + upload_preset.
      // Jangan kirim return_delete_token dari front-end karena Cloudinary akan menolak upload.
      return fd;
    }
    async function postCloudinaryForm(url, fd){
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 60000);
      let res;
      try{
        res = await fetch(url, {method:'POST', body:fd, signal:controller.signal});
      }catch(err){
        if(err?.name === 'AbortError') throw new Error('Upload Cloudinary timeout. Coba koneksi lain atau cek preset.');
        throw err;
      }finally{
        clearTimeout(timer);
      }
      const raw = await res.text().catch(() => '');
      let data = {};
      try{ data = raw ? JSON.parse(raw) : {}; }catch(e){ data = {raw}; }
      if(!res.ok || !data.secure_url){
        const msg = data?.error?.message || data?.message || raw || res.statusText || 'Upload Cloudinary gagal';
        throw new Error(msg);
      }
      return data;
    }
    function dataUrlFromFile(file){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(reader.error || new Error('Gagal membaca file.'));
        reader.readAsDataURL(file);
      });
    }
    async function uploadToCloudinary(fileOrUrl, kind='imageAttach', options={}){
      if(!fileOrUrl) throw new Error('File Cloudinary kosong.');
      const cfg = cloudinaryConfig(kind);
      if(!cfg.cloudName || !cfg.uploadUrl) throw new Error('Cloudinary config belum lengkap.');

      // Jalur utama: file/blob asli langsung ke auto/upload + upload_preset.
      // Jalur fallback: khusus gambar, coba dataURL kalau browser HP gagal kirim blob.
      const attempts = [{input:fileOrUrl, label:'auto'}];
      const isBlob = fileOrUrl instanceof Blob;
      const mime = isBlob ? (fileOrUrl.type || '') : '';
      const isImage = ['profile','imageAttach','generatedImage'].includes(kind) || /^image\//i.test(mime);
      if(isBlob && isImage){
        try{
          const dataUrl = await dataUrlFromFile(fileOrUrl);
          if(dataUrl) attempts.push({input:dataUrl, label:'dataURL'});
        }catch(e){ console.warn('Cloudinary dataURL fallback gagal disiapkan:', e); }
      }

      let lastErr = null;
      for(const attempt of attempts){
        try{
          const fd = cloudinaryAttemptForm(attempt.input, kind, options);
          const data = await postCloudinaryForm(cfg.uploadUrl, fd);
          data.__uploadAttempt = attempt.label;
          data.__preset = cloudinaryPreset(kind);
          return data;
        }catch(err){
          lastErr = err;
          console.warn(`Cloudinary ${kind} gagal via ${attempt.label}:`, err?.message || err);
        }
      }
      throw lastErr || new Error('Upload Cloudinary gagal.');
    }
    function imageDisplayUrl(data={}){
      return data.cloudUrl || data.secure_url || data.url || data.src || data.text || '';
    }
    const STORAGE_ASSETS = 'datzonAiStorageAssetsV22';
    function storageAssetId(asset={}){
      return String(asset.cloudPublicId || asset.public_id || asset.cloudUrl || asset.url || asset.id || `${asset.kind || 'asset'}-${asset.name || ''}-${asset.bytes || 0}`).trim();
    }
    function normalizeStoredAsset(asset={}){
      const id = storageAssetId(asset);
      return {
        id,
        kind: asset.kind || asset.type || 'asset',
        name: asset.name || asset.filename || asset.public_id || asset.cloudPublicId || id,
        bytes: Number(asset.bytes || asset.cloudBytes || asset.size || 0) || 0,
        cloudUrl: asset.cloudUrl || asset.secure_url || asset.url || '',
        cloudPublicId: asset.cloudPublicId || asset.public_id || '',
        cloudName: asset.cloudName || '',
        deleteToken: asset.deleteToken || asset.delete_token || '',
        source: asset.source || 'cloudinary',
        at: asset.at || new Date().toISOString()
      };
    }
    function mergeStoredAssets(...lists){
      const map = new Map();
      lists.flat().filter(Boolean).forEach(raw => {
        const a = normalizeStoredAsset(raw);
        if(!a.id) return;
        const old = map.get(a.id) || {};
        map.set(a.id, {...old, ...a, bytes: Math.max(Number(old.bytes || 0), Number(a.bytes || 0))});
      });
      return Array.from(map.values());
    }
    function loadStorageAssets(){
      try{ const arr = JSON.parse(localStorage.getItem(STORAGE_ASSETS) || '[]'); return Array.isArray(arr) ? arr : []; }catch(e){ return []; }
    }
    function saveStorageAssets(arr=[]){
      try{ localStorage.setItem(STORAGE_ASSETS, JSON.stringify(mergeStoredAssets(arr).slice(-500))); }catch(e){}
    }
    function trackStoredAsset(asset={}){
      const clean = normalizeStoredAsset(asset);
      if(!clean.id) return clean;
      saveStorageAssets(mergeStoredAssets(loadStorageAssets(), [clean]));
      try{
        if(typeof profileState !== 'undefined' && profileState){
          profileState.storageAssets = mergeStoredAssets(profileState.storageAssets || [], [clean]).slice(-500);
          if(typeof saveProfileStateLocalOnly === 'function') saveProfileStateLocalOnly();
        }
      }catch(e){}
      try{ window.DATZON_CLOUD?.saveStorageAsset?.(clean); }catch(e){}
      return clean;
    }
    function removeStoredAsset(predicate){
      const keep = loadStorageAssets().filter(a => !predicate(a));
      saveStorageAssets(keep);
      try{
        if(typeof profileState !== 'undefined' && profileState){
          profileState.storageAssets = (profileState.storageAssets || []).filter(a => !predicate(a));
          if(typeof saveProfileStateLocalOnly === 'function') saveProfileStateLocalOnly();
        }
      }catch(e){}
      return keep;
    }
    async function tryDeleteCloudinaryAsset(asset={}){
      const a = normalizeStoredAsset(asset);
      if(!a.deleteToken || !a.cloudName) return false;
      try{
        const fd = new FormData();
        fd.append('token', a.deleteToken);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(a.cloudName)}/delete_by_token`, {method:'POST', body:fd});
        return res.ok;
      }catch(e){ return false; }
    }
    async function tryDeleteCloudinaryAssets(assets=[]){
      const list = (assets || []).slice(0,60);
      let ok = 0;
      for(const a of list){ if(await tryDeleteCloudinaryAsset(a)) ok++; }
      return ok;
    }
    async function uploadGeneratedImageToCloudinary(data={}, prompt=''){
      try{
        const source = data.blob || data.file || data.url;
        if(!source || data.cloudUrl) return data;
        let uploadInput = source;
        let filename = `datzon-ai-image-${Date.now()}.png`;
        if(/^blob:/i.test(String(source)) || data.sourceType === 'blob'){
          const res = await fetch(source);
          const blob = await res.blob();
          uploadInput = blob;
          filename = `datzon-ai-${Date.now()}.${(blob.type || 'image/png').split('/')[1] || 'png'}`;
        }
        const uploaded = await uploadToCloudinary(uploadInput, 'generatedImage', {
          filename,
          tags:'datzon-ai,gambarai,generated',
          context:`provider=${String(data.provider || imageProviderLabel?.() || 'DATZON').replace(/[|=]/g,' ')}|prompt=${String(prompt || '').slice(0,160).replace(/[|=]/g,' ')}`
        });
        const result = {
          ...data,
          originalUrl:data.url || '',
          cloudUrl:uploaded.secure_url || uploaded.url || '',
          cloudPublicId:uploaded.public_id || '',
          cloudName:cloudinaryConfig('generatedImage').cloudName || '',
          deleteToken:uploaded.delete_token || '',
          cloudFormat:uploaded.format || '',
          cloudBytes:uploaded.bytes || 0,
          savedToCloudinary:true
        };
        trackStoredAsset({kind:'generatedImage', name:`gambar-ai-${Date.now()}.${uploaded.format || 'png'}`, bytes:uploaded.bytes || 0, cloudUrl:uploaded.secure_url || uploaded.url || '', cloudPublicId:uploaded.public_id || '', cloudName:cloudinaryConfig('generatedImage').cloudName || '', deleteToken:uploaded.delete_token || '', source:'generatedImage'});
        return result;
      }catch(err){
        console.warn('Upload gambar AI ke Cloudinary gagal:', err);
        return {...data, cloudUploadError:err?.message || String(err), savedToCloudinary:false};
      }
    }

    const IMMORTAL_LOGO_URL = 'https://i.ibb.co.com/wZW5rhNm/66676-removebg-preview-image-repair-1782777130017.png';
    let immortalLogoPreloaded = false;
    function preloadImmortalLogo(){
      if(immortalLogoPreloaded || !IMMORTAL_LOGO_URL) return;
      immortalLogoPreloaded = true;
      try{
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.referrerPolicy = 'no-referrer';
        img.src = IMMORTAL_LOGO_URL;
        window.__DATZON_IMMORTAL_LOGO_CACHE = img;
      }catch(e){}
    }
    function crownSvgHTML(){
      return '<span class="immortal-crown" aria-label="Rank Immortal" title="Rank Immortal"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path class="crown-body" d="M3 8.2l4.25 3.35L12 4.4l4.75 7.15L21 8.2l-2.05 10.05H5.05L3 8.2Z" fill="currentColor"/><path class="crown-gem" d="M12 7.9 14.05 13H9.95L12 7.9Z" fill="rgba(255,255,255,.62)"/><path d="M6 20h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>';
    }
    function ensureImmortalNameBadges(){
      const rankState = currentRankState?.() || {active:false};
      const active = !!rankState.active;
      const names = [$('#profileName'), $('#sideProfileName') || $('.side-profile-name')].filter(Boolean);
      names.forEach(el => {
        el.classList.toggle('immortal-name', active);
        if(!active) return;
        const raw = (el.querySelector('span')?.textContent || el.childNodes?.[0]?.textContent || el.textContent || '').replace(/\s+/g,' ').trim() || 'DATZON User';
        if(!el.querySelector('.immortal-crown')){
          el.innerHTML = `<span>${escapeHtml(raw)}</span>${crownSvgHTML()}`;
        }
      });
    }
    function immortalAnimatedLogoHTML(){
      return `<svg class="immortal-svg-logo" viewBox="0 0 240 240" role="img" aria-label="DATZON AI Rank Immortal" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="imGold" x1="35" y1="20" x2="205" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff6c7"/><stop offset=".22" stop-color="#f8cb58"/><stop offset=".55" stop-color="#b87926"/><stop offset=".78" stop-color="#ffe48d"/><stop offset="1" stop-color="#9b5f18"/>
          </linearGradient>
          <linearGradient id="imGem" x1="55" y1="40" x2="190" y2="205" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#8df4ff"/><stop offset=".28" stop-color="#b477ff"/><stop offset=".58" stop-color="#ff5ec9"/><stop offset="1" stop-color="#5e7cff"/>
          </linearGradient>
          <radialGradient id="imCore" cx="50%" cy="42%" r="64%">
            <stop offset="0" stop-color="#fff9d8"/><stop offset=".24" stop-color="#ff76d0"/><stop offset=".55" stop-color="#8b57ff"/><stop offset="1" stop-color="#11071f"/>
          </radialGradient>
          <filter id="imGlow" x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="4" result="blur"/><feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.95  0 1 0 0 0.65  0 0 1 0 1  0 0 0 .9 0" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="imSoft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter>
        </defs>
        <g class="im-aura">
          <circle cx="120" cy="122" r="78" fill="none" stroke="url(#imGem)" stroke-width="2" opacity=".36"/>
          <circle cx="120" cy="122" r="101" fill="none" stroke="url(#imGold)" stroke-width="1.5" opacity=".22"/>
        </g>
        <g class="im-knot" filter="url(#imGlow)">
          <path class="im-band im-band-back" d="M42 116C42 78 72 54 103 62c22 6 33 24 47 46 12 19 23 35 45 33 24-2 38-20 38-41 0-24-18-44-42-44-24 0-40 16-56 41-17 26-32 52-66 54-36 2-62-22-62-55 0-35 28-61 64-61"/>
          <path class="im-band im-band-front" d="M198 116c0 38-30 62-61 54-22-6-33-24-47-46-12-19-23-35-45-33-24 2-38 20-38 41 0 24 18 44 42 44 24 0 40-16 56-41 17-26 32-52 66-54 36-2 62 22 62 55 0 35-28 61-64 61"/>
          <path class="im-band im-band-mid" d="M120 35c31 0 53 24 53 53 0 27-16 43-39 60-12 9-19 18-14 34 4 12 14 20 27 20 16 0 28-12 28-28"/>
          <path class="im-band im-band-mid" d="M120 205c-31 0-53-24-53-53 0-27 16-43 39-60 12-9 19-18 14-34-4-12-14-20-27-20-16 0-28 12-28 28"/>
          <path class="im-gem-shield" d="M120 48 151 87 139 139 120 184 101 139 89 87 120 48Z" fill="url(#imCore)" stroke="url(#imGold)" stroke-width="6"/>
          <path class="im-gem-line" d="M120 56 136 91 120 170 104 91 120 56Z" fill="none" stroke="#fff0a8" stroke-width="2" opacity=".72"/>
          <path class="im-cut l" d="M55 92 77 70 100 77 83 97Z" fill="url(#imGem)" opacity=".82"/>
          <path class="im-cut r" d="M185 92 163 70 140 77 157 97Z" fill="url(#imGem)" opacity=".82"/>
          <path class="im-cut b" d="M120 194 88 166 105 155 120 174 135 155 152 166Z" fill="url(#imGem)" opacity=".86"/>
        </g>
        <g class="im-sparks" fill="#ffe493">
          <circle cx="53" cy="55" r="3"/><circle cx="202" cy="61" r="2.5"/><circle cx="42" cy="179" r="2.6"/><circle cx="198" cy="184" r="3"/>
        </g>
      </svg>`;
    }
    function setNodeTextKeepButtons(el, text){
      if(!el) return;
      const node = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
      if(node) node.nodeValue = text;
      else el.insertBefore(document.createTextNode(text), el.firstChild || null);
    }


    let speechRecognition = null;
    let speechBaseText = '';
    let micStopRequested = false;
    let micStartLock = false;
    let micRestartTimer = 0;
    let micIdleTimer = 0;
    let micPermissionRequestSeq = 0;
    const MIC_PERMISSION_ACK = 'datzonMicPermissionGrantedV1';
    const MIC_AUTO_STOP_MS = 2700;
    const MIC_FIRST_IDLE_MS = 5200;
    const MIC_PERMISSION_WAIT_MS = 6500;

    function cleanSpeechText(value){
      return String(value || '')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function speechWords(value){
      return cleanSpeechText(value)
        .split(' ')
        .map(w => w.trim())
        .filter(Boolean);
    }

    function sameSpeechWord(a, b){
      return String(a || '').toLowerCase() === String(b || '').toLowerCase();
    }

    function collapseSpeechRepeats(value){
      let words = speechWords(value);
      if(words.length < 2) return cleanSpeechText(value);

      let changed = true;
      let guard = 0;
      while(changed && guard < 8){
        changed = false;
        guard++;

        for(let n = Math.min(10, Math.floor(words.length / 2)); n >= 1; n--){
          const next = [];
          for(let i = 0; i < words.length; i++){
            let duplicate = false;
            if(i + (n * 2) <= words.length){
              duplicate = true;
              for(let j = 0; j < n; j++){
                if(!sameSpeechWord(words[i + j], words[i + n + j])){
                  duplicate = false;
                  break;
                }
              }
            }

            if(duplicate){
              next.push(...words.slice(i, i + n));
              i += (n * 2) - 1;
              changed = true;
            }else{
              next.push(words[i]);
            }
          }
          words = next;
        }
      }

      return cleanSpeechText(words.join(' '));
    }

    function mergeSpeechByOverlap(left, right){
      left = cleanSpeechText(left);
      right = cleanSpeechText(right);
      if(!left) return collapseSpeechRepeats(right);
      if(!right) return collapseSpeechRepeats(left);

      const leftNorm = left.toLowerCase();
      const rightNorm = right.toLowerCase();
      if(leftNorm === rightNorm) return collapseSpeechRepeats(left);
      if(rightNorm.startsWith(leftNorm + ' ') || rightNorm === leftNorm) return collapseSpeechRepeats(right);
      if(leftNorm.startsWith(rightNorm + ' ') || leftNorm === rightNorm) return collapseSpeechRepeats(left);

      const a = speechWords(left);
      const b = speechWords(right);
      const max = Math.min(a.length, b.length, 18);
      let overlap = 0;
      for(let k = max; k >= 1; k--){
        let ok = true;
        for(let i = 0; i < k; i++){
          if(!sameSpeechWord(a[a.length - k + i], b[i])){
            ok = false;
            break;
          }
        }
        if(ok){ overlap = k; break; }
      }

      return collapseSpeechRepeats([...a, ...b.slice(overlap)].join(' '));
    }

    function composeSpeechText(baseText, finalText, interimText){
      finalText = collapseSpeechRepeats(finalText);
      interimText = collapseSpeechRepeats(interimText);

      let sessionText = '';
      if(finalText && interimText){
        const f = finalText.toLowerCase();
        const i = interimText.toLowerCase();
        if(i === f || i.startsWith(f + ' ')) sessionText = interimText;
        else if(f.startsWith(i + ' ')) sessionText = finalText;
        else sessionText = mergeSpeechByOverlap(finalText, interimText);
      }else{
        sessionText = finalText || interimText;
      }

      return mergeSpeechByOverlap(baseText, sessionText).trimStart();
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    function setMicUiListening(state){
      if(state){
        isListening = true;
        micBtn?.classList.add('mic-hidden');
        voiceWave?.classList.add('show');
        sendBtn?.classList.add('stop-mode');
        sendBtn?.classList.remove('loading');
        sendBtn.disabled = false;
        if(sendIcon) sendIcon.innerHTML = icons.stop;
        if(promptEl) promptEl.placeholder = uiText('Mendengarkan... silakan bicara');
      }else{
        isListening = false;
        micBtn?.classList.remove('mic-hidden');
        voiceWave?.classList.remove('show');
        sendBtn?.classList.remove('stop-mode');
        if(sendIcon) sendIcon.innerHTML = icons.send;
        if(promptEl) promptEl.placeholder = uiText('Tanya apa saja...');
      }
      updateComposerSpace?.();
    }

    function clearMicIdleTimer(){
      clearTimeout(micIdleTimer);
      micIdleTimer = 0;
    }

    function armMicAutoStop(delay=MIC_AUTO_STOP_MS){
      clearMicIdleTimer();
      micIdleTimer = setTimeout(() => {
        if(!isListening || isSending) return;
        micStopRequested = true;
        try{ speechRecognition?.stop(); }catch(e){
          try{ speechRecognition?.abort(); }catch(err){}
        }
        finishMicSession();
      }, delay);
    }

    function finishMicSession(){
      clearTimeout(micRestartTimer);
      clearMicIdleTimer();
      micRestartTimer = 0;
      micStartLock = false;
      setMicUiListening(false);
    }

    if (SpeechRecognition) {
      speechRecognition = new SpeechRecognition();
      speechRecognition.lang = 'id-ID';
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.maxAlternatives = 1;

      speechRecognition.onstart = () => {
        micStartLock = false;
        micStopRequested = false;
        setMicUiListening(true);
        armMicAutoStop(MIC_FIRST_IDLE_MS);
      };

      speechRecognition.onerror = (event) => {
        const err = event?.error || 'unknown';
        console.warn('Speech recognition error:', err);

        if(err === 'not-allowed' || err === 'service-not-allowed'){
          try{ localStorage.removeItem(MIC_PERMISSION_ACK); }catch(e){}
          micStopRequested = true;
          showMicBlockedInfo();
          finishMicSession();
          return;
        }

        if(err === 'no-speech' || err === 'aborted'){
          micStopRequested = true;
          finishMicSession();
          return;
        }

        micStopRequested = true;
        finishMicSession();
        showMiniToast?.('Speech gagal: ' + err);
      };

      speechRecognition.onend = () => {
        finishMicSession();
      };

      speechRecognition.onresult = (event) => {
        armMicAutoStop(MIC_AUTO_STOP_MS);
        let finalText = '';
        let interimText = '';

        // Chrome Android kadang mengirim transcript final + interim yang isinya
        // masih mengulang kalimat yang sama. Jangan langsung concat mentah,
        // karena hasilnya bisa menjadi: "tolong tolong buatkan...".
        for(let i = 0; i < event.results.length; i++){
          const part = cleanSpeechText(event.results[i][0]?.transcript || '');
          if(!part) continue;
          if(event.results[i].isFinal) finalText = mergeSpeechByOverlap(finalText, part);
          else interimText = mergeSpeechByOverlap(interimText, part);
        }

        const text = composeSpeechText(speechBaseText, finalText, interimText);

        if(promptEl && text !== promptEl.value){
          promptEl.value = text;
          autoResizeTextarea();
          promptEl.dispatchEvent(new Event('input', {bubbles:true}));
        }
      };
    }

    const styles = [
      { name:'Normal', desc:'Jawaban standar, aman buat demo.' },
      { name:'Santai', desc:'Bahasa ringan, kayak ngobrol.' },
      { name:'Profesional', desc:'Rapi buat kerjaan dan bisnis.' },
      { name:'Marketing', desc:'Copywriting jualan biar nggak lemes.' },
      { name:'Ringkas', desc:'Pendek, padat, anti muter-muter.' },
      { name:'Formal', desc:'Serius, cocok surat dan dokumen.' },
      { name:'Storytelling', desc:'Naratif dan enak dibaca.' },
      { name:'SMK Mode', desc:'Bahasa gampang, nggak sok profesor.' }
    ];

    const icons = {
      mic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 11a7 7 0 0 1-14 0M12 18v4M8 22h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      stop:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 8h8v8H8V8Z" fill="currentColor"/></svg>',
      send:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="m12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      file:'<svg width="31" height="31" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      pdf:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" stroke-width="2"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="2"/><path d="M7 17h2a1.5 1.5 0 0 0 0-3H7v4ZM12 14v4M12 14h1.2a2 2 0 0 1 0 4H12M17 18v-4h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
      check:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="m20 6-11 11-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      bot:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="8" width="14" height="11" rx="4" stroke="currentColor" stroke-width="2"/><path d="M12 8V4M9 4h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9.5" cy="13.5" r="1" fill="currentColor"/><circle cx="14.5" cy="13.5" r="1" fill="currentColor"/><path d="M9 17h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    };

    function updateComposerSpace(){
      requestAnimationFrame(() => {
        const h = Math.ceil(composerCard.getBoundingClientRect().height);
        document.documentElement.style.setProperty('--composer-h', `${h}px`);
      });
    }
    if('ResizeObserver' in window) new ResizeObserver(updateComposerSpace).observe(composerCard);
    let resizeTick=0; window.addEventListener('resize', () => { cancelAnimationFrame(resizeTick); resizeTick=requestAnimationFrame(()=>{ updateComposerSpace(); closeAllFloatingMenus(); }); });
    window.addEventListener('scroll', () => closeAllFloatingMenus(), {passive:true});

    function escapeHtml(str){
      return String(str).replace(/[&<>'"]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[tag]));
    }
    function uiText(str){
      try{ return window.DATZON_I18N?.t ? window.DATZON_I18N.t(str) : str; }catch(e){ return str; }
    }
    function uiApplySoon(root=document.body){
      try{ setTimeout(() => window.DATZON_I18N?.apply?.(root), 0); }catch(e){}
    }
    function formatBytes(bytes){
      if(bytes === 0) return '0 B';
      const k = 1024, sizes = ['B','KB','MB','GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    }
    function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}


    function imageSvgIcon(){
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" stroke-width="2"/><path d="m5 17 4.5-4.5 3.2 3.2 2.1-2.1L19 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="15.5" cy="9" r="1.5" fill="currentColor"/></svg>';
    }
    function ratioSvgIcon(){
      return '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" stroke-width="2"/><path d="M8 9h8M8 15h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    }
    function resolutionSvgIcon(){
      return '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 12h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    }
    function downloadSvgIcon(){
      return '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    function imageProviderId(){
      const val = String(selectedImageProvider || 'Pollination').toLowerCase();
      return val.includes('hug') ? 'huggingface' : 'pollination';
    }
    function imageProviderLabel(){
      return imageProviderId() === 'huggingface' ? 'Hugging Face' : 'Pollination';
    }
    function huggingFaceToken(){
      return String(
        window.DATZON_HUGGINGFACE_TOKEN ||
        window.DATZON_HUGGING_FACE_TOKEN ||
        window.HF_TOKEN ||
        localStorage.getItem('datzonHuggingFaceApiKey') ||
        localStorage.getItem('DATZON_HUGGINGFACE_TOKEN') ||
        ''
      ).trim();
    }
    function imageLogoHTML(extraClass=''){
      ensureChatUiCache();
      try{
        const wrap = document.createElement('div');
        wrap.innerHTML = chatUiCache.heroHTML || '';
        const svg = wrap.querySelector('.voice-logo');
        if(svg){
          if(extraClass) extraClass.split(/\s+/).filter(Boolean).forEach(c => svg.classList.add(c));
          return svg.outerHTML;
        }
      }catch(e){}
      return `<svg class="voice-logo ${extraClass}" viewBox="0 0 160 160" role="img" aria-label="DATZON Voice Wave AI Logo"><defs><linearGradient id="waveGFallback" x1="36" y1="30" x2="124" y2="130"><stop offset="0%" stop-color="rgba(255,255,255,.86)"/><stop offset="45%" stop-color="var(--lime)"/><stop offset="100%" stop-color="var(--lime3)"/></linearGradient><radialGradient id="softGlowFallback" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="var(--lime)" stop-opacity=".38"/><stop offset="58%" stop-color="var(--lime)" stop-opacity=".12"/><stop offset="100%" stop-color="var(--lime)" stop-opacity="0"/></radialGradient></defs><g class="logo-float"><circle cx="80" cy="80" r="66" fill="url(#softGlowFallback)"/><circle class="outer-pulse" cx="80" cy="80" r="62" fill="rgba(var(--lime-rgb),.055)" stroke="rgba(var(--lime-rgb),.34)" stroke-width="2"/><circle class="inner-pulse" cx="80" cy="80" r="49" fill="rgba(var(--lime-rgb),.08)" stroke="rgba(var(--lime-rgb),.18)" stroke-width="2"/><circle class="dash-ring" cx="80" cy="80" r="44" fill="none" stroke="rgba(var(--lime-rgb),.58)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="7 9"/><g class="wave-group" fill="url(#waveGFallback)"><rect class="wave-bar" x="45" y="58" width="10" height="44" rx="5"/><rect class="wave-bar" x="60" y="42" width="10" height="76" rx="5"/><rect class="wave-bar" x="75" y="32" width="10" height="96" rx="5"/><rect class="wave-bar" x="90" y="48" width="10" height="64" rx="5"/><rect class="wave-bar" x="105" y="62" width="10" height="36" rx="5"/></g></g></svg>`;
    }
    function ensureChatUiCache(){
      if(!chatUiCache.heroHTML && heroEl) chatUiCache.heroHTML = heroEl.innerHTML;
      if(!chatUiCache.modelMenuHTML && modelMenu) chatUiCache.modelMenuHTML = modelMenu.innerHTML;
      if(!chatUiCache.attachHTML && attachBtn) chatUiCache.attachHTML = attachBtn.innerHTML;
      if(promptEl && !chatUiCache.placeholder) chatUiCache.placeholder = promptEl.placeholder || uiText('Tanya apa saja...');
    }
    function imageHeroHTML(){
      return `
      <div class="pill image-pill"><span class="pill-dot"></span>GAMBAR AI</div>
      ${imageLogoHTML('image-voice-logo')}
      <h1>Buat <span class="lime">gambar</span> dengan DATZON</h1>
      <p>Tulis prompt gambar, pilih gaya, kualitas, dan provider. Output dibuat stabil dalam rasio 1:1 supaya hasilnya tidak gepeng.</p>
      <div class="quick-grid image-quick-grid" aria-label="Ide prompt gambar">
        <button class="quick-card" type="button" data-prompt="Buatkan gambar sapi memakan rumput di padang hijau, cinematic, detail tinggi"><span class="quick-icon">${imageSvgIcon()}</span><span class="quick-text">Sapi makan rumput</span></button>
        <button class="quick-card" type="button" data-prompt="Buatkan poster futuristik DATZON AI warna neon lime dan hitam, clean, high detail"><span class="quick-icon">${imageSvgIcon()}</span><span class="quick-text">Poster DATZON AI</span></button>
        <button class="quick-card" type="button" data-prompt="Buatkan wallpaper anime kota Jepang malam hari, lampu neon, hujan tipis, aesthetic"><span class="quick-icon">${imageSvgIcon()}</span><span class="quick-text">Wallpaper Jepang</span></button>
        <button class="quick-card" type="button" data-prompt="Buatkan logo maskot robot lucu untuk brand AI, warna lime, background gelap"><span class="quick-icon">${imageSvgIcon()}</span><span class="quick-text">Maskot robot AI</span></button>
      </div>`;
    }
    function imageModelMenuHTML(){
      const active = imageProviderId();
      const row = (id, label, desc) => `<button class="menu-row ${active === id ? 'active' : ''}" type="button" data-image-provider="${id}"><span class="grow">${label}<small>${desc}</small></span><span class="menu-check">${active === id ? icons.check : ''}</span></button>`;
      return `<div class="menu-title">Provider gambar</div>
      ${row('pollination', 'Pollination', 'Public image API, tanpa API key.')}
      ${row('huggingface', 'Hugging Face', 'Butuh API token untuk text-to-image.')}`;
    }
    function updateImageComposerLabels(){
      if(!imagePageActive) return;
      const style = IMAGE_STYLES.find(x => x.id === selectedImageStyle) || IMAGE_STYLES[0];
      const res = IMAGE_RESOLUTIONS.find(x => x.id === selectedImageResolution) || IMAGE_RESOLUTIONS[1] || IMAGE_RESOLUTIONS[0];
      if(attachBtn) attachBtn.innerHTML = `${imageSvgIcon()}<span class="image-control-text">${style.label}</span>`;
      if(styleLabel) styleLabel.textContent = res.label;
      if(styleBtn){
        styleBtn.title = 'Kualitas gambar';
        styleBtn.setAttribute('aria-label','Pilih kualitas gambar');
      }
      if(promptEl) promptEl.placeholder = uiText('Tulis prompt gambar...');
    }
    function renderImageRatioMenu(){
      if(!imageRatioMenu){
        imageRatioMenu = document.createElement('div');
        imageRatioMenu.id = 'imageRatioMenu';
        imageRatioMenu.className = 'floating-menu image-choice-menu';
        imageRatioMenu.setAttribute('aria-hidden','true');
        document.body.appendChild(imageRatioMenu);
        imageRatioMenu.addEventListener('click', e => {
          const row = e.target.closest('[data-image-style]');
          if(!row) return;
          selectedImageStyle = row.dataset.imageStyle || 'auto';
          updateImageComposerLabels();
          renderImageRatioMenu();
          closeAnchoredMenu(imageRatioMenu);
        });
      }
      imageRatioMenu.innerHTML = `<div class="menu-title">Gaya gambar</div>` + IMAGE_STYLES.map(item => `
        <button class="menu-row ${item.id === selectedImageStyle ? 'active' : ''}" type="button" data-image-style="${encodeAttr(item.id)}">
          <span class="grow">${escapeHtml(item.label)}<small>${escapeHtml(item.desc)}</small></span><span class="menu-check">${item.id === selectedImageStyle ? icons.check : ''}</span>
        </button>`).join('');
      return imageRatioMenu;
    }
    function toggleImageRatioMenu(){
      const menu = renderImageRatioMenu();
      menu.classList.contains('show') ? closeAnchoredMenu(menu) : openAnchoredMenu(menu, attachBtn, 'left');
    }
    function restoreChatShell({clear=false}={}){
      ensureChatUiCache();
      imagePageActive = false;
      document.body.classList.remove('image-page');
      document.body.removeAttribute('data-dz-tool');
      if(modelMenu && chatUiCache.modelMenuHTML) { modelMenu.innerHTML = chatUiCache.modelMenuHTML; rebuildModelMenu?.(); }
      if(attachBtn && chatUiCache.attachHTML) attachBtn.innerHTML = chatUiCache.attachHTML;
      if(styleLabel) styleLabel.textContent = selectedStyle;
      if(promptEl) promptEl.placeholder = uiText(chatUiCache.placeholder || 'Tanya apa saja...');
      renderStyles?.();
      updateModelLabel?.();
      closeAnchoredMenu(imageRatioMenu);
      if(clear){
        chatLog.innerHTML = '';
        promptEl.value = '';
        hasStartedChat = false;
        currentChatRegistered = false;
        currentChatId = null;
        activeChatFiles = [];
        document.body.classList.add('home-mode');
        document.body.classList.remove('chat-started');
        if(heroEl){ heroEl.innerHTML = chatUiCache.heroHTML; heroEl.hidden = false; heroEl.classList.remove('hero-exit'); }
      }
      updateComposerSpace?.();
    }
    function openImagePage(){
      ensureChatUiCache();
      saveCurrentChat?.();
      imagePageActive = true;
      document.body.classList.add('image-page','home-mode');
      document.body.classList.remove('chat-started');
      document.body.dataset.dzTool = 'image';
      hasStartedChat = false;
      currentChatRegistered = false;
      currentChatId = null;
      activeChatFiles = [];
      uploadedFiles.forEach(item => { try{ URL.revokeObjectURL(item.url); }catch(e){} });
      uploadedFiles = [];
      renderAttachments?.();
      chatLog.innerHTML = '';
      promptEl.value = '';
      autoGrow?.();
      if(heroEl){ heroEl.innerHTML = imageHeroHTML(); heroEl.hidden = false; heroEl.classList.remove('hero-exit'); }
      if(modelMenu) modelMenu.innerHTML = imageModelMenuHTML();
      updateImageComposerLabels();
      renderStyles?.();
      updateModelLabel?.();
      closeAllFloatingMenus?.();
      setTimeout(() => promptEl?.blur(), 40);
      updateComposerSpace?.();
      showMiniToast?.('Mode Gambar AI aktif.');
    }
    function resetImageConversation(){
      if(!imagePageActive) return;
      chatLog.innerHTML = '';
      promptEl.value = '';
      autoGrow?.();
      hasStartedChat = false;
      currentChatRegistered = false;
      currentChatId = null;
      document.body.classList.add('home-mode');
      document.body.classList.remove('chat-started');
      if(heroEl){ heroEl.hidden = false; heroEl.classList.remove('hero-exit'); }
      window.scrollTo({top:0, behavior:'smooth'});
    }
    function pickImageRatio(){
      selectedImageRatio = '1:1';
      return '1:1';
    }
    function imageRatioNumbers(ratio){
      const [rw, rh] = String(ratio || '1:1').split(':').map(Number);
      return (rw > 0 && rh > 0) ? [rw, rh] : [1, 1];
    }
    function currentImageQuality(){
      return IMAGE_RESOLUTIONS.find(x => x.id === selectedImageResolution) || IMAGE_RESOLUTIONS[1] || IMAGE_RESOLUTIONS[0];
    }
    function computeImageSize(){
      const ratio = pickImageRatio();
      const quality = currentImageQuality();
      const longSide = Number(quality.pixels) || 1024;
      const [rw, rh] = imageRatioNumbers(ratio);
      let width = longSide;
      let height = longSide;
      if(rw >= rh){ width = longSide; height = Math.round(longSide * rh / rw); }
      else { height = longSide; width = Math.round(longSide * rw / rh); }
      width = Math.max(512, Math.min(1536, Math.round(width / 8) * 8));
      height = Math.max(512, Math.min(1536, Math.round(height / 8) * 8));
      return {width, height, ratio, quality};
    }
    function antiStretchPrompt(prompt, size){
      const style = IMAGE_STYLES.find(x => x.id === selectedImageStyle) || IMAGE_STYLES[0];
      const styleText = style?.prompt ? `. ${style.prompt}` : '';
      return `${String(prompt || '').trim().replace(/\s+/g,' ')}. square 1:1 composition${styleText}. Do not stretch, do not distort, natural proportions, high quality.`;
    }
    function buildPollinationsImageUrl(prompt){
      const size = computeImageSize();
      imageSeedCounter += 1;
      const seed = Math.floor(Date.now() + Math.random() * 900000 + imageSeedCounter * 97);
      const params = new URLSearchParams({
        width:String(size.width),
        height:String(size.height),
        seed:String(seed),
        nologo:'true',
        private:'true',
        safe:'true',
        enhance:'true',
        cb:String(seed)
      });
      const cleanPrompt = antiStretchPrompt(prompt, size);
      return {
        url:`https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?${params.toString()}`,
        seed,
        provider:'Pollination',
        sourceType:'url',
        ...size
      };
    }
    function preloadImage(url, timeout=65000){
      return new Promise((resolve, reject) => {
        const img = new Image();
        let done = false;
        const finish = (ok, value) => {
          if(done) return;
          done = true;
          clearTimeout(timer);
          ok ? resolve(value) : reject(value);
        };
        const timer = setTimeout(() => finish(false, new Error('timeout')), timeout);
        img.onload = () => finish(true, img);
        img.onerror = () => finish(false, new Error('image-load-failed'));
        img.referrerPolicy = 'no-referrer';
        img.src = url;
      });
    }
    async function fetchHuggingFaceImage(prompt){
      const token = huggingFaceToken();
      if(!token){
        const err = new Error('hf-missing-key');
        err.code = 'HF_MISSING_KEY';
        throw err;
      }
      const size = computeImageSize();
      imageSeedCounter += 1;
      const seed = Math.floor(Date.now() + Math.random() * 900000 + imageSeedCounter * 97);
      const model = window.DATZON_HUGGINGFACE_IMAGE_MODEL || localStorage.getItem('datzonHuggingFaceImageModel') || 'stabilityai/stable-diffusion-xl-base-1.0';
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(new Error('timeout')), 95000);
      try{
        const hfModelPath = String(model).split('/').map(encodeURIComponent).join('/');
        const res = await fetch(`https://api-inference.huggingface.co/models/${hfModelPath}`, {
          method:'POST',
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
            'Accept':'image/png'
          },
          body:JSON.stringify({
            inputs:antiStretchPrompt(prompt, size),
            parameters:{
              width:size.width,
              height:size.height,
              num_inference_steps:size.quality?.steps || 24,
              guidance_scale:7.5,
              seed
            },
            options:{wait_for_model:true}
          }),
          signal:controller.signal
        });
        const type = (res.headers.get('content-type') || '').toLowerCase();
        if(!res.ok){
          let message = `HTTP ${res.status}`;
          if(type.includes('json')){
            const data = await res.json().catch(() => ({}));
            message = data.error || data.message || message;
          }
          const err = new Error(message);
          err.status = res.status;
          throw err;
        }
        const blob = await res.blob();
        if(!blob.type.toLowerCase().startsWith('image/')) throw new Error('hf-non-image-response');
        const url = URL.createObjectURL(blob);
        return {url, blobUrl:url, seed, provider:'Hugging Face', model, sourceType:'blob', ...size};
      }finally{
        clearTimeout(timer);
      }
    }
    async function buildImageResult(prompt){
      let data;
      if(imageProviderId() === 'huggingface') data = await fetchHuggingFaceImage(prompt);
      else{
        data = buildPollinationsImageUrl(prompt);
        await preloadImage(data.url);
      }
      // Setelah gambar berhasil dibuat, simpan salinan permanen ke Cloudinary preset gambarai.
      // Kalau Cloudinary gagal, hasil tetap tampil dari provider agar fitur generate tidak mati.
      data = await uploadGeneratedImageToCloudinary(data, prompt);
      return data;
    }
    function imageToolsHTML(){
      return `<div class="ai-tools image-tools">
        <button class="tool-btn" type="button" data-action="download-image" title="Download gambar">${downloadSvgIcon()}</button>
        <button class="tool-btn" type="button" data-action="like" title="Suka"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3m0 11V10l5-8 1 1a4 4 0 0 1 1 4l-.7 3H20a2 2 0 0 1 2 2.3l-1.3 7A3 3 0 0 1 17.8 22H7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="tool-btn" type="button" data-action="dislike" title="Tidak suka"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3m0-11v12l-5 8-1-1a4 4 0 0 1-1-4l.7-3H4a2 2 0 0 1-2-2.3l1.3-7A3 3 0 0 1 6.2 2H17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="tool-btn" type="button" data-action="share" title="Bagikan"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/><path d="M8.65 10.65 15.35 6.35M8.65 13.35l6.7 4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
        <button class="tool-btn source-btn" type="button" data-action="source" title="Lihat sumber"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>Sumber</button>
      </div><div class="source-note">Sumber: Provider gambar DATZON.</div>`;
    }
    function addImageThinkingMessage(){
      const msg = document.createElement('div');
      msg.className = 'msg ai image-ai-msg typing-msg';
      msg.innerHTML = `<div class="avatar ai">${icons.bot}</div><div class="ai-stack image-ai-stack"><div class="bubble image-bubble image-loading-bubble"><div class="image-gen-loader">${imageLogoHTML('image-loading-logo')}<b>DATZON lagi generate gambar</b><small>${imageProviderLabel()} sedang memproses prompt...</small></div></div>${imageToolsHTML()}</div>`;
      chatLog.appendChild(msg);
      if(autoFollowAI) ensureElementVisible(msg, 'smooth');
      return msg;
    }
    function renderImageResultMessage(msg, data, prompt){
      const bubble = msg.querySelector('.bubble');
      const source = msg.querySelector('.source-note');
      const tools = msg.querySelector('.ai-tools');
      const [rw, rh] = [1, 1];
      msg.classList.remove('typing-msg');
      const displayUrl = imageDisplayUrl(data);
      msg.dataset.imageUrl = displayUrl;
      msg.dataset.imagePrompt = prompt;
      msg.dataset.imageProvider = data.provider || imageProviderLabel();
      msg.dataset.imageMeta = JSON.stringify({url:displayUrl, originalUrl:data.originalUrl || data.url || '', cloudUrl:data.cloudUrl || '', cloudPublicId:data.cloudPublicId || '', cloudName:data.cloudName || cloudinaryConfig('generatedImage').cloudName || '', deleteToken:data.deleteToken || '', cloudBytes:data.cloudBytes || data.bytes || 0, prompt, provider:data.provider, ratio:data.ratio, width:data.width, height:data.height, seed:data.seed, model:data.model || '', sourceType:data.cloudUrl ? 'cloudinary' : (data.sourceType || 'url'), savedToCloudinary:!!data.savedToCloudinary, cloudUploadError:data.cloudUploadError || ''});
      bubble.classList.remove('image-loading-bubble');
      bubble.dataset.rawText = displayUrl;
      bubble.innerHTML = `<div class="image-result-card" style="--image-aspect:${rw}/${rh};--image-bg:url('${encodeAttr(displayUrl)}')" data-ratio="${encodeAttr(data.ratio)}" data-size="${encodeAttr(data.width + '×' + data.height)}" data-seed="${encodeAttr(data.seed)}"><img class="image-result-bg" src="${encodeAttr(displayUrl)}" alt="" aria-hidden="true" referrerpolicy="no-referrer"><img class="image-result-main" src="${encodeAttr(displayUrl)}" alt="${encodeAttr(prompt)}" loading="eager" decoding="async" referrerpolicy="no-referrer"></div>`;
      if(source) source.textContent = `Sumber: ${data.provider || imageProviderLabel()} • ${data.width}×${data.height} • ${data.ratio}${data.model ? ' • ' + data.model : ''}${data.savedToCloudinary ? ' • tersimpan Cloudinary' : ''}`;
      tools?.classList.add('show');
      if(autoFollowAI) ensureElementVisible(msg, 'smooth');
    }
    function openGeneratedImageViewer(card){
      const msg = card?.closest?.('.msg');
      const url = msg?.dataset?.imageUrl || card?.querySelector?.('.image-result-main')?.src || '';
      const prompt = msg?.dataset?.imagePrompt || card?.querySelector?.('.image-result-main')?.alt || 'Hasil gambar AI';
      if(!url) return;
      viewerTitle.textContent = 'Hasil Gambar AI';
      viewerBody.innerHTML = `<img class="viewer-image-full" src="${encodeAttr(url)}" alt="${encodeAttr(prompt)}" referrerpolicy="no-referrer">`;
      viewer.classList.add('show','image-fullscreen');
      viewer.style.zIndex = '10090';
    }

    function addStoredImageResult(data={}){
      const msg = document.createElement('div');
      msg.className = 'msg ai image-ai-msg';
      msg.innerHTML = `<div class="avatar ai">${icons.bot}</div><div class="ai-stack image-ai-stack"><div class="bubble image-bubble"></div>${imageToolsHTML()}</div>`;
      chatLog.appendChild(msg);
      const clean = {...data, url:imageDisplayUrl(data), provider:data.provider || 'Pollination', ratio:data.ratio || '1:1', width:data.width || 1024, height:data.height || 1024, seed:data.seed || '', sourceType:data.sourceType || (data.cloudUrl ? 'cloudinary' : 'url')};
      renderImageResultMessage(msg, clean, data.prompt || 'Gambar AI DATZON');
      return msg;
    }

    function imageErrorText(err){
      const provider = imageProviderLabel();
      if(err?.code === 'HF_MISSING_KEY') return 'Hugging Face belum punya API key. Isi token di window.DATZON_HUGGINGFACE_TOKEN atau localStorage key datzonHuggingFaceApiKey, lalu coba generate lagi.';
      if(provider === 'Hugging Face') return 'Hugging Face lagi error, token kosong/salah, model sedang loading, atau limit free tier sedang penuh. Coba lagi nanti atau pindah ke Pollination.';
      return 'Pollination lagi sibuk atau error. Coba generate ulang dengan prompt yang sama, nanti DATZON pakai seed baru supaya hasilnya beda.';
    }
    function renderImageErrorMessage(msg, err){
      const bubble = msg?.querySelector?.('.bubble');
      const source = msg?.querySelector?.('.source-note');
      if(!bubble) return;
      msg.classList.remove('typing-msg');
      bubble.classList.remove('image-loading-bubble');
      bubble.dataset.rawText = imageErrorText(err);
      renderBubbleContent(bubble, bubble.dataset.rawText);
      if(source) source.textContent = `Sumber: ${imageProviderLabel()} gagal memproses gambar.`;
      msg.querySelector('.ai-tools')?.classList.add('show');
    }
    function limitExceededCopy(type='image'){
      const label = type === 'image' ? 'Gambar AI' : 'Chat AI';
      return `Limit request untuk ${label} kamu sudah habis untuk sesi 12 jam ini. Kamu bisa tunggu reset otomatis, atau dapatkan limit request tambahan lewat Register Pengguna Baru dan Check in Harian.`;
    }
    function renderLimitExceededMessage(msg, type='image'){
      const bubble = msg?.querySelector?.('.bubble');
      const source = msg?.querySelector?.('.source-note');
      if(!bubble) return;
      const label = type === 'image' ? 'Gambar AI' : 'Chat AI';
      const text = limitExceededCopy(type);
      msg.classList.remove('typing-msg');
      bubble.classList.remove('typing-bubble','image-loading-bubble');
      bubble.classList.add('system-ui-bubble');
      bubble.dataset.rawText = text;
      bubble.innerHTML = `<div class="limit-bubble-notice"><b>Limit ${escapeHtml(label)} sudah habis</b><p>${escapeHtml(text)}</p><div class="limit-bubble-actions"><button type="button" data-limit-go="register">Register Pengguna Baru →</button><button type="button" data-limit-go="checkin">Check in Harian →</button></div></div>`;
      if(source) source.textContent = `Sumber: Sistem limit request DATZON • reset ${formatLimitReset(getLimitState().resetAt - Date.now())}`;
      msg.querySelector('.ai-tools')?.classList.add('show');
      uiApplySoon(msg);
      if(autoFollowAI) ensureElementVisible(msg, 'smooth');
    }
    async function downloadImageFromStack(stack, btn){
      const msg = stack?.closest('.msg');
      const url = msg?.dataset.imageUrl || stack?.querySelector('.image-result-main')?.src || '';
      if(!url){ showMiniToast?.('Gambar belum tersedia untuk di-download.'); return; }
      let meta = {};
      try{ meta = JSON.parse(msg?.dataset?.imageMeta || '{}') || {}; }catch(e){ meta = {}; }
      const filename = `datzon-ai-image-${Date.now()}.png`;
      const triggerDownload = href => {
        const a = document.createElement('a');
        a.href = href;
        a.download = filename;
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
        btn?.classList.add('active');
        setTimeout(() => btn?.classList.remove('active'), 900);
      };
      try{
        const isCloudinary = /res\.cloudinary\.com|cloudinary/i.test(url) || meta.sourceType === 'cloudinary' || meta.cloudUrl;
        if(/^blob:/i.test(url) || meta.sourceType === 'blob' || isCloudinary){
          const res = await fetch(url, {mode:'cors'});
          const blob = await res.blob();
          if(!blob.type || !blob.type.toLowerCase().startsWith('image/')) throw new Error('download-non-image');
          const objectUrl = URL.createObjectURL(blob);
          triggerDownload(objectUrl);
          setTimeout(() => URL.revokeObjectURL(objectUrl), 2200);
          return;
        }
        // Kalau belum sempat tersimpan ke Cloudinary, langsung buka URL provider publik.
        // Pollination kadang membalas JSON ketika di-fetch via JS, jadi jangan dipaksa fetch.
        triggerDownload(url);
      }catch(e){
        console.warn('Download gambar gagal, buka tab baru:', e);
        window.open(url, '_blank', 'noopener');
      }
    }
    async function sendImageMessage(){
      if(isListening){ stopMic(); return; }
      if(isSending) return;
      const text = promptEl.value.trim();
      if(!text){
        composerCard.classList.remove('shake'); void composerCard.offsetWidth; composerCard.classList.add('shake');
        return;
      }
      startChatMode();
      addMessage('user', text, []);
      promptEl.value = '';
      autoGrow?.();
      if(isLimitExceeded('image')){
        setLoading(true);
        const typingMsg = addImageThinkingMessage();
        if(!isFullyVisible(typingMsg)) beginAutoFollow(typingMsg);
        await sleep(3000);
        setLoading(false);
        renderLimitExceededMessage(typingMsg, 'image');
        registerRecentChat(text, []);
        saveCurrentChat();
        renderRecentChats();
        renderLimitRequestUi();
        return;
      }
      trackGuestLimitRequest('image');
      setLoading(true);
      const typingMsg = addImageThinkingMessage();
      if(!isFullyVisible(typingMsg)) beginAutoFollow(typingMsg);
      else autoFollowAI = false;
      try{
        const data = await buildImageResult(text);
        renderImageResultMessage(typingMsg, data, text);
      }catch(err){
        console.warn('Image generation failed:', err);
        renderImageErrorMessage(typingMsg, err);
      }finally{
        setLoading(false);
        autoFollowAI = false;
        registerRecentChat(text, []);
        saveCurrentChat();
        renderRecentChats();
        renderLimitRequestUi();
      }
    }

    function disableNativeSpellcheck(){
      document.querySelectorAll('textarea,input').forEach(el => {
        el.setAttribute('spellcheck','false');
        el.setAttribute('autocomplete', el.getAttribute('autocomplete') || 'off');
        el.setAttribute('autocorrect','off');
        el.setAttribute('autocapitalize','off');
      });
    }
    disableNativeSpellcheck();
    ['focus','input'].forEach(ev => document.addEventListener(ev, () => disableNativeSpellcheck(), true));

    function encodeAttr(str){
      return String(str || '').replace(/[&<>'"]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[tag]));
    }
    function normalizeLang(lang){
      const l = String(lang || '').trim().toLowerCase();
      if(!l) return 'kode';
      if(l === 'js') return 'javascript';
      if(l === 'ts') return 'typescript';
      if(l === 'py') return 'python';
      return l.replace(/[^a-z0-9#+.-]/g,'').slice(0,24) || 'kode';
    }
    function looksLikeCode(text){
      const t = String(text || '').trim();
      if(!t) return false;
      if(/^Mode\s*:/i.test(t) || /^Model\s*:/i.test(t) || /^Sumber\s*:/i.test(t)) return false;
      return /<!doctype|<html[\s>]|<script[\s>]|<style[\s>]|function\s+\w+\s*\(|const\s+\w+\s*=|let\s+\w+\s*=|class\s+\w+|@media\s*\(|body\s*\{|\.\w+[\w-]*\s*\{|npm\s+|import\s+.+from\s+|=>\s*\{|document\.|window\.|<\/?(div|section|main|header|footer|nav|button|input|form|canvas|svg|path|p|h[1-6])\b/i.test(t);
    }
    function isStrongCodeLang(lang){
      const l = normalizeLang(lang);
      return ['html','css','javascript','typescript','jsx','tsx','php','python','json','xml','bash','shell','sh','sql','java','c','cpp','csharp','go','rust','dart','yaml','yml','scss','sass','vue','svelte'].includes(l);
    }
    function shouldRenderCodeCard(lang, code){
      const l = normalizeLang(lang);
      const t = String(code || '').trim();
      if(!t) return false;
      if(/^Mode\s*:/i.test(t) || /^Model\s*:/i.test(t) || /^Sumber\s*:/i.test(t)) return false;
      if(['text','txt','plain','plaintext'].includes(l)) return looksLikeCode(t) && t.split('\n').length >= 2;
      if(l === 'struktur') return /[├└│─]/.test(t) || /^[\w.-]+\/\s*$/m.test(t);
      if(isStrongCodeLang(l)) return true;
      if(l === 'kode'){
        if(!looksLikeCode(t)) return false;
        const lines = t.split('\n').filter(x => x.trim());
        const signals = [
          /<!doctype|<html\b|<head\b|<body\b|<style\b|<script\b/i,
          /\b(const|let|var|function|class|import|export|document\.|window\.)\b/i,
          /(^|\n)\s*([.#]?[-_a-zA-Z][\w-]*|body|html|:root)\s*\{/i,
          /[{};]/,
          /<\/?[a-z][^>]*>/i
        ].filter(rx => rx.test(t)).length;
        return lines.length >= 2 && signals >= 2;
      }
      return looksLikeCode(t) && t.split('\n').length >= 3;
    }
    function shouldRenderLooseCodeCard(lang, code){
      const t = String(code || '').trim();
      if(!shouldRenderCodeCard(lang, t)) return false;
      const lines = t.split('\n').filter(x => x.trim());
      if(lines.length >= 2) return true;
      if(/<!doctype|<html\b|<head\b|<body\b|<style\b|<script\b/i.test(t)) return true;
      if(/[{};]/.test(t) && /\b(const|let|var|function|class|document\.|window\.)\b/i.test(t)) return true;
      return false;
    }
    function inferCodeLang(code, fallback='kode'){
      const t = String(code || '').trim();
      if(/<!doctype|<html\b|<body\b|<head\b|<section\b|<div\b|<script\b|<style\b/i.test(t)) return 'html';
      if(/<\?php|\bnamespace\s+[^;]+;|\becho\s+/i.test(t)) return 'php';
      if(/\b(import|export|const|let|var|function|class|document\.|window\.|addEventListener)\b/i.test(t)) return 'javascript';
      if(/(^|\n)\s*(body|html|:root|\.[\w-]+|#[\w-]+)\s*\{|@media\b/i.test(t)) return 'css';
      if(/(^|\n)\s*(from\s+\w+\s+import|def\s+\w+\(|class\s+\w+\(|print\()/i.test(t)) return 'python';
      if(/[├└│─]/.test(t)) return 'struktur';
      return fallback || 'kode';
    }
    function inlineMarkdown(str){
      let html = escapeHtml(str || '');
      // bold dulu. Jangan sampai bintang-bintang nongol kayak semut CSS.
      html = html.replace(/\*\*([^*\n][\s\S]*?[^*\n])\*\*/g, '<strong>$1</strong>');
      html = html.replace(/__([^_\n][\s\S]*?[^_\n])__/g, '<strong>$1</strong>');
      // italic single-star tetap dirender, bukan dipajang mentah.
      html = html.replace(/(^|[\s(\[{])\*([^*\n][^*\n]*?[^*\n])\*(?=[\s).,!?:;\]}]|$)/g, '$1<em>$2</em>');
      html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
      html = html.replace(/\*\*/g, '').replace(/__/g, '').replace(/\*/g, '');
      return html;
    }
    function renderTextMarkdown(text){
      const src = String(text || '').replace(/\r\n/g,'\n').trim();
      if(!src) return '';
      const lines = src.split('\n');
      let html = '';
      let para = [];
      let list = [];
      const flushPara = () => {
        if(!para.length) return;
        html += `<p>${inlineMarkdown(para.join(' '))}</p>`;
        para = [];
      };
      const flushList = () => {
        if(!list.length) return;
        html += `<ul>${list.map(x => `<li>${inlineMarkdown(x)}</li>`).join('')}</ul>`;
        list = [];
      };
      lines.forEach(rawLine => {
        const line = rawLine.trim();
        if(!line){ flushPara(); flushList(); return; }
        if(/^[-*_]{3,}$/.test(line)){ flushPara(); flushList(); html += '<hr class="md-divider">'; return; }
        const head = line.match(/^(#{1,4})\s+(.+)$/);
        if(head){ flushPara(); flushList(); const level = Math.min(4, head[1].length + 2); html += `<h${level}>${inlineMarkdown(head[2])}</h${level}>`; return; }
        const bullet = line.match(/^[-*•]\s+(.+)$/) || line.match(/^\d+[.)]\s+(.+)$/);
        if(bullet){ flushPara(); list.push(bullet[1]); return; }
        flushList();
        para.push(line);
      });
      flushPara(); flushList();
      return html;
    }
    function renderCodeBlock(lang, code, stableId=''){
      const cleanCode = String(code || '').replace(/^\n+|\n+$/g,'');
      const language = normalizeLang(inferCodeLang(cleanCode, lang || 'kode'));
      const id = stableId ? `code_${encodeAttr(stableId)}` : `code_${Date.now().toString(36)}_${++codeBlockSeq}`;
      codeBlockStore.set(id, {lang:language, code:cleanCode});
      const lines = cleanCode.split('\n');
      const shown = lines.slice(0, 10).join('\n');
      const hasMore = lines.length > 10 || cleanCode.length > shown.length + 80;
      const liveClass = renderStreamingCode ? ' is-streaming' : '';
      const liveLoader = renderStreamingCode ? '<span class="code-live-loader" aria-label="Kode sedang ditulis"></span>' : '';
      return `<div class="code-card${liveClass}" data-code-id="${encodeAttr(id)}">
        <div class="code-card-head">
          <span class="code-lang">${escapeHtml(language.toUpperCase())}</span>
          ${liveLoader}
          <div class="code-actions-mini">
            <button type="button" data-code-action="copy" data-code-id="${encodeAttr(id)}">Salin</button>
            <button type="button" data-code-action="view" data-code-id="${encodeAttr(id)}">Lihat kode</button>
            <button type="button" class="code-preview-btn" data-code-action="preview" data-code-id="${encodeAttr(id)}">Pratinjau</button>
          </div>
        </div>
        <pre><code>${escapeHtml(shown)}</code></pre>
        ${hasMore ? '<div class="code-fade"></div><button type="button" class="code-expand-btn" data-code-action="view" data-code-id="'+encodeAttr(id)+'">Lihat semua kode</button>' : ''}
      </div>`;
    }
    function isLikelyCodeLine(line){
      const t = String(line || '').trim();
      if(!t) return false;
      if(/^Mode\s*:/i.test(t) || /^Model\s*:/i.test(t) || /^Sumber\s*:/i.test(t)) return false;
      if(/^[│├└─]/.test(t)) return true;
      if(/^[\w.-]+\/$/.test(t) && !/\s/.test(t)) return true;
      if(/^(<!DOCTYPE|<html\b|<head\b|<body\b|<style\b|<script\b|<section\b|<div\b|<nav\b|<header\b|<footer\b|<main\b|<\?php|<!--|<\/[a-z])/i.test(t)) return true;
      if(/^<\w+[\s>]/.test(t) && /<\/?[a-z][^>]*>/i.test(t)) return true;
      if(/^(const|let|var|function|class|import|export|return|if|for|while|switch|try|catch|async|await)\b/.test(t)) return true;
      if(/^([.#]?[-_a-zA-Z][\w-]*|body|html|:root)\s*\{/.test(t)) return true;
      if(/^[}\]);,]+$/.test(t)) return true;
      if(/^--[\w-]+\s*:/.test(t)) return true;
      if(/^(margin|padding|display|position|inset|top|right|bottom|left|width|height|min-width|max-width|min-height|max-height|background|background-color|color|font|font-size|font-weight|line-height|border|border-radius|box-shadow|transform|transition|animation|opacity|z-index|overflow|text-align|align-items|justify-content|grid|flex|gap|object-fit|content)\s*:\s*[^;]+;?$/.test(t)) return true;
      if((t.match(/<\/?[a-z][^>]*>/gi) || []).length >= 2 && /[<>]/.test(t)) return true;
      return false;
    }
    function splitLooseCodeFromText(text){
      const src = String(text || '').replace(/\r\n/g,'\n');
      const lines = src.split('\n');
      const parts = [];
      let textBuf = [];
      let codeBuf = [];
      let inCode = false;
      const pushText = () => { if(textBuf.join('\n').trim()) parts.push({type:'text', value:textBuf.join('\n')}); textBuf = []; };
      const pushCode = () => {
        const joined = codeBuf.join('\n');
        if(joined.trim()){
          const lang = inferCodeLang(joined);
          if(shouldRenderLooseCodeCard(lang, joined)) parts.push({type:'code', lang, value:joined});
          else textBuf.push(joined);
        }
        codeBuf = [];
      };
      for(let i=0;i<lines.length;i++){
        const line = lines[i];
        const next = lines[i+1] || '';
        const treeStart = /^[\w.-]+\/$/.test(line.trim()) && /^[\s│├└─]/.test(next);
        const codeLine = isLikelyCodeLine(line) || treeStart;
        if(!inCode && codeLine){ pushText(); inCode = true; codeBuf.push(line); continue; }
        if(inCode){
          if(codeLine || !line.trim() || /^[\s│├└─]/.test(line) || /[;{}>]\s*$/.test(line.trim())){
            codeBuf.push(line); continue;
          }
          pushCode(); inCode = false; textBuf.push(line); continue;
        }
        textBuf.push(line);
      }
      if(inCode) pushCode(); else pushText();
      return parts;
    }
    function splitFencedMarkdown(raw){
      const src = String(raw || '').replace(/\r\n/g,'\n');
      const parts = [];
      let i = 0;
      while(i < src.length){
        const start = src.indexOf('```', i);
        if(start < 0){
          const rest = src.slice(i);
          splitLooseCodeFromText(rest).forEach(p => parts.push(p));
          break;
        }
        const before = src.slice(i, start);
        splitLooseCodeFromText(before).forEach(p => parts.push(p));
        let p = start + 3;
        let nl = src.indexOf('\n', p);
        if(nl < 0) nl = src.length;
        const header = src.slice(p, nl);
        const hm = header.match(/^\s*([a-zA-Z0-9#+.-]{0,24})\s*([\s\S]*)$/) || [];
        const lang = (hm[1] || 'kode').trim() || 'kode';
        const inline = (hm[2] || '').trim();
        const contentStart = nl < src.length ? nl + 1 : src.length;
        const close = src.indexOf('```', contentStart);
        let value = '';
        if(close < 0){
          value = (inline ? inline + (contentStart < src.length ? '\n' : '') : '') + src.slice(contentStart);
          parts.push(shouldRenderCodeCard(lang, value) ? {type:'code', lang, value} : {type:'text', value});
          i = src.length;
        }else{
          value = (inline ? inline + '\n' : '') + src.slice(contentStart, close);
          parts.push(shouldRenderCodeCard(lang, value) ? {type:'code', lang, value} : {type:'text', value});
          i = close + 3;
        }
      }
      return parts.filter(part => String(part.value || '').trim());
    }
    function renderAiMarkdown(text, scopeId=''){
      const parts = splitFencedMarkdown(text);
      return parts.map((part, idx) => (part.type === 'code' && shouldRenderCodeCard(part.lang, part.value)) ? renderCodeBlock(part.lang, part.value, scopeId ? `${scopeId}_${idx}` : '') : renderTextMarkdown(part.value)).join('');
    }
    function getRenderScope(bubble){
      if(!bubble) return '';
      if(!bubble.dataset.renderScope) bubble.dataset.renderScope = `b_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
      return bubble.dataset.renderScope;
    }
    function renderBubbleContent(bubble, text){
      if(!bubble) return;
      bubble.dataset.rawText = String(text || '');
      bubble.innerHTML = renderAiMarkdown(text, getRenderScope(bubble));
    }
    function ensureCodeViewer(){
      let modal = document.getElementById('codeViewerModal');
      if(modal) return modal;
      document.body.insertAdjacentHTML('beforeend', `<div class="code-viewer" id="codeViewerModal" aria-hidden="true">
        <div class="code-viewer-shell">
          <div class="code-viewer-head">
            <button class="code-viewer-close" type="button" data-code-close aria-label="Tutup">×</button>
            <div class="code-tabs" role="tablist">
              <button type="button" class="active" data-code-tab="code">Kode</button>
              <button type="button" data-code-tab="preview">Pratinjau</button>
            </div>
            <button class="code-viewer-copy" type="button" data-code-copy title="Salin"><svg width="23" height="23" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2"/><rect x="4" y="4" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2" opacity=".7"/></svg></button>
          </div>
          <div class="code-viewer-body">
            <pre class="full-code"><code id="fullCodeText"></code></pre>
            <iframe id="codePreviewFrame" title="Pratinjau kode"></iframe>
          </div>
        </div>
      </div>`);
      modal = document.getElementById('codeViewerModal');
      modal.addEventListener('click', e => {
        if(e.target === modal || e.target.closest('[data-code-close]')) closeCodeViewer();
        const tab = e.target.closest('[data-code-tab]');
        if(tab) setCodeViewerTab(tab.dataset.codeTab);
        if(e.target.closest('[data-code-copy]')){
          const id = modal.dataset.codeId;
          const item = codeBlockStore.get(id);
          copyText(item?.code || '', e.target.closest('[data-code-copy]'));
        }
      });
      return modal;
    }
    function buildPreviewSrc(lang, code){
      const l = normalizeLang(lang);
      const c = String(code || '');
      if(l === 'html' || /<!doctype|<html[\s>]/i.test(c)) return c;
      if(l === 'css') return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${c}</style></head><body><div class="preview-sample"><h1>Preview CSS</h1><p>Style CSS kamu jalan di halaman contoh ini.</p><button>Tombol contoh</button></div></body></html>`;
      if(l === 'javascript' || l === 'js') return `<!doctype html><html><body><pre id="out">Menjalankan JavaScript...</pre><script>const log=(...a)=>document.getElementById('out').textContent+=` + '`\\n`' + `+a.join(' '); try{${c}\n}catch(e){log('Error:', e.message);}<\/script></body></html>`;
      return `<!doctype html><html><body style="font-family:system-ui;background:#0b0714;color:#fff;padding:24px"><h2>Pratinjau tidak tersedia</h2><p>Jenis kode: ${escapeHtml(l)}. Klik tab Kode buat lihat semuanya.</p></body></html>`;
    }
    function setCodeViewerTab(tab){
      const modal = ensureCodeViewer();
      const active = tab === 'preview' ? 'preview' : 'code';
      modal.dataset.activeTab = active;
      modal.querySelectorAll('[data-code-tab]').forEach(b => b.classList.toggle('active', b.dataset.codeTab === active));
    }
    function openCodeViewer(id, tab='code'){
      const item = codeBlockStore.get(id);
      if(!item) return;
      const modal = ensureCodeViewer();
      modal.dataset.codeId = id;
      modal.querySelector('#fullCodeText').textContent = item.code;
      modal.querySelector('#codePreviewFrame').srcdoc = buildPreviewSrc(item.lang, item.code);
      setCodeViewerTab(tab);
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function closeCodeViewer(){
      const modal = document.getElementById('codeViewerModal');
      if(!modal) return;
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
      modal.querySelector('#codePreviewFrame').srcdoc = '';
      document.body.style.overflow = settingsPage?.classList.contains('show') ? 'hidden' : '';
    }
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-code-action]');
      if(!btn) return;
      const id = btn.dataset.codeId || btn.closest('.code-card')?.dataset.codeId;
      const item = codeBlockStore.get(id);
      if(!item) return;
      const action = btn.dataset.codeAction;
      if(action === 'copy') copyText(item.code, btn);
      if(action === 'view') openCodeViewer(id, 'code');
      if(action === 'preview') openCodeViewer(id, 'preview');
    });

    function escapeAttr(str){ return escapeHtml(str); }
    function providerTypeLabel(provider){ return provider === 'googleStudio' ? 'Google Studio' : provider === 'groq' ? 'Groq' : 'Mistral'; }
    function defaultEngineByProvider(provider){ return provider === 'googleStudio' ? 'Google Studio' : provider === 'groq' ? 'Groq' : 'Mistral'; }
    function providerDescByEngine(engine){ return engine === 'Groq' ? 'Kencang buat respons cepat.' : engine === 'Google Studio' ? 'Cocok kalau nanti pakai API key Gemini.' : 'Ringan buat chat dan teks.'; }
    let providerMenuCloseTimer = null;
    function clearProviderMenuCloseTimer(){
      if(providerMenuCloseTimer){
        clearTimeout(providerMenuCloseTimer);
        providerMenuCloseTimer = null;
      }
    }
    function providerToggleArrow(open, section=''){
      return `<span class="provider-toggle-arrow ${open ? 'open' : 'closed'}" ${section ? `data-provider-arrow-section="${escapeAttr(section)}"` : ''} aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
    }
    function sanitizeOwnApiKeyName(name=''){
      return String(name || '').trim().replace(/\s+/g, ' ').slice(0, 40) || 'Provider Custom';
    }
    function sanitizeOwnApiKeyProvider(provider='googleStudio'){
      const p = String(provider || '').trim();
      return ['googleStudio','mistral','groq'].includes(p) ? p : 'googleStudio';
    }
    function ownProviderId(item){ return `own:${String(item?.id || '').trim()}`; }
    function isOwnProviderValue(value=selectedEngine){ return String(value || '').startsWith('own:'); }
    function ownProviderByEngine(value=selectedEngine){
      const raw = String(value || '').trim();
      if(!raw.startsWith('own:')) return null;
      const id = raw.replace(/^own:/, '');
      let found = ownApiKeys.find(x => String(x.id) === id) || null;
      if(found) return found;
      if(selectedOwnApiKeySnapshot && String(selectedOwnApiKeySnapshot.id) === id) return normalizeOwnApiKeyItem(selectedOwnApiKeySnapshot);
      try{
        const local = JSON.parse(localStorage.getItem(OWN_API_KEYS_KEY) || '[]') || [];
        found = local.map(normalizeOwnApiKeyItem).find(x => String(x.id) === id) || null;
        if(found) return found;
      }catch(e){}
      return null;
    }
    function normalizeOwnApiKeyItem(item={}){
      const id = String(item.id || (crypto.randomUUID ? crypto.randomUUID() : `own-${Date.now()}-${Math.random()}`));
      const provider = sanitizeOwnApiKeyProvider(item.provider || 'googleStudio');
      const name = sanitizeOwnApiKeyName(item.name || `${providerTypeLabel(provider)} Custom`);
      const key = sanitizeApiKeyValue(item.key || '');
      const storage = item.storage === 'cloud' ? 'cloud' : 'local';
      return {id, provider, name, key, storage, createdAt:item.createdAt || new Date().toISOString(), updatedAt:item.updatedAt || new Date().toISOString()};
    }
    function readLocalOwnApiKeys(){
      try{
        const arr = JSON.parse(localStorage.getItem(OWN_API_KEYS_KEY) || '[]') || [];
        return arr.map(normalizeOwnApiKeyItem).filter(x => x.key && x.storage !== 'cloud');
      }catch(e){ return []; }
    }
    function saveLocalOwnApiKeys(){
      try{ localStorage.setItem(OWN_API_KEYS_KEY, JSON.stringify(ownApiKeys.filter(x => x.storage !== 'cloud'))); }catch(e){}
    }
    function mergeOwnApiKeys(...lists){
      const map = new Map();
      lists.flat().filter(Boolean).map(normalizeOwnApiKeyItem).forEach(item => {
        if(item.key) map.set(String(item.id), item);
      });
      return Array.from(map.values()).sort((a,b)=>String(a.name).localeCompare(String(b.name)));
    }
    async function fetchCloudOwnApiKeys(){
      if(!hasFirebase?.() || !uid?.()) return [];
      try{
        const snap = await fb.db.collection('users').doc(uid()).collection('ownApiKeys').limit(50).get();
        const arr = [];
        snap.forEach(doc => arr.push({id:doc.id, ...(doc.data() || {}), storage:'cloud'}));
        return arr.map(normalizeOwnApiKeyItem).filter(x => x.key);
      }catch(err){ console.warn('Load custom API keys gagal:', err); return []; }
    }
    async function refreshOwnApiKeysFromStorage(){
      const local = readLocalOwnApiKeys();
      const cloud = await fetchCloudOwnApiKeys();
      ownApiKeys = mergeOwnApiKeys(local, cloud);
      renderOwnApiKeyPage?.();
      updateModelLabel?.();
      return ownApiKeys;
    }
    async function saveOwnApiKeyToCloud(item){
      if(!hasFirebase?.() || !uid?.()) return false;
      const clean = normalizeOwnApiKeyItem({...item, storage:'cloud'});
      const ref = fb.db.collection('users').doc(uid()).collection('ownApiKeys').doc(firestoreId(clean.id));
      const exists = await docExists(ref);
      await ref.set({
        id:clean.id,
        ownerId:uid(),
        provider:clean.provider,
        name:clean.name,
        key:clean.key,
        storage:'cloud',
        ...(exists ? {} : {createdAt:fsNow()}),
        updatedAt:fsNow()
      }, {merge:true});
      return true;
    }
    async function deleteOwnApiKeyFromCloud(item){
      if(!hasFirebase?.() || !uid?.() || !item?.id) return false;
      await fb.db.collection('users').doc(uid()).collection('ownApiKeys').doc(firestoreId(item.id)).delete();
      return true;
    }
    function providerActiveIndexKey(provider){ return sanitizeOwnApiKeyProvider(provider); }
    function getProviderActiveIndex(provider, fallback=0){
      try{
        const obj = JSON.parse(localStorage.getItem(OWN_API_ACTIVE_KEY) || '{}') || {};
        const n = Number(obj[providerActiveIndexKey(provider)]);
        if(Number.isFinite(n)) return Math.max(0, Math.min(3, n));
      }catch(e){}
      return Math.max(0, Math.min(3, Number(fallback) || 0));
    }
    function setProviderActiveIndex(provider, index){
      try{
        const obj = JSON.parse(localStorage.getItem(OWN_API_ACTIVE_KEY) || '{}') || {};
        obj[providerActiveIndexKey(provider)] = Math.max(0, Math.min(3, Number(index) || 0));
        localStorage.setItem(OWN_API_ACTIVE_KEY, JSON.stringify(obj));
      }catch(e){}
    }
    function baseModelMenuRowsHTML(){
      const defaultEngines = ['Mistral','Groq','Google Studio'];
      if(defaultEngines.includes(selectedEngine)) lastDefaultEngine = selectedEngine;
      if(!defaultEngines.includes(lastDefaultEngine)) lastDefaultEngine = 'Mistral';
      const defaultRows = defaultProviderMenuOpen
        ? defaultEngines.map(engine => `<button class="menu-row provider-row default-provider-row ${selectedEngine === engine ? 'active' : ''}" type="button" data-engine="${escapeAttr(engine)}"><span class="grow">${escapeHtml(engine)}<small>${escapeHtml(providerDescByEngine(engine))}</small></span><span class="provider-row-right">${engine === lastDefaultEngine ? providerToggleArrow(true, 'default') : ''}</span></button>`).join('')
        : `<button class="menu-row provider-section-toggle ${defaultEngines.includes(selectedEngine) ? 'active' : ''}" type="button" data-toggle-provider-section="default"><span class="grow">${escapeHtml(lastDefaultEngine)}<small>${escapeHtml(providerDescByEngine(lastDefaultEngine))}</small></span><span class="provider-row-right">${providerToggleArrow(false, 'default')}</span></button>`;
      return `
    <div class="menu-title">Kecerdasan</div>
    <button class="menu-row" type="button" data-level="Instan"><span class="grow">Instan<small>Cepat, hemat kuota, jawaban pendek.</small></span><span class="menu-check"></span></button>
    <button class="menu-row" type="button" data-level="Sedang"><span class="grow">Sedang<small>Seimbang buat obrolan harian.</small></span><span class="menu-check"></span></button>
    <button class="menu-row" type="button" data-level="Tinggi"><span class="grow">Tinggi<small>Lebih detail, pura-pura paling pintar.</small></span><span class="menu-check"></span></button>
    <div class="menu-sep"></div>
    ${defaultRows}`;
    }
    function rebuildModelMenu(){
      if(!modelMenu || imagePageActive) return;
      const selectedOwn = ownProviderByEngine?.();
      const firstOwn = ownApiKeys[0] || null;
      const ownDisplay = selectedOwn || firstOwn;
      const ownRows = ownApiKeys.length ? `
    <div class="menu-sep"></div>
    ${ownProviderMenuOpen
      ? ownApiKeys.map(item => {
          const engine = ownProviderId(item);
          const active = String(selectedEngine || '') === engine;
          return `<button class="menu-row provider-row own-api-provider-row ${active ? 'active' : ''}" type="button" data-engine="${escapeAttr(engine)}"><span class="grow">${escapeHtml(sanitizeOwnApiKeyName(item.name))}<small>${escapeHtml(providerTypeLabel(item.provider))} pribadi • ${escapeHtml(item.storage === 'cloud' ? 'Firebase' : 'LocalStorage')}</small></span><span class="provider-row-right">${engine === ownProviderId(ownDisplay) ? providerToggleArrow(true, 'own') : ''}</span></button>`;
        }).join('')
      : `<button class="menu-row provider-section-toggle ${selectedOwn ? 'active' : ''}" type="button" data-toggle-provider-section="own"><span class="grow">${escapeHtml(sanitizeOwnApiKeyName(ownDisplay.name))}<small>${escapeHtml(providerTypeLabel(ownDisplay.provider))} pribadi • ${escapeHtml(ownDisplay.storage === 'cloud' ? 'Firebase' : 'LocalStorage')}</small></span><span class="provider-row-right">${providerToggleArrow(false, 'own')}</span></button>`}` : '';
      modelMenu.innerHTML = baseModelMenuRowsHTML() + ownRows;
      uiApplySoon(modelMenu);
    }
    function resetProviderMenuSections(){
      defaultProviderMenuOpen = false;
      ownProviderMenuOpen = false;
    }
    async function collapseProviderSectionsStepwise(delay=95){
      if(ownProviderMenuOpen){
        ownProviderMenuOpen = false;
        rebuildModelMenu();
        markModelMenuActiveState();
        await sleep(delay);
      }
      if(defaultProviderMenuOpen){
        defaultProviderMenuOpen = false;
        rebuildModelMenu();
        markModelMenuActiveState();
        await sleep(delay);
      }
    }
    async function closeModelMenuWithSectionCollapse(){
      if(!modelMenu?.classList?.contains('show')){
        resetProviderMenuSections();
        return;
      }
      if(modelMenuClosing) return;
      modelMenuClosing = true;
      try{
        await collapseProviderSectionsStepwise();
        resetProviderMenuSections();
        rebuildModelMenu();
        markModelMenuActiveState();
        closeAnchoredMenu(modelMenu);
      }finally{
        modelMenuClosing = false;
      }
    }
    function engineShort(){
      const own = ownProviderByEngine();
      if(own) return sanitizeOwnApiKeyName(own.name);
      return selectedEngine === 'Google Studio' ? 'Studio' : selectedEngine;
    }
    function markModelMenuActiveState(){
      if(!modelMenu) return;
      if(imagePageActive){
        $$('#modelMenu .menu-row').forEach(btn => {
          const active = btn.dataset.imageProvider === imageProviderId();
          btn.classList.toggle('active', active);
          const check = btn.querySelector('.menu-check');
          if(check) check.innerHTML = active ? icons.check : '';
        });
        return;
      }
      const selected = String(selectedEngine || '');
      const defaultEngines = ['Mistral','Groq','Google Studio'];
      $$('#modelMenu .menu-row').forEach(btn => {
        let active = (btn.dataset.level === selectedLevel) || (String(btn.dataset.engine || '') === selected);
        if(btn.dataset.toggleProviderSection === 'default') active = defaultEngines.includes(selected);
        if(btn.dataset.toggleProviderSection === 'own') active = isOwnProviderValue(selected);
        btn.classList.toggle('active', active);
        const check = btn.querySelector('.menu-check');
        if(check) check.innerHTML = '';
      });
    }
    function updateModelLabel(){
      if(imagePageActive){
        if(modelLabel) modelLabel.textContent = imageProviderLabel();
        markModelMenuActiveState();
        return;
      }
      rebuildModelMenu();
      if(modelLabel) modelLabel.textContent = `${engineShort()} ${selectedLevel}`;
      markModelMenuActiveState();
    }

    function closeProviderMenuWithSectionFold(){
      if(!modelMenu) return;
      clearProviderMenuCloseTimer();
      if(!modelMenu.classList.contains('show')){
        defaultProviderMenuOpen = false;
        ownProviderMenuOpen = false;
        rebuildModelMenu?.();
        return;
      }
      const steps = [];
      if(ownProviderMenuOpen){
        steps.push(() => {
          ownProviderMenuOpen = false;
          rebuildModelMenu();
          markModelMenuActiveState();
        });
      }
      if(defaultProviderMenuOpen){
        steps.push(() => {
          defaultProviderMenuOpen = false;
          rebuildModelMenu();
          markModelMenuActiveState();
        });
      }
      const finish = () => closeAnchoredMenu(modelMenu);
      if(!steps.length){
        finish();
        return;
      }
      let i = 0;
      const run = () => {
        if(i < steps.length){
          steps[i++]();
          providerMenuCloseTimer = setTimeout(run, 115);
        }else{
          providerMenuCloseTimer = null;
          finish();
        }
      };
      run();
    }

    function openAnchoredMenu(menu, button, align='right'){
      if(menu === modelMenu) clearProviderMenuCloseTimer();
      closeAllFloatingMenus(menu);
      floatingShield.classList.add('show');
      floatingShield.setAttribute('aria-hidden','false');
      menu.classList.add('show');
      menu.setAttribute('aria-hidden','false');
      button?.setAttribute('aria-expanded','true');
      menu.style.visibility = 'hidden';
      menu.style.left = '12px';
      menu.style.top = '12px';
      requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();
        const margin = 12;
        const gap = 8;
        let left = align === 'center' ? rect.left + rect.width / 2 - menuRect.width / 2 : rect.right - menuRect.width;
        left = Math.min(left, window.innerWidth - menuRect.width - margin);
        left = Math.max(margin, left);
        let top = rect.bottom + gap;
        if(top + menuRect.height > window.innerHeight - margin){
          top = rect.top - menuRect.height - gap;
        }
        top = Math.max(margin, Math.min(top, window.innerHeight - menuRect.height - margin));
        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;
        menu.style.visibility = '';
      });
    }
    function closeAnchoredMenu(menu){
      if(!menu) return;
      menu.classList.remove('show');
      menu.setAttribute('aria-hidden','true');
      menu.style.left = '';
      menu.style.top = '';
      if(menu === modelMenu){
        clearProviderMenuCloseTimer();
        defaultProviderMenuOpen = false;
        ownProviderMenuOpen = false;
        modelButton.setAttribute('aria-expanded','false');
        rebuildModelMenu?.();
      }
      if(menu === topChatMenu) topMoreBtn.setAttribute('aria-expanded','false');
      if(!document.querySelector('.floating-menu.show')){
        floatingShield.classList.remove('show');
        floatingShield.setAttribute('aria-hidden','true');
      }
    }
    function openMoreMenu(menu, button, stack=null){
      const portal = answerMenuPortal || menu;
      if(!portal || !button) return;
      closeAllFloatingMenus(portal);
      activeMoreStack = stack || button.closest('.ai-stack') || null;
      portal.classList.add('show');
      portal.setAttribute('aria-hidden','false');
      portal.style.visibility = 'hidden';
      portal.style.left = '12px';
      portal.style.top = '12px';
      portal.style.bottom = 'auto';
      portal.dataset.placement = 'bottom';

      requestAnimationFrame(() => {
        const margin = 12;
        const topSafe = 74;
        const gapRaw = getComputedStyle(document.documentElement).getPropertyValue('--answer-menu-gap').trim() || '8px';
        const xRaw = getComputedStyle(document.documentElement).getPropertyValue('--answer-menu-x-nudge').trim() || '0px';
        const yRaw = getComputedStyle(document.documentElement).getPropertyValue('--answer-menu-y-nudge').trim() || '10px';
        const gap = parseFloat(gapRaw) || 8;
        const xNudge = parseFloat(xRaw) || 0;
        const yNudge = parseFloat(yRaw) || 0;
        const rect = button.getBoundingClientRect();
        const menuRect = portal.getBoundingClientRect();
        const composerRect = composerCard.getBoundingClientRect();
        const bottomLimit = Math.min(window.innerHeight - margin, composerRect.top - margin);
        const availableBelow = bottomLimit - rect.bottom - gap;
        const availableAbove = rect.top - topSafe - gap;

        let left = rect.right - menuRect.width + xNudge;
        left = Math.max(margin, Math.min(left, window.innerWidth - menuRect.width - margin));

        let placement = 'bottom';
        let top;
        if(availableBelow >= menuRect.height || availableBelow > availableAbove){
          top = rect.bottom + gap + yNudge;
          placement = 'bottom';
        }else{
          top = rect.top - menuRect.height - gap - yNudge;
          placement = 'top';
        }

        if(top + menuRect.height > bottomLimit){
          top = bottomLimit - menuRect.height;
          placement = 'top';
        }
        if(top < topSafe){
          top = Math.min(rect.bottom + gap, bottomLimit - menuRect.height);
          placement = 'bottom';
        }

        top = Math.max(margin, Math.min(top, window.innerHeight - menuRect.height - margin));
        portal.style.left = `${left}px`;
        portal.style.top = `${top}px`;
        portal.style.visibility = '';
        portal.dataset.placement = placement;
      });
    }
    function closeMoreMenu(menu){
      const portal = menu || answerMenuPortal;
      if(!portal) return;
      portal.classList.remove('show');
      portal.style.left = '';
      portal.style.top = '';
      portal.style.bottom = '';
      portal.style.visibility = '';
      portal.setAttribute('aria-hidden','true');
      activeMoreStack = null;
    }
    function closeAllFloatingMenus(except=null){
      $$('.floating-menu.show').forEach(menu => { if(menu !== except) closeAnchoredMenu(menu); });
      $$('.more-menu.show').forEach(menu => { if(menu !== except) closeMoreMenu(menu); });
      if(answerMenuPortal?.classList.contains('show') && answerMenuPortal !== except) closeMoreMenu(answerMenuPortal);
      if(!except || (except !== modelMenu && except !== topChatMenu && except !== answerMenuPortal)) {
        floatingShield.classList.remove('show');
        floatingShield.setAttribute('aria-hidden','true');
      }
      if(except !== document.getElementById('sideChatMenuPortal')) closeSideChatMenu?.();
    }

    document.addEventListener('click', e => {
      const outsideFloating = !e.target.closest('.floating-menu, .more-menu, .answer-menu-portal, #modelButton, #topMoreBtn, [data-action="more"], .style-wrap');
      if(outsideFloating){
        if(modelMenu?.classList.contains('show')){
          closeAllFloatingMenus(modelMenu);
          closeProviderMenuWithSectionFold();
        }else{
          closeAllFloatingMenus();
        }
      }
      if(!e.target.closest('.style-wrap')) toggleStyleMenu(false);
    });

    modelButton.addEventListener('click', e => {
      e.stopPropagation();
      if(!imagePageActive){
        rebuildModelMenu();
        markModelMenuActiveState();
      }
      modelMenu.classList.contains('show') ? closeProviderMenuWithSectionFold() : openAnchoredMenu(modelMenu, modelButton, 'center');
    });
    modelMenu.addEventListener('click', e => {
      const arrow = e.target.closest('.provider-toggle-arrow');
      if(arrow?.dataset?.providerArrowSection){
        e.preventDefault();
        e.stopPropagation();
        if(arrow.dataset.providerArrowSection === 'default') defaultProviderMenuOpen = !defaultProviderMenuOpen;
        if(arrow.dataset.providerArrowSection === 'own') ownProviderMenuOpen = !ownProviderMenuOpen;
        rebuildModelMenu();
        markModelMenuActiveState();
        return;
      }
      const row = e.target.closest('.menu-row');
      if(!row) return;
      if(imagePageActive){
        if(row.dataset.imageProvider) selectedImageProvider = row.dataset.imageProvider === 'huggingface' ? 'Hugging Face' : 'Pollination';
        if(modelMenu) modelMenu.innerHTML = imageModelMenuHTML();
        updateModelLabel();
        closeAnchoredMenu(modelMenu);
        return;
      }
      if(row.dataset.toggleProviderSection){
        if(row.dataset.toggleProviderSection === 'default') defaultProviderMenuOpen = !defaultProviderMenuOpen;
        if(row.dataset.toggleProviderSection === 'own') ownProviderMenuOpen = !ownProviderMenuOpen;
        rebuildModelMenu();
        markModelMenuActiveState();
        return;
      }
      if(row.dataset.level) selectedLevel = row.dataset.level;
      if(row.dataset.engine){
        selectedEngine = row.dataset.engine;
        if(['Mistral','Groq','Google Studio'].includes(selectedEngine)) lastDefaultEngine = selectedEngine;
        selectedOwnApiKeySnapshot = isOwnProviderValue(selectedEngine) ? ownProviderByEngine(selectedEngine) : null;
      }
      updateModelLabel();
      resetProviderMenuSections();
      rebuildModelMenu();
      markModelMenuActiveState();
      closeAnchoredMenu(modelMenu);
    });

    tempBtn.addEventListener('click', () => toggleTemporaryMode());
    function toggleTemporaryMode(force){
      temporaryMode = typeof force === 'boolean' ? force : !temporaryMode;
      document.body.classList.toggle('temporary-mode', temporaryMode);
      tempBtn.classList.toggle('active', temporaryMode);
    }

    topMoreBtn.addEventListener('click', e => {
      e.stopPropagation();
      updateTopMenuTitle();
      updateTopMenuChecks();
      topChatMenu.classList.contains('show') ? closeAnchoredMenu(topChatMenu) : openAnchoredMenu(topChatMenu, topMoreBtn, 'right');
    });
    topChatMenu.addEventListener('click', e => {
      const row = e.target.closest('[data-top-action]');
      if(!row) return;
      const action = row.dataset.topAction;
      if(action === 'temporary') toggleTemporaryModeForChat();
      if(action === 'delete') showDeleteChatConfirm();
      if(action === 'files') showUploadedFilesPanel();
      if(action === 'export') exportCurrentChat();
      if(action === 'share') shareCurrentChatLink();
      if(action === 'pin') togglePinCurrentChat();
      if(action === 'search') openChatSearch();
      closeAnchoredMenu(topChatMenu);
    });

    sidebarBtn.addEventListener('click', () => openSidebar());
    sideClose.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if(sidebar.classList.contains('search-open')) closeSidebarSearch();
      else closeSidebar();
    });
    sidebarBackdrop.addEventListener('click', () => closeSidebar());
    sideSearchBtn.addEventListener('click', () => openSidebarSearch());
    function clearSidebarSearchText(){
      if(!sideSearchInput) return;
      sideSearchInput.value = '';
      recentFilter = '';
      updateSideSearchClear();
      renderRecentChats();
      requestAnimationFrame(() => sideSearchInput.focus({preventScroll:true}));
    }
    sideSearchClear?.addEventListener('pointerdown', e => {
      e.preventDefault();
      e.stopPropagation();
      clearSidebarSearchText();
    }, {capture:true});
    sideSearchClear?.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      clearSidebarSearchText();
    }, {capture:true});
    function updateSideSearchClear(){
      sideSearchClear?.classList.toggle('has-text', !!(sideSearchInput?.value || '').trim());
    }
    function openSidebar(){
      const waitAccount = window.DATZON_WAIT_ACCOUNT_READY;
      if(typeof waitAccount === 'function' && !document.body.classList.contains('datzon-account-ready') && !sidebar.dataset.waitingAccount){
        sidebar.dataset.waitingAccount = '1';
        showMiniToast?.('Menyiapkan Firebase...');
        waitAccount(4200).finally(() => {
          delete sidebar.dataset.waitingAccount;
          applyProfileState?.();
          document.body.classList.add('sidebar-open');
          sidebar.classList.add('show');
          sidebarBackdrop.classList.add('show');
          sidebar.setAttribute('aria-hidden','false');
        });
        return;
      }
      document.body.classList.add('sidebar-open');
      sidebar.classList.add('show');
      sidebarBackdrop.classList.add('show');
      sidebar.setAttribute('aria-hidden','false');
    }
    function closeSidebar(){
      closeSideChatMenu?.();
      closeSidebarSearch();
      document.body.classList.remove('sidebar-open');
      sidebar.classList.remove('show');
      sidebarBackdrop.classList.remove('show');
      sidebar.setAttribute('aria-hidden','true');
    }
    function openSidebarSearch(){sidebar.classList.add('search-open'); sideSearchPanel.setAttribute('aria-hidden','false'); updateSideSearchClear(); setTimeout(() => sideSearchInput?.focus(), 140);}
    function closeSidebarSearch(){sidebar.classList.remove('search-open'); sideSearchPanel.setAttribute('aria-hidden','true'); if(sideSearchInput){sideSearchInput.value=''; recentFilter=''; updateSideSearchClear(); renderRecentChats();}}
    function openSettingsPage(){
      closeSidebar();
      settingsPage?.classList.add('show');
      settingsPage?.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      settingsPage?.scrollTo({top:0, behavior:'auto'});
    }
    function closeSettingsPage(){
      settingsPage?.classList.remove('show');
      settingsPage?.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
    settingsBack?.addEventListener('click', closeSettingsPage);
    settingsPage?.addEventListener('click', e => {
      if(e.target.closest('#settingsBack')) closeSettingsPage();
    });
    sideProfileCard?.addEventListener('click', e => {
      if(e.target.closest('.side-gear')) openSettingsPage();
    });

    sidebar.addEventListener('click', e => {
      const chatMenuBtn = e.target.closest('[data-side-chat-menu]');
      if(chatMenuBtn){
        e.preventDefault();
        e.stopPropagation();
        openSideChatMenu(chatMenuBtn.dataset.sideChatMenu, chatMenuBtn);
        return;
      }
      const chatBtn = e.target.closest('.side-chat');
      if(chatBtn){ loadStoredChat(chatBtn.dataset.chatId); closeSideChatMenu(); closeSidebar(); return; }
      const btn = e.target.closest('[data-side]');
      if(!btn) return;
      const a = btn.dataset.side;
      if(a === 'chat'){
        restoreChatShell({clear:true});
        promptEl?.blur();
        closeSideChatMenu();
        closeSidebar();
        return;
      }
      if(a === 'image'){
        openImagePage();
        closeSideChatMenu();
        closeSidebar();
        return;
      }
      if(a === 'new') resetChat();
      if(a === 'temporary') toggleTemporaryMode();
      if(a === 'files') openMediaLibraryPage();
      if(a === 'clear') chatLog.innerHTML = '';
      if(a === 'settings') openSettingsPage();
      if(a === 'notes'){ openSettingsPageV10 ? openSettingsPageV10() : openSettingsPage(); openSettingsView('notes'); renderNotesPage(); }
      if(['writer','summary','codex'].includes(a) && imagePageActive) restoreChatShell({clear:true});
      if(a === 'writer') promptEl.value = 'Bantu tuliskan copywriting singkat untuk produk digital DATZON.';
      if(a === 'summary') promptEl.value = 'Ringkas teks panjang berikut menjadi satu paragraf yang jelas.';
      if(a === 'codex') promptEl.value = 'Buat contoh kode HTML sederhana untuk komponen website.';
      if(['writer','summary','codex'].includes(a)){ autoGrow(); setTimeout(() => promptEl?.blur(), 40); }
      closeSideChatMenu();
      closeSidebar();
    });


    if(sideSearchInput){
      sideSearchInput.addEventListener('input', () => {
        recentFilter = sideSearchInput.value.trim().toLowerCase();
        updateSideSearchClear();
        renderRecentChats();
      });
      sideSearchInput.addEventListener('search', () => {
        recentFilter = sideSearchInput.value.trim().toLowerCase();
        updateSideSearchClear();
        renderRecentChats();
      });
    }

    function makeChatTitle(text, files=[]){
      const q = String(text || '').trim().toLowerCase();
      if(/^(halo|halow|hai|hello|helo|hi)\b/.test(q)) return 'Manusia menyapa AI DATZON';
      if(files.length && !q) return `Upload ${files.length} file ke DATZON AI`;
      if(q.includes('ringkas') || q.includes('summarize')) return 'Ringkasan teks dengan DATZON AI';
      if(q.includes('email') || q.includes('customer')) return 'Balasan customer DATZON';
      if(q.includes('fitur')) return 'Membahas fitur DATZON AI';
      if(q.includes('siapa') || q.includes('bikin')) return 'Profil pembuat DATZON';
      const clean = String(text || 'Obrolan DATZON AI').replace(/\s+/g,' ').trim();
      return clean.length > 34 ? clean.slice(0, 34).trim() + '…' : clean;
    }
    function registerRecentChat(text, files=[]){
      const title = makeChatTitle(text, files);
      currentChatRegistered = true;
      currentChatId = ensureCurrentChatId();
      mergeChatFiles(files);
      const existingItem = getChatById(currentChatId) || {};
      const existing = chatHistory.filter(item => String(item.id) !== String(currentChatId));
      const item = {
        ...existingItem,
        id: currentChatId,
        title: existingItem.title || title,
        createdAt: existingItem.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: collectChatMessages(),
        files: activeChatFiles,
        temporary: temporaryMode || existingItem.temporary || false,
        expiresAt: (temporaryMode || existingItem.temporary) ? (existingItem.expiresAt || new Date(Date.now()+86400000).toISOString()) : '',
        pinned: !!existingItem.pinned
      };
      chatHistory = [item, ...existing].slice(0, 24);
      saveChatsToStorage();
      renderRecentChats();
      syncAddressToChat(currentChatId);
    }
    function renderRecentChats(){
      if(!recentChatsEl || !recentEmptyEl) return;
      const now = Date.now();
      chatHistory = chatHistory.filter(item => !item.temporary || !item.expiresAt || new Date(item.expiresAt).getTime() > now);
      const list = chatHistory
        .filter(item => item.title.toLowerCase().includes(recentFilter))
        .sort((a,b) => (b.pinned?1:0) - (a.pinned?1:0) || new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
      recentEmptyEl.style.display = chatHistory.length ? 'none' : '';
      recentChatsEl.innerHTML = list.map(item => {
        const active = String(item.id) === String(currentChatId);
        const pinSvg = '<svg class="pin-mini" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="m14 4 6 6-4 1-4 7-2-2-4 4-2-2 4-4-2-2 7-4 1-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
        const moreSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h.01M12 12h.01M19 12h.01" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>';
        return `<button class="side-chat ${item.pinned?'pinned':''} ${active?'active current':''}" type="button" data-chat-id="${encodeAttr(item.id)}" data-chat-title="${encodeAttr(item.title)}">${item.pinned ? pinSvg : ''}<span class="side-chat-title">${highlightTitle(item.title, recentFilter)}</span><span class="side-chat-more" role="button" tabindex="0" data-side-chat-menu="${encodeAttr(item.id)}" aria-label="Menu obrolan">${moreSvg}</span></button>`;
      }).join('');
      if(chatHistory.length && !list.length){
        recentChatsEl.innerHTML = '<div class="side-empty">Obrolan yang dicari nggak ketemu. Hebat, bahkan riwayat pun bisa ghosting.</div>';
      }
    }
    function highlightTitle(title, q){
      const safe = escapeHtml(title);
      if(!q) return safe;
      const idx = title.toLowerCase().indexOf(q);
      if(idx < 0) return safe;
      return escapeHtml(title.slice(0, idx)) + '<mark>' + escapeHtml(title.slice(idx, idx + q.length)) + '</mark>' + escapeHtml(title.slice(idx + q.length));
    }


    function closeSideChatMenu(){
      const menu = document.getElementById('sideChatMenuPortal');
      if(menu){ menu.classList.remove('show'); menu.setAttribute('aria-hidden','true'); }
      const shield = document.getElementById('sideChatMenuShield');
      if(shield){ shield.classList.remove('show'); shield.setAttribute('aria-hidden','true'); }
    }
    function openSideChatMenu(id, anchor){
      const item = getChatById(id);
      if(!item) return;
      let menu = document.getElementById('sideChatMenuPortal');
      if(!menu){
        menu = document.createElement('div');
        menu.id = 'sideChatMenuPortal';
        menu.className = 'side-chat-menu-portal';
        menu.setAttribute('aria-hidden','true');
        document.body.appendChild(menu);
        menu.addEventListener('click', e => {
          const btn = e.target.closest('[data-side-chat-action]');
          if(!btn) return;
          e.preventDefault();
          e.stopPropagation();
          const chatId = menu.dataset.chatId;
          handleSideChatAction(chatId, btn.dataset.sideChatAction);
        });
      }
      let shield = document.getElementById('sideChatMenuShield');
      if(!shield){
        shield = document.createElement('div');
        shield.id = 'sideChatMenuShield';
        shield.className = 'side-chat-menu-shield';
        shield.setAttribute('aria-hidden','true');
        document.body.appendChild(shield);
        ['pointerdown','mousedown','touchstart','click'].forEach(type => {
          shield.addEventListener(type, ev => {
            ev.preventDefault();
            ev.stopPropagation();
            if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
            closeSideChatMenu();
          }, true);
        });
      }
      const rect = anchor.getBoundingClientRect();
      const top = Math.min(window.innerHeight - 190, Math.max(78, rect.bottom + 8));
      const left = Math.min(window.innerWidth - 238, Math.max(12, rect.right - 220));
      menu.dataset.chatId = String(id);
      menu.style.top = `${top}px`;
      menu.style.left = `${left}px`;
      menu.innerHTML = `
        <button type="button" data-side-chat-action="pin"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m14 4 6 6-4 1-4 7-2-2-4 4-2-2 4-4-2-2 7-4 1-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>${item.pinned ? 'Lepas sematan' : 'Sematkan'}</button>
        <button type="button" data-side-chat-action="rename"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 20h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>Ganti nama</button>
        <button type="button" class="danger" data-side-chat-action="delete"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Hapus</button>
      `;
      floatingShield.classList.add('show');
      floatingShield.setAttribute('aria-hidden','false');
      menu.classList.add('show');
      menu.setAttribute('aria-hidden','false');
    }
    function handleSideChatAction(id, action){
      const item = getChatById(id);
      if(!item) return closeSideChatMenu();
      if(action === 'pin'){
        item.pinned = !item.pinned;
        saveChatsToStorage();
        renderRecentChats();
        closeSideChatMenu();
        showMiniToast(item.pinned ? 'Obrolan disematkan.' : 'Sematan dilepas.');
        return;
      }
      if(action === 'rename'){
        closeSideChatMenu();
        const current = item.title || 'Obrolan DATZON AI';
        showRenameChatModal(id, current);
        return;
      }
      if(action === 'delete'){
        closeSideChatMenu();
        showDeleteChatConfirmForId(id);
      }
    }
    function showRenameChatModal(id, currentTitle){
      showCustomModal('Ganti nama obrolan', `<input class="modal-input" id="renameChatInput" value="${encodeAttr(currentTitle)}" maxlength="60" placeholder="Judul obrolan" />`, [
        {label:'Batal', action:'cancel'},
        {label:'Simpan', action:'save'}
      ], action => {
        if(action !== 'save') return;
        const input = document.getElementById('renameChatInput');
        const val = (input?.value || '').trim().replace(/\s+/g,' ').slice(0,60);
        if(!val){ showMiniToast('Judulnya isi dulu. Obrolan tanpa nama itu kayak warung tanpa papan.'); return; }
        const chat = getChatById(id);
        if(chat){ chat.title = val; chat.updatedAt = new Date().toISOString(); saveChatsToStorage(); renderRecentChats(); updateTopMenuTitle(); showMiniToast('Judul obrolan diganti.'); }
      });
      setTimeout(() => document.getElementById('renameChatInput')?.focus(), 120);
    }
    function showDeleteChatConfirmForId(id){
      const item = getChatById(id);
      showCustomModal('Hapus obrolan?', `<p class="modal-muted">${escapeHtml(item?.title || 'Obrolan ini')} bakal hilang permanen. Manusia memang suka tombol bahaya.</p>`, [
        {label:'Batal', action:'cancel'},
        {label:'Hapus', action:'delete', danger:true}
      ], async action => {
        if(action !== 'delete') return;
        chatHistory = chatHistory.filter(x => String(x.id) !== String(id));
        saveChatsToStorage();
        if(hasFirebase() && uid()){
          try{ await fb.db.collection('users').doc(uid()).collection('chats').doc(String(id)).delete(); }catch(e){}
        }
        if(String(currentChatId) === String(id)) resetChat();
        renderRecentChats();
        showMiniToast('Obrolan dihapus.');
      });
    }

    document.addEventListener('click', e => {
      const menu = document.getElementById('sideChatMenuPortal');
      if(!menu?.classList.contains('show')) return;
      if(e.target.closest('#sideChatMenuPortal,[data-side-chat-menu]')) return;
      closeSideChatMenu();
    }, true);

    function shortChatId(){
      const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let out = 'ob';
      const bytes = new Uint8Array(7);
      try{ crypto.getRandomValues(bytes); }
      catch(e){ for(let i=0;i<bytes.length;i++) bytes[i] = Math.floor(Math.random()*255); }
      bytes.forEach(b => out += alphabet[b % alphabet.length]);
      return out;
    }
    function ensureCurrentChatId(){
      if(!currentChatId) currentChatId = shortChatId();
      return String(currentChatId);
    }
    function getChatById(id=currentChatId){ return chatHistory.find(x => String(x.id) === String(id)); }
    function chatDeepLink(id=currentChatId){
      const cleanId = encodeURIComponent(String(id || ensureCurrentChatId()));
      const base = (location.origin && location.origin !== 'null') ? location.origin : 'https://datzon.vercel.app';
      let path = location.pathname || '/';
      path = path.replace(/index\.html$/i, '').replace(/obr\.id:[^/]+$/i, '').replace(/\/$/, '');
      if(!path || path === '/') path = '/aidatzon';
      return `${base}${path}/obr.id:${cleanId}`;
    }
    function syncAddressToChat(id=currentChatId){
      if(!id || !history.replaceState) return;
      try{ history.replaceState({chatId:id}, '', chatDeepLink(id)); }catch(e){}
    }
    function chatIdFromUrl(){
      const all = `${location.pathname || ''}${location.hash || ''}${location.search || ''}`;
      const m = all.match(/obr\.id[:=]([a-z0-9_-]+)/i);
      return m ? decodeURIComponent(m[1]) : '';
    }
    function updateTopMenuTitle(){
      const titleEl = $('#topChatMenuTitle');
      if(!titleEl) return;
      const item = getChatById();
      const title = item?.title || makeChatTitle(lastUserText || '') || 'Obrolan DATZON AI';
      titleEl.textContent = title;
    }
    function updateTopMenuChecks(){
      const item = getChatById();
      const pinRow = topChatMenu?.querySelector('[data-top-action="pin"]');
      const tmpRow = topChatMenu?.querySelector('[data-top-action="temporary"]');
      const expRow = topChatMenu?.querySelector('[data-top-action="export"]');
      if(expRow) expRow.lastChild.nodeValue = ' Ekspor Chat';
      [pinRow,tmpRow].forEach(row => {
        if(!row) return;
        row.querySelector('.menu-check-lite')?.remove();
      });
      if(pinRow && item?.pinned) pinRow.insertAdjacentHTML('beforeend','<span class="menu-check-lite">✓</span>');
      if(tmpRow && (temporaryMode || item?.temporary)) tmpRow.insertAdjacentHTML('beforeend','<span class="menu-check-lite">✓</span>');
    }
    function fileMetaFromSnapshots(files=[]){
      return serializeChatFiles(files).map(x => ({...x, url: x.cloudUrl || x.url || ''}));
    }
    function mergeChatFiles(files=[]){
      const metas = fileMetaFromSnapshots(files).filter(f => f.cloudUrl || (f.url && !/^blob:/i.test(f.url)));
      if(!metas.length) return;
      const seen = new Set();
      activeChatFiles = [...activeChatFiles, ...metas].filter(f => {
        const key = f.cloudPublicId || f.cloudUrl || f.url || f.id;
        if(seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(-80);
    }
    async function shareCurrentChatLink(){
      const id = ensureCurrentChatId();
      syncAddressToChat(id);
      const url = chatDeepLink(id);
      try{
        if(navigator.share) await navigator.share({title:'Obrolan DATZON AI', text:'Bagikan obrolan DATZON AI', url});
        else await navigator.clipboard?.writeText(url);
        showMiniToast('Link obrolan disalin/dibagikan.');
      }catch(e){
        try{ await navigator.clipboard?.writeText(url); showMiniToast('Link obrolan disalin.'); }catch(_){ showMiniToast(url); }
      }
    }
    function togglePinCurrentChat(){
      const id = ensureCurrentChatId();
      let item = getChatById(id);
      if(!item){
        item = {id, title:'Obrolan DATZON AI', createdAt:new Date().toISOString(), messages:collectChatMessages(), files:activeChatFiles, pinned:false};
        chatHistory.unshift(item);
      }
      item.pinned = !item.pinned;
      saveChatsToStorage();
      renderRecentChats();
      showMiniToast(item.pinned ? 'Obrolan disematkan.' : 'Sematan dibatalkan.');
    }
    function toggleTemporaryModeForChat(){
      toggleTemporaryMode();
      const id = currentChatId || (currentChatRegistered ? ensureCurrentChatId() : null);
      if(id){
        let item = getChatById(id);
        if(item){ item.temporary = temporaryMode; item.expiresAt = temporaryMode ? new Date(Date.now()+86400000).toISOString() : ''; saveChatsToStorage(); renderRecentChats(); }
      }
      showMiniToast(temporaryMode ? 'Mode sementara 24 jam aktif.' : 'Mode sementara mati.');
    }
    function uploadedFileCardHTML(f, index=0){
      const name = f?.name || `file-${index+1}`;
      const type = f?.type || 'file';
      const size = Number(f?.size) || 0;
      const url = f?.cloudUrl || f?.secure_url || f?.url || f?.previewUrl || '';
      const isImage = /^image\//i.test(type) || /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(name);
      const thumb = isImage && url
        ? `<img src="${encodeAttr(url)}" alt="${encodeAttr(name)}" loading="lazy" decoding="async">`
        : `<span class="uploaded-file-icon">${/zip|rar|7z/i.test(type) || /\.(zip|rar|7z)$/i.test(name) ? icons.file : (/pdf/i.test(type) || /\.pdf$/i.test(name) ? icons.pdf : icons.file)}</span>`;
      const info = isImage ? '' : `<b>${escapeHtml(name)}</b><small>${escapeHtml(type || 'file')} • ${formatBytes(size)}</small>`;
      return `<button class="uploaded-file-tile ${isImage ? 'is-image' : 'is-doc'}" type="button" data-modal-file="${encodeAttr(f.id || name)}" data-file-url="${encodeAttr(url)}" data-file-name="${encodeAttr(name)}" data-file-type="${encodeAttr(type)}" data-file-size="${encodeAttr(size)}" title="${encodeAttr(name)}"><span>${thumb}</span>${info}</button>`;
    }
    function chatMediaKey(f={}){
      return String(f.cloudPublicId || f.cloudUrl || f.url || f.previewUrl || f.id || f.name || Math.random()).trim();
    }
    function normalizeChatMediaFile(raw={}, index=0){
      const url = raw.cloudUrl || raw.secure_url || raw.url || raw.previewUrl || raw.originalUrl || '';
      const generated = raw.kind === 'generatedImage' || raw.source === 'generated-image' || raw.prompt;
      const name = raw.name || raw.filename || (generated ? `Gambar AI ${index+1}.png` : `file-${index+1}`);
      const type = raw.type || raw.mimeType || (generated || /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(name) ? 'image/png' : guessMimeFromName(name));
      return {
        ...raw,
        id: raw.id || chatMediaKey({...raw, url, name}),
        name,
        type,
        size: Number(raw.size || raw.bytes || raw.cloudBytes || 0) || 0,
        url,
        previewUrl: url,
        cloudUrl: raw.cloudUrl || raw.secure_url || (/^blob:/i.test(url) ? '' : url),
        kind: generated ? 'generatedImage' : (raw.kind || (/^image\//i.test(type) ? 'imageAttach' : 'fileAttach')),
        at: raw.at || raw.uploadedAt || raw.createdAt || ''
      };
    }
    function collectCurrentChatMediaFiles(){
      const map = new Map();
      const push = raw => {
        if(!raw) return;
        const f = normalizeChatMediaFile(raw, map.size);
        if(!f.url && !f.name) return;
        const key = chatMediaKey(f);
        if(!map.has(key)) map.set(key, f);
      };
      const item = getChatById();
      (item?.files || []).forEach(push);
      (item?.messages || []).forEach(m => {
        (m.files || []).forEach(push);
        if(m.imageMeta) push({...m.imageMeta, kind:'generatedImage', type:'image/png', source:'generated-image'});
      });
      if(currentChatRegistered){
        try{
          collectChatMessages().forEach(m => {
            (m.files || []).forEach(push);
            if(m.imageMeta) push({...m.imageMeta, kind:'generatedImage', type:'image/png', source:'generated-image'});
          });
        }catch(e){}
      }
      (activeChatFiles || []).forEach(push);
      return Array.from(map.values()).sort((a,b) => mediaTimeValue(b) - mediaTimeValue(a));
    }
    function showUploadedFilesPanel(){
      const files = collectCurrentChatMediaFiles();
      const countText = `${files.filter(f => /^image\//i.test(f.type || '') || f.kind === 'generatedImage').length} gambar • ${files.filter(f => !(/^image\//i.test(f.type || '') || f.kind === 'generatedImage')).length} file di obrolan ini`;
      const body = `<button class="chat-files-close-x" type="button" data-modal-action="cancel" aria-label="Tutup">×</button><p class="modal-muted chat-files-note">${escapeHtml(countText)}. Ini khusus obrolan yang sedang dibuka, bukan semua akun.</p>` + (files.length ? `<div class="uploaded-files-grid-modal chat-files-grid-modal">${files.map(uploadedFileCardHTML).join('')}</div>` : '<p class="modal-muted">Belum ada gambar atau file di obrolan ini.</p>');
      showCustomModal('Gambar & File obrolan', body, [{label:'Tutup', action:'cancel'}]);
      requestAnimationFrame(() => {
        document.querySelectorAll('#customActionModal [data-modal-file]').forEach(btn => {
          btn.addEventListener('click', () => openSentFilePreview(btn), {once:false});
        });
      });
    }

    function mediaAssetUrl(asset={}){
      return asset.cloudUrl || asset.secure_url || asset.url || asset.previewUrl || asset.originalUrl || '';
    }
    function mediaAssetName(asset={}, index=0){
      return asset.name || asset.filename || asset.cloudPublicId || asset.public_id || (asset.kind === 'generatedImage' ? `gambar-ai-${index+1}.png` : `file-${index+1}`);
    }
    function mediaAssetType(asset={}){
      const name = mediaAssetName(asset);
      return asset.type || asset.mimeType || (/\.pdf$/i.test(name) ? 'application/pdf' : (/\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(name) ? 'image/*' : 'file'));
    }
    function isMediaImage(asset={}){
      const type = mediaAssetType(asset);
      const name = mediaAssetName(asset);
      return asset.kind === 'generatedImage' || /^image\//i.test(type) || /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(name);
    }
    function mediaAssetSourceLabel(asset={}){
      const src = String(asset.source || asset.kind || '').toLowerCase();
      if(src.includes('generated')) return 'Gambar AI';
      if(src.includes('chat')) return 'Obrolan AI';
      if(src.includes('local')) return 'Preview lokal';
      return isMediaImage(asset) ? 'Gambar' : 'File';
    }
    function mediaTimeValue(asset={}){
      const raw = asset.at || asset.uploadedAt || asset.createdAt || asset.updatedAt || '';
      if(typeof raw === 'number') return raw;
      if(raw && typeof raw.toDate === 'function') return raw.toDate().getTime();
      const t = Date.parse(String(raw || ''));
      return Number.isFinite(t) ? t : 0;
    }
    function mediaAssetCardHTML(asset={}, index=0){
      const name = mediaAssetName(asset, index);
      const type = mediaAssetType(asset);
      const url = mediaAssetUrl(asset);
      const bytes = Number(asset.bytes || asset.cloudBytes || asset.size || 0) || 0;
      const image = isMediaImage(asset);
      const label = mediaAssetSourceLabel(asset);
      const thumb = image && url
        ? `<img src="${encodeAttr(url)}" alt="${encodeAttr(name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`
        : `<span class="media-file-icon">${/pdf/i.test(type) || /\.pdf$/i.test(name) ? icons.pdf : icons.file}</span>`;
      return `<button class="media-asset-card ${image ? 'is-image' : 'is-file'}" type="button" data-media-open data-file-url="${encodeAttr(url)}" data-file-name="${encodeAttr(name)}" data-file-type="${encodeAttr(type)}" data-file-size="${encodeAttr(bytes)}" title="${encodeAttr(name)}">
        <span class="media-thumb">${thumb}</span>
        <span class="media-info"><b>${escapeHtml(name)}</b><small>${escapeHtml(label)}${bytes ? ' • ' + formatBytes(bytes) : ''}</small></span>
      </button>`;
    }
    function ensureMediaLibraryPage(){
      let page = document.getElementById('mediaLibraryPage');
      if(page) return page;
      document.body.insertAdjacentHTML('beforeend', `<section class="media-library-page" id="mediaLibraryPage" aria-hidden="true">
        <div class="media-library-shell">
          <header class="media-library-head">
            <button class="media-back" type="button" data-media-close aria-label="Kembali">‹</button>
            <div><h2>Gambar &amp; File</h2><p id="mediaLibrarySub">Semua gambar, file obrolan, dan gambar AI yang tersimpan.</p></div>
          </header>
          <div class="media-tabs" aria-label="Filter media">
            <button class="active" type="button" data-media-filter="all">Semua</button>
            <button type="button" data-media-filter="image">Gambar</button>
            <button type="button" data-media-filter="file">File</button>
          </div>
          <div class="media-library-grid" id="mediaLibraryGrid"></div>
          <div class="media-library-empty" id="mediaLibraryEmpty" hidden>Belum ada gambar atau file yang tersimpan. Upload lewat Attach atau generate gambar AI dulu.</div>
        </div>
      </section>`);
      page = document.getElementById('mediaLibraryPage');
      page._filter = 'all';
      page.addEventListener('click', e => {
        if(e.target.closest('[data-media-close]')){ closeMediaLibraryPage(); return; }
        const filterBtn = e.target.closest('[data-media-filter]');
        if(filterBtn){
          page._filter = filterBtn.dataset.mediaFilter || 'all';
          page.querySelectorAll('[data-media-filter]').forEach(b => b.classList.toggle('active', b === filterBtn));
          renderMediaLibraryPage();
          return;
        }
        const openBtn = e.target.closest('[data-media-open]');
        if(openBtn) openMediaAssetPreview(openBtn);
      });
      return page;
    }
    function renderMediaLibraryPage(){
      const page = ensureMediaLibraryPage();
      const grid = page.querySelector('#mediaLibraryGrid');
      const empty = page.querySelector('#mediaLibraryEmpty');
      const sub = page.querySelector('#mediaLibrarySub');
      const query = '';
      const filter = page._filter || 'all';
      let assets = collectStorageAssets()
        .filter(a => a && a.kind !== 'profile')
        .filter(a => mediaAssetUrl(a) || mediaAssetName(a))
        .sort((a,b) => mediaTimeValue(b) - mediaTimeValue(a));
      if(filter === 'image') assets = assets.filter(isMediaImage);
      if(filter === 'file') assets = assets.filter(a => !isMediaImage(a));
      grid.innerHTML = assets.map(mediaAssetCardHTML).join('');
      if(empty) empty.hidden = assets.length > 0;
      if(sub){
        const allAssets = collectStorageAssets().filter(a => a && a.kind !== 'profile');
        const imgCount = allAssets.filter(isMediaImage).length;
        const fileCount = Math.max(0, allAssets.length - imgCount);
        sub.textContent = `${imgCount} gambar • ${fileCount} file tersimpan dari obrolan dan Gambar AI.`;
      }
    }
    function openMediaLibraryPage(){
      closeSidebar?.();
      closeSideChatMenu?.();
      closeAnchoredMenu?.(topChatMenu);
      const page = ensureMediaLibraryPage();
      renderMediaLibraryPage();
      page.classList.add('show');
      page.setAttribute('aria-hidden','false');
      document.body.classList.add('media-library-open');
      document.body.style.overflow = 'hidden';
    }
    function closeMediaLibraryPage(){
      const page = document.getElementById('mediaLibraryPage');
      if(!page) return;
      page.classList.remove('show');
      page.setAttribute('aria-hidden','true');
      document.body.classList.remove('media-library-open');
      document.body.style.overflow = '';
    }
    function openMediaAssetPreview(target){
      const url = target?.dataset?.fileUrl || '';
      const name = target?.dataset?.fileName || 'file';
      const type = target?.dataset?.fileType || guessMimeFromName(name);
      const size = Number(target?.dataset?.fileSize || 0) || 0;
      if(!url){ showMiniToast?.('File ini belum punya URL preview yang bisa dibuka.'); return; }
      viewer.style.zIndex = '10090';
      viewerTitle.textContent = name;
      if(/^image\//i.test(type) || /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(name)){
        viewerBody.innerHTML = `<img class="viewer-image-full" src="${encodeAttr(url)}" alt="${encodeAttr(name)}" referrerpolicy="no-referrer">`;
        viewer.classList.remove('file-fullscreen');
        viewer.classList.add('show','image-fullscreen');
      }else if(/pdf/i.test(type) || /\.pdf$/i.test(name)){
        viewerBody.innerHTML = `<iframe class="viewer-file-frame" src="${encodeAttr(url)}" title="${encodeAttr(name)}"></iframe>`;
        viewer.classList.remove('image-fullscreen');
        viewer.classList.add('show','file-fullscreen');
      }else{
        viewer.classList.remove('image-fullscreen');
        viewer.classList.add('show','file-fullscreen');
        viewerBody.innerHTML = `<div class="file-open-panel media-open-panel">${icons.file}<h3>${escapeHtml(name)}</h3><p><b>Ukuran:</b> ${formatBytes(size)}</p><p>File ini dibuka lewat tab/file viewer browser.</p><a class="open-btn" href="${encodeAttr(url)}" target="_blank" rel="noopener">Buka File</a></div>`;
      }
    }
    function exportCurrentChat(){
      const item = getChatById();
      const id = currentChatId || 'guest';
      const text = `DATZON AI CHAT\nID: ${id}\nLink: ${chatDeepLink(id)}\n\n${collectChatText()}`;
      downloadText(`datzon-ai-chat-${id}.txt`, text);
    }
    function showDeleteChatConfirm(){
      showCustomModal('Hapus obrolan?', '<p class="modal-muted">Obrolan ini akan dihapus permanen dari riwayat lokal dan cloud kalau akun tersambung. Jangan nangis ke CSS nanti.</p>', [
        {label:'Batal', action:'cancel'},
        {label:'Hapus', action:'delete', danger:true}
      ], async action => {
        if(action !== 'delete') return;
        const id = currentChatId;
        if(id){
          chatHistory = chatHistory.filter(x => String(x.id) !== String(id));
          saveChatsToStorage();
          if(hasFirebase() && uid()){
            try{ await fb.db.collection('users').doc(uid()).collection('chats').doc(String(id)).delete(); }catch(e){}
          }
        }
        resetChat();
        renderRecentChats();
      });
    }
    function measureToastWidth(message){
      const text = String(message || '').trim();
      if(!text) return {width:54, fontSize:15, hideSides:false};
      let probe = document.getElementById('toastMeasureProbe');
      if(!probe){
        probe = document.createElement('span');
        probe.id = 'toastMeasureProbe';
        probe.setAttribute('aria-hidden','true');
        document.body.appendChild(probe);
      }
      probe.style.fontSize = '15px';
      probe.textContent = text;
      const baseText = Math.ceil(probe.getBoundingClientRect().width);
      const max = Math.max(180, window.innerWidth - 24);
      let fontSize = 15;
      let width = baseText + 58;
      if(width > max){
        fontSize = Math.max(10.5, Math.floor(((max - 42) / Math.max(baseText, 1)) * 15 * 10) / 10);
        probe.style.fontSize = fontSize + 'px';
        width = Math.ceil(probe.getBoundingClientRect().width) + 46;
      }
      width = Math.max(54, Math.min(max, width));
      const leftW = $('.top-left')?.getBoundingClientRect().width || 64;
      const rightW = $('.top-right')?.getBoundingClientRect().width || 110;
      const safeCenter = window.innerWidth - leftW - rightW - 48;
      return {width, fontSize, hideSides: width > safeCenter};
    }
    function setToastSidesHidden(hidden){
      document.body.classList.toggle('toast-wide-active', !!hidden);
    }
    function setSettingsToastHidden(hidden){
      document.body.classList.toggle('toast-settings-active', !!hidden);
    }
    function resetModelToast(label){
      modelButton?.classList.remove('notify-mode','notify-prep','notify-live');
      if(modelButton) modelButton.style.width = '';
      if(label){ label.textContent = ''; label.style.fontSize = ''; }
      setToastSidesHidden(false);
    }
    function showMiniToast(text){
      const samples = ['Upload file gagal. Coba file yang lebih ringan.', 'Data tersimpan.', 'Firebase sedang mikir, tragis.', 'Aksi berhasil. Dunia belum runtuh.'];
      const message = String(text || '').trim().toLowerCase() === 'notifikasi' ? samples[Math.floor(Math.random()*samples.length)] : String(text || '').trim();
      if(!message) return;
      const payload = measureToastWidth(message);
      const settingsOpen = settingsPage?.classList.contains('show');
      const useModelPill = modelButton && !settingsOpen && !document.body.classList.contains('chat-search-open');
      if(useModelPill){
        let label = modelButton.querySelector('.model-toast-text');
        if(!label){
          label = document.createElement('span');
          label.className = 'model-toast-text';
          modelButton.appendChild(label);
        }
        clearTimeout(modelButton._notifyTimer);
        clearTimeout(modelButton._notifyPrepTimer);
        clearTimeout(modelButton._notifyEndTimer);
        modelButton.classList.remove('notify-live');
        modelButton.classList.add('notify-mode','notify-prep');
        modelButton.style.width = '54px';
        label.textContent = '';
        label.style.fontSize = payload.fontSize + 'px';
        setToastSidesHidden(payload.hideSides);
        modelButton._notifyPrepTimer = setTimeout(() => {
          label.textContent = message;
          modelButton.style.width = `${payload.width}px`;
          modelButton.classList.remove('notify-prep');
          modelButton.classList.add('notify-live');
        }, 185);
        modelButton._notifyTimer = setTimeout(() => {
          modelButton.classList.remove('notify-live');
          label.textContent = '';
          modelButton.style.width = '54px';
          modelButton._notifyEndTimer = setTimeout(() => resetModelToast(label), 235);
        }, 3185);
        return;
      }
      let island = document.getElementById('dynamicIslandToast');
      if(!island){
        document.body.insertAdjacentHTML('beforeend','<div id="dynamicIslandToast" class="dynamic-island-toast"><span></span></div>');
        island = document.getElementById('dynamicIslandToast');
      }
      const span = island.querySelector('span');
      clearTimeout(island._timer);
      clearTimeout(island._prepTimer);
      clearTimeout(island._endTimer);
      island.classList.remove('toast-live');
      island.classList.add('show','toast-prep');
      island.style.width = '54px';
      span.textContent = '';
      span.style.fontSize = payload.fontSize + 'px';
      setSettingsToastHidden(settingsOpen);
      island._prepTimer = setTimeout(() => {
        span.textContent = message;
        island.style.width = `${payload.width}px`;
        island.classList.remove('toast-prep');
        island.classList.add('toast-live');
      }, 175);
      island._timer = setTimeout(() => {
        island.classList.remove('toast-live');
        span.textContent = '';
        island.style.width = '54px';
        island._endTimer = setTimeout(() => {
          island.classList.remove('show','toast-prep');
          island.style.width = '';
          span.style.fontSize = '';
          setSettingsToastHidden(false);
        }, 245);
      }, 3175);
    }
    function showCustomModal(title, html, buttons=[{label:'Tutup',action:'cancel'}], done=null){
      let modal = document.getElementById('customActionModal');
      if(!modal){
        document.body.insertAdjacentHTML('beforeend', '<div class="custom-modal" id="customActionModal" aria-hidden="true"><div class="custom-modal-card"><h3></h3><div class="custom-modal-body"></div><div class="custom-modal-actions"></div></div></div>');
        modal = document.getElementById('customActionModal');
        modal.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('show'); });
      }
      const modalCard = modal.querySelector('.custom-modal-card');
      modalCard?.classList.toggle('mic-permission-card', String(html).includes('mic-permission-intro'));
      modal.querySelector('h3').textContent = title;
      modal.querySelector('.custom-modal-body').innerHTML = html;
      modal.querySelector('.custom-modal-actions').innerHTML = buttons.map(b => `<button type="button" class="custom-modal-btn ${b.danger?'danger':''} ${b.primary?'primary':''}" data-modal-action="${escapeHtml(b.action)}">${escapeHtml(b.label)}</button>`).join('');
      modal.onclick = e => {
        if(e.target === modal){
          modal.classList.remove('show');
          modal.setAttribute('aria-hidden','true');
          done && done('cancel');
          return;
        }
        const b = e.target.closest('[data-modal-action]');
        if(!b) return;
        const action = b.dataset.modalAction;
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden','true');
        done && done(action);
      };
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    }

    function loadNotes(){
      try{ const arr = JSON.parse(localStorage.getItem(STORAGE_NOTES) || '[]'); return Array.isArray(arr) ? arr : []; }catch(e){ return []; }
    }
    function saveNotes(arr){
      try{ localStorage.setItem(STORAGE_NOTES, JSON.stringify((arr || []).slice(0,80))); }catch(e){}
    }
    function noteTextFromStack(stack){
      const bubble = stack?.querySelector('.bubble');
      return (bubble?.dataset.rawText || bubble?.textContent || '').trim();
    }
    function saveActiveAnswerToNotes(stackRef=activeMoreStack){
      const text = noteTextFromStack(stackRef);
      if(!text){ showMiniToast('Jawaban kosong. Catatan butuh isi, bukan angan-angan.'); return; }
      const id = `note_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
      const chatId = ensureCurrentChatId();
      const title = (getChatById(chatId)?.title || text.split(/\s+/).slice(0,6).join(' ') || 'Catatan DATZON').slice(0,80);
      const note = {id, chatId, title, text, createdAt:new Date().toISOString(), accent:profileState.accent || 'lime'};
      const notes = loadNotes();
      notes.unshift(note);
      saveNotes(notes);
      renderNotesPage();
      if(hasFirebase() && uid()){
        try{ fb.db.collection('users').doc(uid()).collection('notes').doc(id).set({...note, ownerUid:uid()}, {merge:true}); }catch(e){}
      }
      showMiniToast('Catatan tersimpan. Akhirnya tombolnya punya kerjaan.');
    }
    function highlightNoteText(text, q){
      const src = String(text || '');
      const needle = String(q || '').trim();
      if(!needle) return escapeHtml(src);
      const idx = src.toLowerCase().indexOf(needle.toLowerCase());
      if(idx < 0) return escapeHtml(src);
      return escapeHtml(src.slice(0, idx)) + '<mark>' + escapeHtml(src.slice(idx, idx + needle.length)) + '</mark>' + escapeHtml(src.slice(idx + needle.length));
    }
    function renderNotesPage(){
      const listEl = $('#notesList');
      const emptyEl = $('#notesEmpty');
      if(!listEl) return;
      const q = ($('#notesSearchInput')?.value || '').trim().toLowerCase();
      const notes = loadNotes().filter(n => !q || String(n.text||'').toLowerCase().includes(q) || String(n.title||'').toLowerCase().includes(q));
      listEl.innerHTML = notes.map(n => {
        const date = n.createdAt ? new Date(n.createdAt).toLocaleString('id-ID', {dateStyle:'medium', timeStyle:'short'}) : 'Baru saja';
        const snippet = String(n.text || '').replace(/\s+/g,' ').slice(0,180);
        return `<article class="note-item" data-note-id="${escapeHtml(n.id)}">
          <div class="note-top"><b>${highlightNoteText(n.title || 'Catatan DATZON', q)}</b><button type="button" data-note-open="${escapeHtml(n.id)}">Buka obrolan</button></div>
          <p>${highlightNoteText(snippet, q)}</p>
          <span>Chat ID: ${escapeHtml(n.chatId || 'guest')} • ${escapeHtml(date)}</span>
        </article>`;
      }).join('');
      if(emptyEl) emptyEl.hidden = notes.length > 0;
    }
    function openNoteSource(noteId){
      const note = loadNotes().find(n => String(n.id) === String(noteId));
      if(!note){ showMiniToast('Catatan nggak ketemu. Mungkin kabur ke alam cache.'); return; }
      closeSettingsPageV10();
      const item = getChatById(note.chatId);
      if(item) loadStoredChat(note.chatId);
      setTimeout(() => {
        const bubbles = $$('.msg.ai .bubble');
        const target = bubbles.find(b => (b.dataset.rawText || b.textContent || '').trim().startsWith(String(note.text || '').trim().slice(0,40)));
        if(target){ target.classList.add('hit-active-bubble'); ensureElementVisible(target.closest('.msg'), 'smooth'); setTimeout(() => target.classList.remove('hit-active-bubble'), 2200); }
      }, 180);
    }

    newChatBtn.addEventListener('click', () => resetChat());
    function resetChat(){
      if(imagePageActive){ resetImageConversation(); return; }
      chatLog.innerHTML = '';
      promptEl.value = '';
      uploadedFiles.forEach(item => URL.revokeObjectURL(item.url));
      uploadedFiles = [];
      renderAttachments();
      hasStartedChat = false;
      currentChatRegistered = false;
      currentChatId = null;
      activeChatFiles = [];
      autoFollowAI = false;
      try{ if(history.replaceState){ const clean = location.pathname.replace(/obr\.id:[^/]+$/i,'').replace(/\/$/,'') || '/'; history.replaceState({}, '', clean.endsWith('.html') ? clean : clean + '/'); } }catch(e){}
      document.body.classList.remove('chat-started');
      document.body.classList.add('home-mode');
      heroEl.hidden = false;
      requestAnimationFrame(() => heroEl.classList.remove('hero-exit'));
      renderRecentChats();
      updateTopMenuTitle();
      autoGrow();
      window.scrollTo({top:0, behavior:'smooth'});
    }

    function renderStyles(){
      if(imagePageActive){
        styleMenu.innerHTML = `<div class="image-menu-title">Kualitas gambar</div>` + IMAGE_RESOLUTIONS.map(item => `
          <button class="style-option ${item.id === selectedImageResolution ? 'active' : ''}" type="button" data-image-resolution="${item.id}">
            <span><b>${item.label}</b><small>${item.desc}</small></span>
            ${item.id === selectedImageResolution ? icons.check : ''}
          </button>
        `).join('');
        updateImageComposerLabels();
        return;
      }
      styleMenu.innerHTML = styles.map(item => `
        <button class="style-option ${item.name === selectedStyle ? 'active' : ''}" type="button" data-style="${item.name}">
          <span><b>${item.name}</b><small>${item.desc}</small></span>
          ${item.name === selectedStyle ? icons.check : ''}
        </button>
      `).join('');
    }
    function toggleStyleMenu(force){
      const show = typeof force === 'boolean' ? force : !styleMenu.classList.contains('show');
      styleMenu.classList.toggle('show', show);
      styleBtn.setAttribute('aria-expanded', String(show));
    }
    styleBtn.addEventListener('click', e => {e.stopPropagation(); toggleStyleMenu();});
    styleMenu.addEventListener('click', e => {
      const btn = e.target.closest('.style-option');
      if(!btn) return;
      if(imagePageActive){
        selectedImageResolution = btn.dataset.imageResolution || selectedImageResolution;
        updateImageComposerLabels();
        renderStyles();
        toggleStyleMenu(false);
        return;
      }
      selectedStyle = btn.dataset.style;
      styleLabel.textContent = selectedStyle;
      renderStyles();
      toggleStyleMenu(false);
    });

    $$('.quick-card').forEach(card => card.addEventListener('click', () => {
      promptEl.value = card.dataset.prompt || '';
      autoGrow();
      promptEl.focus();
    }));
    heroEl?.addEventListener('click', e => {
      const card = e.target.closest('.quick-card');
      if(!card || !heroEl.contains(card)) return;
      promptEl.value = card.dataset.prompt || '';
      autoGrow();
      promptEl.focus();
    });

    attachBtn.addEventListener('click', () => { if(!imagePageActive) fileInput.click(); });
    attachBtn.addEventListener('click', e => {
      if(!imagePageActive) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      toggleImageRatioMenu();
    }, true);
    const MAX_CHAT_UPLOAD_FILES = 10;
    const MAX_CHAT_UPLOAD_BYTES = 10 * 1024 * 1024;
    const AI_FILE_READER_CONFIG = {
      maxTextBytes: 384 * 1024,
      maxTextChars: 70000,
      maxInlineBytes: 10 * 1024 * 1024,
      ...(window.DATZON_FILE_READER_CONFIG || {})
    };
    const TEXT_FILE_EXT_RE = /\.(txt|md|markdown|html?|css|js|mjs|cjs|json|csv|tsv|xml|svg|log|ini|conf|env|yml|yaml|php|py|java|kt|cpp|c|h|cs|rb|go|rs|sql|sh|bat)$/i;
    const IMAGE_FILE_EXT_RE = /\.(png|jpe?g|webp|gif|avif|bmp)$/i;
    const PDF_FILE_EXT_RE = /\.pdf$/i;
    function isReadableTextFile(file){
      const name = file?.name || '';
      const type = file?.type || '';
      return /^text\//i.test(type) || /json|javascript|xml|svg|csv|yaml/i.test(type) || TEXT_FILE_EXT_RE.test(name);
    }
    function isImageFile(file){
      const name = file?.name || '';
      const type = file?.type || '';
      return /^image\//i.test(type) || IMAGE_FILE_EXT_RE.test(name);
    }
    function isPdfFile(file){
      const name = file?.name || '';
      const type = file?.type || '';
      return /pdf/i.test(type) || PDF_FILE_EXT_RE.test(name);
    }
    function fileToText(file){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(reader.error || new Error('File gagal dibaca sebagai teks'));
        reader.readAsText(file);
      });
    }
    function fileToDataUrl(file){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(reader.error || new Error('File gagal dibaca sebagai data URL'));
        reader.readAsDataURL(file);
      });
    }
    function dataUrlToInlinePart(dataUrl, fallbackMime='application/octet-stream'){
      const m = String(dataUrl || '').match(/^data:([^;,]+)?(;base64)?,(.*)$/s);
      if(!m) return null;
      return {mimeType:m[1] || fallbackMime, data:m[3] || ''};
    }
    async function prepareFilesForAi(files=[]){
      const cfg = AI_FILE_READER_CONFIG;
      await Promise.all((files || []).map(async item => {
        const f = item?.file || item;
        if(!f || item.aiPrepared) return;
        item.aiPrepared = true;
        item.aiName = f.name || item.name || 'file';
        item.aiMime = f.type || item.type || guessMimeFromName(item.aiName);
        item.aiSize = Number(f.size || item.size || 0);
        try{
          if(isReadableTextFile(f)){
            if(item.aiSize > Number(cfg.maxTextBytes || 0)){
              item.aiNote = `File teks terlalu besar untuk dibaca penuh (${formatBytes(item.aiSize)}).`;
              return;
            }
            const raw = await fileToText(f);
            const maxChars = Number(cfg.maxTextChars || 70000);
            item.aiText = raw.length > maxChars ? raw.slice(0, maxChars) : raw;
            item.aiTextTruncated = raw.length > maxChars;
            return;
          }
          if((isImageFile(f) || isPdfFile(f)) && item.aiSize <= Number(cfg.maxInlineBytes || MAX_CHAT_UPLOAD_BYTES)){
            item.aiDataUrl = await fileToDataUrl(f);
            item.aiInline = dataUrlToInlinePart(item.aiDataUrl, item.aiMime);
            item.aiKind = isImageFile(f) ? 'image' : 'pdf';
            return;
          }
          item.aiNote = isPdfFile(f)
            ? 'PDF ini belum dibaca langsung oleh provider yang dipilih. Pakai Google Studio/Gemini untuk inline PDF, atau ekstrak teks dulu.'
            : 'Tipe file ini belum bisa dibaca langsung. UI tetap menyimpan preview dan metadata.';
        }catch(err){
          item.aiReadError = err?.message || String(err);
          console.warn('File reader DATZON gagal:', err);
        }
      }));
      return files;
    }
    function guessMimeFromName(name=''){
      if(/\.pdf$/i.test(name)) return 'application/pdf';
      if(/\.png$/i.test(name)) return 'image/png';
      if(/\.jpe?g$/i.test(name)) return 'image/jpeg';
      if(/\.webp$/i.test(name)) return 'image/webp';
      if(/\.gif$/i.test(name)) return 'image/gif';
      if(/\.html?$/i.test(name)) return 'text/html';
      if(/\.css$/i.test(name)) return 'text/css';
      if(/\.m?js$/i.test(name)) return 'text/javascript';
      if(/\.json$/i.test(name)) return 'application/json';
      return 'application/octet-stream';
    }
    fileInput.addEventListener('change', e => {
      const incoming = Array.from(e.target.files || []);
      const rejectedSize = incoming.filter(file => file.size > MAX_CHAT_UPLOAD_BYTES);
      const acceptedSize = incoming.filter(file => file.size <= MAX_CHAT_UPLOAD_BYTES);
      const room = Math.max(0, MAX_CHAT_UPLOAD_FILES - uploadedFiles.length);
      const accepted = acceptedSize.slice(0, room);
      accepted.forEach(file => uploadedFiles.push({id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, file, url: URL.createObjectURL(file)}));
      fileInput.value = '';
      renderAttachments();
      if(rejectedSize.length) showMiniToast(`${rejectedSize.length} file ditolak. Maksimal 10 MB per file, bukan gudang server raksasa.`);
      if(acceptedSize.length > room) showMiniToast(`Maksimal 10 file sekali kirim. Sisanya antre di luar, kasihan tapi aturan.`);
    });
    function renderAttachments(){
      attachmentsEl.classList.toggle('show', uploadedFiles.length > 0);
      attachmentsEl.innerHTML = uploadedFiles.map(item => {
        const isImage = item.file.type.startsWith('image/');
        const isPdf = item.file.type === 'application/pdf' || item.file.name.toLowerCase().endsWith('.pdf');
        const preview = isImage ? `<img src="${item.url}" alt="${escapeHtml(item.file.name)}">` : (isPdf ? icons.pdf : icons.file);
        return `<button class="file-card" type="button" data-id="${item.id}" title="Klik untuk preview"><span class="remove-file" data-remove="${item.id}" title="Hapus file">×</span><div class="file-preview">${preview}</div><div class="file-meta"><div class="file-name">${escapeHtml(item.file.name)}</div><div class="file-size">${formatBytes(item.file.size)}</div></div></button>`;
      }).join('');
      updateComposerSpace();
    }
    attachmentsEl.addEventListener('click', e => {
      const remove = e.target.closest('[data-remove]');
      if(remove){
        e.stopPropagation();
        const item = uploadedFiles.find(f => f.id === remove.dataset.remove);
        if(item) URL.revokeObjectURL(item.url);
        uploadedFiles = uploadedFiles.filter(f => f.id !== remove.dataset.remove);
        renderAttachments();
        return;
      }
      const card = e.target.closest('.file-card');
      if(card){
        const item = uploadedFiles.find(f => f.id === card.dataset.id);
        if(item) openViewer(item);
      }
    });
    function openViewer(item){
      viewerTitle.textContent = item.file.name;
      viewerBody.innerHTML = '';
      const isImage = item.file.type.startsWith('image/');
      const isPdf = item.file.type === 'application/pdf' || item.file.name.toLowerCase().endsWith('.pdf');
      if(isImage){
        const img = document.createElement('img'); img.src = item.url; img.alt = item.file.name; viewerBody.appendChild(img);
      }else if(isPdf){
        const iframe = document.createElement('iframe'); iframe.src = item.url; iframe.title = item.file.name; viewerBody.appendChild(iframe);
      }else{
        viewerBody.innerHTML = `<div class="file-open-panel">${icons.file}<h3>${escapeHtml(item.file.name)}</h3><p>Preview langsung buat tipe file ini tergantung browser.</p><p><b>Ukuran:</b> ${formatBytes(item.file.size)}</p><a class="open-btn" href="${item.url}" target="_blank" rel="noopener">Buka File</a></div>`;
      }
      viewer.classList.add('show');
    }
    function closeViewer(){viewer.classList.remove('show','image-fullscreen','file-fullscreen'); viewerBody.innerHTML = ''; viewer.style.zIndex = '';}
    viewerClose.addEventListener('click', closeViewer);
    viewer.addEventListener('click', e => { if(e.target === viewer) closeViewer(); });

    function autoGrow(){
      promptEl.style.height = 'auto';
      promptEl.style.height = Math.min(promptEl.scrollHeight, 138) + 'px';
      updateComposerSpace();
    }
    promptEl.addEventListener('input', autoGrow);
    promptEl.addEventListener('keydown', e => {
      if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); }
    });


    function composerSafeBottom(){
      const h = composerCard?.getBoundingClientRect().height || 154;
      return Math.max(120, window.innerHeight - h - 18);
    }
    function ensureElementVisible(el, behavior='smooth'){
      if(!el) return;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const topLimit = 84;
        const bottomLimit = composerSafeBottom();
        let delta = 0;
        if(rect.bottom > bottomLimit) delta = rect.bottom - bottomLimit + 10;
        else if(rect.top < topLimit) delta = rect.top - topLimit - 10;
        if(Math.abs(delta) > 2) window.scrollBy({top: delta, behavior});
      });
    }
    function scrollChatToBottom(behavior='smooth'){
      requestAnimationFrame(() => {
        const target = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        if(Math.abs(window.scrollY - target) > 24) window.scrollTo({top:target, behavior});
      });
    }
    function keepExchangeVisible(userEl, aiEl, behavior='smooth'){
      if(!userEl || !aiEl) return ensureElementVisible(aiEl || userEl, behavior);
      requestAnimationFrame(() => {
        const a = userEl.getBoundingClientRect();
        const b = aiEl.getBoundingClientRect();
        const topLimit = 84;
        const bottomLimit = composerSafeBottom();
        const fitHeight = bottomLimit - topLimit;
        const blockHeight = b.bottom - a.top;
        if(blockHeight <= fitHeight){
          let delta = 0;
          if(b.bottom > bottomLimit) delta = b.bottom - bottomLimit + 10;
          if(a.top - delta < topLimit) delta = Math.min(delta, a.top - topLimit - 10);
          if(Math.abs(delta) > 2) window.scrollBy({top: delta, behavior});
        }else{
          ensureElementVisible(aiEl, behavior);
        }
      });
    }
    function isFullyVisible(targetEl=null, pairEl=null){
      const topLimit = 84;
      const bottomLimit = composerSafeBottom();
      const els = [pairEl, targetEl].filter(Boolean);
      if(!els.length) return true;
      return els.every(el => { const r = el.getBoundingClientRect(); return r.top >= topLimit && r.bottom <= bottomLimit; });
    }
    function beginAutoFollow(targetEl=null, pairEl=null){
      autoFollowAI = true;
      if(targetEl){
        pairEl ? keepExchangeVisible(pairEl, targetEl, 'smooth') : ensureElementVisible(targetEl, 'smooth');
      }
      setTimeout(() => autoFollowAI && (targetEl ? (pairEl ? keepExchangeVisible(pairEl, targetEl, 'auto') : ensureElementVisible(targetEl, 'auto')) : null), 140);
      setTimeout(() => autoFollowAI && (targetEl ? (pairEl ? keepExchangeVisible(pairEl, targetEl, 'auto') : ensureElementVisible(targetEl, 'auto')) : null), 340);
    }
    function stopAutoFollowByUser(e){
      if(!autoFollowAI) return;
      if(e.target.closest('.composer-card,.top-controls,.floating-menu,.more-menu,.sidebar,.sidebar-backdrop,.viewer,.tool-btn,.file-card')) return;
      autoFollowAI = false;
    }
    document.addEventListener('wheel', stopAutoFollowByUser, {passive:true});
    document.addEventListener('touchstart', stopAutoFollowByUser, {passive:true});
    document.addEventListener('pointerdown', stopAutoFollowByUser, {passive:true});

    function startChatMode(){
      if(hasStartedChat) return;
      hasStartedChat = true;
      document.body.classList.remove('home-mode');
      document.body.classList.add('chat-started');
      if(!imagePageActive){
        ensureCurrentChatId();
        syncAddressToChat(currentChatId);
      }
      heroEl.classList.add('hero-exit');
      setTimeout(() => { heroEl.hidden = true; }, 680);
    }


    function buildCombinedWebsitePreviewFromBubble(bubble){
      const cards = Array.from(bubble?.querySelectorAll?.('.code-card') || []);
      const items = cards.map(c => codeBlockStore.get(c.dataset.codeId)).filter(Boolean);
      if(!items.length) return null;
      const byLang = (needle) => items.filter(it => normalizeLang(it.lang) === needle).map(it => it.code).filter(Boolean);
      const htmls = byLang('html');
      const css = byLang('css').join('\n\n');
      const js = byLang('javascript').concat(byLang('typescript')).join('\n\n');
      if(!htmls.length || (!css && !js)) return null;
      let html = htmls[0];
      if(!/<html[\s>]/i.test(html)) html = `<!DOCTYPE html>\n<html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Pratinjau DATZON</title></head><body>\n${html}\n</body></html>`;
      if(css){
        const styleTag = `\n<style>\n${css}\n</style>\n`;
        html = /<\/head>/i.test(html) ? html.replace(/<\/head>/i, styleTag + '</head>') : styleTag + html;
      }
      if(js){
        const scriptTag = `\n<script>\n${js.replace(/<\/script/gi,'<\\/script')}\n</script>\n`;
        html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, scriptTag + '</body>') : html + scriptTag;
      }
      return html;
    }
    function updateCombinedPreviewButton(msg){
      const stack = msg?.querySelector?.('.ai-stack');
      const bubble = stack?.querySelector?.('.bubble');
      if(!stack || !bubble) return;
      const old = stack.querySelector('.combined-preview-row');
      const html = buildCombinedWebsitePreviewFromBubble(bubble);
      if(!html){ old?.remove(); return; }
      const scope = bubble.dataset.renderScope || getRenderScope(bubble);
      const id = `combined_${scope}`;
      codeBlockStore.set(id, {lang:'html', code:html});
      let row = old;
      if(!row){
        row = document.createElement('div');
        row.className = 'combined-preview-row';
        const tools = stack.querySelector('.ai-tools');
        stack.insertBefore(row, tools || null);
      }
      row.innerHTML = `<button type="button" class="combined-preview-btn" data-action="run-combined" data-code-id="${encodeAttr(id)}">Jalankan website</button>`;
    }

    function normalizeChatFileMeta(item, index=0){
      const f = item?.file || item || {};
      const name = f.name || item?.name || `file-${index+1}`;
      const size = f.size || item?.size || 0;
      const type = f.type || item?.type || 'application/octet-stream';
      const rawUrl = item?.cloudUrl || item?.secure_url || item?.url || item?.previewUrl || '';
      const durableUrl = /^blob:/i.test(rawUrl) ? '' : rawUrl;
      return {
        id: item?.id || name || shortChatId(),
        name, size, type,
        url: durableUrl,
        cloudUrl: item?.cloudUrl || item?.secure_url || durableUrl,
        cloudPublicId: item?.cloudPublicId || '',
        cloudName: item?.cloudName || '',
        deleteToken: item?.deleteToken || '',
        cloudBytes: item?.cloudBytes || item?.bytes || size || 0,
        kind: item?.kind || (/^image\//i.test(type) ? 'imageAttach' : 'fileAttach'),
        uploadError: item?.uploadError || '',
        uploading: !!item?.uploading,
        at: item?.at || (typeof nowIso === 'function' ? nowIso() : new Date().toISOString())
      };
    }
    function serializeChatFiles(files=[]){
      return (files || []).filter(Boolean).map((x,i) => normalizeChatFileMeta(x,i));
    }
    function renderUserMessageFiles(msg, files=[]){
      if(!msg || !msg.classList.contains('user')) return;
      msg.__files = files || [];
      msg.dataset.files = JSON.stringify(serializeChatFiles(files));
      const stack = msg.querySelector('.user-stack');
      if(!stack) return;
      const old = stack.querySelector('.user-files-bubble');
      const html = chatFilePreviewHTML(files);
      if(old) old.remove();
      if(html) stack.insertAdjacentHTML('afterbegin', html);
      applyUserBubbleClamp(msg);
    }

    function chatFilePreviewHTML(files=[]){
      const list = (files || []).filter(Boolean);
      if(!list.length) return '';
      const cards = list.map((item, index) => {
        const f = item.file || item;
        const name = f.name || item.name || `file-${index+1}`;
        const size = f.size || item.size || 0;
        const type = f.type || item.type || '';
        const isImage = /^image\//i.test(type) || /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(name);
        const url =
  item.cloudUrl ||
  item.secure_url ||
  item.url ||
  item.previewUrl ||
  '';
        const body = isImage
 ? (
      url
      ? `<img src="${encodeAttr(url)}" alt="${encodeAttr(name)}" loading="lazy" decoding="async">`
      : `<div class="sent-file-uploading">
           <div class="upload-spinner"></div>
           <small>Uploading...</small>
         </div>`
   )
 : `<span class="sent-file-icon">
      ${/pdf/i.test(type) || /\.pdf$/i.test(name)
        ? icons.pdf
        : icons.file}
    </span>`;
        return `<button class="sent-file-card" type="button" data-sent-file="${encodeAttr(item.id || name)}" data-file-url="${encodeAttr(url)}" data-file-name="${encodeAttr(name)}" data-file-type="${encodeAttr(type)}" data-file-size="${encodeAttr(size)}" title="${encodeAttr(name)}">
          <span class="sent-file-thumb">${body}</span>
          <span class="sent-file-info"><b>${escapeHtml(name)}</b><small>${formatBytes(Number(size)||0)}</small></span>
        </button>`;
      }).join('');
      return `<div class="user-files-bubble"><div class="sent-files-grid">${cards}</div></div>`;
    }
    function openSentFilePreview(target){
      const el = target && target.nodeType ? target : document.querySelector(`[data-sent-file="${(window.CSS?.escape ? CSS.escape(String(target)) : String(target).replace(/"/g,'\\"'))}"]`);
      const id = el?.dataset?.sentFile || target;
      const file = (lastFilesSnapshot || []).find(x => String(x.id || x.file?.name) === String(id)) || (uploadedFiles || []).find(x => String(x.id || x.file?.name) === String(id)) || (activeChatFiles || []).find(x => String(x.id || x.name) === String(id));
      const url = el?.dataset?.fileUrl || file?.cloudUrl || file?.secure_url || file?.url || file?.previewUrl || '';
      const f = file?.file || file || {};
      const name = el?.dataset?.fileName || f.name || 'file';
      const type = el?.dataset?.fileType || f.type || '';
      const size = Number(el?.dataset?.fileSize || f.size || 0);
      if(!url){ showMiniToast('Preview file cuma tersedia sebelum halaman direfresh. Browser bukan gudang abadi.'); return; }
      viewer.classList.add('show');
      viewer.style.zIndex = '10090';
      viewerTitle.textContent = name;
      if(/^image\//i.test(type) || /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(name)) viewerBody.innerHTML = `<img src="${encodeAttr(url)}" alt="${encodeAttr(name)}">`;
      else viewerBody.innerHTML = `<div class="file-open-panel">${icons.file}<h3>${escapeHtml(name)}</h3><p><b>Ukuran:</b> ${formatBytes(size)}</p><a class="open-btn" href="${encodeAttr(url)}" target="_blank" rel="noopener">Buka File</a></div>`;
    }
    async function uploadChatFilesToCloudinary(files=[]){
      if(!files.length) return files;
      await Promise.all(files.map(async item => {
        const f = item.file;
        if(!f || item.cloudUrl) return;
        const isImage = /^image\//i.test(f.type||'') || /\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(f.name || '');
        const kind = isImage ? 'imageAttach' : 'fileAttach';
        try{
          item.uploading = true;
          const data = await uploadToCloudinary(f, kind, {
            filename:f.name || `${kind}-${Date.now()}`,
            tags:isImage ? 'datzon-ai,imageattch,chat' : 'datzon-ai,filedll,chat'
          });
          item.cloudUrl = data.secure_url || data.url || '';
          item.cloudPublicId = data.public_id || '';
          item.cloudName = cloudinaryConfig(kind).cloudName || '';
          item.deleteToken = data.delete_token || '';
          item.cloudBytes = data.bytes || f.size || 0;
          if(item.cloudUrl){
            item.url = item.cloudUrl;
            item.previewUrl = item.cloudUrl;
          }
          item.kind = isImage ? 'imageAttach' : 'fileAttach';
          item.width = data.width || null;
          item.height = data.height || null;
          item.format = data.format || '';
          item.uploadedAt = Date.now();
          trackStoredAsset({kind:item.kind, name:f.name || `${kind}-${Date.now()}`, bytes:item.cloudBytes, cloudUrl:item.cloudUrl, cloudPublicId:item.cloudPublicId, cloudName:item.cloudName, deleteToken:item.deleteToken, source:'chat-attach'});
          item.uploading = false;
        }catch(err){
          item.uploading = false;
          item.uploadError = err.message || String(err);
          console.warn('UPLOAD FAILED, lanjut pakai reader lokal:', err);
        }
      }));
      renderStorageInfo?.();
      return files;
    }

    function applyUserBubbleClamp(msg){
      const bubble = msg?.querySelector?.('.user-stack > .bubble');
      if(!bubble) return;
      bubble.classList.remove('user-collapsed','user-expanded','has-user-collapse');
      const old = msg.querySelector('.user-expand-btn');
      old?.remove();
      const raw = bubble.dataset.rawText || bubble.textContent || '';
      const logicalLines = raw.split('\n').length;
      requestAnimationFrame(() => {
        const shouldClamp = logicalLines > 10 || bubble.scrollHeight > 270;
        if(!shouldClamp) return;
        bubble.classList.add('user-collapsed','has-user-collapse');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'user-expand-btn';
        btn.textContent = 'Tampilkan lebih banyak';
        btn.setAttribute('aria-label','Tampilkan lebih banyak');
        btn.dataset.userExpand = 'more';
        bubble.insertAdjacentElement('afterend', btn);
      });
    }

    function actionToolsHTML(){
      return `<div class="ai-tools">
        <button class="tool-btn" type="button" data-action="copy" title="Salin jawaban"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2"/><rect x="4" y="4" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2" opacity=".7"/></svg></button>
        <button class="tool-btn" type="button" data-action="like" title="Suka"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3m0 11V10l5-8 1 1a4 4 0 0 1 1 4l-.7 3H20a2 2 0 0 1 2 2.3l-1.3 7A3 3 0 0 1 17.8 22H7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="tool-btn" type="button" data-action="dislike" title="Tidak suka"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3m0-11v12l-5 8-1-1a4 4 0 0 1-1-4l.7-3H4a2 2 0 0 1-2-2.3l1.3-7A3 3 0 0 1 6.2 2H17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="tool-btn" type="button" data-action="share" title="Bagikan"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/><path d="M8.65 10.65 15.35 6.35M8.65 13.35l6.7 4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
        <button class="tool-btn source-btn" type="button" data-action="source" title="Lihat sumber"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>Sumber</button>
        <span class="more-wrap"><button class="tool-btn" type="button" data-action="more" title="Menu lainnya"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h.01M12 12h.01M19 12h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></button></span>
      </div><div class="source-note">Sumber: DATZON AI / Provider API.</div>`;
    }

    function addMessage(type, text, files=[]){
      const msg = document.createElement('div');
      msg.className = `msg ${type}`;
      const avatar = type === 'ai' ? `<div class="avatar ai">${icons.bot}</div>` : `<div class="avatar"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
      if(type === 'user'){
        const fileBubble = chatFilePreviewHTML(files);
        const bodyText = text || (files.length ? '[Mengirim file tanpa teks.]' : '');
        msg.__files = files || [];
        msg.dataset.files = JSON.stringify(serializeChatFiles(files));
        msg.innerHTML = `<div class="user-stack">${fileBubble}<div class="bubble">${escapeHtml(bodyText)}</div></div>${avatar}`;
      }else{
        msg.innerHTML = `${avatar}<div class="ai-stack"><div class="bubble"></div>${actionToolsHTML()}</div>`;
        renderBubbleContent($('.bubble', msg), text);
        updateCombinedPreviewButton(msg);
        $('.ai-tools', msg).classList.add('show');
      }
      const bubbleEl = $('.bubble', msg);
      if(bubbleEl && type === 'user') bubbleEl.dataset.rawText = bubbleEl.textContent || '';
      chatLog.appendChild(msg);
      if(type === 'user') applyUserBubbleClamp(msg);
      if(type === 'user') ensureElementVisible(msg, 'smooth');
      else if(autoFollowAI) ensureElementVisible(msg, 'smooth');
      return msg;
    }
    function addTypingMessage(){
      const msg = document.createElement('div');
      msg.className = 'msg ai typing-msg';
      msg.innerHTML = `<div class="avatar ai">${icons.bot}</div><div class="ai-stack"><div class="bubble typing-bubble"><span class="typing-label">DATZON AI mikir</span><span class="typing-dots"><span></span><span></span><span></span></span></div>${actionToolsHTML()}</div>`;
      chatLog.appendChild(msg);
      if(autoFollowAI) ensureElementVisible(msg, 'smooth');
      return msg;
    }
    async function typeWriterInto(msg, text, sourceLabel=""){
      const bubble = $('.bubble', msg);
      const tools = $('.ai-tools', msg);
      const fullText = String(text || '');
      const scope = getRenderScope(bubble);
      bubble.classList.remove('typing-bubble');
      bubble.dataset.rawText = '';
      bubble.innerHTML = '';
      let shown = '';
      let lastRender = 0;
      const renderLive = (force=false) => {
        if(!force && shown.length - lastRender < 4) return;
        lastRender = shown.length;
        bubble.dataset.rawText = shown;
        // Render sambil ngetik. Begitu pagar ``` atau pola kode kebaca, langsung masuk box kode.
        // Tidak lagi numpahin HTML mentah ke bubble seperti mie instan tumpah.
        renderStreamingCode = true;
        bubble.innerHTML = renderAiMarkdown(shown, scope);
        renderStreamingCode = false;
        updateCombinedPreviewButton(msg);
      };
      for(let i=0;i<fullText.length;i++){
        shown += fullText[i];
        renderLive(i % 3 === 0 || /[`>};\n]/.test(fullText[i]));
        if(i % 12 === 0){ if(autoFollowAI) ensureElementVisible(msg, 'auto'); await sleep(7); }
      }
      shown = fullText;
      bubble.dataset.rawText = fullText;
      renderStreamingCode = false;
      bubble.innerHTML = renderAiMarkdown(fullText, scope);
      updateCombinedPreviewButton(msg);
      if(sourceLabel){
        const source = msg.querySelector('.source-note');
        if(source) source.textContent = sourceLabel;
      }
      tools.classList.add('show');
      if(autoFollowAI) ensureElementVisible(msg, 'smooth');
    }
    function setLoading(state){
      isSending = state;
      sendBtn.disabled = state;
      micBtn.disabled = state;
      sendBtn.classList.remove('stop-mode');
      sendBtn.classList.toggle('loading', state);
      sendIcon.innerHTML = state ? '<span class="send-loader"></span>' : icons.send;
    }
    async function sendMessage(){
      if(imagePageActive) return sendImageMessage();
      if(isListening){ stopMic(); return; }
      if(isSending) return;
      const text = promptEl.value.trim();
      if(!text && uploadedFiles.length === 0){
        composerCard.classList.remove('shake'); void composerCard.offsetWidth; composerCard.classList.add('shake');
        return;
      }
      if(text.toLowerCase() === 'notifikasi') showMiniToast('notifikasi');
      startChatMode();
      const filesSnapshot = [...uploadedFiles];
      const usingOwnApiKeyProvider = selectedProviderUsesOwnApiKey();
      if(!usingOwnApiKeyProvider && isLimitExceeded('chat')){
        lastUserText = text;
        lastFilesSnapshot = filesSnapshot;
        addMessage('user', text, filesSnapshot.map(file => ({...file, url:'', previewUrl:''})));
        promptEl.value = '';
        uploadedFiles = [];
        renderAttachments();
        autoGrow();
        setLoading(true);
        const typingMsg = addTypingMessage();
        await sleep(3000);
        setLoading(false);
        renderLimitExceededMessage(typingMsg, 'chat');
        registerRecentChat(text, []);
        saveCurrentChat();
        renderRecentChats();
        renderLimitRequestUi();
        return;
      }
      if(!usingOwnApiKeyProvider) trackGuestLimitRequest('chat');
lastUserText = text;
lastFilesSnapshot = filesSnapshot;

const pendingFiles = filesSnapshot.map(file => ({
  ...file,
  url: '',
  previewUrl: ''
}));

const userMsg = addMessage('user', text, pendingFiles);

promptEl.value = '';
autoGrow();

uploadedFiles = [];
renderAttachments();
      setLoading(true);
      const typingMsg = addTypingMessage();
      await uploadChatFilesToCloudinary(filesSnapshot);
      if(!isFullyVisible(typingMsg, userMsg)) beginAutoFollow(typingMsg, userMsg);
      else autoFollowAI = false;
      let result;
      try{
        const waitForTemplate = selectedProviderHasNoRealKey() ? sleep(3000) : Promise.resolve();
        [result] = await Promise.all([getAiAnswer(text, filesSnapshot), waitForTemplate]);
      }catch(err){
        console.warn('DATZON AI provider gagal total:', err);
        const cfg = providerConfig();
        result = {
          text: providerTemplateMessage(cfg, 'error'),
          source: `Sumber: ${cfg.label} gagal total.`,
          systemUi: true
        };
      }
      setLoading(false);
      if(result.apiKeyActions || result.systemUi) $('.bubble', typingMsg)?.classList.add('system-ui-bubble');
      await typeWriterInto(typingMsg, result.text || '', result.source || 'Sumber: DATZON AI.');
      if(result.apiKeyActions) decorateGoogleApiKeyHelp(typingMsg, result.apiKeyProvider || providerFromSelectedEngine());
      if(result.apiKeyActions || result.systemUi) uiApplySoon(typingMsg);
      
      renderUserMessageFiles(userMsg, filesSnapshot);
      registerRecentChat(text, filesSnapshot);
      saveCurrentChat();
      renderRecentChats();
      autoFollowAI = false;
    }
    sendBtn.addEventListener('click', () => isListening ? stopMic() : sendMessage());

    chatLog.addEventListener('click', async e => {
      const apiKeyGo = e.target.closest('[data-api-key-action]');
      if(apiKeyGo){
        e.preventDefault();
        e.stopPropagation();
        const action = String(apiKeyGo.dataset.apiKeyAction || '');
        if(action.startsWith('get-')){
          const provider = sanitizeOwnApiKeyProvider(action.replace(/^get-/, '') === 'google' ? 'googleStudio' : action.replace(/^get-/, ''));
          window.open(API_KEY_LINKS[provider] || API_KEY_LINKS.googleStudio, '_blank', 'noopener');
        }else { openSettingsPageV10?.(); openSettingsView('apikeys'); renderOwnApiKeyPage?.(); }
        return;
      }
      const limitGo = e.target.closest('[data-limit-go]');
      if(limitGo){
        e.preventDefault();
        e.stopPropagation();
        openSettingsPageV10?.();
        if(limitGo.dataset.limitGo === 'register'){
          openSettingsView('auth');
          setTimeout(() => document.querySelector('[data-auth-tab="register"]')?.click(), 90);
        }else{
          openSettingsView('checkin');
          renderCheckinGrid?.();
        }
        return;
      }
      const generatedImage = e.target.closest('.image-result-card');
      if(generatedImage && !e.target.closest('[data-action], .ai-tools')){
        e.preventDefault();
        e.stopPropagation();
        openGeneratedImageViewer(generatedImage);
        return;
      }
      const expandUser = e.target.closest('[data-user-expand]');
      if(expandUser){
        e.preventDefault();
        e.stopPropagation();
        const bubble = expandUser.previousElementSibling;
        const expanded = bubble?.classList.toggle('user-expanded');
        bubble?.classList.toggle('user-collapsed', !expanded);
        expandUser.textContent = expanded ? 'Tampilkan lebih sedikit' : 'Tampilkan lebih banyak';
        expandUser.setAttribute('aria-label', expandUser.textContent);
        return;
      }
      const sentFile = e.target.closest('[data-sent-file]');
      if(sentFile){
        e.preventDefault();
        e.stopPropagation();
        openSentFilePreview(sentFile);
        return;
      }
      const btn = e.target.closest('[data-action]');
      if(!btn) return;
      const stack = btn.closest('.ai-stack');
      const bubble = stack?.querySelector('.bubble');
      const text = bubble?.dataset.rawText || bubble?.textContent || '';
      const action = btn.dataset.action;
      if(action === 'run-combined'){ openCodeViewer(btn.dataset.codeId, 'preview'); return; }
      if(action === 'download-image'){ await downloadImageFromStack(stack, btn); return; }
      if(action === 'copy') await copyText(text, btn);
      if(action === 'like' || action === 'dislike'){
        const likeBtn = stack?.querySelector('[data-action="like"]');
        const dislikeBtn = stack?.querySelector('[data-action="dislike"]');
        const wasActive = btn.classList.contains('active');
        likeBtn?.classList.remove('active');
        dislikeBtn?.classList.remove('active');
        if(!wasActive){
          btn.classList.add('active');
          if(stack) stack.dataset.feedback = action;
        }else if(stack){
          delete stack.dataset.feedback;
        }
      }
      if(action === 'share') shareText(text);
      if(action === 'source') stack.querySelector('.source-note')?.classList.toggle('show');
      if(action === 'more'){
        const isOpenForThis = answerMenuPortal?.classList.contains('show') && activeMoreStack === stack;
        isOpenForThis ? closeMoreMenu(answerMenuPortal) : openMoreMenu(answerMenuPortal, btn, stack);
      }
    });
    answerMenuPortal.addEventListener('click', async e => {
      const more = e.target.closest('[data-more]');
      if(!more) return;
      const stackRef = activeMoreStack;
      closeMoreMenu(answerMenuPortal);
      if(more.dataset.more === 'regenerate' && lastUserText){
        const typingMsg = addTypingMessage();
        await sleep(1200);
        await typeWriterInto(typingMsg, makeAiAnswer(lastUserText, lastFilesSnapshot));
      }
      if(more.dataset.more === 'save') saveActiveAnswerToNotes(stackRef);
      if(more.dataset.more === 'report'){
        openReportWithContext(stackRef);
      }
    });

    function setupTopSearch(){
      if(topSearchReady) return;
      topSearchReady = true;
      document.body.insertAdjacentHTML('beforeend', `
        <div class="chat-search-capsule" id="chatSearchCapsule" aria-hidden="true">
          <button type="button" class="chat-search-icon" id="chatSearchRun" aria-label="Cari"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m21 21-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
          <input id="chatSearchInput" type="search" placeholder="Masukkan kata..." autocomplete="off" />
          <button type="button" class="chat-search-close" id="chatSearchClose" aria-label="Tutup pencarian"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
        </div>`);
      $('#chatSearchRun')?.addEventListener('click', runChatSearch);
      $('#chatSearchClose')?.addEventListener('click', closeChatSearch);
      $('#chatSearchInput')?.addEventListener('keydown', e => { if(e.key === 'Enter') runChatSearch(); if(e.key === 'Escape') closeChatSearch(); });
      newChatBtn.addEventListener('click', e => { if(document.body.classList.contains('chat-search-open')){ e.preventDefault(); e.stopImmediatePropagation(); navigateSearch(1); } }, true);
      topMoreBtn.addEventListener('click', e => { if(document.body.classList.contains('chat-search-open')){ e.preventDefault(); e.stopImmediatePropagation(); navigateSearch(-1); } }, true);
    }
    function openChatSearch(){
      setupTopSearch();
      document.body.classList.add('chat-search-open');
      $('#chatSearchCapsule')?.setAttribute('aria-hidden','false');
      newChatBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m0 0 6-6m-6 6-6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span>';
      topMoreBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 19V5m0 0 6 6m-6-6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      closeAllFloatingMenus();
    }
    function closeChatSearch(){
      document.body.classList.remove('chat-search-open');
      $('#chatSearchCapsule')?.setAttribute('aria-hidden','true');
      resetChatHighlights();
      currentSearchHits = [];
      currentSearchIndex = -1;
      newChatBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg><span>Obrolan baru</span>';
      topMoreBtn.innerHTML = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M5 12h.01M12 12h.01M19 12h.01" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>';
    }
    function resetChatHighlights(){
      $$('.msg.ai .bubble').forEach(b => { if(b.dataset.rawText !== undefined){ renderBubbleContent(b, b.dataset.rawText); updateCombinedPreviewButton(b.closest('.msg')); } });
      $$('.msg.user .bubble').forEach(b => { if(b.dataset.rawText !== undefined) b.innerHTML = escapeHtml(b.dataset.rawText); });
    }
    function highlightRenderedContent(root, query){
      const q = String(query || '');
      if(!q || !root) return false;
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escaped, 'ig');
      let found = false;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node){
          const parent = node.parentElement;
          if(!parent || !node.nodeValue || !re.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
          re.lastIndex = 0;
          if(parent.closest('mark,.code-card,.code-viewer,button,svg,script,style')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes = [];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const text = node.nodeValue;
        const frag = document.createDocumentFragment();
        let last = 0;
        text.replace(re, (m, offset) => {
          found = true;
          if(offset > last) frag.appendChild(document.createTextNode(text.slice(last, offset)));
          const mark = document.createElement('mark');
          mark.className = 'chat-hit';
          mark.textContent = m;
          frag.appendChild(mark);
          last = offset + m.length;
          return m;
        });
        if(last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
      return found;
    }
    function shakeChatSearch(){
      const cap = $('#chatSearchCapsule');
      if(!cap) return;
      cap.classList.remove('search-shake');
      void cap.offsetWidth;
      cap.classList.add('search-shake');
      setTimeout(() => cap.classList.remove('search-shake'), 360);
    }
    function runChatSearch(){
      const input = $('#chatSearchInput');
      const q = (input?.value || '').trim();
      resetChatHighlights();
      currentSearchHits = [];
      currentSearchIndex = -1;
      if(!q) return shakeChatSearch();
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escaped, 'ig');
      $$('.bubble').forEach(b => {
        const raw = b.dataset.rawText || b.textContent || '';
        if(!re.test(raw)) return;
        re.lastIndex = 0;
        const msg = b.closest('.msg');
        if(msg?.classList.contains('ai')){
          renderBubbleContent(b, raw);
          updateCombinedPreviewButton(msg);
        }else{
          b.innerHTML = escapeHtml(raw);
        }
        if(highlightRenderedContent(b, q)) currentSearchHits.push(b);
      });
      if(!currentSearchHits.length) return shakeChatSearch();
      navigateSearch(1);
    }
    function navigateSearch(dir=1){
      if(!currentSearchHits.length){ shakeChatSearch(); return; }
      currentSearchHits.forEach(x => x.classList.remove('hit-active-bubble'));
      currentSearchIndex = (currentSearchIndex + dir + currentSearchHits.length) % currentSearchHits.length;
      const el = currentSearchHits[currentSearchIndex];
      el.classList.add('hit-active-bubble');
      ensureElementVisible(el.closest('.msg') || el, 'smooth');
    }

    async function copyText(text, btn){
      let ok = false;
      const value = String(text || '').trim();
      try{
        if(navigator.clipboard && navigator.clipboard.writeText){
          await navigator.clipboard.writeText(value);
          ok = true;
        }
      }catch(e){ ok = false; }

      if(!ok){
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.left = '0';
        ta.style.width = '1px';
        ta.style.height = '1px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus({preventScroll:true});
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        try{ ok = document.execCommand('copy'); }catch(e){ ok = false; }
        document.body.removeChild(ta);
      }

      if(btn && btn.innerHTML !== undefined){
        const old = btn.innerHTML;
        btn.innerHTML = ok ? icons.check : '×';
        btn.classList.add('active');
        setTimeout(() => { btn.innerHTML = old; btn.classList.remove('active'); }, 900);
      }
      return ok;
    }
    async function shareText(text){
      try{
        if(navigator.share){ await navigator.share({title:'DATZON AI', text}); }
        else await copyText(text, document.createElement('button'));
      }catch(e){}
    }
    function downloadText(filename, text){
      const blob = new Blob([text || 'DATZON AI chat kosong.'], {type:'text/plain;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }
    function collectChatText(){
      return $$('.msg').map(msg => {
        const role = msg.classList.contains('user') ? 'User' : 'DATZON AI';
        const bubble = $('.bubble', msg);
        const text = bubble?.dataset.rawText || bubble?.textContent || '';
        return `${role}: ${text}`;
      }).join('\n\n');
    }

    function providerFromSelectedEngine(){
      const own = ownProviderByEngine?.();
      if(own) return sanitizeOwnApiKeyProvider(own.provider);
      if(selectedEngine === 'Groq') return 'groq';
      if(selectedEngine === 'Mistral') return 'mistral';
      return 'googleStudio';
    }
    function providerLabel(provider){
      return provider === 'googleStudio' ? 'Google Studio' : provider === 'groq' ? 'Groq' : 'Mistral';
    }
    function providerAlternatives(provider){
      return ['mistral','groq','googleStudio'].filter(x => x !== provider).map(providerLabel).join(' / ');
    }
    function sanitizeApiKeyValue(value=''){
      return String(value || '')
        .replace(/^\s*Bearer\s+/i, '')
        .replace(/[\u200B-\u200F\uFEFF]/g, '')
        .replace(/[\r\n\t\s]/g, '')
        .replace(/^['"]+|['"]+$/g, '')
        .trim();
    }
    function normalizeKeyList(value, fallback=''){
      const arr = Array.isArray(value) ? value : (value ? [value] : []);
      const clean = arr.map(sanitizeApiKeyValue).filter(Boolean);
      const fb = sanitizeApiKeyValue(fallback);
      if(!clean.length && fb) clean.push(fb);
      return clean;
    }
    function rotateKeys(keys, activeIndex=0){
      if(!keys.length) return [];
      const start = Math.max(0, Math.min(keys.length - 1, Number(activeIndex) || 0));
      return [...keys.slice(start), ...keys.slice(0, start)].map((key, offset) => ({key, keyIndex:(start + offset) % keys.length}));
    }
    function providerConfig(provider=null){
      const explicitProvider = String(provider || '').trim();
      const explicitOwn = explicitProvider && isOwnProviderValue(explicitProvider) ? ownProviderByEngine?.(explicitProvider) : null;
      const selectedOwn = explicitOwn || (provider ? null : ownProviderByEngine?.());
      const p = selectedOwn ? sanitizeOwnApiKeyProvider(selectedOwn.provider) : (provider || providerFromSelectedEngine());
      const keysCfg = window.DATZON_AI_KEYS || {};
      const models = window.DATZON_AI_MODELS || {};
      const mistralCfg = window.DATZON_MISTRAL_CONFIG || {};
      const groqCfg = window.DATZON_GROQ_CONFIG || {};
      const studioCfg = window.DATZON_GOOGLE_STUDIO_CONFIG || {};
      const cfg = p === 'groq' ? groqCfg : p === 'googleStudio' ? studioCfg : mistralCfg;
      const modelCfg = p === 'groq' ? models.groq : p === 'googleStudio' ? models.googleStudio : models.mistral;
      let keys = p === 'groq'
        ? normalizeKeyList(keysCfg.groqKeys, keysCfg.groq).slice(0,4)
        : p === 'googleStudio'
          ? normalizeKeyList(keysCfg.googleStudioKeys || keysCfg.studioKeys || keysCfg.googleKeys, keysCfg.googleStudio).slice(0,4)
          : normalizeKeyList(keysCfg.mistralKeys, keysCfg.mistral).slice(0,4);
      let label = providerLabel(p);
      let customKeyId = '';
      let customStorage = '';
      if(selectedOwn){
        keys = [sanitizeApiKeyValue(selectedOwn.key || '')];
        label = sanitizeOwnApiKeyName(selectedOwn.name);
        customKeyId = selectedOwn.id;
        customStorage = selectedOwn.storage || 'local';
      }
      const fallbackIndex = Number.isFinite(Number(cfg.activeKeyIndex)) ? Number(cfg.activeKeyIndex)
        : p === 'groq' ? (Number(keysCfg.activeGroqKeyIndex) || 0)
        : p === 'googleStudio' ? (Number(keysCfg.activeGoogleStudioKeyIndex) || 0)
        : (Number(keysCfg.activeMistralKeyIndex) || 0);
      const activeIndex = customKeyId ? 0 : getProviderActiveIndex(p, fallbackIndex);
      return {
        provider:p,
        label,
        customKeyId,
        customStorage,
        enabled: cfg.enabled !== false,
        keys,
        activeKeyIndex: activeIndex,
        endpoint: cfg.endpoint || modelCfg?.endpoint || (p === 'groq' ? 'https://api.groq.com/openai/v1/chat/completions' : p === 'googleStudio' ? 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent' : 'https://api.mistral.ai/v1/chat/completions'),
        model: cfg.model || modelCfg?.model || (p === 'groq' ? 'openai/gpt-oss-20b' : p === 'googleStudio' ? 'gemini-2.5-flash' : 'mistral-small-latest'),
        visionModel: cfg.visionModel || modelCfg?.visionModel || (p === 'groq' ? '' : p === 'googleStudio' ? 'gemini-2.5-flash' : 'pixtral-12b-latest'),
        documentModel: cfg.documentModel || modelCfg?.documentModel || (p === 'googleStudio' ? 'gemini-2.5-flash' : ''),
        temperature: Number.isFinite(Number(cfg.temperature)) ? Number(cfg.temperature) : 0.7,
        maxTokens: Number.isFinite(Number(cfg.maxTokens)) ? Number(cfg.maxTokens) : 6144,
        timeoutMs: Number.isFinite(Number(cfg.timeoutMs)) ? Number(cfg.timeoutMs) : 90000
      };
    }
    function currentAiConfig(){
      const cfg = providerConfig();
      const current = rotateKeys(cfg.keys, cfg.activeKeyIndex)[0] || {key:'', keyIndex:0};
      return {...cfg, key:current.key, keyIndex:current.keyIndex};
    }
    function isDummyApiKey(key){
      const k = String(key || '').trim();
      if(!k) return true;
      return /DUMMY|GANTI|PASTE|ISI_|YOUR_|BELUM_DIPAKAI|PLACEHOLDER/i.test(k) || k.length < 20;
    }
    function selectedProviderHasNoRealKey(){
      try{
        const cfg = providerConfig();
        return !rotateKeys(cfg.keys, cfg.activeKeyIndex).some(k => !isDummyApiKey(k.key));
      }catch(e){ return false; }
    }
    function selectedProviderUsesOwnApiKey(){
      try{ return !!ownProviderByEngine?.(); }catch(e){ return false; }
    }
    function providerApiKeyPlaceName(provider){
      return provider === 'googleStudio' ? 'Google AI Studio' : provider === 'groq' ? 'GroqCloud' : 'Mistral Console';
    }
    function providerTemplateMessage(cfg, kind='dummy'){
      const label = cfg?.label || engineShort();
      const provider = cfg?.provider || providerFromSelectedEngine();
      const place = providerApiKeyPlaceName(provider);
      if(kind === 'dummy'){
        if(cfg?.customKeyId) return `${label} belum aktif karena API key custom kosong, terlalu pendek, atau belum kebaca. Buka API Key Sendiri, simpan ulang key-nya, lalu pilih provider ${label} lagi.`;
        return `${label} belum aktif karena belum ada API key ${label} yang valid. Kamu bisa ambil API key dari ${place}, atau pakai API key sendiri di website ini.`;
      }
      if(cfg?.customKeyId){
        return `${label} sedang error, kuota habis, model tidak cocok, atau API key pribadi ini rusak. Kamu bisa ambil API key baru dari ${place}, lalu simpan ulang di halaman API Key Sendiri.`;
      }
      return `${label} sedang error, kuota habis, model tidak cocok, atau API key-nya rusak. Kamu bisa ambil API key dari ${place}, pakai API key sendiri, atau ganti pilihan AI ke ${providerAlternatives(provider)}. Obrolan sebelumnya tetap ikut dikirim, jadi konteksnya tetap kebawa.`;
    }
    function currentPersonalizationPrompt(){
      try{
        if($('#customInstruction')) profileState.instruction = $('#customInstruction').value || profileState.instruction || '';
        if($('#memoryNickname')) profileState.nickname = $('#memoryNickname').value || profileState.nickname || '';
        if($('#memoryJob')) profileState.job = $('#memoryJob').value || profileState.job || '';
        if($('#memoryAbout')) profileState.about = $('#memoryAbout').value || profileState.about || '';
      }catch(e){}
      const traits = profileState.traits || defaultProfileState.traits || {};
      const toneMap = {
        'Default':'Netral, jelas, tidak lebay.',
        'Profesional':'Rapi, presisi, cocok untuk kerja dan bisnis.',
        'Ramah':'Lebih hangat, akrab, tetap tidak berlebihan.',
        'Jujur':'Terus terang, to the point, jelaskan batasan kalau tidak tahu.',
        'Nyentrik':'Lebih imajinatif, kreatif, dan sedikit playful.',
        'Efisien':'Sangat singkat, langsung inti, anti muter-muter.',
        'Sinis':'Kritis dan sarkastis ringan, tapi tetap membantu dan tidak menghina user.'
      };
      const styleMap = {
        'Normal':'Jawaban standar, seimbang, aman untuk percakapan umum.',
        'Santai':'Bahasa lebih ngobrol, kasual, enak dibaca.',
        'Profesional':'Jawaban rapi, bisnis, dan terstruktur.',
        'Marketing':'Fokus copywriting, jualan, CTA, dan persuasi yang tidak norak.',
        'Ringkas':'Pendek, padat, jangan panjang kecuali diminta.',
        'Formal':'Gunakan bahasa resmi dan tertata.',
        'Storytelling':'Lebih naratif, runtut, dan enak diikuti.',
        'SMK Mode':'Bahasa gampang, praktis, contoh konkret, tidak sok profesor.'
      };
      const lines = [
        `Gaya/nada dasar dari settings: ${profileState.tone || 'Default'} - ${toneMap[profileState.tone] || toneMap.Default}`,
        `Mode jawaban dari composer: ${selectedStyle} - ${styleMap[selectedStyle] || styleMap.Normal}`,
        `Level model UI: ${selectedLevel}. Jangan klaim kemampuan yang belum ada.`,
        `Karakteristik: hangat=${traits.warm || 'Default'}, antusias=${traits.enthusiasm || 'Default'}, judul_daftar=${traits.lists || 'Default'}, emoji=${traits.emoji || 'Default'}.`,
        profileState.quickAnswer ? 'Jawaban cepat aktif: prioritaskan jawaban langsung, jangan kepanjangan kecuali user minta detail.' : 'Jawaban cepat nonaktif: boleh jawab lebih dalam dan lengkap.',
        'Jika judul/daftar = Lebih banyak, gunakan struktur judul dan bullet seperlunya. Jika Lebih sedikit, gunakan paragraf mengalir.',
        'Jika emoji = Lebih banyak, emoji boleh muncul secukupnya. Jika Lebih sedikit, hampir jangan pakai emoji.',
        'Jika hangat = Lebih banyak, respons lebih akrab. Jika Lebih sedikit, lebih klinis/profesional.',
        'Jika antusias = Lebih banyak, respons lebih energik. Jika Lebih sedikit, respons lebih tenang.'
      ];
      if(profileState.memory){
        const mem = [
          profileState.nickname ? `Nama panggilan user: ${profileState.nickname}` : '',
          profileState.job ? `Pekerjaan/peran user: ${profileState.job}` : '',
          profileState.about ? `Info tambahan tentang user: ${profileState.about}` : ''
        ].filter(Boolean).join('\n');
        lines.push(mem ? `Memori aktif. Gunakan data ini kalau relevan:\n${mem}` : 'Memori aktif, tapi belum ada data user yang berarti. Jangan ngarang nama user.');
      }else{
        lines.push('Memori nonaktif. Jangan mengklaim tahu nama/pekerjaan/preferensi user kecuali user menyebutnya di chat terbaru.');
      }
      if(profileState.instruction) lines.push(`Instruksi khusus user: ${profileState.instruction}`);
      lines.push('Format jawaban: boleh pakai Markdown. Untuk tebal gunakan **teks**. Jangan biarkan simbol markdown mentah berantakan. Jangan pernah menampilkan baris metadata internal seperti Mode:, Model:, atau Sumber:.');
      lines.push('Kalau memberi kode, WAJIB pakai fenced code block dengan bahasa, contoh ```html, dan WAJIB tutup dengan ``` setelah kodenya selesai. Jangan taruh kode panjang sebagai paragraf biasa. Kalau bukan kode, jangan pakai fenced block.');
      lines.push('Untuk kode website/aplikasi: pisahkan penjelasan dan kode. Penjelasan tetap teks biasa, kode saja yang masuk fenced code block. Jika banyak file, buat judul nama file lalu fenced code block per file.');
      lines.push('Kode harus lengkap dan tidak terpotong di tengah tag/fungsi. Jika terlalu panjang, buat versi lebih ringkas tetapi tetap utuh, valid, dan ada closing tag/kurung yang selesai.');
      return lines.filter(Boolean).join('\n');
    }
    function providerCanReceiveVisual(cfg, files=[]){
      const hasVisual = (files || []).some(x => x?.aiDataUrl && (x.aiKind === 'image' || /^image\//i.test(x.aiMime || '')));
      const hasPdf = (files || []).some(x => x?.aiDataUrl && (x.aiKind === 'pdf' || /pdf/i.test(x.aiMime || '')));
      if(!hasVisual && !hasPdf) return false;
      if(cfg?.provider === 'googleStudio') return true;
      if(hasPdf) return false;
      if(cfg?.provider === 'mistral') return true;
      if(cfg?.provider === 'groq') return !!cfg.visionModel && /vision|llama-4|scout|maverick/i.test(String(cfg.model || cfg.visionModel || ''));
      return false;
    }
    function providerEffectiveConfigForFiles(cfg, files=[]){
      const hasImage = (files || []).some(x => x?.aiDataUrl && (x.aiKind === 'image' || /^image\//i.test(x.aiMime || '')));
      const hasPdf = (files || []).some(x => x?.aiDataUrl && (x.aiKind === 'pdf' || /pdf/i.test(x.aiMime || '')));
      if(cfg.provider === 'mistral' && hasImage && cfg.visionModel){
        return {...cfg, model:cfg.visionModel, usingVisionModel:true};
      }
      if(cfg.provider === 'groq' && hasImage && cfg.visionModel && !/vision|llama-4|scout|maverick/i.test(String(cfg.model || ''))){
        return {...cfg, model:cfg.visionModel, usingVisionModel:true};
      }
      if(cfg.provider === 'googleStudio' && (hasImage || hasPdf) && cfg.documentModel){
        return {...cfg, model: hasPdf ? cfg.documentModel : (cfg.visionModel || cfg.model), usingVisionModel:hasImage, usingDocumentModel:hasPdf};
      }
      return cfg;
    }
    function fileLanguageHint(name='', type=''){
      const n = String(name).toLowerCase();
      if(/\.html?$/.test(n)) return 'html';
      if(/\.css$/.test(n)) return 'css';
      if(/\.(js|mjs|cjs)$/.test(n)) return 'javascript';
      if(/\.json$/.test(n)) return 'json';
      if(/\.md|markdown/.test(n)) return 'markdown';
      if(/\.csv$/.test(n)) return 'csv';
      if(/\.xml$/.test(n)) return 'xml';
      if(/\.svg$/.test(n)) return 'svg';
      if(/\.py$/.test(n)) return 'python';
      if(/\.php$/.test(n)) return 'php';
      if(/\.sql$/.test(n)) return 'sql';
      if(/json/i.test(type)) return 'json';
      if(/javascript/i.test(type)) return 'javascript';
      if(/html/i.test(type)) return 'html';
      if(/css/i.test(type)) return 'css';
      return 'text';
    }
    function attachmentContextText(files=[], cfg=null){
      const list = (files || []).filter(Boolean);
      if(!list.length) return '';
      const visualOk = cfg ? providerCanReceiveVisual(cfg, list) : false;
      const lines = [
        `User mengirim ${list.length} file/lampiran. Baca isi file yang tersedia di bawah ini. Jangan ngarang isi file yang tidak tersedia.`
      ];
      list.forEach((item, idx) => {
        const name = item.aiName || item.file?.name || item.name || `file-${idx+1}`;
        const type = item.aiMime || item.file?.type || item.type || 'unknown';
        const size = Number(item.aiSize || item.file?.size || item.size || 0);
        lines.push(`\n[File ${idx+1}] ${name} | ${type} | ${formatBytes(size)}`);
        if(item.aiText){
          const lang = fileLanguageHint(name, type);
          lines.push(`Isi teks ${name}${item.aiTextTruncated ? ' (dipotong karena terlalu panjang)' : ''}:\n\`\`\`${lang}\n${item.aiText}\n\`\`\``);
        }else if(item.aiDataUrl && (item.aiKind === 'image' || /^image\//i.test(type))){
          lines.push(visualOk ? 'Gambar ini dikirim sebagai input visual. Analisis isi visualnya kalau user bertanya tentang gambar.' : 'Ini file gambar. Provider/model yang dipilih belum menerima input visual langsung, jadi jangan pura-pura melihat detail gambarnya. Sarankan pakai Google Studio/Gemini atau Mistral vision.');
        }else if(item.aiDataUrl && (item.aiKind === 'pdf' || /pdf/i.test(type))){
          lines.push(cfg?.provider === 'googleStudio' ? 'PDF ini dikirim sebagai inline document ke Google Studio. Analisis isi dokumennya kalau model mendukung.' : 'Ini PDF. Provider yang dipilih belum menerima PDF langsung di mode ini. Minta user ekstrak teks atau gunakan Google Studio.');
        }else if(item.aiNote){
          lines.push(`Catatan pembacaan: ${item.aiNote}`);
        }else if(item.aiReadError){
          lines.push(`File gagal dibaca di browser: ${item.aiReadError}`);
        }else{
          lines.push('Metadata file tersedia, tapi isi file belum bisa dibaca langsung.');
        }
      });
      return lines.join('\n');
    }
    function buildUserContentForProvider(text, files=[], cfg=null){
      const baseText = String(text || '').trim() || '[User mengirim file tanpa teks]';
      const ctx = attachmentContextText(files, cfg);
      const finalText = ctx ? `${baseText}\n\n--- LAMPIRAN USER ---\n${ctx}` : baseText;
      const canVisual = cfg ? providerCanReceiveVisual(cfg, files) : false;
      if(!canVisual) return finalText;
      const parts = [{type:'text', text:finalText}];
      (files || []).forEach(item => {
        const name = item.aiName || item.file?.name || item.name || 'file';
        const mime = item.aiMime || item.file?.type || item.type || guessMimeFromName(name);
        const visionUrl = item.cloudUrl || item.aiDataUrl;
        if(!visionUrl) return;
        if(/^image\//i.test(mime) || item.aiKind === 'image' || item.kind==='image'){
          parts.push({
  type: 'image_url',
  image_url: visionUrl
});
        }else if(cfg?.provider === 'googleStudio' && (/pdf/i.test(mime) || item.aiKind === 'pdf')){
          parts.push({type:'inline_file', data_url:item.aiDataUrl, mime_type:mime || 'application/pdf', name});
        }
      });
      return parts.length > 1 ? parts : finalText;
    }
    function buildProviderMessages(text, files=[], cfg=null){
      const effectiveCfg = cfg || providerConfig();
      const fileLine = files.length ? `\nLampiran user tersedia: ${files.map(x => `${x.aiName || x.file?.name || x.name || 'file'} (${x.aiMime || x.file?.type || x.type || 'unknown'})`).join(', ')}. Baca teks/visual yang benar-benar dikirim di pesan user. Kalau lampiran belum bisa dibaca oleh provider, jujur saja.` : '';
      const system = [
        'Kamu adalah DATZON AI, asisten chat untuk website DATZON.',
        'Jawab mengikuti bahasa yang dipakai user pada pesan terakhir. Kalau user memakai bahasa Jepang, jawab Jepang; kalau English, jawab English; kalau Indonesia/Melayu, jawab Indonesia/Melayu santai. Jangan memaksa bahasa UI sebagai bahasa jawaban.',
        'Jangan sebut dirimu dummy. Website sudah masuk mode serius.',
        'Tetap membantu. Sarkasme boleh ringan sesuai settings, tapi jangan kasar berlebihan.',
        currentPersonalizationPrompt(),
        'Kalau user bertanya nama mereka dan memori punya nama panggilan, jawab nama tersebut dengan jelas. Kalau belum ada, bilang belum tahu dan arahkan isi Memori/Login.',
        'Kalau user minta kode website/aplikasi, berikan kode yang bisa dipakai, rapi, dan pisahkan dalam fenced code block.',
        'Jangan tulis metadata internal seperti Mode:, Model:, Sumber:, atau nama setting di dalam jawaban. Itu urusan UI, bukan bahan dipamerin ke user.',
        'Kalau jawaban bukan kode, jangan gunakan fenced code block. Rumus matematika sederhana tetap teks biasa, bukan blok kode.',
        'Kalau user bertanya isi gambar/file dan lampirannya terbaca, jawab berdasarkan isi lampiran. Kalau tidak terbaca, bilang batasannya dengan jelas, jangan sok tahu kayak cenayang low budget.',
        fileLine
      ].filter(Boolean).join('\n');
      const history = collectChatMessages()
        .slice(-18)
        .map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: String(m.text || '').slice(0, 7000) }))
        .filter(m => m.content.trim());
      const currentUserContent = buildUserContentForProvider(text, files, effectiveCfg);
      if(history.length && history[history.length - 1].role === 'user') history[history.length - 1].content = currentUserContent;
      else history.push({role:'user', content:currentUserContent});
      return [{role:'system', content:system}, ...history];
    }
    const buildMistralMessages = buildProviderMessages;
    function parseOpenAiLikeContent(data){
      const choice = data?.choices?.[0] || {};
      const content = choice?.message?.content;
      const textOut = Array.isArray(content) ? content.map(x => x.text || x.content || '').join('') : String(content || '').trim();
      return {text:textOut, finishReason:String(choice.finish_reason || choice.finishReason || '').toLowerCase()};
    }
    function parseGeminiContent(data){
      const cand = data?.candidates?.[0] || {};
      const parts = cand?.content?.parts || [];
      const textOut = parts.map(p => p.text || '').join('').trim();
      return {text:textOut, finishReason:String(cand.finishReason || '').toLowerCase()};
    }
    function geminiPartsFromContent(content){
      if(!Array.isArray(content)) return [{text:String(content || '')}];
      const parts = [];
      content.forEach(part => {
        if(!part) return;
        if(part.type === 'text'){
          if(String(part.text || '').trim()) parts.push({text:String(part.text || '')});
          return;
        }
        if(part.type === 'image_url'){
          const data = dataUrlToInlinePart(part.image_url?.url || '', part.mime_type || 'image/jpeg');
          if(data?.data) parts.push({inline_data:{mime_type:data.mimeType, data:data.data}});
          return;
        }
        if(part.type === 'inline_file'){
          const data = dataUrlToInlinePart(part.data_url || '', part.mime_type || 'application/octet-stream');
          if(data?.data) parts.push({inline_data:{mime_type:data.mimeType, data:data.data}});
          return;
        }
        if(part.text) parts.push({text:String(part.text)});
      });
      return parts.length ? parts : [{text:''}];
    }
    function messagesToGemini(messages){
      const system = messages.find(m => m.role === 'system')?.content || '';
      const contents = messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: geminiPartsFromContent(m.content)
      }));
      return {system, contents};
    }
    function groqCandidateModels(primary=''){
      const list = [
        primary,
        'openai/gpt-oss-20b',
        'llama-3.3-70b-versatile',
        'llama-3.1-8b-instant'
      ].map(x => String(x || '').trim()).filter(Boolean);
      return Array.from(new Set(list));
    }
    function shouldTryNextGroqModel(err){
      const msg = String(err?.message || err || '').toLowerCase();
      return /model|deprecat|not.?found|unsupported|does not exist|is no longer|unavailable|invalid_request/.test(msg);
    }
    async function callGroqOnceWithModel(cfg, key, messages, model){
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
      try{
        const payload = {model, messages, temperature:cfg.temperature, max_completion_tokens:cfg.maxTokens, stream:false};
        if(/gpt-oss|reasoning/i.test(model)) payload.reasoning_effort = 'low';
        const res = await fetch(cfg.endpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization':`Bearer ${sanitizeApiKeyValue(key)}`},
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        let rawText = '';
        try{ rawText = await res.text(); }catch(e){}
        let data = null;
        try{ data = JSON.parse(rawText); }catch(e){}
        if(!res.ok){
          console.error(`${String(cfg.label || 'GROQ').toUpperCase()} FULL ERROR`, rawText);
          const msg = data?.error?.message || data?.message || rawText || `${res.status} ${res.statusText}`;
          const err = new Error(msg);
          err.status = res.status;
          throw err;
        }
        const out = parseOpenAiLikeContent(data);
        if(!out.text) throw new Error(`Respons ${cfg.label} kosong`);
        return {...out, modelUsed:model};
      }finally{
        clearTimeout(timer);
      }
    }
    async function callProviderOnce(cfg, key, messages){
      key = sanitizeApiKeyValue(key);
      if(cfg.provider === 'groq'){
        let lastErr = null;
        for(const model of groqCandidateModels(cfg.model)){
          try{
            const out = await callGroqOnceWithModel(cfg, key, messages, model);
            if(out.modelUsed && out.modelUsed !== cfg.model) cfg.model = out.modelUsed;
            return out;
          }catch(err){
            lastErr = err;
            if(!shouldTryNextGroqModel(err)) throw err;
            console.warn(`${cfg.label} model ${model} gagal, coba model Groq cadangan:`, err);
          }
        }
        throw lastErr || new Error(`${cfg.label} gagal memanggil Groq`);
      }
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
      try{
        if(cfg.provider === 'googleStudio'){
          const g = messagesToGemini(messages);
          const url = `${cfg.endpoint}${cfg.endpoint.includes('?') ? '&' : '?'}key=${encodeURIComponent(key)}`;
          const res = await fetch(url, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
              contents: g.contents,
              systemInstruction: g.system ? {parts:[{text:g.system}]} : undefined,
              generationConfig:{temperature:cfg.temperature, maxOutputTokens:cfg.maxTokens}
            }),
            signal: controller.signal
          });
          let data = null;
          try{ data = await res.json(); }catch(e){}
          if(!res.ok){
            const msg = data?.error?.message || `${res.status} ${res.statusText}`;
            throw new Error(msg);
          }
          const out = parseGeminiContent(data);
          if(!out.text) throw new Error('Respons Google Studio kosong');
          return out;
        }
        const payload = cfg.provider === 'groq'
          ? {model:cfg.model, messages, temperature:cfg.temperature, max_completion_tokens:cfg.maxTokens, stream:false, reasoning_effort:'low'}
          : {model:cfg.model, messages, temperature:cfg.temperature, max_tokens:cfg.maxTokens, stream:false};
        const res = await fetch(cfg.endpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization':`Bearer ${sanitizeApiKeyValue(key)}`},
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        let rawText = '';

try {
  rawText = await res.text();
} catch (e) {}

let data = null;

try {
  data = JSON.parse(rawText);
} catch (e) {}

if (!res.ok) {
  
  console.error(
    `${String(cfg.label || 'PROVIDER').toUpperCase()} FULL ERROR`,
    rawText
  );
  
  const msg =
    data?.error?.message ||
    data?.message ||
    rawText ||
    `${res.status} ${res.statusText}`;
  
  throw new Error(msg);
}
        const out = parseOpenAiLikeContent(data);
        if(!out.text) throw new Error(`Respons ${cfg.label} kosong`);
        return out;
      }finally{
        clearTimeout(timer);
      }
    }
    async function callProviderWithKey(cfg, keyInfo, text, files=[]){
      let messages = buildProviderMessages(text, files, cfg);
      let output = '';
      let finishReason = '';
      for(let round=0; round<3; round++){
        const out = await callProviderOnce(cfg, keyInfo.key, messages);
        output += (output && out.text ? '\n' : '') + out.text;
        finishReason = String(out.finishReason || '').toLowerCase();
        if(!/length|max_tokens|max_output|token/i.test(finishReason)) break;
        messages = [
          ...buildProviderMessages(text, files, cfg),
          {role:'assistant', content:output},
          {role:'user', content:'Lanjutkan tepat dari bagian terakhir yang terpotong. Jangan ulangi dari awal. Jika sedang menulis kode, teruskan kode sampai lengkap dan tutup fenced code block dengan ```.'}
        ];
      }
      const finalText = output.trim();
      if(!finalText) throw new Error(`Respons ${cfg.label} kosong`);
      return finalText;
    }
    async function callSelectedProvider(text, files=[]){
      await prepareFilesForAi(files);
      const baseCfg = providerConfig();
      const cfg = providerEffectiveConfigForFiles(baseCfg, files);
      if(!cfg.enabled) throw new Error(`${cfg.label} dinonaktifkan di firebase.js`);
      const usable = rotateKeys(cfg.keys, cfg.activeKeyIndex).filter(k => !isDummyApiKey(k.key));
      if(!usable.length){
        const err = new Error(`${cfg.label} belum punya API key asli di firebase.js`);
        err.noUsableKeys = true;
        err.cfg = cfg;
        throw err;
      }
      const errors = [];
      for(const keyInfo of usable){
        try{
          const aiText = await callProviderWithKey(cfg, keyInfo, text, files);
          if(!cfg.customKeyId) setProviderActiveIndex(cfg.provider, keyInfo.keyIndex);
          const modeNote = cfg.usingVisionModel ? ' • vision aktif' : (cfg.usingDocumentModel ? ' • document aktif' : '');
          return {text:aiText, source:`Sumber: ${cfg.label} API key #${keyInfo.keyIndex + 1} • ${cfg.model}${modeNote}.`};
        }catch(err){
          errors.push(`#${keyInfo.keyIndex + 1}: ${err.message || err.code || err}`);
          console.warn(`${cfg.label} API key #${keyInfo.keyIndex + 1} gagal, coba slot berikutnya:`, err);
        }
      }
      const err = new Error(errors.join(' | ') || `${cfg.label} gagal semua`);
      err.cfg = cfg;
      err.allKeysFailed = true;
      throw err;
    }
    async function getAiAnswer(text, files=[]){
      try{
        return await callSelectedProvider(text, files);
      }catch(err){
        const cfg = err.cfg || providerConfig();
        const label = cfg?.label || engineShort();
        if(err.noUsableKeys){
          return {
            text: providerTemplateMessage(cfg, 'dummy'),
            source: `Sumber: ${label} belum punya API key asli.`,
            apiKeyActions: true,
            systemUi: true,
            apiKeyProvider: cfg?.provider || providerFromSelectedEngine()
          };
        }
        return {
          text: providerTemplateMessage(cfg, 'error'),
          source: `Sumber: ${label} gagal semua key. Detail disembunyikan dari chat, cek console kalau mau bedah mayat error.`,
          apiKeyActions: true,
          systemUi: true,
          apiKeyProvider: cfg?.provider || providerFromSelectedEngine()
        };
      }
    }

    function decorateGoogleApiKeyHelp(msg, provider='googleStudio'){
      const bubble = msg?.querySelector?.('.bubble');
      if(!bubble || bubble.querySelector('.api-key-help-actions')) return;
      const p = sanitizeOwnApiKeyProvider(provider);
      const box = document.createElement('div');
      box.className = 'api-key-help-actions limit-action-grid';
      box.innerHTML = `<button class="primary-wide secondary" type="button" data-api-key-action="get-${escapeAttr(p)}">Ambil API key</button><button class="primary-wide" type="button" data-api-key-action="own">Pakai API key sendiri</button>`;
      bubble.appendChild(box);
      uiApplySoon(box);
    }

    function makeAiAnswer(text, files){
      const q = text.toLowerCase();
      const fileInfo = files.length ? `\n\nGue juga nerima ${files.length} file: ${files.map(x => x.file.name).join(', ')}. File masih dipreview di UI, belum dianalisis beneran.` : '';
      if(/(nama\s+(gua|aku|saya)|siapa\s+nama\s+(gua|aku|saya)|panggil\s+(gua|aku|saya))/i.test(q)){
        const knownName = (profileState.memory && (profileState.nickname || profileState.name)) ? (profileState.nickname || profileState.name) : '';
        return knownName ? `Nama kamu **${knownName}**. Itu ngambil dari Memori/Profile, bukan hasil nebak-nebak kayak dukun WiFi.${fileInfo}` : `Nama kamu belum tersimpan di Memori. Isi dulu di halaman **Memori** bagian nama panggilan, baru DATZON AI bisa jawab tanpa pura-pura cenayang.${fileInfo}`;
      }
      if(/(buat|bikin|contoh).*(html|css|javascript|js|website|kode|landing page|navbar)/i.test(q)){
        return `Ini contoh kode dasar yang bisa langsung dites:\n\n\`\`\`html\n<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>DATZON Demo</title>\n  <style>\n    body { margin:0; min-height:100vh; display:grid; place-items:center; font-family:system-ui; background:#08050f; color:#f7fff1; }\n    .card { width:min(420px,92vw); padding:28px; border-radius:28px; background:#15101f; border:1px solid rgba(173,124,255,.25); }\n    button { border:0; border-radius:999px; padding:14px 18px; font-weight:800; background:#ad7cff; }\n  </style>\n</head>\n<body>\n  <main class="card">\n    <h1>DATZON AI</h1>\n    <p>Contoh komponen sederhana. Tinggal edit, jangan cuma dipandangi.</p>\n    <button onclick="alert('Jalan, boss kecil.')">Tes tombol</button>\n  </main>\n</body>\n</html>\n\`\`\`\n${fileInfo}`;
      }
      if(/^(halo|halow|hai|hello|helo|hi)\b|\b(halo|hai|hello)\b/.test(q)) return `Halo juga. Gue DATZON AI yang siap bantu. Sekarang respons diarahkan ke provider AI kalau API key sudah dipasang.\n\nTema aksen ${accentThemes[profileState.accent]?.label || 'Lime'} aktif, header udah jadi liquid glass, mode sementara siap, attach file scroll samping, mic pakai stop merah, dan tombol kirim berubah jadi loading.${fileInfo}`;
      if(q.includes('fitur')) return `Fitur aktif: chat template, attach semua jenis file, preview gambar/PDF/file, hapus file, writing style, model picker, sidebar, mode sementara 24 jam, mic, typing animation, typewriter, action tools, dan export chat.${fileInfo}`;
      if(q.includes('email') || q.includes('customer')) return `Template balasan customer:\n\nHalo Kak, terima kasih sudah menghubungi DATZON. Mohon kirim detail kendala, screenshot, dan urutan masalahnya agar bisa kami cek lebih cepat. Nanti kami bantu arahkan sampai selesai.\n\nSalam,\nDATZON Team${fileInfo}`;
      if(q.includes('ringkas') || q.includes('summarize')) return `Ringkasan: website ini adalah UI chat AI dark lime dengan composer fixed, model picker, mode sementara, upload file, voice preview, dan animasi proses agar kelihatan siap disambungkan ke API gratisan.${fileInfo}`;
      if(q.includes('siapa') || q.includes('bikin') || q.includes('datzon')) return `DATZON ini brand/tools hub buatan kreator DATZON. Versi ini mulai disambungkan ke Firebase dan siap diarahkan ke API AI. Jangan dipaksa jadi profesor dulu, server gratisan juga punya batas malu.${fileInfo}`;
      if(files.length && !text) return `File sudah masuk dan bisa dipreview di UI. File sudah masuk, tapi pembacaan isi PDF/gambar perlu API file reader/vision. Kalau mau beneran, sambungkan ke API vision/file reader.${fileInfo}`;
      return `Ini jawaban lokal untuk: "${text}"\n\nBagian respons bisa diarahkan ke Mistral, Groq, atau Google Studio lewat API key yang kamu isi nanti.${fileInfo}`;
    }

    async function getMicPermissionState(){
      try{
        if(navigator.permissions?.query){
          const status = await navigator.permissions.query({name:'microphone'});
          return status?.state || 'prompt';
        }
      }catch(e){}

      try{
        if(localStorage.getItem(MIC_PERMISSION_ACK) === 'granted') return 'granted';
      }catch(e){}

      return 'prompt';
    }

    function showMicPermissionIntro(state='prompt'){
      return new Promise(resolve => {
        const denied = state === 'denied';
        const body = `
          <div class="mic-permission-copy mic-permission-intro">
            <div class="mic-permission-orb" aria-hidden="true">
              <span class="mic-permission-orb-ring"></span>
              <span class="mic-permission-orb-ring second"></span>
              ${icons.mic}
            </div>
            <p class="mic-permission-lead"><b>Izinkan akses mikrofon</b> agar DATZON bisa menangkap suara kamu dan menulisnya langsung ke kolom chat secara real time.</p>
            <p>Tekan <b>Lanjutkan</b>, lalu pilih <b>Izinkan</b> pada pop-up browser yang muncul.</p>
            <p class="mic-permission-note">Jika kamu menolak, membatalkan, atau menutup pop-up izin mikrofon, refresh website lalu tekan tombol mikrofon lagi supaya permintaan izin browser bisa muncul kembali.</p>
            ${denied ? '<p class="mic-permission-warn">Status mikrofon terlihat diblokir. Aktifkan kembali izin Microphone dari ikon kunci/info di address bar atau pengaturan situs browser.</p>' : ''}
          </div>
        `;
        showCustomModal('Akses Mikrofon', body, [
          {label:'Batal', action:'cancel'},
          {label:'Lanjutkan', action:'continue', primary:true}
        ], action => resolve(action === 'continue'));
      });
    }

    function showMicBlockedInfo(){
      showCustomModal('Mikrofon diblokir', `
        <div class="mic-permission-copy mic-permission-intro">
          <div class="mic-permission-orb danger" aria-hidden="true">${icons.mic}</div>
          <p class="mic-permission-lead">Browser belum memberi izin mikrofon untuk website ini, jadi voice input belum bisa dinyalakan.</p>
          <p>Buka pengaturan situs/browser, aktifkan izin <b>Microphone</b>, lalu refresh website dan tekan tombol mikrofon lagi.</p>
        </div>
      `, [{label:'Mengerti', action:'ok', primary:true}]);
    }

    function waitForMicPermission(promise){
      let timer = 0;
      return Promise.race([
        promise.then(stream => ({ok:true, stream})).catch(error => ({ok:false, error})),
        new Promise(resolve => {
          timer = setTimeout(() => resolve({ok:false, timeout:true}), MIC_PERMISSION_WAIT_MS);
        })
      ]).finally(() => clearTimeout(timer));
    }

    async function requestMicAccessIfNeeded(){
      const state = await getMicPermissionState();
      if(state !== 'granted'){
        const proceed = await showMicPermissionIntro(state);
        if(!proceed) return false;
      }

      if(state === 'granted') return true;

      if(!navigator.mediaDevices?.getUserMedia){
        return true;
      }

      const requestSeq = ++micPermissionRequestSeq;
      const result = await waitForMicPermission(navigator.mediaDevices.getUserMedia({audio:true}));

      if(requestSeq !== micPermissionRequestSeq){
        try{ result.stream?.getTracks?.().forEach(track => track.stop()); }catch(e){}
        return false;
      }

      if(result.ok){
        try{ result.stream.getTracks().forEach(track => track.stop()); }catch(e){}
        try{ localStorage.setItem(MIC_PERMISSION_ACK, 'granted'); }catch(e){}
        return true;
      }

      try{ localStorage.removeItem(MIC_PERMISSION_ACK); }catch(e){}

      if(result.timeout){
        showMiniToast?.('Izin mikrofon belum dipilih. Tekan mic lagi untuk mencoba ulang.');
        return false;
      }

      console.warn('Izin mikrofon gagal:', result.error);
      showMicBlockedInfo();
      return false;
    }

    async function startMic() {

      if(isSending || micStartLock) return;
      if(isListening){ stopMic(); return; }

      if(!speechRecognition){
        showCustomModal('Voice tidak didukung', '<p class="modal-muted">Browser ini belum mendukung Speech Recognition. Coba buka lewat Chrome terbaru.</p>', [{label:'Oke', action:'ok', primary:true}]);
        return;
      }

      micStartLock = true;
      const allowed = await requestMicAccessIfNeeded();
      if(!allowed){
        micStartLock = false;
        return;
      }

      speechBaseText = (promptEl?.value || '').trim();
      micStopRequested = false;

      try{
        setTimeout(() => {
          try{
            speechRecognition.start();
          }catch(err){
            micStartLock = false;
            console.error(err);
            showMiniToast?.('Speech gagal dimulai. Coba tekan mikrofon lagi.');
          }
        }, 120);
      }catch(err){
        micStartLock = false;
        console.error(err);
        showMiniToast?.('Speech gagal: ' + (err?.message || err));
      }
    }

    function stopMic() {
      if(!isListening && !micStartLock) return;

      micStopRequested = true;
      micPermissionRequestSeq++;
      clearTimeout(micRestartTimer);
      clearMicIdleTimer();
      micRestartTimer = 0;

      try{
        speechRecognition?.stop();
      }catch(e){
        try{ speechRecognition?.abort(); }catch(err){}
      }

      finishMicSession();
    }
    micBtn.addEventListener('click', startMic);


    /* V10 settings + localStorage. Karena kalau belum pakai Firebase, ya localStorage dulu. Jangan sok cloud. */
    const STORAGE_PROFILE = 'datzonAiProfileV10';
    const STORAGE_CHATS = 'datzonAiChatsV10';
    const STORAGE_PASSWORD_HASH = 'datzonAiPasswordHashV17';
    const STORAGE_BUG_REPORTS = 'datzonAiBugReportsV17';
    const STORAGE_SESSIONS = 'datzonAiSessionsV17';
    const STORAGE_NOTES = 'datzonAiNotesV27';

    const defaultProfileState = {
      name: 'DATZON User',
      appearance: 'dark',
      accent: 'lime',
      tone: 'Sinis',
      quickAnswer: true,
      memory: true,
      photoURL: '',
      email: '',
      role: 'user',
      nickname: '',
      job: '',
      about: '',
      instruction: '',
      language: 'Indonesia',
      traits: {
        warm: 'Default',
        enthusiasm: 'Default',
        lists: 'Default',
        emoji: 'Default'
      },
      claimedDays: [],
      checkinState: {claimedDays:[], lastClaimDate:'', vouchers:[]},
      freeLimitState: {ads:{date:'', completed:[], claimed:false, voucherCode:''}, socials:{completed:[], claimed:false, voucherCode:''}},
      rank: 'Guest',
      rankImmortalUntil: '',
      redeemedVouchers: [],
      shakeReport: true
    };

    const accentThemes = {
      lime:   {label:'Lime', color:'#c6ff34', rgb:'198,255,52', lime2:'#9ee91e', lime3:'#64b412', dot:'#c6ff34', bg:'#050805', bg2:'#0a1007', panel:'#0d160a', panel2:'#14220f'},
      blue:   {label:'Biru', color:'#38a7ff', rgb:'56,167,255', lime2:'#1678ff', lime3:'#0954b8', dot:'#38a7ff', bg:'#02070d', bg2:'#04101a', panel:'#071724', panel2:'#0b2233'},
      green:  {label:'Hijau', color:'#20e484', rgb:'32,228,132', lime2:'#12bf68', lime3:'#098747', dot:'#20e484', bg:'#020b07', bg2:'#04150d', panel:'#071b10', panel2:'#0c2918'},
      yellow: {label:'Kuning', color:'#ffd83d', rgb:'255,216,61', lime2:'#f3b90b', lime3:'#b77f00', dot:'#ffd83d', bg:'#0b0802', bg2:'#151005', panel:'#1c1506', panel2:'#2b2008'},
      pink:   {label:'Merah Jambu', color:'#ff5f93', rgb:'255,95,147', lime2:'#f42b73', lime3:'#bc1551', dot:'#ff5f93', bg:'#0d0408', bg2:'#16070d', panel:'#1f0b13', panel2:'#2c101a'},
      orange: {label:'Oranye', color:'#ff9b2f', rgb:'255,155,47', lime2:'#ff7a18', lime3:'#c64d00', dot:'#ff9b2f', bg:'#0d0602', bg2:'#180b04', panel:'#211006', panel2:'#301707'},
      purple: {label:'Ungu', color:'#ad7cff', rgb:'173,124,255', lime2:'#8b5cf6', lime3:'#673ab7', dot:'#ad7cff', bg:'#08050f', bg2:'#0f0820', panel:'#170d2a', panel2:'#21133a'}
    };

    let profileState = loadProfileState();

    function loadProfileState(){
      try{
        return {...defaultProfileState, ...(JSON.parse(localStorage.getItem(STORAGE_PROFILE) || '{}') || {})};
      }catch(e){
        return {...defaultProfileState};
      }
    }
    function saveProfileState(){
      localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profileState));
    }
    function todayKey(date=new Date()){
      const d = date instanceof Date ? date : new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
    function nextLocalMidnightTs(dateLike=Date.now()){
      const d = new Date(dateLike);
      d.setHours(24,0,0,0);
      return d.getTime();
    }
    function addDays(date, days){
      const d = new Date(date);
      d.setDate(d.getDate() + Number(days || 0));
      return d;
    }
    function formatDateID(dateLike){
      const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
      if(Number.isNaN(d.getTime())) return '-';
      const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
      return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
    }
    function isLoggedInUser(){
      try{ return !!window.DATZON_CLOUD?.isLoggedIn?.(); }catch(e){ return document.body.classList.contains('is-logged-in'); }
    }
    function cloudUserEmail(){
      try{ return window.DATZON_CLOUD?.email?.() || profileState.email || ''; }catch(e){ return profileState.email || ''; }
    }
    function getCheckinState(){
      const legacy = Array.isArray(profileState.claimedDays) ? profileState.claimedDays : [];
      const cur = profileState.checkinState || {};
      const claimedDays = Array.from(new Set([...(cur.claimedDays || []), ...legacy].map(Number).filter(n => n >= 1 && n <= 7))).sort((a,b)=>a-b);
      profileState.checkinState = {claimedDays, lastClaimDate:cur.lastClaimDate || '', vouchers:cur.vouchers || []};
      profileState.claimedDays = claimedDays;
      return profileState.checkinState;
    }
    function nextCheckinDay(){
      const claimed = new Set(getCheckinState().claimedDays || []);
      for(let d=1; d<=7; d++) if(!claimed.has(d)) return d;
      return 7;
    }
    function checkinRewardForDay(day){
      const map = {
        1:{chat:10, image:0},
        2:{chat:15, image:0},
        3:{chat:20, image:10},
        4:{chat:25, image:15},
        5:{chat:30, image:20},
        6:{chat:50, image:30},
        7:{chat:0, image:0, rankDays:3, rank:'Immortal'}
      };
      return map[day] || {chat:0, image:0};
    }
    function rewardTextForDay(day){
      const reward = checkinRewardForDay(day);
      if(day === 7) return 'Voucher Trial 3 hari Rank Immortal';
      const parts = [];
      if(reward.chat) parts.push(`+${reward.chat} limit Chat AI`);
      if(reward.image) parts.push(`+${reward.image} limit Gambar AI`);
      return parts.join(' + ') || 'Bonus limit request';
    }
    function makeVoucherCode(){
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let out = '';
      for(let i=0; i<6; i++) out += chars[Math.floor(Math.random()*chars.length)];
      return `DTZIMO-${out}`;
    }
    function currentRankState(){
      const until = profileState.rankImmortalUntil ? new Date(profileState.rankImmortalUntil) : null;
      const active = !!until && until.getTime() > Date.now();
      return {active, name: active ? 'Immortal' : (profileState.rank || 'Guest'), until};
    }
    function isAdminProfile(){
      return String(profileState.role || profileState.profile?.role || '').toLowerCase() === 'admin';
    }
    function adminBadgeHTML(){
      return '<span class="admin-badge" aria-label="Admin" title="Admin"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 20 6.4v5.8c0 4.85-3.25 7.9-8 8.8-4.75-.9-8-3.95-8-8.8V6.4L12 3Z" fill="currentColor" opacity=".92"/><path d="M9 12.2 11.1 14.2 15.5 9.5" stroke="rgba(0,0,0,.72)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    }
    function decoratedProfileNameHTML(name){
      const clean = escapeHtml(cleanNameCandidate(name) || name || 'DATZON User');
      const parts = [`<span>${clean}</span>`];
      if(isAdminProfile()) parts.push(adminBadgeHTML());
      if(currentRankState().active) parts.push(crownSvgHTML());
      return parts.join('');
    }
    function resetRankStateLocalOnly(){
      profileState.rank = 'Guest';
      profileState.rankImmortalUntil = '';
      profileState.redeemedVouchers = [];
      if(profileState.profile){
        profileState.profile.rank = 'Guest';
        profileState.profile.rankImmortalUntil = '';
        profileState.profile.redeemedVouchers = [];
      }
      saveProfileStateLocalOnly ? saveProfileStateLocalOnly() : saveProfileState();
    }
    function addBonusLimit(chatAmount=0, imageAmount=0){
      const state = getLimitState();
      state.bonusChat = Math.max(0, Number(state.bonusChat) || 0) + Math.max(0, Number(chatAmount) || 0);
      state.bonusImage = Math.max(0, Number(state.bonusImage) || 0) + Math.max(0, Number(imageAmount) || 0);
      saveLimitState(state);
      renderLimitRequestUi();
    }
    function rankHasUnlimited(){
      return currentRankState().active;
    }
    async function saveVoucherCloud(voucher){
      try{ await window.DATZON_CLOUD?.createVoucher?.(voucher); }catch(e){ console.warn('Voucher cloud save gagal:', e); }
    }
    async function fetchVoucherCloud(code){
      try{ return await window.DATZON_CLOUD?.getVoucher?.(code); }catch(e){ console.warn('Voucher cloud fetch gagal:', e); return null; }
    }
    async function markVoucherRedeemedCloud(code, payload){
      try{ return await window.DATZON_CLOUD?.redeemVoucher?.(code, payload); }catch(e){ console.warn('Voucher cloud redeem gagal:', e); return null; }
    }
    function upsertLocalVoucher(voucher){
      const arr = Array.isArray(profileState.vouchers) ? profileState.vouchers : [];
      const idx = arr.findIndex(v => String(v.code).toUpperCase() === String(voucher.code).toUpperCase());
      if(idx >= 0) arr[idx] = {...arr[idx], ...voucher}; else arr.push(voucher);
      profileState.vouchers = arr;
      const st = getCheckinState();
      st.vouchers = Array.isArray(st.vouchers) ? st.vouchers : [];
      if(!st.vouchers.includes(voucher.code)) st.vouchers.push(voucher.code);
      return voucher;
    }
    function createRankTrialVoucher(days=1, source='free-mission'){
      const voucher = {code:makeVoucherCode(), type:'rank_trial', rank:'Immortal', days:Number(days)||1, status:'unused', ownerEmail:cloudUserEmail(), createdAt:new Date().toISOString(), source};
      upsertLocalVoucher(voucher);
      return voucher;
    }
    function findLocalVoucher(code){
      const clean = String(code || '').trim().toUpperCase();
      return (profileState.vouchers || []).find(v => String(v.code || '').toUpperCase() === clean) || null;
    }
    function showVoucherRewardModal(voucher){
      let modal = document.getElementById('voucherRewardModal');
      if(!modal){
        document.body.insertAdjacentHTML('beforeend', `<div class="voucher-modal" id="voucherRewardModal" aria-hidden="true"><div class="voucher-modal-card"><button class="voucher-modal-x" type="button" data-voucher-close>×</button><div class="voucher-badge">Rank Immortal</div><h3 id="voucherRewardTitle">Hadiah Rank Immortal</h3><p id="voucherRewardDesc">Trial Rank Immortal berhasil dibuat. Simpan kode ini atau tukarkan sekarang.</p><div class="voucher-code" id="voucherRewardCode"></div><div class="voucher-actions"><button type="button" class="primary-wide secondary" data-voucher-copy>Salin Kode</button><button type="button" class="primary-wide" data-voucher-redeem-now>Tukarkan Sekarang</button></div></div></div>`);
        modal = document.getElementById('voucherRewardModal');
        modal.addEventListener('click', e => {
          if(e.target === modal || e.target.closest('[data-voucher-close]')) closeVoucherRewardModal();
          if(e.target.closest('[data-voucher-copy]')){ navigator.clipboard?.writeText($('#voucherRewardCode')?.textContent || ''); showMiniToast?.('Kode voucher disalin.'); }
          if(e.target.closest('[data-voucher-redeem-now]')){ const code = $('#voucherRewardCode')?.textContent || ''; closeVoucherRewardModal(); openSettingsView('redeem'); const input = $('#redeemCodeInput'); if(input){ input.value = code; renderRedeemPreview(null); } }
        });
      }
      $('#voucherRewardTitle') && ($('#voucherRewardTitle').textContent = voucher.source === 'checkin-day-7' ? 'Hadiah Hari ke-7' : 'Hadiah Limit Gratis');
      $('#voucherRewardDesc') && ($('#voucherRewardDesc').textContent = `Voucher Trial ${voucher.days || 1} hari Rank Immortal berhasil dibuat. Salin kode ini atau tukarkan sekarang.`);
      $('#voucherRewardCode') && ($('#voucherRewardCode').textContent = voucher.code);
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    }
    function closeVoucherRewardModal(){
      const modal = $('#voucherRewardModal');
      if(!modal) return;
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
    }
    function applyProfileState(){
      // V14: mode terang dibuang. Dark mode + accent bersih, tanpa sisa lime nyasar.
      profileState.appearance = 'dark';
      document.body.classList.remove('light-mode');
      if(!accentThemes[profileState.accent]) profileState.accent = 'lime';
      const theme = accentThemes[profileState.accent] || accentThemes.lime;
      document.documentElement.style.setProperty('--lime', theme.color, 'important');
      document.documentElement.style.setProperty('--lime-rgb', theme.rgb, 'important');
      document.documentElement.style.setProperty('--lime2', theme.lime2, 'important');
      document.documentElement.style.setProperty('--lime3', theme.lime3, 'important');
      document.documentElement.style.setProperty('--accent', theme.color, 'important');
      document.documentElement.style.setProperty('--accent-rgb', theme.rgb, 'important');
      document.documentElement.style.setProperty('--accent-2', theme.lime2, 'important');
      document.documentElement.style.setProperty('--bg', theme.bg || '#050805', 'important');
      document.documentElement.style.setProperty('--bg2', theme.bg2 || '#0a1007', 'important');
      document.documentElement.style.setProperty('--panel', theme.panel || '#0d160a', 'important');
      document.documentElement.style.setProperty('--panel2', theme.panel2 || '#14220f', 'important');

      const profileName = $('#profileName');
      const profileAvatar = $('#profileAvatar');
      const sideName = $('#sideProfileName') || $('.side-profile-name');
      const sideAvatar = $('#sideAvatar') || $('.side-avatar');
      const cleanName = (profileState.name || 'DATZON User').trim() || 'DATZON User';
      const initials = cleanName.split(/\s+/).slice(0,2).map(x => x[0]).join('').toUpperCase() || 'DZ';
      const rankState = currentRankState();
      const adminState = isAdminProfile();
      document.body.classList.toggle('has-rank-immortal', !!rankState.active);
      document.body.classList.toggle('has-admin-role', !!adminState);
      if(rankState.active) preloadImmortalLogo();
      if(profileName){
        profileName.classList.toggle('immortal-name', !!rankState.active);
        profileName.classList.toggle('admin-name', !!adminState);
        profileName.innerHTML = (rankState.active || adminState) ? decoratedProfileNameHTML(cleanName) : escapeHtml(cleanName);
      }
      if(profileAvatar){
        setNodeTextKeepButtons(profileAvatar, initials);
        profileAvatar.classList.toggle('immortal-avatar', !!rankState.active);
        profileAvatar.classList.toggle('admin-avatar', !!adminState);
      }
      if(sideName){
        sideName.classList.toggle('immortal-name', !!rankState.active);
        sideName.classList.toggle('admin-name', !!adminState);
        sideName.innerHTML = (rankState.active || adminState) ? decoratedProfileNameHTML(cleanName) : escapeHtml(cleanName);
      }
      if(sideAvatar){
        sideAvatar.classList.toggle('immortal-avatar', !!rankState.active);
        sideAvatar.classList.toggle('admin-avatar', !!adminState);
        sideAvatar.textContent = initials.slice(0,2);
      }

      $('#accentLabel') && ($('#accentLabel').innerHTML = `<i class="accent-dot"></i> ${theme.label}`);
      $('#toneLabel') && ($('#toneLabel').textContent = profileState.tone);
      $('#languageLabel') && ($('#languageLabel').textContent = profileState.language);
      $('#customInstruction') && ($('#customInstruction').value = profileState.instruction || '');
      $('#memoryNickname') && ($('#memoryNickname').value = profileState.nickname || '');
      $('#memoryJob') && ($('#memoryJob').value = profileState.job || '');
      $('#memoryAbout') && ($('#memoryAbout').value = profileState.about || '');
      updateSwitch($('#quickAnswerSwitch'), !!profileState.quickAnswer);
      updateSwitch($('#memorySwitch'), !!profileState.memory);
      updateSwitch($('#shakeReportSwitch'), !!profileState.shakeReport);
      updateTraitLabels();
      renderCheckinGrid();
      refreshLanguageChecks();
      renderStorageInfo();
      renderRankPage();
      renderLimitRequestUi();
      renderSessions();
      ensureImmortalNameBadges();
      requestAnimationFrame(() => ensureImmortalNameBadges());
      const adminRow = $('#adminPanelRow');
      if(adminRow) adminRow.hidden = !isAdminProfile();
      try{ window.DATZON_I18N?.setLanguage?.(profileState.language || 'Indonesia'); }catch(e){}
    }

    function nextLimitResetFrom(now=Date.now()){
      return now + LIMIT_WINDOW_MS;
    }
    function formatLimitReset(ms){
      const left = Math.max(0, Number(ms) || 0);
      const h = Math.floor(left / 3600000);
      const m = Math.ceil((left % 3600000) / 60000);
      if(h <= 0) return `${Math.max(1, m)} menit lagi`;
      return `${h} jam ${m} menit lagi`;
    }
    function getLimitState(){
      const now = Date.now();
      const logged = isLoggedInUser();
      let state = null;
      try{ state = JSON.parse(localStorage.getItem(LIMIT_STATE_KEY) || 'null'); }catch(e){ state = null; }
      if(!state || typeof state !== 'object'){
        state = { chat:0, image:0, bonusChat:0, bonusImage:0, resetAt:logged ? nextLimitResetFrom(now) : 0, createdAt:now, guestNoReset:!logged };
      }
      if(logged && (!state.resetAt || now >= Number(state.resetAt))){
        state.chat = 0;
        state.image = 0;
        state.resetAt = nextLimitResetFrom(now);
        state.guestNoReset = false;
      }
      if(!logged){
        state.resetAt = 0;
        state.guestNoReset = true;
        state.bonusChat = 0;
        state.bonusImage = 0;
      }
      state.chat = Math.max(0, Number(state.chat) || 0);
      state.image = Math.max(0, Number(state.image) || 0);
      state.bonusChat = Math.max(0, Number(state.bonusChat) || 0);
      state.bonusImage = Math.max(0, Number(state.bonusImage) || 0);
      saveLimitState(state);
      return state;
    }
    function saveLimitState(state){
      try{ localStorage.setItem(LIMIT_STATE_KEY, JSON.stringify(state)); }catch(e){}
    }
    function effectiveLimitCaps(){
      if(rankHasUnlimited()) return {chat:Infinity, image:Infinity};
      const state = getLimitState();
      if(!isLoggedInUser()) return {chat:LIMIT_CAPS.chat, image:LIMIT_CAPS.image};
      return {chat:LIMIT_CAPS.chat + (Number(state.bonusChat)||0), image:LIMIT_CAPS.image + (Number(state.bonusImage)||0)};
    }
    function isLimitExceeded(type='chat'){
      if(rankHasUnlimited()) return false;
      const state = getLimitState();
      const key = type === 'image' ? 'image' : 'chat';
      const caps = effectiveLimitCaps();
      return Number(state[key] || 0) >= Number(caps[key] || 0);
    }
    function trackGuestLimitRequest(type='chat'){
      const state = getLimitState();
      const key = type === 'image' ? 'image' : 'chat';
      if(!rankHasUnlimited()) state[key] = Math.max(0, Number(state[key]) || 0) + 1;
      saveLimitState(state);
      renderLimitRequestUi();
      return state;
    }
    function renderLimitRequestUi(){
      const state = getLimitState();
      const caps = effectiveLimitCaps();
      const unlimited = rankHasUnlimited();
      const chatUsed = Math.max(0, Number(state.chat) || 0);
      const imageUsed = Math.max(0, Number(state.image) || 0);
      const chatCap = unlimited ? 1 : Math.max(1, Number(caps.chat) || LIMIT_CAPS.chat);
      const imageCap = unlimited ? 1 : Math.max(1, Number(caps.image) || LIMIT_CAPS.image);
      const chatPct = unlimited ? 100 : Math.min(100, chatUsed / chatCap * 100);
      const imagePct = unlimited ? 100 : Math.min(100, imageUsed / imageCap * 100);
      const chatText = unlimited ? 'Unlimited' : `${Math.min(chatUsed, chatCap)} / ${chatCap}`;
      const imageText = unlimited ? 'Unlimited' : `${Math.min(imageUsed, imageCap)} / ${imageCap}`;
      const chatEl = $('#limitChatText');
      const imageEl = $('#limitImageText');
      const chatBar = $('#limitChatBar');
      const imageBar = $('#limitImageBar');
      const summary = $('#limitRequestSummary');
      const mode = $('#limitModeLabel');
      const heroText = $('#limitHeroText') || document.querySelector('.limit-hero-card span');
      const rankState = currentRankState();
      if(chatEl) chatEl.textContent = chatText;
      if(imageEl) imageEl.textContent = imageText;
      if(chatBar) chatBar.style.width = `${chatPct}%`;
      if(imageBar) imageBar.style.width = `${imagePct}%`;
      if(summary) summary.textContent = unlimited ? `Rank Immortal • unlimited sampai ${formatDateID(rankState.until)}` : (!isLoggedInUser() ? `Guest: Chat ${chatText} • Gambar ${imageText} • login untuk tambah limit` : `Chat ${chatText} • Gambar ${imageText} • reset ${formatLimitReset(Number(state.resetAt) - Date.now())}`);
      if(mode) mode.textContent = rankState.active ? 'Rank Immortal Aktif' : (isLoggedInUser() ? 'Akun tersambung' : 'Guest Mode');
      if(heroText) heroText.textContent = rankState.active ? `Chat AI dan Gambar AI tanpa limit sampai ${formatDateID(rankState.until)}.` : (isLoggedInUser() ? `Limit akun reset otomatis berkala. Check in dan misi gratis bisa menambah limit kamu.` : `Guest Mode mendapat ${LIMIT_CAPS.chat} Chat AI dan ${LIMIT_CAPS.image} Gambar AI. Kalau habis, login/register untuk tambah limit.`);
    }

    function updateSwitch(el, on){
      if(el) el.classList.toggle('on', !!on);
    }

    function openSettingsView(view){
      const map = {
        home: '#settingsHome',
        personalization: '#pagePersonalization',
        characteristics: '#pageCharacteristics',
        memory: '#pageMemory',
        photo: '#pageProfilePhoto',
        checkin: '#pageCheckin',
        limit: '#pageLimit',
        rank: '#pageRank',
        redeem: '#pageRedeem',
        apikeys: '#pageOwnApiKeys',
        quota: '#pageQuota',
        general: '#pageGeneral',
        auth: '#pageAuth',
        security: '#pageSecurity',
        storage: '#pageStorage',
        report: '#pageReport',
        notes: '#pageNotes',
        about: '#pageAbout'
      };
      $$('.settings-view').forEach(v => v.classList.remove('active'));
      const target = $(map[view] || map.home);
      target?.classList.add('active');
      settingsPage?.scrollTo({top:0, behavior:'auto'});
      closeSettingsPopover();
    }

    function closeSettingsPageV10(){
      closeSettingsPopover();
      openSettingsView('home');
      settingsPage?.classList.remove('show');
      settingsPage?.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }

    function openSettingsPageV10(){
      closeSidebar();
      applyProfileState();
      openSettingsView('home');
      settingsPage?.classList.add('show');
      settingsPage?.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      settingsPage?.scrollTo({top:0, behavior:'auto'});
    }

    function settingsPopoverRows(type, traitKey=null){
      if(type === 'accent'){
        return Object.entries(accentThemes).map(([key, item]) => popRow({
          value:key,
          label:`<span class="color-dot" style="background:${item.dot || item.color}"></span>${item.label}`,
          desc:'Ubah warna aksen utama'
        }, profileState.accent === key, 'accent')).join('');
      }
      if(type === 'tone'){
        const tones = [
          ['Default','Gaya dan nada bawaan'],
          ['Profesional','Rapi dan presisi'],
          ['Ramah','Hangat dan akrab'],
          ['Jujur','Terus terang dan jelas'],
          ['Nyentrik','Menyenangkan dan imajinatif'],
          ['Efisien','Singkat dan lugas'],
          ['Sinis','Kritis dan sarkastis']
        ];
        return tones.map(([label, desc]) => popRow({value:label,label,desc}, profileState.tone === label, 'tone')).join('');
      }
      if(type === 'trait'){
        const traitDesc = {
          'Lebih banyak': traitKey === 'warm' ? 'Lebih ramah dan lebih menarik' : traitKey === 'enthusiasm' ? 'Lebih berenergi dan seru' : traitKey === 'lists' ? 'Lebih sering pakai struktur' : 'Emoji lebih sering muncul',
          'Default': 'Setelan standar',
          'Lebih sedikit': traitKey === 'warm' ? 'Lebih profesional dan faktual' : traitKey === 'enthusiasm' ? 'Lebih tenang dan netral' : traitKey === 'lists' ? 'Lebih mengalir tanpa banyak daftar' : 'Emoji ditahan, syukurlah'
        };
        return ['Lebih banyak','Default','Lebih sedikit'].map(v => popRow({value:v,label:v,desc:traitDesc[v]}, profileState.traits?.[traitKey] === v, 'trait', traitKey)).join('');
      }
      return '';
    }

    function popRow(item, active, type, traitKey=''){
      return `<button class="settings-pop-row ${active ? 'active' : ''}" type="button" data-pop-type="${type}" data-pop-value="${escapeHtml(item.value)}" data-trait-key="${escapeHtml(traitKey)}">
        <span><b>${item.label}</b><small>${item.desc || ''}</small></span>
        <span class="check-slot">${active ? icons.check : ''}</span>
      </button>`;
    }

    function openSettingsPopover(anchor, type, traitKey=null){
      const pop = $('#settingsPopover');
      if(!pop || !anchor) return;
      pop.innerHTML = settingsPopoverRows(type, traitKey);
      pop.dataset.popType = type || '';
      pop.classList.add('show');
      pop.classList.remove('mobile-sheet');
      pop.setAttribute('aria-hidden','false');
      pop.style.visibility = 'hidden';
      pop.style.left = '';
      pop.style.top = '';
      pop.style.right = '';
      pop.style.bottom = '';
      pop.style.width = '';
      pop.style.maxHeight = '';
      requestAnimationFrame(() => {
        const margin = 14;
        const rect = anchor.getBoundingClientRect();
        const isSmall = window.innerWidth <= 640;
        const width = isSmall ? Math.min(window.innerWidth - margin * 2, Math.max(300, rect.width)) : Math.min(380, window.innerWidth - margin * 2);
        pop.style.width = `${width}px`;
        let left = isSmall ? rect.left : rect.right - width;
        left = Math.min(window.innerWidth - width - margin, Math.max(margin, left));

        // V16: dropdown profile nempel ke barisnya, bukan jadi bottom sheet nyasar kayak anak magang CSS.
        let top = rect.bottom + 8;
        let availableBelow = window.innerHeight - top - margin;
        let maxH = Math.min(520, Math.max(220, availableBelow));
        pop.style.maxHeight = `${maxH}px`;
        let pr = pop.getBoundingClientRect();
        if(availableBelow < 190 && rect.top > availableBelow){
          maxH = Math.min(520, Math.max(220, rect.top - margin - 8));
          pop.style.maxHeight = `${maxH}px`;
          pr = pop.getBoundingClientRect();
          top = rect.top - Math.min(pr.height, maxH) - 8;
        }
        top = Math.min(window.innerHeight - Math.min(pr.height, maxH) - margin, Math.max(margin, top));
        pop.style.left = `${left}px`;
        pop.style.top = `${top}px`;
        pop.style.right = 'auto';
        pop.style.bottom = 'auto';
        pop.style.visibility = '';
      });
    }
    function closeSettingsPopover(){
      const pop = $('#settingsPopover');
      if(!pop) return;
      pop.classList.remove('show','mobile-sheet');
      pop.removeAttribute('data-pop-type');
      pop.setAttribute('aria-hidden','true');
      pop.innerHTML = '';
      pop.style.left = '';
      pop.style.top = '';
      pop.style.visibility = '';
    }

    async function changeAppearance(value){
      if(profileState.appearance === value) return;
      const loading = $('#themeLoading');
      if(loading){
        loading.classList.remove('to-light','to-dark');
        loading.classList.add(value === 'light' ? 'to-light' : 'to-dark');
        loading.classList.add('show');
      }
      await sleep(650);
      profileState.appearance = value;
      saveProfileState();
      applyProfileState();
      await sleep(120);
      if(loading){
        loading.classList.remove('show','to-light','to-dark');
      }
    }

    function updateTraitLabels(){
      const t = profileState.traits || defaultProfileState.traits;
      const map = {
        warm: ['#traitWarmLabel', '#warmSummary'],
        enthusiasm: ['#traitEnthusiasmLabel', '#enthusiasmSummary'],
        lists: ['#traitListsLabel'],
        emoji: ['#traitEmojiLabel']
      };
      for(const [key, ids] of Object.entries(map)){
        ids.forEach(id => {
          const el = $(id);
          if(!el) return;
          if(id.includes('Summary')){
            el.textContent = t[key] === 'Lebih banyak' ? (key === 'warm' ? 'Lebih hangat' : 'Lebih antusias') : t[key] === 'Default' ? (key === 'warm' ? 'Hangat default' : 'Antusias default') : (key === 'warm' ? 'Kurang hangat' : 'Kurang antusias');
          } else {
            el.textContent = t[key] || 'Default';
          }
        });
      }
    }

    function socialSvg(type){
      if(type === 'youtube') return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M21 8.5s-.18-1.3-.72-1.86c-.7-.74-1.48-.75-1.84-.79C15.88 5.66 12 5.66 12 5.66s-3.88 0-6.44.19c-.36.04-1.14.05-1.84.79C3.18 7.2 3 8.5 3 8.5S2.82 10.02 2.82 11.55v1.42C2.82 14.5 3 16 3 16s.18 1.3.72 1.86c.7.74 1.62.72 2.03.8 1.47.14 6.25.18 6.25.18s3.88-.01 6.44-.2c.36-.04 1.14-.05 1.84-.79.54-.56.72-1.86.72-1.86s.18-1.51.18-3.04v-1.42c0-1.52-.18-3.04-.18-3.04Z" stroke="currentColor" stroke-width="2"/><path d="m10 9.5 5 2.7-5 2.7V9.5Z" fill="currentColor"/></svg>';
      if(type === 'whatsapp') return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M20 11.7A8 8 0 0 1 8.1 18.7L4 20l1.35-3.95A8 8 0 1 1 20 11.7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.2 8.3c.2-.45.4-.47.67-.47h.5c.15 0 .37.05.57.42.2.38.7 1.75.75 1.88.06.13.1.28.02.45-.08.17-.13.27-.27.42l-.4.45c-.13.14-.27.28-.12.55.15.27.66 1.09 1.42 1.76.98.88 1.8 1.15 2.07 1.28.27.14.43.12.58-.07.18-.2.67-.78.85-1.05.18-.27.35-.23.6-.14.25.1 1.56.74 1.83.87.27.14.45.2.52.32.07.13.07.74-.17 1.45-.25.7-1.4 1.35-1.93 1.4-.5.05-1.12.07-1.82-.12-.42-.13-.96-.32-1.65-.62-2.9-1.25-4.8-4.16-4.95-4.35-.14-.2-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.43Z" fill="currentColor" opacity=".9"/></svg>';
      return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M14 3v10.25a4.25 4.25 0 1 1-4.25-4.25c.54 0 1.05.1 1.52.28V6.8A7.1 7.1 0 0 0 17.6 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    function getFreeMissionState(){
      const today = todayKey();
      const cur = profileState.freeLimitState || {};
      const ads = cur.ads && cur.ads.date === today ? cur.ads : {date:today, completed:[], claimed:false, voucherCode:''};
      const socials = cur.socials || {completed:[], claimed:false, voucherCode:''};
      ads.completed = Array.isArray(ads.completed) ? ads.completed : [];
      socials.completed = Array.isArray(socials.completed) ? socials.completed : [];
      profileState.freeLimitState = {ads, socials};
      return profileState.freeLimitState;
    }
    function missionDone(kind, id){
      const st = getFreeMissionState();
      const group = kind === 'ads' ? st.ads : st.socials;
      return (group.completed || []).includes(id);
    }
    function allMissionsDone(kind){
      const list = kind === 'ads' ? FREE_AD_MISSIONS : FREE_SOCIAL_MISSIONS;
      return list.every(m => missionDone(kind, m.id));
    }
    function missionRowHTML(kind, mission){
      const done = missionDone(kind, mission.id);
      const isAd = kind === 'ads';
      const icon = isAd ? '<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" stroke="currentColor" stroke-width="2"/><path d="M8 8h8M8 12h5M7 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' : socialSvg(mission.type);
      return `<div class="free-mission-row ${done ? 'done' : ''}" data-free-row="${kind}:${mission.id}">
        <span class="free-mission-icon">${icon}</span>
        <span class="free-mission-text"><b>${escapeHtml(mission.label)}</b><small>${isAd ? `Lihat iklan minimal ${mission.seconds} detik, lalu kembali ke DATZON.` : `Buka link dan tunggu ${mission.seconds} detik sampai misi tercatat.`}</small></span>
        <button class="free-mission-btn" type="button" data-free-mission="${kind}" data-free-id="${mission.id}">${done ? 'Selesai ✓' : 'Mulai'}</button>
      </div>`;
    }
    function renderFreeLimitPage(){
      const root = $('#freeLimitPage');
      if(!root) return;
      const st = getFreeMissionState();
      const adsDone = (st.ads.completed || []).length;
      const socialsDone = (st.socials.completed || []).length;
      root.innerHTML = `
        <div class="free-limit-hero">
          <div class="free-limit-icon"><svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M12 3l1.4 4.3h4.5l-3.6 2.6 1.4 4.3L12 11.6 8.3 14.2l1.4-4.3-3.6-2.6h4.5L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M5 21h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div>
          <b>Limit Request Gratis</b>
          <p>Selesaikan misi untuk mendapatkan kode voucher Trial Rank Immortal. Misi iklan reset setiap jam 12 malam, misi sosial hanya sekali.</p>
        </div>
        <section class="free-mission-card">
          <div class="free-mission-head"><div><b>Misi harian: lihat 6 iklan</b><small>${adsDone}/6 selesai • reward Trial Rank Immortal 1 hari</small></div><span>${st.ads.claimed ? 'Diklaim' : 'Harian'}</span></div>
          <p class="settings-help compact">Klik tiap iklan, lihat/tunggu minimal 10 detik, lalu kembali ke halaman ini sampai semua misi tercentang.</p>
          <div class="free-mission-list">${FREE_AD_MISSIONS.map(m => missionRowHTML('ads', m)).join('')}</div>
          <button class="primary-wide" type="button" data-free-claim="ads">${st.ads.claimed ? 'Hadiah harian sudah diklaim' : 'Konfirmasi Misi Iklan'}</button>
        </section>
        <section class="free-mission-card">
          <div class="free-mission-head"><div><b>Misi sekali: support DATZON</b><small>${socialsDone}/3 selesai • reward Trial Rank Immortal 1 hari</small></div><span>Sekali</span></div>
          <p class="settings-help compact">Buka link YouTube, WhatsApp, dan TikTok. Setelah 5 detik, misi akan tercentang. Link tetap bisa dikunjungi lagi meski misi sudah selesai.</p>
          <div class="free-mission-list">${FREE_SOCIAL_MISSIONS.map(m => missionRowHTML('socials', m)).join('')}</div>
          <button class="primary-wide" type="button" data-free-claim="socials">${st.socials.claimed ? 'Hadiah sosial sudah diklaim' : 'Konfirmasi Misi Sosial'}</button>
        </section>
      `;
    }
    function startFreeMission(kind, id){
      const list = kind === 'ads' ? FREE_AD_MISSIONS : FREE_SOCIAL_MISSIONS;
      const mission = list.find(m => m.id === id);
      if(!mission) return;
      try{ window.open(mission.url, '_blank', 'noopener,noreferrer'); }catch(e){ location.href = mission.url; }
      const key = `${kind}:${id}`;
      if(missionDone(kind, id)) return;
      if(freeMissionTimers.has(key)) return;
      const row = document.querySelector(`[data-free-row="${key}"]`);
      const btn = row?.querySelector('[data-free-mission]');
      let left = Number(mission.seconds) || 5;
      if(btn){ btn.disabled = true; btn.textContent = `${left}d`; }
      const timer = setInterval(() => {
        left -= 1;
        if(btn) btn.textContent = left > 0 ? `${left}d` : 'Selesai ✓';
        if(left <= 0){
          clearInterval(timer);
          freeMissionTimers.delete(key);
          const st = getFreeMissionState();
          const group = kind === 'ads' ? st.ads : st.socials;
          group.completed = Array.from(new Set([...(group.completed || []), id]));
          saveProfileState();
          showMiniToast?.(`${mission.label} selesai.`);
          renderFreeLimitPage();
        }
      }, 1000);
      freeMissionTimers.set(key, timer);
    }
    async function claimFreeMissionReward(kind){
      const st = getFreeMissionState();
      const group = kind === 'ads' ? st.ads : st.socials;
      const label = kind === 'ads' ? 'misi iklan harian' : 'misi sosial';
      if(group.claimed){
        const existing = group.voucherCode ? findLocalVoucher(group.voucherCode) : null;
        if(existing) showVoucherRewardModal(existing);
        else showMiniToast?.(`Hadiah ${label} sudah pernah diklaim.`);
        return;
      }
      if(!allMissionsDone(kind)){
        showMiniToast?.(`Selesaikan semua ${label} dulu.`);
        return;
      }
      const voucher = createRankTrialVoucher(1, kind === 'ads' ? 'daily-ad-mission' : 'social-mission');
      group.claimed = true;
      group.voucherCode = voucher.code;
      saveProfileState();
      await saveVoucherCloud(voucher);
      renderFreeLimitPage();
      showVoucherRewardModal(voucher);
      showMiniToast?.('Voucher Trial Rank Immortal 1 hari dibuat.');
    }

    function renderCheckinGrid(){
      const grid = $('#checkinGrid');
      if(!grid) return;
      const logged = isLoggedInUser();
      const st = getCheckinState();
      const claimed = new Set(st.claimedDays || []);
      const nextDay = nextCheckinDay();
      const today = todayKey();
      const alreadyToday = st.lastClaimDate === today;
      const status = $('#checkinStatus');
      if(status){
        const complete = claimed.size >= 7;
        status.innerHTML = logged
          ? (complete ? 'Status: 7/7 hadiah sudah diklaim. Siklus check in selesai; tunggu event berikutnya dari DATZON.' : `Status: ${claimed.size}/7 hadiah diklaim. ${alreadyToday ? 'Kamu sudah check in hari ini, balik lagi besok setelah reset jam 12 malam.' : `Hadiah berikutnya: Hari ${nextDay}.`}`)
          : 'Check in harian dikunci untuk Guest Mode. Login atau register dulu supaya progress dan bonus tersimpan ke Firebase.';
      }
      if(!logged){
        grid.innerHTML = `<div class="checkin-lock-card"><b>Check in terkunci</b><p>Login atau register dulu untuk mengambil bonus limit request dan menyimpan progress harian ke Firebase.</p><div class="limit-action-grid"><button class="primary-wide" type="button" data-settings-open="auth" data-auth-panel="register">Login / Register</button></div></div>`;
        return;
      }
      grid.innerHTML = Array.from({length:7}, (_, i) => {
        const day = i + 1;
        const done = claimed.has(day);
        const current = day === nextDay && !done;
        const locked = !done && day !== nextDay;
        const disabled = done || locked || alreadyToday || checkinClaimBusy;
        const rewardText = rewardTextForDay(day);
        const buttonText = done ? 'Sudah diambil' : locked ? 'Terkunci' : alreadyToday ? 'Balik besok' : 'Ambil';
        return `<div class="checkin-card ${done ? 'done' : ''} ${current ? 'current' : ''} ${locked ? 'locked' : ''}">
          <div class="checkin-day">Hari ${day}</div>
          <div class="checkin-limit">${rewardText}</div>
          <button class="claim-btn" type="button" data-claim-day="${day}" ${disabled ? 'disabled' : ''}>${checkinClaimBusy && current ? 'Mengecek...' : buttonText}</button>
        </div>`;
      }).join('');
    }
    async function handleCheckinClaim(day){
      if(checkinClaimBusy) return;
      if(!isLoggedInUser()){
        showMiniToast?.('Login atau register dulu untuk check in harian.');
        openSettingsView('auth');
        switchAuthPanel?.('register');
        requestIdle?.(() => startAuthListener?.($('#authStatus')), 250);
        return;
      }
      checkinClaimBusy = true;
      renderCheckinGrid();
      try{
        const st = getCheckinState();
        const today = todayKey();
        const nextDay = nextCheckinDay();
        const claimedSet = new Set(st.claimedDays || []);
        if(claimedSet.size >= 7 || claimedSet.has(Number(day))){ showMiniToast?.('Semua hadiah check in 7 hari sudah diklaim.'); return; }
        if(st.lastClaimDate === today){ showMiniToast?.('Kamu sudah check in hari ini. Balik lagi besok setelah reset jam 12 malam.'); return; }
        if(Number(day) !== nextDay){ showMiniToast?.(`Hadiah berikutnya adalah Hari ${nextDay}.`); return; }
        const reward = checkinRewardForDay(day);
        st.claimedDays = Array.from(new Set([...(st.claimedDays || []), day])).sort((a,b)=>a-b);
        st.lastClaimDate = today;
        profileState.claimedDays = st.claimedDays;
        if(day === 7){
          const voucher = createRankTrialVoucher(3, 'checkin-day-7');
          await saveVoucherCloud(voucher);
          saveProfileState();
          showVoucherRewardModal(voucher);
          showMiniToast?.('Voucher Rank Immortal 3 hari dibuat.');
          return;
        }
        addBonusLimit(reward.chat || 0, reward.image || 0);
        saveProfileState();
        const rewardMsg = rewardTextForDay(day).replace(/ \+ /g, ' dan ');
        showMiniToast?.(`Check in Hari ${day} berhasil. ${rewardMsg}.`);
      }finally{
        checkinClaimBusy = false;
        renderCheckinGrid();
        renderLimitRequestUi();
      }
    }

    function renderRankPage(){
      const rs = currentRankState();
      const card = $('#rankCard');
      const benefits = $('#rankBenefits') || $('.rank-benefits');
      const summary = $('#rankSummary');
      const activeUntil = rs.until ? formatDateID(rs.until) : '-';
      if(card){
        card.classList.toggle('is-immortal', !!rs.active);
        card.classList.toggle('is-guest-rank', !rs.active);
        card.innerHTML = rs.active ? `
          <div class="rank-emblem rank-logo-wrap rank-image-logo-wrap"><img class="rank-immortal-img" src="${encodeAttr(IMMORTAL_LOGO_URL)}" alt="DATZON AI Rank Immortal" loading="eager" decoding="async" referrerpolicy="no-referrer"></div>
          <div class="rank-copy">
            <span class="rank-kicker">DATZON AI Premium Trial</span>
            <b id="rankTitle">Rank Immortal Aktif ${crownSvgHTML()}</b>
            <p id="rankDesc">Aktif sampai ${activeUntil}. Semua fitur utama DATZON AI dibuka tanpa limit selama masa trial.</p>
          </div>
        ` : `
          <div class="rank-emblem rank-guest-emblem">IM</div>
          <div class="rank-copy">
            <span class="rank-kicker">Belum aktif</span>
            <b id="rankTitle">Guest / User biasa</b>
            <p id="rankDesc">Tukarkan kode voucher atau klaim hadiah Check in Hari ke-7 untuk mengaktifkan Rank Immortal.</p>
          </div>
        `;
      }
      if(benefits){
        benefits.innerHTML = `
          <div class="rank-benefit-head">
            <b>Benefit Rank Immortal</b>
            <small>${rs.active ? `Aktif sampai ${activeUntil}` : 'Trial bisa didapat dari voucher.'}</small>
          </div>
          <span><i>∞</i>Akses Chat AI tanpa limit</span>
          <span><i>∞</i>Akses Gambar AI tanpa limit</span>
          <span><i>✦</i>Prioritas fitur eksperimen DATZON</span>
          <span><i>♛</i>Badge profil Immortal bersinar</span>
        `;
      }
      if(summary) summary.textContent = rs.active ? `Immortal sampai ${activeUntil}` : 'Guest / User';
      const clearBtn = $('#clearRankImmortalBtn');
      if(clearBtn) clearBtn.hidden = !rs.active;
      const clearStatus = $('#clearRankStatus');
      if(clearStatus) clearStatus.textContent = rs.active ? `Rank Immortal aktif sampai ${activeUntil}. Tombol hapus akan reset rank lokal dan Firebase akun ini.` : 'Tidak ada Rank Immortal aktif di akun ini.';
      renderLimitRequestUi();
    }
    function renderRedeemPreview(voucher, message=''){
      const box = $('#redeemPreview');
      if(!box) return;
      if(!voucher && !message){ box.hidden = true; box.innerHTML = ''; return; }
      box.hidden = false;
      if(message && !voucher){ box.innerHTML = `<div class="redeem-error">${escapeHtml(message)}</div>`; return; }
      const now = new Date();
      const rankNow = currentRankState();
      const base = rankNow.active && rankNow.until && rankNow.until.getTime() > now.getTime() ? rankNow.until : now;
      const until = addDays(base, Number(voucher.days || 3));
      const extraNote = rankNow.active ? 'Durasi voucher akan ditambahkan ke masa aktif Rank Immortal kamu yang sekarang.' : 'Rank Immortal akan aktif setelah kamu klik Aktifkan.';
      box.innerHTML = `<div class="redeem-detail"><b>Trial ${voucher.days || 3} hari Rank ${escapeHtml(voucher.rank || 'Immortal')}</b><p>${escapeHtml(extraNote)} Gunakan sebaik-baiknya ya.</p><ul><li>Aktif sampai ${formatDateID(until)}</li><li>Akses Chat AI tanpa limit</li><li>Akses Gambar AI tanpa limit</li><li>Trial tersimpan ke akun Firebase kalau kamu login.</li></ul><button class="primary-wide" type="button" data-activate-voucher="${escapeHtml(voucher.code)}">Aktifkan</button></div>`;
    }
    async function handleRedeemCheck(){
      const input = $('#redeemCodeInput');
      const code = String(input?.value || '').trim().toUpperCase();
      if(!code) return renderRedeemPreview(null, 'Masukkan kode voucher dulu.');
      const local = findLocalVoucher(code);
      const cloud = await fetchVoucherCloud(code);
      const voucher = cloud || local;
      if(!voucher) return renderRedeemPreview(null, 'Kode voucher tidak ditemukan. Cek lagi huruf dan angkanya.');
      if(voucher.status === 'used') return renderRedeemPreview(null, 'Kode voucher ini sudah pernah dipakai.');
      if(voucher.ownerEmail && cloudUserEmail() && String(voucher.ownerEmail).toLowerCase() !== String(cloudUserEmail()).toLowerCase()) return renderRedeemPreview(null, 'Kode voucher ini bukan milik akun yang sedang login.');
      renderRedeemPreview({...voucher, code});
    }
    async function activateVoucher(code){
      const clean = String(code || '').trim().toUpperCase();
      const local = findLocalVoucher(clean);
      const cloud = await fetchVoucherCloud(clean);
      const voucher = cloud || local;
      if(!voucher || voucher.status === 'used'){ renderRedeemPreview(null, 'Kode voucher tidak valid atau sudah dipakai.'); return; }
      const now = new Date();
      const rankNow = currentRankState();
      const base = rankNow.active && rankNow.until && rankNow.until.getTime() > now.getTime() ? rankNow.until : now;
      const until = addDays(base, Number(voucher.days || 3));
      profileState.rank = voucher.rank || 'Immortal';
      profileState.rankImmortalUntil = until.toISOString();
      profileState.redeemedVouchers = Array.from(new Set([...(profileState.redeemedVouchers || []), clean]));
      const arr = Array.isArray(profileState.vouchers) ? profileState.vouchers : [];
      profileState.vouchers = arr.map(v => String(v.code).toUpperCase() === clean ? {...v, status:'used', usedAt:new Date().toISOString()} : v);
      saveProfileState();
      await markVoucherRedeemedCloud(clean, {usedAt:new Date().toISOString(), rank:profileState.rank, rankImmortalUntil:profileState.rankImmortalUntil});
      renderRankPage();
      renderLimitRequestUi();
      renderRedeemPreview(null, `Rank Immortal aktif sampai ${formatDateID(until)}.`);
      showMiniToast?.('Rank Immortal aktif.');
    }

    function refreshLanguageChecks(){
      $$('.lang-option').forEach(btn => {
        const active = btn.dataset.language === profileState.language;
        btn.classList.toggle('active', active);
        $('.check-slot', btn).innerHTML = active ? icons.check : '';
      });
    }

    function saveInlineSettings(){
      profileState.instruction = $('#customInstruction')?.value || '';
      profileState.nickname = $('#memoryNickname')?.value || '';
      profileState.job = $('#memoryJob')?.value || '';
      profileState.about = $('#memoryAbout')?.value || '';
      saveProfileState();
      applyProfileState();
    }

    function editProfileName(){
      const modalId = 'nameEditModal';
      let modal = document.getElementById(modalId);
      if(!modal){
        document.body.insertAdjacentHTML('beforeend', `
          <div class="name-modal" id="${modalId}" aria-hidden="true">
            <div class="name-modal-card" role="dialog" aria-modal="true" aria-label="Ganti nama tampilan">
              <div class="name-modal-head">
                <button class="name-modal-close" type="button" data-name-cancel aria-label="Batal">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
                </button>
                <h3>Ganti nama</h3>
                <button class="name-modal-save" type="button" data-name-save>Simpan</button>
              </div>
              <label class="name-modal-label" for="nameEditInput">Nama tampilan</label>
              <input id="nameEditInput" class="name-modal-input" maxlength="32" autocomplete="off" placeholder="Masukkan nama baru" />
              <p class="name-modal-help">Disimpan lokal di perangkat ini dulu. Database belum ikut kerja bakti.</p>
            </div>
          </div>
        `);
        modal = document.getElementById(modalId);
        uiApplySoon(modal);
        const input = modal.querySelector('#nameEditInput');
        const close = () => {
          modal.classList.remove('show');
          modal.setAttribute('aria-hidden','true');
        };
        const save = async () => {
          const clean = (input.value || '').trim().replace(/\s+/g, ' ').slice(0, 32);
          if(!clean){ input.focus(); return; }
          profileState.name = clean;
          profileState.displayName = clean;
          profileState.fullName = clean;
          rememberRealNameForEmail?.(profileState.email || currentUser?.email || window.DATZON_CLOUD?.email?.() || '', clean);
          try{ saveProfileStateLocalOnly ? saveProfileStateLocalOnly() : localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profileState)); }catch(e){}
          applyProfileState();
          forceSidebarProfileIdentity?.(clean, currentUser?.email || profileState.email || '');
          renderProfilePhotoPage?.();
          showMiniToast?.(uiText('Nama tampilan disimpan.'));
          close();
          if(hasFirebase?.() && uid?.()){
            try{ await saveProfileCloud({name:clean, displayName:clean, fullName:clean}); showMiniToast?.(uiText('Nama disimpan ke Firebase.')); }
            catch(err){ console.warn('Rename cloud save failed:', err); }
          }
        };
        modal.addEventListener('click', e => {
          if(e.target === modal || e.target.closest('[data-name-cancel]')) close();
          if(e.target.closest('[data-name-save]')) save();
        });
        input.addEventListener('keydown', e => {
          if(e.key === 'Enter') save();
          if(e.key === 'Escape') close();
        });
      }
      const input = modal.querySelector('#nameEditInput');
      const title = modal.querySelector('.name-modal-head h3'); if(title) title.textContent = uiText('Ganti nama');
      const saveBtn = modal.querySelector('[data-name-save]'); if(saveBtn) saveBtn.textContent = uiText('Simpan');
      const label = modal.querySelector('.name-modal-label'); if(label) label.textContent = uiText('Nama tampilan');
      const help = modal.querySelector('.name-modal-help'); if(help) help.textContent = uiText('Disimpan lokal di perangkat ini dulu. Database belum ikut kerja bakti.');
      input.placeholder = uiText('Masukkan nama baru');
      input.value = profileState.name || 'DATZON User';
      if(document.activeElement && document.activeElement.blur) document.activeElement.blur();
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
      // V16: jangan langsung buka keyboard dan jangan seleksi semua teks. Pop up tampil dulu, manusia klik input sendiri kalau niat.
      setTimeout(() => { try{ input.blur(); input.setSelectionRange(input.value.length, input.value.length); }catch(e){} }, 80);
    }

    function loadStoredChatsMeta(){
      try{
        const arr = JSON.parse(localStorage.getItem(STORAGE_CHATS) || '[]');
        return Array.isArray(arr) ? arr : [];
      }catch(e){
        return [];
      }
    }
    function saveChatsToStorage(){
      try{ localStorage.setItem(STORAGE_CHATS, JSON.stringify(chatHistory.slice(0,24))); }catch(e){}
    }
    function collectChatMessages(){
      return $$('.msg').map(msg => {
        const role = msg.classList.contains('user') ? 'user' : 'ai';
        const text = $('.bubble', msg)?.dataset.rawText || $('.bubble', msg)?.textContent || '';
        let files = [];
        let imageMeta = null;
        if(role === 'user'){
          try{ files = JSON.parse(msg.dataset.files || '[]') || []; }catch(e){ files = []; }
          if(msg.__files && msg.__files.length) files = serializeChatFiles(msg.__files);
        }else if(msg.dataset.imageMeta){
          try{ imageMeta = JSON.parse(msg.dataset.imageMeta || 'null'); }catch(e){ imageMeta = null; }
        }
        return {role, text, files, imageMeta};
      }).filter(x => x.text.trim() || (x.files && x.files.length) || x.imageMeta);
    }
    function saveCurrentChat(){
      if(!currentChatId || !currentChatRegistered) return;
      const index = chatHistory.findIndex(item => item.id === currentChatId);
      if(index >= 0){
        chatHistory[index].messages = collectChatMessages();
        chatHistory[index].files = activeChatFiles || chatHistory[index].files || [];
        chatHistory[index].temporary = temporaryMode || chatHistory[index].temporary || false;
        chatHistory[index].expiresAt = chatHistory[index].temporary ? (chatHistory[index].expiresAt || new Date(Date.now()+86400000).toISOString()) : '';
        chatHistory[index].updatedAt = new Date().toISOString();
        saveChatsToStorage();
      }
    }
    function hydrateStoredChats(){
      chatHistory = loadStoredChatsMeta();
      renderRecentChats();
      const openId = chatIdFromUrl();
      if(openId) setTimeout(() => loadStoredChat(openId), 80);
    }
    function loadStoredChat(id){
      if(imagePageActive) restoreChatShell({clear:false});
      const item = chatHistory.find(c => String(c.id) === String(id));
      if(!item) return;
      chatLog.innerHTML = '';
      hasStartedChat = true;
      currentChatRegistered = true;
      currentChatId = item.id;
      document.body.classList.remove('home-mode');
      document.body.classList.add('chat-started');
      heroEl.hidden = true;
      heroEl.classList.add('hero-exit');
      activeChatFiles = item.files || [];
      temporaryMode = !!item.temporary;
      document.body.classList.toggle('temporary-mode', temporaryMode);
      tempBtn.classList.toggle('active', temporaryMode);
      (item.messages || []).forEach(m => {
        if(m.role === 'ai' && m.imageMeta) addStoredImageResult(m.imageMeta);
        else addMessage(m.role, m.text, m.files || []);
      });
      syncAddressToChat(item.id);
      renderRecentChats();
      updateTopMenuTitle();
      setTimeout(() => scrollChatToBottom('auto'), 60);
    }


    function bytesToHuman(bytes){
      if(!bytes || bytes < 1) return '0 KB';
      const kb = bytes / 1024;
      if(kb < 1024) return `${Math.max(1, Math.round(kb))} KB`;
      const mb = kb / 1024;
      if(mb < 1024) return `${mb >= 100 ? Math.round(mb) : mb.toFixed(2)} MB`;
      const gb = mb / 1024;
      return `${gb.toFixed(gb >= 10 ? 1 : 2)} GB`;
    }
    function localStorageBytesFor(key){
      try{
        const val = localStorage.getItem(key) || '';
        return new Blob([key + val]).size;
      }catch(e){ return 0; }
    }
    function storageRankIsImmortalActive(){
      try{
        if(typeof rankHasUnlimited === 'function' && rankHasUnlimited()) return true;
      }catch(e){}
      try{
        const rank = (typeof currentRankState === 'function') ? currentRankState() : null;
        if(rank && rank.active) return true;
      }catch(e){}
      try{
        const untilRaw = profileState?.rankImmortalUntil || '';
        const until = untilRaw ? new Date(untilRaw) : null;
        if(until && until.getTime() > Date.now()) return true;
      }catch(e){}
      return false;
    }
    function storageQuotaBytes(){
      const logged = !!(window.DATZON_CLOUD?.isLoggedIn?.()) || isLoggedInUser?.();
      if(storageRankIsImmortalActive()) return 1024 * 1024 * 1024; // Rank Immortal: 1 GB
      if(logged) return 500 * 1024 * 1024; // Login biasa: 500 MB
      return 100 * 1024 * 1024; // Guest: 100 MB
    }
    function storageQuotaLabel(){
      const logged = !!(window.DATZON_CLOUD?.isLoggedIn?.()) || isLoggedInUser?.();
      if(storageRankIsImmortalActive()) return 'Rank Immortal • 1 GB';
      if(logged) return 'Akun login • 500 MB';
      return 'Guest mode • 100 MB';
    }
    function pushStorageAsset(map, raw){
      const a = normalizeStoredAsset(raw || {});
      if(!a.id) return;
      const old = map.get(a.id) || {};
      map.set(a.id, {...old, ...a, bytes: Math.max(Number(old.bytes || 0), Number(a.bytes || 0))});
    }
    function collectStorageAssets(){
      const map = new Map();
      loadStorageAssets().forEach(a => pushStorageAsset(map, a));
      try{ (profileState.storageAssets || []).forEach(a => pushStorageAsset(map, a)); }catch(e){}
      try{
        if(profileState.photoURL){
          pushStorageAsset(map, {kind:'profile', name:'Foto profil', bytes:profileState.photoBytes || 0, cloudUrl:profileState.photoURL, cloudPublicId:profileState.photoPublicId || '', cloudName:profileState.photoCloudName || cloudinaryConfig('profile').cloudName || '', deleteToken:profileState.photoDeleteToken || '', source:'profile'});
        }
      }catch(e){}
      const chats = Array.isArray(chatHistory) && chatHistory.length ? chatHistory : loadStoredChatsMeta();
      chats.forEach(chat => {
        (chat.files || []).forEach(f => pushStorageAsset(map, {...f, kind:f.kind || (/^image\//i.test(f.type || '') ? 'imageAttach' : 'fileAttach'), source:'chat-file'}));
        (chat.messages || []).forEach(m => {
          (m.files || []).forEach(f => pushStorageAsset(map, {...f, kind:f.kind || (/^image\//i.test(f.type || '') ? 'imageAttach' : 'fileAttach'), source:'chat-message-file'}));
          if(m.imageMeta) pushStorageAsset(map, {...m.imageMeta, kind:'generatedImage', bytes:m.imageMeta.cloudBytes || m.imageMeta.bytes || 0, source:'generated-image'});
        });
      });
      (activeChatFiles || []).forEach(f => pushStorageAsset(map, {...f, kind:f.kind || (/^image\//i.test(f.type || '') ? 'imageAttach' : 'fileAttach'), source:'active-chat-file'}));
      (uploadedFiles || []).forEach(item => {
        const f = item.file || item;
        pushStorageAsset(map, {kind:/^image\//i.test(f.type || '') ? 'imageAttach' : 'fileAttach', name:f.name || item.name || 'file preview', bytes:f.size || item.size || 0, cloudUrl:item.cloudUrl || item.url || '', cloudPublicId:item.cloudPublicId || '', cloudName:item.cloudName || '', deleteToken:item.deleteToken || '', source:item.cloudUrl ? 'pending-upload-cloud' : 'local-preview'});
      });
      return Array.from(map.values());
    }
    function storageBytesByKind(assets=[]){
      return assets.reduce((acc,a) => {
        const k = a.kind || 'asset';
        acc[k] = (acc[k] || 0) + (Number(a.bytes) || 0);
        acc.total = (acc.total || 0) + (Number(a.bytes) || 0);
        return acc;
      }, {total:0});
    }
    function renderStorageInfo(){
      const chatBytes = localStorageBytesFor(STORAGE_CHATS);
      const profileBytes = localStorageBytesFor(STORAGE_PROFILE) + localStorageBytesFor(STORAGE_PASSWORD_HASH) + localStorageBytesFor(STORAGE_SESSIONS);
      const reportBytes = localStorageBytesFor(STORAGE_BUG_REPORTS);
      const assets = collectStorageAssets();
      const byKind = storageBytesByKind(assets);
      const mediaBytes = byKind.total || 0;
      const total = chatBytes + profileBytes + reportBytes + mediaBytes;
      const quota = storageQuotaBytes();
      $('#storageTotalText') && ($('#storageTotalText').textContent = `${bytesToHuman(total)} dipakai dari ${bytesToHuman(quota)}`);
      $('#storageChatText') && ($('#storageChatText').textContent = `${bytesToHuman(chatBytes)} lokal${window.DATZON_CLOUD?.isLoggedIn?.() ? ' • cloud sinkron' : ''}`);
      $('#storageProfileText') && ($('#storageProfileText').textContent = `${bytesToHuman(profileBytes + (byKind.profile || 0))} termasuk foto profil`);
      $('#storageReportText') && ($('#storageReportText').textContent = bytesToHuman(reportBytes));
      $('#storageFileText') && ($('#storageFileText').textContent = `${assets.filter(a => a.kind === 'imageAttach' || a.kind === 'fileAttach').length} file/foto attach • ${bytesToHuman((byKind.imageAttach || 0) + (byKind.fileAttach || 0))}`);
      $('#storageGeneratedText') && ($('#storageGeneratedText').textContent = `${assets.filter(a => a.kind === 'generatedImage').length} gambar AI • ${bytesToHuman(byKind.generatedImage || 0)}`);
      $('#storageCloudAssetText') && ($('#storageCloudAssetText').textContent = `${assets.filter(a => a.cloudUrl || a.cloudPublicId).length} aset tercatat • ${bytesToHuman(mediaBytes)}`);
      $('#storageQuotaText') && ($('#storageQuotaText').textContent = storageQuotaLabel());
      $('#storageSummary') && ($('#storageSummary').textContent = `${bytesToHuman(total)} / ${bytesToHuman(quota)}`);
      const fill = $('#storageBarFill');
      if(fill){
        const rawPct = quota ? Math.min(100, Math.max(0, total / quota * 100)) : 0;
        // SERIUS FIX: walau pemakaian super kecil seperti 0.1KB/1GB, bar tetap kelihatan.
        // rawPct tetap disimpan untuk data asli, visualPct cuma agar UI tidak terlihat kosong.
        const visualPct = total ? Math.min(100, Math.max(rawPct, 3.5)) : 0;
        const minPx = total ? '36px' : '0px';
        const bar = fill.closest('.storage-bar');
        if(bar){
          bar.style.setProperty('--storage-fill-width', `${visualPct}%`);
          bar.style.setProperty('--storage-fill-min', minPx);
          bar.classList.toggle('is-empty', !total);
          bar.dataset.rawPct = String(rawPct);
        }
        fill.style.setProperty('width', `${visualPct}%`, 'important');
        fill.style.setProperty('min-width', minPx, 'important');
        fill.style.setProperty('opacity', total ? '1' : '0', 'important');
        fill.style.setProperty('display', 'block', 'important');
        fill.dataset.rawPct = String(rawPct);
        fill.setAttribute('aria-label', `${rawPct.toFixed(2)} persen penyimpanan terpakai`);
      }
    }
    function getSessions(){
      try{ const arr = JSON.parse(localStorage.getItem(STORAGE_SESSIONS) || '[]'); return Array.isArray(arr) ? arr : []; }catch(e){ return []; }
    }
    function saveSessions(arr){ localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(arr.slice(0,8))); }
    function ensureSession(){
      let sid = sessionStorage.getItem('datzonAiSessionIdV17');
      let sessions = getSessions();
      if(!sid){
        sid = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
        sessionStorage.setItem('datzonAiSessionIdV17', sid);
      }
      const now = new Date().toISOString();
      const label = /Android/i.test(navigator.userAgent) ? 'Phone • Android Web' : /Windows/i.test(navigator.userAgent) ? 'Computer • Windows Web' : 'Perangkat web';
      const existing = sessions.find(x => x.id === sid);
      if(existing){ existing.last = now; existing.current = true; }
      else sessions.unshift({id:sid,label,app:'DATZON AI Web',created:now,last:now,current:true});
      sessions = sessions.map(x => ({...x,current:x.id === sid}));
      saveSessions(sessions);
    }
    function renderSessions(){
      ensureSession();
      const list = $('#sessionList');
      if(!list) return;
      const sessions = getSessions();
      $('#sessionCount') && ($('#sessionCount').textContent = sessions.length || 1);
      list.innerHTML = sessions.map(s => {
        const date = s.last ? new Date(s.last).toLocaleString('id-ID', {dateStyle:'medium', timeStyle:'short'}) : 'Baru saja';
        return `<div class="session-item"><svg width="25" height="25" viewBox="0 0 24 24" fill="none"><path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2"/><path d="M9 17h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span><b>${escapeHtml(s.label || 'Perangkat web')}</b><small>${escapeHtml(s.app || 'DATZON AI Web')}<br>${escapeHtml(date)}</small></span>${s.current ? '<em class="session-badge">SESI INI</em>' : '<em class="session-badge">AKTIF</em>'}</div>`;
      }).join('') || '<p class="settings-help compact">Belum ada sesi. Bahkan sesi pun males muncul.</p>';
    }
    async function sha256Text(text){
      if(crypto.subtle){
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
      }
      return btoa(unescape(encodeURIComponent(text))).split('').reverse().join('');
    }
    function setStatus(el, text){ if(el){ el.textContent = ''; if(text) el.dataset.keep='1'; else delete el.dataset.keep; } if(text) showMiniToast(text); }
    async function saveLocalPassword(){
      const oldInput = $('#oldPasswordInput');
      const newInput = $('#newPasswordInput');
      const confirmInput = $('#confirmPasswordInput');
      const status = $('#passwordStatus');
      const oldVal = oldInput?.value || '';
      const next = newInput?.value || '';
      const confirm = confirmInput?.value || '';
      if(next.length < 6){ setStatus(status, 'Password baru minimal 6 karakter. Jangan bikin password setipis tisu.'); return; }
      if(next !== confirm){ setStatus(status, 'Konfirmasi password tidak sama. Mata dipakai, bukan hiasan.'); return; }
      const existing = localStorage.getItem(STORAGE_PASSWORD_HASH);
      if(existing){
        const oldHash = await sha256Text(oldVal);
        if(oldHash !== existing){ setStatus(status, 'Password sekarang salah.'); return; }
      }
      localStorage.setItem(STORAGE_PASSWORD_HASH, await sha256Text(next));
      oldInput.value = newInput.value = confirmInput.value = '';
      setStatus(status, 'Password lokal berhasil disimpan. Nanti kalau Firebase Auth dipasang, alurnya tinggal diganti beneran.');
      renderStorageInfo();
    }
    function sendDummyReset(){
      const email = ($('#resetEmailInput')?.value || '').trim();
      const status = $('#resetStatus');
      if(!/^\S+@\S+\.\S+$/.test(email)){ setStatus(status, 'Isi email yang bener dulu. Ini bukan tebak-tebakan.'); return; }
      localStorage.setItem('datzonAiLastResetV17', JSON.stringify({email, at:new Date().toISOString()}));
      setStatus(status, `Permintaan reset diproses untuk ${email}. Cek email kalau akun Firebase-nya ada.`);
      renderStorageInfo();
    }
    function syncDzSelect(selectEl){
      if(!selectEl) return;
      const wrap = selectEl.nextElementSibling?.classList?.contains('dz-select') ? selectEl.nextElementSibling : null;
      if(!wrap) return;
      const label = wrap.querySelector('.dz-select-label');
      const menu = wrap.querySelector('.dz-select-menu');
      const options = Array.from(selectEl.options || []);
      const active = options.find(o => o.value === selectEl.value) || options[0];
      if(label) label.textContent = active?.textContent || 'Pilih';
      if(menu){
        menu.innerHTML = options.map(o => `<button type="button" class="dz-select-option ${o.value === selectEl.value ? 'active' : ''}" data-value="${escapeHtml(o.value)}"><span>${escapeHtml(o.textContent || '')}</span>${o.value === selectEl.value ? icons.check : ''}</button>`).join('');
      }
    }
    function initDzSelect(selectEl){
      if(!selectEl || selectEl.dataset.dzReady === '1') return;
      selectEl.dataset.dzReady = '1';
      selectEl.classList.add('native-hidden-select');
      const wrap = document.createElement('div');
      wrap.className = 'dz-select';
      wrap.innerHTML = `<button type="button" class="dz-select-btn" aria-haspopup="listbox" aria-expanded="false"><span class="dz-select-label"></span><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="dz-select-menu" role="listbox" hidden></div>`;
      selectEl.insertAdjacentElement('afterend', wrap);
      const btn = wrap.querySelector('.dz-select-btn');
      const menu = wrap.querySelector('.dz-select-menu');
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.dz-select.open').forEach(el => { if(el !== wrap){ el.classList.remove('open'); el.querySelector('.dz-select-menu')?.setAttribute('hidden',''); el.querySelector('.dz-select-btn')?.setAttribute('aria-expanded','false'); } });
        const open = !wrap.classList.contains('open');
        wrap.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        if(open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden','');
      });
      menu.addEventListener('click', e => {
        const opt = e.target.closest('.dz-select-option');
        if(!opt) return;
        e.preventDefault();
        e.stopPropagation();
        selectEl.value = opt.dataset.value || '';
        selectEl.dispatchEvent(new Event('change', {bubbles:true}));
        syncDzSelect(selectEl);
        wrap.classList.remove('open');
        menu.setAttribute('hidden','');
        btn.setAttribute('aria-expanded','false');
      });
      syncDzSelect(selectEl);
    }
    document.addEventListener('click', e => {
      if(e.target.closest('.dz-select')) return;
      document.querySelectorAll('.dz-select.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.dz-select-menu')?.setAttribute('hidden','');
        el.querySelector('.dz-select-btn')?.setAttribute('aria-expanded','false');
      });
    });

    function updateBugUi(){
      const txt = $('#bugText');
      const len = (txt?.value || '').length;
      $('#bugCount') && ($('#bugCount').textContent = len);
      const btn = $('#sendBugBtn');
      if(btn) btn.disabled = len < 4;
      updateSwitch($('#shakeReportSwitch'), !!profileState.shakeReport);
      renderBugChatSelect();
      renderBugContextCard();
    }
    function buildBugContextFromStack(stackRef){
      const text = noteTextFromStack(stackRef);
      if(!text) return null;
      const chat = getChatById(ensureCurrentChatId());
      return {
        chatId: currentChatId || ensureCurrentChatId(),
        chatTitle: chat?.title || makeChatTitle(lastUserText || text),
        answerText: text,
        page: location.href,
        createdAt: new Date().toISOString()
      };
    }
    function setBugReportContext(ctx=null){
      pendingBugContext = ctx;
      const type = $('#bugType');
      if(type){ type.value = ctx?.answerText ? 'answer' : 'ui'; syncDzSelect(type); }
      renderBugContextCard();
    }
    function renderBugChatSelect(){
      const sel = $('#bugChatSelect');
      if(!sel) return;
      const current = sel.value || pendingBugContext?.chatId || '';
      const seen = new Set();
      const rows = [];
      const add = (id, title) => {
        if(!id || seen.has(String(id))) return;
        seen.add(String(id));
        rows.push({id:String(id), title:title || 'Obrolan DATZON'});
      };
      if(currentChatId) add(currentChatId, getChatById(currentChatId)?.title || 'Obrolan aktif sekarang');
      chatHistory.forEach(c => add(c.id, c.pinned ? `📌 ${c.title}` : c.title));
      sel.innerHTML = '<option value="">Tanpa konteks obrolan</option>' + rows.map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.title)}</option>`).join('');
      if(current && rows.some(c => c.id === String(current))) sel.value = String(current);
      syncDzSelect(sel);
    }
    function renderBugContextCard(){
      const card = $('#bugContextCard');
      if(!card) return;
      const ctx = pendingBugContext;
      if(!ctx){ card.hidden = true; card.innerHTML = ''; return; }
      const snippet = String(ctx.answerText || '').replace(/\s+/g,' ').trim().slice(0,180);
      card.hidden = false;
      card.innerHTML = `<b>Konteks otomatis ikut laporan</b><p>${escapeHtml(ctx.chatTitle || 'Obrolan DATZON')}<br>${escapeHtml(snippet || 'Tidak ada potongan chat.')}</p><small>Chat ID: ${escapeHtml(ctx.chatId || 'guest')}</small>`;
    }
    function openReportWithContext(stackRef=null){
      setBugReportContext(stackRef ? buildBugContextFromStack(stackRef) : null);
      openSettingsPageV10();
      openSettingsView('report');
      updateBugUi();
      const txt = $('#bugText');
      if(txt && stackRef && !txt.value.trim()){
        txt.placeholder = 'Jelasin bug dari jawaban/chat ini. Konteks obrolan sudah ikut, jadi admin nggak perlu jadi dukun.';
      }
    }
    function sendBugReport(){
      const txt = ($('#bugText')?.value || '').trim();
      if(txt.length < 4) return;
      let arr = [];
      try{ arr = JSON.parse(localStorage.getItem(STORAGE_BUG_REPORTS) || '[]') || []; }catch(e){}
      arr.unshift({id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), type: $('#bugType')?.value || 'ui', selectedChatId: $('#bugChatSelect')?.value || pendingBugContext?.chatId || null, text:txt, context: pendingBugContext || null, at:new Date().toISOString(), accent:profileState.accent, page: location.href});
      localStorage.setItem(STORAGE_BUG_REPORTS, JSON.stringify(arr.slice(0,30)));
      $('#bugText').value = '';
      pendingBugContext = null;
      updateBugUi();
      setStatus($('#bugStatus'), 'Laporan bug disimpan. Kalau login, masuk Firestore. Kalau guest, ya ngendon di localStorage.');
      renderStorageInfo();
    }

    function providerExampleName(provider){
      return provider === 'mistral' ? 'Mistral 2' : provider === 'groq' ? 'Groq 2' : 'Google Studio 2';
    }
    function updateOwnApiKeyFormHint(){
      const provider = sanitizeOwnApiKeyProvider($('#ownApiKeyProvider')?.value || 'googleStudio');
      const name = $('#ownApiKeyName');
      const status = $('#ownApiKeyStatus');
      if(name && !name.value.trim()) name.placeholder = `Contoh: ${providerExampleName(provider)}`;
      if(status) status.textContent = `API key ${providerTypeLabel(provider)} pribadi hanya dipakai saat provider custom itu dipilih.`;
      syncDzSelect?.($('#ownApiKeyProvider'));
      syncDzSelect?.($('#ownApiKeyStorage'));
      uiApplySoon($('#pageOwnApiKeys') || document.body);
    }
    function renderOwnApiKeyPage(){
      const list = $('#ownApiKeyList');
      const storage = $('#ownApiKeyStorage');
      if(storage){
        const cloudOpt = storage.querySelector('option[value="cloud"]');
        if(cloudOpt) cloudOpt.disabled = !isLoggedInUser?.();
        if(!isLoggedInUser?.() && storage.value === 'cloud') storage.value = 'local';
        syncDzSelect?.(storage);
      }
      updateOwnApiKeyFormHint();
      if(!list) return;
      const items = ownApiKeys.slice().sort((a,b)=>String(a.name).localeCompare(String(b.name)));
      list.innerHTML = items.length ? items.map(item => `<button class="settings-row" type="button" data-own-key-id="${escapeAttr(item.id)}"><span class="settings-row-text"><b>${escapeHtml(sanitizeOwnApiKeyName(item.name))}</b><span>${escapeHtml(providerTypeLabel(item.provider))} • ${escapeHtml(item.storage === 'cloud' ? 'Firebase' : 'LocalStorage')}</span></span><span class="settings-next own-key-delete" data-own-key-delete="${escapeAttr(item.id)}">×</span></button>`).join('') : '<button class="settings-row" type="button"><span class="settings-row-text"><b>Belum ada API key sendiri</b><span>Tambahkan API key untuk memunculkan provider pribadi.</span></span></button>';
      uiApplySoon(list);
    }
    async function saveOwnApiKeyFromForm(){
      const provider = sanitizeOwnApiKeyProvider($('#ownApiKeyProvider')?.value || 'googleStudio');
      const nameEl = $('#ownApiKeyName');
      const keyEl = $('#ownApiKeyValue');
      const storageEl = $('#ownApiKeyStorage');
      const status = $('#ownApiKeyStatus');
      const name = sanitizeOwnApiKeyName(nameEl?.value || providerExampleName(provider));
      const key = String(keyEl?.value || '').trim();
      let storage = storageEl?.value === 'cloud' ? 'cloud' : 'local';
      if(!key){ setStatus(status, 'Masukkan kode API key dulu.'); return; }
      if(key.length < 12){ setStatus(status, 'Kode API key terlalu pendek. Cek lagi kodenya.'); return; }
      if(storage === 'cloud' && !isLoggedInUser?.()){
        storage = 'local';
        if(storageEl){ storageEl.value = 'local'; syncDzSelect?.(storageEl); }
      }
      const item = normalizeOwnApiKeyItem({provider, name, key, storage});
      try{
        if(storage === 'cloud') await saveOwnApiKeyToCloud(item);
        ownApiKeys = mergeOwnApiKeys(ownApiKeys.filter(x => x.id !== item.id), [item]);
        selectedEngine = ownProviderId(item);
        selectedOwnApiKeySnapshot = item;
        saveLocalOwnApiKeys();
        if(keyEl) keyEl.value = '';
        if(nameEl) nameEl.value = '';
        renderOwnApiKeyPage();
        rebuildModelMenu?.();
        updateModelLabel?.();
        setStatus(status, `API key custom tersimpan: ${name}. Provider ${name} langsung aktif.`);
        showMiniToast?.('API key custom tersimpan dan langsung aktif.');
      }catch(err){
        console.warn('Save custom API key gagal:', err);
        setStatus(status, `Gagal menyimpan API key: ${err.message || err.code || err}`);
      }
    }
    async function deleteOwnApiKeyById(id){
      const item = ownApiKeys.find(x => String(x.id) === String(id));
      if(!item) return;
      try{
        if(item.storage === 'cloud') await deleteOwnApiKeyFromCloud(item);
      }catch(err){ console.warn('Delete cloud custom API key gagal:', err); }
      ownApiKeys = ownApiKeys.filter(x => String(x.id) !== String(id));
      if(selectedEngine === ownProviderId(item)){ selectedEngine = 'Mistral'; selectedOwnApiKeySnapshot = null; lastDefaultEngine = 'Mistral'; }
      saveLocalOwnApiKeys();
      renderOwnApiKeyPage();
      updateModelLabel?.();
      showMiniToast?.('API key custom dihapus.');
    }

    settingsPage?.addEventListener('click', async e => {
      const apiLink = e.target.closest('[data-api-key-link]');
      if(apiLink){
        e.preventDefault();
        e.stopPropagation();
        const provider = sanitizeOwnApiKeyProvider(apiLink.dataset.apiKeyLink || 'googleStudio');
        window.open(API_KEY_LINKS[provider] || API_KEY_LINKS.googleStudio, '_blank', 'noopener');
        return;
      }
      const saveOwn = e.target.closest('#saveOwnApiKeyBtn');
      if(saveOwn){
        e.preventDefault();
        e.stopPropagation();
        await saveOwnApiKeyFromForm();
        return;
      }
      const delOwn = e.target.closest('[data-own-key-delete]');
      if(delOwn){
        e.preventDefault();
        e.stopPropagation();
        await deleteOwnApiKeyById(delOwn.dataset.ownKeyDelete);
        return;
      }
      const openBtn = e.target.closest('[data-settings-open]');
      if(openBtn){
        const target = openBtn.dataset.settingsOpen;
        if(target === 'home') openSettingsView('home');
        else if(target === 'personalization') openSettingsView('personalization');
        else if(target === 'characteristics') openSettingsView('characteristics');
        else if(target === 'memory') openSettingsView('memory');
        else if(target === 'photo'){ renderProfilePhotoPage?.(); openSettingsView('photo'); }
        else if(target === 'checkin'){ renderCheckinGrid(); openSettingsView('checkin'); }
        else if(target === 'limit'){ renderLimitRequestUi(); openSettingsView('limit'); }
        else if(target === 'rank'){ renderRankPage(); openSettingsView('rank'); }
        else if(target === 'redeem'){ renderRedeemPreview(null); openSettingsView('redeem'); }
        else if(target === 'quota'){ renderFreeLimitPage(); openSettingsView('quota'); }
        else if(target === 'apikeys'){ openSettingsView('apikeys'); renderOwnApiKeyPage?.(); }
        else if(target === 'adminPanel'){ window.location.href = 'admin.html'; }
        else if(target === 'general') openSettingsView('general');
        else if(target === 'auth'){ openSettingsView('auth'); switchAuthPanel(openBtn.dataset.authPanel || 'login'); requestIdle(() => startAuthListener($('#authStatus')), 250); }
        else if(target === 'security') openSettingsView('security');
        else if(target === 'storage'){ renderStorageInfo(); openSettingsView('storage'); }
        else if(target === 'report'){ setBugReportContext(null); updateBugUi(); openSettingsView('report'); }
        else if(target === 'about') openSettingsView('about');
        return;
      }

      const popBtn = e.target.closest('[data-settings-pop]');
      if(popBtn){
        openSettingsPopover(popBtn, popBtn.dataset.settingsPop);
        return;
      }

      const traitBtn = e.target.closest('[data-trait]');
      if(traitBtn){
        openSettingsPopover(traitBtn, 'trait', traitBtn.dataset.trait);
        return;
      }

      const toggle = e.target.closest('[data-toggle-setting]');
      if(toggle){
        const key = toggle.dataset.toggleSetting;
        profileState[key] = !profileState[key];
        saveProfileState();
        applyProfileState();
        return;
      }

      const claim = e.target.closest('[data-claim-day]');
      if(claim){
        await handleCheckinClaim(Number(claim.dataset.claimDay));
        return;
      }

      const freeMission = e.target.closest('[data-free-mission]');
      if(freeMission){
        startFreeMission(freeMission.dataset.freeMission, freeMission.dataset.freeId);
        return;
      }
      const freeClaim = e.target.closest('[data-free-claim]');
      if(freeClaim){
        await claimFreeMissionReward(freeClaim.dataset.freeClaim);
        return;
      }

      if(e.target.closest('#redeemCheckBtn')){
        await handleRedeemCheck();
        return;
      }
      const activate = e.target.closest('[data-activate-voucher]');
      if(activate){
        await activateVoucher(activate.dataset.activateVoucher);
        return;
      }

      if(e.target.closest('#savePasswordBtn')){
        await saveLocalPassword();
        return;
      }
      if(e.target.closest('#sendResetBtn')){
        sendDummyReset();
        return;
      }
      if(e.target.closest('#logoutAllSessionsBtn')){
        const sid = sessionStorage.getItem('datzonAiSessionIdV17');
        const current = getSessions().filter(x => x.id === sid).slice(0,1);
        saveSessions(current);
        renderSessions();
        renderStorageInfo();
        return;
      }
      if(e.target.closest('#clearRankImmortalBtn')){
        showCustomModal('Hapus Rank Immortal?', '<p class="modal-muted">Rank Immortal aktif akan dihapus dari localStorage dan profile Firebase akun ini. Aksi ini tidak bisa dibatalkan.</p>', [
          {label:'Batal', action:'cancel'},
          {label:'Konfirmasi hapus', action:'confirm', danger:true, primary:true}
        ], async action => {
          if(action !== 'confirm') return;
          resetRankStateLocalOnly();
          try{ await window.DATZON_CLOUD?.clearRankState?.(); }catch(err){ console.warn('Clear rank cloud gagal:', err); }
          applyProfileState();
          renderRankPage();
          showMiniToast?.('Rank Immortal sudah dihapus.');
        });
        return;
      }
      if(e.target.closest('#clearAllLocalDataBtn')){
        showCustomModal('Hapus semua data lokal?', '<p class="modal-muted">Semua localStorage DATZON di perangkat ini akan dihapus: nama lama, profile lokal, rank lokal, riwayat chat lokal, file lokal, laporan lokal, dan API key lokal. Akun Firebase tidak dihapus.</p>', [
          {label:'Batal', action:'cancel'},
          {label:'Konfirmasi hapus', action:'confirm', danger:true, primary:true}
        ], action => {
          if(action !== 'confirm') return;
          try{
            Object.keys(localStorage).filter(k => /^datzon/i.test(k) || /^DATZON/i.test(k)).forEach(k => localStorage.removeItem(k));
            Object.keys(sessionStorage).filter(k => /^datzon/i.test(k) || /^DATZON/i.test(k)).forEach(k => sessionStorage.removeItem(k));
          }catch(err){ console.warn('Clear local data gagal:', err); }
          showMiniToast?.('Data lokal DATZON dihapus. Memuat ulang...');
          setTimeout(() => location.reload(), 700);
        });
        return;
      }
      if(e.target.closest('#clearStoredChatsBtn')){
        const chatAssets = collectStorageAssets().filter(a => a.source && /chat|generated/i.test(a.source));
        tryDeleteCloudinaryAssets(chatAssets);
        localStorage.removeItem(STORAGE_CHATS);
        chatHistory = [];
        activeChatFiles = [];
        removeStoredAsset(a => a.source && /chat|generated/i.test(a.source));
        renderRecentChats();
        renderStorageInfo();
        showMiniToast?.('Riwayat obrolan lokal dihapus. Asset Cloudinary dicoba hapus kalau token masih valid.');
        return;
      }
      if(e.target.closest('#clearCloudChatsBtn')){
        if(!window.DATZON_CLOUD?.isLoggedIn?.()){ showMiniToast?.('Login dulu untuk hapus obrolan Firebase.'); return; }
        window.DATZON_CLOUD?.deleteAllChats?.().then(() => showMiniToast?.('Obrolan Firebase dihapus.')).finally(() => renderStorageInfo());
        return;
      }
      if(e.target.closest('#clearBugReportsBtn')){
        localStorage.removeItem(STORAGE_BUG_REPORTS);
        renderStorageInfo();
        showMiniToast?.('Laporan bug lokal dihapus.');
        return;
      }
      if(e.target.closest('#clearCloudBugReportsBtn')){
        if(!window.DATZON_CLOUD?.isLoggedIn?.()){ showMiniToast?.('Login dulu untuk hapus laporan bug Firebase.'); return; }
        window.DATZON_CLOUD?.deleteAllBugReports?.().then(() => showMiniToast?.('Laporan bug Firebase dihapus.')).finally(() => renderStorageInfo());
        return;
      }
      if(e.target.closest('#clearStoredAssetsBtn')){
        const assets = collectStorageAssets().filter(a => a.kind !== 'profile');
        tryDeleteCloudinaryAssets(assets);
        removeStoredAsset(a => a.kind !== 'profile');
        renderStorageInfo();
        showMiniToast?.('Metadata file/gambar lokal dihapus. Delete Cloudinary dicoba kalau token masih valid.');
        return;
      }
      if(e.target.closest('#clearCloudAssetsBtn')){
        if(!window.DATZON_CLOUD?.isLoggedIn?.()){ showMiniToast?.('Login dulu untuk hapus metadata aset Firebase.'); return; }
        window.DATZON_CLOUD?.deleteAllStorageAssets?.().then(() => showMiniToast?.('Metadata aset Firebase dihapus.')).finally(() => renderStorageInfo());
        return;
      }
      if(e.target.closest('#sendBugBtn')){
        sendBugReport();
        return;
      }

      const lang = e.target.closest('[data-language]');
      if(lang){
        profileState.language = lang.dataset.language;
        saveProfileState();
        applyProfileState();
        try{ window.DATZON_I18N?.setLanguage?.(profileState.language); }catch(e){}
        showMiniToast?.(profileState.language === 'English' ? 'Language changed to English.' : 'Bahasa diganti ke Indonesia.');
        return;
      }

      if(e.target.closest('[data-save-settings]')){
        saveInlineSettings();
        openSettingsView('home');
        return;
      }

      if(e.target.closest('#resetTraits')){
        profileState.traits = {...defaultProfileState.traits};
        saveProfileState();
        applyProfileState();
        return;
      }
    });

    $('#settingsPopover')?.addEventListener('click', async e => {
      const row = e.target.closest('.settings-pop-row');
      if(!row) return;
      const type = row.dataset.popType;
      const value = row.dataset.popValue;
      if(type === 'accent'){
        profileState.accent = value;
        saveProfileState();
        applyProfileState();
      }
      if(type === 'tone'){
        profileState.tone = value;
        saveProfileState();
        applyProfileState();
      }
      if(type === 'trait'){
        profileState.traits = profileState.traits || {...defaultProfileState.traits};
        profileState.traits[row.dataset.traitKey] = value;
        saveProfileState();
        applyProfileState();
      }
      closeSettingsPopover();
    });

    document.addEventListener('click', e => {
      if(!e.target.closest('.settings-popover, [data-settings-pop], [data-trait]')) closeSettingsPopover();
    });

    $('#profileEditBtn')?.addEventListener('click', editProfileName);
    initDzSelect($('#bugType'));
    initDzSelect($('#bugChatSelect'));
    $('#bugText')?.addEventListener('input', updateBugUi);
    $('#bugType')?.addEventListener('change', e => { syncDzSelect(e.target); updateBugUi(); });
    $('#ownApiKeyProvider')?.addEventListener('change', e => { syncDzSelect(e.target); updateOwnApiKeyFormHint?.(); });
    $('#ownApiKeyStorage')?.addEventListener('change', e => { syncDzSelect(e.target); updateOwnApiKeyFormHint?.(); });
    $('#bugChatSelect')?.addEventListener('change', e => {
      const id = e.target.value;
      if(!id){ setBugReportContext(null); syncDzSelect(e.target); updateBugUi(); return; }
      const item = getChatById(id);
      pendingBugContext = {chatId:id, chatTitle:item?.title || 'Obrolan DATZON', answerText:'', page:location.href, createdAt:new Date().toISOString()};
      syncDzSelect(e.target);
      renderBugContextCard();
    });
    $('#oldPasswordInput')?.addEventListener('keydown', e => { if(e.key === 'Enter') saveLocalPassword(); });
    $('#newPasswordInput')?.addEventListener('keydown', e => { if(e.key === 'Enter') saveLocalPassword(); });
    $('#confirmPasswordInput')?.addEventListener('keydown', e => { if(e.key === 'Enter') saveLocalPassword(); });

    // Override fungsi lama biar profile page tetap pakai versi V10, bukan fosil putih solid.
    openSettingsPage = openSettingsPageV10;
    closeSettingsPage = closeSettingsPageV10;
    settingsBack?.addEventListener('click', closeSettingsPageV10);

    preloadImmortalLogo();
    preloadImmortalLogo();
    hydrateStoredChats();
    applyProfileState();
    disableNativeSpellcheck();
    renderStyles();
    renderRecentChats();
    updateModelLabel();
    micIcon.innerHTML = icons.mic;
    sendIcon.innerHTML = icons.send;
    updateComposerSpace();
    // V22: paksa status awal bersih. Kalau CSS override lagi, kita tendang dari sini.
    sidebar?.classList.remove('show','search-open');
    sidebarBackdrop?.classList.remove('show');
    sidebar?.setAttribute('aria-hidden','true');

/* V22 Firebase + Cloudinary lazy bridge. Firebase baru bangun kalau dibutuhkan, bukan saat HP lagi ngos-ngosan buka UI. */
(function(){
  const fb = window.DATZON_FIREBASE || {ready:false, load:null};
  const cloud = window.DATZON_CLOUDINARY_CONFIG || {};
  const SESSION_KEY = 'datzonAiSessionIdV21';
  const AUTH_TOUCHED_KEY = 'datzonAiAuthTouchedV21';
  const MIGRATED_KEY = 'datzonAiMigratedToCloudV21';
  let currentUser = null;
  let authListenerStarted = false;
  let syncReady = false;
  let profileSaveTimer = 0;
  let chatSaveTimer = 0;
  let initialAccountLoadSettled = false;
  let initialAccountLoadResolve = null;
  const initialAccountLoadPromise = new Promise(resolve => { initialAccountLoadResolve = resolve; });
  function settleInitialAccountLoad(){
    if(initialAccountLoadSettled) return;
    initialAccountLoadSettled = true;
    document.body.classList.remove('datzon-account-loading');
    document.body.classList.add('datzon-account-ready');
    try{ initialAccountLoadResolve?.(true); }catch(_){}
  }
  async function waitForInitialAccountLoad(timeout=5200){
    if(initialAccountLoadSettled) return true;
    if(!authListenerStarted) startAuthListener(null);
    document.body.classList.add('datzon-account-loading');
    return Promise.race([
      initialAccountLoadPromise,
      new Promise(resolve => setTimeout(() => {
        // Jangan biarkan UI macet kalau Firebase/Firestore lambat atau jaringan putus.
        settleInitialAccountLoad();
        resolve(false);
      }, timeout))
    ]);
  }

  function uid(){ return currentUser && currentUser.uid; }
  function hasFirebase(){ return !!(fb && fb.ready && fb.auth && fb.db); }
  function nowIso(){ return new Date().toISOString(); }
  function fsNow(){ return hasFirebase() && fb.ts ? fb.ts() : nowIso(); }
  function asPlainIso(value){
    try{
      if(!value) return '';
      if(value.toDate) return value.toDate().toISOString();
      if(value instanceof Date) return value.toISOString();
      return String(value || '');
    }catch(e){ return ''; }
  }
  function stripUndefined(obj={}){
    const out = {};
    Object.entries(obj || {}).forEach(([k,v]) => {
      if(v !== undefined) out[k] = v;
    });
    return out;
  }
  function serverSafeProfileExtra(extra={}){
    const profile = {...(profileState.profile || {})};
    const directKeys = ['name','fullName','nickname','username','registeredWith','googleCompleted','migratedAt','rank','rankImmortalUntil','vouchers','redeemedVouchers','checkinState','claimedDays','photoPublicId','photoCloudName','photoBytes','photoDeleteToken'];
    directKeys.forEach(k => {
      if(extra[k] !== undefined) profile[k] = extra[k];
      else if(profileState[k] !== undefined) profile[k] = profileState[k];
    });
    profile.name = cleanNameCandidate(profile.name || profileState.name || profileState.displayName || '') || 'DATZON User';
    profile.displayName = profile.name;
    if(profileState.photoURL || extra.photoURL) profile.photoURL = extra.photoURL || profileState.photoURL;
    return profile;
  }
  function buildUserDocPayload(user=currentUser, extra={}, mode='update'){
    const email = user?.email || profileState.email || extra.email || '';
    const cleanDisplay = cleanNameCandidate(extra.displayName || extra.name || profileState.displayName || profileState.name || providerDisplayName(user)) || 'DATZON User';
    const payload = {
      uid: user?.uid || uid() || extra.uid || '',
      email,
      emailLower: String(email || '').toLowerCase(),
      displayName: cleanDisplay,
      photoURL: extra.photoURL !== undefined ? (extra.photoURL || '') : (profileState.photoURL || providerPhoto(user) || ''),
      provider: extra.provider || (user?.providerData || []).map(p => p.providerId).filter(Boolean).join(',') || (user?.providerId || 'password'),
      updatedAt: fsNow(),
      lastLoginAt: fsNow(),
      settings: {...(profileState.settings || {}), accent:profileState.accent || 'blue', appearance:profileState.appearance || 'dark', language:profileState.language || 'id'},
      profile: serverSafeProfileExtra({...extra, name:cleanDisplay}),
      stats: {...(profileState.stats || {}), lastSeenAt: nowIso()}
    };
    if(mode === 'create'){
      payload.role = 'user';
      payload.createdAt = fsNow();
    }
    return stripUndefined(payload);
  }
  async function docExists(ref){
    try{ const snap = await ref.get(); return snap.exists; }catch(e){ return false; }
  }
  function firestoreId(value=''){
    return String(value || '').replace(/[\/#?\[\]]/g,'_').slice(0,180) || (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
  }
  function normalizeCloudChatId(id=''){
    return firestoreId(id || ensureCurrentChatId?.());
  }
  function normalizeCloudMessage(m={}, idx=0, chatId=''){
    const role = m.role === 'ai' ? 'assistant' : (m.role === 'assistant' ? 'assistant' : (m.role === 'system' ? 'system' : 'user'));
    const isImage = !!m.imageMeta;
    const files = Array.isArray(m.files) ? m.files : [];
    const attachments = isImage ? [m.imageMeta] : files;
    return {
      id: firestoreId(m.id || `${String(idx+1).padStart(4,'0')}_${role}`),
      chatId:String(chatId),
      ownerId:uid(),
      role,
      content:String(m.text || m.content || '').slice(0,20000),
      type:isImage ? 'image' : (files.length ? 'file' : 'text'),
      attachments,
      metadata:isImage ? {imageMeta:m.imageMeta} : {},
      rating:m.rating || '',
      copied:!!m.copied,
      source:m.source || ''
    };
  }
  function cloudMessageToLocal(data={}){
    const role = data.role === 'assistant' ? 'ai' : (data.role || 'user');
    const attachments = Array.isArray(data.attachments) ? data.attachments : [];
    const imageMeta = data.metadata?.imageMeta || (data.type === 'image' ? attachments[0] : null);
    return {role, text:data.content || '', files:data.type === 'file' ? attachments : [], imageMeta};
  }
  function buildChatMetaPayload(item={}, mode='update'){
    const chatId = normalizeCloudChatId(item.id || currentChatId);
    const messages = Array.isArray(item.messages) ? item.messages : [];
    const payload = {
      id:chatId,
      ownerId:uid(),
      title:String(item.title || makeChatTitle?.(lastUserText || '') || 'Obrolan DATZON AI').slice(0,120),
      model:String(item.model || providerConfig?.()?.model || selectedEngine || 'DATZON').slice(0,40),
      provider:String(item.provider || selectedEngine || 'Mistral').slice(0,40),
      level:String(item.level || selectedLevel || 'Tinggi').slice(0,30),
      isTemporary:!!item.temporary,
      updatedAt:fsNow(),
      lastMessageAt:fsNow(),
      expiresAt:item.temporary && item.expiresAt ? new Date(item.expiresAt) : null,
      messageCount:Number(messages.length || 0),
      pinned:!!item.pinned,
      archived:!!item.archived,
      deleted:!!item.deleted
    };
    if(mode === 'create'){
      payload.role = 'user';
      payload.createdAt = fsNow();
    }
    return stripUndefined(payload);
  }
  function fileMetaToFirestore(asset={}){
    const a = normalizeStoredAsset?.(asset) || asset || {};
    const url = a.cloudUrl || a.url || a.downloadURL || '';
    return stripUndefined({
      id:firestoreId(a.id || a.name || url),
      ownerId:uid(),
      name:String(a.name || a.title || 'DATZON file').slice(0,255),
      type:String(a.type || (String(a.mimeType || '').startsWith('image/') ? 'image' : 'file')).slice(0,40),
      mimeType:String(a.mimeType || a.mime || '').slice(0,120),
      size:Number(a.size || a.bytes || a.cloudBytes || 0) || 0,
      storagePath:String(a.storagePath || a.cloudPublicId || a.publicId || a.id || '').slice(0,500),
      downloadURL:url,
      chatId:String(a.chatId || currentChatId || '').slice(0,160),
      status:String(a.status || 'active').slice(0,40),
      updatedAt:fsNow()
    });
  }
  let knownUserDocExists = false;
  function updateAuthBridge(){
    window.DATZON_CLOUD = {
      isLoggedIn: () => !!uid(),
      uid: () => uid() || '',
      email: () => currentUser?.email || '',
      ensureFirebase,
      createVoucher: async voucher => {
        if(!hasFirebase() || !uid() || !voucher?.code) return false;
        const cleanCode = String(voucher.code).toUpperCase();
        await fb.db.collection('vouchers').doc(cleanCode).set({
          ...voucher,
          code:cleanCode,
          ownerUid:uid(),
          ownerEmail:currentUser?.email || voucher.ownerEmail || '',
          status:voucher.status || 'unused',
          createdAt: fb.ts ? fb.ts() : nowIso()
        }, {merge:true});
        await fb.db.collection('users').doc(uid()).collection('vouchers').doc(cleanCode).set({code:cleanCode, ownerUid:uid(), status:voucher.status || 'unused', type:voucher.type || 'rank_trial', rank:voucher.rank || 'Immortal', days:voucher.days || 3, createdAt: fb.ts ? fb.ts() : nowIso()}, {merge:true});
        return true;
      },
      getVoucher: async code => {
        if(!hasFirebase() || !uid() || !code) return null;
        const cleanCode = String(code).trim().toUpperCase();
        const doc = await fb.db.collection('vouchers').doc(cleanCode).get();
        if(!doc.exists) return null;
        const data = doc.data() || {};
        if(data.ownerUid && data.ownerUid !== uid()) return null;
        return {code:cleanCode, ...data};
      },
      redeemVoucher: async (code, payload={}) => {
        if(!hasFirebase() || !uid() || !code) return null;
        const cleanCode = String(code).trim().toUpperCase();
        const ref = fb.db.collection('vouchers').doc(cleanCode);
        const doc = await ref.get();
        if(!doc.exists) return null;
        const data = doc.data() || {};
        if(data.ownerUid && data.ownerUid !== uid()) return null;
        if(data.status === 'used') return {...data, code:cleanCode, status:'used'};
        await ref.set({status:'used', usedAt:fb.ts ? fb.ts() : nowIso(), usedBy:uid(), rankImmortalUntil:payload.rankImmortalUntil || ''}, {merge:true});
        await fb.db.collection('users').doc(uid()).collection('vouchers').doc(cleanCode).set({ownerUid:uid(), status:'used', usedAt:fb.ts ? fb.ts() : nowIso(), rankImmortalUntil:payload.rankImmortalUntil || ''}, {merge:true});
        await saveProfileCloud({rank:payload.rank || 'Immortal', rankImmortalUntil:payload.rankImmortalUntil || ''});
        return {...data, code:cleanCode, status:'used'};
      },
      saveStorageAsset: async asset => {
        if(!hasFirebase() || !uid() || !asset) return false;
        const a = fileMetaToFirestore(asset);
        if(!a.id) return false;
        const ref = fb.db.collection('users').doc(uid()).collection('files').doc(a.id);
        const exists = await docExists(ref);
        await ref.set({...a, ...(exists ? {} : {createdAt:fsNow()}), updatedAt:fsNow()}, {merge:true});
        return true;
      },
      deleteAllChats: async () => {
        if(!hasFirebase() || !uid()) return false;
        await deleteAllCloudChats();
        return true;
      },
      deleteAllBugReports: async () => {
        // Bug report utama sekarang top-level /bugReports supaya admin panel nanti gampang baca.
        // User biasa tidak diizinkan list/delete bug report lewat rules, jadi tombol ini cukup no-op aman.
        return false;
      },
      deleteAllStorageAssets: async () => {
        if(!hasFirebase() || !uid()) return false;
        const snap = await fb.db.collection('users').doc(uid()).collection('files').limit(250).get();
        const batch = fb.db.batch();
        snap.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        return true;
      },
      clearRankState: async () => {
        if(!hasFirebase() || !uid()) return false;
        profileState.rank = 'Guest';
        profileState.rankImmortalUntil = '';
        profileState.vouchers = [];
        profileState.redeemedVouchers = [];
        const userRef = fb.db.collection('users').doc(uid());
        await saveProfileCloud({rank:'Guest', rankImmortalUntil:'', vouchers:[], redeemedVouchers:[]});
        try{
          const snap = await userRef.collection('vouchers').limit(100).get();
          const batch = fb.db.batch();
          snap.forEach(doc => batch.delete(doc.ref));
          await batch.commit();
        }catch(err){ console.warn('Hapus voucher user gagal:', err); }
        return true;
      }
    };
  }
  function markAuthTouched(){ try{ localStorage.setItem(AUTH_TOUCHED_KEY, '1'); }catch(e){} }
  function authWasTouched(){ try{ return localStorage.getItem(AUTH_TOUCHED_KEY) === '1'; }catch(e){ return false; } }

  async function ensureFirebase(statusEl=null){
    if(hasFirebase()) return true;
    if(!fb || typeof fb.load !== 'function'){
      setStatus(statusEl, 'Firebase loader belum tersedia. Cek firebase.js.');
      return false;
    }
    try{
      setStatus(statusEl, 'Menyiapkan Firebase...');
      await fb.load();
      return hasFirebase();
    }catch(err){
      setStatus(statusEl, `Firebase gagal dimuat: ${err.message || err.code || err}`);
      return false;
    }
  }

  function requestIdle(fn, timeout=2200){
    if('requestIdleCallback' in window) requestIdleCallback(fn, {timeout});
    else setTimeout(fn, Math.min(timeout, 900));
  }

  function currentSid(){
    let sid = sessionStorage.getItem(SESSION_KEY) || sessionStorage.getItem('datzonAiSessionIdV18') || sessionStorage.getItem('datzonAiSessionIdV17');
    if(!sid){ sid = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`); }
    sessionStorage.setItem(SESSION_KEY, sid);
    return sid;
  }
  function safeSetText(sel, value){ const el = $(sel); if(el) el.textContent = value; }
  function initialsFrom(name){ return String(name || 'DATZON User').trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase() || 'DU'; }
  function avatarMarkup(url, initials){
    return url ? `<img src="${escapeHtml(url)}" alt="Avatar" class="profile-avatar-img" loading="lazy" decoding="async">` : escapeHtml(initials);
  }
  function setAvatarElement(el, url, initials){
    if(!el) return;
    const editBtn = el.querySelector('.profile-edit');
    el.innerHTML = avatarMarkup(url, initials);
    if(editBtn) el.appendChild(editBtn);
  }

  function currentProfilePayload(extra={}, mode='update'){
    return buildUserDocPayload(currentUser, extra, mode);
  }

  async function saveProfileCloud(extra={}){
    saveProfileStateLocalOnly();
    if(!hasFirebase() || !uid()) return;
    try{
      const ref = fb.db.collection('users').doc(uid());
      const create = !!extra.createdAt || !knownUserDocExists && !(await docExists(ref));
      await ref.set(currentProfilePayload(extra, create ? 'create' : 'update'), {merge:true});
      knownUserDocExists = true;
    }catch(err){ console.warn('Profile cloud save gagal:', err); }
  }

  async function saveChatCloud(item){
    if(!hasFirebase() || !uid() || !item?.id) return;
    try{
      await saveProfileCloud({});
      const chatId = normalizeCloudChatId(item.id);
      const chatRef = fb.db.collection('users').doc(uid()).collection('chats').doc(chatId);
      const exists = await docExists(chatRef);
      await chatRef.set(buildChatMetaPayload({...item, id:chatId}, exists ? 'update' : 'create'), {merge:true});
      const messages = Array.isArray(item.messages) ? item.messages : [];
      for(let i=0;i<messages.length;i++){
        const msg = normalizeCloudMessage(messages[i], i, chatId);
        const msgRef = chatRef.collection('messages').doc(msg.id);
        const msgExists = await docExists(msgRef);
        const payload = {...msg, updatedAt:fsNow()};
        if(!msgExists) payload.createdAt = fsNow();
        await msgRef.set(payload, {merge:true});
      }
    }catch(err){ console.warn('Chat cloud save gagal:', err); }
  }

  function queueCurrentChatCloudSave(){
    if(!hasFirebase() || !uid() || !currentChatId) return;
    clearTimeout(chatSaveTimer);
    chatSaveTimer = setTimeout(() => {
      const item = chatHistory.find(x => String(x.id) === String(currentChatId));
      if(item) saveChatCloud(item);
    }, 650);
  }

  async function deleteAllCloudChats(){
    if(!hasFirebase() || !uid()) return;
    try{
      const snap = await fb.db.collection('users').doc(uid()).collection('chats').limit(80).get();
      const batch = fb.db.batch();
      snap.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    }catch(err){ console.warn('Hapus cloud chat gagal:', err); }
  }

  async function migrateLocalToCloud(){
    if(!hasFirebase() || !uid()) return;
    const key = `${MIGRATED_KEY}:${uid()}`;
    try{ if(localStorage.getItem(key) === '1') return; }catch(e){}
    const localChats = loadStoredChatsMeta().slice(0,24);
    await saveProfileCloud({migratedAt: fb.ts ? fb.ts() : nowIso()});
    for(const chat of localChats) await saveChatCloud(chat);
    try{ localStorage.setItem(key, '1'); }catch(e){}
  }

  const bootProfileSnapshot = (() => { try{return {...profileState};}catch(_){return {};} })();
  let rememberedRealName = '';
  function looksLikeEmail(value=''){
    // Tolak email walaupun nempel dengan teks lain: "email@gmail.com • data sinkron" tetap dianggap bukan nama.
    return /[^\s@]+@[^\s@]+\.[^\s@]+/i.test(String(value || '').trim());
  }
  function isPlaceholderName(value=''){
    const v = String(value || '').trim();
    return !v || /^(DATZON User|Datzon User|Masuk \/ Daftar|DATZON Guest|Guest mode|Akun Firebase)$/i.test(v);
  }
  const REAL_NAME_CACHE_KEY = 'datzonAiRealNameByEmailV25';
  function emailCacheKey(email=''){
    return String(email || '').trim().toLowerCase();
  }
  function readRealNameCache(){
    try{ const data = JSON.parse(localStorage.getItem(REAL_NAME_CACHE_KEY) || '{}'); return data && typeof data === 'object' ? data : {}; }catch(e){ return {}; }
  }
  function rememberRealNameForEmail(email='', name=''){
    const key = emailCacheKey(email || currentUser?.email || profileState.email || '');
    const clean = cleanNameCandidate(name);
    if(!key || !clean) return;
    try{
      const data = readRealNameCache();
      data[key] = clean;
      localStorage.setItem(REAL_NAME_CACHE_KEY, JSON.stringify(data));
    }catch(e){}
  }
  function rememberedNameForEmail(email=''){
    const key = emailCacheKey(email || currentUser?.email || profileState.email || '');
    return cleanNameCandidate(readRealNameCache()[key] || '');
  }
  function providerNameNoEmail(user=currentUser){
    const direct = String(user?.displayName || '').trim();
    const providerClean = (user?.providerData || [])
      .map(p => String(p?.displayName || '').trim())
      .find(n => n && !looksLikeEmail(n) && !isPlaceholderName(n));
    if(direct && !looksLikeEmail(direct) && !isPlaceholderName(direct)) return direct.slice(0, 40);
    if(providerClean) return providerClean.slice(0, 40);
    return user?.email ? String(user.email).split('@')[0].slice(0, 32) : 'DATZON User';
  }
  function cleanNameCandidate(value=''){
    const v = String(value || '').replace(/\s+•\s*data sinkron Firebase/ig, '').replace(/\s*♛\s*/g, '').trim();
    if(isPlaceholderName(v) || looksLikeEmail(v)) return '';
    return v.slice(0, 40);
  }
  function profileNameFromDom(){
    try{
      const el = $('#profileName');
      if(!el) return '';
      const span = el.querySelector('span');
      return cleanNameCandidate(span?.textContent || el.textContent || '');
    }catch(e){ return ''; }
  }
  function bestProfileName(user=currentUser, extra=[]){
    const localBootName = cleanNameCandidate(bootProfileSnapshot.name);
    const rememberedByEmail = rememberedNameForEmail(user?.email || profileState.email || '');
    const candidates = [
      ...extra,
      profileState.displayName,
      profileState.fullName,
      profileState.username,
      profileState.name,
      profileState.nickname,
      rememberedByEmail,
      rememberedRealName,
      profileNameFromDom(),
      bootProfileSnapshot.displayName,
      bootProfileSnapshot.fullName,
      localBootName,
      providerNameNoEmail(user)
    ];
    const found = candidates.map(cleanNameCandidate).find(Boolean) || providerNameNoEmail(user) || 'DATZON User';
    const clean = cleanNameCandidate(found) || found;
    if(cleanNameCandidate(clean)){
      rememberedRealName = clean;
      rememberRealNameForEmail(user?.email || profileState.email || '', clean);
    }
    return clean;
  }
  function forceSidebarProfileIdentity(name='', email=''){
    const sideName = $('#sideProfileName') || $('.side-profile-name');
    const sideStatus = $('#sideProfileStatus') || $('.side-profile-card .side-profile-text span');
    const rankState = currentRankState?.() || {active:false};
    const adminState = isAdminProfile?.() || false;
    const finalName = cleanNameCandidate(name) || bestProfileName(currentUser, [name, rememberedRealName, profileNameFromDom()]) || 'DATZON User';
    const finalEmail = email || currentUser?.email || profileState.email || 'Guest localStorage • klik buat login';
    if(cleanNameCandidate(finalName)){
      profileState.name = finalName;
      profileState.displayName = finalName;
      rememberRealNameForEmail(finalEmail, finalName);
    }
    if(sideName){
      sideName.classList.toggle('immortal-name', !!rankState.active);
      sideName.classList.toggle('admin-name', !!adminState);
      sideName.dataset.profileName = finalName;
      sideName.title = finalName;
      sideName.innerHTML = (rankState.active || adminState) ? decoratedProfileNameHTML(finalName) : escapeHtml(finalName);
    }
    if(sideStatus){
      sideStatus.textContent = finalEmail;
      sideStatus.title = finalEmail;
    }
  }
  function normalizeProfileIdentity(user=currentUser, cloudData={}){
    const before = cleanNameCandidate(profileState.name) || cleanNameCandidate(bootProfileSnapshot.name) || rememberedRealName;
    const best = bestProfileName(user, [cloudData.name, cloudData.displayName, cloudData.fullName, cloudData.profile?.name, cloudData.localBeforeName, before]);
    profileState.name = looksLikeEmail(best) ? providerNameNoEmail(user) : best;
    if(user?.email) profileState.email = user.email;
    const googlePhoto = providerPhoto(user);
    if(!profileState.photoURL && googlePhoto) profileState.photoURL = googlePhoto;
    if(cleanNameCandidate(profileState.name)){
      rememberedRealName = profileState.name;
      rememberRealNameForEmail(user?.email || profileState.email || '', profileState.name);
    }
    return {name:profileState.name, photo:profileState.photoURL || googlePhoto || ''};
  }
  function preferAuthName(){ return bestProfileName(currentUser); }

  function applyAuthUi(){
    updateAuthBridge();
    const logged = !!currentUser;
    const identity = logged ? normalizeProfileIdentity(currentUser) : {name:(profileState.name || 'DATZON User'), photo:(profileState.photoURL || '')};
    let displayName = logged ? identity.name : (profileState.name || 'DATZON User');
    if(looksLikeEmail(displayName) || isPlaceholderName(displayName)) displayName = bestProfileName(currentUser, [bootProfileSnapshot.name, rememberedRealName]);
    const email = logged ? (currentUser.email || profileState.email || 'Akun Firebase') : 'datzon.user@example.com';
    const sidebarName = bestProfileName(currentUser, [displayName, identity.name, rememberedRealName, profileNameFromDom()]) || 'DATZON User';
    if(logged && currentUser?.email && profileState.email !== currentUser.email){
      profileState.email = currentUser.email;
      try{ saveProfileStateLocalOnly ? saveProfileStateLocalOnly() : localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profileState)); }catch(e){}
    }
    const photo = logged ? (identity.photo || providerPhoto(currentUser) || '') : (profileState.photoURL || '');
    const initials = initialsFrom(displayName);
    setAvatarElement($('#profileAvatar'), photo, initials);
    renderProfilePhotoPage?.();
    setAvatarElement($('#sideAvatar') || $('.side-profile-card .side-avatar'), photo, initials.slice(0,2));
    setAvatarElement($('#authAvatarMini'), photo, initials.slice(0,2));
    safeSetText('#profileName', displayName);
    safeSetText('#sideProfileName', sidebarName);
    const rankState = currentRankState();
    const adminState = isAdminProfile?.() || false;
    const pName = $('#profileName');
    const sName = $('#sideProfileName') || $('.side-profile-name');
    pName?.classList.toggle('immortal-name', !!rankState.active);
    sName?.classList.toggle('immortal-name', !!rankState.active);
    pName?.classList.toggle('admin-name', !!adminState);
    sName?.classList.toggle('admin-name', !!adminState);
    if(pName && (rankState.active || adminState)) pName.innerHTML = decoratedProfileNameHTML(displayName);
    if(sName && (rankState.active || adminState)) sName.innerHTML = decoratedProfileNameHTML(sidebarName);
    ensureImmortalNameBadges();
    requestAnimationFrame(() => ensureImmortalNameBadges());
    $('#profileAvatar')?.classList.toggle('immortal-avatar', !!rankState.active);
    ($('#sideAvatar') || $('.side-profile-card .side-avatar'))?.classList.toggle('immortal-avatar', !!rankState.active);
    $('#profileAvatar')?.classList.toggle('admin-avatar', !!adminState);
    ($('#sideAvatar') || $('.side-profile-card .side-avatar'))?.classList.toggle('admin-avatar', !!adminState);
    safeSetText('#sideProfileStatus', logged ? email : 'Guest localStorage • klik buat login');
    forceSidebarProfileIdentity(sidebarName, logged ? email : 'Guest localStorage • klik buat login');
    requestAnimationFrame(() => forceSidebarProfileIdentity(sidebarName, logged ? email : 'Guest localStorage • klik buat login'));
    setTimeout(() => forceSidebarProfileIdentity(sidebarName, logged ? email : 'Guest localStorage • klik buat login'), 220);
    const sideNameFallback = $('.side-profile-card .side-profile-text b');
    const sideSubFallback = $('.side-profile-card .side-profile-text span');
    if(sideNameFallback && sideNameFallback.id !== 'sideProfileName') sideNameFallback.textContent = sidebarName;
    if(sideSubFallback && sideSubFallback.id !== 'sideProfileStatus') sideSubFallback.textContent = logged ? email : 'Guest localStorage • klik buat login';
    safeSetText('#profileEmailLabel', email);
    safeSetText('#authRowTitle', logged ? 'Akun tersambung' : 'Masuk / Daftar');
    safeSetText('#authRowSub', logged ? `${email} • data sinkron Firebase` : 'Sinkron profile dan obrolan ke Firebase.');
    safeSetText('#authUserTitle', logged ? displayName : 'Guest mode');
    safeSetText('#authUserSub', logged ? `${email} • Firestore aktif` : 'Obrolan tersimpan di localStorage.');
    const logoutBtn = $('#authLogoutBtn');
    if(logoutBtn) logoutBtn.hidden = !logged;
    const adminRow = $('#adminPanelRow');
    if(adminRow) adminRow.hidden = !(logged && adminState);
    document.body.classList.toggle('has-admin-role', !!adminState);
    syncAuthEmailFields(currentUser?.email || profileState.email || '');
    const authStatus = $('#authStatus');
    if(authStatus && !authStatus.dataset.keep) authStatus.textContent = '';
    document.body.classList.toggle('is-logged-in', logged);
    document.body.classList.toggle('profile-has-photo', !!photo);
  }

  try{ ownApiKeys = readLocalOwnApiKeys(); }catch(e){ ownApiKeys = []; }
  setTimeout(() => { try{ refreshOwnApiKeysFromStorage(); }catch(e){} }, 250); // boot custom API keys

  const saveProfileStateLocalOnly = saveProfileState;
  const oldApplyProfileState = applyProfileState;
  applyProfileState = function(){ oldApplyProfileState(); applyAuthUi(); };

  saveProfileState = function(){
    saveProfileStateLocalOnly();
    if(syncReady){
      clearTimeout(profileSaveTimer);
      profileSaveTimer = setTimeout(() => saveProfileCloud(), 850);
    }
  };

  const oldSaveChatsToStorage = saveChatsToStorage;
  saveChatsToStorage = function(){ oldSaveChatsToStorage(); queueCurrentChatCloudSave(); };

  const oldSaveCurrentChat = saveCurrentChat;
  saveCurrentChat = function(){ oldSaveCurrentChat(); queueCurrentChatCloudSave(); };

  const oldDeleteAll = deleteAllCloudChats;
  void oldDeleteAll;

  const oldRenderStorageInfo = renderStorageInfo;
  renderStorageInfo = function(){
    oldRenderStorageInfo();
  };

  async function loadCloudProfileAndChatsOnce(){
    if(!hasFirebase() || !uid()) return;
    const userRef = fb.db.collection('users').doc(uid());
    try{
      const doc = await userRef.get();
      const localBeforeName = cleanNameCandidate(profileState.name) || cleanNameCandidate(bootProfileSnapshot.name) || rememberedRealName;
      if(doc.exists){
        const data = doc.data() || {};
        const cloudProfile = data.profile || {};
        profileState = {...profileState, ...cloudProfile, ...data, profile:{...cloudProfile}};
        profileState.name = cleanNameCandidate(cloudProfile.name || data.displayName || data.name || '') || providerDisplayName(currentUser) || profileState.name;
        profileState.displayName = cleanNameCandidate(data.displayName || cloudProfile.displayName || profileState.name) || profileState.name;
        profileState.role = data.role || cloudProfile.role || profileState.role || 'user';
        profileState.rank = cloudProfile.rank || data.rank || 'Guest';
        profileState.rankImmortalUntil = cloudProfile.rankImmortalUntil || data.rankImmortalUntil || '';
        profileState.vouchers = Array.isArray(cloudProfile.vouchers) ? cloudProfile.vouchers : [];
        profileState.redeemedVouchers = Array.isArray(cloudProfile.redeemedVouchers) ? cloudProfile.redeemedVouchers : [];
        profileState.checkinState = cloudProfile.checkinState || {claimedDays:[], lastClaimDate:'', vouchers:[]};
        profileState.claimedDays = Array.isArray(cloudProfile.claimedDays) ? cloudProfile.claimedDays : (profileState.checkinState.claimedDays || []);
        normalizeProfileIdentity(currentUser, {...data, ...cloudProfile, localBeforeName:''});
        knownUserDocExists = true;
        saveProfileStateLocalOnly();
        // Kalau dokumen lama pernah menyimpan email sebagai nama, betulkan balik ke nama asli.
        if(looksLikeEmail(data.name || '') && profileState.name && hasFirebase() && uid()){
          saveProfileCloud({name:profileState.name, photoURL:profileState.photoURL || providerPhoto(currentUser) || ''});
        }
      }else{
        normalizeProfileIdentity(currentUser, {localBeforeName});
        await saveProfileCloud({createdAt: fb.ts ? fb.ts() : nowIso(), role: profileState.role || 'user', registeredWith: currentUser?.providerData?.some(p => p.providerId === 'google.com') ? 'google' : 'email'});
      }
    }catch(err){ console.warn('Load profile Firestore gagal:', err); }

    try{
      const snap = await userRef.collection('chats').orderBy('updatedAt','desc').limit(24).get();
      const arr = [];
      for(const doc of snap.docs){
        const chatData = {id:doc.id, ...(doc.data() || {})};
        let messages = [];
        try{
          const msgSnap = await doc.ref.collection('messages').orderBy('createdAt','asc').limit(120).get();
          msgSnap.forEach(mdoc => messages.push(cloudMessageToLocal(mdoc.data() || {})));
        }catch(msgErr){ console.warn('Load messages Firestore gagal:', msgErr); }
        const files = [];
        messages.forEach(m => { if(Array.isArray(m.files)) files.push(...m.files); if(m.imageMeta) files.push(m.imageMeta); });
        arr.push({...chatData, messages, files});
      }
      if(arr.length){
        chatHistory = arr.map(x => ({
          id:x.id,
          title:x.title || 'Obrolan DATZON AI',
          createdAt:asPlainIso(x.createdAt || x.updatedAt) || nowIso(),
          updatedAt:asPlainIso(x.updatedAt || x.createdAt) || nowIso(),
          messages:x.messages || [],
          files:x.files || [],
          pinned:!!x.pinned,
          temporary:!!x.isTemporary || !!x.temporary,
          expiresAt:asPlainIso(x.expiresAt) || ''
        }));
        oldSaveChatsToStorage();
        renderRecentChats();
        const openId = chatIdFromUrl();
        if(openId) setTimeout(() => loadStoredChat(openId), 80);
      }
      renderStorageInfo();
    }catch(err){ console.warn('Load chat Firestore gagal:', err); }
    try{
      const asetSnap = await userRef.collection('files').limit(250).get();
      const aset = [];
      asetSnap.forEach(doc => {
        const d = doc.data() || {};
        aset.push({
          id:d.id || doc.id,
          name:d.name,
          type:d.type,
          mimeType:d.mimeType,
          size:d.size,
          bytes:d.size,
          url:d.downloadURL,
          cloudUrl:d.downloadURL,
          storagePath:d.storagePath,
          chatId:d.chatId,
          createdAt:asPlainIso(d.createdAt),
          updatedAt:asPlainIso(d.updatedAt)
        });
      });
      if(aset.length){
        profileState.storageAssets = mergeStoredAssets(profileState.storageAssets || [], aset).slice(-500);
        saveStorageAssets(profileState.storageAssets);
        saveProfileStateLocalOnly();
        renderStorageInfo();
      }
    }catch(err){ console.warn('Load metadata files Firestore gagal:', err); }
    try{ await refreshOwnApiKeysFromStorage(); }catch(err){ console.warn('Load custom API keys setelah login gagal:', err); }
    oldApplyProfileState();
    applyAuthUi();
  }

  async function saveCloudSession(){
    if(!hasFirebase() || !uid()) return;
    try{
      const sid = firestoreId(currentSid());
      const ref = fb.db.collection('users').doc(uid()).collection('sessions').doc(sid);
      const exists = await docExists(ref);
      await ref.set({
        id:sid,
        ownerId:uid(),
        device:/Android/i.test(navigator.userAgent) ? 'Phone' : /Windows/i.test(navigator.userAgent) ? 'Computer' : 'Web device',
        browser:/Edg/i.test(navigator.userAgent) ? 'Edge' : /Chrome/i.test(navigator.userAgent) ? 'Chrome' : 'Browser',
        os:/Android/i.test(navigator.userAgent) ? 'Android' : /Windows/i.test(navigator.userAgent) ? 'Windows' : 'Unknown OS',
        userAgent:navigator.userAgent,
        ipHint:'',
        ...(exists ? {} : {createdAt:fsNow()}),
        lastActiveAt:fsNow(),
        current:true,
        trusted:false
      }, {merge:true});
    }catch(err){ console.warn('Session save gagal:', err); }
  }

  const oldRenderSessions = renderSessions;
  renderSessions = function(){ oldRenderSessions(); if(uid()) safeSetText('#sessionCount', getSessions().length || 1); };

  async function startAuthListener(statusEl=null){
    if(authListenerStarted) return true;
    document.body.classList.add('datzon-account-loading');
    const ok = await ensureFirebase(statusEl);
    if(!ok){ settleInitialAccountLoad(); return false; }
    authListenerStarted = true;
    fb.auth.onAuthStateChanged(async user => {
      currentUser = user || null;
      syncReady = !!user;
      try{
        if(user){
          markAuthTouched();
          normalizeProfileIdentity(user);
          saveProfileStateLocalOnly();
          applyAuthUi();
          // UI jangan nunggu Firestore/chats selesai. Kalau koneksi lambat, tombol tetap hidup.
          settleInitialAccountLoad();
          (async () => {
            try{
              await loadCloudProfileAndChatsOnce();
              applyAuthUi();
              await migrateLocalToCloud();
              applyAuthUi();
              requestIdle(() => saveCloudSession(), 1200);
            }catch(err){
              console.warn('Sinkron Firebase background gagal:', err);
            }finally{
              settleInitialAccountLoad();
            }
          })();
        }else{
          syncReady = false;
          // Setelah logout, jangan biarkan role/rank/nama akun terakhir bocor ke guest atau akun berikutnya.
          profileState.email = '';
          profileState.role = 'user';
          profileState.rank = 'Guest';
          profileState.rankImmortalUntil = '';
          if(authWasTouched()) profileState.name = 'DATZON User';
          saveProfileStateLocalOnly();
          hydrateStoredChats();
          applyAuthUi();
        }
      }finally{
        settleInitialAccountLoad();
      }
    });
    return true;
  }

  function providerDisplayName(user){
    return providerNameNoEmail(user);
  }
  function providerPhoto(user){
    return user?.photoURL || user?.providerData?.find(p => p && p.photoURL)?.photoURL || '';
  }
  function switchAuthPanel(panel){
    $$('.auth-panel').forEach(x => x.classList.toggle('is-active', x.dataset.authPanel === panel));
    const title = $('#pageAuth h2');
    if(title) title.textContent = panel === 'register' ? 'Register' : panel === 'complete-google' ? 'Lengkapi Akun' : 'Login';
    $$('.auth-segment [data-auth-tab]').forEach(btn => {
      const on = btn.dataset.authTab === panel;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    const seg = $('#authSegment');
    if(seg) seg.hidden = panel === 'complete-google';
    const logoutBtn = $('#authLogoutBtn');
    if(logoutBtn) logoutBtn.hidden = !currentUser || panel === 'complete-google';
    const status = $('#authStatus');
    if(status){ status.textContent = ''; delete status.dataset.keep; }
  }
  function syncAuthEmailFields(email=''){
    const value = email || currentUser?.email || profileState.email || '';
    ['loginEmail','regEmail','resetEmailInput'].forEach(id => { const el = $('#'+id); if(el && value && !el.value) el.value = value; });
  }
  function isPermissionDenied(err){
    return !!(err && (err.code === 'permission-denied' || err.code === 'auth/insufficient-permission' || /Missing or insufficient permissions/i.test(err.message || '')));
  }

  async function userDocExists(user){
    if(!hasFirebase() || !user) return false;
    try{
      const d = await fb.db.collection('users').doc(user.uid).get();
      knownUserDocExists = !!d.exists;
      return d.exists;
    }catch(e){
      console.warn('Cek user doc gagal:', e);
      // Jangan anggap akun Google "belum terdaftar" hanya karena rules Firestore menolak read.
      // Kalau ini false, UI bakal nyasar ke form Lengkapi Akun dan user kena error permission.
      return isPermissionDenied(e) ? null : false;
    }
  }
  async function saveNewUserProfile(user, name='', extra={}){
    if(!user) return;
    const cleanName = cleanNameCandidate(name) || bestProfileName(user, [extra.name, name]) || providerDisplayName(user) || 'DATZON User';
    const photo = providerPhoto(user);
    try{ await user.updateProfile?.({displayName:cleanName, photoURL:photo || user.photoURL || undefined}); }catch(e){}
    profileState.name = cleanName;
    profileState.displayName = cleanName;
    profileState.fullName = cleanName;
    profileState.email = user.email || profileState.email || '';
    if(photo) profileState.photoURL = photo;
    // Role admin hanya dipercaya dari Firestore, bukan dari cache lokal yang bisa kebawa akun lama.
    profileState.role = profileState.role === 'admin' ? 'admin' : 'user';
    saveProfileStateLocalOnly();
    applyAuthUi();
    if(hasFirebase()){
      const ref = fb.db.collection('users').doc(user.uid);
      const exists = await docExists(ref);
      if(!exists && !extra.preserveLocalEntitlements){
        profileState.role = 'user';
        profileState.rank = 'Guest';
        profileState.rankImmortalUntil = '';
        profileState.vouchers = [];
        profileState.redeemedVouchers = [];
        profileState.checkinState = {claimedDays:[], lastClaimDate:'', vouchers:[]};
        profileState.claimedDays = [];
      }
      const payload = buildUserDocPayload(user, {...extra, name:cleanName, displayName:cleanName, photoURL:profileState.photoURL || photo || '', createdAt:fsNow()}, exists ? 'update' : 'create');
      await ref.set(payload, {merge:true});
      knownUserDocExists = true;
    }
  }

  async function loginEmail(){
    const status = $('#authStatus');
    if(!await startAuthListener(status)) return;
    const email = ($('#loginEmail')?.value || '').trim();
    const pass = $('#loginPassword')?.value || '';
    if(!email || !pass) return setStatus(status, 'Email dan password isi dulu. Firebase bukan dukun tebak akun.');
    try{
      setStatus(status, 'Masuk...');
      const cred = await fb.auth.signInWithEmailAndPassword(email, pass);
      currentUser = cred.user;
      markAuthTouched();
      normalizeProfileIdentity(cred.user);
      applyAuthUi();
      setStatus(status, 'Login berhasil. Data sedang disinkronkan di background.');
      (async () => {
        try{ await loadCloudProfileAndChatsOnce(); applyAuthUi(); await migrateLocalToCloud(); applyAuthUi(); }
        catch(syncErr){ console.warn('Sync setelah login gagal:', syncErr); }
      })();
      switchAuthPanel('login');
    }catch(err){ setStatus(status, `Gagal login: ${err.message || err.code}`); }
  }

  async function registerEmail(){
    const status = $('#authStatus');
    if(!await startAuthListener(status)) return;
    const name = ($('#regName')?.value || '').trim();
    const email = ($('#regEmail')?.value || '').trim();
    const pass = $('#regPassword')?.value || '';
    const confirm = $('#regConfirm')?.value || '';
    if(name.length < 2) return setStatus(status, 'Nama isi minimal 2 karakter. Jangan jadi akun tanpa identitas, itu sudah cukup di komentar internet.');
    if(!/^\S+@\S+\.\S+$/.test(email)) return setStatus(status, 'Email valid dulu. Yang ngawur-ngawur nanti Firestore ikut pusing.');
    if(pass.length < 6) return setStatus(status, 'Password minimal 6 karakter. Rendah sekali, tapi tetap harus lewat.');
    if(pass !== confirm) return setStatus(status, 'Konfirmasi password tidak sama. Dua kolom saja bisa ribut.');
    try{
      setStatus(status, 'Mendaftarkan akun...');
      const cred = await fb.auth.createUserWithEmailAndPassword(email, pass);
      currentUser = cred.user;
      markAuthTouched();
      await saveNewUserProfile(cred.user, name, {registeredWith:'email'});
      setStatus(status, 'Register berhasil. Sinkron Firebase berjalan di background.');
      (async () => {
        try{ await loadCloudProfileAndChatsOnce(); applyAuthUi(); await migrateLocalToCloud(); applyAuthUi(); }
        catch(syncErr){ console.warn('Sync setelah register gagal:', syncErr); }
      })();
      switchAuthPanel('login');
    }catch(err){ setStatus(status, `Gagal daftar: ${err.message || err.code}`); }
  }

  async function loginGoogle(){
    const status = $('#authStatus');
    if(!await startAuthListener(status)) return;
    try{
      setStatus(status, 'Membuka Google login...');
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({prompt:'select_account'});
      const cred = await fb.auth.signInWithPopup(provider).catch(async err => {
        if(err && (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user')){
          await fb.auth.signInWithRedirect(provider);
          return null;
        }
        throw err;
      });
      markAuthTouched();
      if(!cred) return;
      currentUser = cred.user;
      const exists = await userDocExists(cred.user);
      const name = providerDisplayName(cred.user);
      const photo = providerPhoto(cred.user);
      profileState.email = cred.user.email || profileState.email || '';
      if(photo) profileState.photoURL = photo;
      if(name && (!profileState.name || profileState.name === 'DATZON User' || profileState.name === 'Datzon User')) profileState.name = name;
      saveProfileStateLocalOnly();
      applyAuthUi();
      let googleProfileSaved = exists === true;
      let googleProfileSaveDenied = false;
      if(exists !== true){
        // Akun Google adalah identitas yang valid. Jangan paksa user isi password baru.
        // Buat/merge dokumen profile DATZON langsung supaya logout-login berikutnya mulus.
        try{
          await saveNewUserProfile(cred.user, name, {registeredWith:'google', googleCompleted:true});
          googleProfileSaved = true;
        }catch(profileErr){
          console.warn('Simpan profile Google gagal, login tetap dilanjutkan:', profileErr);
          googleProfileSaveDenied = isPermissionDenied(profileErr);
        }
      }
      (async () => {
        try{ await loadCloudProfileAndChatsOnce(); applyAuthUi(); await migrateLocalToCloud(); applyAuthUi(); }
        catch(syncErr){ console.warn('Sync setelah Google login gagal:', syncErr); }
      })();
      switchAuthPanel('login');
      const googleMsg = googleProfileSaveDenied
        ? 'Google login berhasil, tapi Firestore rules masih menolak simpan profile. Cek rules users/{uid}.'
        : (googleProfileSaved && exists !== true ? 'Register Google berhasil. Data akun Google sudah tersimpan.' : 'Google login berhasil. Akun terdeteksi.');
      setStatus(status, googleMsg);
    }catch(err){ setStatus(status, `Google gagal: ${err.message || err.code}`); }
  }

  async function completeGoogleRegister(){
    const status = $('#authStatus');
    if(!currentUser) return setStatus(status, 'Login Google dulu, baru lengkapi register.');
    const name = ($('#googleRegName')?.value || '').trim() || providerDisplayName(currentUser);
    const pass = $('#googleRegPassword')?.value || '';
    const confirm = $('#googleRegConfirm')?.value || '';
    if(name.length < 2) return setStatus(status, 'Nama minimal 2 karakter.');
    if(pass.length < 6) return setStatus(status, 'Password minimal 6 karakter.');
    if(pass !== confirm) return setStatus(status, 'Konfirmasi password tidak sama.');
    try{
      setStatus(status, 'Menyimpan akun Google ke DATZON...');
      if(currentUser.email){
        try{
          const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, pass);
          await currentUser.linkWithCredential(cred);
        }catch(linkErr){ console.warn('Link password Google gagal/diabaikan:', linkErr); }
      }
      await saveNewUserProfile(currentUser, name, {registeredWith:'google', googleCompleted:true});
      (async () => {
        try{ await loadCloudProfileAndChatsOnce(); applyAuthUi(); await migrateLocalToCloud(); applyAuthUi(); }
        catch(syncErr){ console.warn('Sync setelah Google register gagal:', syncErr); }
      })();
      switchAuthPanel('login');
      setStatus(status, 'Register Google selesai. Data sudah tersimpan.');
    }catch(err){ setStatus(status, `Register Google gagal: ${err.message || err.code}`); }
  }

  async function logoutAuth(){
    if(!await ensureFirebase($('#authStatus'))) return;
    try{ await fb.auth.signOut(); setStatus($('#authStatus'), 'Keluar akun. Kembali ke guest localStorage.'); }
    catch(err){ setStatus($('#authStatus'), `Gagal logout: ${err.message || err.code}`); }
  }

  async function resetAuthPassword(){
    const status = $('#authStatus') || $('#resetStatus');
    if(!await ensureFirebase(status)) return;
    const email = ($('#loginEmail')?.value || $('#regEmail')?.value || $('#resetEmailInput')?.value || currentUser?.email || '').trim();
    if(!/^\S+@\S+\.\S+$/.test(email)) return setStatus(status, 'Isi email valid dulu.');
    try{ await fb.auth.sendPasswordResetEmail(email); setStatus(status, `Email reset dikirim ke ${email}.`); }
    catch(err){ setStatus(status, `Reset gagal: ${err.message || err.code}`); }
  }

  const oldSendDummyReset = sendDummyReset;
  sendDummyReset = function(){ return resetAuthPassword().catch(() => oldSendDummyReset()); };

  const oldSaveLocalPassword = saveLocalPassword;
  saveLocalPassword = async function(){
    if(hasFirebase() && currentUser){
      const oldInput = $('#oldPasswordInput');
      const newInput = $('#newPasswordInput');
      const confirmInput = $('#confirmPasswordInput');
      const status = $('#passwordStatus');
      const next = newInput?.value || '';
      const confirm = confirmInput?.value || '';
      if(next.length < 6) return setStatus(status, 'Password baru minimal 6 karakter. Jangan bikin password kayak niat belajar dadakan.');
      if(next !== confirm) return setStatus(status, 'Konfirmasi password tidak sama.');
      try{
        if(currentUser.email && oldInput?.value){
          const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, oldInput.value);
          await currentUser.reauthenticateWithCredential(cred);
        }
        await currentUser.updatePassword(next);
        oldInput.value = newInput.value = confirmInput.value = '';
        setStatus(status, 'Password Firebase berhasil diubah.');
      }catch(err){ setStatus(status, `Gagal ganti password: ${err.message || err.code}. Kalau login Google, pakai reset email atau login ulang.`); }
      return;
    }
    return oldSaveLocalPassword();
  };

  const oldSendBugReport = sendBugReport;
  sendBugReport = async function(){
    const txt = ($('#bugText')?.value || '').trim();
    if(txt.length < 4) return;
    if(hasFirebase() && uid()){
      try{
        const id = firestoreId(crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
        await fb.db.collection('bugReports').doc(id).set({
          id,
          uid:uid(),
          email:currentUser?.email || profileState.email || '',
          displayName:cleanNameCandidate(profileState.name || currentUser?.displayName || '') || 'DATZON User',
          message:txt.slice(0,2000),
          status:'open',
          page:location.href,
          userAgent:navigator.userAgent,
          createdAt:fsNow(),
          updatedAt:fsNow()
        });
        $('#bugText').value = '';
        pendingBugContext = null;
        updateBugUi();
        setStatus($('#bugStatus'), 'Laporan bug masuk Firestore. Laporan tersimpan.');
        renderStorageInfo();
        return;
      }catch(err){ setStatus($('#bugStatus'), `Firestore gagal, jatuh ke lokal: ${err.message || err.code}`); }
    }
    return oldSendBugReport();
  };


  function profileFallbackPhoto(){
    return currentUser?.photoURL || currentUser?.providerData?.find(p => p && p.photoURL)?.photoURL || '';
  }
  function currentProfilePhotoUrl(){
    return profileState.photoURL || profileFallbackPhoto() || '';
  }
  function renderProfilePhotoPage(){
    const preview = $('#profilePhotoPreview');
    const name = currentUser ? bestProfileName(currentUser) : (profileState.name || 'DATZON User');
    const photo = currentProfilePhotoUrl();
    const initials = initialsFrom(name || 'DU');
    if(preview) setAvatarElement(preview, photo, initials);
    safeSetText('#profilePhotoPageName', name);
    safeSetText('#profilePhotoPageDesc', uiText('Foto profil disimpan ke Cloudinary. Guest menyimpan URL di localStorage, akun login menyimpan URL di Firebase.'));
    safeSetText('#profilePhotoRowSub', uiText(photo ? 'Foto custom aktif.' : (currentUser ? 'Pakai foto Google/default.' : 'Pakai avatar guest default.')));
    const status = $('#profilePhotoStatus');
    if(status && !status.dataset.busy) status.textContent = uiText('Pilih gambar dari perangkat kamu. Gambar akan diupload ke Cloudinary preset profile.');
    uiApplySoon($('#pageProfilePhoto') || document.body);
  }
  function setProfilePhotoPageLoading(state, text=''){
    const wrap = $('#profilePhotoPreview')?.closest('.profile-photo-preview-wrap');
    const loading = $('#profilePhotoPageLoading');
    const status = $('#profilePhotoStatus');
    wrap?.classList.toggle('is-uploading', !!state);
    loading?.classList.toggle('show', !!state);
    if(status){
      status.dataset.busy = state ? '1' : '';
      if(text) status.textContent = text;
    }
  }
  async function removeProfilePhoto(){
    const oldAsset = {kind:'profile', bytes:profileState.photoBytes || 0, cloudUrl:profileState.photoURL || '', cloudPublicId:profileState.photoPublicId || '', cloudName:profileState.photoCloudName || cloudinaryConfig('profile').cloudName || '', deleteToken:profileState.photoDeleteToken || ''};
    tryDeleteCloudinaryAsset(oldAsset);
    profileState.photoURL = '';
    profileState.photoPublicId = '';
    profileState.photoCloudName = '';
    profileState.photoBytes = 0;
    profileState.photoDeleteToken = '';
    removeStoredAsset(a => a.kind === 'profile' || a.cloudUrl === oldAsset.cloudUrl || a.cloudPublicId === oldAsset.cloudPublicId);
    saveProfileStateLocalOnly();
    applyAuthUi();
    renderProfilePhotoPage();
    if(hasFirebase() && uid()) await saveProfileCloud({photoURL:'', photoPublicId:'', photoCloudName:'', photoBytes:0, photoDeleteToken:''});
    renderStorageInfo();
    showMiniToast?.(currentUser ? 'Foto dikembalikan ke foto akun Google/default.' : 'Foto profil guest dikembalikan ke default.');
  }

  async function uploadAvatarToCloudinary(file){
    if(!file) return;
    if(!/^image\//i.test(file.type || '')){
      setStatus($('#profilePhotoStatus') || $('#authStatus'), 'Pilih file gambar untuk foto profil.');
      return;
    }
    try{
      setProfilePhotoPageLoading(true, 'Mengupload foto profil ke Cloudinary...');
      showMiniToast?.('Sedang upload foto profil...');
      const data = await uploadToCloudinary(file, 'profile', {
        filename:`profile-${Date.now()}-${(file.name || 'avatar').replace(/[^a-z0-9_.-]/gi,'_')}`
      });
      profileState.photoURL = data.secure_url || data.url || '';
      profileState.photoPublicId = data.public_id || '';
      profileState.photoCloudName = cloudinaryConfig('profile').cloudName || '';
      profileState.photoBytes = data.bytes || file.size || 0;
      profileState.photoDeleteToken = data.delete_token || '';
      trackStoredAsset({kind:'profile', name:file.name || 'Foto profil', bytes:profileState.photoBytes, cloudUrl:profileState.photoURL, cloudPublicId:profileState.photoPublicId, cloudName:profileState.photoCloudName, deleteToken:profileState.photoDeleteToken, source:'profile'});
      saveProfileStateLocalOnly();
      applyAuthUi();
      renderProfilePhotoPage();
      if(hasFirebase() && uid()) await saveProfileCloud({photoURL:profileState.photoURL, photoPublicId:profileState.photoPublicId, photoCloudName:profileState.photoCloudName, photoBytes:profileState.photoBytes, photoDeleteToken:profileState.photoDeleteToken});
      renderStorageInfo();
      setProfilePhotoPageLoading(false, `Foto profil berhasil diupload ke Cloudinary (${data.__uploadAttempt || 'auto'}).`);
      showMiniToast?.('Foto profil berhasil diganti.');
    }catch(err){
      const msg = err?.message || String(err);
      setProfilePhotoPageLoading(false, `Upload foto profil gagal: ${msg}`);
      setStatus($('#authStatus'), `Upload foto profil gagal: ${msg}`);
      showMiniToast?.('Upload foto profil gagal. Cek preset Cloudinary profile.');
    }finally{
      const input = $('#profilePhotoInput');
      if(input) input.value = '';
    }
  }

  async function refreshCloudData(){
    const status = $('#authStatus');
    setStatus(status, 'Refresh data Firebase...');
    const ok = await startAuthListener(status);
    if(!ok) return;
    if(currentUser){
      await loadCloudProfileAndChatsOnce();
      setStatus(status, 'Data akun, profil, dan obrolan sudah direfresh.');
    }else{
      applyAuthUi();
      setStatus(status, 'Guest mode aktif. Login kalau mau sinkron Firebase.');
    }
  }

  $('#refreshDataBtn')?.addEventListener('click', refreshCloudData);
  $('#refreshNotesBtn')?.addEventListener('click', () => { renderNotesPage(); showMiniToast('Catatan di-refresh. Cache akhirnya kerja juga.'); });
  $('#notesSearchInput')?.addEventListener('input', renderNotesPage);
  $('#notesList')?.addEventListener('click', e => { const b = e.target.closest('[data-note-open]'); if(b) openNoteSource(b.dataset.noteOpen); });

  $('#googleLoginBtn')?.addEventListener('click', loginGoogle);
  $('#googleRegisterBtn')?.addEventListener('click', loginGoogle);
  $('#googleCompleteRegisterBtn')?.addEventListener('click', completeGoogleRegister);
  $('#emailLoginBtn')?.addEventListener('click', loginEmail);
  $('#emailRegisterBtn')?.addEventListener('click', registerEmail);
  $$('[data-auth-tab]').forEach(btn => btn.addEventListener('click', () => switchAuthPanel(btn.dataset.authTab)));
  $$('.password-eye').forEach(btn => btn.addEventListener('click', () => {
    const target = $('#'+btn.dataset.eyeTarget);
    if(!target) return;
    target.type = target.type === 'password' ? 'text' : 'password';
    btn.classList.toggle('is-visible', target.type === 'text');
  }));
  $('#authLogoutBtn')?.addEventListener('click', logoutAuth);
  $('#profileLogoutBtn')?.addEventListener('click', async e => {
    e.preventDefault();
    e.stopPropagation();
    await logoutAuth();
    openSettingsView('auth');
    switchAuthPanel('login');
  });
  $('#authResetBtn')?.addEventListener('click', resetAuthPassword);
  $('#profilePhotoInput')?.addEventListener('change', e => uploadAvatarToCloudinary(e.target.files?.[0]));
  $('#profilePhotoChangeBtn')?.addEventListener('click', () => $('#profilePhotoInput')?.click());
  $('#profilePhotoRemoveBtn')?.addEventListener('click', () => removeProfilePhoto());
  $('#profileAvatar')?.addEventListener('click', e => {
    if(e.target.closest('#profileEditBtn')) return;
    e.preventDefault();
    e.stopPropagation();
    renderProfilePhotoPage?.();
    openSettingsView('photo');
  });
  $('[data-settings-open="photo"]')?.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    openSettingsPageV10?.();
    renderProfilePhotoPage?.();
    openSettingsView('photo');
  }, true);
  renderProfilePhotoPage?.();

  sideProfileCard?.addEventListener('click', e => {
    if(e.target.closest('.side-gear')) return;
    closeSidebar();
    openSettingsPageV10();
    openSettingsView(currentUser ? 'home' : 'auth');
    if(!currentUser) switchAuthPanel('login');
    requestIdle(() => startAuthListener($('#authStatus')), 450);
  }, true);

  $('.side-gear')?.addEventListener('click', e => {
    requestIdle(() => startAuthListener($('#authStatus')), 450);
  }, true);

  try{
    if(localStorage.getItem('datzonAiTraitDefaultMigratedV21') !== '1'){
      profileState.traits = {warm:'Default', enthusiasm:'Default', lists:'Default', emoji:'Default'};
      localStorage.setItem('datzonAiTraitDefaultMigratedV21','1');
      saveProfileStateLocalOnly();
    }
  }catch(e){}

  window.requestIdle = requestIdle;
  window.startAuthListener = startAuthListener;
  window.DATZON_WAIT_ACCOUNT_READY = waitForInitialAccountLoad;
  updateAuthBridge();
  applyProfileState();
  // V24: boot sync sekarang langsung jalan. Sidebar menunggu profile/foto/chat Firebase selesai dulu.
  setTimeout(() => startAuthListener(null), 0);
})();


/* V19 performance helpers: jangan bikin HP jadi pemanggang roti. */
(function(){
  document.body.classList.add('perf-lite');
  document.addEventListener('visibilitychange', function(){
    document.body.classList.toggle('page-hidden', document.hidden);
  }, {passive:true});
})();


/* V22 emergency UI guard: sidebar/composer jangan keras kepala. */
(function(){
  function q(s){return document.querySelector(s)}
  function closeOnlySidebarSearch(){
    const side=q('#sidebar'), panel=q('#sideSearchPanel'), input=q('#sideSearchInput'), clear=q('#sideSearchClear');
    if(side) side.classList.remove('search-open');
    if(panel) panel.setAttribute('aria-hidden','true');
    if(input){ input.value=''; input.dispatchEvent(new Event('input', {bubbles:true})); }
    if(clear) clear.classList.remove('has-text');
  }
  function hardCloseSidebar(){
    const side=q('#sidebar'), back=q('#sidebarBackdrop');
    document.body.classList.remove('sidebar-open');
    if(side){ side.classList.remove('show','search-open'); side.setAttribute('aria-hidden','true'); }
    if(back) back.classList.remove('show');
  }
  requestAnimationFrame(hardCloseSidebar);
  q('#sideClose')?.addEventListener('click', function(e){
    const side=q('#sidebar');
    if(side?.classList.contains('search-open')){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); closeOnlySidebarSearch(); return;
    }
    e.preventDefault(); e.stopPropagation(); hardCloseSidebar();
  }, true);
  q('#sidebarBackdrop')?.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); hardCloseSidebar(); }, true);
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') hardCloseSidebar(); });
})();


/* V31 guard: tombol x kecil sidebar benar-benar hapus teks, bukan cuma pajangan mahal. */
(function(){
  document.addEventListener('pointerdown', function(e){
    const btn = e.target.closest && e.target.closest('#sideSearchClear');
    if(!btn) return;
    e.preventDefault(); e.stopPropagation();
    const input = document.querySelector('#sideSearchInput');
    if(input){ input.value=''; input.dispatchEvent(new Event('input', {bubbles:true})); input.focus({preventScroll:true}); }
    btn.classList.remove('has-text');
  }, true);
})();

/* V32 patch: clear kecil sidebar beneran hidup + search mode lebih waras. */
(function(){
  const q = s => document.querySelector(s);
  const side = q('#sidebar');
  const panel = q('#sideSearchPanel');
  const input = q('#sideSearchInput');
  const clear = q('#sideSearchClear');
  const close = q('#sideClose');
  if(!side || !panel || !input) return;

  function setHasQuery(){
    const has = !!String(input.value || '').trim();
    side.classList.toggle('search-has-query', has);
    if(clear) clear.classList.toggle('has-text', has);
  }
  function clearText(e){
    if(e){ e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation(); }
    input.value = '';
    input.dispatchEvent(new Event('input', {bubbles:true}));
    input.dispatchEvent(new Event('search', {bubbles:true}));
    setHasQuery();
    requestAnimationFrame(() => input.focus({preventScroll:true}));
  }
  ['pointerdown','mousedown','touchstart','click'].forEach(type => {
    clear?.addEventListener(type, clearText, true);
  });

  // Kalau tap kena area kanan panel, tetap dianggap klik tombol X kecil. Mobile browser kadang sok pintar, jadi kita lebih keras kepala.
  ['pointerdown','click','touchstart'].forEach(type => {
    panel.addEventListener(type, function(e){
      const r = panel.getBoundingClientRect();
      const touch = e.touches && e.touches[0];
      const x = touch ? touch.clientX : e.clientX;
      const has = !!String(input.value || '').trim();
      if(has && x && x > r.right - 48){ clearText(e); }
    }, true);
  });

  input.addEventListener('input', setHasQuery, true);
  input.addEventListener('search', setHasQuery, true);
  input.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && input.value){ clearText(e); }
  }, true);

  close?.addEventListener('click', function(){
    if(!side.classList.contains('search-open')) side.classList.remove('search-has-query');
    setTimeout(setHasQuery, 0);
  }, true);

  const observer = new MutationObserver(setHasQuery);
  observer.observe(side, {attributes:true, attributeFilter:['class']});
  setHasQuery();
})();

/* V32 patch: dropdown custom bug report jangan ketimpa dropdown berikutnya. */
(function(){
  document.addEventListener('click', function(e){
    const dz = e.target.closest && e.target.closest('.bug-card .dz-select');
    document.querySelectorAll('.bug-card .dz-select').forEach(el => {
      el.style.zIndex = el.classList.contains('open') || el === dz ? '999' : '5';
    });
  }, true);
})();


/* V46: display setting luar closure. Biar nambah fitur tanpa bongkar mesin tua yang sudah banyak tambalan. */
(function(){
  const STORAGE_DISPLAY = 'datzonAiDisplayV46';
  const sizes = {
    small:  {label:'Kecil',  px:'14px',   line:'1.52'},
    normal: {label:'Normal', px:'15.5px', line:'1.55'},
    large:  {label:'Besar',  px:'17px',   line:'1.58'},
    xlarge: {label:'Jumbo',  px:'18.5px', line:'1.6'}
  };
  function getState(){
    try{return JSON.parse(localStorage.getItem(STORAGE_DISPLAY) || '{}') || {}}catch(e){return {}}
  }
  function saveState(st){localStorage.setItem(STORAGE_DISPLAY, JSON.stringify(st || {}));}
  function activeSize(){
    const st = getState();
    return sizes[st.chatTextSize] ? st.chatTextSize : 'normal';
  }
  function applyDisplay(){
    const key = activeSize();
    const item = sizes[key] || sizes.normal;
    document.documentElement.style.setProperty('--chat-bubble-font-size', item.px);
    document.documentElement.style.setProperty('--chat-bubble-line-height', item.line);
    const label = document.getElementById('chatTextSizeLabel');
    if(label) label.textContent = 'Ukuran teks bubble: ' + item.label;
    document.querySelectorAll('[data-chat-size]').forEach(btn => {
      const active = btn.getAttribute('data-chat-size') === key;
      btn.classList.toggle('active', active);
      const check = btn.querySelector('.check-slot');
      if(check) check.innerHTML = active ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="m20 6-11 11-5-5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '';
    });
  }
  function openDisplayPage(){
    const page = document.getElementById('settingsPage');
    if(!page) return;
    page.querySelectorAll('.settings-view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('pageDisplay');
    target?.classList.add('active');
    page.scrollTo({top:0, behavior:'auto'});
    applyDisplay();
  }
  document.addEventListener('click', function(e){
    const open = e.target.closest && e.target.closest('[data-settings-open="display"]');
    if(open){
      e.preventDefault(); e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      openDisplayPage();
      return;
    }
    const sizeBtn = e.target.closest && e.target.closest('[data-chat-size]');
    if(sizeBtn){
      e.preventDefault(); e.stopPropagation();
      const key = sizeBtn.getAttribute('data-chat-size');
      if(!sizes[key]) return;
      saveState({chatTextSize:key});
      applyDisplay();
    }
  }, true);
  window.addEventListener('storage', applyDisplay);
  document.addEventListener('DOMContentLoaded', applyDisplay);
  requestAnimationFrame(applyDisplay);
})();
