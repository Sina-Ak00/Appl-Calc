import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import "moment/locale/fa";

type CalcData = {
  code: string;
  startDate: string;
  endDate: string;
  price: number | "";
};

function App() {
  const [form, setForm] = useState<CalcData>({
    code: "OR0000907105A",
    startDate: "",
    endDate: "",
    price: "299000",
  });
  const [days, setDays] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<String | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const subTime = 60;
  // Load cached data
  useEffect(() => {
    const cached = localStorage.getItem("jalaliCalcData");
    if (cached) setForm(JSON.parse(cached));
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("jalaliCalcData", JSON.stringify(form));
  }, [form]);

  const handleChange = (key: keyof CalcData, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    if (!form.startDate || !form.endDate || !form.price) return;

    const start = moment(form.startDate, "jYYYY-jMM-jDD");
    const end = moment(form.endDate, "jYYYY-jMM-jDD");
    const diffDays = subTime - (end.diff(start, "days") + 1);
    setDays(diffDays);
    const res = (Number(form.price) / 60) * diffDays;
    const rounded = Math.ceil(res / 1000) * 1000;
    setResult(rounded);
  };

  const formattedCode = form.code ? `${form.code.replace("OR0000", "LM")}` : "";

  //tooltip
  useEffect(() => {
    // If the tooltip is shown
    if (tooltip) {
      // Set a timer to hide it after 2 seconds (2000ms)
      const timer = setTimeout(() => {
        setTooltip(false);
      }, 2000);

      // Clean up the timer if the component unmounts or 'tooltip' changes again
      return () => clearTimeout(timer);
    }
  }, [tooltip]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 text-zinc-100">
      <div className="w-full max-w-xl bg-[#18181b] border border-[#2a2a2e] rounded-2xl shadow-lg p-6 space-y-5 transition-all">
        <h1 className="text-xl font-semibold text-center text-zinc-100">
          Apple – Off Calculator
        </h1>

        {/* Code */}
        <div>
          <label className="block text-sm mb-1 text-zinc-300">Code</label>
          <input
            type="text"
            dir="ltr"
            value={form.code}
            onChange={(e) => handleChange("code", e.target.value)}
            className="w-full p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter code"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-zinc-300 text-right">
              تاریخ تحویل
            </label>
            <input
              type="text"
              placeholder="1403-07-01"
              value={form.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-zinc-100 text-center placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-zinc-300 text-right">
              تاریخ پایان سرویس
            </label>
            <input
              type="text"
              placeholder="1403-07-10"
              value={form.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="w-full p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-zinc-100 text-center placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm mb-1 text-zinc-300 text-right">
            قیمت سرویس
          </label>
          <input
            type="number"
            placeholder="Enter price"
            value={form.price}
            onChange={(e) =>
              handleChange(
                "price",
                e.target.value ? Number(e.target.value) : ""
              )
            }
            className="w-full p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-medium transition-all"
          >
            محاسبه
          </button>
          <button
            onClick={() => {
              setForm({ code: "", startDate: "", endDate: "", price: "" });
              setDays(null);
              setResult(null);
              localStorage.removeItem("jalaliCalcData");
            }}
            className="flex-1 bg-[#27272a] hover:bg-[#323236] text-zinc-300 py-2 rounded-lg font-medium transition-all"
          >
            حذف داده‌ها
          </button>
        </div>

        {/* Results */}
        {days !== null && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm mb-1 text-zinc-300 text-right">
                اختلاف روزها
              </label>
              <div className="relative">
                <div
                  className="p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-center"
                  onClick={() => {
                    navigator.clipboard.writeText(days);
                    setTooltip("diffdays");
                  }}
                >
                  {days}
                </div>
                {tooltip === "diffdays" && (
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md">
                    کپی شد! 
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300 text-right">
                اعتبار به مشتری
              </label>
              <div className="relative">
                <div
                  className="p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-center"
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    setTooltip("pricetopay");
                  }}
                >
                  {result?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                {tooltip === "pricetopay" && (
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md">
                    کپی شد!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {form.code && (
          <div className="mt-4">
            <label className="block text-sm mb-1 text-zinc-300 text-right">
              کد تخفیف
            </label>
            <div className="relative">
              <div
                className="p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-center "
                onClick={() => {
                  navigator.clipboard.writeText(formattedCode);
                  setTooltip("code");
                }}
              >
                {formattedCode}
              </div>
              {tooltip === "code" && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md">
                  کپی شد! 
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
