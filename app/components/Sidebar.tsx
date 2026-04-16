import Link from "next/link";

function FinityLogo({ white = false }: { white?: boolean }) {
  const color = white ? "#ffffff" : "#000000";
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2C5.8 2 4 3.8 4 6C4 8.2 5.8 10 8 10C10.2 10 12 8.2 12 6C12 3.8 10.2 2 8 2Z" fill={color} />
        <path d="M8 14C5.8 14 4 15.8 4 18C4 20.2 5.8 22 8 22C10.2 22 12 20.2 12 18C12 15.8 10.2 14 8 14Z" fill={color} />
        <path d="M16 2C13.8 2 12 3.8 12 6C12 8.2 13.8 10 16 10C18.2 10 20 8.2 20 6C20 3.8 18.2 2 16 2Z" fill={color} />
        <path d="M16 14C13.8 14 12 15.8 12 18C12 20.2 13.8 22 16 22C18.2 22 20 20.2 20 18C20 15.8 18.2 14 16 14Z" fill={color} />
      </svg>
      <span
        className="font-bold text-xl tracking-tight"
        style={{ color }}
      >
        Finity
      </span>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-black flex flex-col justify-between p-8 min-h-screen">
      <FinityLogo white />
      <div className="flex flex-col gap-3">
        <p className="text-white font-semibold text-xl">Worker portal</p>
        <p className="text-sm text-[#555]">
          Need help?{" "}
          <Link href="#" className="text-[#FF885D] hover:underline">
            Get in touch
          </Link>
        </p>
      </div>
    </aside>
  );
}
