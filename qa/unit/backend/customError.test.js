// Import semua custom error dari backend
const {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError
} = require('../../../backend/src/utils/customError');

// Kelompok test untuk seluruh custom error
describe('Custom Error Classes', () => {

  // BadRequestError harus:
  // - turunan dari CustomError
  // - memiliki statusCode 400
  test('BadRequestError should have statusCode 400', () => {
    const err = new BadRequestError('Bad request');

    expect(err).toBeInstanceOf(CustomError);
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('Bad request');
  });

  // UnauthorizedError:
  // Digunakan saat autentikasi gagal
  test('UnauthorizedError should default to statusCode 401', () => {
    const err = new UnauthorizedError();

    expect(err.statusCode).toBe(401);
    expect(err.message).toBeDefined();
  });

  // ForbiddenError:
  // Digunakan saat role tidak diizinkan
  test('ForbiddenError should have statusCode 403', () => {
    const err = new ForbiddenError();

    expect(err.statusCode).toBe(403);
  });

  // NotFoundError:
  // Digunakan saat data atau endpoint tidak ditemukan
  test('NotFoundError should have statusCode 404', () => {
    const err = new NotFoundError();

    expect(err.statusCode).toBe(404);
  });

  // InternalServerError:
  // Digunakan untuk error server tak terduga
  test('InternalServerError should have statusCode 500', () => {
    const err = new InternalServerError();

    expect(err.statusCode).toBe(500);
  });

});
