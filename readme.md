# 🐾 NakoCing — Dine-In Cafe Ordering Prototype

NakoCing adalah prototipe aplikasi pemesanan menu kafe berbasis web (*dine-in ordering system*) yang dirancang untuk memberikan pengalaman memesan makanan dan minuman yang cepat, intuitif, dan *responsive*.

Aplikasi ini mengusung antarmuka minimalis dan elegan dengan nuansa warna monokrom serta aksen `--accent-blue` (`#c8d1d9`). Fitur yang tersedia meliputi katalog menu interaktif, filter kategori, keranjang belanja dinamis berbasis `localStorage`, sistem checkout, hingga peta lokasi kafe.

## ✨ Fitur Utama

- **Hero Slider Banner** — Tampilan beranda (`index.html`) dengan slider gambar horizontal dan efek *gradient overlay* menggunakan warna aksen `#c8d1d9`.
- **Katalog Menu Interaktif** — Filter menu berdasarkan kategori Kopi, Non Kopi, Makanan, dan Dessert tanpa memuat ulang halaman.
- **Keranjang Belanja Dinamis** — Menambahkan, mengurangi kuantitas, dan menghapus item pesanan secara langsung menggunakan `localStorage`.
- **Sistem Checkout** — Ringkasan pesanan otomatis dengan perhitungan pajak 10%, pilihan pembayaran QRIS atau tunai, serta informasi meja.
- **Halaman Pesanan Saya** — Pelacakan status pesanan, seperti *Diproses*, *Siap Disajikan*, dan *Selesai*, dengan filter interaktif.
- **Peta Lokasi Interaktif** — Menampilkan lokasi kafe pada halaman Kontak menggunakan Leaflet JS dan tile OpenStreetMap tanpa memerlukan API key.
- **Desain Fully Responsive** — Tata letak yang menyesuaikan perangkat desktop, tablet, dan smartphone.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3, dan JavaScript (Vanilla ES6+).
- **Styling:** CSS Custom Properties, Flexbox, CSS Grid, dan Media Queries.
- **Icons:** Phosphor Icons.
- **Mapping:** Leaflet JS dan OpenStreetMap Tiles.
- **State Management:** Browser `localStorage`.

## 📁 Struktur Direktori

```text
Nakocing/
├── assets/                  # Aset gambar, favicon, dan ikon
├── components/              # Komponen HTML dinamis, seperti navbar dan footer
├── css/
│   └── style.css            # Style utama dan responsive layout
├── js/
│   ├── dummy.js             # Data sampel menu dan pesanan
│   └── main.js              # Logika interaksi UI dan sistem keranjang
└── pages/
    ├── index.html           # Halaman Beranda
    ├── menu.html            # Katalog Menu dan Sidebar Keranjang
    ├── detail-menu.html     # Detail Menu dan Catatan Khusus
    ├── checkout.html        # Konfirmasi Pesanan dan Pembayaran
    ├── pesanan-saya.html    # Status dan Riwayat Pesanan
    └── kontak.html          # Informasi Kontak dan Peta Lokasi
```

## 🚀 Cara Menjalankan Project

### 1. Clone Repositori

Jalankan perintah berikut melalui terminal:

```bash
git clone https://github.com/intannz/Nakocing.git
cd Nakocing
```

Ganti `username-kamu` dengan username GitHub dan sesuaikan URL repositori dengan repositori milikmu.

### 2. Jalankan Aplikasi

Pilih salah satu cara berikut:

- **Menggunakan browser:** Buka file `pages/index.html` melalui browser.
- **Menggunakan VS Code:** Buka folder proyek di Visual Studio Code, lalu jalankan menggunakan ekstensi **Live Server** untuk pengalaman pengembangan yang lebih nyaman.

---

**NakoCing** — A simple and intuitive café ordering experience. ☕🐾