import { useState, useMemo } from "react";

// ── Specialty data (26 entries) ──────────────────────────────────────────────
const specialties = [
  { id: 1, slug: "general-surgery", en: "General Surgery", ku: "نەشتەرگەری گشتی", icon: "⚕" },
  { id: 2, slug: "anesthesia", en: "Anesthesia", ku: "بێهۆشکاری", icon: "💉" },
  { id: 3, slug: "internal-medicine", en: "Internal Medicine", ku: "هەناوی", icon: "🩺" },
  { id: 4, slug: "ob-gyn", en: "Obstetrics & Gynecology", ku: "ژنان و مناڵبوون", icon: "🤱" },
  { id: 5, slug: "rheumatology", en: "Rheumatology", ku: "ڕۆماتیزمە", icon: "🦴" },
  { id: 6, slug: "cardiology", en: "Cardiology & Catheterization", ku: "دڵ و قەستەرە", icon: "❤" },
  { id: 7, slug: "urology", en: "Urology & Kidney Surgery", ku: "نەشتەرگەری میزەڕۆ و گورچیلە", icon: "🫘" },
  { id: 8, slug: "eye-surgery", en: "Eye Surgery", ku: "نەشتەرگەری چاو", icon: "👁" },
  { id: 9, slug: "dermatology", en: "Dermatology", ku: "پێست", icon: "✦" },
  { id: 10, slug: "gp", en: "General Practitioner", ku: "پزیشکی گشتی", icon: "🩺" },
  { id: 11, slug: "orthopedics-surgery", en: "Orthopedics (Bone & Fracture Surgery)", ku: "نەشتەرگەری ئێسک و شکاوی", icon: "🦷" },
  { id: 12, slug: "ent", en: "ENT (Ear, Nose, Throat)", ku: "قوڕگ و لوت و گوێ", icon: "👂" },
  { id: 13, slug: "pediatrics", en: "Pediatrics & Neonatology", ku: "مناڵان و تازە لەدایکبووان", icon: "👶" },
  { id: 14, slug: "dentistry", en: "Dentistry", ku: "دەم و ددان", icon: "🦷" },
  { id: 15, slug: "radiology", en: "Radiology & Ultrasound", ku: "تیشک و سۆنار", icon: "🩻" },
  { id: 16, slug: "cosmetic", en: "Cosmetic & Aesthetic Medicine", ku: "جوانکاری", icon: "✨" },
  { id: 17, slug: "orthopedics", en: "Orthopedics", ku: "ئێسک و شکاوی", icon: "🦴" },
  { id: 18, slug: "neurology", en: "Neurology & Neurosurgery", ku: "مێشک و دەمار", icon: "🧠" },
  { id: 19, slug: "chest", en: "Chest, Cardiology & Hematology", ku: "سنگ و دڵ و بۆرییەکانی خوێن", icon: "🫁" },
  { id: 20, slug: "neurosurgery", en: "Neurosurgery", ku: "نەشتەرگەری مێشک و دەمار", icon: "🧠" },
  { id: 21, slug: "breast", en: "Breast Diseases", ku: "نەخۆشییەکانی مەمک", icon: "🩷" },
  { id: 22, slug: "urology-kidney", en: "Urology & Kidney", ku: "میزەڕۆ و گورچیلە", icon: "🫘" },
  { id: 23, slug: "gastro", en: "Gastroenterology", ku: "هەناوی پسپۆڕ", icon: "🫃" },
  { id: 24, slug: "psychiatry", en: "Psychiatry", ku: "دەروونی", icon: "🧩" },
  { id: 25, slug: "physio", en: "Physical Therapy", ku: "چارەسەری فیزیایی", icon: "🏋" },
  { id: 26, slug: "nutrition", en: "Nutrition & Growth", ku: "خۆراک و گەشە", icon: "🥗" },
];

// ── Sample doctor data (first 12 for preview) ───────────────────────────────
const doctors = [
  { id: 1, name: "د. هەردی کەریم سەنگاوی", specialty_ku: "نەشتەرگەری گشتی", specialty_en: "General Surgery", clinic: "نەخۆشخانەی چەمچەماڵی تایبەت", city: "چەمچەماڵ", phone: "7702281000", fee: null, qualifications: null, kcs: 72 },
  { id: 2, name: "د. هەردی محمد ظاهر", specialty_ku: "نەشتەرگەری گشتی", specialty_en: "General Surgery", clinic: "نەخۆشخانەی چەمچەماڵی تایبەت", city: "چەمچەماڵ", phone: "7724804343", fee: null, qualifications: null, kcs: 45 },
  { id: 3, name: "د. هەڵۆ ئەحمەد", specialty_ku: "بێهۆشکاری", specialty_en: "Anesthesia", clinic: "نەخۆشخانەی چەمچەماڵی تایبەت", city: "چەمچەماڵ", phone: "7730672797", fee: null, qualifications: null, kcs: 88 },
  { id: 4, name: "د. جەمال ئەنوەر ئەحمەد", specialty_ku: "هەناوی", specialty_en: "Internal Medicine", clinic: "نەخۆشخانەی چەمچەماڵی تایبەت", city: "چەمچەماڵ", phone: "7707672797", fee: null, qualifications: null, kcs: 61 },
  { id: 5, name: "د. شۆخان فرحان ئەحمەد", specialty_ku: "ژنان و مناڵبوون", specialty_en: "Obstetrics & Gynecology", clinic: "کۆمەڵگەی پزیشکی بەخشین", city: "چەمچەماڵ", phone: "7702256518", fee: "٣٠٠٠ دینار", qualifications: "دکتۆرا (بۆرد) لە نەخۆشییەکانی ژنان و مناڵبوون", kcs: 93 },
  { id: 6, name: "د. هێمن ئەسعەد عوسمان", specialty_ku: "ڕۆماتیزمە", specialty_en: "Rheumatology", clinic: "کۆمەڵگەی پزیشکی بەخشین", city: "چەمچەماڵ", phone: "7714841616", fee: "٣٠٠٠ دینار", qualifications: null, kcs: 57 },
  { id: 7, name: "د. ڕێباز ئیبراهیم ئەحمەد", specialty_ku: "نەشتەرگەری میزەڕۆ و گورچیلە", specialty_en: "Urology & Kidney Surgery", clinic: "کۆمەڵگەی پزیشکی بەخشین", city: "چەمچەماڵ", phone: "07714843535", fee: "٣٠٠٠ دینار", qualifications: "دکتۆرا (بۆرد) لە نەشتەرگەری گورچیلە و میزەڕۆ", kcs: 81 },
  { id: 8, name: "د. محمود ئازاد محمد", specialty_ku: "نەشتەرگەری چاو", specialty_en: "Eye Surgery", clinic: "کۆمەڵگەی پزیشکی بەخشین", city: "چەمچەماڵ", phone: "7701979990", fee: "٣٠٠٠ دینار", qualifications: null, kcs: 34 },
  { id: 9, name: "د. هیوا عومەر حسن", specialty_ku: "پێست", specialty_en: "Dermatology", clinic: "کۆمەڵگەی پزیشکی بەخشین", city: "چەمچەماڵ", phone: "7714841818", fee: "٣٠٠٠ دینار", qualifications: null, kcs: 66 },
  { id: 10, name: "د. ئیمداد ئەحمەد محمد", specialty_ku: "پزیشکی گشتی", specialty_en: "General Practitioner", clinic: "کۆمەڵگەی پزیشکی بەخشین", city: "چەمچەماڵ", phone: "07714841717", fee: "٣٠٠٠ دینار", qualifications: null, kcs: 22 },
  { id: 11, name: "د. هێرش سەیدگوڵ", specialty_ku: "قوڕگ و لوت و گوێ", specialty_en: "ENT (Ear, Nose, Throat)", clinic: "کۆمەڵگەی پزیشکی بەخشین", city: "چەمچەماڵ", phone: "7701388576", fee: "٣٠٠٠ دینار", qualifications: null, kcs: 49 },
  { id: 12, name: "د. شنیار محمد شێخانی", specialty_ku: "ژنان و مناڵبوون", specialty_en: "Obstetrics & Gynecology", clinic: "تەلاری پزیشکی هێدی", city: "هەڵەبجەی شەهید", phone: "7501637057", fee: null, qualifications: null, kcs: 77 },
];

const clinics = [...new Set(doctors.map((d) => d.clinic))];

// ── UI string translations ────────────────────────────────────────────────────
const t = {
  en: {
    brand: "Ya Hakeem",
    tagline: "Medical Directory",
    search: "Search doctors, specialties…",
    specialties: "Specialties",
    clinics: "Clinics",
    allSpecialties: "All Specialties",
    allClinics: "All Clinics",
    doctor: "Doctor",
    specialty: "Specialty",
    clinic: "Clinic",
    city: "City",
    phone: "Phone",
    fee: "Fee",
    qualifications: "Qualifications",
    notAvailable: "N/A",
    doctors: "Doctors",
    results: "results",
    toggleLang: "کوردی",
    menu: "Menu",
    kcs: "KCS",
  },
  ku: {
    brand: "یا حەکیم",
    tagline: "ڕێنمایی پزیشکی",
    search: "گەڕان بۆ پزیشک، پسپۆڕی…",
    specialties: "پسپۆڕییەکان",
    clinics: "کلینیکەکان",
    allSpecialties: "هەموو پسپۆڕییەکان",
    allClinics: "هەموو کلینیکەکان",
    doctor: "پزیشک",
    specialty: "پسپۆڕی",
    clinic: "کلینیک",
    city: "شار",
    phone: "ژمارەی تەلەفۆن",
    fee: "نرخی وریاری",
    qualifications: "بروانامە",
    notAvailable: "نەدیاری",
    doctors: "پزیشک",
    results: "ئەنجام",
    toggleLang: "English",
    menu: "مێنیو",
    kcs: "نمرەی بەشداری",
  },
};

// ── KCS Badge ─────────────────────────────────────────────────────────────────
function KcsBadge({ score }) {
  const color =
    score >= 80 ? "#059669" : score >= 50 ? "#0284c7" : "#94a3b8";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        fontSize: 11,
        fontWeight: 500,
        color,
        background: color + "18",
        borderRadius: 4,
        padding: "1px 6px",
      }}
    >
      ★ {score}
    </span>
  );
}

// ── Doctor Row ────────────────────────────────────────────────────────────────
function DoctorRow({ doctor, lang, strings, isRtl }) {
  const [open, setOpen] = useState(false);
  const specialtyLabel = lang === "ku" ? doctor.specialty_ku : (doctor.specialty_en || doctor.specialty_ku);
  const initials = doctor.name.replace(/^(د\.|دکتۆر[ە]?\s*)/, "").trim().split(" ").slice(0, 2).map((w) => w[0]).join("");

  return (
    <div
      style={{
        borderBottom: "0.5px solid var(--color-border-tertiary)",
        cursor: "pointer",
        background: open ? "var(--color-background-secondary)" : "transparent",
        transition: "background 0.15s",
      }}
      onClick={() => setOpen((p) => !p)}
    >
      {/* Main row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 160px 120px 60px",
          gap: 12,
          padding: "10px 16px",
          alignItems: "center",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--color-background-info)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--color-text-info)",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        {/* Name + clinic */}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {doctor.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--color-text-secondary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {doctor.clinic}
          </div>
        </div>
        {/* Specialty */}
        <div
          style={{
            fontSize: 12,
            color: "var(--color-text-secondary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {specialtyLabel}
        </div>
        {/* City */}
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
          {doctor.city}
        </div>
        {/* KCS */}
        <div>
          <KcsBadge score={doctor.kcs} />
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div
          style={{
            padding: "0 16px 14px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px 24px",
            fontSize: 13,
          }}
        >
          <div>
            <span style={{ color: "var(--color-text-secondary)" }}>{strings.phone}: </span>
            <a
              href={`tel:${doctor.phone}`}
              style={{ color: "var(--color-text-info)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {doctor.phone || strings.notAvailable}
            </a>
          </div>
          <div>
            <span style={{ color: "var(--color-text-secondary)" }}>{strings.fee}: </span>
            <span>{doctor.fee || strings.notAvailable}</span>
          </div>
          <div>
            <span style={{ color: "var(--color-text-secondary)" }}>{strings.qualifications}: </span>
            <span>{doctor.qualifications || strings.notAvailable}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Collapsible Sidebar Section ───────────────────────────────────────────────
function SidebarGroup({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          padding: "6px 12px",
          fontSize: 11,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--color-text-secondary)",
          cursor: "pointer",
        }}
      >
        {title}
        <span style={{ fontSize: 10 }}>{open ? "▴" : "▾"}</span>
      </button>
      {open && children}
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function YaHakeem() {
  const [lang, setLang] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState(null);
  const [activeClinic, setActiveClinic] = useState(null);

  const isRtl = lang === "ku";
  const strings = t[lang];

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        d.name.includes(q) ||
        d.specialty_ku.includes(q) ||
        (d.specialty_en && d.specialty_en.toLowerCase().includes(q)) ||
        d.clinic.includes(q) ||
        d.city.includes(q);
      const matchesSpecialty =
        !activeSpecialty ||
        d.specialty_ku === activeSpecialty ||
        d.specialty_en === activeSpecialty;
      const matchesClinic = !activeClinic || d.clinic === activeClinic;
      return matchesSearch && matchesSpecialty && matchesClinic;
    });
  }, [search, activeSpecialty, activeClinic]);

  const sidebarContent = (
    <div style={{ overflowY: "auto", flex: 1, paddingTop: 8 }}>
      <SidebarGroup title={strings.specialties}>
        <button
          onClick={() => setActiveSpecialty(null)}
          style={{
            width: "100%",
            textAlign: isRtl ? "right" : "left",
            padding: "5px 12px",
            fontSize: 13,
            background: !activeSpecialty ? "var(--color-background-info)" : "none",
            color: !activeSpecialty ? "var(--color-text-info)" : "var(--color-text-primary)",
            border: "none",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          {strings.allSpecialties}
        </button>
        {specialties.map((s) => (
          <button
            key={s.id}
            onClick={() => { setActiveSpecialty(s.ku); setMobileOpen(false); }}
            style={{
              width: "100%",
              textAlign: isRtl ? "right" : "left",
              padding: "5px 12px",
              fontSize: 13,
              background: activeSpecialty === s.ku ? "var(--color-background-info)" : "none",
              color: activeSpecialty === s.ku ? "var(--color-text-info)" : "var(--color-text-primary)",
              border: "none",
              cursor: "pointer",
              borderRadius: 4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {lang === "ku" ? s.ku : s.en}
          </button>
        ))}
      </SidebarGroup>

      <SidebarGroup title={strings.clinics}>
        <button
          onClick={() => setActiveClinic(null)}
          style={{
            width: "100%",
            textAlign: isRtl ? "right" : "left",
            padding: "5px 12px",
            fontSize: 13,
            background: !activeClinic ? "var(--color-background-info)" : "none",
            color: !activeClinic ? "var(--color-text-info)" : "var(--color-text-primary)",
            border: "none",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          {strings.allClinics}
        </button>
        {clinics.map((c) => (
          <button
            key={c}
            onClick={() => { setActiveClinic(c); setMobileOpen(false); }}
            style={{
              width: "100%",
              textAlign: isRtl ? "right" : "left",
              padding: "5px 12px",
              fontSize: 13,
              background: activeClinic === c ? "var(--color-background-info)" : "none",
              color: activeClinic === c ? "var(--color-text-info)" : "var(--color-text-primary)",
              border: "none",
              cursor: "pointer",
              borderRadius: 4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {c}
          </button>
        ))}
      </SidebarGroup>
    </div>
  );

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "var(--font-sans)",
        background: "var(--color-background-tertiary)",
        position: "relative",
      }}
    >
      {/* ── Navbar ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px",
          height: 52,
          background: "var(--color-background-primary)",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
          flexShrink: 0,
          zIndex: 30,
        }}
      >
        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          aria-label="Menu"
        >
          <span style={{ display: "block", width: 18, height: 1.5, background: "var(--color-text-secondary)", borderRadius: 1 }} />
          <span style={{ display: "block", width: 18, height: 1.5, background: "var(--color-text-secondary)", borderRadius: 1 }} />
          <span style={{ display: "block", width: 18, height: 1.5, background: "var(--color-text-secondary)", borderRadius: 1 }} />
        </button>

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#0f766e",
              letterSpacing: isRtl ? "0" : "-0.02em",
            }}
          >
            {strings.brand}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "var(--color-text-secondary)",
              letterSpacing: "0.04em",
            }}
          >
            {strings.tagline}
          </span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 420, margin: "0 8px" }}>
          <input
            type="text"
            placeholder={strings.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            dir={isRtl ? "rtl" : "ltr"}
            style={{
              width: "100%",
              height: 32,
              padding: "0 10px",
              fontSize: 13,
              border: "0.5px solid var(--color-border-secondary)",
              borderRadius: "var(--border-radius-md)",
              background: "var(--color-background-secondary)",
              color: "var(--color-text-primary)",
              outline: "none",
            }}
          />
        </div>

        {/* Result count */}
        <span style={{ fontSize: 12, color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
          {filtered.length} {strings.doctors}
        </span>

        {/* Language toggle */}
        <button
          onClick={() => setLang((l) => (l === "en" ? "ku" : "en"))}
          style={{
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 500,
            border: "0.5px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-md)",
            background: "none",
            color: "var(--color-text-primary)",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {strings.toggleLang}
        </button>
      </header>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 20,
            }}
          />
        )}

        {/* Sidebar */}
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            background: "var(--color-background-primary)",
            borderRight: isRtl ? "none" : "0.5px solid var(--color-border-tertiary)",
            borderLeft: isRtl ? "0.5px solid var(--color-border-tertiary)" : "none",
            display: "flex",
            flexDirection: "column",
            overflowY: "hidden",
            zIndex: 25,
            // Mobile: slide in/out
            position: "absolute",
            top: 0,
            bottom: 0,
            left: isRtl ? "auto" : (mobileOpen ? 0 : -220),
            right: isRtl ? (mobileOpen ? 0 : -220) : "auto",
            transition: "left 0.22s ease, right 0.22s ease",
            // Desktop: static layout
          }}
          className="ya-sidebar"
        >
          <div
            style={{
              padding: "10px 12px 6px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
              letterSpacing: "0.03em",
            }}
          >
            {strings.specialties} & {strings.clinics}
          </div>
          {sidebarContent}
        </aside>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            background: "var(--color-background-primary)",
            marginLeft: isRtl ? 0 : 220,
            marginRight: isRtl ? 220 : 0,
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 160px 120px 60px",
              gap: 12,
              padding: "8px 16px",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
              background: "var(--color-background-secondary)",
              position: "sticky",
              top: 0,
              zIndex: 5,
            }}
          >
            <div />
            <div>{strings.doctor}</div>
            <div>{strings.specialty}</div>
            <div>{strings.city}</div>
            <div>{strings.kcs}</div>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "var(--color-text-secondary)",
                fontSize: 14,
              }}
            >
              No results found.
            </div>
          ) : (
            filtered.map((d) => (
              <DoctorRow
                key={d.id}
                doctor={d}
                lang={lang}
                strings={strings}
                isRtl={isRtl}
              />
            ))
          )}
        </main>
      </div>

      {/* ── Responsive style injection ── */}
      <style>{`
        @media (min-width: 768px) {
          .ya-sidebar {
            position: static !important;
            left: auto !important;
            right: auto !important;
            transition: none !important;
          }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { background: var(--color-background-secondary) !important; }
        input:focus { box-shadow: 0 0 0 2px var(--color-border-info) !important; }
      `}</style>
    </div>
  );
}
