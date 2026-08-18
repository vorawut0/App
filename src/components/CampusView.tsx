import React, { useState } from 'react';
import { MOCK_FACILITIES, MOCK_DIGITAL_TWIN } from '../data/mockData';
import { Facility, DigitalTwinNode } from '../types';
import { CampusPulseTab } from './modals/CampusPulseModal';

interface CampusViewProps {
  onOpenFacilityModal: (facility: Facility) => void;
  onOpenNodeModal: (node: DigitalTwinNode) => void;
  onOpenCampusMap: () => void;
  onOpenCampusPulse?: (tab?: CampusPulseTab) => void;
}

export const CampusView: React.FC<CampusViewProps> = ({
  onOpenFacilityModal,
  onOpenNodeModal,
  onOpenCampusMap,
  onOpenCampusPulse,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredFacilities =
    filterCategory === 'all'
      ? MOCK_FACILITIES
      : MOCK_FACILITIES.filter((f) =>
          f.category.toLowerCase().includes(filterCategory.toLowerCase())
        );

  const getStatusBadge = (status: string, label: string) => {
    switch (status) {
      case 'open':
      case 'available':
        return (
          <div className="flex items-center gap-1.5 bg-[#20C997]/12 px-2.5 py-1 rounded-full border border-[#20C997]/25">
            <div className="w-2 h-2 rounded-full bg-[#20C997] animate-pulse" />
            <span className="text-[11px] font-bold text-[#00694d] uppercase tracking-wider">
              {label}
            </span>
          </div>
        );
      case 'busy':
        return (
          <div className="flex items-center gap-1.5 bg-[#FFB800]/15 px-2.5 py-1 rounded-full border border-[#FFB800]/30">
            <div className="w-2 h-2 rounded-full bg-[#FFB800]" />
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              {label}
            </span>
          </div>
        );
      case 'closed':
      default:
        return (
          <div className="flex items-center gap-1.5 bg-[#ba1a1a]/10 px-2.5 py-1 rounded-full border border-[#ba1a1a]/20">
            <div className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
            <span className="text-[11px] font-bold text-[#ba1a1a] uppercase tracking-wider">
              {label}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full relative pb-28 pt-24 px-4 max-w-[1280px] mx-auto min-h-screen">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] sm:text-[32px] font-bold text-[#121b2e] leading-tight">
            Digital Campus
          </h1>
          <p className="text-[#434654] text-[15px]">
            Real-time facility status and utilization map.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
          <div className="bg-[#e9edff]/70 rounded-2xl p-5 shadow-sm flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform border border-white/60">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1550d3]/10 to-transparent pointer-events-none" />
            <span className="material-symbols-outlined text-[#1550d3] text-[28px] fill-1">
              groups
            </span>
            <span className="text-[28px] sm:text-[34px] font-bold text-[#121b2e] mt-1 z-10 leading-tight">
              4,201
            </span>
            <span className="text-[12px] font-medium text-[#434654] z-10">
              Active Students
            </span>
          </div>

          <div className="bg-[#e9edff]/70 rounded-2xl p-5 shadow-sm flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform border border-white/60">
            <div className="absolute inset-0 bg-gradient-to-br from-[#008562]/10 to-transparent pointer-events-none" />
            <span className="material-symbols-outlined text-[#008562] text-[28px] fill-1">
              sensors
            </span>
            <span className="text-[28px] sm:text-[34px] font-bold text-[#121b2e] mt-1 z-10 leading-tight">
              92%
            </span>
            <span className="text-[12px] font-medium text-[#434654] z-10">
              Network Health
            </span>
          </div>
        </div>

        {/* Facilities Section */}
        <section className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#121b2e]">
              Facilities
            </h2>
            <button
              onClick={onOpenCampusMap}
              className="text-[#1550d3] text-[13px] font-semibold flex items-center gap-1.5 hover:text-[#1a53d6] bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs active:scale-95 transition-all"
            >
              <span>Map View</span>
              <span className="material-symbols-outlined text-[18px]">map</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredFacilities.map((facility) => {
              const hasDetails =
                facility.activeRooms !== undefined && facility.occupancy !== undefined;

              return (
                <div
                  key={facility.id}
                  onClick={() => onOpenFacilityModal(facility)}
                  className="bg-[#e9edff]/60 hover:bg-[#e9edff]/90 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 border border-white/70 cursor-pointer"
                >
                  <div className="flex items-start justify-between z-10 relative">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#1550d3] group-hover:scale-105 transition-transform border border-slate-100">
                        <span className="material-symbols-outlined text-[26px] fill-1">
                          {facility.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[16px] sm:text-[17px] font-bold text-[#121b2e] group-hover:text-[#1550d3] transition-colors">
                          {facility.name}
                        </h3>
                        <p className="text-[13px] text-[#434654]">{facility.category}</p>
                      </div>
                    </div>

                    {getStatusBadge(facility.status, facility.statusLabel)}
                  </div>

                  {/* Optional detail row if available */}
                  {hasDetails && (
                    <div className="flex gap-6 z-10 relative border-t border-[#c3c5d7]/30 pt-3 mt-3">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold text-[#737686] uppercase">
                          Rooms
                        </span>
                        <span className="text-[14px] font-bold text-[#121b2e]">
                          {facility.activeRooms} Active
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold text-[#737686] uppercase">
                          Occupancy
                        </span>
                        <span className="text-[14px] font-bold text-[#121b2e]">
                          {facility.occupancy} Students
                        </span>
                      </div>
                      <div className="ml-auto flex items-center text-[12px] text-[#1550d3] font-semibold">
                        <span>ดูแผนผัง & จอง ➔</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Digital Twin Section */}
        <section className="flex flex-col gap-3.5">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#121b2e]">
            Digital Twin
          </h2>

          <div className="bg-[#273044] rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden text-[#edf0ff] border border-slate-700/60">
            {/* Tech Matrix Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="flex flex-col gap-4 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[12px] font-bold text-[#d9e2fc] tracking-widest uppercase">
                  LIVE NODE MAP
                </span>
                <span className="material-symbols-outlined text-[#b5c4ff] animate-spin text-[22px] [animation-duration:8s]">
                  radar
                </span>
              </div>

              {/* Node List */}
              <div className="flex flex-col gap-2.5">
                {MOCK_DIGITAL_TWIN.map((node) => {
                  const isOptimal = node.status === 'optimal';
                  const isAlert = node.status === 'alert';

                  return (
                    <div
                      key={node.id}
                      onClick={() => onOpenNodeModal(node)}
                      className="bg-white/10 hover:bg-white/15 rounded-2xl p-3.5 flex items-center justify-between backdrop-blur-md border border-white/10 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[20px]">
                            {node.icon}
                          </span>
                        </div>
                        <div>
                          <span className="text-[14px] font-bold text-white block">
                            {node.code}
                          </span>
                          <span className="text-[11px] text-white/60">{node.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-medium text-white/80">
                          {node.statusText}
                        </span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isOptimal
                              ? 'bg-[#20C997] shadow-[0_0_10px_rgba(32,201,151,0.8)]'
                              : isAlert
                              ? 'bg-[#FF4F4F] shadow-[0_0_10px_rgba(255,79,79,0.8)] animate-pulse'
                              : 'bg-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.8)]'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#20C997]"></div>
              <span className="text-[12px] font-medium text-[#434654]">Optimal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFB800]"></div>
              <span className="text-[12px] font-medium text-[#434654]">Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF4F4F]"></div>
              <span className="text-[12px] font-medium text-[#434654]">Alert</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
