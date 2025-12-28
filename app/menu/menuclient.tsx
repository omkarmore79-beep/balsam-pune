"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ================= DATA ================= */

const CATEGORIES = ["Hot Coffee", "Cold Coffee", "Shakes", "Snacks"] as const;
type Category = (typeof CATEGORIES)[number];

type MenuItem = {
  name: string;
  price: number;
  image: string;
  isVeg: boolean;
  isRecommended?: boolean;
};

const MENU: Record<Category, MenuItem[]> = {
  "Hot Coffee": [
    { name: "Cappuccino", price: 120, image: "/menu/cappuccino.jpg", isVeg: true, isRecommended: true },
    { name: "Café Latte", price: 130, image: "/menu/latte.jpg", isVeg: true },
  ],
  "Cold Coffee": [
    { name: "Cold Coffee", price: 140, image: "/menu/cold-coffee.jpg", isVeg: true },
    { name: "Chocolate Cold Coffee", price: 160, image: "/menu/choco-cold-coffee.jpg", isVeg: true, isRecommended: true },
  ],
  Shakes: [
    { name: "Chocolate Shake", price: 170, image: "/menu/choco-shake.jpg", isVeg: true },
    { name: "Strawberry Shake", price: 160, image: "/menu/strawberry-shake.jpg", isVeg: true },
  ],
  Snacks: [
    { name: "French Fries", price: 110, image: "/menu/fries.jpg", isVeg: true, isRecommended: true },
    { name: "Garlic Bread", price: 140, image: "/menu/garlic-bread.jpg", isVeg: true },
  ],
};

const OWNER_PHONE = "919999999999";
const TABLES = Array.from({ length: 20 }, (_, i) => i + 1);

/* ================= PAGE ================= */

export default function MenuClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("from") === "landing") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [tableSelected, setTableSelected] = useState(false);

  const [activeCategory, setActiveCategory] = useState<Category>("Hot Coffee");
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [showWaiterView, setShowWaiterView] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");

  /* ================= HELPERS ================= */

  function addItem(name: string) {
    setCart((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  }

  function removeItem(name: string) {
    setCart((prev) => {
      const qty = (prev[name] || 0) - 1;
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      return { ...prev, [name]: qty };
    });
  }

  const allItems = Object.values(MENU).flat();

  const visibleItems = search
    ? allItems.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      )
    : MENU[activeCategory];

  const cartItems = Object.entries(cart)
    .map(([name, qty]) => {
      const found = allItems.find((i) => i.name === name);
      return found ? { ...found, qty } : null;
    })
    .filter(Boolean) as (MenuItem & { qty: number })[];

  const totalItems = cartItems.reduce((a, b) => a + b.qty, 0);
  const totalAmount = cartItems.reduce((a, b) => a + b.qty * b.price, 0);

  function sendWhatsAppOrder() {
    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    let message = `☕ *New Dine-In Order*\n*balsam-pune*\n\n`;
    message += `Customer: ${customerName}\nTable: ${tableNumber}\n\n`;

    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.name} × ${item.qty} – ₹${item.price * item.qty}\n`;
    });

    if (note.trim()) message += `\nNote: ${note}`;
    message += `\n\nTotal: ₹${totalAmount}`;

    window.open(
      `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  /* ================= TABLE SELECTION ================= */

  if (!tableSelected) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <p className="text-gray-700 text-sm mb-6">
            Select your table to continue
          </p>

          <div className="grid grid-cols-4 gap-3">
            {TABLES.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTableNumber(t);
                  setTableSelected(true);
                }}
                className="border border-black/30 text-black py-3 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition"
              >
                Table {t}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  /* ================= MENU ================= */

  return (
    <main className="min-h-screen bg-white pb-28">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white border-b border-black/10">
        <div className="flex items-center justify-center py-3">
        </div>

        {/* SEARCH */}
        <div className="px-4 pb-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coffee, shakes, snacks…"
            className="w-full bg-gray-100 text-black placeholder-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
          />
        </div>

        {/* CATEGORY CHIPS */}
        {!search && (
          <div className="flex gap-2 overflow-x-auto px-4 pb-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ITEMS */}
      <section className="px-4 py-6 grid grid-cols-2 gap-4">
        {visibleItems.map((item) => {
          const qty = cart[item.name] || 0;

          return (
            <div
              key={item.name}
              className="rounded-2xl border border-black/10 shadow-sm bg-white overflow-hidden"
            >
              <div className="relative">
                <img src={item.image} className="w-full h-36 object-cover" />

                <span
                  className={`absolute top-2 right-2 w-3 h-3 rounded-full ring-2 ring-white ${
                    item.isVeg ? "bg-green-600" : "bg-red-600"
                  }`}
                />

                {item.isRecommended && (
                  <span className="absolute top-2 left-2 text-[10px] bg-black text-white px-2 py-0.5 rounded-full">
                    Chef’s Pick
                  </span>
                )}
              </div>

              <div className="p-3">
                <p className="text-sm font-semibold text-black">
                  {item.name}
                </p>

                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-black">
                    ₹{item.price}
                  </span>

                  {qty === 0 ? (
                    <button
                      onClick={() => addItem(item.name)}
                      className="text-xs bg-black text-white px-4 py-1.5 rounded-full"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeItem(item.name)}
                        className="w-6 h-6 border border-black/30 rounded-full"
                      >
                        −
                      </button>
                      <span className="text-sm text-black">{qty}</span>
                      <button
                        onClick={() => addItem(item.name)}
                        className="w-6 h-6 border border-black/30 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CART BAR */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white px-4 py-3 flex justify-between">
          <div>
            <p className="text-sm">{totalItems} items</p>
            <p className="text-xs opacity-80">₹{totalAmount}</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="bg-white text-black px-5 py-2 rounded-full text-sm"
          >
            View Cart
          </button>
        </div>
      )}

      {/* CART SCREEN */}
      {showCart && (
  <div className="fixed inset-0 bg-white z-50 overflow-auto">
    {/* HEADER */}
    <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center">
      <button
        onClick={() => setShowCart(false)}
        className="text-sm text-black font-medium"
      >
        ← Back
      </button>
      <h2 className="ml-4 text-lg font-semibold text-black">
        Your Order
      </h2>
    </div>

    {/* CONTENT */}
    <div className="p-4 space-y-6">
      {/* ITEMS */}
      <div className="bg-gray-50 border rounded-xl p-4">
        {cartItems.map((item) => (
          <div
            key={item.name}
            className="flex justify-between py-2 text-sm text-black"
          >
            <span>{item.name} × {item.qty}</span>
            <span className="font-medium">
              ₹{item.price * item.qty}
            </span>
          </div>
        ))}

        <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-black">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* CUSTOMER INFO */}
      <div className="space-y-3">
        <input
          placeholder="Your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full bg-white border border-gray-300 text-black placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30"
        />

        <textarea
          placeholder="Notes (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full bg-white border border-gray-300 text-black placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30"
        />
      </div>

      {/* ACTIONS */}
      <div className="space-y-3">
        <button
          onClick={sendWhatsAppOrder}
          className="w-full bg-black text-white py-3 rounded-xl font-medium"
        >
          Send Order on WhatsApp
        </button>

        <button
          onClick={() => setShowWaiterView((v) => !v)}
          className="w-full border border-black/30 text-black py-3 rounded-xl text-sm font-medium"
        >
          Show Order to Waiter
        </button>
      </div>

      {/* WAITER VIEW */}
      {showWaiterView && (
        <div className="bg-gray-50 border rounded-xl p-4 text-sm text-black">
          <p className="font-semibold mb-2">Order for Waiter</p>
          <p className="mb-3 text-gray-700">
            Table: <span className="font-medium">{tableNumber}</span>
          </p>

          {cartItems.map((item) => (
            <div
              key={item.name}
              className="flex justify-between py-1"
            >
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="border-t mt-3 pt-2 font-semibold flex justify-between">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      )}
    </div>
  </div>
      )}

      {/* BRANDING */}
      <footer className="mt-16 py-6 text-center text-xs text-gray-600">
        <span className="font-medium text-black">Powered by TableOS</span>
      </footer>
    </main>
  );
}
