import React, { useState } from 'react';
import { Facility } from '../../types';

interface FacilityModalProps {
  facility: Facility | null;
  onClose: () => void;
}

export const FacilityModal: React.FC<FacilityModalProps> = ({ facility, onClose }) => {
  if (!facility) return null;

  const [bookingDate, setBookingDate] = useState('วันนี้, 14:00 - 16:00 น.');
  const [selectedRoom, setSelectedRoom] = useState('Room 402 (CS-Lab)');
  const [purpose, setPurpose] = useState('ทำโปรเจกต์กลุ่มวิทยาการคำนวณ');
  const [booked, setBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-[28px] max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-scaleIn">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#f9f9ff] border-b border-slate-200 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1550d3]/10 text-[#1550d3] flex items-center justify-center border border-[#1550d3]/20">
              <span className="material-symbols-outlined text-[28px] fill-1">{facility.icon}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#121b2e]">{facility.name}</h2>
              <p className="text-xs text-[#434654]">{facility.category}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="p-5 sm:p-6 flex flex-col gap-4">
          <div className="text-xs text-[#434654] leading-relaxed bg-[#f1f3ff] p-3.5 rounded-2xl border border-blue-100">
            {facility.description || 'ศูนย์ปฏิบัติการและพื้นที่การเรียนรู้ดิจิทัลอัจฉริยะ'}
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="material-symbols-outlined text-[#1550d3] text-lg block">thermostat</span>
              <span className="text-[10px] font-semibold text-[#737686] uppercase">อุณหภูมิ</span>
              <span className="text-sm font-bold text-[#121b2e] block">{facility.temperature || '23.5°C'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="material-symbols-outlined text-[#00694d] text-lg block">air</span>
              <span className="text-[10px] font-semibold text-[#737686] uppercase">อากาศ (AQI)</span>
              <span className="text-sm font-bold text-[#121b2e] block">{facility.airQuality || 'AQI 15'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="material-symbols-outlined text-[#7857f8] text-lg block">wifi</span>
              <span className="text-[10px] font-semibold text-[#737686] uppercase">Wi-Fi โหลด</span>
              <span className="text-sm font-bold text-[#121b2e] block">{facility.wifiLoad || '60%'}</span>
            </div>
          </div>

          {/* Quick Room Booking Form */}
          <form onSubmit={handleBooking} className="flex flex-col gap-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-[#121b2e] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#1550d3] text-base">calendar_add_on</span>
              จองห้องใช้งานด่วน (Smart Room Booking)
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] font-semibold text-[#737686] block mb-1">เลือกห้อง</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Room 402 (CS-Lab)">Room 402 (CS-Lab)</option>
                  <option value="Studio A (Design)">Studio A (Design)</option>
                  <option value="Mac Lab 2 (Media)">Mac Lab 2 (Media)</option>
                  <option value="Study Pod 03">Study Pod 03 (Library)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[#737686] block mb-1">ช่วงเวลา</label>
                <input
                  type="text"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-[#737686] block mb-1">วัตถุประสงค์</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
              />
            </div>

            {booked ? (
              <div className="p-3 bg-[#20C997]/15 rounded-xl text-[#00694d] text-xs font-bold text-center">
                ✅ จองห้องสำเร็จ! ประตูดิจิทัลจะปลดล็อกด้วย Digital ID ของคุณ
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 bg-[#1550d3] text-white rounded-xl font-semibold text-xs hover:bg-[#1a53d6] transition-colors cursor-pointer shadow-md"
              >
                ยืนยันการจองห้อง
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
