import React, { useState } from "react";
import styles from "./BookingForm.module.css";

const TIME_SLOTS = [
  "06:00 AM", "07:00 AM", "08:00 AM",
  "05:00 PM", "06:00 PM", "07:00 PM",
  "08:00 PM",
];

const SERVICES = [
  { id: "boxing", label: "Boxing", icon: "🥊" },
  { id: "muaythai", label: "Muay Thai", icon: "🥋" },
];

const PROGRAMS = [
  {
    id: "hybrid",
    label: "Hybrid Program (One-on-One)",
    shortLabel: "Hybrid (One-on-One)",
    desc: "Personalized training for faster results",
    price: "₹6500",
    originalPrice: "₹10000",
    features: ["5 days/week", "Unlimited access"],
    icon: "🥊",
    tag: "POPULAR",
  },
  {
    id: "elite",
    label: "Elite Program",
    shortLabel: "Elite Program",
    desc: "Complete transformation & peak performance",
    price: "₹13500",
    originalPrice: "₹18000",
    features: ["5 days/week", "Unlimited access"],
    icon: "👑",
    tag: "PREMIUM",
  },
];

const FOOTER_BADGES = [
  { icon: "🛡", title: "CERTIFIED TRAINERS", desc: "Experienced and trusted professionals" },
  { icon: "📅", title: "FLEXIBLE SCHEDULE", desc: "Sessions that fit your lifestyle" },
  { icon: "👤", title: "1-ON-1 SUPPORT", desc: "Personal attention every step of the way" },
  { icon: "🏆", title: "RESULT DRIVEN", desc: "Focused on real, measurable progress." },
];

export default function BookingForm({ isOpen = true, onClose = () => {}, embedded = false }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    program: "",
    preferredTime: "",
  });
  const [serviceOpen, setServiceOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const selectService = (id) => { setForm({ ...form, service: id }); setServiceOpen(false); };
  const selectProgram = (id) => { setForm({ ...form, program: id }); setProgramOpen(false); };
  const selectTime = (slot) => setForm({ ...form, preferredTime: slot });

  const selectedService = SERVICES.find((s) => s.id === form.service);
  const selectedProg = PROGRAMS.find((p) => p.id === form.program);

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.phone || !form.program || !form.preferredTime) {
      setErrorMsg("Please fill in all fields and select a time slot.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const response = await fetch("http://localhost:8080/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          mobile: form.phone,
          programType: form.program,
          time: form.preferredTime,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Booking failed. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMsg("");
    setForm({ fullName: "", email: "", phone: "", service: "", program: "", preferredTime: "" });
    onClose();
  };

  if (!isOpen) return null;

  /* ─── LEFT PANEL: Program Cards ─── */
  const LeftPanel = (
  <div className={styles.leftPanel}>

    {/* Program Cards stacked vertically */}
    <div className={styles.programCards}>
      {PROGRAMS.map((prog, idx) => {
        const isSelected = form.program === prog.id;

        return (
          <div
  key={prog.id}
  className={styles.progCard}
  style={{ animationDelay: `${idx * 0.15}s` }}
>
            {/* Glow border on selected */}
            <div className={styles.progCardGlow} />

            {/* Top row: tag + check */}
            <div className={styles.progCardTopRow}>
              <span
                className={`${styles.progTag} ${
                  isSelected ? styles.progTagActive : ""
                }`}
              >
                {prog.tag}
              </span>

              {isSelected && (
                <span className={styles.progCheck}>✓ SELECTED</span>
              )}
            </div>

            {/* Title + desc */}
            <div className={styles.progCardBody}>
              <div className={styles.progIconWrap}>
                <span className={styles.progIcon}>{prog.icon}</span>
              </div>

              <div>
                <h3 className={styles.progName}>{prog.label}</h3>
                <p className={styles.progDesc}>{prog.desc}</p>
              </div>
            </div>

            {/* Price row */}
            <div className={styles.progPriceRow}>
              <span className={styles.progPrice}>{prog.price}</span>

              <span className={styles.progOriginal}>
                {prog.originalPrice}
              </span>

              <span className={styles.progSaveBadge}>
                SAVE {prog.id === "hybrid" ? "35%" : "25%"}
              </span>
            </div>

            {/* Features */}
            <div className={styles.progFeatures}>
              {prog.features.map((f) => (
                <span key={f} className={styles.progFeat}>
                  <span className={styles.progFeatDot} />
                  {f}
                </span>
              ))}
            </div>

          </div>
        );
      })}
    </div>

    {/* Header moved BELOW cards */}
    <div className={styles.leftHeader}>
      <p className={styles.leftOverline}>PERSONAL TRAINING</p>

      <h2 className={styles.leftTitle}>
        YOUR GOALS.
        <br />
        <span>OUR MISSION.</span>
      </h2>

      <p className={styles.leftSub}>
        Choose a program, take the first step towards your strongest version.
      </p>
    </div>

    {/* Bottom trust badges */}
    <div className={styles.leftTrustRow}>
      <div className={styles.trustItem}>
        <span>🛡</span> Certified Coaches
      </div>

      <div className={styles.trustItem}>
        <span>📅</span> Flexible Schedule
      </div>

      <div className={styles.trustItem}>
        <span>🏆</span> Real Results
      </div>
    </div>
  </div>
);

  /* ─── RIGHT PANEL: Booking Form ─── */
  const FormContent = (
    <>
      {status === "success" ? (
        <div className={styles["bs-success"]}>
          <div className={styles["bs-success-icon"]}>✓</div>
          <h2 className={styles["bs-success-title"]}>BOOKING CONFIRMED!</h2>
          <p className={styles["bs-success-msg"]}>
            You'll receive a confirmation via email &amp; WhatsApp shortly.
          </p>
          <div className={styles["bs-success-detail"]}>
            {selectedService && <span><strong>Service:</strong> {selectedService.label}</span>}
            <span><strong>Program:</strong> {selectedProg?.label}</span>
            <span><strong>Time:</strong> {form.preferredTime}</span>
            <span><strong>Name:</strong> {form.fullName}</span>
          </div>
          <button className={styles["bs-reset-btn"]} onClick={handleReset}>
            BOOK ANOTHER SESSION →
          </button>
        </div>
      ) : (
        <>
          <div className={styles["bs-form-header"]}>
            <h2 className={styles["bs-form-title"]}>BOOK A SESSION</h2>
            <div className={styles["bs-form-divider"]} />
            <p className={styles["bs-form-sub"]}>
              Take the first step towards<br />a stronger, healthier you.
            </p>
          </div>

          <div className={styles["bs-form"]}>

            {/* Full Name */}
            <div className={styles["bs-field"]}>
              <label className={styles["bs-label"]}>Full Name</label>
              <div className={styles["bs-input-wrap"]}>
                <span className={styles["bs-input-icon"]}>👤</span>
                <input className={styles["bs-input"]} name="fullName" type="text"
                  placeholder="Enter your name" value={form.fullName} onChange={handleChange} />
              </div>
            </div>

            {/* Email */}
            <div className={styles["bs-field"]}>
              <label className={styles["bs-label"]}>Email Address</label>
              <div className={styles["bs-input-wrap"]}>
                <span className={styles["bs-input-icon"]}>✉</span>
                <input className={styles["bs-input"]} name="email" type="email"
                  placeholder="Enter your email" value={form.email} onChange={handleChange} />
              </div>
            </div>

            {/* Phone */}
            <div className={styles["bs-field"]}>
              <label className={styles["bs-label"]}>Phone Number</label>
              <div className={styles["bs-input-wrap"]}>
                <span className={styles["bs-input-icon"]}>📞</span>
                <input className={styles["bs-input"]} name="phone" type="tel"
                  placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            {/* Service */}
            <div className={styles["bs-field"]}>
              <label className={styles["bs-label"]}>Service</label>
              <div
                className={`${styles["bs-select-trigger"]} ${serviceOpen ? styles["open"] : ""}`}
                onClick={() => { setServiceOpen(!serviceOpen); setProgramOpen(false); }}
              >
                <span className={styles["bs-input-icon"]}>{selectedService ? selectedService.icon : "🥊"}</span>
                <span className={`${styles["bs-select-val"]} ${!form.service ? styles["placeholder"] : ""}`}>
                  {selectedService ? selectedService.label : "Select Service"}
                </span>
                <span className={`${styles["bs-chevron"]} ${serviceOpen ? styles["up"] : ""}`}>▾</span>
              </div>
              {serviceOpen && (
                <div className={styles["bs-dropdown"]}>
                  {SERVICES.map((service) => (
                    <div key={service.id}
                      className={`${styles["bs-dropdown-item"]} ${form.service === service.id ? styles["active"] : ""}`}
                      onClick={() => selectService(service.id)}>
                      <span className={styles["bs-dd-icon"]}>{service.icon}</span>
                      <div className={styles["bs-dd-text"]}>
                        <span className={styles["bs-dd-label"]}>{service.label}</span>
                      </div>
                      {form.service === service.id && <span className={styles["bs-dd-check"]}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Program Type */}
            <div className={styles["bs-field"]}>
              <label className={styles["bs-label"]}>Program Type</label>
              <div
                className={`${styles["bs-select-trigger"]} ${programOpen ? styles["open"] : ""}`}
                onClick={() => { setProgramOpen(!programOpen); setServiceOpen(false); }}
              >
                <span className={styles["bs-input-icon"]}>{selectedProg ? selectedProg.icon : "🏋"}</span>
                <span className={`${styles["bs-select-val"]} ${!form.program ? styles["placeholder"] : ""}`}>
                  {selectedProg ? selectedProg.shortLabel : "Select Program"}
                </span>
                <span className={`${styles["bs-chevron"]} ${programOpen ? styles["up"] : ""}`}>▾</span>
              </div>
              {programOpen && (
                <div className={styles["bs-dropdown"]}>
                  {PROGRAMS.map((prog) => (
                    <div key={prog.id}
                      className={`${styles["bs-dropdown-item"]} ${form.program === prog.id ? styles["active"] : ""}`}
                      onClick={() => selectProgram(prog.id)}>
                      <span className={styles["bs-dd-icon"]}>{prog.icon}</span>
                      <div className={styles["bs-dd-text"]}>
                        <span className={styles["bs-dd-label"]}>{prog.label}</span>
                        <div className={styles.ddPriceRow}>
                          <span className={styles.ddPrice}>{prog.price}</span>
                          <span className={styles.ddOrig}>{prog.originalPrice}</span>
                        </div>
                        <span className={styles["bs-dd-desc"]}>{prog.desc}</span>
                      </div>
                      {form.program === prog.id && <span className={styles["bs-dd-check"]}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Time Slots */}
            <div className={styles["bs-field"]}>
              <div className={styles.timeLabelRow}>
                <label className={styles["bs-label"]}>Select Time Slot</label>
                <span className={styles.tzBadge}>🕐 IST</span>
              </div>
              <div className={styles["bs-time-grid"]}>
                {TIME_SLOTS.map((slot) => (
                  <button key={slot}
                    className={`${styles["bs-time-btn"]} ${form.preferredTime === slot ? styles["selected"] : ""}`}
                    onClick={() => selectTime(slot)} type="button">
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && <div className={styles["bs-error"]}>{errorMsg}</div>}

            <button
              className={`${styles["bs-submit"]} ${status === "loading" ? styles["loading"] : ""}`}
              onClick={handleSubmit} disabled={status === "loading"} type="button">
              {status === "loading" ? <span className={styles["bs-spinner"]} /> : "BOOK MY SESSION →"}
            </button>

            <p className={styles["bs-footer-note"]}>
              ✓ You'll receive a confirmation via email &amp; WhatsApp
            </p>
          </div>
        </>
      )}
    </>
  );

  if (embedded) {
    return (
      <div className={styles["bs-page"]}>
        <div className={styles["bs-right"]}>{FormContent}</div>
      </div>
    );
  }

  return (
    <div className={styles["bs-page"]}>
      <main className={styles["bs-main"]}>
        {/* LEFT: Program Cards */}
        <div className={styles["bs-left"]}>
          {LeftPanel}
        </div>

        {/* RIGHT: Booking Form */}
        <div className={styles["bs-right"]}>
          {FormContent}
        </div>
      </main>

      <footer className={styles["bs-footer"]}>
        {FOOTER_BADGES.map((b) => (
          <div key={b.title} className={styles["bs-badge"]}>
            <span className={styles["bs-badge-icon"]}>{b.icon}</span>
            <div className={styles["bs-badge-text"]}>
              <span className={styles["bs-badge-title"]}>{b.title}</span>
              <span className={styles["bs-badge-desc"]}>{b.desc}</span>
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
}
