"use client";

// Reemplaza data-ad-client y data-ad-slot con tus valores de Google AdSense
// cuando tengas tu cuenta aprobada.
export default function AdBanner({ slot }: { slot: string }) {
  if (process.env.NODE_ENV !== "production") {
    return (
      <div className="w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-sm">
        Espacio publicitario (AdSense — solo visible en producción)
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: "block" }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // <- tu publisher ID
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
