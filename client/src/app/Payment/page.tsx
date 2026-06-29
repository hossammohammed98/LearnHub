"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");
  const [agreed, setAgreed] = useState(false);
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const coursePrice = 2500;
  const tax = 350;
  const total = coursePrice + tax;

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div
      className="checkout-root"
      dir="rtl"
      style={{ fontFamily: "'Cairo', 'Segoe UI', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .checkout-root {
          min-height: 100vh;
          background: #f5f6fa;
          direction: rtl;
        }

        /* ── NAV ── */
        .nav {
          background: #fff;
          border-bottom: 1px solid #e8eaed;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand {
          font-size: 22px;
          font-weight: 700;
          color: #1a7a4a;
          letter-spacing: -0.5px;
        }
        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
        }
        .nav-links a {
          text-decoration: none;
          color: #444;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.15s;
        }
        .nav-links a:hover { color: #1a7a4a; }
        .nav-icons {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .nav-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #c8e6c9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #1a7a4a;
          font-weight: 700;
          cursor: pointer;
        }
        .nav-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        /* ── BREADCRUMB ── */
        .breadcrumb {
          padding: 14px 32px;
          font-size: 13px;
          color: #888;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .breadcrumb a { color: #888; text-decoration: none; }
        .breadcrumb a:hover { color: #1a7a4a; }
        .breadcrumb-sep { color: #ccc; }
        .breadcrumb-current { color: #1a7a4a; font-weight: 600; }

        /* ── LAYOUT ── */
        .checkout-layout {
          max-width: 960px;
          margin: 0 auto;
          padding: 8px 24px 48px;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          align-items: start;
        }

        /* ── CARD ── */
        .card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e4e7ec;
          padding: 28px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 24px;
          text-align: center;
        }

        /* ── PAYMENT METHOD TOGGLE ── */
        .method-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 28px;
        }
        .method-btn {
          padding: 14px 12px;
          border-radius: 8px;
          border: 1.5px solid #e4e7ec;
          background: #fff;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #666;
          font-family: inherit;
          font-weight: 500;
          transition: all 0.15s;
        }
        .method-btn.active {
          border-color: #1a7a4a;
          background: #f0faf4;
          color: #1a7a4a;
        }
        .method-btn svg { width: 22px; height: 22px; }

        /* ── FORM ── */
        .field-group { margin-bottom: 18px; }
        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 7px;
        }
        .field-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #e4e7ec;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          color: #1a1a2e;
          background: #fff;
          outline: none;
          transition: border-color 0.15s;
          direction: rtl;
        }
        .field-input::placeholder { color: #b0b8c4; }
        .field-input:focus { border-color: #1a7a4a; }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .input-with-icon {
          position: relative;
        }
        .input-with-icon .field-input {
          padding-left: 40px;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #b0b8c4;
          display: flex;
          align-items: center;
        }

        /* ── CHECKBOX ── */
        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 22px 0;
          font-size: 12.5px;
          color: #555;
          line-height: 1.6;
        }
        .checkbox-row input[type="checkbox"] {
          margin-top: 2px;
          width: 15px;
          height: 15px;
          accent-color: #1a7a4a;
          cursor: pointer;
          flex-shrink: 0;
        }
        .checkbox-row a { color: #1a7a4a; text-decoration: underline; }

        /* ── SUBMIT BTN ── */
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: #1a7a4a;
          color: #fff;
          border: none;
          border-radius: 9px;
          font-size: 16px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.15s, transform 0.1s;
        }
        .submit-btn:hover { background: #156038; }
        .submit-btn:active { transform: scale(0.99); }
        .submit-btn:disabled { background: #9ec9b2; cursor: not-allowed; }

        /* ── SSL FOOTER ── */
        .ssl-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
        }
        .ssl-label {
          font-size: 12px;
          color: #888;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .payment-logos {
          display: flex;
          gap: 8px;
        }
        .payment-logo {
          height: 22px;
          width: 36px;
          border-radius: 4px;
          background: #e4e7ec;
        }

        /* ── SUMMARY CARD ── */
        .summary-title {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 20px;
          text-align: right;
        }
        .course-preview {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        .course-thumbnail {
          width: 72px;
          height: 72px;
          border-radius: 8px;
          background: #0d1117;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .course-info { flex: 1; text-align: right; }
        .course-name {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 4px;
          line-height: 1.4;
        }
        .course-instructor {
          font-size: 12px;
          color: #777;
          margin-bottom: 6px;
        }
        .course-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: flex-end;
          font-size: 12px;
          color: #555;
        }
        .star { color: #f5a623; font-size: 13px; }

        /* ── PRICE ROWS ── */
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
        }
        .price-label { color: #666; }
        .price-value { color: #1a1a2e; font-weight: 500; }
        .price-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1.5px solid #e4e7ec;
          margin-top: 4px;
        }
        .price-total-label { font-size: 16px; font-weight: 700; color: #1a1a2e; }
        .price-total-value { font-size: 20px; font-weight: 800; color: #1a1a2e; }

        /* ── SECURE BADGE ── */
        .secure-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #f0faf4;
          border: 1px solid #c3e8d4;
          border-radius: 8px;
          padding: 10px 14px;
          margin: 18px 0;
          font-size: 13px;
          font-weight: 600;
          color: #1a7a4a;
        }

        /* ── TESTIMONIAL ── */
        .testimonial {
          background: #f9fafb;
          border-radius: 8px;
          padding: 14px;
          font-size: 12.5px;
          color: #555;
          line-height: 1.7;
          border-right: 3px solid #1a7a4a;
        }
        .testimonial-author {
          margin-top: 8px;
          font-size: 12px;
          color: #888;
          font-weight: 600;
        }

        @media (max-width: 720px) {
          .checkout-layout {
            grid-template-columns: 1fr;
            padding: 8px 16px 40px;
          }
          .nav { padding: 0 16px; }
          .breadcrumb { padding: 12px 16px; }
          .nav-links { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-icons">
          <div className="nav-avatar">أ</div>
          <button className="nav-icon-btn" aria-label="cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
          <button className="nav-icon-btn" aria-label="notifications">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </button>
        </div>

        <ul className="nav-links">
          <li><a href="#">المكتبة</a></li>
          <li><a href="#">مشترياتي</a></li>
          <li><a href="#">الدورات</a></li>
        </ul>

        <div className="nav-brand">تعلّم</div>
      </nav>

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <a href="#">الدورات</a>
        <span className="breadcrumb-sep">›</span>
        <a href="#">الذكاء الاصطناعي المتقدم</a>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">الدفع</span>
      </div>

      {/* MAIN LAYOUT */}
      <div className="checkout-layout">

        {/* LEFT: FORM */}
        <div className="card">
          <h1 className="card-title">إتمام عملية الدفع</h1>

          {/* Method Toggle */}
          <div className="method-toggle">
            <button
              className={`method-btn ${paymentMethod === "wallet" ? "active" : ""}`}
              onClick={() => setPaymentMethod("wallet")}
            >
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" stroke="none"/>
                <path d="M2 10h20"/>
              </svg>
              محفظة إلكترونية
            </button>
            <button
              className={`method-btn ${paymentMethod === "card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("card")}
            >
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M2 10h20"/>
                <path d="M6 15h4"/>
              </svg>
              بطاقة ائتمانية / ميزة
            </button>
          </div>

          {/* Card Form */}
          {paymentMethod === "card" && (
            <>
              <div className="field-group">
                <label className="field-label">اسم حامل البطاقة</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="الاسم كما هو مكتوب على البطاقة"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label className="field-label">رقم البطاقة</label>
                <div className="input-with-icon">
                  <input
                    className="field-input"
                    type="text"
                    placeholder="**** **** **** ****"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    inputMode="numeric"
                  />
                  <span className="input-icon">
                    <svg width="18" height="18" fill="none" stroke="#b0b8c4" strokeWidth="1.8" viewBox="0 0 24 24">
                      <rect x="2" y="5" width="20" height="14" rx="2"/>
                      <path d="M2 10h20"/>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">رمز التحقق (CVV)</label>
                  <div className="input-with-icon">
                    <input
                      className="field-input"
                      type="password"
                      placeholder="***"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      maxLength={4}
                      inputMode="numeric"
                    />
                    <span className="input-icon">
                      <svg width="16" height="16" fill="none" stroke="#b0b8c4" strokeWidth="1.8" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label">تاريخ الانتهاء</label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    inputMode="numeric"
                    style={{ direction: "ltr", textAlign: "center" }}
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "wallet" && (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#888", fontSize: "14px" }}>
              <svg width="48" height="48" fill="none" stroke="#b0b8c4" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 12px", display: "block" }}>
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="#b0b8c4" stroke="none"/>
                <path d="M2 10h20"/>
              </svg>
              سيتم إضافة خيارات المحفظة قريباً
            </div>
          )}

          {/* Checkbox */}
          <div className="checkbox-row">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree">
              أوافق على <a href="#">الشروط والأحكام</a> و <a href="#">سياسة الخصوصية</a>. سيتم حفظ بيانات بطاقتك بشكل مشفر لاستخدامها في عمليات الشراء القادمة.
            </label>
          </div>

          {/* Submit */}
          <button
            className="submit-btn"
            disabled={!agreed}
          >
            تأكيد والدفع الآن
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          {/* SSL */}
          <div className="ssl-footer">
            <div className="payment-logos">
              <div className="payment-logo" style={{ background: "#1a1f71", borderRadius: 4 }} />
              <div className="payment-logo" style={{ background: "#eb5c28", borderRadius: 4 }} />
              <div className="payment-logo" style={{ background: "#003087", borderRadius: 4 }} />
            </div>
            <div className="ssl-label">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              اتصال مشفر SSL
            </div>
          </div>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="card">
          <h2 className="summary-title">ملخص الطلب</h2>

          {/* Course Preview */}
          <div className="course-preview">
            <div className="course-info">
              <div className="course-name">الذكاء الاصطناعي المتقدم</div>
              <div className="course-instructor">د. أحمد محمود</div>
              <div className="course-rating">
                <span>(230 تقييم)</span>
                <span>4.9</span>
                <span className="star">★</span>
              </div>
            </div>
            <div className="course-thumbnail">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#1a7a4a" strokeWidth="1.5"/>
                <circle cx="16" cy="16" r="6" stroke="#1a7a4a" strokeWidth="1.5"/>
                <circle cx="16" cy="16" r="2" fill="#1a7a4a"/>
                <line x1="16" y1="4" x2="16" y2="8" stroke="#1a7a4a" strokeWidth="1.5"/>
                <line x1="16" y1="24" x2="16" y2="28" stroke="#1a7a4a" strokeWidth="1.5"/>
                <line x1="4" y1="16" x2="8" y2="16" stroke="#1a7a4a" strokeWidth="1.5"/>
                <line x1="24" y1="16" x2="28" y2="16" stroke="#1a7a4a" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>

          {/* Prices */}
          <div className="price-row">
            <span className="price-value">{coursePrice.toLocaleString("ar-EG")} ج.م</span>
            <span className="price-label">سعر الدورة</span>
          </div>
          <div className="price-row">
            <span className="price-value">{tax.toLocaleString("ar-EG")} ج.م</span>
            <span className="price-label">ضريبة القيمة المضافة (14%)</span>
          </div>
          <div className="price-total-row">
            <span className="price-total-value">{total.toLocaleString("ar-EG")} ج.م</span>
            <span className="price-total-label">الإجمالي</span>
          </div>

          {/* Secure Badge */}
          <div className="secure-badge">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            دفع آمن ومشفّر 100%
          </div>

          {/* Testimonial */}
          <div className="testimonial">
            "ساعدتني هذه المنصة في تطوير مهاراتي البرمجية بشكل مذهل. المحتوى دقيق واحترافي للغاية."
            <div className="testimonial-author">— سارة علي، مهندسة برمجيات</div>
          </div>
        </div>

      </div>
    </div>
  );
}