import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Edit2,
  Eye,
  X,
  Phone,
  FileCheck,
  Save,
  AlertCircle
} from 'lucide-react';

export default function AdminUsersCRUD({ onUserUpdated }) {
  const [activeTab, setActiveTab] = useState('siswa'); // 'siswa' | 'warga'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Pending' | 'Active' | 'Rejected'
  const [searchTerm, setSearchTerm] = useState('');
  const [usersData, setUsersData] = useState({ siswa: [], warga: [], totalPending: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedProof, setSelectedProof] = useState(null);
  const [editModal, setEditModal] = useState(null); // { type, user }
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminUsers({
        status: statusFilter,
        search: searchTerm
      });
      setUsersData(res);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleStatusChange = async (type, id, newStatus) => {
    try {
      await api.updateUserStatus(type, id, newStatus);
      setMessage(`Status berhasil diubah menjadi ${newStatus}.`);
      await fetchUsers();
      if (onUserUpdated) onUserUpdated();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Gagal mengubah status');
    }
  };

  const handleDelete = async (type, id, name) => {
    if (!window.confirm(`Hapus data ${name} dari basis data?`)) return;
    try {
      await api.deleteUser(type, id);
      setMessage(`Data ${name} berhasil dihapus.`);
      await fetchUsers();
      if (onUserUpdated) onUserUpdated();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Gagal menghapus');
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await api.updateUser(editModal.type, editModal.user.id, editModal.user);
      setMessage('Data pengguna berhasil diperbarui.');
      setEditModal(null);
      await fetchUsers();
      if (onUserUpdated) onUserUpdated();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Gagal memperbarui data');
    }
  };

  const currentList = activeTab === 'siswa' ? usersData.siswa : usersData.warga;

  return (
    <div className="space-y-6">
      {message && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs sm:text-sm">
          <CheckCircle size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* Top Filter Bar */}
      <div className="bg-[#12131b] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Switcher Siswa vs Warga */}
        <div className="flex items-center gap-2 bg-[#181a26] p-1.5 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setActiveTab('siswa')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'siswa'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🥋</span> Data Siswa ({usersData.siswa.length})
          </button>
          <button
            onClick={() => setActiveTab('warga')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'warga'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>📜</span> Data Warga ({usersData.warga.length})
          </button>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              statusFilter === 'all'
                ? 'bg-amber-500 text-black'
                : 'bg-[#181a26] text-slate-400 hover:text-white'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setStatusFilter('Pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 ${
              statusFilter === 'Pending'
                ? 'bg-yellow-500 text-black'
                : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30'
            }`}
          >
            <Clock size={12} /> Pending
          </button>
          <button
            onClick={() => setStatusFilter('Active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 ${
              statusFilter === 'Active'
                ? 'bg-emerald-500 text-black'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            <CheckCircle size={12} /> Active
          </button>
          <button
            onClick={() => setStatusFilter('Rejected')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 ${
              statusFilter === 'Rejected'
                ? 'bg-red-500 text-white'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}
          >
            <XCircle size={12} /> Ditolak
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, NIM, asal..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#181a26] border border-slate-700 rounded-xl text-white text-xs outline-none focus:border-amber-400"
          />
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-[#12131b] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            <Users size={18} className="text-amber-400" />
            <span>Tabel Entitas {activeTab === 'siswa' ? 'Siswa' : 'Warga (Anggota)'}</span>
          </h3>
          <span className="text-xs text-slate-400">Total: {currentList.length} data</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400">Memuat basis data...</div>
        ) : currentList.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            Tidak ada data {activeTab} yang sesuai dengan filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#181a26] text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Nama Lengkap & Kontak</th>
                  {activeTab === 'siswa' ? (
                    <>
                      <th className="py-3 px-4">NIM</th>
                      <th className="py-3 px-4">NIK</th>
                      <th className="py-3 px-4">Nama Orang Tua</th>
                      <th className="py-3 px-4">Surat Izin Bertanda Tangan</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3 px-4">Asal Daerah</th>
                      <th className="py-3 px-4">Tempat Pengesahan</th>
                      <th className="py-3 px-4">Foto Bukti Warga / KTA</th>
                    </>
                  )}
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi Validasi & CRUD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {currentList.map((user) => {
                  const isPending = user.status === 'Pending';
                  const isActive = user.status === 'Active';
                  const isRejected = user.status === 'Rejected';
                  const proofUrl = activeTab === 'siswa' ? user.signedPermissionUrl : user.evidenceUrl;

                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-[#161826] transition ${isPending ? 'bg-amber-500/[0.04]' : ''}`}
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{user.name}</span>
                        <span className="text-xs text-slate-400 font-mono">{user.email}</span>
                        {user.phone && (
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                            <Phone size={11} /> {user.phone}
                          </span>
                        )}
                      </td>

                      {activeTab === 'siswa' ? (
                        <>
                          <td className="py-3.5 px-4 font-mono text-amber-300">{user.nim}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-300">{user.nik}</td>
                          <td className="py-3.5 px-4 text-slate-300">{user.parentName}</td>
                          <td className="py-3.5 px-4">
                            {proofUrl ? (
                              <button
                                onClick={() => setSelectedProof({ user, url: proofUrl, title: 'Surat Izin Latihan' })}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs"
                              >
                                <Eye size={12} /> Lihat Surat Izin
                              </button>
                            ) : (
                              <span className="text-slate-500 italic text-xs">Tidak ada</span>
                            )}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3.5 px-4 text-slate-200">{user.originRegion}</td>
                          <td className="py-3.5 px-4 text-amber-300 font-medium">{user.sahPlace}</td>
                          <td className="py-3.5 px-4">
                            {proofUrl ? (
                              <button
                                onClick={() => setSelectedProof({ user, url: proofUrl, title: 'Bukti Warga / KTA' })}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs"
                              >
                                <Eye size={12} /> Lihat Foto Bukti
                              </button>
                            ) : (
                              <span className="text-slate-500 italic text-xs">Tidak ada</span>
                            )}
                          </td>
                        </>
                      )}

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            isActive
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : isPending
                              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 animate-pulse'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          ● {user.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* Approve Button */}
                          {!isActive && (
                            <button
                              onClick={() => handleStatusChange(activeTab, user.id, 'Active')}
                              title="Validasi Akun (Active)"
                              className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-lg flex items-center gap-1 shadow"
                            >
                              <CheckCircle size={13} />
                              <span>Validasi</span>
                            </button>
                          )}

                          {/* Reject Button */}
                          {!isRejected && (
                            <button
                              onClick={() => handleStatusChange(activeTab, user.id, 'Rejected')}
                              title="Tolak Pendaftaran"
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs"
                            >
                              <XCircle size={15} />
                            </button>
                          )}

                          {/* Edit Button */}
                          <button
                            onClick={() => setEditModal({ type: activeTab, user: { ...user } })}
                            title="Edit Data Pengguna"
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs"
                          >
                            <Edit2 size={15} />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(activeTab, user.id, user.name)}
                            title="Hapus Data Pengguna"
                            className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Proof Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#12131b] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-base font-bold text-white mb-1">
              {selectedProof.title}: {selectedProof.user.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">{selectedProof.user.email} • Telp: {selectedProof.user.phone}</p>

            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-black flex items-center justify-center max-h-96">
              <img src={selectedProof.url} alt="Berkas" className="max-h-96 w-auto object-contain" />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <a
                href={selectedProof.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-400 hover:underline"
              >
                Buka Berkas Penuh
              </a>
              <div className="flex gap-2">
                {selectedProof.user.status !== 'Active' && (
                  <button
                    onClick={() => {
                      handleStatusChange(activeTab, selectedProof.user.id, 'Active');
                      setSelectedProof(null);
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <CheckCircle size={14} /> Validasi (Active)
                  </button>
                )}
                <button
                  onClick={() => setSelectedProof(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#12131b] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setEditModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-base font-bold text-white mb-4">
              Edit Data {editModal.type === 'siswa' ? 'Siswa' : 'Warga'}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={editModal.user.name}
                  onChange={(e) =>
                    setEditModal({ ...editModal, user: { ...editModal.user, name: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                />
              </div>

              {editModal.type === 'siswa' ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">NIM</label>
                      <input
                        type="text"
                        value={editModal.user.nim || ''}
                        onChange={(e) =>
                          setEditModal({ ...editModal, user: { ...editModal.user, nim: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">NIK</label>
                      <input
                        type="text"
                        value={editModal.user.nik || ''}
                        onChange={(e) =>
                          setEditModal({ ...editModal, user: { ...editModal.user, nik: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Nama Orang Tua</label>
                    <input
                      type="text"
                      value={editModal.user.parentName || ''}
                      onChange={(e) =>
                        setEditModal({ ...editModal, user: { ...editModal.user, parentName: e.target.value } })
                      }
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Asal Daerah</label>
                    <input
                      type="text"
                      value={editModal.user.originRegion || ''}
                      onChange={(e) =>
                        setEditModal({ ...editModal, user: { ...editModal.user, originRegion: e.target.value } })
                      }
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Tempat Pengesahan</label>
                    <input
                      type="text"
                      value={editModal.user.sahPlace || ''}
                      onChange={(e) =>
                        setEditModal({ ...editModal, user: { ...editModal.user, sahPlace: e.target.value } })
                      }
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nomor WhatsApp</label>
                  <input
                    type="text"
                    value={editModal.user.phone || ''}
                    onChange={(e) =>
                      setEditModal({ ...editModal, user: { ...editModal.user, phone: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Status</label>
                  <select
                    value={editModal.user.status}
                    onChange={(e) =>
                      setEditModal({ ...editModal, user: { ...editModal.user, status: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
