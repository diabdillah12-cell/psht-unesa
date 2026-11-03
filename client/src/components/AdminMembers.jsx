import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  ExternalLink,
  Eye,
  X,
  Phone,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function AdminMembers({ onMemberUpdated }) {
  const [members, setMembers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Pending' | 'Unlocked' | 'Rejected'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'Siswa' | 'Warga'
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProof, setSelectedProof] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState('');

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await api.getMembers({
        status: statusFilter,
        memberType: typeFilter,
        search
      });
      setMembers(res.members || []);
    } catch (err) {
      console.error('Failed to load members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [statusFilter, typeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMembers();
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setActionLoading(id);
      await api.updateMemberStatus(id, newStatus);
      setMessage(`Status anggota berhasil diubah menjadi ${newStatus}.`);
      await fetchMembers();
      if (onMemberUpdated) onMemberUpdated();
      setTimeout(() => setMessage(''), 3500);
    } catch (err) {
      alert(err.message || 'Gagal mengubah status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Yakin ingin menghapus data anggota "${name}"?`)) return;
    try {
      setActionLoading(id);
      await api.deleteMember(id);
      setMessage(`Anggota "${name}" berhasil dihapus.`);
      await fetchMembers();
      if (onMemberUpdated) onMemberUpdated();
      setTimeout(() => setMessage(''), 3500);
    } catch (err) {
      alert(err.message || 'Gagal menghapus');
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = members.filter((m) => m.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Toast message */}
      {message && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-emerald-400 text-xs sm:text-sm animate-fadeIn">
          <CheckCircle size={18} />
          <span>{message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#13151f] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              statusFilter === 'all'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-[#1a1c29] text-slate-400 hover:text-white'
            }`}
          >
            Semua ({members.length})
          </button>
          <button
            onClick={() => setStatusFilter('Pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              statusFilter === 'Pending'
                ? 'bg-yellow-500 text-black shadow-md'
                : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 hover:bg-yellow-500/20'
            }`}
          >
            <Clock size={13} />
            <span>Pending Validation</span>
          </button>
          <button
            onClick={() => setStatusFilter('Unlocked')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              statusFilter === 'Unlocked'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
            }`}
          >
            <CheckCircle size={13} />
            <span>Unlocked</span>
          </button>
          <button
            onClick={() => setStatusFilter('Rejected')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              statusFilter === 'Rejected'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
            }`}
          >
            <XCircle size={13} />
            <span>Ditolak</span>
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, NIM, fakultas..."
            className="w-full pl-9 pr-3.5 py-2 bg-[#191b26] border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition"
          />
        </form>
      </div>

      {/* Members Table / Card List */}
      <div className="bg-[#13151f] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Users size={18} className="text-amber-400" />
            <span>Daftar Pendaftar & Anggota PSHT UNESA</span>
          </h3>
          <span className="text-xs text-slate-400">Total: {members.length} data</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400">Memuat data pendaftaran...</div>
        ) : members.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            Tidak ada pendaftar atau anggota yang cocok.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#181a26] text-slate-400 uppercase text-[11px] tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Nama & Akun</th>
                  <th className="py-3.5 px-4">Identitas / NIM</th>
                  <th className="py-3.5 px-4">Kategori & Sabuk</th>
                  <th className="py-3.5 px-4">Fakultas / Rayon</th>
                  <th className="py-3.5 px-4">Bukti Upload</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi Validasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {members.map((m) => {
                  const isUserPending = m.status === 'Pending';
                  const isUserUnlocked = m.status === 'Unlocked';
                  const isUserRejected = m.status === 'Rejected';

                  return (
                    <tr
                      key={m.id}
                      className={`hover:bg-[#181b29] transition ${
                        isUserPending ? 'bg-amber-500/[0.03]' : ''
                      }`}
                    >
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{m.name}</span>
                          {m.role === 'admin' && (
                            <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded font-bold">
                              ADMIN
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{m.email}</div>
                        {m.phone && (
                          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                            <Phone size={11} /> {m.phone}
                          </div>
                        )}
                      </td>

                      {/* NIM */}
                      <td className="py-3.5 px-4 font-mono text-amber-300">
                        {m.nim || '-'}
                      </td>

                      {/* Type & Belt */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white block">{m.memberType}</span>
                        <span className="text-xs text-amber-400/90 font-medium">
                          {m.beltLevel || '-'}
                        </span>
                      </td>

                      {/* Faculty / Rayon */}
                      <td className="py-3.5 px-4 text-slate-300 text-xs">
                        {m.faculty || m.rayonAsal || '-'}
                      </td>

                      {/* Evidence */}
                      <td className="py-3.5 px-4">
                        {m.evidenceUrl ? (
                          <button
                            type="button"
                            onClick={() => setSelectedProof(m)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition"
                          >
                            <Eye size={13} />
                            <span>Lihat Bukti</span>
                          </button>
                        ) : (
                          <span className="text-slate-500 text-xs italic">Tanpa Berkas</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            isUserUnlocked
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : isUserPending
                              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 animate-pulse'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          ● {m.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        {m.role !== 'admin' && (
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            {/* UNLOCK BUTTON */}
                            {!isUserUnlocked && (
                              <button
                                type="button"
                                disabled={actionLoading === m.id}
                                onClick={() => handleUpdateStatus(m.id, 'Unlocked')}
                                title="Validasi & Buka Akses Dasbor"
                                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1"
                              >
                                <CheckCircle size={14} />
                                <span>Unlock</span>
                              </button>
                            )}

                            {/* REJECT BUTTON */}
                            {!isUserRejected && (
                              <button
                                type="button"
                                disabled={actionLoading === m.id}
                                onClick={() => handleUpdateStatus(m.id, 'Rejected')}
                                title="Tolak Pendaftaran"
                                className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs transition"
                              >
                                <XCircle size={16} />
                              </button>
                            )}

                            {/* SET PENDING BUTTON */}
                            {isUserUnlocked && (
                              <button
                                type="button"
                                disabled={actionLoading === m.id}
                                onClick={() => handleUpdateStatus(m.id, 'Pending')}
                                title="Kembalikan ke Status Pending"
                                className="p-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 border border-yellow-500/20 rounded-xl text-xs transition"
                              >
                                <Clock size={16} />
                              </button>
                            )}

                            {/* DELETE BUTTON */}
                            <button
                              type="button"
                              disabled={actionLoading === m.id}
                              onClick={() => handleDelete(m.id, m.name)}
                              title="Hapus Data Anggota"
                              className="p-1.5 bg-slate-800 hover:bg-red-600/30 text-slate-400 hover:text-red-400 rounded-xl text-xs transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
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
          <div className="relative w-full max-w-lg bg-[#12131b] border border-amber-500/40 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">
              Bukti Pendaftaran: {selectedProof.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {selectedProof.memberType} • NIM: {selectedProof.nim || '-'} • Telp:{' '}
              {selectedProof.phone || '-'}
            </p>

            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-black flex items-center justify-center max-h-96">
              <img
                src={selectedProof.evidenceUrl}
                alt="Bukti Pendaftaran"
                className="max-h-96 w-auto object-contain"
              />
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <a
                href={selectedProof.evidenceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink size={14} /> Buka Berkas Penuh
              </a>

              <div className="flex items-center gap-2">
                {selectedProof.status !== 'Unlocked' && (
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedProof.id, 'Unlocked');
                      setSelectedProof(null);
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                  >
                    <CheckCircle size={15} /> Validasi (Unlock)
                  </button>
                )}
                <button
                  onClick={() => setSelectedProof(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
