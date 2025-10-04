const products = [
    {
        id: "AWF-2025-2575",
        category: "livestock",
        type: "promo",
        seller: {
            name: "Ardiwillis Farm",
            link: "https://anekamarket.my.id"
        },
        badge: {
            text: "Promosi",
            type: "promo"
        },
        mainImage: "https://i.imgur.com/pKLE9EY.jpeg",
        title: "Paket Lengkap Ternak Ayam Ardiwilis",
        code: "AWF-2025-2575",
        price: 8000,
        originalPrice: 10000,
        discount: "10%",
        priceVariations: [
            { name: "Ecer (per ekor)", price: 8000 },
            { name: "10 ekor", price: 75000 },
            { name: "100 ekor", price: 700000 }
        ],
        units: ["pcs", "kg", "biji", "ekor"],
        defaultUnit: "ekor",
        details: {
            description: "Ardiwillis Farm menyediakan produk unggulan peternakan ayam berkualitas tinggi. Kami menyediakan telur tetas fertil dengan daya tetas tinggi, DOC (Day Old Chicken) berbagai strain unggul, ayam karkas segar, dan ayam bakar siap saji dengan bumbu khas. Semua produk dihasilkan dari peternakan yang dikelola secara profesional dengan standar kesehatan dan kebersihan tinggi. (Note: Harga tersebut bukan harga tetap, & bisa berubah)",
            images: [
                "https://i.imgur.com/pAygjAZ.jpeg",
                "https://i.imgur.com/XRMPBhw.jpeg",
                "https://i.imgur.com/K5m75Rq.jpeg",
                "https://i.imgur.com/coJadaj.jpeg"
            ],
            specs: [
                { label: "Kode Produk", value: "AWF-2025-2575" },
                { label: "Gerai", value: "Ardiwillis Farm" },
                { label: "Jenis", value: "Ayam Pedaging" },
                { label: "Usia", value: "DOC (1 hari)" },
                { label: "Strain", value: "Cobb 500" },
                { label: "Garansi", value: "Hidup sampai diterima" },
                { label: "Minimal Order", value: "10 ekor" },
                { label: "Catatan", value: "Harga bisa berubah sewaktu-waktu" }
            ]
        },
        contact: {
            whatsapp: "6285258544543",
            phone: "+6285258544543"
        }
    },
    {
        id: "NS-2025-3348",
        category: "food",
        type: "promo",
        seller: {
            name: "Niki Sae",
            link: "#" 
        },
        badge: {
            text: "Promo Spesial",
            type: "promo"
        },
        mainImage: "https://i.imgur.com/y8r14Z3.jpeg",
        title: "Promo Frozen Food Homemade Niki Sae",
        code: "NS-2025-3348",
        price: 12000,
        originalPrice: 15000,
        discount: "20% OFF",
        priceVariations: [
            { name: "Pempek", price: 12000, original: 15000 },
            { name: "Tahu Walik", price: 11000, original: 13750 },
            { name: "Nugget Ikan/Ayam", price: 12000, original: 15000 },
            { name: "Dragon Stick", price: 12000, original: 15000 },
            { name: "Otak-Otak Ikan", price: 12000, original: 15000 }
        ],
        units: ["pcs", "pack", "set", "lusin"],
        defaultUnit: "pcs",
        details: {
            description: "<strong>PROMO SPESIAL!</strong> Niki Sae dari Dapur Yunna menghadirkan promo frozen food homemade dengan kualitas terbaik. Semua produk dibuat dengan bahan pilihan dan teknik khusus untuk menjamin cita rasa autentik. Produk kami termasuk Pempek, Tahu Walik, Otak-Otak Ikan, Nugget Ikan dan Ayam, serta Dragon Stick. Setiap produk dibuat dengan standar kebersihan tinggi dan rasa yang konsisten. Nikmati diskon spesial untuk pembelian selama periode promo!",
            images: [
                "https://i.imgur.com/RP8HTMb.jpeg",
                "https://i.imgur.com/GWXfEGJ.jpeg",
                "https://i.imgur.com/WSB6cXr.jpeg",
                "https://i.imgur.com/ubU63gJ.jpeg" 
            ],
            specs: [
                { label: "Kode Promo", value: "NS-2025-3348" },
                { label: "Nama UMKM", value: "Niki Sae Pempek dan Tahu walik" },
                { label: "Pemilik", value: "Yuliana Mulyaningtyas" },
                { label: "Alamat", value: "Perum Graha Sultan Raya 1 blok G. 61, Panji" },
                { label: "Kontak", value: "085731247566" },
                { label: "Media Sosial", value: "Belum tersedia" },
                { label: "Daftar Promo", value: "• Pempek <s>Rp15.000</s> <strong>Rp12.000</strong> (20% OFF)<br>• Tahu Walik <s>Rp13.750</s> <strong>Rp11.000</strong> (20% OFF)<br>• Nugget Ikan/Ayam <s>Rp15.000</s> <strong>Rp12.000</strong> (20% OFF)<br>• Dragon Stick <s>Rp15.000</s> <strong>Rp12.000</strong> (20% OFF)<br>• Otak-Otak Ikan <s>Rp15.000</s> <strong>Rp12.000</strong> (20% OFF)" },
                { label: "Periode Promo", value: "Periode Promo sewaktu-waktu tidak berlaku" },
                { label: "Catatan", value: "• Harga normal berlaku setelah periode promo berakhir<br>• Minimal pembelian 5 pcs per item<br>• Free ongkir untuk pembelian di atas Rp100.000 (area tertentu)" }
            ]
        },
        contact: {
            whatsapp: "6285731247566",
            phone: "+6285731247566"
        }
    },
    {
        id: "PRD-2025-2688",
        category: "fishery",
        type: "promo",
        seller: {
            name: "PRADIPA",
            link: "https://anekamarket.my.id"
        },
        badge: {
            text: "Promosi",
            type: "promo"
        },
        mainImage: "https://i.imgur.com/ru1FKXW.jpeg",
        title: "Produk Hasil Laut Segar Pradipa",
        code: "PRD-2025-2688",
        price: 30000,
        originalPrice: null,
        discount: null,
        priceVariations: [
            { name: "Ikan Bogek/Mendut", price: 35000 },
            { name: "Ikan Mangla/Swangi", price: 30000 },
            { name: "Ikan Sebelah/Sulfis", price: 35000 }
        ],
        units: ["kg", "ekor", "pack"],
        defaultUnit: "kg",
        details: {
            description: "PRADIPA menghadirkan hasil laut segar langsung dari perairan Panarukan. Kami menyediakan berbagai jenis ikan berkualitas tinggi yang ditangkap dengan metode ramah lingkungan. Setiap produk kami melalui proses seleksi ketat untuk memastikan kesegaran dan kualitas terbaik untuk pelanggan. Dengan pengalaman bertahun-tahun di bidang hasil laut, kami berkomitmen memberikan produk terbaik dengan harga kompetitif.",
            images: [
               "https://i.imgur.com/n2AkesD.jpeg",
                "https://i.imgur.com/tupfVCl.jpeg",
                "https://i.imgur.com/VhfoAsv.png"
            ],
            specs: [
                { label: "Kode Produk", value: "PRD-2025-2688" },
                { label: "Gerai", value: "PRADIPA" },
                { label: "Pemilik", value: "Fajar Nur Cholis" },
                { label: "Alamat", value: "Tanah Anyar RT 3 RW 02 Desa Kilensari, Panarukan" },
                { label: "Kontak", value: "082334393922 | quenie89@gmail.com" },
                { label: "Produk Unggulan", value: "Ikan Bogek/Mendut (Rp35.000/kg), Ikan Mangla/Swangi (Rp30.000/kg), Ikan Sebelah/Sulfis (Rp35.000/kg)" },
                { label: "Catatan", value: "Harga bisa berubah sewaktu-waktu" }
            ]
        },
        contact: {
            whatsapp: "6282334393922",
            phone: "+6282334393922"
        }
    },
    {
        id: "MCU-2025-2830",
        category: "snack",
        type: "promo",
        seller: {
            name: "Mochi UMA",
            link: "https://anekamarket.my.id"
        },
        badge: {
            text: "Promo Spesial",
            type: "promo"
        },
        mainImage: "https://i.imgur.com/TPSWsZw.jpeg",
        title: "Promo Aneka Kue Lezat Mochi Uma",
        code: "MCU-2025-2830",
        price: 10000,
        originalPrice: null,
        discount: null,
        priceVariations: [
            { name: "Pancake Durian", price: 10000 },
            { name: "Mochi (3pcs)", price: 10000 },
            { name: "Cireng Ayam Suwir", price: 10000 },
            { name: "Corndog Coklat (isi 3)", price: 10000 }
        ],
        units: ["pcs", "pack", "set", "lusin"],
        defaultUnit: "pcs",
        details: {
            description: "<strong>PROMO SPESIAL!</strong> Mochi UMA menghadirkan paket promo aneka kue lezat dengan harga spesial. Nikmati berbagai pilihan kue premium dengan diskon menarik untuk waktu terbatas. Setiap produk dibuat dengan bahan pilihan dan teknik khusus untuk menjamin cita rasa autentik. Jangan lewatkan kesempatan ini untuk menikmati kue berkualitas dengan harga terjangkau!",
            images: [
                "https://i.imgur.com/dlK9kfP.jpeg",
                "https://i.imgur.com/JsXOHCO.jpeg",
                "https://i.imgur.com/kJDDUy4.jpeg"
            ],
            specs: [
                { label: "Kode Promo", value: "MCU-2025-2830" },
                { label: "Nama UMKM", value: "Mochi UMA" },
                { label: "Pemilik", value: "ULink" },
                { label: "Alamat", value: "Jl. Wijaya Kusuma Samping Bidan Ika" },
                { label: "Kontak", value: "089679013099 | nurilaneeh@gmail.com" },
                { label: "Media Sosial", value: "TikTok @mochi.uma3" },
                { label: "Daftar Promo", value: "• Pancake Durian hanya Rp10.000<br>• Mochi 3pcs Rp10.000<br>• Cireng Ayam Suwir Rp10.000<br>• Corndog Coklat isi 3 Rp10.000" },
                { label: "Periode Promo", value: "Sampai 31 Agustus 2025" },
                { label: "Catatan", value: "Harga bisa berubah sewaktu-waktu" }
            ]
        },
        contact: {
            whatsapp: "6289679013099",
            phone: "+6289679013099"
        }
    },
    {
        id: "UDJ-2025-3038",
        category: "agriculture",
        type: "all",
        seller: {
            name: "UD Jaya Makmur",
            link: "https://anekamarket.my.id"
        },
        badge: {
            text: "Grosir",
            type: "rental"
        },
        mainImage: "https://i.imgur.com/fjnwYfW.jpeg",
        title: "Garam Krosok Geo Membran Premium",
        code: "UDJ-2025-3038",
        price: 2500,
        originalPrice: null,
        discount: null,
        priceVariations: [
            { name: "Per Kilo", price: 2500 },
            { name: "3.5 Ton (Minimal Order)", price: 8750000 }
        ],
        units: ["kg", "ton"],
        defaultUnit: "kg",
        details: {
            description: "<strong>UD Jaya Makmur</strong> menghadirkan garam krosok geo membran premium berkualitas tinggi dari Panarukan. Garam kami diproduksi dengan metode geo membran yang menghasilkan garam dengan kadar NaCl tinggi (minimal 95%) dan rendah pengotor. Kami menyediakan garam dengan kualitas konsumsi dan industri, dikemas secara higienis dan siap dikirim ke seluruh Indonesia. Minimal pembelian 3.500 kg dengan layanan pengantaran langsung ke lokasi Anda. Garam kami cocok untuk berbagai kebutuhan mulai dari industri, rumah tangga, hingga pengolahan makanan. Anda juga bisa order ke Nomor Whatsapp : 082244014323",
            images: [
                "https://i.imgur.com/WFbAET3.jpeg",
                "https://i.imgur.com/EwIAvxE.jpeg",
                "https://i.imgur.com/5w9ueN7.jpeg"
            ],
            specs: [
                { label: "Kode Produk", value: "UDJ-2025-3038" },
                { label: "Nama UMKM", value: "UD Jaya Makmur" },
                { label: "Pemilik", value: "Zaini" },
                { label: "Alamat", value: "Kp. Sabrang RT 001 RW 001 Desa Wringin Anom, Panarukan" },
                { label: "Kontak", value: "087816295963 | jayamakmurpanarukan@gmail.com" },
                { label: "Jenis Produk", value: "Garam Krosok Geo Membran" },
                { label: "Harga", value: "Rp 2.500/kg (minimal 3.500 kg)" },
                { label: "Pengiriman", value: "Gratis ongkir untuk area tertentu (minimal 3.5 ton)" },
                { label: "Catatan", value: "Harga bisa berubah sewaktu-waktu" }
            ]
        },
        contact: {
            whatsapp: "6287816295963",
            phone: "+6287816295963"
        }
    },
    {
        id: "BNJ-2025-3184",
        category: "food",
        type: "all",
        seller: {
            name: "Bu Nju",
            link: "https://anekamarket.my.id"
        },
        badge: {
            text: "Produk Lokal",
            type: "promo"
        },
        mainImage: "https://i.imgur.com/Ra4CZgd.jpeg",
        title: "Ikan Kering & Terasi Puger Premium",
        code: "BNJ-2025-3184",
        price: 4000,
        originalPrice: null,
        discount: null,
        priceVariations: [
            { name: "Terasi Puger 1kg", price: 80000 },
            { name: "Terasi Puger 1ons", price: 8000 },
            { name: "Terasi Puger ½ons", price: 4000 },
            { name: "Ikan Kering (berbumbu)", price: 70000 },
            { name: "Ikan Kering (polos)", price: 60000 }
        ],
        units: ["pcs", "kg", "ons", "pack"],
        defaultUnit: "pcs",
        details: {
            description: "<strong>Bu Nju</strong> menghadirkan produk ikan kering dan terasi Puger berkualitas premium dari Panarukan. Terasi kami diproduksi secara tradisional dengan kualitas terbaik, memiliki aroma khas dan rasa gurih autentik. Ikan kering kami diproses secara higienis dengan dua varian: siap goreng (sudah berbumbu) dan polos (tanpa bumbu). Semua produk dibuat dengan bahan pilihan dan pengolahan yang menjaga cita rasa asli. Cocok untuk berbagai masakan rumahan hingga usaha kuliner.",
            images: [
                "https://i.imgur.com/CV57qDP.jpeg",
                "https://i.imgur.com/ImPrZJw.jpeg",	
                "https://i.imgur.com/eFnhNYu.jpeg"
            ],
            specs: [
                { label: "Kode Produk", value: "BNJ-2025-3184" },
                { label: "Nama UMKM", value: "Bu Nju" },
                { label: "Pemilik", value: "Riqi" },
                { label: "Alamat", value: "Karangsari, Desa Kilensari, Kecamatan Panarukan" },
                { label: "Kontak", value: "082327600708 | vaiper.blood22@gmail.com" },
                { label: "Daftar Harga", value: "• Terasi Puger 1kg: Rp80.000<br>• Terasi Puger 1ons: Rp8.000<br>• Terasi Puger ½ons: Rp4.000<br>• Ikan kering berbumbu: Rp70.000/kg<br>• Ikan kering polos: Rp60.000/kg" },
                { label: "Media Sosial", value: "TikTok @seesaretadek" },
                { label: "Catatan", value: "Harga bisa berubah sewaktu-waktu" }
            ]
        },
        contact: {
            whatsapp: "6282327600708",
            phone: "+6282327600708"
        }
    },
    {
        id: "LDW-2025-8001",
        category: "software",
        type: "promo",
        seller: {
            name: "Lentera Karya Situbondo",
            link: "https://lks-88.github.io/transaksi/"
        },
        badge: {
            text: "Super Deal",
            type: "promo"
        },
        mainImage: "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/Aplikasi%20Elegan%20%26%20Profesional.png",
        title: "Paket Lengkap Aplikasi Web HTML",
        code: "LDW-2025-8001",
        price: 599000,
        originalPrice: 899000,
        discount: "33% OFF",
        priceVariations: [
            { name: "Paket Komplit (7 Aplikasi)", price: 599000, original: 899000 },
            { name: "Aplikasi Kasir Web", price: 350000, original: 450000 },
            { name: "Sistem Pembukuan Web", price: 400000, original: 550000 }
        ],
        units: ["paket", "lisensi", "unit"],
        defaultUnit: "paket",
        details: {
            description: "<strong>SOLUSI APLIKASI WEB TERBAIK UNTUK BISNIS ANDA!</strong> Paket lengkap aplikasi web HTML kami dirancang khusus untuk bekerja sempurna di semua perangkat tanpa perlu instalasi. Cukup buka browser dan aplikasi siap digunakan! Setiap aplikasi memiliki antarmuka modern yang responsif, beradaptasi otomatis dengan layar desktop, tablet, maupun smartphone. Sistem kami mencakup fitur-fitur canggih seperti penyimpanan data di perangkat pengguna, backup/restore, laporan transaksi, dan cetak struk - semuanya dalam platform web yang ringan dan cepat.",
            images: [
                "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/produk-1b.png",
                "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/produk-1a.png",
                "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/produk-1.png",
                "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/Aplikasi%20Elegan%20%26%20Profesional.png"
            ],
            specs: [
                { label: "Kode Produk", value: "LDW-2025-8001" },
                { label: "Developer", value: "Lentera Karya Situbondo" },
                { label: "Daftar Aplikasi", value: "• Aplikasi Kasir Web - Sistem kasir lengkap dengan cetak struk<br>• Sistem Pembukuan Web - Pencatatan keuangan profesional<br>• Aplikasi Absensi Web - Manajemen kehadiran karyawan<br>• Sistem Manajemen Restoran - Pesanan, meja, dan kitchen display<br>• Website Profesional Instan - Website bisnis siap pakai<br>• Aplikasi Tiket/Karcis - Sistem tiket elektronik<br>• Sistem Penginapan Web - Manajemen kamar dan tamu" },
                { label: "Fitur Unggulan", value: "• Akses dari perangkat apapun dengan browser modern<br>• Tampilan responsif otomatis menyesuaikan layar<br>• Tanpa perlu instalasi - langsung buka file<br>• Penyimpanan data aman di perangkat pengguna<br>• Backup & restore data dengan satu klik<br>• Laporan keuangan lengkap dengan grafik<br>• Multi-user support dengan level akses berbeda<br>• Offline capable (PWA) - bisa digunakan tanpa internet" },
                { label: "Kompatibilitas", value: "• Browser: Chrome, Firefox, Edge, Safari versi terbaru<br>• Sistem Operasi: Windows 10/11, macOS, Linux, Android, iOS<br>• Perangkat: Desktop, Laptop, Tablet, Smartphone<br>• Resolusi: Mendukung dari 320px hingga 4K" },
                { label: "Cara Penggunaan", value: "1. Terima file HTML via email setelah pembelian<br>2. Buka file di browser favorit Anda (Chrome direkomendasikan)<br>3. Aplikasi siap digunakan segera!<br>4. Simpan sebagai PWA (Add to Home Screen) untuk pengalaman seperti aplikasi native<br>5. Untuk backup, cukup simpan file data yang dihasilkan aplikasi" }
            ]
        },
        contact: {
            whatsapp: "6285647709114",
            phone: "+6285647709114"
        }
    },
    {
        id: "LDW-2025-8002",
        category: "software",
        type: "promo",
        seller: {
            name: "Lentera Karya Situbondo",
            link: "https://lks-88.github.io/transaksi/"
        },
        badge: {
            text: "Baru!",
            type: "new"
        },
        mainImage: "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/produk-1.png",
        title: "Aplikasi Kasir Web HTML",
        code: "LDW-2025-8002",
        price: 350000,
        originalPrice: 450000,
        discount: "22% OFF",
        priceVariations: [
            { name: "Lisensi Tunggal", price: 350000, original: 450000 }
        ],
        units: ["lisensi", "pcs", "unit"],
        defaultUnit: "lisensi",
        details: {
            description: "<strong>APLIKASI KASIR MODERN TANPA INSTALASI!</strong> Aplikasi Kasir Web HTML dari Lentera Karya Situbondo adalah solusi sempurna untuk bisnis retail, toko, atau usaha kecil. Cukup buka file HTML di browser dan aplikasi siap digunakan! Dirancang khusus untuk bekerja optimal di semua perangkat - dari desktop PC hingga smartphone. Fitur termasuk manajemen produk, transaksi cepat, cetak struk, laporan penjualan, dan penyimpanan data langsung di perangkat Anda. Tidak perlu server mahal atau koneksi internet terus-menerus!",
            images: [
                "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/produk-2a.png",
                "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/Aplikasi%20Elegan%20%26%20Profesional.png",
                "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/produk-1b.png",
                "https://raw.githubusercontent.com/LKS-88/promo-anekamarket/main/assets/images/produk2.png"
            ],
            specs: [
                { label: "Kode Produk", value: "LDW-2025-8002" },
                { label: "Developer", value: "Lentera Karya Situbondo" },
                { label: "Fitur Inti", value: "• Input transaksi cepat dengan antarmuka modern<br>• Manajemen produk & kategori<br>• Pencarian produk instan dengan autocomplete<br>• Cetak struk pdf dengan header custom<br>• Laporan harian/mingguan/bulanan dengan grafik<br>• Backup & restore data dengan enkripsi<br>• Manajemen diskon dan promo produk<br>• Hitung kembalian & Stok otomatis berkurang saat transaksi" },
                { label: "Keunggulan", value: "• Buka langsung di browser tanpa proses instalasi<br>• Tampilan responsif semua device (desktop, tablet, HP)<br>• Bisa digunakan offline setelah pertama kali dibuka<br>• Penyimpanan data aman di perangkat pengguna<br>• Tidak perlu server/hosting yang mahal<br>• Ringan dan cepat bahkan di spesifikasi rendah<br>• Update mudah dengan mengganti file HTML<br>• Tidak ada biaya bulanan/tahunan" },
                { label: "Cara Implementasi", value: "1. Dapatkan file HTML aplikasi setelah pembelian<br>2. Buka file di browser favorit (Chrome direkomendasikan)<br>3. Mulai gunakan aplikasi kasir langsung<br>4. (Opsional) Simpan sebagai PWA untuk pengalaman seperti app native<br>5. Data otomatis tersimpan aman di perangkat<br>6. Backup rutin dengan menyimpan file data yang dihasilkan" },
                { label: "Bonus Pembelian", value: "• Panduan penggunaan video step-by-step<br>• Template struk profesional yang bisa dicustom<br>• File contoh database produk siap pakai<br>• Support via WhatsApp  gratis<br>• Voucher diskon 15% untuk pembelian produk lain" }
            ]
        },
        contact: {
            whatsapp: "6285647709114",
            phone: "+6285647709114"
        }
    }
];
