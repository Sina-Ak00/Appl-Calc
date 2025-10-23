import React, { useState,useEffect } from "react";
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
    price: "",
  });
  const [days, setDays] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

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
    const diffDays = end.diff(start, "days");
    setDays(diffDays);
    const res = (Number(form.price) / 60) * diffDays;
    setResult(Number(res.toFixed(2)));
  };

  const formattedCode = form.code ? `${form.code.replace('OR0000','LM')}` : "";

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
              handleChange("price", e.target.value ? Number(e.target.value) : "")
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
              <div className="p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-center">
                {days+1}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300 text-right">
                اعتبار به مشتری
              </label>
              <div className="p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-center">
                {Math.round(result)}
              </div>
            </div>
          </div>
        )}

        {form.code && (
          <div className="mt-4">
            <label className="block text-sm mb-1 text-zinc-300 text-right">
              کد تخفیف
            </label>
            <div className="p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-center">
              {formattedCode}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
