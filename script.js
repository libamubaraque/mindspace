/* =========================================================
   TO THE ETHER. — HOMEPAGE JAVASCRIPT
   Navigation | Account | Supabase Auth | Saved Pages
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const STORAGE_KEYS = {
    saved: "etherSavedPages",
    used: "etherUsedFeatures"
  };

  const FEATURE_LIMIT_FOR_GUESTS = 3;

  /* ---------- SUPABASE ---------- */

  const SUPABASE_URL = "https://sckcrrriiatfxcafabmh.supabase.co";
  const SUPABASE_KEY = "sb_publishable_dQ_yskeZUEm8rCEjbz_1Lw_ftYCDmdo";

  let supabase = null;
  let currentUser = null;

  if (window.supabase?.createClient) {
    supabase = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );
  }

  /* ---------- HELPERS ---------- */

  function readStorage(key, fallback = []) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Could not save local data:", error);
      return false;
    }
  }

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function showMessage(element, message, isError = false) {
    if (!element) return;
    element.textContent = message;
    element.classList.toggle("error", isError);
    element.classList.toggle("success", !isError);
  }

  /* ---------- MOBILE NAVIGATION ---------- */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- ACCOUNT MODAL ---------- */

  const accountButton = document.getElementById("accountButton");
  const accountModal = document.getElementById("accountModal");
  const closeModal = document.getElementById("closeModal");
  const accountForm = document.getElementById("accountForm");
  const accountSwitch = document.getElementById("accountSwitch");
  const accountSwitchText = document.getElementById("accountSwitchText");
  const accountMessage = document.getElementById("accountMessage");
  const accountSubmit = document.getElementById("accountSubmit");
  const signupFields = document.getElementById("signupFields");
  const accountName = document.getElementById("accountName");
  const accountUsername = document.getElementById("accountUsername");
  const accountEmail = document.getElementById("accountEmail");
  const accountPassword = document.getElementById("accountPassword");
  const logoutButton = document.getElementById("logoutButton");

  let isSignupMode = true;

  function openAccountModal() {
    if (!accountModal) return;
    accountModal.classList.add("active");
    accountModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    showMessage(accountMessage, "");
  }

  function hideAccountModal() {
    if (!accountModal) return;
    accountModal.classList.remove("active");
    accountModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function updateAccountMode() {
    if (signupFields) {
      signupFields.style.display = isSignupMode ? "block" : "none";
    }

    if (accountSubmit) {
      accountSubmit.textContent = isSignupMode ? "Create Account" : "Log In";
    }

    if (accountSwitchText) {
      accountSwitchText.textContent = isSignupMode
        ? "Already have an account?"
        : "New to To the Ether?";
    }

    if (accountSwitch) {
      accountSwitch.textContent = isSignupMode ? "Log in" : "Create an account";
    }

    showMessage(accountMessage, "");
  }

  accountButton?.addEventListener("click", openAccountModal);
  closeModal?.addEventListener("click", hideAccountModal);

  accountModal?.addEventListener("click", event => {
    if (event.target === accountModal) hideAccountModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") hideAccountModal();
  });

  accountSwitch?.addEventListener("click", () => {
    isSignupMode = !isSignupMode;
    updateAccountMode();
  });

  /* ---------- ACCOUNT DISPLAY ---------- */

  async function updateAccountDisplay(user) {
    currentUser = user || null;

    if (accountButton) {
      if (currentUser) {
        let displayName =
          currentUser.user_metadata?.display_name ||
          currentUser.user_metadata?.username ||
          "My Account";

        if (supabase) {
          const { data } = await supabase
            .from("profiles")
            .select("username, display_name")
            .eq("id", currentUser.id)
            .maybeSingle();

          if (data?.display_name) displayName = data.display_name;
          else if (data?.username) displayName = data.username;
        }

        accountButton.textContent = `Hello, ${displayName}`;
      } else {
        accountButton.textContent = "My Space ↗";
      }
    }

    if (logoutButton) {
      logoutButton.style.display = currentUser ? "inline-flex" : "none";
    }

    document.body.classList.toggle("signed-in", Boolean(currentUser));
  }

  /* ---------- SIGN UP / LOG IN ---------- */

  accountForm?.addEventListener("submit", async event => {
    event.preventDefault();

    if (!supabase) {
      showMessage(
        accountMessage,
        "The account service could not load. Please refresh the page.",
        true
      );
      return;
    }

    const email = accountEmail?.value.trim();
    const password = accountPassword?.value || "";

    if (!email || !password) {
      showMessage(accountMessage, "Please enter your email and password.", true);
      return;
    }

    if (password.length < 6) {
      showMessage(accountMessage, "Your password must be at least 6 characters.", true);
      return;
    }

    if (accountSubmit) {
      accountSubmit.disabled = true;
      accountSubmit.textContent = "Please wait...";
    }

    try {
      if (isSignupMode) {
        const displayName = accountName?.value.trim();
        const username = accountUsername?.value.trim().toLowerCase();

        if (!displayName || !username) {
          throw new Error("Please enter your name and username.");
        }

        if (!/^[a-z0-9_]{3,20}$/.test(username)) {
          throw new Error(
            "Username must be 3–20 characters and use only letters, numbers or underscores."
          );
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              display_name: displayName
            }
          }
        });

        if (error) throw error;

        if (data.session) {
          await updateAccountDisplay(data.user);
          showMessage(accountMessage, "Your account has been created!");
          setTimeout(hideAccountModal, 900);
        } else {
          showMessage(
            accountMessage,
            "Account created! Please check your email for the confirmation link."
          );
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        await updateAccountDisplay(data.user);
        showMessage(accountMessage, "Welcome back!");
        setTimeout(hideAccountModal, 700);
      }
    } catch (error) {
      showMessage(accountMessage, error.message || "Something went wrong.", true);
    } finally {
      if (accountSubmit) {
        accountSubmit.disabled = false;
        accountSubmit.textContent = isSignupMode ? "Create Account" : "Log In";
      }
    }
  });

  logoutButton?.addEventListener("click", async () => {
    if (!supabase) return;

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    await updateAccountDisplay(null);
    hideAccountModal();
  });

  if (supabase) {
    supabase.auth.getSession().then(({ data }) => {
      updateAccountDisplay(data.session?.user || null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      updateAccountDisplay(session?.user || null);
    });
  }

  /* ---------- FEATURE ACCESS ---------- */

  const featureCards = document.querySelectorAll(".feature-card[data-feature]");

  function getUsedFeatures() {
    return readStorage(STORAGE_KEYS.used, []);
  }

  featureCards.forEach(card => {
    card.addEventListener("click", event => {
      const slug = card.dataset.feature;
      if (!slug) return;

      let used = getUsedFeatures();

      if (!currentUser && !used.includes(slug)) {
        if (used.length >= FEATURE_LIMIT_FOR_GUESTS) {
          event.preventDefault();
          openAccountModal();
          showMessage(
            accountMessage,
            "You've explored three spaces. Create a free account to keep exploring!"
          );
          return;
        }

        used.push(slug);
        writeStorage(STORAGE_KEYS.used, used);
      }
    });
  });

  /* ---------- HOMEPAGE SAVED PAGES ---------- */

  const savedPagesContainer =
    document.getElementById("savedPages") ||
    document.getElementById("savedPagesContainer");

  function renderHomepageSavedPages() {
    if (!savedPagesContainer) return;

    const pages = readStorage(STORAGE_KEYS.saved, []);

    if (!pages.length) {
      savedPagesContainer.innerHTML = `
        <p class="empty-saved-message">
          Your saved reflections and creations will appear here.
          Visit a space and save something meaningful to begin.
        </p>
      `;
      return;
    }

    savedPagesContainer.innerHTML = pages.map((page, index) => `
      <article class="saved-page-card">
        <div>
          <span class="eyebrow">${escapeHTML(page.feature || "YOUR SPACE")}</span>
          <h3>${escapeHTML(page.title || "A saved page")}</h3>
          <p>${escapeHTML((page.content || "").slice(0, 150))}</p>
          <small>${escapeHTML(page.date || "")}</small>
        </div>
        <button class="delete-saved-page" data-index="${index}" type="button">
          Delete
        </button>
      </article>
    `).join("");

    savedPagesContainer.querySelectorAll(".delete-saved-page").forEach(button => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);
        const updated = readStorage(STORAGE_KEYS.saved, []);
        updated.splice(index, 1);
        writeStorage(STORAGE_KEYS.saved, updated);
        renderHomepageSavedPages();
      });
    });
  }

  renderHomepageSavedPages();

  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEYS.saved) {
      renderHomepageSavedPages();
    }
  });

  /* ---------- EXPLORE FILTERS ---------- */

  const filterButtons = document.querySelectorAll("[data-filter]");
  const filterableCards = document.querySelectorAll(".feature-card[data-category]");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      filterableCards.forEach(card => {
        const category = card.dataset.category;
        const matches = filter === "all" || category === filter;
        card.hidden = !matches;
      });
    });
  });

  /* ---------- FOOTER YEAR ---------- */

  const yearElement = document.getElementById("currentYear");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  updateAccountMode();
});
