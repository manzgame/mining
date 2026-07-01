// DATZON AI V40 - Config + lazy Firebase loader + file/vision reader
// Firebase tidak dimuat saat awal buka halaman. HP kentang juga punya harga diri.

window.DATZON_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAL69ComCgNY0WPAh6iXR41q5PdSPHCvEA",
  authDomain: "datzonai.firebaseapp.com",
  projectId: "datzonai",
  storageBucket: "datzonai.firebasestorage.app",
  messagingSenderId: "864176250314",
  appId: "1:864176250314:web:a2fcac0ad405a0adf64333"
};

window.DATZON_CLOUDINARY_CONFIG = {
  // Setiap jenis upload punya cloudName + uploadPreset sendiri.
  // Jangan pakai folder/tags/context/public_id dari front-end unsigned upload.
  // Cukup file + upload_preset.
  targets: {
    profile: {
      cloudName: "dwmgmf6zu",
      uploadPreset: "profile",
      uploadUrl: "https://api.cloudinary.com/v1_1/dwmgmf6zu/auto/upload"
    },
    imageAttach: {
      cloudName: "djnyszgcx",
      uploadPreset: "imageattch",
      uploadUrl: "https://api.cloudinary.com/v1_1/djnyszgcx/auto/upload"
    },
    fileAttach: {
      cloudName: "dsrnownxj",
      uploadPreset: "filedll",
      uploadUrl: "https://api.cloudinary.com/v1_1/dsrnownxj/auto/upload"
    },
    generatedImage: {
      cloudName: "dsqrftzpi",
      uploadPreset: "gambarai",
      uploadUrl: "https://api.cloudinary.com/v1_1/dsqrftzpi/auto/upload"
    }
  }
};

window.DATZON_AI_KEYS = {
  // Isi 4 slot per provider. Sistem akan coba key aktif, lalu lanjut ke key berikutnya kalau error/quota habis.
  mistralKeys: [
    "B0ChtXdyHJkn3V0ETevk0FyMCS9hDKFI",
    "MISTRAL_API_KEY_2_GANTI_SENDIRI",
    "MISTRAL_API_KEY_3_GANTI_SENDIRI",
    "MISTRAL_API_KEY_4_GANTI_SENDIRI"
  ],
  groqKeys: [
    "GROQ_API_KEY_1_GANTI_SENDIRI",
    "GROQ_API_KEY_2_GANTI_SENDIRI",
    "GROQ_API_KEY_3_GANTI_SENDIRI",
    "GROQ_API_KEY_4_GANTI_SENDIRI"
  ],
  googleStudioKeys: [
    "GOOGLE_STUDIO_API_KEY_1_GANTI_SENDIRI",
    "GOOGLE_STUDIO_API_KEY_2_GANTI_SENDIRI",
    "GOOGLE_STUDIO_API_KEY_3_GANTI_SENDIRI",
    "GOOGLE_STUDIO_API_KEY_4_GANTI_SENDIRI"
  ],
  activeMistralKeyIndex: 0,
  activeGroqKeyIndex: 0,
  activeGoogleStudioKeyIndex: 0,
  // Alias lama, biar kode lama yang manggil satu key tidak langsung pingsan.
  mistral: "MISTRAL_API_KEY_1_GANTI_SENDIRI",
  groq: "GROQ_API_KEY_1_GANTI_SENDIRI",
  googleStudio: "GOOGLE_STUDIO_API_KEY_1_GANTI_SENDIRI"
};

window.DATZON_MISTRAL_CONFIG = {
  enabled: true,
  activeKeyIndex: 0,
  endpoint: "https://api.mistral.ai/v1/chat/completions",
  model: "mistral-small-latest",
  // Dipakai otomatis saat user kirim gambar. Kalau model ini berubah di akun lu, ganti di sini, jangan panik kayak CSS ketemu z-index.
  visionModel: "pixtral-12b-latest",
  temperature: 0.7,
  maxTokens: 6144,
  timeoutMs: 90000
};

window.DATZON_GROQ_CONFIG = {
  enabled: true,
  activeKeyIndex: 0,
  endpoint: "https://api.groq.com/openai/v1/chat/completions",
  model: "openai/gpt-oss-20b",
  // Groq default dipakai untuk chat teks. Untuk vision, lebih aman pakai Google Studio/Mistral vision.
  visionModel: "",
  temperature: 0.7,
  maxTokens: 6144,
  timeoutMs: 90000
};

window.DATZON_GOOGLE_STUDIO_CONFIG = {
  enabled: true,
  activeKeyIndex: 0,
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  model: "gemini-2.5-flash",
  visionModel: "gemini-2.5-flash",
  documentModel: "gemini-2.5-flash",
  temperature: 0.7,
  maxTokens: 6144,
  timeoutMs: 90000
};

window.DATZON_AI_MODELS = {
  mistral: {
    label: "Mistral",
    endpoint: window.DATZON_MISTRAL_CONFIG.endpoint,
    model: window.DATZON_MISTRAL_CONFIG.model,
    visionModel: window.DATZON_MISTRAL_CONFIG.visionModel
  },
  groq: {
    label: "Groq",
    endpoint: window.DATZON_GROQ_CONFIG.endpoint,
    model: window.DATZON_GROQ_CONFIG.model,
    visionModel: window.DATZON_GROQ_CONFIG.visionModel
  },
  googleStudio: {
    label: "Google Studio",
    endpoint: window.DATZON_GOOGLE_STUDIO_CONFIG.endpoint,
    model: window.DATZON_GOOGLE_STUDIO_CONFIG.model,
    visionModel: window.DATZON_GOOGLE_STUDIO_CONFIG.visionModel,
    documentModel: window.DATZON_GOOGLE_STUDIO_CONFIG.documentModel
  }
};

window.DATZON_FILE_READER_CONFIG = {
  // Upload UI tetap maksimal 10 file, 10 MB per file. Reader ini cuma ngatur isi yang dikirim ke AI.
  maxTextBytes: 384 * 1024,
  maxTextChars: 70000,
  maxInlineBytes: 10 * 1024 * 1024
};

(function(){
  const CDN_VERSION = "10.12.5";
  const sdkUrls = [
    `https://www.gstatic.com/firebasejs/${CDN_VERSION}/firebase-app-compat.js`,
    `https://www.gstatic.com/firebasejs/${CDN_VERSION}/firebase-auth-compat.js`,
    `https://www.gstatic.com/firebasejs/${CDN_VERSION}/firebase-firestore-compat.js`
  ];

  const fb = window.DATZON_FIREBASE = {
    ready:false,
    loading:false,
    app:null,
    auth:null,
    db:null,
    ts:null,
    error:null,
    load:null
  };

  function loadScript(src){
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-fb-lazy="${src}"]`);
      if(existing){
        existing.addEventListener('load', resolve, {once:true});
        existing.addEventListener('error', reject, {once:true});
        if(existing.dataset.loaded === '1') resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.defer = true;
      s.dataset.fbLazy = src;
      s.onload = () => { s.dataset.loaded = '1'; resolve(); };
      s.onerror = () => reject(new Error(`Gagal memuat ${src}`));
      document.head.appendChild(s);
    });
  }

  async function initFirebase(){
    if(fb.ready) return fb;
    if(fb.loading) return fb._promise;
    fb.loading = true;
    fb.error = null;
    fb._promise = (async () => {
      try{
        for(const url of sdkUrls) await loadScript(url);
        if(!window.firebase || !firebase.initializeApp) throw new Error('Firebase SDK compat belum tersedia.');
        const app = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(window.DATZON_FIREBASE_CONFIG);
        fb.app = app;
        fb.auth = firebase.auth();
        fb.db = firebase.firestore();
        try{ fb.db.enablePersistence({synchronizeTabs:true}).catch(()=>{}); }catch(e){}
        fb.ts = firebase.firestore.FieldValue.serverTimestamp;
        fb.ready = true;
        fb.loading = false;
        document.dispatchEvent(new CustomEvent('datzon:firebase-ready'));
        return fb;
      }catch(err){
        fb.error = err;
        fb.loading = false;
        console.warn('DATZON Firebase lazy init gagal:', err);
        document.dispatchEvent(new CustomEvent('datzon:firebase-error', {detail:err}));
        throw err;
      }
    })();
    return fb._promise;
  }

  fb.load = initFirebase;
})();
