// Import utility asyncHandler dari backend
// Ini yang akan kita uji perilakunya
const asyncHandler = require('../../../backend/src/utils/asyncHandler');

// Kelompok test untuk asyncHandler
describe('asyncHandler utility', () => {

  // Test ini memastikan:
  // Jika fungsi async error (throw),
  // maka error tersebut diteruskan ke next()
  test('should call next with error when async function throws', async () => {
    const error = new Error('Async error');

    // Fungsi async yang sengaja dibuat error
    const fn = async () => {
      throw error;
    };

    // Mock object Express (cukup kosong untuk unit test)
    const req = {};
    const res = {};

    // next() kita mock agar bisa dicek apakah dipanggil
    const next = jest.fn();

    // Jalankan asyncHandler dengan fungsi error
    await asyncHandler(fn)(req, res, next);

    // Pastikan next dipanggil dengan error yang sama
    expect(next).toHaveBeenCalledWith(error);
  });

  // Test ini memastikan:
  // Jika fungsi async berjalan normal,
  // maka next() TIDAK dipanggil (tidak ada error)
  test('should NOT call next when async function resolves successfully', async () => {
    const fn = async () => {
      return 'ok';
    };

    const req = {};
    const res = {};
    const next = jest.fn();

    await asyncHandler(fn)(req, res, next);

    // next tidak boleh dipanggil karena tidak ada error
    expect(next).not.toHaveBeenCalled();
  });

});
