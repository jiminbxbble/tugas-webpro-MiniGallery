/* =====================================================
   Mini Gallery - script.js
   Tugas Minggu 5: JavaScript murni + jQuery
   -----------------------------------------------------
   BAGIAN 1 : JavaScript murni (data, function, render)
   BAGIAN 2 : jQuery (efek, event handling, validasi)
===================================================== */


/* =====================================================
   BAGIAN 1 - JAVASCRIPT MURNI
===================================================== */

// ---------- 1. Variabel & tipe data: data dummy (array of object) ----------
const KUNCI_STORAGE = 'miniGalleryMemories';
const GAMBAR_DEFAULT = 'images/pantai.jpg';
const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Data awal (dummy). Tiap memori = satu object.
const dataAwal = [
  {
    id: 1,
    judul: 'Liburan ke Pantai',
    tanggal: '2026-08-12',
    kategori: 'Liburan',
    jenis: 'Foto',
    gambar: 'images/pantai.jpg',
    alt: 'Foto liburan keluarga di pantai',
    deskripsi: 'Momen liburan bersama keluarga di pantai, menikmati suasana sore dan deburan ombak. Salah satu kenangan paling berharga tahun ini.'
  },
  {
    id: 2,
    judul: 'Hari Wisuda',
    tanggal: '2026-09-03',
    kategori: 'Momen Spesial',
    jenis: 'Foto',
    gambar: 'images/pantai2.jpg',
    alt: 'Foto wisuda bersama teman kuliah',
    deskripsi: 'Foto bersama teman-teman kuliah di hari wisuda. Akhirnya semua perjuangan terbayar.'
  },
  {
    id: 3,
    judul: 'Ulang Tahun Adik',
    tanggal: '2026-09-20',
    kategori: 'Keluarga',
    jenis: 'Video',
    gambar: 'images/pantai3.jpg',
    alt: 'Video singkat pesta ulang tahun adik',
    deskripsi: 'Video singkat saat adik meniup lilin di pesta ulang tahunnya bersama keluarga.'
  }
];

// Data yang sedang dipakai halaman (bisa bertambah/berkurang)
let memories = muatData();


// ---------- 2. Penyimpanan sederhana (localStorage) ----------
// Supaya data yang ditambah/dihapus tetap ada saat pindah halaman.
// Kalau localStorage tidak tersedia, otomatis pakai data awal.
function muatData() {
  try {
    const tersimpan = JSON.parse(localStorage.getItem(KUNCI_STORAGE));
    if (Array.isArray(tersimpan)) {
      return tersimpan;
    }
  } catch (e) {
    // abaikan, lanjut pakai data awal
  }
  return dataAwal.map(function (m) { return Object.assign({}, m); });
}

function simpanData() {
  try {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(memories));
  } catch (e) {
    // abaikan jika storage tidak tersedia
  }
}


// ---------- 3. Function yang memproses data ----------

// Mengubah '2026-08-12' menjadi '12 Agustus 2026'
function formatTanggal(iso) {
  const bagian = iso.split('-');
  return bagian[2] + ' ' + NAMA_BULAN[Number(bagian[1]) - 1] + ' ' + bagian[0];
}

// Menghitung jumlah foto, video, dan kategori unik (perulangan + percabangan)
function hitungStatistik(data) {
  let foto = 0;
  let video = 0;
  const daftarKategori = [];

  for (const m of data) {
    if (m.jenis === 'Video') {
      video++;
    } else {
      foto++;
    }
    if (!daftarKategori.includes(m.kategori)) {
      daftarKategori.push(m.kategori);
    }
  }
  return { foto: foto, video: video, kategori: daftarKategori.length };
}

// Memfilter data berdasarkan kategori
function filterByKategori(data, kategori) {
  if (kategori === 'semua') {
    return data;
  }
  return data.filter(function (m) { return m.kategori === kategori; });
}

// Mengurutkan dari tanggal terbaru ke terlama (tanpa mengubah array asli)
function urutkanTerbaru(data) {
  return data.slice().sort(function (a, b) {
    return b.tanggal.localeCompare(a.tanggal);
  });
}

// Membuat id baru = id terbesar + 1
function buatIdBaru(data) {
  let terbesar = 0;
  for (const m of data) {
    if (m.id > terbesar) {
      terbesar = m.id;
    }
  }
  return terbesar + 1;
}

// Mencegah teks dari input pengguna dibaca sebagai tag HTML
function escapeHtml(teks) {
  const pengganti = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(teks).replace(/[&<>"']/g, function (c) { return pengganti[c]; });
}

// Badge tambahan hanya untuk memori berjenis Video
function badgeJenis(m) {
  if (m.jenis === 'Video') {
    return '<span class="badge text-bg-secondary">Video</span>';
  }
  return '';
}


// ---------- 4. Render data ke halaman secara dinamis ----------
// (HTML dibuat dari array lewat perulangan, bukan ditulis manual)

// Dashboard: angka statistik
function renderStatistik() {
  const elFoto = document.getElementById('stat-foto');
  if (!elFoto) { return; } // bukan halaman dashboard

  const s = hitungStatistik(memories);
  elFoto.textContent = s.foto;
  document.getElementById('stat-video').textContent = s.video;
  document.getElementById('stat-kategori').textContent = s.kategori;
}

// Dashboard: 3 kartu memori terbaru
function renderKartuTerbaru() {
  const wadah = document.getElementById('daftar-kartu');
  if (!wadah) { return; }

  const terbaru = urutkanTerbaru(memories).slice(0, 3);
  let html = '';

  if (terbaru.length === 0) {
    html = '<div class="col-12"><p class="text-center text-muted mb-0">Belum ada memori tersimpan.</p></div>';
  } else {
    for (const m of terbaru) {
      html += `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm">
            <img src="${m.gambar}" class="card-img-top foto-card" alt="${escapeHtml(m.alt)}">
            <div class="card-body">
              <h3 class="h6 card-title">${escapeHtml(m.judul)}</h3>
              <p class="card-text small text-muted">
                ${formatTanggal(m.tanggal)} &middot;
                <span class="badge badge-sand">${escapeHtml(m.kategori)}</span>
                ${badgeJenis(m)}
              </p>
              <a href="detail.html?id=${m.id}" class="btn btn-sm btn-teal">Lihat Detail</a>
            </div>
          </div>
        </div>`;
    }
  }
  wadah.innerHTML = html;
}

// Halaman daftar: isi tabel
function renderTabel(data) {
  const tbody = document.getElementById('tabel-body');
  if (!tbody) { return; }

  let html = '';
  if (data.length === 0) {
    html = '<tr><td colspan="5" class="text-muted py-4">Belum ada memori untuk ditampilkan.</td></tr>';
  } else {
    for (const m of data) {
      html += `
        <tr data-id="${m.id}">
          <td><img src="${m.gambar}" class="rounded foto-thumb" alt="${escapeHtml(m.alt)}"></td>
          <td>${escapeHtml(m.judul)}</td>
          <td>${formatTanggal(m.tanggal)}</td>
          <td><span class="badge badge-sand">${escapeHtml(m.kategori)}</span> ${badgeJenis(m)}</td>
          <td>
            <a href="detail.html?id=${m.id}" class="btn btn-sm btn-outline-teal">Lihat Detail</a>
            <a href="form.html" class="btn btn-sm btn-outline-secondary">Edit</a>
            <button type="button" class="btn btn-sm btn-outline-danger btn-hapus" data-id="${m.id}">Hapus</button>
          </td>
        </tr>`;
    }
  }
  tbody.innerHTML = html;

  const jumlah = document.getElementById('jumlah-memori');
  if (jumlah) { jumlah.textContent = data.length; }
}

// Halaman detail: tampilkan satu memori sesuai ?id= di URL
function renderDetail() {
  const wadah = document.getElementById('detail-memori');
  if (!wadah) { return; }

  const idParam = new URLSearchParams(window.location.search).get('id');
  let m;
  if (idParam) {
    m = memories.find(function (item) { return item.id === Number(idParam); });
  } else {
    m = memories[0];
  }

  if (!m) {
    wadah.innerHTML = `
      <div class="card-body p-4">
        <p>Memori tidak ditemukan (mungkin sudah dihapus).</p>
        <a href="daftar.html" class="btn btn-outline-secondary">Kembali ke Daftar</a>
      </div>`;
    return;
  }

  document.title = 'Mini Gallery - ' + m.judul;
  wadah.innerHTML = `
    <div class="row g-0">
      <div class="col-12 col-md-6">
        <img src="${m.gambar}" class="img-fluid w-100 h-100 rounded-start" style="object-fit: cover;" alt="${escapeHtml(m.alt)}">
      </div>
      <div class="col-12 col-md-6">
        <div class="card-body p-4">
          <h1 class="h4 text-teal fw-bold">${escapeHtml(m.judul)}</h1>
          <p class="mb-1"><strong>Tanggal:</strong> ${formatTanggal(m.tanggal)}</p>
          <p class="mb-3"><strong>Kategori:</strong> <span class="badge badge-sand">${escapeHtml(m.kategori)}</span> ${badgeJenis(m)}</p>
          <div id="deskripsi-detail"><p>${escapeHtml(m.deskripsi)}</p></div>
          <button type="button" id="btn-toggle-deskripsi" class="btn btn-sm btn-outline-teal mb-3">Sembunyikan Deskripsi</button>
          <div>
            <a href="form.html" class="btn btn-teal">Edit Memori</a>
            <a href="daftar.html" class="btn btn-outline-secondary">Kembali ke Daftar</a>
          </div>
        </div>
      </div>
    </div>`;
}


/* =====================================================
   BAGIAN 2 - JQUERY
   (dijalankan setelah halaman selesai dimuat)
===================================================== */
$(function () {

  // Kategori yang sedang dipilih di filter (halaman daftar)
  let kategoriAktif = 'semua';

  function tampilkanTabel() {
    renderTabel(filterByKategori(memories, kategoriAktif));
  }

  // Notifikasi: muncul pelan (fadeIn), tahan sebentar, lalu hilang (fadeOut)
  function tampilNotif(pesan, tipe) {
    $('#notifikasi')
      .stop(true, true)
      .removeClass('alert-success alert-danger alert-warning alert-info')
      .addClass('alert-' + tipe)
      .text(pesan)
      .fadeIn(250)
      .delay(2500)
      .fadeOut(400);
  }

  // Cek satu field: kosong -> beri tanda merah (is-invalid) dan pesan error Bootstrap
  function validasiField($input) {
    const kosong = $.trim($input.val()) === '';
    $input.toggleClass('is-invalid', kosong);
    return !kosong;
  }

  // ---------- Render awal tiap halaman ----------
  renderStatistik();
  renderKartuTerbaru();
  tampilkanTabel();
  renderDetail();

  // Efek fadeIn saat halaman dibuka
  $('#daftar-kartu > div').hide().fadeIn(700);
  $('#detail-memori').hide().fadeIn(500);


  // ---------- Halaman Daftar: tampilkan/sembunyikan form tambah ----------
  $('#btn-toggle-form').on('click', function () {
    const tombol = $(this);
    $('#panel-tambah').slideToggle(300, function () {
      const terbuka = $(this).is(':visible');
      tombol.text(terbuka ? '\u00d7 Tutup Form' : '+ Tambah Memori');
      tombol.attr('aria-expanded', terbuka);
    });
  });

  // ---------- Halaman Daftar: filter kategori ----------
  $('#filter-kategori').on('change', function () {
    kategoriAktif = $(this).val();
    tampilkanTabel();
  });

  // ---------- Halaman Daftar: hapus memori ----------
  // on('click') dengan delegasi, karena tombol Hapus dibuat oleh JavaScript
  $('#tabel-body').on('click', '.btn-hapus', function () {
    const id = Number($(this).data('id'));
    const memori = memories.find(function (m) { return m.id === id; });

    $(this).closest('tr').fadeOut(400, function () {
      memories = memories.filter(function (m) { return m.id !== id; });
      simpanData();
      tampilkanTabel();
      tampilNotif('Memori "' + memori.judul + '" berhasil dihapus.', 'warning');
    });
  });

  // ---------- Halaman Daftar: kembalikan data dummy awal ----------
  $('#btn-reset').on('click', function () {
    memories = dataAwal.map(function (m) { return Object.assign({}, m); });
    simpanData();
    kategoriAktif = 'semua';
    $('#filter-kategori').val('semua');
    tampilkanTabel();
    tampilNotif('Data dikembalikan ke data dummy awal.', 'info');
  });

  // ---------- Halaman Detail: tampilkan/sembunyikan deskripsi ----------
  $('#detail-memori').on('click', '#btn-toggle-deskripsi', function () {
    const tombol = $(this);
    $('#deskripsi-detail').slideToggle(300, function () {
      const terbuka = $(this).is(':visible');
      tombol.text(terbuka ? 'Sembunyikan Deskripsi' : 'Tampilkan Deskripsi');
    });
  });


  // ---------- Validasi & submit form (form cepat di Daftar + form di halaman Form) ----------
  // Field yang wajib diisi diberi atribut data-wajib di HTML.

  // Tanda merah hilang begitu pengguna mulai mengisi field-nya
  $('.form-validasi').on('input change', 'input, select, textarea', function () {
    if ($.trim($(this).val()) !== '') {
      $(this).removeClass('is-invalid');
    }
  });

  $('.form-validasi').on('submit', function (e) {
    e.preventDefault(); // cegah halaman reload, kita proses sendiri
    const $form = $(this);

    // 1. Cek semua field wajib
    let semuaTerisi = true;
    $form.find('[data-wajib]').each(function () {
      if (!validasiField($(this))) {
        semuaTerisi = false;
      }
    });

    if (!semuaTerisi) {
      tampilNotif('Masih ada field yang kosong, lengkapi dulu ya.', 'danger');
      return; // berhenti, data tidak "dikirim"
    }

    // 2. Semua terisi -> buat object memori baru dan simpan
    const judul = $.trim($form.find('[name="judul"]').val());
    const deskripsi = $.trim($form.find('[name="deskripsi"]').val());

    const baru = {
      id: buatIdBaru(memories),
      judul: judul,
      tanggal: $form.find('[name="tanggal"]').val(),
      kategori: $form.find('[name="kategori"]').val(),
      jenis: $form.find('[name="jenis"]').val(),
      gambar: GAMBAR_DEFAULT, // belum ada upload ke server, pakai gambar contoh
      alt: 'Gambar contoh untuk memori ' + judul,
      deskripsi: deskripsi !== '' ? deskripsi : 'Belum ada deskripsi.'
    };
    memories.push(baru);
    simpanData();

    // 3. Bersihkan form & beri tahu pengguna
    $form[0].reset();
    $form.find('.is-invalid').removeClass('is-invalid');
    tampilNotif('Memori "' + baru.judul + '" berhasil ditambahkan!', 'success');

    // 4. Kalau sedang di halaman Daftar: tampilkan baris baru dengan efek & tutup panel
    if ($('#tabel-body').length) {
      tampilkanTabel();
      $('#tabel-body tr[data-id="' + baru.id + '"]').hide().fadeIn(700);
      $('#panel-tambah').slideUp(300);
      $('#btn-toggle-form').text('+ Tambah Memori').attr('aria-expanded', false);
    }
  });

});
