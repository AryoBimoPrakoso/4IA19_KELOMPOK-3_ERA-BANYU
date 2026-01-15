// Import fungsi yang akan diuji dari responseHelper
const {
  successResponse,
  createdResponse,
  paginatedResponse
} = require('../../../backend/src/utils/responseHelper');

describe('responseHelper utilities', () => {

  // Helper untuk membuat mock response Express
  const createMockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); // memungkinkan chaining: res.status().json()
    res.json = jest.fn();
    return res;
  };

  // =========================================
  // TEST CASE 1: successResponse
  // =========================================
  test('successResponse should return standard success response with correct status code', () => {
    const res = createMockRes();
    const data = { id: 1, name: 'Test Data' };
    const message = 'Operation successful';

    successResponse(res, data, message);

    // Pastikan status code default adalah 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Pastikan response JSON memiliki struktur yang konsisten
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: message,
        data: data,
        timestamp: expect.any(String)
      })
    );
  });

  // =========================================
  // TEST CASE 2: createdResponse
  // =========================================
  test('createdResponse should return status code 201 for created resource', () => {
    const res = createMockRes();
    const data = { id: 10 };

    createdResponse(res, data);

    // Pastikan status code adalah 201 (Created)
    expect(res.status).toHaveBeenCalledWith(201);

    // Pastikan struktur response tetap konsisten
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: data,
        message: expect.any(String),
        timestamp: expect.any(String)
      })
    );
  });

  // =========================================
  // TEST CASE 3: paginatedResponse
  // =========================================
  test('paginatedResponse should include pagination metadata in response', () => {
    const res = createMockRes();
    const data = [{ id: 1 }, { id: 2 }];
    const pagination = {
      page: 1,
      limit: 10,
      total: 2,
      hasMore: false
    };

    paginatedResponse(res, data, pagination);

    // Pastikan status code default adalah 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Pastikan response JSON mengandung pagination
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: data,
        pagination: pagination,
        timestamp: expect.any(String)
      })
    );
  });

});
