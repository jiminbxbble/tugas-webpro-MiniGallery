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

Navigasi memakai navbar Bootstrap yang responsif (berubah menjadi tombol hamburger di layar kecil).

## Screenshot Tiap Tahapan

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
2. Buka `index.html` di browser (butuh koneksi internet karena Bootstrap dimuat lewat CDN).
