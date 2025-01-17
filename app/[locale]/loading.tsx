import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 animate-pulse bg-white z-[9000] flex flex-1 items-center justify-center">
        <Image src="/logo-vazado.png" alt="Loading" width={200} height={200} />
        </div>
    );
}