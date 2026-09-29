export default function SidebarRight() {
  const latestUsers = [
    { name: "Cbl4", username: "zirael", avatar: "C" },
    { name: "Haro_Maro", username: "Saeed Haroun", avatar: "H" },
    { name: "Mola_Tola", username: "Mostafa Mahanna", avatar: "M" },
  ];

  const mostFollowed = [
    { name: "Admin", username: "Legal Unicorn", avatar: "A" },
    { name: "tt", username: "tabs", avatar: "T" },
    { name: "LegalUnicorn", username: "tester", avatar: "L" },
  ];

  return (
    <aside className="w-72 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 flex flex-col gap-5">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
          <h3 className="text-white font-bold text-sm mb-4">Latest users</h3>
          <div className="flex flex-col gap-3">
            {latestUsers.map((u, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 text-sm">
                    {u.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white leading-tight">
                      {u.name}
                    </div>
                    <div className="text-xs text-zinc-500">{u.username}</div>
                  </div>
                </div>
                <button className="bg-zinc-200 text-zinc-900 hover:bg-white text-xs font-semibold px-3 py-1.5 rounded-full transition">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
          <h3 className="text-white font-bold text-sm mb-4">Most followed</h3>
          <div className="flex flex-col gap-3">
            {mostFollowed.map((u, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 text-sm">
                    {u.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white leading-tight">
                      {u.name}
                    </div>
                    <div className="text-xs text-zinc-500">{u.username}</div>
                  </div>
                </div>
                <button className="bg-zinc-200 text-zinc-900 hover:bg-white text-xs font-semibold px-3 py-1.5 rounded-full transition">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 text-xs text-zinc-400">
          <h3 className="text-white font-bold text-sm mb-3">Announcements</h3>
          <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
            <li>Trying my best to get this thing to work 🫠</li>
            <li>Duct tape and console.logs are holding the server together.</li>
          </ul>
          <div className="mt-4 text-zinc-500 text-[11px]">
            Last updated: 29 Sept 2026
          </div>
        </div>
      </div>
    </aside>
  );
}
