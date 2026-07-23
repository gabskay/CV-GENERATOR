import { useEffect, useState } from "react";

const initialExperience = [
  { id: 1, company: "", role: "", startDate: "", endDate: "", description: "" },
];
const initialEducation = [
  { id: 1, school: "", degree: "", startDate: "", endDate: "" },
];

const App = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("corporate");
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    experience: initialExperience,
    education: initialEducation,
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const updateEducation = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), school: "", degree: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const removeEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSave = () => {
    showToast("Draft saved. Your CV is ready to export.");
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
      showToast("CV data copied to clipboard.");
    } catch {
      showToast("Clipboard access was blocked.", "error");
    }
  };

  const handlePrint = () => {
    window.print();
    showToast("Print dialog opened for PDF export.");
  };

  const handlePdfExport = () => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      showToast("Popup blocked. Please allow popups and try again.", "error");
      return;
    }

    const skills = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    printWindow.document.write(`<!doctype html>
      <html>
        <head><title>${formData.name || "CV Preview"}</title></head>
        <body style="font-family: Arial, sans-serif; padding: 24px; color: #111827;">
          <h1 style="margin: 0 0 8px; font-size: 28px;">${formData.name || "Your Name"}</h1>
          <p style="margin: 0 0 8px;">${formData.title || "Professional Title"}</p>
          <p style="margin: 0 0 8px;">${formData.email || ""} ${formData.phone ? `• ${formData.phone}` : ""}</p>
          <p style="margin: 0 0 16px;">${formData.location || ""}</p>
          <h3 style="margin-bottom: 8px;">Summary</h3>
          <p>${formData.summary || "Add a concise professional summary."}</p>
          <h3 style="margin-bottom: 8px;">Skills</h3>
          <p>${skills.length ? skills.join(", ") : "Add your key strengths."}</p>
        </body>
      </html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    showToast("PDF-ready print preview opened.");
  };

  const skillList = formData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const hasContent = [
    formData.name,
    formData.title,
    formData.email,
    formData.phone,
    formData.location,
    formData.summary,
    formData.skills,
    ...formData.experience.flatMap((item) => Object.values(item)),
    ...formData.education.flatMap((item) => Object.values(item)),
  ].some((value) => String(value).trim().length > 0);

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 text-base-content md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                CV Studio
              </p>
              <h1 className="text-3xl font-bold">
                Craft a polished, professional CV
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                Build your story in a structured workspace and preview it in
                real time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                className="select select-bordered select-sm"
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
              >
                <option value="light">Light</option>
                <option value="corporate">Corporate</option>
                <option value="dark">Dark</option>
                <option value="dracula">Dracula</option>
              </select>

              <button className="btn btn-outline btn-sm" onClick={handleSave}>
                Save draft
              </button>

              <details className="dropdown dropdown-end">
                <summary className="btn btn-primary btn-sm">Export</summary>
                <ul className="menu dropdown-content z-[1] mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                  <li>
                    <button onClick={handlePdfExport}>Download PDF</button>
                  </li>
                  <li>
                    <button onClick={handleCopyJson}>Copy JSON</button>
                  </li>
                  <li>
                    <button onClick={handlePrint}>Print</button>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl">
            <div className="border-b border-base-300 bg-base-200/50 p-4 md:p-6">
              <div role="tablist" className="tabs tabs-boxed">
                {[
                  { key: "profile", label: "Profile" },
                  { key: "experience", label: "Experience" },
                  { key: "education", label: "Education" },
                  { key: "skills", label: "Skills" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`tab ${activeTab === tab.key ? "tab-active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6 p-4 md:p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="card border border-base-300 bg-base-100 shadow-sm">
                    <div className="card-body gap-4">
                      <div className="flex items-center justify-between">
                        <h2 className="card-title">Personal information</h2>
                        <div className="badge badge-primary">Required</div>
                      </div>
                      <div className="divider my-0" />
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Full name</legend>
                        <input
                          className="input input-bordered w-full"
                          value={formData.name}
                          onChange={(event) =>
                            updateField("name", event.target.value)
                          }
                          placeholder="Alex Morgan"
                        />
                      </fieldset>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Professional title
                        </legend>
                        <input
                          className="input input-bordered w-full"
                          value={formData.title}
                          onChange={(event) =>
                            updateField("title", event.target.value)
                          }
                          placeholder="Product Designer"
                        />
                      </fieldset>
                      <div className="grid gap-4 md:grid-cols-2">
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Email</legend>
                          <input
                            className="input input-bordered w-full"
                            type="email"
                            value={formData.email}
                            onChange={(event) =>
                              updateField("email", event.target.value)
                            }
                            placeholder="alex@example.com"
                          />
                        </fieldset>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Phone</legend>
                          <input
                            className="input input-bordered w-full"
                            value={formData.phone}
                            onChange={(event) =>
                              updateField("phone", event.target.value)
                            }
                            placeholder="+44 20 1234 5678"
                          />
                        </fieldset>
                      </div>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Location</legend>
                        <input
                          className="input input-bordered w-full"
                          value={formData.location}
                          onChange={(event) =>
                            updateField("location", event.target.value)
                          }
                          placeholder="London, UK"
                        />
                      </fieldset>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Professional summary
                        </legend>
                        <textarea
                          className="textarea textarea-bordered h-24 w-full"
                          value={formData.summary}
                          onChange={(event) =>
                            updateField("summary", event.target.value)
                          }
                          placeholder="Describe your experience and value proposition."
                        />
                      </fieldset>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Experience</h2>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={addExperience}
                    >
                      Add role
                    </button>
                  </div>
                  {formData.experience.map((item, index) => (
                    <div
                      key={item.id}
                      className="card border border-base-300 bg-base-100 shadow-sm"
                    >
                      <div className="card-body gap-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Role {index + 1}</h3>
                          {formData.experience.length > 1 && (
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => removeExperience(item.id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="divider my-0" />
                        <div className="grid gap-4 md:grid-cols-2">
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Company</legend>
                            <input
                              className="input input-bordered w-full"
                              value={item.company}
                              onChange={(event) =>
                                updateExperience(
                                  item.id,
                                  "company",
                                  event.target.value,
                                )
                              }
                              placeholder="Northstar Labs"
                            />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                              Role title
                            </legend>
                            <input
                              className="input input-bordered w-full"
                              value={item.role}
                              onChange={(event) =>
                                updateExperience(
                                  item.id,
                                  "role",
                                  event.target.value,
                                )
                              }
                              placeholder="Senior Product Designer"
                            />
                          </fieldset>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                              Start date
                            </legend>
                            <input
                              className="input input-bordered w-full"
                              type="month"
                              value={item.startDate}
                              onChange={(event) =>
                                updateExperience(
                                  item.id,
                                  "startDate",
                                  event.target.value,
                                )
                              }
                            />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                              End date
                            </legend>
                            <input
                              className="input input-bordered w-full"
                              type="month"
                              value={item.endDate}
                              onChange={(event) =>
                                updateExperience(
                                  item.id,
                                  "endDate",
                                  event.target.value,
                                )
                              }
                            />
                          </fieldset>
                        </div>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">
                            Highlights
                          </legend>
                          <textarea
                            className="textarea textarea-bordered h-24 w-full"
                            value={item.description}
                            onChange={(event) =>
                              updateExperience(
                                item.id,
                                "description",
                                event.target.value,
                              )
                            }
                            placeholder="Describe your impact, achievements, and responsibilities."
                          />
                        </fieldset>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={addEducation}
                    >
                      Add education
                    </button>
                  </div>
                  {formData.education.map((item, index) => (
                    <div
                      key={item.id}
                      className="card border border-base-300 bg-base-100 shadow-sm"
                    >
                      <div className="card-body gap-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Study {index + 1}</h3>
                          {formData.education.length > 1 && (
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => removeEducation(item.id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="divider my-0" />
                        <div className="grid gap-4 md:grid-cols-2">
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">School</legend>
                            <input
                              className="input input-bordered w-full"
                              value={item.school}
                              onChange={(event) =>
                                updateEducation(
                                  item.id,
                                  "school",
                                  event.target.value,
                                )
                              }
                              placeholder="University of London"
                            />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Degree</legend>
                            <input
                              className="input input-bordered w-full"
                              value={item.degree}
                              onChange={(event) =>
                                updateEducation(
                                  item.id,
                                  "degree",
                                  event.target.value,
                                )
                              }
                              placeholder="BSc Computer Science"
                            />
                          </fieldset>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                              Start date
                            </legend>
                            <input
                              className="input input-bordered w-full"
                              type="month"
                              value={item.startDate}
                              onChange={(event) =>
                                updateEducation(
                                  item.id,
                                  "startDate",
                                  event.target.value,
                                )
                              }
                            />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                              End date
                            </legend>
                            <input
                              className="input input-bordered w-full"
                              type="month"
                              value={item.endDate}
                              onChange={(event) =>
                                updateEducation(
                                  item.id,
                                  "endDate",
                                  event.target.value,
                                )
                              }
                            />
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "skills" && (
                <div className="card border border-base-300 bg-base-100 shadow-sm">
                  <div className="card-body gap-4">
                    <h2 className="card-title">Skills & strengths</h2>
                    <div className="divider my-0" />
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Core skills</legend>
                      <textarea
                        className="textarea textarea-bordered h-28 w-full"
                        value={formData.skills}
                        onChange={(event) =>
                          updateField("skills", event.target.value)
                        }
                        placeholder="React, UI Design, Leadership, Analytics"
                      />
                    </fieldset>
                    <p className="text-sm text-base-content/70">
                      Separate skills with commas to keep the preview clean and
                      readable.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                    Live preview
                  </p>
                  <h2 className="text-xl font-semibold">CV snapshot</h2>
                </div>
                <div className="badge badge-success">Live</div>
              </div>
              <div className="divider my-0" />

              {hasContent ? (
                <div className="space-y-4 pt-4">
                  <div className="rounded-2xl bg-base-200 p-4">
                    <h3 className="text-2xl font-semibold">
                      {formData.name || "Your Name"}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {formData.title || "Professional Title"}
                    </p>
                    <p className="mt-2 text-sm text-base-content/70">
                      {formData.email || "Email"}
                      {formData.phone ? ` • ${formData.phone}` : ""}
                    </p>
                    <p className="text-sm text-base-content/70">
                      {formData.location || "Location"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/70">
                      Summary
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-base-content/80">
                      {formData.summary ||
                        "A concise summary helps recruiters understand your value quickly."}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/70">
                      Skills
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skillList.length > 0 ? (
                        skillList.map((skill) => (
                          <span key={skill} className="badge badge-outline">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-base-content/60">
                          Add skills to highlight your strengths.
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/70">
                      Experience
                    </h4>
                    <div className="mt-2 space-y-3">
                      {formData.experience.some((item) =>
                        Object.values(item).some(
                          (value) => String(value).trim().length > 0,
                        ),
                      ) ? (
                        formData.experience.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl border border-base-300 p-3"
                          >
                            <p className="font-semibold">
                              {item.role || "Role title"}
                            </p>
                            <p className="text-sm text-base-content/70">
                              {item.company || "Company"}
                            </p>
                            <p className="text-xs text-base-content/60">
                              {item.startDate || "Start"} -{" "}
                              {item.endDate || "End"}
                            </p>
                            <p className="mt-2 text-sm text-base-content/80">
                              {item.description ||
                                "Add key achievements and responsibilities."}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-base-content/60">
                          Add your experience to populate this section.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/70">
                      Education
                    </h4>
                    <div className="mt-2 space-y-3">
                      {formData.education.some((item) =>
                        Object.values(item).some(
                          (value) => String(value).trim().length > 0,
                        ),
                      ) ? (
                        formData.education.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl border border-base-300 p-3"
                          >
                            <p className="font-semibold">
                              {item.degree || "Degree"}
                            </p>
                            <p className="text-sm text-base-content/70">
                              {item.school || "School"}
                            </p>
                            <p className="text-xs text-base-content/60">
                              {item.startDate || "Start"} -{" "}
                              {item.endDate || "End"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-base-content/60">
                          Add credentials to showcase your academic background.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/60 p-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                    ✦
                  </div>
                  <h3 className="text-lg font-semibold">
                    Start building your CV
                  </h3>
                  <p className="mt-2 text-sm text-base-content/70">
                    Fill in your details and the preview will come to life
                    instantly.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {toast && (
        <div className="toast toast-end toast-bottom z-50">
          <div
            className={`alert ${toast.type === "error" ? "alert-error" : "alert-success"}`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
