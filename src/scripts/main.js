// WhatsApp Config
export const WA_NUMBER = "5548984973968";
export const WA_QR = "https://api.whatsapp.com/qr/R3ER3QKCSVCOM1?autoload=1&app_absent=0";
export const wa = (t) => WA_NUMBER ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}` : WA_QR;

export function initApp() {
  // Update all generic WhatsApp links
  document.querySelectorAll(".wa-link").forEach((a) => {
    a.href = wa("Olá! Gostaria de agendar uma consulta com a Dra. Gabriela Veit.");
  });

  // Custom Select Component (Dropdown customizado harmonizado com o design system da clínica)
  function initCustomSelects() {
    document.querySelectorAll(".field select").forEach((select) => {
      if (select.dataset.customSelectInit) {
        if (select._updateCustomOptions) select._updateCustomOptions();
        return;
      }
      select.dataset.customSelectInit = "true";
      select.classList.add("sr-select");

      const wrapper = document.createElement("div");
      wrapper.className = "custom-select";

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "custom-select-trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");

      const labelSpan = document.createElement("span");
      labelSpan.className = "custom-select-label";

      const arrowSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      arrowSvg.setAttribute("class", "custom-select-arrow");
      arrowSvg.setAttribute("width", "14");
      arrowSvg.setAttribute("height", "14");
      arrowSvg.setAttribute("viewBox", "0 0 16 16");
      arrowSvg.setAttribute("fill", "none");
      arrowSvg.setAttribute("stroke", "currentColor");
      arrowSvg.setAttribute("stroke-width", "1.8");
      arrowSvg.setAttribute("aria-hidden", "true");
      arrowSvg.innerHTML = '<path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/>';

      trigger.appendChild(labelSpan);
      trigger.appendChild(arrowSvg);

      const dropdown = document.createElement("ul");
      dropdown.className = "custom-select-dropdown";
      dropdown.setAttribute("role", "listbox");
      dropdown.setAttribute("tabindex", "-1");

      function updateOptions() {
        dropdown.innerHTML = "";
        const selectedIndex = select.selectedIndex >= 0 ? select.selectedIndex : 0;
        Array.from(select.options).forEach((opt, idx) => {
          const isSelected = idx === selectedIndex;
          const li = document.createElement("li");
          li.className = "custom-select-option" + (isSelected ? " selected" : "");
          li.setAttribute("role", "option");
          li.setAttribute("aria-selected", isSelected ? "true" : "false");
          li.dataset.value = opt.value;

          if (isSelected) {
            labelSpan.textContent = opt.textContent;
            if (!opt.value) labelSpan.classList.add("placeholder");
            else labelSpan.classList.remove("placeholder");
          }

          const textSpan = document.createElement("span");
          textSpan.textContent = opt.textContent;
          li.appendChild(textSpan);

          if (isSelected && opt.value) {
            const checkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            checkSvg.setAttribute("class", "option-check");
            checkSvg.setAttribute("width", "14");
            checkSvg.setAttribute("height", "14");
            checkSvg.setAttribute("viewBox", "0 0 16 16");
            checkSvg.setAttribute("fill", "none");
            checkSvg.setAttribute("stroke", "currentColor");
            checkSvg.setAttribute("stroke-width", "2");
            checkSvg.innerHTML = '<path d="M3 8.5l3.5 3.5 6.5-6.5" stroke-linecap="round" stroke-linejoin="round"/>';
            li.appendChild(checkSvg);
          }

          li.addEventListener("click", () => {
            select.selectedIndex = idx;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            closeDropdown();
          });

          dropdown.appendChild(li);
        });
      }

      select._updateCustomOptions = updateOptions;

      function toggleDropdown() {
        if (wrapper.classList.contains("open")) closeDropdown();
        else openDropdown();
      }

      function openDropdown() {
        document.querySelectorAll(".custom-select.open").forEach((cs) => {
          if (cs !== wrapper) cs.classList.remove("open");
        });
        wrapper.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }

      function closeDropdown() {
        wrapper.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }

      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDropdown();
      });

      select.addEventListener("change", updateOptions);

      trigger.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === " ") {
          e.preventDefault();
          openDropdown();
        } else if (e.key === "Escape") {
          closeDropdown();
        }
      });

      wrapper.appendChild(trigger);
      wrapper.appendChild(dropdown);
      select.parentNode.insertBefore(wrapper, select.nextSibling);

      updateOptions();
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-select")) {
      document.querySelectorAll(".custom-select.open").forEach((cs) => cs.classList.remove("open"));
    }
  });

  initCustomSelects();

  // Menu Drawer
  const drawer = document.getElementById("drawer");
  const openB = document.getElementById("open-menu");
  const closeB = document.getElementById("close-menu");

  if (drawer && openB && closeB) {
    const setMenu = (v) => {
      drawer.hidden = !v;
      openB.setAttribute("aria-expanded", String(v));
      document.body.style.overflow = v ? "hidden" : "";
    };

    openB.onclick = () => setMenu(true);
    closeB.onclick = () => setMenu(false);

    drawer.querySelectorAll("[data-close]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        setMenu(false);
        const targetId = a.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          const el = document.querySelector(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    setMenu(false);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  // Header border on scroll
  const head = document.getElementById("topo");
  if (head) {
    window.addEventListener("scroll", () => head.classList.toggle("scrolled", window.scrollY > 10), { passive: true });
  }

  // Form handling
  const form = document.getElementById("form");
  const msg = document.getElementById("form-msg");
  const sendWrap = document.getElementById("send-wrap");

  if (form && msg && sendWrap) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const n = form["f-nome"].value.trim();
      const t = form["f-tel"].value.trim();
      const tr = form["f-trat"].value;
      const m = form["f-msg"].value.trim();

      msg.hidden = false;
      sendWrap.hidden = true;

      if (!n || !t || !tr) {
        msg.textContent = "Preencha nome, WhatsApp e tratamento de interesse para continuar.";
        return;
      }
      if (!form["f-lgpd"].checked) {
        msg.textContent = "Marque a autorização de uso dos dados para continuar.";
        return;
      }

      const sendBtn = document.getElementById("form-send");
      if (sendBtn) {
        sendBtn.href = wa(`Olá! Meu nome é ${n}.\nWhatsApp: ${t}\nTenho interesse em: ${tr}${m ? `\nMensagem: ${m}` : ""}`);
      }
      msg.textContent = "Mensagem pronta. Toque no botão abaixo para enviar pelo WhatsApp.";
      sendWrap.hidden = false;
    });
  }

  // Carousel
  const track = document.getElementById("track");
  if (track) {
    const originalSlides = Array.from(track.children);
    const N = originalSlides.length;
    if (N > 0) {
      const dots = document.getElementById("dots");
      const count = document.getElementById("count");
      const prevBtn = document.getElementById("prev");
      const nextBtn = document.getElementById("next");
      const pad = (n) => String(n).padStart(2, "0");
      const DELAY = 3000;

      // Clones
      const firstClone = originalSlides[0].cloneNode(true);
      const lastClone = originalSlides[N - 1].cloneNode(true);
      firstClone.classList.add("clone");
      lastClone.classList.add("clone");

      track.appendChild(firstClone);
      track.insertBefore(lastClone, originalSlides[0]);

      let currentIndex = 1;
      let timer = null;
      let isTransitioning = false;

      if (dots) {
        dots.innerHTML = Array.from({ length: N }, (_, k) =>
          `<button class="dot" role="tab" aria-label="Foto ${k + 1}" aria-selected="${k === 0}"></button>`
        ).join("");
      }
      const dotEls = dots ? [...dots.children] : [];

      function updateDotsAndCount() {
        const realIndex = (currentIndex - 1 + N) % N;
        dotEls.forEach((d, j) => d.setAttribute("aria-selected", String(j === realIndex)));
        if (count) count.textContent = `${pad(realIndex + 1)} / ${pad(N)}`;
      }

      function setTrackPosition(animate = true) {
        if (animate) {
          track.style.transition = "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
        } else {
          track.style.transition = "none";
        }
        track.style.transform = `translate3d(${-currentIndex * 100}%, 0, 0)`;
      }

      function goTo(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = index;
        setTrackPosition(true);
        updateDotsAndCount();
      }

      function nextSlide() {
        goTo(currentIndex + 1);
      }

      function prevSlide() {
        goTo(currentIndex - 1);
      }

      function startTimer() {
        stopTimer();
        timer = setInterval(nextSlide, DELAY);
      }

      function stopTimer() {
        if (timer) clearInterval(timer);
      }

      track.addEventListener("transitionend", () => {
        isTransitioning = false;
        if (currentIndex === N + 1) {
          currentIndex = 1;
          setTrackPosition(false);
        } else if (currentIndex === 0) {
          currentIndex = N;
          setTrackPosition(false);
        }
      });

      if (prevBtn) prevBtn.onclick = () => { prevSlide(); startTimer(); };
      if (nextBtn) nextBtn.onclick = () => { nextSlide(); startTimer(); };

      dotEls.forEach((d, k) => {
        d.onclick = () => {
          goTo(k + 1);
          startTimer();
        };
      });

      track.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { nextSlide(); startTimer(); }
        if (e.key === "ArrowLeft") { prevSlide(); startTimer(); }
      });

      let x0 = null, y0 = 0, dx = 0, horiz = null;
      track.addEventListener("pointerdown", (e) => {
        if (isTransitioning) return;
        x0 = e.clientX;
        y0 = e.clientY;
        dx = 0;
        horiz = null;
        stopTimer();
      });

      track.addEventListener("pointermove", (e) => {
        if (x0 === null) return;
        const mx = e.clientX - x0;
        const my = e.clientY - y0;
        if (horiz === null && (Math.abs(mx) > 6 || Math.abs(my) > 6)) {
          horiz = Math.abs(mx) > Math.abs(my);
        }
        if (!horiz) return;
        dx = mx;
        track.classList.add("dragging");
        track.style.transition = "none";
        track.style.transform = `translate3d(calc(${-currentIndex * 100}% + ${dx}px), 0, 0)`;
      });

      const onPointerEnd = () => {
        if (x0 === null) return;
        track.classList.remove("dragging");
        if (horiz && Math.abs(dx) > 40) {
          if (dx < 0) nextSlide();
          else prevSlide();
        } else {
          setTrackPosition(true);
        }
        x0 = null;
        startTimer();
      };

      ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => {
        track.addEventListener(ev, onPointerEnd);
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopTimer();
        else startTimer();
      });

      setTrackPosition(false);
      updateDotsAndCount();
      startTimer();
    }
  }
}

// Auto-run if loaded directly in DOM
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
}
