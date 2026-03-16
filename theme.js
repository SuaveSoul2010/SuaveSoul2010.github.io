(() => {
  const storageKey = "theme";
  const classDark = "theme-dark";
  const classLight = "theme-light";
  const root = document.documentElement;

  function applyTheme(theme) {
    root.classList.remove(classDark, classLight);
    if (theme === "dark") {
      root.classList.add(classDark);
    } else if (theme === "light") {
      root.classList.add(classLight);
    }
  }

  function setButtonIcon(button, theme) {
    if (!button) return;
    if (theme === "dark") {
      button.textContent = "☀";
      button.setAttribute("aria-label", "Switch to light mode");
    } else {
      button.textContent = "☾";
      button.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    let saved = localStorage.getItem(storageKey);

    if (saved !== "dark" && saved !== "light") {
      const prefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      saved = prefersDark ? "dark" : "light";
    }

    applyTheme(saved);
    setButtonIcon(button, saved);

    button.addEventListener("click", () => {
      const next = root.classList.contains(classDark) ? "light" : "dark";
      applyTheme(next);
      setButtonIcon(button, next);
      localStorage.setItem(storageKey, next);
    });
  });
})();

// Blog timeline toggle
document.addEventListener("DOMContentLoaded", () => {
  const previews = document.querySelectorAll('.timeline-preview');
  previews.forEach(preview => {
    preview.addEventListener('click', () => {
      const full = preview.nextElementSibling;
      full.classList.toggle('open');
    });
  });

  const collapseBtns = document.querySelectorAll('.collapse-btn');
  collapseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const full = btn.parentElement;
      full.classList.remove('open');
    });
  });
});

