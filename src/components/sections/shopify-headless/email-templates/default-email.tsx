import * as React from "react";

/**
 * The default Shopify "Order confirmation" email — exactly as boring as it
 * arrives in your inbox. Times New Roman-ish stack, table layout, generic
 * placeholder logo, plain text everywhere.
 */
export function DefaultEmail() {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto bg-white text-[#1a1a1a]"
      style={{
        fontFamily:
          "-apple-system, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Mail app header */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#eee] bg-[#f6f6f6] px-4 pt-9 pb-2 text-[11px] text-[#555]">
        <span>‹ Inbox</span>
        <span>Order #1042</span>
        <span>⋯</span>
      </div>

      {/* Email content */}
      <div className="px-5 py-4 text-[11px]">
        <p className="text-[#888]">From: noreply@plainskin.in</p>
        <p className="mt-0.5 text-[#888]">To: priya@gmail.com</p>
        <p className="mt-2.5 text-[14px] font-bold leading-tight">
          Thank you for your order!
        </p>
        <p className="mt-1 text-[10px] text-[#888]">June 18, 2024 · 10:42 AM</p>

        <div className="mt-4 border-t border-[#eee] pt-4">
          {/* Generic placeholder logo */}
          <div className="mx-auto mb-4 h-10 w-24 rounded-sm border border-[#ccc] bg-[#f5f5f5]" />

          <p className="text-center text-[12px] font-bold uppercase tracking-wide">
            ORDER #1042
          </p>
          <p className="mt-1 text-center text-[10px] text-[#666]">
            We&apos;ll send you a shipping confirmation email when your order
            ships.
          </p>

          <hr className="my-4 border-[#eee]" />

          <p className="text-[11px] font-bold">Order summary</p>
          <table className="mt-2 w-full border-collapse text-[10px]">
            <tbody>
              <tr className="border-b border-[#eee]">
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="size-8 shrink-0 border border-[#ddd] bg-[#f0f0f0]" />
                    <div>
                      <div>Hydrating Serum</div>
                      <div className="text-[#888]">× 1</div>
                    </div>
                  </div>
                </td>
                <td className="text-right">₹1,890</td>
              </tr>
              <tr className="border-b border-[#eee]">
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="size-8 shrink-0 border border-[#ddd] bg-[#f0f0f0]" />
                    <div>
                      <div>SPF 40 Daily</div>
                      <div className="text-[#888]">× 1</div>
                    </div>
                  </div>
                </td>
                <td className="text-right">₹1,650</td>
              </tr>
              <tr>
                <td className="py-2 text-[#888]">Shipping</td>
                <td className="text-right">Free</td>
              </tr>
              <tr>
                <td className="py-2 font-bold">Total</td>
                <td className="text-right font-bold">₹3,540</td>
              </tr>
            </tbody>
          </table>

          <hr className="my-4 border-[#eee]" />

          <p className="text-[10px] text-[#555]">
            If you have any questions, reply to this email or contact us at
            support@plainskin.in.
          </p>

          <p className="mt-4 text-center text-[9px] text-[#aaa]">
            © 2024 plainskin.in · Powered by Shopify
          </p>
        </div>
      </div>
    </div>
  );
}
