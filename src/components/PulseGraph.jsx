import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';

export default function PulseGraph({ data }) {
  const today = new Date();
  
  return (
    <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/60 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-zinc-400 font-semibold text-xs uppercase tracking-widest">Feed(Pulse);</h3>
      </div>
      
      <div className="w-full">
        <CalendarHeatmap
          startDate={new Date(today.getFullYear(), today.getMonth() - 6, today.getDate())}
          endDate={today}
          values={data}
          classForValue={(value) => {
            if (!value) return 'color-pulse-0';
            return `color-pulse-${Math.min(value.count, 4)}`;
          }}
          // This ties each square to the tooltip
          tooltipDataAttrs={(value) => {
            if (!value || !value.count) return { 'data-tooltip-id': 'pulse-tooltip', 'data-tooltip-content': 'No activity' };
            return {
              'data-tooltip-id': 'pulse-tooltip',
              'data-tooltip-content': `${value.count} interactions on ${value.date}`
            };
          }}
          showWeekdayLabels={false}
        />
      </div>

      {/* The Tooltip component that renders the popup */}
      <Tooltip id="pulse-tooltip" style={{ backgroundColor: '#18181b', color: '#fff', fontSize: '10px', borderRadius: '8px' }} />
      <div className="flex items-center gap-2 mt-8 text-[10px] text-zinc-600 justify-end">
  <span className="mr-1">Less</span>
  <div className="flex gap-1.5">
    <div className="w-3 h-3 bg-zinc-900 rounded-sm"></div>
    <div className="w-3 h-3 bg-red-900 rounded-sm"></div>
    <div className="w-3 h-3 bg-red-700 rounded-sm"></div>
    <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
    <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
  </div>
  <span className="ml-1">More</span>
</div>
      <style>{`
        .react-calendar-heatmap { width: 100%; }
        .react-calendar-heatmap rect { rx: 2; ry: 2; cursor: pointer; }
        .color-pulse-0 { fill: #18181b; }
        .color-pulse-1 { fill: #7f1d1d; }
        .color-pulse-2 { fill: #b91c1c; }
        .color-pulse-3 { fill: #ef4444; }
        .color-pulse-4 { fill: #f87171; }
      `}</style>
    </div>
  );
}