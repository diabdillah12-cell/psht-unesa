const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('psht_token');
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('psht_token', token);
  } else {
    localStorage.removeItem('psht_token');
  }
};

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && options.body && typeof options.body === 'object') {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Terjadi kesalahan pada server');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  registerSiswa: (formData) => request('/auth/register-siswa', { method: 'POST', body: formData }),
  registerWarga: (formData) => request('/auth/register-warga', { method: 'POST', body: formData }),
  getMe: () => request('/auth/me', { method: 'GET' }),

  // User Management (Admin CRUD)
  getAdminUsers: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/admin/users${q ? `?${q}` : ''}`, { method: 'GET' });
  },
  updateUserStatus: (type, id, status) => request(`/admin/users/${type}/${id}/status`, {
    method: 'PATCH',
    body: { status }
  }),
  updateUser: (type, id, data) => request(`/admin/users/${type}/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteUser: (type, id) => request(`/admin/users/${type}/${id}`, {
    method: 'DELETE'
  }),

  // Berita Nasional (CRUD)
  getNews: () => request('/news', { method: 'GET' }),
  createNews: (data) => request('/news', { method: 'POST', body: data }),
  updateNews: (id, data) => request(`/news/${id}`, { method: 'PUT', body: data }),
  deleteNews: (id) => request(`/news/${id}`, { method: 'DELETE' }),

  // Dokumentasi & Proker (CRUD)
  getProker: () => request('/proker', { method: 'GET' }),
  createProker: (data) => request('/proker', { method: 'POST', body: data }),
  updateProker: (id, data) => request(`/proker/${id}`, { method: 'PUT', body: data }),
  deleteProker: (id) => request(`/proker/${id}`, { method: 'DELETE' }),

  // 7 Departemen Management
  getDepartments: () => request('/departments', { method: 'GET' }),
  updateDepartment: (deptId, data) => request(`/departments/${deptId}`, { method: 'PUT', body: data }),

  // Settings & CMS Layout
  getSettings: () => request('/settings', { method: 'GET' }),
  updateSettings: (data) => request('/settings', { method: 'PUT', body: data }),

  // File Upload
  uploadFile: (formData) => request('/upload', { method: 'POST', body: formData })
};
