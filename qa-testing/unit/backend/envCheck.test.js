/**
 * Unit Test untuk utilitas envCheck
 * File ini menguji fungsi validateEnvironment()
 * Fokus: memastikan validasi environment variable berjalan sesuai desain
 */

// Import fungsi yang akan diuji
const { validateEnvironment } = require('../../../backend/src/utils/envCheck');

describe('envCheck - validateEnvironment', () => {
  /**
   * Simpan kondisi environment asli
   * Tujuan:
   * - Menghindari efek samping antar test
   * - Menjaga agar test bersifat isolated & deterministic
   */
  const ORIGINAL_ENV = process.env;

  /**
   * beforeEach dijalankan sebelum setiap test case
   */
  beforeEach(() => {
    // Reset cache module Jest agar tidak ada state lama yang tertinggal
    jest.resetModules();

    // Clone environment variable agar tiap test punya env bersih
    process.env = { ...ORIGINAL_ENV };
  });

  /**
   * afterAll dijalankan setelah semua test selesai
   */
  afterAll(() => {
    // Kembalikan environment ke kondisi awal
    // Penting agar tidak mempengaruhi test lain di project
    process.env = ORIGINAL_ENV;
  });

  /**
   * TEST CASE 1
   * Kondisi: semua required environment variable tersedia
   * Expected:
   * - isValid = true
   * - tidak ada missing variable
   */
  test('returns valid when all required environment variables are present', () => {
    // Set required environment variables sesuai definisi di envCheck.js
    process.env.JWT_SECRET = 'test-secret';
    process.env.FIREBASE_PROJECT_ID = 'test-project-id';

    // Jalankan fungsi yang diuji
    const result = validateEnvironment();

    // Assertion: hasil validasi harus valid
    expect(result.isValid).toBe(true);

    // Assertion: tidak boleh ada environment variable yang hilang
    expect(result.missing).toHaveLength(0);
  });

  /**
   * TEST CASE 2
   * Kondisi: required environment variables tidak disediakan
   * Expected:
   * - isValid = false
   * - missing berisi daftar env yang wajib tapi tidak ada
   */
  test('returns invalid when required environment variables are missing', () => {
    // Pastikan env wajib dihapus (simulasi konfigurasi salah)
    delete process.env.JWT_SECRET;
    delete process.env.FIREBASE_PROJECT_ID;

    // Jalankan fungsi yang diuji
    const result = validateEnvironment();

    // Assertion: validasi harus gagal
    expect(result.isValid).toBe(false);

    // Assertion: daftar missing harus mencakup env wajib
    expect(result.missing).toContain('JWT_SECRET');
    expect(result.missing).toContain('FIREBASE_PROJECT_ID');
  });
});
