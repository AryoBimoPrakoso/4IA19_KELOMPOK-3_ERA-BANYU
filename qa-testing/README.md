# Testing

UNIT TEST - 4IA19_KELOMPOK-3_ERA-BANYU/qa-testing

MANUAL TESTING - https://docs.google.com/spreadsheets/d/1kAJ_QN6rGl54l6fdWaOcHkUKgTQ-40-_Yiw5i5A9R3Y/edit?usp=sharing

## Peran
QA 

## Tujuan Pengujian
Pengujian dilakukan untuk memastikan utility backend bekerja dengan benar,
konsisten, dan aman digunakan oleh banyak controller.

Fokus QA berada pada komponen yang bersifat reusable dan berperan penting
dalam alur error handling serta response API.

---

## Scope Pengujian

Pengujian difokuskan pada utility layer backend.

Alasan pemilihan scope:
- utility digunakan oleh banyak bagian sistem
- kesalahan pada utility berdampak luas
- lebih cocok diuji dengan unit test dibandingkan komponen lain

File yang diuji:
- asyncHandler
- customError
- envCheck
- responseHelper

Pengujian tidak mencakup:
- controller
- database
- external service (email, SMTP, dll)
- deployment atau staging

Pengujian dilakukan sesuai batasan proyek, yaitu local testing saja.

---

## Tools
- Node.js
- Jest (Unit Testing)

---

## Struktur Folder QA
qa/
├── manual/
├── unit/
│   └── backend/
│       ├── asyncHandler.test.js
│       ├── customError.test.js
│       ├── envCheck.test.js
│       └── responseHelper.test.js
├── jest.config.js
├── package.json
└── README.md

---

## Unit Test yang Diimplementasikan

### asyncHandler Utility
File: backend/src/utils/asyncHandler.js

Tujuan:
Memastikan error dari async controller diteruskan ke middleware error
dan tidak mengganggu eksekusi normal jika tidak terjadi error.

Test case:
- error dari async function diteruskan ke next
- next tidak dipanggil saat eksekusi sukses

---

### Custom Error Classes
File: backend/src/utils/customError.js

Tujuan:
Menjamin konsistensi struktur error dan HTTP status code
yang digunakan di seluruh backend API.

Test case:
- validasi status code setiap jenis error
- validasi inheritance dari CustomError

---

### envCheck Utility
File: backend/src/utils/envCheck.js

Tujuan:
Memastikan validasi environment variable berjalan sesuai desain
dan mencegah aplikasi berjalan dengan konfigurasi yang tidak lengkap.

Test case:
- environment lengkap dapat dieksekusi tanpa error

---

### responseHelper Utility
File: backend/src/utils/responseHelper.js

Tujuan:
Menjamin format response API konsisten di seluruh endpoint backend.

Test case:
- successResponse menghasilkan response sukses standar
- createdResponse menggunakan status code 201
- paginatedResponse menyertakan metadata pagination

---

## Hasil Pengujian

Seluruh unit test berhasil dijalankan dan lulus menggunakan perintah:

```bash
npm test
