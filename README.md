# Mini Gallery

## Deskripsi Proyek
Mini Gallery adalah website bertema hiburan yang memungkinkan pengguna menyimpan dan menikmati kembali memori berharga mereka dalam bentuk foto dan video singkat, layaknya galeri pribadi yang bisa diakses kapan saja.

## Alasan Pengembangan
Aplikasi ini dikembangkan untuk membantu pengguna mengabadikan dan menyimpan momen-momen berharga dalam hidup mereka, sehingga kenangan tersebut tetap terjaga dan mudah diakses kembali kapan pun dibutuhkan.

## Alasan Memilih Bootstrap
Bootstrap dipilih karena Mini Gallery banyak memakai komponen UI standar (navbar, card, tabel, form) yang sudah tersedia siap pakai. Sistem grid 12 kolomnya memudahkan membuat tampilan galeri kartu foto yang otomatis menyesuaikan layar (1 kolom di mobile, 2 di tablet, 3 di desktop). Bootstrap juga bisa dipakai lewat CDN tanpa proses build, sehingga cepat dikembangkan dan mudah dilanjutkan di tugas-tugas berikutnya.

## Struktur Halaman
| File | Keterangan |
|------|------------|
| `index.html` | Dashboard dengan layout grid (container, row, col) |
| `daftar.html` | Halaman tabel daftar memori |
| `form.html` | Halaman form tambah/edit memori |
| `detail.html` | Halaman detail satu memori |
| `style.css` | Custom warna tema di atas Bootstrap |
| `script.js` | Interaktivitas: JavaScript murni + jQuery (Tugas 5) |

Navigasi memakai navbar Bootstrap yang responsif (berubah menjadi tombol hamburger di layar kecil).

---

## Tugas 5 - JavaScript dan jQuery

Tidak ada halaman baru. Halaman yang sudah ada diberi `script.js` dan library jQuery (CDN). Tabel, kartu, statistik, dan detail kini **dirender dari data array**, bukan ditulis manual di HTML.

### JavaScript murni (`script.js`, bagian 1)
| Materi | Penerapan di Mini Gallery |
|--------|---------------------------|
| Variabel & tipe data | `dataAwal` / `memories`: array of object berisi `id, judul, tanggal, kategori, jenis, gambar, alt, deskripsi` |
| Function pemroses data | `hitungStatistik()` (hitung foto, video, kategori), `filterByKategori()`, `urutkanTerbaru()`, `buatIdBaru()`, `formatTanggal()` |
| Percabangan | `if/else` untuk jenis Video/Foto, data kosong, dan memori tidak ditemukan |
| Perulangan | `for...of` untuk merender baris tabel dan kartu memori dari array |

### jQuery (`script.js`, bagian 2)
| Materi | Penerapan di Mini Gallery |
|--------|---------------------------|
| Efek `slideToggle` | Tombol **+ Tambah Memori** menampilkan/menyembunyikan form tambah cepat; tombol **Sembunyikan Deskripsi** di halaman detail |
| Efek `fadeIn` / `fadeOut` | Kartu muncul pelan saat dashboard dibuka, baris baru muncul saat ditambah, baris menghilang saat dihapus, notifikasi muncul lalu hilang sendiri |
| `on('click')` | Hapus memori dari tabel, buka/tutup form, reset data |
| `on('change')` | Filter tabel berdasarkan kategori |
| `on('submit')` + validasi | Field kosong (judul, tanggal, kategori, deskripsi) ditandai merah dan data **tidak dikirim** sampai semua terisi |

Data tambahan: perubahan data (tambah/hapus) disimpan di `localStorage` supaya tetap ada saat pindah halaman. Tombol **Reset Data** mengembalikan ke data dummy awal.

### Cara mencoba
1. **Dashboard** (`index.html`): angka statistik dan kartu "Memori Terbaru" dihitung dari array.
2. **Daftar** (`daftar.html`): klik **+ Tambah Memori** (form muncul), kosongkan lalu **Simpan** (muncul error), isi lengkap lalu **Simpan** (baris baru muncul), klik **Hapus** (baris hilang), ganti filter **Kategori**.
3. **Form** (`form.html`): coba kirim dalam keadaan kosong, lalu isi lengkap.
4. **Detail** (`detail.html`): klik **Lihat Detail** pada salah satu memori, lalu klik **Sembunyikan Deskripsi**.

### Screenshot Sebelum dan Sesudah Interaksi
| Interaksi | Sebelum | Sesudah |
|-----------|---------|---------|
| Tampilkan form tambah (`slideToggle`) | ![](screenshot%20hasil/js-1-form-sebelum.png) | ![](screenshot%20hasil/js-1-form-sesudah.png) |
| Tambah & hapus data (`click`, `fadeIn/fadeOut`) | ![](screenshot%20hasil/js-2-tabel-sebelum.png) | ![](screenshot%20hasil/js-2-tabel-sesudah-tambah.png) ![](screenshot%20hasil/js-2-tabel-sesudah-hapus.png) |
| Validasi form kosong (`submit`) | ![](screenshot%20hasil/js-3-validasi-sebelum.png) | ![](screenshot%20hasil/js-3-validasi-sesudah.png) |

### Video Demo Interaktivitas
Link video: (tempel link video di sini)

---

## Screenshot Tahapan Sebelumnya

### Tahap 1 - HTML
![Hasil HTML](screenshot%20hasil/hasil-screenshot-html.png)

### Tahap 2 - CSS
![Hasil CSS](screenshot%20hasil/hasil-screenshot-css.png)

### Tahap 3 - Bootstrap (Desktop)
| Dashboard | Daftar | Form |
|-----------|--------|------|
| ![Dashboard Desktop](screenshot%20hasil/bs-dashboard-desktop.png) | ![Daftar Desktop](screenshot%20hasil/bs-daftar-desktop.png) | ![Form Desktop](screenshot%20hasil/bs-form-desktop.png) |

### Tahap 3 - Bootstrap (Mobile)
| Dashboard | Daftar | Form |
|-----------|--------|------|
| ![Dashboard Mobile](screenshot%20hasil/bs-dashboard-mobile.png) | ![Daftar Mobile](screenshot%20hasil/bs-daftar-mobile.png) | ![Form Mobile](screenshot%20hasil/bs-form-mobile.png) |

## Cara Menjalankan
1. Clone repository ini.
2. Buka `index.html` di browser (butuh koneksi internet karena Bootstrap dan jQuery dimuat lewat CDN).
