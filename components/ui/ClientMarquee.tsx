import Image from "next/image";
import { MarqueeController } from "@/components/ui/MarqueeController";

type Client = { name: string; logo: string; width: number; height: number };

/** Logos server-rendered; solo el control de pausa es cliente. */
export function ClientMarquee({ items }: { items: readonly Client[] }) {
  return (
    <MarqueeController>
      <div className="relative">
        <div className="overflow-hidden">
          <ul className="flex w-max animate-marquee items-center gap-10 motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-8 md:gap-14">
            {items.map((client) => <LogoItem key={client.name} client={client} />)}
            {items.map((client) => <LogoItem key={`dup-${client.name}`} client={client} duplicate />)}
          </ul>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-ink-800 to-ink-800/0 motion-reduce:hidden md:w-24" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink-800 to-ink-800/0 motion-reduce:hidden md:w-24" />
      </div>
    </MarqueeController>
  );
}

function LogoItem({ client, duplicate = false }: { client: Client; duplicate?: boolean }) {
  return (
    <li aria-hidden={duplicate || undefined} className={`flex h-10 w-[130px] shrink-0 items-center justify-center sm:w-[150px] ${duplicate ? "motion-reduce:hidden" : ""}`}>
      <Image src={client.logo} alt={duplicate ? "" : client.name} width={client.width} height={client.height} sizes="150px" style={{ width: "auto", height: "auto" }} className="max-h-full max-w-full object-contain opacity-70" />
    </li>
  );
}
