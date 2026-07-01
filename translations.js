/* DATZON AI i18n dictionary + DOM translator.
   V29: deeper Indonesia <-> English UI translation, textarea placeholders, dynamic menus. */
(function(){
  'use strict';

  const STORAGE_PROFILE = 'datzonAiProfileV10';
  const LANG_ID = 'Indonesia';
  const LANG_EN = 'English';

  const ID_TO_EN = {
    'Tanya': 'Ask',
    'apapun': 'anything',
    'tentang DATZON': 'about DATZON',
    'Tanya apapun tentang DATZON': 'Ask anything about DATZON',
    'Asisten AI DATZON untuk membantu ide, ringkasan, penulisan, file, dan produktivitas digital.': 'DATZON AI assistant for ideas, summaries, writing, files, and digital productivity.',
    'Ada fitur apa aja di DATZON AI?': 'What features are in DATZON AI?',
    'Buat balasan customer ringkas': 'Write a short customer reply',
    'Ringkas teks jadi paragraf': 'Summarize text into a paragraph',
    'Siapa yang bikin DATZON?': 'Who made DATZON?',
    'Tanya apa saja...': 'Ask anything...',
    'Attach': 'Attach',
    'Normal': 'Normal',
    'Mikrofon': 'Microphone',
    'Kirim': 'Send',
    'Preview File': 'File Preview',
    'Tutup preview': 'Close preview',

    'Obrolan baru': 'New chat',
    'Chat AI': 'AI Chat',
    'Mode sementara 24 jam': 'Temporary mode 24 hours',
    'Gambar & File': 'Images & Files',
    'Upload / preview file': 'Upload / preview file',
    'Upload & preview File': 'Upload & preview File',
    'Fitur': 'Features',
    'Penulisan AI': 'AI Writing',
    'Ringkasan teks': 'Text summary',
    'Codex AI': 'Codex AI',
    'Gambar AI': 'AI Images',
    'Catatan': 'Notes',
    'Terkini': 'Recent',
    'Belum ada obrolan. Mulai chat dulu, baru riwayatnya muncul di sini. Iya, konsep yang sangat mengejutkan.': 'No chats yet. Start chatting and your history will appear here. Yes, truly shocking technology.',
    'Guest localStorage • klik buat login': 'Guest localStorage • tap to log in',
    'data sinkron Firebase': 'Firebase synced data',

    'Bagikan': 'Share',
    'Sematkan': 'Pin',
    'Cari di chat': 'Search in chat',
    'Ekspor Chat': 'Export chat',
    'Hapus obrolan': 'Delete chat',
    'Simpan ke catatan': 'Save to notes',
    'Regenerate': 'Regenerate',
    'Laporkan bug UI': 'Report UI bug',

    'Pengaturan • API gratis • Firebase aktif': 'Settings • Free API • Firebase active',
    'DATZON AI saya': 'My DATZON AI',
    'Personalisasi': 'Personalization',
    'Gaya, karakteristik, dan instruksi AI.': 'Style, traits, and AI instructions.',
    'Memori': 'Memory',
    'Nama panggilan, pekerjaan, dan preferensi.': 'Nickname, job, and preferences.',
    'Warna aksen': 'Accent color',
    'Tampilan': 'Display',
    'Ukuran teks bubble: Normal': 'Bubble text size: Normal',
    'Akun': 'Account',
    'Akun tersambung': 'Connected account',
    'Masuk / Daftar': 'Log in / Register',
    'Sinkron profile dan obrolan ke Firebase.': 'Sync profile and chats to Firebase.',
    'Photo Profile': 'Profile Photo',
    'Foto custom aktif.': 'Custom photo active.',
    'Ganti atau hapus foto profil.': 'Change or remove profile photo.',
    'Workspace': 'Workspace',
    'Pribadi': 'Private',
    'Limit Request': 'Request Limit',
    'Rank': 'Rank',
    'Tukarkan Kode': 'Redeem Code',
    'Masukkan voucher Rank atau bonus.': 'Enter a Rank or bonus voucher.',
    'Check in Harian': 'Daily Check-in',
    'Ambil bonus limit request 7 hari.': 'Claim 7 days of bonus request limit.',
    'Limit Request Gratis': 'Free Request Limit',
    'Misi iklan & sosial untuk voucher.': 'Ad & social missions for vouchers.',
    'Email': 'Email',
    'Umum': 'General',
    'Keamanan': 'Security',
    'Password lokal & sesi aktif.': 'Local password & active sessions.',
    'Penyimpanan': 'Storage',
    'LocalStorage sementara.': 'Temporary LocalStorage.',
    'Laporkan bug': 'Report bug',
    'Simpan laporan lokal / Firebase aktif.': 'Save local report / Firebase active.',
    'Tentang': 'About',
    'Keluar': 'Log out',
    'Keluar akun': 'Log out account',
    'Keluar dari semua perangkat': 'Log out of all devices',

    'Gaya dan nada dasar': 'Base style and tone',
    'Sinis': 'Sarcastic',
    'Ini gaya utama respons DATZON AI. Untuk sekarang disimpan lokal dulu, karena database belum ikut kerja rodi.': 'This is DATZON AI’s main response style. For now it is saved locally first.',
    'Karakteristik': 'Traits',
    'Kurang hangat': 'Less warm',
    'Lebih profesional dan faktual': 'More professional and factual',
    'Kurang antusias': 'Less enthusiastic',
    'Lebih tenang dan lebih netral': 'Calmer and more neutral',
    'Lebih sedikit': 'Less',
    'Cepat, hemat kuota, jawaban pendek.': 'Fast, quota-friendly, short answers.',
    'Reset karakteristik': 'Reset traits',
    'Instruksi khusus': 'Custom instructions',
    'Prioritas fitur eksperimen DATZON': 'DATZON experimental feature priority',
    'Pilih beberapa penyesuaian tambahan selain gaya dan nada dasar.': 'Choose extra adjustments besides base style and tone.',
    'Jawaban cepat': 'Quick answers',
    'Aktifkan memori': 'Enable memory',
    'Goyangkan ponsel untuk laporan': 'Shake phone to report',
    'Nama panggilan Anda': 'Your nickname',
    'Pekerjaan Anda': 'Your job',
    'Selengkapnya tentang Anda': 'More about you',
    'Profil & preferensi': 'Profile & preferences',
    'Personalisasi lokal untuk obrolan DATZON.': 'Local personalization for DATZON chats.',
    'Simpan': 'Save',
    'Kembali': 'Back',

    'Bahasa': 'Language',
    'Default untuk DATZON AI.': 'Default for DATZON AI.',
    'Terjemahkan seluruh UI ke English.': 'Translate the whole UI to English.',
    'Pilih bahasa untuk menerjemahkan seluruh tampilan DATZON AI.': 'Choose a language to translate the whole DATZON AI interface.',
    'Indonesia': 'Indonesian',
    'English': 'English',

    'Kecil': 'Small',
    'Lebih rapat, hemat layar HP.': 'Tighter, saves phone screen space.',
    'Ukuran bawaan yang waras.': 'The normal default size.',
    'Besar': 'Large',
    'Lebih gampang dibaca, layar agak boros.': 'Easier to read, uses more screen space.',
    'Jumbo': 'Jumbo',
    'Buat mata yang sudah capek lihat bug CSS.': 'For eyes tired of looking at CSS bugs.',
    'Preview': 'Preview',
    'Ini contoh teks kamu.': 'This is your sample text.',
    'Ini contoh teks DATZON AI. Ukuran bubble bakal ikut setelan ini, bukan ngikut mood browser.': 'This is sample DATZON AI text. Bubble size follows this setting, not the browser’s mood.',

    'Login': 'Login',
    'Register': 'Register',
    'Masuk': 'Log in',
    'Lanjutkan dengan Google': 'Continue with Google',
    'Belum punya akun?': 'Don’t have an account?',
    'Daftar di sini': 'Register here',
    'Sudah punya akun?': 'Already have an account?',
    'Login di sini': 'Log in here',
    'Kirim reset password': 'Send password reset',
    'Kirim reset': 'Send reset',
    'Belum ada reset password dikirim.': 'No password reset has been sent yet.',
    'Lengkapi Akun': 'Complete Account',
    'Lengkapi data sekali saja sebelum akun DATZON dibuat.': 'Complete this data once before your DATZON account is created.',
    'Akun Google': 'Google Account',
    'Obrolan tersimpan di localStorage.': 'Chats are saved in localStorage.',
    'Guest mode': 'Guest mode',
    'Guest Mode': 'Guest Mode',

    'Dapatkan Limit Gratis': 'Get Free Limit',
    'Dapatkan limit request lebih banyak': 'Get more request limit',
    'Guest mendapat 20 Chat AI dan 5 Gambar AI. Login untuk tambah limit.': 'Guests get 20 AI Chats and 5 AI Images. Log in for more limit.',
    'Kuota aktif:': 'Active quota:',
    'Chat AI': 'AI Chat',
    'AI gratis': 'Free AI',
    'Menyiapkan misi limit gratis...': 'Preparing free limit missions...',
    'Tunggu sebentar, DATZON lagi menyusun misi harian dan misi sekali.': 'Please wait, DATZON is preparing daily and one-time missions.',
    'Register pengguna baru untuk mendapatkan limit gratis, lalu lakukan check in harian untuk bonus limit tambahan.': 'Register a new user to get free limit, then do daily check-ins for extra bonus limit.',

    'Benefit Rank Immortal': 'Immortal Rank Benefits',
    'Akses Chat AI tanpa limit': 'Unlimited AI Chat access',
    'Akses Gambar AI tanpa limit': 'Unlimited AI Images access',
    'Rank aktif akan muncul di sini.': 'Active rank will appear here.',
    'Kode voucher': 'Voucher code',
    'Tukarkan': 'Redeem',

    'Sesi': 'Sessions',
    'Sesi aktif': 'Active sessions',
    'Ganti password lokal': 'Change local password',
    'Password disimpan sebagai hash lokal. Bukan benteng NASA, jangan sok aman.': 'Password is saved as a local hash. It is not NASA-grade security.',
    'Reset password lewat email': 'Reset password by email',
    'Simpan password': 'Save password',

    'Obrolan / riwayat chat': 'Chats / chat history',
    'Attach foto/file': 'Attach photos/files',
    'Aset Cloudinary tercatat': 'Recorded Cloudinary assets',
    'Hapus riwayat obrolan lokal': 'Delete local chat history',
    'Hapus riwayat obrolan Firebase': 'Delete Firebase chat history',
    'Hapus metadata file/gambar lokal': 'Delete local file/image metadata',
    'Hapus metadata file/gambar Firebase': 'Delete Firebase file/image metadata',
    'Hapus laporan bug lokal': 'Delete local bug reports',
    'Hapus laporan bug Firebase': 'Delete Firebase bug reports',
    'file/foto attach': 'attached files/photos',
    'gambar AI': 'AI images',
    'aset': 'assets',

    'Apa yang terjadi?': 'What happened?',
    'Jenis laporan': 'Report type',
    'Bug UI / tampilan': 'UI / display bug',
    'Jawaban AI bermasalah': 'AI answer problem',
    'Performa berat / lag': 'Heavy performance / lag',
    'Lainnya': 'Other',
    'Konteks obrolan': 'Chat context',
    'Tanpa konteks obrolan': 'No chat context',
    'Kirim laporan': 'Send report',
    'Laporan akan membawa jenis bug, halaman aktif, serta konteks chat kalau kamu membukanya dari menu titik tiga jawaban.': 'The report will include bug type, current page, and chat context if opened from an answer’s three-dot menu.',

    'Versi': 'Version',
    'Mode data': 'Data mode',
    'Firebase Auth + Firestore, guest tetap localStorage.': 'Firebase Auth + Firestore, guests still use localStorage.',
    'API target': 'API target',
    'Mistral, Groq, Google Studio / Gemini.': 'Mistral, Groq, Google Studio / Gemini.',
    'Lisensi UI': 'UI license',
    'Untuk project DATZON pribadi.': 'For a private DATZON project.',
    'Pusat bantuan': 'Help center',
    'Hubungi admin DATZON kalau tombol mulai keras kepala.': 'Contact the DATZON admin if the buttons get stubborn.',

    'Menyiapkan Firebase...': 'Preparing Firebase...',
    'Mengubah tema...': 'Changing theme...',
    'Mode data': 'Data mode',
    'Website Chat AI': 'AI Chat Website',
    'Kecerdasan': 'Intelligence',
    'Tinggi': 'High',
    'Studio Tinggi': 'Studio High',
    'Mistral Tinggi': 'Mistral High',
    'Google Studio': 'Google Studio',
    'Mistral': 'Mistral',
    'Groq': 'Groq',
    'Instan': 'Instant',
    'Ringan buat chat dan teks.': 'Lightweight for chat and text.',
    'Seimbang buat obrolan harian.': 'Balanced for daily chats.',
    'Kencang buat respons cepat.': 'Fast for quick responses.',
    'Lebih detail, pura-pura paling pintar.': 'More detailed, acts like the smartest one.',
    'Cocok kalau nanti pakai API key Gemini.': 'Good if you later use a Gemini API key.',
    'Untuk ngobrol, menulis, ringkasan, codex, dan bantuan teks biasa.': 'For chat, writing, summaries, codex, and regular text help.',
    'Untuk generate gambar lewat provider gambar DATZON.': 'For generating images through DATZON image providers.',
    'Respons lebih cepat, tapi tidak terlalu mendalam.': 'Faster response, but not too deep.'
  };


  /* V28 deep UI translations: covers static HTML, dynamic app.js text, cards, prompts, toasts, modals, placeholders, and settings pages. */
  Object.assign(ID_TO_EN, {
    'Aksi chat': 'Chat actions',
    'Kontrol atas': 'Top controls',
    'Buka sidebar': 'Open sidebar',
    'Tutup sidebar': 'Close sidebar',
    'Menu chat': 'Chat menu',
    'Pengaturan': 'Settings',
    'Ganti nama': 'Rename',
    'Refresh data': 'Refresh data',
    'Refresh catatan': 'Refresh notes',
    'Pilih halaman akun': 'Choose account page',
    'Hapus pencarian sidebar': 'Clear sidebar search',
    'Cari obrolan': 'Search chats',
    'Cari obrolan...': 'Search chats...',
    'Contoh cepat': 'Quick examples',
    'Ide prompt gambar': 'Image prompt ideas',
    'DATZON AI Chat - Firebase Lite': 'DATZON AI Chat - Firebase Lite',
    'DATZON Workspace': 'DATZON Workspace',
    'DATZON User': 'DATZON User',
    'DATZON Voice Wave AI Logo': 'DATZON Voice Wave AI Logo',
    'Pengaturan • API gratis • Firebase aktif': 'Settings • Free API • Firebase active',
    'Akun / login / Firebase': 'Account / login / Firebase',
    'Siap disambung Firebase Auth.': 'Ready for Firebase Auth.',

    'Semua': 'All',
    'Gambar': 'Images',
    'File': 'Files',
    'Buka File': 'Open File',
    'Buka file': 'Open file',
    'Buka gambar': 'Open image',
    'Lihat detail': 'View details',
    'Lihat semua kode': 'View all code',
    'Jalankan website': 'Run website',
    'Pratinjau tidak tersedia': 'Preview unavailable',
    'Pratinjau DATZON': 'DATZON Preview',
    'Kode': 'Code',
    'Salin': 'Copy',
    'Disalin': 'Copied',

    'Images & Files': 'Images & Files',
    '4 gambar • 0 file tersimpan dari obrolan dan Gambar AI.': '4 images • 0 files saved from chats and AI Images.',
    'Belum ada gambar atau file yang tersimpan. Upload lewat Attach atau generate gambar AI dulu.': 'No saved images or files yet. Upload with Attach or generate AI images first.',
    'Semua gambar, file obrolan, dan gambar AI yang tersimpan.': 'All saved images, chat files, and AI images.',
    'Gambar & File obrolan': 'Chat Images & Files',
    'Belum ada gambar atau file di obrolan ini.': 'No images or files in this chat yet.',
    'Ini khusus obrolan yang sedang dibuka, bukan semua akun.': 'This is only for the currently open chat, not the whole account.',
    'Obrolan AI': 'AI Chat',
    'Gambar AI': 'AI Images',
    'File obrolan': 'Chat file',
    'File tersimpan': 'Saved file',
    'Gambar tersimpan': 'Saved image',

    'Ada fitur apa saja di DATZON AI ini?': 'What features are available in this DATZON AI?',
    'Buatkan contoh balasan customer yang sopan dan ringkas.': 'Write an example of a polite and concise customer reply.',
    'Ringkas teks panjang jadi satu paragraf.': 'Summarize a long text into one paragraph.',
    'Bantu tuliskan copywriting singkat untuk produk digital DATZON.': 'Help write short copywriting for a DATZON digital product.',
    'Ringkas teks panjang berikut menjadi satu paragraf yang jelas.': 'Summarize the following long text into one clear paragraph.',
    'Buat contoh kode HTML sederhana untuk komponen website.': 'Create a simple HTML code example for a website component.',
    'Tulis prompt gambar...': 'Write an image prompt...',
    'Buatkan gambar sapi memakan rumput di padang hijau, cinematic, detail tinggi': 'Create an image of a cow eating grass in a green field, cinematic, high detail',
    'Buatkan poster futuristik DATZON AI warna neon lime dan hitam, clean, high detail': 'Create a futuristic DATZON AI poster with neon lime and black colors, clean, high detail',
    'Buatkan wallpaper anime kota Jepang malam hari, lampu neon, hujan tipis, aesthetic': 'Create an anime wallpaper of a Japanese city at night, neon lights, light rain, aesthetic',
    'Buatkan logo maskot robot lucu untuk brand AI, warna lime, background gelap': 'Create a cute robot mascot logo for an AI brand, lime color, dark background',
    'Sapi makan rumput': 'Cow eating grass',
    'Poster DATZON AI': 'DATZON AI poster',
    'Wallpaper Jepang': 'Japan wallpaper',
    'Maskot robot AI': 'AI robot mascot',
    'Mode Gambar AI aktif.': 'AI Image mode active.',
    'GAMBAR AI': 'AI IMAGES',
    'Buat': 'Create',
    'gambar': 'images',
    'dengan DATZON': 'with DATZON',
    'Buat gambar dengan DATZON': 'Create images with DATZON',
    'Tulis prompt gambar, pilih gaya, kualitas, dan provider. Output dibuat stabil dalam rasio 1:1 supaya hasilnya tidak gepeng.': 'Write an image prompt, choose style, quality, and provider. Output is kept stable in a 1:1 ratio so it does not look stretched.',
    'Auto': 'Auto',
    'Seimbang': 'Balanced',
    'Kualitas gambar': 'Image quality',
    'Provider gambar': 'Image provider',
    'Gaya gambar': 'Image style',
    'Rasio gambar': 'Image ratio',
    'Foto realistis dan natural.': 'Realistic and natural photo.',
    'Komposisi poster yang tegas.': 'Strong poster composition.',
    'Visual 3D modern dan halus.': 'Modern and smooth 3D visuals.',
    'Cocok untuk brand dan maskot.': 'Good for brands and mascots.',
    'Lebih tajam, agak lama.': 'Sharper, a bit slower.',
    'Paling berat, bisa gagal di API gratis.': 'Heaviest, may fail on free APIs.',

    'Catatan DATZON': 'DATZON Notes',
    'Cari catatan...': 'Search notes...',
    'Belum ada catatan. Simpan jawaban dari menu titik tiga dulu, wah sebuah konsep.': 'No notes yet. Save an answer from the three-dot menu first. What a concept.',
    'Buka obrolan': 'Open chat',
    'Chat ID': 'Chat ID',

    'Default': 'Default',
    'Sedang': 'Medium',
    'Cepat': 'Fast',
    'Lime': 'Lime',
    'Website chat AI front-end untuk eksperimen API gratis, file preview, voice input, riwayat lokal, profile setting, dan warna aksen. Sudah disiapkan untuk Firebase Auth + Firestore.': 'Front-end AI chat website for free API experiments, file preview, voice input, local history, profile settings, and accent colors. Prepared for Firebase Auth + Firestore.',
    'V46 Display Patch': 'V46 Display Patch',

    'Photo Profile': 'Profile Photo',
    'Ganti Foto': 'Change Photo',
    'Hapus Foto': 'Remove Photo',
    'Pilih gambar dari perangkat kamu.': 'Choose an image from your device.',
    'Foto profil disimpan ke Cloudinary. Guest menyimpan URL di localStorage, akun login menyimpan URL di Firebase.': 'Profile photos are saved to Cloudinary. Guests store the URL in localStorage, logged-in accounts store it in Firebase.',
    'Ganti nama tampilan': 'Change display name',
    'Masukkan nama baru': 'Enter a new name',
    'Nama tampilan': 'Display name',

    'Guest': 'Guest',
    'Guest mode • 100 MB': 'Guest mode • 100 MB',
    'Guest: Chat 20x • Gambar 5x': 'Guest: 20 chats • 5 images',
    'Obrolan tersimpan': 'Saved chats',
    'Login atau register dulu untuk check in harian dan menyimpan progress ke Firebase.': 'Log in or register first to do daily check-ins and save progress to Firebase.',
    'Kamu sudah check in hari ini, balik lagi besok setelah reset jam 12 malam.': 'You have checked in today. Come back tomorrow after the midnight reset.',
    'Check in harian dikunci untuk Guest Mode. Login atau register dulu supaya progress dan bonus tersimpan ke Firebase.': 'Daily check-in is locked in Guest Mode. Log in or register first so progress and bonuses are saved to Firebase.',
    'Konfirmasi Misi Iklan': 'Confirm Ad Mission',
    'Konfirmasi Misi Sosial': 'Confirm Social Mission',
    'Buka link dan tunggu': 'Open the link and wait',

    'Mode data': 'Data mode',
    '0 KB dipakai': '0 KB used',
    '0 aset': '0 assets',
    '0 file/foto attach': '0 attached files/photos',
    '0 gambar AI': '0 AI images',
    'aset tercatat': 'recorded assets',
    'termasuk foto profil': 'including profile photo',
    'lokal': 'local',
    'cloud sinkron': 'cloud synced',
    'persen penyimpanan terpakai': 'percent of storage used',
    '. Yang dihitung: foto profil, attach chat, gambar AI, riwayat, laporan bug, dan data lokal/Firebase yang tersinkron.': '. Counted items: profile photo, chat attachments, AI images, history, bug reports, and synced local/Firebase data.',

    'Personalisasi': 'Personalization',
    'Gaya dan nada dasar': 'Base style and tone',
    'Base style and tone': 'Base style and tone',
    'Sinis': 'Sarcastic',
    'Hangat': 'Warm',
    'Antusias': 'Enthusiastic',
    'Judul & Daftar': 'Headings & Lists',
    'Emoji': 'Emoji',
    'Tambah karakteristik': 'Add traits',
    'Atur hangat, antusias, format, dan emoji.': 'Adjust warmth, enthusiasm, formatting, and emoji.',
    'Instruksi khusus': 'Custom instructions',
    'Bagikan hal lain yang perlu dipertimbangkan DATZON AI dalam responsnya.': 'Share anything else DATZON AI should consider in its responses.',
    'Pilih beberapa penyesuaian tambahan selain gaya dan nada dasar.': 'Choose extra adjustments besides base style and tone.',
    'Lebih banyak': 'More',
    'Lebih ramah dan lebih menarik': 'Friendlier and more engaging',
    'Lebih berenergi dan seru': 'More energetic and fun',
    'Lebih sering pakai struktur': 'Use structure more often',
    'Emoji lebih sering muncul': 'Use emoji more often',
    'Setelan standar': 'Standard setting',
    'Lebih mengalir tanpa banyak daftar': 'More flowing without many lists',
    'Emoji ditahan, syukurlah': 'Emoji held back, thankfully',
    'Lebih hangat': 'Warmer',
    'Lebih antusias': 'More enthusiastic',
    'Hangat default': 'Default warmth',
    'Antusias default': 'Default enthusiasm',
    'Kurang hangat': 'Less warm',
    'Kurang antusias': 'Less enthusiastic',
    'Reset traits': 'Reset traits',

    'Memori': 'Memory',
    'Aktifkan memori': 'Enable memory',
    'Biarkan DATZON AI mengingat preferensi dari perangkat ini. Belum sinkron cloud, santai dulu, server belum diseret ke sini.': 'Let DATZON AI remember preferences from this device. Cloud sync is not enabled yet.',
    'Nama panggilan Anda': 'Your nickname',
    'Pekerjaan Anda': 'Your job',
    'Selengkapnya tentang Anda': 'More about you',
    'Nama panggilan': 'Nickname',
    'Insinyur, pelajar, kreator, dll.': 'Engineer, student, creator, etc.',
    'Minat, nilai, atau preferensi yang perlu diingat': 'Interests, values, or preferences to remember',
    'Profil & preferensi': 'Profile & preferences',
    'Personalisasi lokal untuk obrolan DATZON.': 'Local personalization for DATZON chats.',

    'Umum': 'General',
    'Bahasa': 'Language',
    'Tampilan': 'Display',
    'Warna aksen': 'Accent color',
    'Toggle tampilan, belum pakai sensor.': 'Toggle display; no sensor used yet.',
    'Ukuran teks bubble chat': 'Chat bubble text size',
    'Kecil': 'Small',
    'Normal': 'Normal',
    'Besar': 'Large',
    'Jumbo': 'Jumbo',

    'Keamanan': 'Security',
    'Sesi': 'Sessions',
    'Sesi aktif': 'Active sessions',
    'SESI INI': 'THIS SESSION',
    'AKTIF': 'ACTIVE',
    'Baru saja': 'Just now',
    'Perangkat web': 'Web device',
    'Phone • Android Web': 'Phone • Android Web',
    'Computer • Windows Web': 'Computer • Windows Web',
    'Belum ada sesi. Bahkan sesi pun males muncul.': 'No sessions yet. Even the sessions are too lazy to appear.',
    'Password minimal 6 karakter': 'Password at least 6 characters',
    'Password sekarang': 'Current password',
    'Password baru': 'New password',
    'Konfirmasi password': 'Confirm password',
    'Konfirmasi password baru': 'Confirm new password',
    'Tampilkan password': 'Show password',
    'Tampilkan password sekarang': 'Show current password',
    'Tampilkan password baru': 'Show new password',
    'Tampilkan konfirmasi password': 'Show confirmation password',
    'Tampilkan konfirmasi password baru': 'Show new password confirmation',
    'Password baru minimal 6 karakter. Jangan bikin password setipis tisu.': 'New password must be at least 6 characters. Do not make it paper-thin.',
    'Konfirmasi password tidak sama. Mata dipakai, bukan hiasan.': 'Password confirmation does not match. Use your eyes, they are not decoration.',
    'Password sekarang salah.': 'Current password is wrong.',
    'Password lokal berhasil disimpan. Nanti kalau Firebase Auth dipasang, alurnya tinggal diganti beneran.': 'Local password saved. When Firebase Auth is fully connected, the flow can be replaced for real.',
    'Isi email yang bener dulu. Ini bukan tebak-tebakan.': 'Enter a valid email first. This is not a guessing game.',
    'Permintaan reset diproses untuk': 'Reset request processed for',
    'Cek email kalau akun Firebase-nya ada.': 'Check email if the Firebase account exists.',
    'Email reset dikirim ke': 'Reset email sent to',
    'Reset gagal': 'Reset failed',

    'Laporan bug': 'Bug report',
    'Tulis bug UI, tombol rusak, popup nyasar, atau dosa CSS lainnya...': 'Describe a UI bug, broken button, misplaced popup, or other CSS crime...',
    'Laporan bug': 'Bug report',
    'Bug UI / tampilan': 'UI / display bug',
    'Jawaban AI bermasalah': 'AI answer problem',
    'Performa berat / lag': 'Heavy performance / lag',
    'Lainnya': 'Other',
    'Tanpa konteks obrolan': 'No chat context',
    'Apa yang terjadi?': 'What happened?',
    'Jenis laporan': 'Report type',
    'Konteks obrolan': 'Chat context',

    'Santai': 'Casual',
    'Profesional': 'Professional',
    'Marketing': 'Marketing',
    'Ringkas': 'Concise',
    'Formal': 'Formal',
    'Storytelling': 'Storytelling',
    'SMK Mode': 'SMK Mode',
    'Jawaban standar, aman buat demo.': 'Standard answer, safe for demos.',
    'Bahasa ringan, kayak ngobrol.': 'Light language, like chatting.',
    'Rapi buat kerjaan dan bisnis.': 'Neat for work and business.',
    'Copywriting jualan biar nggak lemes.': 'Sales copywriting that does not feel weak.',
    'Pendek, padat, anti muter-muter.': 'Short, concise, no rambling.',
    'Serius, cocok surat dan dokumen.': 'Serious, suitable for letters and documents.',
    'Naratif dan enak dibaca.': 'Narrative and pleasant to read.',
    'Bahasa gampang, nggak sok profesor.': 'Simple language, not pretending to be a professor.',

    'Ganti nama obrolan': 'Rename chat',
    'Judul obrolan': 'Chat title',
    'Judulnya isi dulu. Obrolan tanpa nama itu kayak warung tanpa papan.': 'Fill in the title first. A nameless chat is like a shop without a sign.',
    'Judul obrolan diganti.': 'Chat title changed.',
    'Lepas sematan': 'Unpin',
    'Ganti nama': 'Rename',
    'Hapus': 'Delete',
    'Batal': 'Cancel',
    'Obrolan ini akan dihapus permanen dari riwayat lokal dan cloud kalau akun tersambung. Jangan nangis ke CSS nanti.': 'This chat will be permanently deleted from local history and cloud if the account is connected. Do not cry to CSS later.',
    'Obrolan yang dicari nggak ketemu. Hebat, bahkan riwayat pun bisa ghosting.': 'The searched chat was not found. Amazing, even history can ghost you.',
    'Tidak ada potongan chat.': 'No chat snippet.',

    'Sumber': 'Source',
    'Sistem limit request DATZON': 'DATZON request limit system',
    'reset': 'reset',
    'gagal memproses gambar': 'failed to process the image',
    'gagal total': 'failed completely',
    'lagi error, kuota habis, atau API key-nya rusak. Coba ganti pilihan AI lain.': 'is erroring, out of quota, or the API key is broken. Try another AI option.',
    'belum aktif karena semua slot API key masih dummy/placeholder. Ganti key di firebase.js bagian DATZON_AI_KEYS.': 'is not active because every API key slot is still dummy/placeholder. Replace keys in firebase.js under DATZON_AI_KEYS.',
    'Limit': 'Limit',
    'sudah habis': 'is used up',
    'Register / Login': 'Register / Login',
    'Dapatkan Limit': 'Get Limit',

    'Menyiapkan Firebase...': 'Preparing Firebase...',
    'Mengubah tema...': 'Changing theme...',
    'Speech gagal': 'Speech failed',
    'Gagal membaca file.': 'Failed to read file.',
    'Upload Cloudinary gagal': 'Cloudinary upload failed',
    'Upload Cloudinary gagal.': 'Cloudinary upload failed.',
    'Upload Cloudinary timeout. Coba koneksi lain atau cek preset.': 'Cloudinary upload timed out. Try another connection or check the preset.',
    'Cloudinary config belum lengkap.': 'Cloudinary config is incomplete.',
    'File Cloudinary kosong.': 'Cloudinary file is empty.',
    'Upload gambar AI ke Cloudinary gagal': 'AI image upload to Cloudinary failed',

    'email@domain.com': 'email@domain.com',
    'datzon.user@example.com': 'datzon.user@example.com',
    'html': 'html',
    'LOADING': 'LOADING'
  });


  /* V29 deeper translations: missing screenshots + hidden dynamic JS strings. */
  Object.assign(ID_TO_EN, {
    // Personalization / tone popovers / traits
    'Bagikan hal lain yang perlu dipertimbangkan DATZON AI dalam responsnya.': 'Share anything else DATZON AI should consider in its responses.',
    'Gaya dan nada bawaan': 'Default style and tone',
    'Rapi dan presisi': 'Neat and precise',
    'Hangat dan akrab': 'Warm and friendly',
    'Terus terang dan jelas': 'Straightforward and clear',
    'Menyenangkan dan imajinatif': 'Fun and imaginative',
    'Singkat dan lugas': 'Short and direct',
    'Kritis dan sarkastis': 'Critical and sarcastic',
    'Profesional': 'Professional',
    'Ramah': 'Friendly',
    'Jujur': 'Honest',
    'Nyentrik': 'Quirky',
    'Efisien': 'Efficient',
    'Sinis': 'Sarcastic',
    'Hangat': 'Warm',
    'Antusias': 'Enthusiastic',
    'Default warmth': 'Default warmth',
    'Default enthusiasm': 'Default enthusiasm',
    'Warm': 'Warm',
    'Enthusiastic': 'Enthusiastic',
    'More energetic and fun': 'More energetic and fun',
    'Lebih tenang dan netral': 'Calmer and more neutral',
    'Lebih tenang dan lebih netral': 'Calmer and more neutral',
    'More professional and factual': 'More professional and factual',
    'Default warmth': 'Default warmth',
    'Default enthusiasm': 'Default enthusiasm',
    'Default warm': 'Default warmth',
    'Default enthusiastic': 'Default enthusiasm',

    // Accent/theme popover
    'Ubah warna aksen utama': 'Change the main accent color',
    'Biru': 'Blue',
    'Hijau': 'Green',
    'Kuning': 'Yellow',
    'Merah Jambu': 'Pink',
    'Oranye': 'Orange',
    'Ungu': 'Purple',

    // Memory + textareas / placeholders
    'Minat, nilai, atau preferensi yang perlu diingat': 'Interests, values, or preferences to remember',
    'Bagikan hal lain yang perlu dipertimbangkan DATZON AI dalam responsnya.': 'Share anything else DATZON AI should consider in its responses.',
    'Biarkan DATZON AI mengingat preferensi dari perangkat ini. Belum sinkron cloud, santai dulu, server belum diseret ke sini.': 'Let DATZON AI remember preferences from this device. Cloud sync is not enabled yet.',
    'Insinyur, pelajar, kreator, dll.': 'Engineer, student, creator, etc.',

    // Profile photo
    'Foto profil': 'Profile photo',
    'Pilih gambar dari perangkat kamu. Gambar akan diupload ke Cloudinary preset profile.': 'Choose an image from your device. The image will be uploaded to the Cloudinary profile preset.',
    'Pilih file gambar untuk foto profil.': 'Choose an image file for your profile photo.',
    'Sedang upload foto profil...': 'Uploading profile photo...',
    'Mengupload foto profil ke Cloudinary...': 'Uploading profile photo to Cloudinary...',
    'Foto profil berhasil diganti.': 'Profile photo changed successfully.',
    'Foto profil berhasil diupload ke Cloudinary': 'Profile photo uploaded to Cloudinary',
    'Foto profil guest dikembalikan ke default.': 'Guest profile photo has been reset to default.',
    'Foto dikembalikan ke foto akun Google/default.': 'Photo has been reset to the Google/default account photo.',
    'Pakai foto Google/default.': 'Using Google/default photo.',
    'Pakai avatar guest default.': 'Using default guest avatar.',
    'Upload foto profil gagal. Cek preset Cloudinary profile.': 'Profile photo upload failed. Check the Cloudinary profile preset.',
    'Upload foto profil gagal': 'Profile photo upload failed',

    // Request limit / guest / check-in page
    'Guest Mode mendapat 20 Chat AI dan 5 Gambar AI. Kalau habis, login/register untuk tambah limit.': 'Guest Mode gets 20 AI Chats and 5 AI Images. When it runs out, log in or register to get more limit.',
    'Guest Mode mendapat 20 AI Chat dan 5 AI Images. Kalau habis, login/register untuk tambah limit.': 'Guest Mode gets 20 AI Chats and 5 AI Images. When it runs out, log in or register to get more limit.',
    'Guest Mode mendapat 20 Chat AI dan 5 Gambar AI.': 'Guest Mode gets 20 AI Chats and 5 AI Images.',
    'Kalau habis, login/register untuk tambah limit.': 'When it runs out, log in or register to get more limit.',
    'Guest mendapat 20 Chat AI dan 5 Gambar AI. Login untuk tambah limit.': 'Guests get 20 AI Chats and 5 AI Images. Log in to get more limit.',
    'Limit akun reset otomatis berkala. Check in dan misi gratis bisa menambah limit kamu.': 'Account limits reset automatically on a schedule. Check-ins and free missions can add more limit.',
    'Chat AI dan Gambar AI tanpa limit sampai': 'AI Chat and AI Images are unlimited until',
    'Register pengguna baru untuk mendapatkan limit gratis, lalu lakukan check in harian untuk bonus limit tambahan.': 'Register a new user to get free limit, then do daily check-ins for extra bonus limit.',
    'Untuk ngobrol, menulis, ringkasan, codex, dan bantuan teks biasa.': 'For chat, writing, summaries, codex, and regular text help.',
    'Untuk generate gambar lewat provider gambar DATZON.': 'For generating images through DATZON image providers.',
    'Dapatkan limit request lebih banyak': 'Get more request limit',
    'Get more request limit': 'Get more request limit',
    'Daily Check-in': 'Daily Check-in',
    'Get Free Limit': 'Get Free Limit',
    'Check in terkunci': 'Check-in locked',
    'Login atau register dulu untuk mengambil bonus limit request dan menyimpan progress harian ke Firebase.': 'Log in or register first to claim request-limit bonuses and save daily progress to Firebase.',
    'Daily check-in is locked in Guest Mode. Log in or register first so progress and bonuses are saved to Firebase.': 'Daily check-in is locked in Guest Mode. Log in or register first so progress and bonuses are saved to Firebase.',
    'Status: 7/7 hadiah sudah diklaim. Siklus check in selesai; tunggu event berikutnya dari DATZON.': 'Status: 7/7 rewards claimed. The check-in cycle is complete; wait for the next DATZON event.',
    'hadiah diklaim': 'rewards claimed',
    'Kamu sudah check in hari ini, balik lagi besok setelah reset jam 12 malam.': 'You checked in today. Come back tomorrow after the midnight reset.',
    'Hadiah berikutnya': 'Next reward',
    'Hari': 'Day',
    'Sudah diambil': 'Claimed',
    'Terkunci': 'Locked',
    'Balik besok': 'Come back tomorrow',
    'Ambil': 'Claim',
    'Mengecek...': 'Checking...',
    'Semua hadiah check in 7 hari sudah diklaim.': 'All 7-day check-in rewards have been claimed.',
    'Hadiah berikutnya adalah': 'The next reward is',
    'Check in Hari': 'Day check-in',
    'berhasil': 'successful',
    'Voucher Rank Immortal 3 hari dibuat.': '3-day Immortal Rank voucher created.',
    'Voucher Trial Rank Immortal 1 hari dibuat.': '1-day Immortal Rank trial voucher created.',

    // Rank and redeem
    'Belum aktif': 'Not active yet',
    'Guest / User biasa': 'Guest / regular user',
    'Tukarkan kode voucher atau klaim hadiah Check in Hari ke-7 untuk mengaktifkan Rank Immortal.': 'Redeem a voucher code or claim the Day 7 check-in reward to activate Immortal Rank.',
    'Benefit Rank Immortal': 'Immortal Rank Benefits',
    'Trial bisa didapat dari voucher.': 'Trial can be obtained from a voucher.',
    'Akses Chat AI tanpa limit': 'Unlimited AI Chat access',
    'Akses Gambar AI tanpa limit': 'Unlimited AI Images access',
    'Prioritas fitur eksperimen DATZON': 'DATZON experimental feature priority',
    'Badge profil Immortal bersinar': 'Glowing Immortal profile badge',
    'Rank Immortal Aktif': 'Immortal Rank Active',
    'Aktif sampai': 'Active until',
    'Semua fitur utama DATZON AI dibuka tanpa limit selama masa trial.': 'All main DATZON AI features are unlocked without limits during the trial period.',
    'Guest / User': 'Guest / User',
    'Durasi voucher akan ditambahkan ke masa aktif Rank Immortal kamu yang sekarang.': 'The voucher duration will be added to your current Immortal Rank active period.',
    'Rank Immortal akan aktif setelah kamu klik Aktifkan.': 'Immortal Rank will activate after you tap Activate.',
    'Gunakan sebaik-baiknya ya.': 'Use it wisely.',
    'Trial tersimpan ke akun Firebase kalau kamu login.': 'The trial is saved to your Firebase account if you are logged in.',
    'Aktifkan': 'Activate',
    'Masukkan kode voucher dulu.': 'Enter the voucher code first.',
    'Kode voucher tidak ditemukan. Cek lagi huruf dan angkanya.': 'Voucher code not found. Check the letters and numbers again.',
    'Kode voucher ini sudah pernah dipakai.': 'This voucher code has already been used.',
    'Kode voucher ini bukan milik akun yang sedang login.': 'This voucher code does not belong to the currently logged-in account.',
    'Kode voucher disalin.': 'Voucher code copied.',
    'Hadiah Hari ke-7': 'Day 7 Reward',
    'Hadiah Limit Gratis': 'Free Limit Reward',

    // Free limit missions
    'Limit Request Gratis': 'Free Request Limit',
    'Selesaikan misi untuk mendapatkan kode voucher Trial Rank Immortal. Misi iklan reset setiap jam 12 malam, misi sosial hanya sekali.': 'Complete missions to get an Immortal Rank Trial voucher code. Ad missions reset every midnight, while social missions are one-time only.',
    'Misi harian: lihat 6 iklan': 'Daily mission: watch 6 ads',
    'Misi sekali: support DATZON': 'One-time mission: support DATZON',
    'selesai': 'completed',
    'reward Trial Rank Immortal 1 hari': 'reward: 1-day Immortal Rank Trial',
    'Diklaim': 'Claimed',
    'Harian': 'Daily',
    'Sekali': 'Once',
    'Klik tiap iklan, lihat/tunggu minimal 10 detik, lalu kembali ke halaman ini sampai semua misi tercentang.': 'Tap each ad, watch/wait at least 10 seconds, then return to this page until every mission is checked.',
    'Buka link YouTube, WhatsApp, dan TikTok. Setelah 5 detik, misi akan tercentang. Link tetap bisa dikunjungi lagi meski misi sudah selesai.': 'Open the YouTube, WhatsApp, and TikTok links. After 5 seconds, the mission will be checked. You can still revisit the links after the mission is complete.',
    'Hadiah harian sudah diklaim': 'Daily reward already claimed',
    'Hadiah sosial sudah diklaim': 'Social reward already claimed',
    'Konfirmasi Misi Iklan': 'Confirm Ad Mission',
    'Konfirmasi Misi Sosial': 'Confirm Social Mission',
    'Lihat iklan minimal': 'Watch the ad for at least',
    'lalu kembali ke DATZON.': 'then return to DATZON.',
    'Buka link dan tunggu': 'Open the link and wait',
    'detik sampai misi tercatat.': 'seconds until the mission is recorded.',
    'Selesai ✓': 'Done ✓',
    'Mulai': 'Start',
    'Hadiah misi iklan harian sudah pernah diklaim.': 'The daily ad mission reward has already been claimed.',
    'Hadiah misi sosial sudah pernah diklaim.': 'The social mission reward has already been claimed.',
    'Selesaikan semua misi iklan harian dulu.': 'Complete all daily ad missions first.',
    'Selesaikan semua misi sosial dulu.': 'Complete all social missions first.',
    'Iklan 1': 'Ad 1',
    'Iklan 2': 'Ad 2',
    'Iklan 3': 'Ad 3',
    'Iklan 4': 'Ad 4',
    'Iklan 5': 'Ad 5',
    'Iklan 6': 'Ad 6',
    'Join Saluran WhatsApp': 'Join WhatsApp Channel',

    // Auth and guest text
    'Masuk...': 'Logging in...',
    'Mendaftarkan akun...': 'Registering account...',
    'Login berhasil. Data disinkronkan.': 'Login successful. Data synced.',
    'Register berhasil. Obrolan lokal dicoba masuk Firestore.': 'Registration successful. Local chats were attempted to be saved to Firestore.',
    'Login berhasil. Data sedang disinkronkan di background.': 'Login successful. Data is syncing in the background.',
    'Register berhasil. Sinkron Firebase berjalan di background.': 'Registration successful. Firebase sync is running in the background.',
    'Google login berhasil. Akun terdeteksi.': 'Google login successful. Account detected.',
    'Register Google berhasil. Data akun Google sudah tersimpan.': 'Google registration successful. Google account data saved.',
    'Register Google selesai. Data sudah tersimpan.': 'Google registration complete. Data saved.',
    'Menyimpan akun Google ke DATZON...': 'Saving Google account to DATZON...',
    'Login Google dulu, baru lengkapi register.': 'Log in with Google first, then complete registration.',
    'Keluar akun. Kembali ke guest localStorage.': 'Logged out. Back to guest localStorage.',
    'Guest mode aktif. Login kalau mau sinkron Firebase.': 'Guest mode active. Log in if you want Firebase sync.',
    'Akun login • 500 MB': 'Logged-in account • 500 MB',
    'Firestore aktif': 'Firestore active',
    'Nama minimal 2 karakter.': 'Name must be at least 2 characters.',
    'Isi email valid dulu.': 'Enter a valid email first.',
    'Email dan password isi dulu. Firebase bukan dukun tebak akun.': 'Enter email and password first. Firebase cannot guess accounts.',
    'Email valid dulu. Yang ngawur-ngawur nanti Firestore ikut pusing.': 'Enter a valid email first. Random input will confuse Firestore too.',
    'Konfirmasi password tidak sama. Dua kolom saja bisa ribut.': 'Password confirmation does not match. Even two fields can cause drama.',
    'Gagal login': 'Login failed',
    'Gagal daftar': 'Registration failed',
    'Gagal logout': 'Logout failed',
    'Google gagal': 'Google failed',
    'Register Google gagal': 'Google registration failed',

    // Storage / reports / misc
    'Data akun, profil, dan obrolan sudah direfresh.': 'Account, profile, and chats refreshed.',
    'Catatan di-refresh. Cache akhirnya kerja juga.': 'Notes refreshed. The cache finally did its job.',
    'Obrolan Firebase dihapus.': 'Firebase chats deleted.',
    'Laporan bug lokal dihapus.': 'Local bug reports deleted.',
    'Laporan bug Firebase dihapus.': 'Firebase bug reports deleted.',
    'Metadata file/gambar lokal dihapus. Delete Cloudinary dicoba kalau token masih valid.': 'Local file/image metadata deleted. Cloudinary deletion was attempted if the token is still valid.',
    'Login dulu untuk hapus obrolan Firebase.': 'Log in first to delete Firebase chats.',
    'Login dulu untuk hapus laporan bug Firebase.': 'Log in first to delete Firebase bug reports.',
    'Login dulu untuk hapus metadata aset Firebase.': 'Log in first to delete Firebase asset metadata.',
    'Laporan bug disimpan. Kalau login, masuk Firestore. Kalau guest, tersimpan lokal.': 'Bug report saved. If logged in, it goes to Firestore. If guest, it is saved locally.',
    'Laporan bug masuk Firestore. Laporan tersimpan.': 'Bug report sent to Firestore. Report saved.',
    'Riwayat obrolan lokal dihapus. Asset Cloudinary dicoba hapus kalau token masih valid.': 'Local chat history deleted. Cloudinary assets were attempted to be deleted if the token is still valid.',
    'Obrolan aktif sekarang': 'Current active chat',
    'Tidak ada potongan chat.': 'No chat snippet.',
    'Obrolan ini': 'This chat',
    'bakal hilang permanen. Manusia memang suka tombol bahaya.': 'will disappear permanently. Humans do love dangerous buttons.',
    'Obrolan ini akan dihapus permanen dari riwayat lokal dan cloud kalau akun tersambung. Jangan nangis ke CSS nanti.': 'This chat will be permanently deleted from local history and cloud if the account is connected. Do not cry to CSS later.',
    'Judulnya isi dulu. Obrolan tanpa nama itu kayak warung tanpa papan.': 'Fill in the title first. A chat without a name is like a shop without a sign.',
    'Judul obrolan diganti.': 'Chat title changed.',
    'Cari': 'Search',
    'Salin jawaban': 'Copy answer',
    'Jawaban disalin.': 'Answer copied.',
    'Tersimpan ke catatan.': 'Saved to notes.',

    // Image generation labels
    'Ikut prompt, DATZON tambah polish ringan.': 'Follow the prompt; DATZON adds light polish.',
    'Realistis': 'Realistic',
    'Ilustrasi anime clean dan aesthetic.': 'Clean and aesthetic anime illustration.',
    'Nuansa film, dramatis, detail.': 'Film-like, dramatic, detailed.',
    'Gaya game retro pixel.': 'Retro pixel game style.',
    'Magis, epik, imajinatif.': 'Magical, epic, imaginative.',
    'Neon, futuristik, kota malam.': 'Neon, futuristic, night city.',
    'Ringan, cocok coba prompt.': 'Lightweight, good for trying prompts.',
    'Default, kualitas aman.': 'Default, reliable quality.',
    'HD Eksperimental': 'Experimental HD',
    'Pilih kualitas gambar': 'Choose image quality',
    'Provider gambar': 'Image provider',
    'Public image API, tanpa API key.': 'Public image API, no API key.',
    'Butuh API token untuk text-to-image.': 'Requires an API token for text-to-image.',
    'Mendengarkan... silakan bicara': 'Listening... please speak',

    // Mic permission modal and errors
    'Izin mikrofon belum dipilih. Tekan mic lagi untuk mencoba ulang.': 'Microphone permission has not been chosen. Tap the mic again to retry.',
    'Izin mikrofon gagal': 'Microphone permission failed',
    'Speech gagal dimulai. Coba tekan mikrofon lagi.': 'Speech failed to start. Try pressing the microphone again.',
    'Browser': 'Browser',

    // File/media viewer
    'Jenis kode': 'Code type',
    'Klik tab Kode buat lihat semuanya.': 'Click the Code tab to view everything.',
    'Pratinjau tidak tersedia': 'Preview unavailable',
    'Jalankan website': 'Run website',
    'Lihat kode': 'View code',
    'Lihat semua kode': 'View all code',
    'Buka obrolan': 'Open chat',
    'Chat ID': 'Chat ID',

    // Provider/API failure copy
    'Hugging Face lagi error, token kosong/salah, model sedang loading, atau limit free tier sedang penuh. Coba lagi nanti atau pindah ke Pollination.': 'Hugging Face is currently erroring, the token is empty/wrong, the model is loading, or the free-tier limit is full. Try again later or switch to Pollination.',
    'Limit request untuk Chat AI kamu sudah habis untuk sesi 12 jam ini. Kamu bisa tunggu reset otomatis, atau dapatkan limit request tambahan lewat Register Pengguna Baru dan Check in Harian.': 'Your AI Chat request limit has run out for this 12-hour session. You can wait for the automatic reset or get extra request limit through New User Registration and Daily Check-in.',
    'Limit request untuk Gambar AI kamu sudah habis untuk sesi 12 jam ini. Kamu bisa tunggu reset otomatis, atau dapatkan limit request tambahan lewat Register Pengguna Baru dan Check in Harian.': 'Your AI Images request limit has run out for this 12-hour session. You can wait for the automatic reset or get extra request limit through New User Registration and Daily Check-in.',
    'Register Pengguna Baru': 'New User Registration',
    'Dapatkan Limit': 'Get Limit',

    // Chat with attached files internal visible messages
    'User mengirim': 'User sent',
    'file/lampiran.': 'files/attachments.',
    'Baca isi file yang tersedia di bawah ini. Jangan pura-pura melihat isi file yang tidak tersedia.': 'Read the available file contents below. Do not pretend to see unavailable file contents.',
    'Gambar ini dikirim sebagai input visual. Analisis isi visualnya kalau user bertanya tentang gambar.': 'This image was sent as visual input. Analyze its visual content if the user asks about the image.',
    'Ini file gambar. Provider/model yang dipilih belum menerima input visual langsung, jadi jangan pura-pura melihat detail gambarnya. Sarankan pakai Google Studio/Gemini atau Mistral vision.': 'This is an image file. The selected provider/model does not receive direct visual input yet, so do not pretend to see its details. Suggest using Google Studio/Gemini or Mistral vision.',
    'Memori aktif. Gunakan data ini kalau relevan:': 'Memory is enabled. Use this data when relevant:',
    'Pekerjaan/peran user:': 'User job/role:',
    'Info tambahan tentang user:': 'Additional info about the user:',
    'Gaya/nada dasar dari settings:': 'Base style/tone from settings:',
    'Karakteristik:': 'Traits:',
    'Jawaban cepat aktif: prioritaskan jawaban langsung, jangan kepanjangan kecuali user minta detail.': 'Quick answers enabled: prioritize direct answers and do not be too long unless the user asks for details.',
    'Jawaban cepat nonaktif: boleh jawab lebih dalam dan lengkap.': 'Quick answers disabled: deeper and more complete answers are allowed.',
    'DATZON AI mikir': 'DATZON AI is thinking'
  });


  /* V30 hardening: profile photo, rename modal, placeholders, and mixed/partial strings from previous translation passes. */
  Object.assign(ID_TO_EN, {
    // Profile photo page and mixed translated strings
    'Photo Profile': 'Profile Photo',
    'Foto profil disimpan ke Cloudinary. Guest menyimpan URL di localStorage, akun login menyimpan URL di Firebase.': 'Profile photos are saved to Cloudinary. Guests store the URL in localStorage, logged-in accounts store it in Firebase.',
    'Profile photo disimpan ke Cloudinary. Guest menyimpan URL di localStorage, akun login menyimpan URL di Firebase.': 'Profile photos are saved to Cloudinary. Guests store the URL in localStorage, logged-in accounts store it in Firebase.',
    'Pilih gambar dari perangkat kamu. Gambar akan diupload ke Cloudinary preset profile.': 'Choose an image from your device. The image will be uploaded to the Cloudinary profile preset.',
    'Pilih gambar dari perangkat kamu. Gambar akan diunggah ke Cloudinary preset profile.': 'Choose an image from your device. The image will be uploaded to the Cloudinary profile preset.',
    'Choose an image from your device. Gambar akan diupload ke Cloudinary preset profile.': 'Choose an image from your device. The image will be uploaded to the Cloudinary profile preset.',
    'Change Photo': 'Change Photo',
    'Remove Photo': 'Remove Photo',
    'Ganti Foto': 'Change Photo',
    'Hapus Foto': 'Remove Photo',
    'Foto custom aktif.': 'Custom photo active.',
    'Using default guest avatar.': 'Using default guest avatar.',
    'Pilih gambar dari perangkat kamu.': 'Choose an image from your device.',

    // Rename / display-name modal
    'Ganti nama': 'Rename',
    'Ganti nama tampilan': 'Rename display name',
    'Rename': 'Rename',
    'Nama tampilan': 'Display name',
    'Masukkan nama baru': 'Enter a new name',
    'Disimpan lokal di perangkat ini dulu. Database belum ikut kerja bakti.': 'Saved locally on this device first. Logged-in accounts will also save it to Firebase.',
    'Display name disimpan.': 'Display name saved.',
    'Nama tampilan disimpan.': 'Display name saved.',
    'Nama disimpan ke perangkat ini.': 'Name saved to this device.',
    'Nama disimpan ke Firebase.': 'Name saved to Firebase.',
    'Tidak bisa menyimpan nama.': 'Could not save the name.',

    // Composer placeholders / mic / image prompt
    'Tanya apa saja...': 'Ask anything...',
    'Tanya apa aja...': 'Ask anything...',
    'Tulis prompt gambar...': 'Write an image prompt...',
    'Mendengarkan... silakan bicara': 'Listening... please speak',
    'Mendengarkan... silakan bicara...': 'Listening... please speak...',
    'Ask anything...': 'Ask anything...',
    'Write an image prompt...': 'Write an image prompt...',

    // Provider/menu labels and repeated text repairs
    'Instan': 'Instant',
    'Instant': 'Instant',
    'Tinggi': 'High',
    'Sedang': 'Medium',
    'Rendah': 'Low',
    'Versi': 'Version',
    'Version': 'Version',
    'Indonesia': 'Indonesian',
    'Indonesian': 'Indonesian',
    'Bahasa diubah ke English.': 'Language changed to English.',
    'Bahasa diubah ke Indonesia.': 'Language changed to Indonesian.',
    'Language changed to Indonesia.': 'Language changed to Indonesian.',

    // General/settings strings seen around the affected pages
    'Umum': 'General',
    'General': 'General',
    'Default untuk DATZON AI.': 'Default for DATZON AI.',
    'Translate the whole UI to English.': 'Translate the whole UI to English.',
    'Terjemahkan seluruh UI ke English.': 'Translate the whole UI to English.',
    'Pilih bahasa untuk menerjemahkan seluruh tampilan DATZON AI.': 'Choose a language to translate the whole DATZON AI interface.',
    'Pilih gambar dari perangkat kamu. Gambar akan diupload ke Cloudinary preset profile.': 'Choose an image from your device. The image will be uploaded to the Cloudinary profile preset.',
    'Request Limit': 'Request Limit',
    'Guest: Chat 3 / 20 • Images 0 / 5 • login untuk tambah limit': 'Guest: Chat 3 / 20 • Images 0 / 5 • log in for more limit',
    'Guest: Chat 3 / 20 • Gambar 0 / 5 • login untuk tambah limit': 'Guest: Chat 3 / 20 • Images 0 / 5 • log in for more limit',
    'Login untuk tambah limit': 'Log in for more limit',
    'login untuk tambah limit': 'log in for more limit',
    'Login / Register': 'Log in / Register'
  });



  /* V33 custom API key provider page and fallback bubble. */
  Object.assign(ID_TO_EN, {
    'API Key Sendiri': 'Own API Key',
    'Simpan API key pribadi untuk provider custom.': 'Save a personal API key for a custom provider.',
    'Provider custom': 'Custom provider',
    'Tambahkan API key pribadi untuk Mistral, Groq, atau Google Studio.': 'Add your personal API key for Mistral, Groq, or Google Studio.',
    'Provider': 'Provider',
    'Nama provider': 'Provider name',
    'Contoh: Google Studio 2': 'Example: Google Studio 2',
    'Contoh: Mistral 2': 'Example: Mistral 2',
    'Contoh: Groq 2': 'Example: Groq 2',
    'Kode API key': 'API key code',
    'Tempel API key di sini': 'Paste the API key here',
    'Tampilkan API key': 'Show API key',
    'Penyimpanan': 'Storage',
    'LocalStorage perangkat ini': 'This device LocalStorage',
    'Firebase akun login': 'Logged-in account Firebase',
    'Ambil Google Studio': 'Get Google Studio',
    'Ambil Mistral': 'Get Mistral',
    'Ambil Groq': 'Get Groq',
    'Simpan API key': 'Save API key',
    'API key pribadi hanya dipakai saat provider custom itu dipilih.': 'The personal API key is only used when that custom provider is selected.',
    'API key tersimpan': 'Saved API keys',
    'Belum ada API key sendiri': 'No own API key yet',
    'Tambahkan API key untuk memunculkan provider pribadi.': 'Add an API key to show a personal provider.',
    'API key custom tersimpan.': 'Custom API key saved.',
    'API key custom dihapus.': 'Custom API key deleted.',
    'Masukkan kode API key dulu.': 'Enter the API key code first.',
    'Kode API key terlalu pendek. Cek lagi kodenya.': 'The API key code is too short. Check it again.',
    'API key custom tersimpan:': 'Custom API key saved:',
    'Gagal menyimpan API key:': 'Failed to save API key:',
    'API key sendiri': 'Own API key',
    'pribadi': 'personal',
    'Google Studio pribadi': 'Personal Google Studio',
    'Mistral pribadi': 'Personal Mistral',
    'Groq pribadi': 'Personal Groq',
    'belum aktif karena belum ada API key': 'is not active because there is no valid API key',
    'yang valid. Kamu bisa ambil API key dari': 'valid. You can get an API key from',
    'atau pakai API key sendiri di website ini.': 'or use your own API key on this website.',
    'sedang error, kuota habis, model tidak cocok, atau API key pribadi ini rusak. Kamu bisa ambil API key baru dari': 'is erroring, out of quota, using an incompatible model, or this personal API key is broken. You can get a new API key from',
    'lalu simpan ulang di halaman API Key Sendiri.': 'then save it again on the Own API Key page.',
    'sedang error, kuota habis, model tidak cocok, atau API key-nya rusak. Kamu bisa ambil API key dari': 'is erroring, out of quota, using an incompatible model, or the API key is broken. You can get an API key from',
    'pakai API key sendiri, atau ganti pilihan AI ke': 'use your own API key, or switch AI provider to',
    'Mistral belum aktif karena belum ada API key Mistral yang valid. Kamu bisa ambil API key dari Mistral Console, atau pakai API key sendiri di website ini.': 'Mistral is not active because there is no valid Mistral API key. You can get an API key from Mistral Console, or use your own API key on this website.',
    'Groq belum aktif karena belum ada API key Groq yang valid. Kamu bisa ambil API key dari GroqCloud, atau pakai API key sendiri di website ini.': 'Groq is not active because there is no valid Groq API key. You can get an API key from GroqCloud, or use your own API key on this website.',
    'Google Studio belum aktif karena belum ada API key Google Studio yang valid. Kamu bisa ambil API key dari Google AI Studio, atau pakai API key sendiri di website ini.': 'Google Studio is not active because there is no valid Google Studio API key. You can get an API key from Google AI Studio, or use your own API key on this website.',
    'Mistral sedang error, kuota habis, model tidak cocok, atau API key-nya rusak. Kamu bisa ambil API key dari Mistral Console, pakai API key sendiri, atau ganti pilihan AI ke Groq / Google Studio. Obrolan sebelumnya tetap ikut dikirim, jadi konteksnya tetap kebawa.': 'Mistral is erroring, out of quota, using an incompatible model, or the API key is broken. You can get an API key from Mistral Console, use your own API key, or switch AI provider to Groq / Google Studio. Previous chat messages are still sent, so the context stays included.',
    'Groq sedang error, kuota habis, model tidak cocok, atau API key-nya rusak. Kamu bisa ambil API key dari GroqCloud, pakai API key sendiri, atau ganti pilihan AI ke Mistral / Google Studio. Obrolan sebelumnya tetap ikut dikirim, jadi konteksnya tetap kebawa.': 'Groq is erroring, out of quota, using an incompatible model, or the API key is broken. You can get an API key from GroqCloud, use your own API key, or switch AI provider to Mistral / Google Studio. Previous chat messages are still sent, so the context stays included.',
    'Google Studio sedang error, kuota habis, model tidak cocok, atau API key-nya rusak. Kamu bisa ambil API key dari Google AI Studio, pakai API key sendiri, atau ganti pilihan AI ke Mistral / Groq. Obrolan sebelumnya tetap ikut dikirim, jadi konteksnya tetap kebawa.': 'Google Studio is erroring, out of quota, using an incompatible model, or the API key is broken. You can get an API key from Google AI Studio, use your own API key, or switch AI provider to Mistral / Groq. Previous chat messages are still sent, so the context stays included.',
    'sedang error, kuota habis, model tidak cocok, atau API key pribadi ini rusak. Kamu bisa ambil API key baru dari GroqCloud, lalu simpan ulang di halaman API Key Sendiri.': 'is erroring, out of quota, using an incompatible model, or this personal API key is broken. You can get a new API key from GroqCloud, then save it again on the Own API Key page.',
    'sedang error, kuota habis, model tidak cocok, atau API key pribadi ini rusak. Kamu bisa ambil API key baru dari Mistral Console, lalu simpan ulang di halaman API Key Sendiri.': 'is erroring, out of quota, using an incompatible model, or this personal API key is broken. You can get a new API key from Mistral Console, then save it again on the Own API Key page.',
    'sedang error, kuota habis, model tidak cocok, atau API key pribadi ini rusak. Kamu bisa ambil API key baru dari Google AI Studio, lalu simpan ulang di halaman API Key Sendiri.': 'is erroring, out of quota, using an incompatible model, or this personal API key is broken. You can get a new API key from Google AI Studio, then save it again on the Own API Key page.',
    'Ambil API key': 'Get API key',
    'Pakai API key sendiri': 'Use my own API key',
    'Google Studio sedang error, kuota habis, atau belum ada API key Google Studio yang aktif. Kalau mau tetap pakai Google Studio, ambil API key dari Google AI Studio lalu pakai API key sendiri di website ini.': 'Google Studio is erroring, out of quota, or has no active Google Studio API key. To keep using Google Studio, get an API key from Google AI Studio and use your own API key on this website.',
    'sedang error, kuota habis, atau API key pribadi ini rusak. Kamu bisa ambil API key baru dari Google AI Studio, lalu simpan lagi di halaman API Key Sendiri.': 'is erroring, out of quota, or this personal API key is broken. You can get a new API key from Google AI Studio, then save it again on the Own API Key page.',
    'belum aktif karena semua slot API key masih dummy/placeholder. Ganti key di firebase.js bagian DATZON_AI_KEYS.': 'is not active because all API key slots are still dummy/placeholders. Change the keys in firebase.js under DATZON_AI_KEYS.',
    'lagi error, kuota habis, atau API key-nya rusak. Coba ganti pilihan AI ke': 'is erroring, out of quota, or the API key is broken. Try switching AI to',
    'Obrolan sebelumnya tetap ikut dikirim, jadi konteksnya tetap kebawa.': 'Previous chat messages are still sent, so the context stays included.',
    'Sumber:': 'Source:',
    'belum punya API key asli.': 'does not have a real API key yet.',
    'gagal semua key. Detail disembunyikan dari chat, cek console kalau mau bedah mayat error.': 'failed on all keys. Details are hidden from chat; check the console to inspect the error.',
    'Ringan buat chat dan teks.': 'Lightweight for chat and text.',
    'Kencang buat respons cepat.': 'Fast for quick responses.',
    'Cocok kalau nanti pakai API key Gemini.': 'Good if you later use a Gemini API key.',
    'API key': 'API key'
  });

  let EN_TO_ID = Object.fromEntries(Object.entries(ID_TO_EN).map(([id,en]) => [en,id]));

  function normalizeLang(value){
    return String(value || '').toLowerCase().startsWith('eng') ? LANG_EN : LANG_ID;
  }

  function storedLanguage(){
    try{
      const profile = JSON.parse(localStorage.getItem(STORAGE_PROFILE) || '{}');
      return normalizeLang(profile.language || localStorage.getItem('datzonAiLanguage') || LANG_ID);
    }catch(e){
      return normalizeLang(localStorage.getItem('datzonAiLanguage') || LANG_ID);
    }
  }

  let currentLanguage = storedLanguage();
  let applying = false;
  let observer = null;

  function mapMonthsToEN(text){
    return text.replace(/Januari/g,'January').replace(/Februari/g,'February').replace(/Maret/g,'March').replace(/Mei/g,'May').replace(/Juni/g,'June').replace(/Juli/g,'July').replace(/Agustus/g,'August').replace(/Oktober/g,'October').replace(/Desember/g,'December');
  }
  function mapMonthsToID(text){
    return text.replace(/January/g,'Januari').replace(/February/g,'Februari').replace(/March/g,'Maret').replace(/May/g,'Mei').replace(/June/g,'Juni').replace(/July/g,'Juli').replace(/August/g,'Agustus').replace(/October/g,'Oktober').replace(/December/g,'Desember');
  }

  function translatePattern(text, toEnglish){
    let s = text;
    if(toEnglish){
      s = s.replace(/^(\d+) gambar • (\d+) file tersimpan dari obrolan dan Gambar AI\.$/i, '$1 images • $2 files saved from chats and AI Images.');
      s = s.replace(/^Guest: Chat (\d+)x • Gambar (\d+)x$/i, 'Guest: $1 chats • $2 images');
      s = s.replace(/^Guest: Chat (\d+)x • Gambar (\d+)x • login untuk tambah limit$/i, 'Guest: $1 chats • $2 images • log in for more limit');
      s = s.replace(/^Chat (.+) • Gambar (.+) • reset (.+)$/i, 'Chat $1 • Images $2 • reset $3');
      s = s.replace(/^Rank Immortal • unlimited sampai (.+)$/i, (_,d)=>`Immortal Rank • unlimited until ${mapMonthsToEN(d)}`);
      s = s.replace(/^Immortal sampai (.+)$/i, (_,d)=>`Immortal until ${mapMonthsToEN(d)}`);
      s = s.replace(/^Ukuran teks bubble: (.+)$/i, 'Bubble text size: $1');
      s = s.replace(/^(.+) lokal( • cloud sinkron)?$/i, (_,a,b)=>`${a} local${b ? ' • cloud synced' : ''}`);
      s = s.replace(/^(.+) termasuk foto profil$/i, '$1 including profile photo');
      s = s.replace(/^(\d+) file\/foto attach • (.+)$/i, '$1 attached files/photos • $2');
      s = s.replace(/^(\d+) gambar AI • (.+)$/i, '$1 AI images • $2');
      s = s.replace(/^(\d+) aset tercatat • (.+)$/i, '$1 recorded assets • $2');
      s = s.replace(/^(.+) persen penyimpanan terpakai$/i, '$1 percent of storage used');
      s = s.replace(/^Sumber: (.+) gagal memproses gambar\.$/i, 'Source: $1 failed to process the image.');
      s = s.replace(/^Sumber: (.+) gagal total\.$/i, 'Source: $1 failed completely.');
      s = s.replace(/^Email reset dikirim ke (.+)\.$/i, 'Reset email sent to $1.');
      s = s.replace(/^Reset gagal: (.+)$/i, 'Reset failed: $1');
      s = s.replace(/^Permintaan reset diproses untuk (.+)\. Cek email kalau akun Firebase-nya ada\.$/i, 'Reset request processed for $1. Check email if the Firebase account exists.');
      s = s.replace(/^Foto profil berhasil diupload ke Cloudinary \((.+)\)\.$/i, 'Profile photo uploaded to Cloudinary ($1).');
      s = s.replace(/^Upload foto profil gagal: (.+)$/i, 'Profile photo upload failed: $1');
      s = s.replace(/^Sedang upload foto profil\.\.\.$/i, 'Uploading profile photo...');
      s = s.replace(/^Mengupload foto profil ke Cloudinary\.\.\.$/i, 'Uploading profile photo to Cloudinary...');
      s = s.replace(/(\d+) detik/g, '$1 seconds').replace(/(\d+) menit/g, '$1 minutes').replace(/(\d+) jam/g, '$1 hours').replace(/(\d+) hari/g, '$1 days');
      s = s.replace(/^(.+) MB \/ 1\.00 GB$/i, '$1 MB / 1.00 GB');
      return s;
    }
    s = s.replace(/^(\d+) images • (\d+) files saved from chats and AI Images\.$/i, '$1 gambar • $2 file tersimpan dari obrolan dan Gambar AI.');
    s = s.replace(/^Guest: (\d+) chats • (\d+) images$/i, 'Guest: Chat $1x • Gambar $2x');
    s = s.replace(/^Guest: (\d+) chats • (\d+) images • log in for more limit$/i, 'Guest: Chat $1x • Gambar $2x • login untuk tambah limit');
    s = s.replace(/^Chat (.+) • Images (.+) • reset (.+)$/i, 'Chat $1 • Gambar $2 • reset $3');
    s = s.replace(/^Immortal Rank • unlimited until (.+)$/i, (_,d)=>`Rank Immortal • unlimited sampai ${mapMonthsToID(d)}`);
    s = s.replace(/^Immortal until (.+)$/i, (_,d)=>`Immortal sampai ${mapMonthsToID(d)}`);
    s = s.replace(/^Bubble text size: (.+)$/i, 'Ukuran teks bubble: $1');
    s = s.replace(/^(.+) local( • cloud synced)?$/i, (_,a,b)=>`${a} lokal${b ? ' • cloud sinkron' : ''}`);
    s = s.replace(/^(.+) including profile photo$/i, '$1 termasuk foto profil');
    s = s.replace(/^(\d+) attached files\/photos • (.+)$/i, '$1 file/foto attach • $2');
    s = s.replace(/^(\d+) AI images • (.+)$/i, '$1 gambar AI • $2');
    s = s.replace(/^(\d+) recorded assets • (.+)$/i, '$1 aset tercatat • $2');
    s = s.replace(/^(.+) percent of storage used$/i, '$1 persen penyimpanan terpakai');
    s = s.replace(/^Source: (.+) failed to process the image\.$/i, 'Sumber: $1 gagal memproses gambar.');
    s = s.replace(/^Source: (.+) failed completely\.$/i, 'Sumber: $1 gagal total.');
    s = s.replace(/^Reset email sent to (.+)\.$/i, 'Email reset dikirim ke $1.');
    s = s.replace(/^Reset failed: (.+)$/i, 'Reset gagal: $1');
    s = s.replace(/^Reset request processed for (.+)\. Check email if the Firebase account exists\.$/i, 'Permintaan reset diproses untuk $1. Cek email kalau akun Firebase-nya ada.');
    s = s.replace(/^Profile photo uploaded to Cloudinary \((.+)\)\.$/i, 'Foto profil berhasil diupload ke Cloudinary ($1).');
    s = s.replace(/^Profile photo upload failed: (.+)$/i, 'Upload foto profil gagal: $1');
    s = s.replace(/^Uploading profile photo\.\.\.$/i, 'Sedang upload foto profil...');
    s = s.replace(/(\d+) seconds/g, '$1 detik').replace(/(\d+) minutes/g, '$1 menit').replace(/(\d+) hours/g, '$1 jam').replace(/(\d+) days/g, '$1 hari');
    return s;
  }


  function escapeRegExp(str){
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function cleanupTranslationArtifacts(text, toEnglish){
    let out = String(text);
    // Fix repeated suffixes caused by earlier partial replacements such as Versi -> Version -> Versionon.
    out = out.replace(/\bVersion(?:on)+\b/g, 'Version');
    out = out.replace(/\bIndonesian(?:n)+\b/g, 'Indonesian');
    out = out.replace(/\bInstant(?:t)+\b/g, 'Instant');
    out = out.replace(/\bImages(?:s)+\b/g, 'Images');
    out = out.replace(/\bFiles(?:s)+\b/g, 'Files');
    out = out.replace(/\bChat(?:t)+\b/g, 'Chat');
    if(!toEnglish){
      out = out.replace(/\bVersion\b/g, 'Versi');
      out = out.replace(/\bIndonesian\b/g, 'Indonesia');
      out = out.replace(/\bInstant\b/g, 'Instan');
    }
    return out;
  }

  function safePhraseRegex(from){
    const escaped = escapeRegExp(from);
    // Only replace standalone words/phrases. This prevents Instan -> Instant from being
    // applied again inside the already translated word "Instant".
    return new RegExp('(^|[^\\p{L}\\p{N}_])(' + escaped + ')(?=$|[^\\p{L}\\p{N}_])', 'gu');
  }

  function translateByPhrases(text, toEnglish){
    const pairs = Object.entries(toEnglish ? ID_TO_EN : EN_TO_ID)
      .filter(([from,to]) => from && to && from.length >= 5)
      .sort((a,b) => b[0].length - a[0].length);
    let out = cleanupTranslationArtifacts(String(text), toEnglish);
    for(const [from,to] of pairs){
      if(!out.includes(from)) continue;
      // Skip self-expanding pairs unless the whole string is exactly the source.
      if(toEnglish && String(to).includes(from) && out.trim() !== from) continue;
      out = out.replace(safePhraseRegex(from), (m, pre) => pre + to);
    }
    out = cleanupTranslationArtifacts(out, toEnglish);
    if(toEnglish){
      out = out.replace(/(\d+) detik/g, '$1 seconds').replace(/(\d+) menit/g, '$1 minutes').replace(/(\d+) jam/g, '$1 hours').replace(/(\d+) hari/g, '$1 days');
      // Use conservative word-boundary replacements only.
      out = out.replace(/\bsampai\b/g, 'until').replace(/\btersimpan\b/g, 'saved').replace(/\btercatat\b/g, 'recorded').replace(/\bmisi\b/g, 'mission');
      out = out.replace(/\bgambar\b/g, 'images').replace(/\bGambar\b/g, 'Images').replace(/\bobrolan\b/g, 'chats').replace(/\bObrolan\b/g, 'Chats');
      out = out.replace(/\bbelum aktif\b/gi, 'not active yet').replace(/\bterkunci\b/gi, 'locked').replace(/\bdiklaim\b/gi, 'claimed');
    }else{
      out = out.replace(/(\d+) seconds/g, '$1 detik').replace(/(\d+) minutes/g, '$1 menit').replace(/(\d+) hours/g, '$1 jam').replace(/(\d+) days/g, '$1 hari');
      out = out.replace(/\buntil\b/g, 'sampai').replace(/\bsaved\b/g, 'tersimpan').replace(/\brecorded\b/g, 'tercatat').replace(/\bmission\b/g, 'misi');
    }
    return cleanupTranslationArtifacts(out, toEnglish);
  }

  function translateText(raw, lang=currentLanguage){
    if(raw == null) return raw;
    const original = String(raw);
    const trimmed = cleanupTranslationArtifacts(original.trim(), normalizeLang(lang) === LANG_EN);
    if(!trimmed) return original;
    const toEnglish = normalizeLang(lang) === LANG_EN;
    const dict = toEnglish ? ID_TO_EN : EN_TO_ID;
    let translated = dict[trimmed] || translatePattern(trimmed, toEnglish);
    translated = translateByPhrases(translated, toEnglish);
    translated = cleanupTranslationArtifacts(translated, toEnglish);
    if(translated === trimmed && !dict[trimmed]) return cleanupTranslationArtifacts(original, toEnglish);
    const lead = original.match(/^\s*/)?.[0] || '';
    const trail = original.match(/\s*$/)?.[0] || '';
    return lead + translated + trail;
  }

  function inTranslatableSystemBubble(el){
    return !!el?.closest?.('#chatLog .bubble.system-ui-bubble, #chatLog .bubble .limit-bubble-notice, #chatLog .bubble .api-key-help-actions');
  }

  function shouldSkipNode(node){
    const el = node.nodeType === 1 ? node : node.parentElement;
    if(!el) return true;
    if(el.closest('script,style,noscript,code,pre,textarea,[contenteditable="true"],[data-no-i18n],.notranslate')) return true;
    if(el.closest('#chatLog .bubble,#chatLog .msg-content,#chatLog .markdown-body') && !inTranslatableSystemBubble(el)) return true;
    return false;
  }

  function shouldSkipAttrElement(el){
    if(!el) return true;
    if(el.closest('script,style,noscript,code,pre,[contenteditable="true"],[data-no-i18n],.notranslate')) return true;
    if(el.closest('#chatLog .bubble,#chatLog .msg-content,#chatLog .markdown-body') && !inTranslatableSystemBubble(el)) return true;
    return false;
  }

  function translateAttributes(root){
    if(!root || root.nodeType !== 1) return;
    const attrs = ['placeholder','title','aria-label','data-prompt','alt'];
    const nodes = [root, ...root.querySelectorAll('*')];
    for(const el of nodes){
      if(shouldSkipAttrElement(el)) continue;
      for(const attr of attrs){
        if(!el.hasAttribute?.(attr)) continue;
        const before = el.getAttribute(attr);
        const after = translateText(before);
        if(after !== before) el.setAttribute(attr, after);
      }
    }
  }

  function translateTextNodes(root){
    if(!root) return;
    const doc = root.ownerDocument || document;
    const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if(shouldSkipNode(node)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const batch = [];
    while(walker.nextNode()) batch.push(walker.currentNode);
    for(const node of batch){
      const before = node.nodeValue;
      const after = translateText(before);
      if(after !== before) node.nodeValue = after;
    }
  }

  function apply(root=document.body){
    if(applying || !root) return;
    applying = true;
    try{
      document.documentElement.lang = currentLanguage === LANG_EN ? 'en' : 'id';
      translateAttributes(root.nodeType === 1 ? root : document.body);
      translateTextNodes(root.nodeType === 1 || root.nodeType === 9 ? root : document.body);
    }finally{
      applying = false;
    }
  }

  function setLanguage(lang){
    currentLanguage = normalizeLang(lang);
    try{ localStorage.setItem('datzonAiLanguage', currentLanguage); }catch(e){}
    apply(document.body);
  }

  function startObserver(){
    if(observer || !document.body) return;
    observer = new MutationObserver((mutations) => {
      if(applying) return;
      clearTimeout(startObserver._timer);
      startObserver._timer = setTimeout(() => {
        for(const m of mutations){
          if(m.type === 'childList'){
            for(const n of m.addedNodes){
              if(n.nodeType === 1) apply(n);
              else if(n.nodeType === 3 && n.parentElement) apply(n.parentElement);
            }
          }else if(m.type === 'characterData' && m.target?.parentElement){
            apply(m.target.parentElement);
          }else if(m.type === 'attributes' && m.target){
            apply(m.target);
          }
        }
      }, 40);
    });
    observer.observe(document.body, {childList:true, characterData:true, attributes:true, attributeFilter:['placeholder','title','aria-label','data-prompt','alt'], subtree:true});
  }

  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(storedLanguage());
    startObserver();
  });

  document.addEventListener('click', (e) => {
    const langBtn = e.target.closest?.('[data-language]');
    if(langBtn) setTimeout(() => setLanguage(langBtn.dataset.language), 30);
  });


  function translateControlValueSoon(){
    setTimeout(() => {
      try{
        const input = document.getElementById('prompt');
        if(input && input.value) input.value = translateText(input.value);
      }catch(e){}
    }, 0);
  }

  document.addEventListener('click', (e) => {
    if(e.target.closest?.('.quick-card,[data-side="writer"],[data-side="summary"],[data-side="codex"],[data-side="image"]')) translateControlValueSoon();
  }, true);

  document.addEventListener('input', (e) => {
    if(e.target?.matches?.('#prompt') && e.isTrusted === false) translateControlValueSoon();
  }, true);


  /* V37 system bubble, provider menu, and hidden dynamic texts. */
  Object.assign(ID_TO_EN, {
    'Sistem limit request DATZON': 'DATZON request limit system',
    'Limit Chat AI sudah habis': 'AI Chat limit is used up',
    'Limit Gambar AI sudah habis': 'AI Images limit is used up',
    'Limit request untuk Chat AI kamu sudah habis untuk sesi 12 jam ini. Kamu bisa tunggu reset otomatis, atau dapatkan limit request tambahan lewat Register Pengguna Baru dan Check in Harian.': 'Your AI Chat request limit is used up for this 12-hour session. You can wait for the automatic reset, or get extra request limit through New User Registration and Daily Check-in.',
    'Limit request untuk Gambar AI kamu sudah habis untuk sesi 12 jam ini. Kamu bisa tunggu reset otomatis, atau dapatkan limit request tambahan lewat Register Pengguna Baru dan Check in Harian.': 'Your AI Images request limit is used up for this 12-hour session. You can wait for the automatic reset, or get extra request limit through New User Registration and Daily Check-in.',
    'Register Pengguna Baru →': 'New User Registration →',
    'Check in Harian →': 'Daily Check-in →',
    'API key sendiri': 'Own API key',
    'AI gratis': 'Free AI',
    'pribadi': 'personal',
    'Google Studio belum aktif karena belum ada API key Google Studio yang valid. Kamu bisa ambil API key dari Google AI Studio, atau pakai API key sendiri di website ini.': 'Google Studio is not active because there is no valid Google Studio API key yet. You can get an API key from Google AI Studio, or use your own API key on this website.',
    'Groq belum aktif karena belum ada API key Groq yang valid. Kamu bisa ambil API key dari GroqCloud, atau pakai API key sendiri di website ini.': 'Groq is not active because there is no valid Groq API key yet. You can get an API key from GroqCloud, or use your own API key on this website.',
    'Mistral belum aktif karena belum ada API key Mistral yang valid. Kamu bisa ambil API key dari Mistral Console, atau pakai API key sendiri di website ini.': 'Mistral is not active because there is no valid Mistral API key yet. You can get an API key from Mistral Console, or use your own API key on this website.',
    'Google Studio sedang error, kuota habis, model tidak cocok, atau API key-nya rusak. Kamu bisa ambil API key dari Google AI Studio, pakai API key sendiri, atau ganti pilihan AI ke Mistral / Groq. Obrolan sebelumnya tetap ikut dikirim, jadi konteksnya tetap kebawa.': 'Google Studio is having an error, the quota is used up, the model is not compatible, or the API key is broken. You can get an API key from Google AI Studio, use your own API key, or switch the AI provider to Mistral / Groq. Previous messages are still sent, so the context stays included.',
    'Groq sedang error, kuota habis, model tidak cocok, atau API key-nya rusak. Kamu bisa ambil API key dari GroqCloud, pakai API key sendiri, atau ganti pilihan AI ke Mistral / Google Studio. Obrolan sebelumnya tetap ikut dikirim, jadi konteksnya tetap kebawa.': 'Groq is having an error, the quota is used up, the model is not compatible, or the API key is broken. You can get an API key from GroqCloud, use your own API key, or switch the AI provider to Mistral / Google Studio. Previous messages are still sent, so the context stays included.',
    'Mistral sedang error, kuota habis, model tidak cocok, atau API key-nya rusak. Kamu bisa ambil API key dari Mistral Console, pakai API key sendiri, atau ganti pilihan AI ke Groq / Google Studio. Obrolan sebelumnya tetap ikut dikirim, jadi konteksnya tetap kebawa.': 'Mistral is having an error, the quota is used up, the model is not compatible, or the API key is broken. You can get an API key from Mistral Console, use your own API key, or switch the AI provider to Groq / Google Studio. Previous messages are still sent, so the context stays included.',
    'API key custom kosong, terlalu pendek, atau belum kebaca.': 'The custom API key is empty, too short, or not readable yet.',
    'Buka API Key Sendiri, simpan ulang key-nya, lalu pilih provider lagi.': 'Open Own API Key, save the key again, then choose the provider again.',
    'Ambil API key': 'Get API key',
    'Pakai API key sendiri': 'Use own API key',
    'gagal total': 'failed completely',
    'gagal semua key': 'all keys failed',
    'belum punya API key asli': 'does not have a real API key yet',
    'Detail disembunyikan dari chat, cek console kalau mau bedah mayat error.': 'Details are hidden from the chat; check the console if you want to debug the error.',
    'DATZON AI mikir': 'DATZON AI is thinking',
    'Kecerdasan': 'Intelligence',
    'Kencang buat respons cepat.': 'Fast for quick responses.',
    'Ringan buat chat dan teks.': 'Lightweight for chat and text.',
    'Cocok kalau nanti pakai API key Gemini.': 'Good if you later use a Gemini API key.',
    'Cepat, hemat kuota, jawaban pendek.': 'Fast, quota-friendly, short answers.',
    'Seimbang buat obrolan harian.': 'Balanced for daily chats.',
    'Lebih detail, pura-pura paling pintar.': 'More detailed, acts like the smartest one.'
  });
  EN_TO_ID = Object.fromEntries(Object.entries(ID_TO_EN).map(([id,en]) => [en,id]));


  /* V41 account/admin prep, rank reset, and local reset texts. */
  Object.assign(ID_TO_EN, {
    'Admin Panel': 'Admin Panel',
    'Kelola DATZON, pengguna, dan analitik nanti.': 'Manage DATZON, users, and analytics later.',
    'Hapus Rank Immortal aktif': 'Remove active Immortal Rank',
    'Hapus rank hanya kalau kamu ingin reset status Immortal yang tersimpan lokal/Firebase.': 'Remove rank only if you want to reset the Immortal status saved locally/Firebase.',
    'Tidak ada Rank Immortal aktif di akun ini.': 'There is no active Immortal Rank on this account.',
    'Rank Immortal aktif sampai': 'Immortal Rank is active until',
    'Tombol hapus akan reset rank lokal dan Firebase akun ini.': 'The remove button will reset the local and Firebase rank for this account.',
    'Hapus Rank Immortal?': 'Remove Immortal Rank?',
    'Rank Immortal aktif akan dihapus dari localStorage dan profile Firebase akun ini. Aksi ini tidak bisa dibatalkan.': 'The active Immortal Rank will be removed from localStorage and this account’s Firebase profile. This action cannot be undone.',
    'Batal': 'Cancel',
    'Konfirmasi hapus': 'Confirm removal',
    'Rank Immortal sudah dihapus.': 'Immortal Rank has been removed.',
    'Hapus semua data lokal perangkat': 'Delete all local device data',
    'Menghapus localStorage DATZON di perangkat ini: profil lokal, nama lama, rank lokal, chat lokal, file lokal, dan API key lokal.': 'Deletes DATZON localStorage on this device: local profile, old names, local rank, local chats, local files, and local API keys.',
    'Hapus semua data lokal?': 'Delete all local data?',
    'Semua localStorage DATZON di perangkat ini akan dihapus: nama lama, profile lokal, rank lokal, riwayat chat lokal, file lokal, laporan lokal, dan API key lokal. Akun Firebase tidak dihapus.': 'All DATZON localStorage on this device will be deleted: old names, local profile, local rank, local chat history, local files, local reports, and local API keys. The Firebase account will not be deleted.',
    'Data lokal DATZON dihapus. Memuat ulang...': 'DATZON local data deleted. Reloading...',
    'V42 Main App Sync Prep': 'V42 Main App Sync Prep',
    'DATZON AI V42': 'DATZON AI V42'
  });
  EN_TO_ID = Object.fromEntries(Object.entries(ID_TO_EN).map(([id,en]) => [en,id]));

  window.DATZON_I18N = {setLanguage, getLanguage:()=>currentLanguage, t:translateText, apply, dict:ID_TO_EN};
})();
