import { EnergyTech, TimelineEvent, EnergyMixItem, CommunityProject, QuizQuestion } from '../types';

export const ENERGY_TECHNOLOGIES: EnergyTech[] = [
  {
    id: 'perovskite-solar',
    title: 'Sel Surya Perovskit-Silikon Tandem',
    subtitle: 'Next-Gen Photovoltaic Cells',
    category: 'surya',
    categoryLabel: 'Fotovoltaik Cerdas',
    image: '/src/assets/images/perovskite_solar_tandem_1792632426063.jpg',
    efficiencyText: 'Hingga 33.9% Rekor Lab',
    efficiencyPercent: 33.9,
    highlightStat: '1.5x Lebih Efisien',
    statLabel: 'dibanding panel silikon konvensional (20-22%)',
    summary: 'Menggabungkan lapisan silikon klasik dengan kristal perovskit buatan lab untuk menyerap spektrum cahaya inframerah dan biru sekaligus.',
    concept: 'Sel tandem menumpuk dua semikonduktor berbeda: perovskit di lapisan atas menyerap spektrum cahaya berenergi tinggi (sinar biru dan UV), sementara silikon di lapisan bawah menangkap spektrum energi rendah (inframerah dekat).',
    advantages: [
      'Rekor efisiensi konversi listrik menembus 33.9% (silikon murni mentok di ~29% Shockley-Queisser limit)',
      'Dapat difabrikasi dalam lapisan sangat tipis dan fleksibel seperti stiker',
      'Memungkinkan jendela kaca gedung perkantoran dan kanopi mobil listrik menjadi pembangkit mandiri',
      'Biaya sintesis material dasar relatif murah menggunakan larutan kimia sederhana'
    ],
    scientificMechanism: 'Struktur kristal perovskit memiliki rumus kimia ABX3 yang fleksibel mengatur bandgap energi (1.5 - 1.8 eV). Foton berenergi tinggi diserap oleh perovskit tanpa membuang kelebihan energi sebagai panas.',
    analogy: 'Ibarat jaring ikan ganda: jaring atas bermata rapat menangkap ikan kecil (foton biru berenergi tinggi), sedangkan jaring bawah bermata longgar menangkap ikan besar (foton inframerah), sehingga tidak ada tangkapan yang lolos.',
    realWorldApplications: [
      'Panel atap perumahan generasi baru',
      'Kaca jendela pembangkit daya gedung pencakar langit (BIPV)',
      'Atap kendaraan listrik untuk menambah jarak tempuh 20-30 km per hari',
      'Perangkat sensor IoT satelit dan luar angkasa'
    ],
    simulatorType: 'solar'
  },
  {
    id: 'floating-offshore-wind',
    title: 'Turbin Angin Terapung Lepas Pantai',
    subtitle: 'Floating Offshore Wind & Deep Sea Aero',
    category: 'angin',
    categoryLabel: 'Energi Samudra',
    image: '/src/assets/images/floating_wind_ocean_1792632426656.jpg',
    efficiencyText: 'Capacity Factor > 55%',
    efficiencyPercent: 55,
    highlightStat: '24 Jam Angin Stabil',
    statLabel: 'kecepatan angin laut lepas 30-40% lebih kencang dari daratan',
    summary: 'Pembangkit raksasa yang dipasang di atas anjungan apung tertambat di laut dalam (>60 meter), menangkap angin samudra kencang tanpa mengganggu pantai.',
    concept: 'Alih-alih menancapkan tiang beton ke dasar karang laut dangkal, turbin terapung menggunakan struktur pelampung seperti spar-buoy atau tension-leg platform yang diikat dengan kabel baja bertegangan tinggi ke dasar laut dalam.',
    advantages: [
      'Membuka akses ke 80% potensi angin laut dunia yang berada di kedalaman lebih dari 60 meter',
      'Kecepatan angin lepas pantai jauh lebih kencang, konsisten, dan minim turbulensi kontur tanah',
      'Jauh dari pandangan mata pesisir sehingga tidak menimbulkan polusi visual di zona wisata',
      'Dapat dirakit utuh di pelabuhan lalu ditarik ke laut lepas tanpa kapal derek pancang super-mahal'
    ],
    scientificMechanism: 'Daya angin berbanding pangkat tiga dengan kecepatan angin (P = 0.5 * rho * A * v^3). Kenaikan kecepatan angin sebesar 20% di samudra terbuka menghasilkan peningkatan produksi daya listrik lebih dari 72%.',
    analogy: 'Seperti pelampung pancing raksasa dengan pemberat di bawahnya yang tetap tegak stabil bahkan ketika diterjang ombak samudra setinggi 10 meter.',
    realWorldApplications: [
      'Penyedia listrik pulau-pulau terluar dan terpencil',
      'Pusat pasokan listrik lepas pantai untuk produksi Hidrogen Hijau langsung di laut',
      'Dekarbonisasi anjungan industri maritim dan elektrifikasi transportasi laut',
      'Jaringan interkoneksi kabel bawah laut antar-wilayah kepulauan'
    ],
    simulatorType: 'wind'
  },
  {
    id: 'green-hydrogen',
    title: 'Hidrogen Hijau & Power-to-X',
    subtitle: 'Green Hydrogen & Clean Molecular Carriers',
    category: 'hidrogen',
    categoryLabel: 'Molekul Hijau',
    image: '/src/assets/images/green_hydrogen_electrolysis_1792632426987.jpg',
    efficiencyText: 'Nol Emisi Karbon (H2O Murni)',
    efficiencyPercent: 78,
    highlightStat: '120 MJ/kg Energi',
    statLabel: 'densitas energi tertinggi per satuan massa dibanding bahan bakar apa pun',
    summary: 'Memecah molekul air (H2O) dengan listrik dari turbin angin atau panel surya untuk menghasilkan bahan bakar murni bagi industri berat dan pesawat.',
    concept: 'Melalui elektrolisis membran penukar proton (PEM) atau elektroliser oksida padat (SOEC), air murni dipisahkan menjadi gas hidrogen (H2) dan gas oksigen (O2) tanpa satu molekul karbon pun dilepaskan ke atmosfer.',
    advantages: [
      'Menjadi satu-satunya solusi dekarbonisasi untuk industri sulit-elektrifikasi (pabrik semen, baja, dan pupuk)',
      'Bahan bakar pengganti kerosin aviasi dan solar kapal kargo maritim jarak jauh',
      'Dapat disimpan dalam tangki bertekanan atau diubah menjadi amonia hijau untuk ekspor energi antar benua',
      'Emisi pembakaran di mesin fuel cell hanya menghasilkan uap air minum murni'
    ],
    scientificMechanism: 'Reaksi elektrolisis: 2H2O(l) + Energi Listrik EBT -> 2H2(g) + O2(g). Sel bahan bakar kemudian membalik reaksi ini untuk menghasilkan listrik kembali saat grid membutuhkan pasokan darurat.',
    analogy: 'Baterai molekuler alam: kita "mengemas" kelebihan sinar matahari dan angin laut ke dalam molekul gas paling ringan di alam semesta, siap dibakar atau dialirkan kapan saja.',
    realWorldApplications: [
      'Industri peleburan baja hijau (Green Steel DRI)',
      'Kapal kargo laut samudra berbasis amonia/hidrogen',
      'Penyimpanan energi jangka panjang lintas musim (seasonal energy storage)',
      'Pembangkit listrik peaker saat beban puncak kota'
    ],
    simulatorType: 'hydrogen'
  },
  {
    id: 'solid-state-sodium-battery',
    title: 'Baterai Solid-State & Sodium-Ion',
    subtitle: 'The Next Storage Chemistry Revolution',
    category: 'baterai',
    categoryLabel: 'Penyimpanan Energi',
    image: '/src/assets/images/perovskite_solar_tandem_1792632426063.jpg',
    efficiencyText: '95% Efisiensi Bolak-Balik (RTE)',
    efficiencyPercent: 95,
    highlightStat: '10 Menit 80% Cas',
    statLabel: 'bebas risiko terbakar & tidak bergantung pada tambang kobalt langka',
    summary: 'Menggantikan cairan elektrolit mudah terbakar dengan keramik padat atau memanfaatkan ion garam dapur (sodium) yang melimpah ruah.',
    concept: 'Teknologi baterai masa depan bercabang dua: Baterai Solid-State menggunakan elektrolit padat yang memungkinkan anoda litium-logam murni untuk kepadatan energi gila-gilaan, sedangkan Sodium-Ion memanfaatkan natrium yang 1000x lebih murah dan ramah lingkungan.',
    advantages: [
      'Menghilangkan risiko kebakaran/ledakan termal (thermal runaway) secara total',
      'Dapat bekerja di suhu ekstrem minus -20°C hingga +60°C tanpa penurunan drastis',
      'Sodium-Ion memanfaatkan garam meja biasa, melepaskan ketergantungan dari rantai pasok nikel/kobalt',
      'Masa pakai siklus mencapai 4.000–10.000 siklus (hingga 15–20 tahun pemakaian harian)'
    ],
    scientificMechanism: 'Elektrolit padat berbasis sulfida atau keramik oksida menghentikan pertumbuhan dendrit (kristal jarum mikroskopis perusak separator baterai konvensional), mengizinkan arus pengisian kilat tanpa hubung singkat.',
    analogy: 'Jika baterai biasa adalah jalan raya becek yang rawan longsor (cairan elektrolit mudah panas), baterai solid-state adalah jalan tol beton super-kokoh tempat arus ion bergerak bebas tanpa macet.',
    realWorldApplications: [
      'Penyimpan daya skala jaringan kota (Grid-Scale Battery BESS)',
      'Mobil listrik dengan jarak tempuh 1.000 km sekali cas',
      'Penyimpan listrik rumahan untuk malam hari dari panel surya atap',
      'Pesawat terbang listrik komersial ringan (eVTOL)'
    ],
    simulatorType: 'battery'
  },
  {
    id: 'ai-smart-grid',
    title: 'Jaringan Cerdas Berbasis AI & Virtual Power Plants',
    subtitle: 'Autonomous Energy Grid Orchestration',
    category: 'grid',
    categoryLabel: 'Digitalisasi & AI',
    image: '/src/assets/images/smart_grid_ecocity_1792632427848.jpg',
    efficiencyText: 'Reduksi 99.8% Pemadaman',
    efficiencyPercent: 99.8,
    highlightStat: '< 50ms Penyeimbangan',
    statLabel: 'kecerdasan buatan memprediksi cuaca & fluktuasi beban milidetik',
    summary: 'Sistem kelistrikan digital yang menggunakan kecerdasan buatan untuk meramalkan awan mendung, angin laut, dan mengatur ribuan prosumer.',
    concept: 'Virtual Power Plant (VPP) mengagregasi ribuan baterai rumah tangga, mobil listrik yang terparkir, dan panel surya menjadi satu kesatuan pembangkit maya berdaya gigawatt yang dikontrol algoritma AI terdistribusi.',
    advantages: [
      'Mencegah pemadaman total (blackout) akibat fluktuasi energi matahari yang terhalang awan mendung mendadak',
      'Pemilik rumah berpanel surya dapat menjual surplus listrik secara otomatis saat harga pasar listrik sedang tinggi (P2P Trading)',
      'Mengurangi kebutuhan membangun pembangkit cadangan batu bara fosil bernilai triliunan rupiah',
      'Optimasi otomatis aliran daya transmisi listrik bertegangan tinggi untuk memangkas rugi-rugi jaringan (line losses)'
    ],
    scientificMechanism: 'Menggunakan model prediksi cuaca mikro (Micro-weather Neural Forecasting) dan optimasi linear stokastik untuk menyeimbangkan frekuensi grid pada 50 Hz secara konstan.',
    analogy: 'Seperti aplikasi navigasi lalu lintas canggih: ketika satu jalan utama macet (matahari tertutup awan), sistem langsung mengalihkan rute kendaraan secara instan lewat ribuan jalan alternatif (baterai warga dan turbin angin).',
    realWorldApplications: [
      'Smart City & Ibu Kota Nusantara (IKN) green grid',
      'Virtual Power Plant agregasi baterai perumahan nasional',
      'Vehicle-to-Grid (V2G) pengisian daya mobil dua arah',
      'Bursa perdagangan sertifikat energi terbarukan (REC) otomatis'
    ],
    simulatorType: 'smartgrid'
  }
];

export const TIMELINE_BREAKTHROUGHS: TimelineEvent[] = [
  {
    year: '2024',
    quarter: 'Q4',
    title: 'Rekor Efisiensi Sel Tandem Perovskit 34.6%',
    category: 'Fotovoltaik',
    description: 'Laboratorium riset internasional berhasil menstabilkan sel perovskit tandem silikon melewati batas teoretis silikon konvensional selama 1.000 jam uji beban penuh.',
    impact: 'Membuka jalan industrialisasi sel surya generasi baru dengan target biaya produksi setara silikon standar.'
  },
  {
    year: '2025',
    quarter: 'Q2',
    title: 'Gigawatt Floating Wind Park Pertama Mulai Beroperasi',
    category: 'Angin Lepas Pantai',
    description: 'Turbin angin terapung kapasitas 15 MW per unit mulai ditambatkan di perairan berkedalaman 120 meter di lepas pantai Skotlandia dan Asia Timur.',
    impact: 'Menghasilkan listrik stabil 24 jam untuk 1.2 juta rumah tangga tanpa memakan daratan.'
  },
  {
    year: '2026',
    quarter: 'Q3',
    title: 'Komersialisasi Baterai Sodium-Ion Tanpa Litium',
    category: 'Penyimpanan Energi',
    description: 'Pabrik baterai sodium-ion skala gigawatt pertama memasok paket baterai penyimpan listrik rumah tangga dan mobil komuter kota dengan biaya 40% lebih terjangkau.',
    impact: 'Mematahkan monopoli litium dan kobalt dunia serta menjamin ketersediaan material dari garam bumi.'
  },
  {
    year: '2027',
    quarter: 'Q1',
    title: 'Koridor Ekspor Hidrogen Hijau Lintas Samudra',
    category: 'Hidrogen',
    description: 'Kapal tanker pertama yang membawa amonia hijau hasil konversi hidrogen dari ladang angin laut berlayar dengan emisi operasional bersih 0%.',
    impact: 'Menghubungkan pusat produsen EBT tropis dengan kawasan industri berat global.'
  },
  {
    year: '2028',
    quarter: 'Q4',
    title: 'Virtual Power Plant AI Mengatur 10 Juta Unit Rumah',
    category: 'Smart Grid',
    description: 'Sistem kelistrikan berbasis agen AI otonom menyeimbangkan 45% pasokan energi terbarukan intermiten tanpa memerlukan satu pun pembangkit batu bara peaker.',
    impact: 'Biaya listrik konsumen turun 22% berkat monetisasi surplus daya otomatis antar warga.'
  },
  {
    year: '2030',
    quarter: 'Target',
    title: 'Target Indonesia & Global: Penurunan 32% Emisi Karbon',
    category: 'Net Zero Road',
    description: 'Pencapaian target Enhanced NDC Indonesia dan komitmen global menghentikan pembangunan PLTU batu bara baru, dialihkan penuh ke surya, angin, geotermal, dan hidro.',
    impact: 'Mencegah pemanasan suhu bumi melewati ambang batas kritis 1.5°C.'
  }
];

export const ENERGY_MIX_DATA: EnergyMixItem[] = [
  {
    name: 'Matahari & Surya (Solar PV)',
    indonesiaCurrent: 0.6,
    indonesiaTarget2030: 9.8,
    globalAverage: 6.2,
    color: '#F59E0B'
  },
  {
    name: 'Angin & Bayu (Wind Power)',
    indonesiaCurrent: 0.3,
    indonesiaTarget2030: 4.5,
    globalAverage: 8.4,
    color: '#06B6D4'
  },
  {
    name: 'Panas Bumi (Geothermal)',
    indonesiaCurrent: 5.2,
    indonesiaTarget2030: 8.5,
    globalAverage: 0.8,
    color: '#EF4444'
  },
  {
    name: 'Tenaga Air (Hydro Power)',
    indonesiaCurrent: 7.1,
    indonesiaTarget2030: 10.4,
    globalAverage: 15.2,
    color: '#3B82F6'
  },
  {
    name: 'Bioenergi & Biomassa',
    indonesiaCurrent: 1.8,
    indonesiaTarget2030: 5.8,
    globalAverage: 2.5,
    color: '#10B981'
  },
  {
    name: 'Fosil (Batu Bara, Gas, Minyak)',
    indonesiaCurrent: 85.0,
    indonesiaTarget2030: 61.0,
    globalAverage: 66.9,
    color: '#64748B'
  }
];

export const INITIAL_COMMUNITY_PROJECTS: CommunityProject[] = [
  {
    id: 'proj-1',
    title: 'Lampu Penerangan Taman Otomatis Sel Surya Bekas & Sensor LDR',
    author: 'Faris Bachtiar',
    authorRole: 'Mahasiswa Teknik Fisika & DIY Maker',
    avatarText: 'FB',
    date: '18 Okt 2026',
    category: 'Surya Mandiri',
    difficulty: 'Pemula',
    budgetEstimate: 'Rp 65.000 - Rp 95.000',
    description: 'Memanfaatkan panel surya 5V bekas mainan atau lampu rusak yang dipadukan dengan modul charging TP4056, transistor BD139, dan sel baterai 18650 untuk menerangi halaman rumah otomatis saat malam tiba.',
    materials: [
      'Panel surya mini 5V 1W (bisa cabutan lampu taman bekas)',
      'Modul proteksi charger TP4056 + micro USB',
      'Baterai litium 18650 2000mAh (bekas baterai laptop)',
      'Resistor 10k Ohm & 1k Ohm, LDR (sensor cahaya), Transistor 2N2222/BD139',
      'LED warm white 1 Watt & wadah toples selai kaca kedap air'
    ],
    stepsSummary: '1. Hubungkan panel surya ke input TP4056 dengan dioda penyearah. 2. Sambungkan output baterai ke rangkaian saklar LDR. 3. Ketika gelap, LDR memicu transistor mengalirkan arus baterai ke LED. 4. Masukkan ke toples kaca dan segel dengan lem silikon tahan hujan.',
    upvotes: 42,
    comments: [
      {
        id: 'c1',
        author: 'Arif Nugroho',
        date: '19 Okt 2026',
        comment: 'Sudah saya coba pasang di pagar depan rumah, tahan menyala dari jam 6 sore sampai jam 4 pagi! Toples kaca bekas selai sangat cocok biar anti air.'
      },
      {
        id: 'c2',
        author: 'Dina Lestari',
        date: '20 Okt 2026',
        comment: 'Kalau baterai diganti yang tipe LiFePO4 apakah TP4056 masih aman mas? Keren banget idenya!'
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'Sistem Telemetri Monitoring Baterai Surya ESP32 & Web Dashboard',
    author: 'Siti Rahma',
    authorRole: 'IoT Developer & Pegiat EBT Kampus',
    avatarText: 'SR',
    date: '12 Okt 2026',
    category: 'Smart Grid IoT',
    difficulty: 'Menengah',
    budgetEstimate: 'Rp 140.000 - Rp 210.000',
    description: 'Alat ukur cerdas real-time untuk memantau voltase, arus (Ampere), dan watt yang dihasilkan panel surya atap, dikirim via Wi-Fi ke dashboard ponsel dengan visual grafik konsumsi daya harian.',
    materials: [
      'Mikrokontroler ESP32 NodeMCU (support Wi-Fi & Bluetooth)',
      'Sensor Arus & Tegangan Presisi INA219 (I2C interface)',
      'Layar OLED 0.96 inch SSD1306 untuk indikator fisik',
      'Kabel jumper & box enclosure plastik anti percikan',
      'Aplikasi Blynk / Server MQTT gratis'
    ],
    stepsSummary: '1. Pasang sensor INA219 secara seri pada jalur positif antara panel dan solar charge controller. 2. Baca register tegangan bus dan shunt lewat ESP32. 3. Kirim data interval 5 detik ke cloud dan tampilkan grafik energi harian (Watt-Hour).',
    upvotes: 68,
    comments: [
      {
        id: 'c3',
        author: 'Budi Santoso',
        date: '14 Okt 2026',
        comment: 'Sangat membantu untuk mendeteksi kapan panel kotor tertutup debu! Penurunan output langsung terbaca di grafik.'
      }
    ]
  },
  {
    id: 'proj-3',
    title: 'Miniatur Turbin Angin Vertikal Savonius Cetak 3D untuk Charger HP',
    author: 'Kevin Ardianto',
    authorRole: 'Product Designer & Hobiis 3D Print',
    avatarText: 'KA',
    date: '04 Okt 2026',
    category: 'Energi Angin',
    difficulty: 'Menengah',
    budgetEstimate: 'Rp 120.000 - Rp 180.000',
    description: 'Desain turbin angin sumbu vertikal (VAWT) tipe rotor Savonius yang tetap berputar efisien meskipun arah angin di balkon apartemen sering berubah-ubah secara liar.',
    materials: [
      'Filamen PETG untuk cetak sudu turbin 3D tahan panas matahari',
      'Motor stepper NEMA 17 bekas printer 3D (digunakan sebagai generator daya AC)',
      'Rangkaian Dioda Bridge Penyearah 3 fasa & modul step-down LM2596 5V USB',
      'Bearing skateboard 608ZZ (2 pcs) untuk poros putaran licin',
      'Tiang pipa PVC 1/2 inch dengan klem dudukan railing'
    ],
    stepsSummary: '1. Cetak sudu savonius melengkung S-curve. 2. Pasang motor stepper sebagai alternator di bagian dasar poros. 3. Arus AC diratakan dengan dioda penyearah lalu distabilkan ke tegangan standar USB 5V 1A.',
    upvotes: 55,
    comments: [
      {
        id: 'c4',
        author: 'Rahmat Hidayat',
        date: '08 Okt 2026',
        comment: 'Apakah file STL-nya dibagikan gratis mas? Ingin coba rakit di atap kost yang dekat pantai berangin kencang!'
      }
    ]
  },
  {
    id: 'proj-4',
    title: 'Digester Biogas Portabel Skala Dapur dari Sampah Organik Rumah',
    author: 'Dr. Hendra Kusuma',
    authorRole: 'Peneliti Bioteknologi Lingkungan',
    avatarText: 'HK',
    date: '28 Sep 2026',
    category: 'Bioenergi',
    difficulty: 'Lanjutan',
    budgetEstimate: 'Rp 250.000 - Rp 350.000',
    description: 'Mengubah sisa nasi, sayuran busuk, dan kulit buah dapur menjadi gas metana bersih untuk menyalakan kompor gas kecil selama 30-45 menit setiap hari tanpa bau menyengat.',
    materials: [
      'Tong drum plastik 60 liter dengan tutup kedap udara clamp',
      'Kantung ban dalam truk bekas atau kantung gas balon PVC (penampung gas)',
      'Pipa PVC 1 inch untuk saluran input sampah organik & overflow pupuk cair',
      'Kran bola (ball valve), selang gas fleksibel, dan water trap untuk saringan H2S',
      'Starter bakteri metanogen (dari cairan rumen sapi atau kompos basah)'
    ],
    stepsSummary: '1. Modifikasi drum dengan lubang input bahan organik dan overflow air pupuk. 2. Pasang water trap sederhana untuk menyaring uap air dan bau gas. 3. Masukkan 1 kg sisa makanan dicampur air per hari. Setelah 10 hari fermentasi, gas metana mulai siap dipakai memasak.',
    upvotes: 89,
    comments: [
      {
        id: 'c5',
        author: 'Maya Anggraini',
        date: '01 Okt 2026',
        comment: 'Luar biasa! Selain dapat gas gratis untuk sarapan pagi, air limbah buangannya bisa dipakai menyiram tanaman cabai jadi subur sekali.'
      }
    ]
  }
];

export const CARBON_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apa keunggulan utama teknologi kristal Perovskit pada sel surya tandem dibandingkan sel silikon biasa?',
    options: [
      'Menyerap dua spektrum cahaya berbeda (biru & inframerah) sehingga menembus rekor efisiensi di atas 30%',
      'Hanya bisa bekerja di malam hari dengan memanfaatkan sinar bulan',
      'Terbuat dari logam merkuri padat yang tahan terhadap suhu kutub',
      'Membuat panel surya menghasilkan bensin tanpa proses tambahan'
    ],
    correctIndex: 0,
    explanation: 'Sel surya tandem menduetkan kristal perovskit (penyerap foton berenergi tinggi spektrum biru/UV) di atas silikon tradisional (penyerap foton berenergi rendah spektrum inframerah), sehingga tidak ada energi cahaya yang terbuang sia-sia sebagai panas.',
    funFact: 'Nama kristal "Perovskite" dinamai dari ahli mineralogi Rusia L. A. Perovski yang menemukannya pertama kali di Pegunungan Ural pada tahun 1839.'
  },
  {
    id: 2,
    question: 'Mengapa turbin angin terapung laut lepas (Floating Offshore Wind) dibangun di kedalaman samudra (>60 meter)?',
    options: [
      'Supaya turbin terhindar dari sambaran petir di awan rendah',
      'Karena angin di laut dalam berhembus 30-40% lebih kencang, stabil, dan membuka 80% potensi angin samudra dunia',
      'Agar ikan hiu bisa beristirahat di bawah jangkar tiang turbin',
      'Supaya suaranya tidak terdengar oleh kapal selam yang lewat'
    ],
    correctIndex: 1,
    explanation: 'Dasar laut dangkal hanya mencakup porsi kecil lautan bumi. Turbin terapung memungkinkan manusia memanfaatkan hembusan angin samudra dalam yang kencang tanpa hambatan kontur daratan dan tanpa merusak pemandangan pantai pariwisata.',
    funFact: 'Satu putaran bilah turbin angin lepas pantai modern 15 MW dapat menyuplai kebutuhan listrik satu rumah tangga Indonesia selama 2 hingga 3 hari!'
  },
  {
    id: 3,
    question: 'Apa satu-satunya produk sampingan (emisi knalpot) dari penggunaan Hidrogen Hijau di sel bahan bakar (fuel cell)?',
    options: [
      'Gas karbon monoksida beracun',
      'Asap partikulat mikro jelaga hitam',
      'Uap air murni (H2O)',
      'Gas belerang sulfur dioksida'
    ],
    correctIndex: 2,
    explanation: 'Ketika gas hidrogen (H2) bertemu oksigen (O2) di dalam fuel cell untuk menghasilkan listrik, satu-satunya produk reaksi kimia adalah H2O (air murni). Bahkan astronot di stasiun luar angkasa NASA meminum air hasil sampingan fuel cell!',
    funFact: 'Hidrogen adalah elemen paling melimpah di alam semesta, mencakup sekitar 75% dari seluruh materi baryonik di jagat raya.'
  },
  {
    id: 4,
    question: 'Apa perbedaan mendasar antara baterai Solid-State dengan baterai Li-Ion yang ada di smartphone saat ini?',
    options: [
      'Baterai solid-state menggunakan cairan minyak kelapa sawit sebagai pendingin',
      'Baterai solid-state menggantikan cairan elektrolit mudah terbakar dengan material padat (keramik/polimer) yang aman dari risiko ledakan',
      'Baterai solid-state harus dijemur di bawah terik matahari sebelum bisa dipakai',
      'Baterai solid-state hanya bisa diisi daya sekali seumur hidup'
    ],
    correctIndex: 1,
    explanation: 'Pada baterai konvensional, elektrolit cair mudah terbakar saat terjadi korsleting atau panas berlebih. Baterai solid-state menggunakan elektrolit padat yang tahan suhu tinggi, mencegah kebakaran, dan memungkinkan pengisian daya kilat dalam hitungan menit.',
    funFact: 'Baterai sodium-ion memanfaatkan natrium (unsur garam dapur) yang ketersediaannya di kerak bumi 1.000 kali lebih melimpah dibanding litium.'
  },
  {
    id: 5,
    question: 'Bagaimana peran Kecerdasan Buatan (AI) dalam sistem Smart Grid & Virtual Power Plant?',
    options: [
      'Mematikan listrik seluruh kota secara acak setiap jam 12 siang',
      'Meramal cuaca mendung secara presisi milidetik dan mengorkestrasi ribuan baterai rumah warga untuk menyeimbangkan pasokan listrik',
      'Menghapus tagihan listrik pelanggan yang menggunakan laptop berpendingin air',
      'Menggantikan trafo kabel listrik dengan gelombang radio suara manusia'
    ],
    correctIndex: 1,
    explanation: 'Energi angin dan surya bersifat intermiten (bergantung cuaca). AI memprediksi tutupan awan beberapa menit ke depan dan secara otomatis memerintahkan baterai dan pembangkit cadangan menyuntikkan daya tepat waktu sebelum grid oleng.',
    funFact: 'Frekuensi listrik PLN di Indonesia harus dijaga stabil di kisaran 50 Hz. Deviasi sekecil 0.5 Hz saja bisa menyebabkan pemadaman kaskade berskala provinsi jika tidak diimbangi otomatis.'
  },
  {
    id: 6,
    question: 'Berapa target bauran Energi Baru Terbarukan (EBT) nasional Indonesia dalam Rencana Umum Energi Nasional (RUEN)?',
    options: [
      '5% di tahun 2035',
      '23% di rentang 2025/2030 dan Net Zero Emission penuh di tahun 2060',
      '100% di akhir tahun depan tanpa persiapan',
      '0% karena Indonesia tidak memiliki potensi sinar matahari'
    ],
    correctIndex: 1,
    explanation: 'Indonesia menargetkan porsi EBT dalam bauran energi nasional mencapai 23% menuju 2030, dan berkomitmen penuh mencapai emisi nol bersih (Net Zero Emissions) paling lambat tahun 2060 atau lebih cepat.',
    funFact: 'Indonesia memiliki potensi energi surya hingga lebih dari 3.000 Gigawatt karena letaknya tepat di garis khatulistiwa dengan sinar matahari sepanjang tahun!'
  },
  {
    id: 7,
    question: 'Apa yang dimaksud dengan konsep "Power-to-X" dalam ekosistem energi bersih?',
    options: [
      'Mengubah listrik dari sumber terbarukan yang melimpah menjadi bahan bakar kimia sintesis (hidrogen, amonia hijau, atau metanol)',
      'Game konsol yang menggunakan tenaga dorong magnetik roket',
      'Metode menaikkan tegangan charger ponsel hingga 10.000 Volt',
      'Menghubungkan stopkontak dinding ke tiang antena radio AM'
    ],
    correctIndex: 0,
    explanation: 'Power-to-X adalah payung istilah di mana "Power" (listrik bersih EBT) diubah menjadi "X" (molekul seperti Hidrogen, Gas sintetis, Amonia, atau bahan kimia cair) agar dapat disimpan berbulan-bulan dan dikirim melintasi benua.',
    funFact: 'Kapal kargo laut yang mengangkut peti kemas antar benua kini mulai memesan mesin bertenaga Green Ammonia sebagai bagian transisi Power-to-X.'
  },
  {
    id: 8,
    question: 'Jika sebuah rumah tangga memasang panel surya atap kapasitas 2 kWp, berapa rata-rata energi listrik yang bisa dipanen per hari di iklim tropis Indonesia?',
    options: [
      'Hanya 0.1 kWh (hanya cukup untuk lampu senter)',
      'Sekitar 7 sampai 9 kWh per hari (cukup untuk kulkas, lampu, kipas, dan TV seharian)',
      '500 kWh per hari (bisa menyalakan satu pabrik baja)',
      '0 kWh jika tidak ada angin puting beliung'
    ],
    correctIndex: 1,
    explanation: 'Di Indonesia, rata-rata jam puncak matahari efektif (Peak Sun Hours / PSH) adalah sekitar 3.5 hingga 4.5 jam per hari. Panel 2 kWp x 4 jam = ~8 kWh energi listrik bersih yang diproduksi setiap hari tanpa emisi!',
    funFact: 'Menghasilkan 8 kWh listrik surya menghemat pembakaran sekitar 3.5 kg batu bara di PLTU setiap harinya!'
  }
];

export const UPCOMING_EVENTS = [
  {
    title: 'Nusantara Clean Energy Summit 2026',
    date: '14 - 15 November 2026',
    location: 'Hybrid (Jakarta Convention Center & Live Stream)',
    tag: 'Konferensi Internasional',
    description: 'Pertemuan pembuat kebijakan, peneliti EBT, dan startup iklim membahas percepatan dekarbonisasi industri di kawasan Asia Tenggara.'
  },
  {
    title: 'Webinar Nasional: Membedah Potensi Baterai Sodium & Sel Surya Tandem',
    date: '28 November 2026, 19:00 WIB',
    location: 'Zoom & YouTube DeLiangTerra Live',
    tag: 'Webinar Edukasi Gratis',
    description: 'Sesi kupas tuntas bersama pakar nanoteknologi ITB dan diaspora peneliti sel surya tentang kapan teknologi ini masuk ke rumah tangga kita.'
  },
  {
    title: 'Hackathon Solusi Smart Grid & IoT Hemat Energi',
    date: '05 - 07 Desember 2026',
    location: 'Online Workshop & Mentorship',
    tag: 'Kompetisi Inovasi Pelajar',
    description: 'Kompetisi membuat aplikasi web, algoritma AI, atau prototipe hardware mikrokontroler untuk menghemat energi listrik di lingkungan sekolah dan kampus.'
  }
];
