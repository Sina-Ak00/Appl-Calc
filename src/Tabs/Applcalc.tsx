import { useState, useEffect } from "react";
import moment from "moment-jalaali";
import "moment/locale/fa";

const templates = [
  {
    id: 1,
    title: "کد تخفیف - نات اکتیو - غیر قابل تمدید",
    text: `سلام عرض ادب و احترام سلام عرض ادب و احترام 

متاسفانه پیرو اعمال حساسیت های جدید اپل  به فمیلی ها و اپل آیدی ها  ,  فمیلی شما با مشکل فنی مواجه شده  ( این موضوع به صورت سراسری اتفاق افتاده)
 علی رغم تلاش های فراوانی که انجام شد امکان فعالسازی مجدد و یا تمدید فمیلی شما وجود نداره 
مجدد بابت اتفاق پیش آمده عذرخواهی می کنیم 

از اشتراک شما [DAYS] روز باقی مانده 
هزینه اشتراک این تعداد روز رو به صورت کد تخفیف تقدیمتون می کنم 
با استفاده از کد می تونید برای فمیلی جدید  ثبت سفارش انجام بدید تا اشتراک دوماهه جدید  براتون فعال بشه 
این کد برای سایر محصولات موجود در سایت هم قابل استفاده است و طی 24 ساعت اینده فعال خواهد شد 

کد تخفیف به مبلغ  [PRICE]  تومان تقدیم شما  : [CODE]
از همراهی شما با لایسنس مارکت سپاسگزاریم`,
  },
  {
    id: 2,
    title: "کد تخفیف - اپل موزیک - قابل تمدید",
    text: `سلام عرض ادب و احترام 
با توجه به محدودیت هایی که سرویس دهنده اعمال می کند ممکن است اشتراک شما 1 الی 10 روز زودتر از موعد مقرر به اتمام برسد
هزینه اشتراک این تعداد رو ز رو به صورت کد تخفیف تقدیمتون می کنم تا در سفارش تمدیدتون استفاده بفرمایین 
کد تخفیف به ازای [DAYS] روز به مبلغ [PRICE] تومان تقدیم شما : [CODE]

این کد برای سایر محصولات موجود در سایت هم قابل استفاده است و طی 24 ساعت اینده فعال خواهد شد 
***جهت تمدید اشتراک ***  می تونید از طریق لینک زیر سفارشتون رو ثبت بفرمایین 

https://license-market.ir/product/Apple-Music

در صفحه ی باز شده در قسمت "انتخاب مدت زمان اشتراک" گزینه ی "2ماهه" را انتخاب بفرمایین و در نهایت فرآیند ثبت اطلاعات و پرداخت رو انجام بدید 

پس از ثبت سفارش فمیلی شما تمدیدخواهد شد

از همراهی شما با لایسنس مارکت سپاسگزاریم`,
  },
  {
    id: 3,
    title: "کد تخفیف - اپل وان - قابل تمدید",
    text: `سلام عرض ادب و احترام 
با توجه به محدودیت هایی که سرویس دهنده اعمال می کند ممکن است اشتراک شما 1 الی 10 روز زودتر از موعد مقرر به اتمام برسد
هزینه اشتراک این تعداد رو ز رو به صورت کد تخفیف تقدیمتون می کنم تا در سفارش تمدیدتون استفاده بفرمایین 
کد تخفیف به ازای [DAYS] روز به مبلغ [PRICE] تومان تقدیم شما : [CODE]      

این کد برای سایر محصولات موجود در سایت هم قابل استفاده است و طی 24 ساعت اینده فعال خواهد شد 
***جهت تمدید اشتراک***  می تونید از طریق لینک زیر سفارشتون رو ثبت بفرمایین 

https://license-market.ir/product/Apple-One

هنگامی که گزینه ی خرید اشتراک رو انتخاب کردید صفحه ای برای شما باز خواهد شد که دو گزینه دارد :
1- فمیلی جدید (ارسال آنی)
2- تمدید فمیلی قبلی 

در این مرحله می بایست گزینه ی دوم یعنی تمدیدفمیلی رو انتخاب و در نهایت فرآیند ثبت اطلاعات و پرداخت رو انجام بدید 

پس از ثبت سفارش فمیلی شما تمدیدخواهد شد

از همراهی شما با لایسنس مارکت سپاسگزاریم
`,
  },
  {
    id: 4,
    title: "کد تخفیف - اکلود - قابل تمدید",
    text: `"سلام عرض ادب و احترام 
با توجه به محدودیت هایی که سرویس دهنده اعمال می کند ممکن است اشتراک شما 1 الی 10 روز زودتر از موعد مقرر به اتمام برسد
هزینه اشتراک این تعداد رو ز رو به صورت کد تخفیف تقدیمتون می کنم تا در سفارش تمدیدتون استفاده بفرمایین 
کد تخفیف به ازای [DAYS] روز به مبلغ [PRICE] تومان تقدیم شما : [CODE]

این کد برای سایر محصولات موجود در سایت هم قابل استفاده است و طی 24 ساعت اینده فعال خواهد شد 
***جهت تمدید اشتراک*** می تونید از طریق لینک زیر سفارشتون رو ثبت بفرمایین 

https://license-market.ir/product/iCloud

هنگامی که گزینه ی خرید اشتراک رو انتخاب کردید صفحه ای برای شما باز خواهد شد که دو گزینه دارد :
1- فمیلی جدید (ارسال آنی)
2- تمدید فمیلی قبلی 

در این مرحله می بایست گزینه ی دوم یعنی تمدیدفمیلی رو انتخاب و در نهایت فرآیند ثبت اطلاعات و پرداخت رو انجام بدید 

پس از ثبت سفارش فمیلی شما تمدیدخواهد شد

از همراهی شما با لایسنس مارکت سپاسگزاریم"

`,
  },
];

type CalcData = {
  code: string;
  startDate: string;
  endDate: string;
  price: number | "";
};

function Applcalc() {
  const [form, setForm] = useState<CalcData>({
    code: "",
    startDate: "",
    endDate: "",
    price: 299000,
  });
  const [selectedId, setSelectedId] = useState<number>(1);
  const [days, setDays] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<String | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [randchar, setRandchar] = useState<string | null>(null);
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
    setRandchar((Math.random() + 1).toString(36).substring(7))
    const start = moment(form.startDate, "jYYYY-jMM-jDD");
    const end = moment(form.endDate, "jYYYY-jMM-jDD");
    const diffDays = subTime - (end.diff(start, "days") + 1);
    setDays(diffDays);
    const res = (Number(form.price) / 60) * diffDays;
    const rounded = Math.ceil(res / 1000) * 1000;
    setResult(rounded);
  };

  const formattedCode = form.code ? `${form.code.replace("OR0000  ", "LM")+ randchar}` : "";

  //tooltip
  useEffect(() => {
    // If the tooltip is shown
    if (tooltip) {
      // Set a timer to hide it after 2 seconds (2000ms)
      const timer = setTimeout(() => {
        setTooltip("");
      }, 2000);

      // Clean up the timer if the component unmounts or 'tooltip' changes again
      return () => clearTimeout(timer);
    }
  }, [tooltip]);

  const template = templates.find((t) => t.id === selectedId)!;

  const replacedText = template.text
    .replace(/\[DAYS\]/g, days !== null ? String(days) : "")
    .replace(
      /\[PRICE\]/g,
      result !== null
        ? String(result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
        : ""
    )
    .replace(/\[CODE\]/g, formattedCode);
  return (
    <>
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
      <div>
        <label className="block text-sm mb-1 text-zinc-300 text-right">
          نوع سرویس
        </label>
        <select
          className="w-full p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-zinc-100 text-center placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
        >
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
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
            <div className="relative">
              <div
                className="p-2 rounded-lg bg-[#1f1f23] border border-[#333] text-center"
                onClick={() => {
                  navigator.clipboard.writeText(String(days));
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
                  navigator.clipboard.writeText(
                    String(
                      result?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    )
                  );
                  setTooltip("pricetopay");
                }}
              >
                {result?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
                navigator.clipboard.writeText(
                  `${formattedCode}\n${result
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
                );
                setTooltip("code");
              }}
            >
              {formattedCode}
              <br></br>
              {result?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
            {tooltip === "code" && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md">
                کپی شد!
              </span>
            )}
          </div>
        </div>
      )}
      {days && (
        <div className="relative ">
          <textarea
            className="border p-3 rounded w-full h-120"
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(replacedText);
              setTooltip("richtext");
            }}
            value={replacedText}
          />
          {tooltip === "richtext" && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md">
              کپی شد!
            </span>
          )}
        </div>
      )}
    </>
  );
}
export default Applcalc;
