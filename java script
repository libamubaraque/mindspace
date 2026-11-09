
/* =========================================================
   TO THE ETHER — SUPABASE AUTHENTICATION
   Homepage navigation, accounts and saved pages
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

  /* 01. SUPABASE CONNECTION */

  const SUPABASE_URL =
    "https://sckcrrriiatfxcafabmh.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_dQ_yskeZUEm8rCEjbz_1Lw_ftYCDmdo";

  if (!window.supabase) {
    alert("Supabase could not load. Please check your internet connection.");
    return;
  }

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  /* 02. ELEMENT SHORTCUTS */

  const $ = id => document.getElementById(id);

  const menuToggle = $("menuToggle");
  const mainNav = $("mainNav");

  const accountButton = $("accountButton");
  const accountModal = $("accountModal");
  const closeModal = $("closeModal");

  const accountForm = $("accountForm");

  const accountName = $("accountName");
  const accountUsername = $("accountUsername");
  const accountEmail = $("accountEmail");
  const accountPassword = $("accountPassword");

  const accountMessage = $("accountMessage");

  const accountHeading = $("accountHeading");
  const accountDescription = $("accountDescription");

  const signupFields = $("signupFields");
  const accountSubmit = $("accountSubmit");
  const accountSwitch = $("accountSwitch");
  const accountSwitchText = $("accountSwitchText");
  const logoutButton = $("logoutButton");

  const savedPagesContainer = $("savedPages");

  let pendingFeature = null;
  let accountMode = "signup";

  let currentUser = null;
  let currentProfile = null;

  /* 03. SAFE LOCAL STORAGE */

  function readStorage(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);

      return value === null
        ? fallback
        : JSON.parse(value);

    } catch (error) {
      console.warn("Storage error:", error);
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;

    } catch (error) {
      console.warn("Storage error:", error);
      return false;
    }
  }

  /* 04. ACCOUNT DISPLAY */

  function getDisplayName() {

    if (currentProfile?.displayname) {
      return currentProfile.displayname;
    }

    if (currentUser?.user_metadata?.displayname) {
      return currentUser.user_metadata.displayname;
    }

    return currentUser?.email?.split("@")[0] || "there";
  }

  function updateAccountButton() {

    if (!accountButton) return;

    if (currentUser) {

      accountButton.textContent =
        "Welcome, " + getDisplayName() + " ↗";

    } else {

      accountButton.textContent = "My Space ↗";

    }
  }

  /* 05. LOAD USER PROFILE */

  async function loadProfile(user) {

    if (!user) {
      currentProfile = null;
      updateAccountButton();
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("username, displayname")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.warn("Profile loading error:", error);
    }

    currentProfile = data || {
      username: user.user_metadata?.username || "",
      displayname: user.user_metadata?.displayname || ""
    };

    updateAccountButton();
  }

  /* 06. MOBILE NAVIGATION */

  if (menuToggle && mainNav) {

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    mainNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

      });

    });

  }

  /* 07. MODAL CONTROLS */

  function showModal(message = "") {

    if (!accountModal) return;

    accountModal.classList.add("active");
    accountModal.setAttribute("aria-hidden", "false");

    if (accountMessage) {
      accountMessage.textContent = message;
    }

    if (currentUser) {

      accountHeading.textContent = "Welcome back!";

      accountDescription.textContent =
        "Your personal space is ready.";

      accountForm.hidden = true;
      accountSwitch.hidden = true;
      accountSwitchText.hidden = true;
      logoutButton.hidden = false;

    } else {

      accountForm.hidden = false;
      accountSwitch.hidden = false;
      accountSwitchText.hidden = false;
      logoutButton.hidden = true;

      updateAccountMode();

    }

  }

  function hideModal() {

    if (!accountModal) return;

    accountModal.classList.remove("active");

    accountModal.setAttribute("aria-hidden", "true");

    pendingFeature = null;

  }

  function updateAccountMode() {

    if (accountMode === "signup") {

      accountHeading.textContent = "A little introduction.";

      accountDescription.textContent =
        "Create your personal space at To the Ether.";

      signupFields.hidden = false;

      accountName.required = true;
      accountUsername.required = true;

      accountPassword.autocomplete = "new-password";

      accountSubmit.textContent = "Create account ↗";

      accountSwitchText.textContent =
        "Already have an account?";

      accountSwitch.textContent = "Log in";

    } else {

      accountHeading.textContent = "Welcome back.";

      accountDescription.textContent =
        "Log in to return to your personal space.";

      signupFields.hidden = true;

      accountName.required = false;
      accountUsername.required = false;

      accountPassword.autocomplete = "current-password";

      accountSubmit.textContent = "Log in ↗";

      accountSwitchText.textContent =
        "New to To the Ether?";

      accountSwitch.textContent = "Create account";

    }

  }

  if (accountModal) {
    accountModal.setAttribute("aria-hidden", "true");
  }

  if (accountButton) {

    accountButton.addEventListener("click", () => {

      showModal(
        currentUser
          ? "You are signed in."
          : ""
      );

    });

  }

  if (closeModal) {
    closeModal.addEventListener("click", hideModal);
  }

  if (accountModal) {

    accountModal.addEventListener("click", event => {

      if (event.target === accountModal) {
        hideModal();
      }

    });

  }

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      accountModal?.classList.contains("active")
    ) {
      hideModal();
    }

  });

  /* 08. SWITCH SIGNUP / LOGIN */

  if (accountSwitch) {

    accountSwitch.addEventListener("click", () => {

      accountMode =
        accountMode === "signup"
          ? "login"
          : "signup";

      if (accountMessage) {
        accountMessage.textContent = "";
      }

      accountForm.reset();

      updateAccountMode();

    });

  }

  /* 09. ACCOUNT FORM */

  if (accountForm) {

    accountForm.addEventListener("submit", async event => {

      event.preventDefault();

      const email = accountEmail.value.trim();
      const password = accountPassword.value;

      if (accountSubmit) {
        accountSubmit.disabled = true;
        accountSubmit.textContent = "Please wait...";
      }

      if (accountMessage) {
        accountMessage.textContent = "";
      }

      try {

        /* SIGNUP */

        if (accountMode === "signup") {

          const displayname = accountName.value.trim();

          const username =
            accountUsername.value.trim().toLowerCase();

          if (!displayname || !username) {
            throw new Error(
              "Please enter your display name and username."
            );
          }

          if (!/^[a-z0-9_]{3,20}$/.test(username)) {
            throw new Error(
              "Username must be 3–20 characters using letters, numbers or underscores."
            );
          }

          const { data, error } = await supabase.auth.signUp({

            email: email,
            password: password,

            options: {
              data: {
                username: username,
                displayname: displayname
              }
            }

          });

          if (error) throw error;

          if (data.session) {

            currentUser = data.user;

            await loadProfile(currentUser);

            accountMessage.textContent =
              "Your account is ready! Welcome to To the Ether.";

            if (pendingFeature) {

              const feature = pendingFeature;

              pendingFeature = null;

              addUsedFeature(feature);

              setTimeout(() => {
                hideModal();
                openFeatureByName(feature);
              }, 900);

            } else {

              setTimeout(hideModal, 1200);

            }

          } else {

            accountMessage.textContent =
              "Account created! Please check your email to confirm your account, then log in.";

            accountForm.reset();

            accountMode = "login";
            updateAccountMode();

          }

        }

        /* LOGIN */

        else {

          const { data, error } =
            await supabase.auth.signInWithPassword({

              email: email,
              password: password

            });

          if (error) throw error;

          currentUser = data.user;

          await loadProfile(currentUser);

          accountMessage.textContent =
            "Welcome back, " + getDisplayName() + "!";

          if (pendingFeature) {

            const feature = pendingFeature;

            pendingFeature = null;

            addUsedFeature(feature);

            setTimeout(() => {
              hideModal();
              openFeatureByName(feature);
            }, 900);

          } else {

            setTimeout(hideModal, 1000);

          }

        }

        updateAccountButton();

      } catch (error) {

        console.error("Account error:", error);

        if (accountMessage) {
          accountMessage.textContent =
            error.message || "Something went wrong. Please try again.";
        }

      } finally {

        if (accountSubmit) {
          accountSubmit.disabled = false;
          accountSubmit.textContent =
            accountMode === "signup"
              ? "Create account ↗"
              : "Log in ↗";
        }

      }

    });

  }

  /* 10. LOGOUT */

  if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

      logoutButton.disabled = true;

      const { error } = await supabase.auth.signOut();

      logoutButton.disabled = false;

      if (error) {

        accountMessage.textContent = error.message;
        return;

      }

      currentUser = null;
      currentProfile = null;

      updateAccountButton();

      accountMode = "signup";

      accountForm.reset();

      hideModal();

      showModal("You've successfully logged out.");

    });

  }

  /* 11. AUTHENTICATION STATE */

  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.warn("Session error:", sessionError);
  }

  currentUser = session?.user || null;

  if (currentUser) {
    await loadProfile(currentUser);
  }

  updateAccountButton();

  supabase.auth.onAuthStateChange((event, session) => {

    currentUser = session?.user || null;

    if (!currentUser) {
      currentProfile = null;
      updateAccountButton();
      return;
    }

    // Defer profile requests until after the auth callback.
    setTimeout(() => {
      loadProfile(currentUser);
    }, 0);

  });

  /* 12. FEATURE HISTORY */

  function getUsedFeatures() {

    const data = readStorage("etherUsedFeatures", []);

    return Array.isArray(data) ? data : [];

  }

  function addUsedFeature(feature) {

    if (!feature) return;

    const used = getUsedFeatures();

    if (!used.includes(feature)) {

      used.push(feature);

      writeStorage("etherUsedFeatures", used);

    }

  }

  /* 13. OPEN FEATURE */

  function openFeatureByName(feature) {

    if (!feature) return;

    window.location.href =
      "feature.html?feature=" +
      encodeURIComponent(feature);

  }

  function openFeature(card) {

    const feature = card.dataset.feature;

    if (feature) {
      openFeatureByName(feature);
    }

  }

  /* 14. FEATURE CARD NAVIGATION */

  const featureCards = document.querySelectorAll(
    ".feature-card[data-feature]"
  );

  featureCards.forEach(card => {

    card.addEventListener("click", event => {

      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const feature = card.dataset.feature;

      if (!feature) return;

      const used = getUsedFeatures();

      // Signed-in users can explore all spaces.
      if (currentUser) {

        event.preventDefault();

        addUsedFeature(feature);

        openFeature(card);

        return;

      }

      // Previously explored spaces remain accessible.
      if (used.includes(feature)) {
        return;
      }

      // First three spaces are freely accessible.
      if (used.length < 3) {

        event.preventDefault();

        addUsedFeature(feature);

        openFeature(card);

        return;

      }

      // Ask users to create an account after three spaces.
      event.preventDefault();

      pendingFeature = feature;

      accountMode = "signup";

      showModal(
        "You've explored three spaces! Create an account to continue."
      );

    });

  });

  /* 15. SAVED CREATIONS */

  function getSavedPages() {

    const pages = readStorage("etherSavedPages", []);

    return Array.isArray(pages) ? pages : [];

  }

  function renderSavedPages() {

    if (!savedPagesContainer) return;

    savedPagesContainer.innerHTML = "";

    const pages = getSavedPages();

    if (pages.length === 0) {

      const message = document.createElement("p");

      message.className = "empty-saved-message";

      message.textContent =
        "Your saved creations will appear here.";

      savedPagesContainer.appendChild(message);

      return;

    }

    pages.forEach((page, index) => {

      const card = document.createElement("article");

      card.className = "saved-page-card";

      const heading = document.createElement("h3");

      heading.textContent =
        page.title || "My saved page";

      const content = document.createElement("p");

      content.textContent = page.content || "";

      const date = document.createElement("small");

      if (page.date) {

        const parsed = new Date(page.date);

        date.textContent = !isNaN(parsed.getTime())
          ? parsed.toLocaleDateString()
          : "";

      }

      const deleteButton = document.createElement("button");

      deleteButton.className = "delete-saved-page";

      deleteButton.textContent = "Delete";

      deleteButton.type = "button";

      deleteButton.addEventListener("click", () => {

        const updated = getSavedPages();

        updated.splice(index, 1);

        if (writeStorage("etherSavedPages", updated)) {
          renderSavedPages();
        } else {
          alert("Could not delete this page.");
        }

      });

      card.append(
        heading,
        content,
        date,
        deleteButton
      );

      savedPagesContainer.appendChild(card);

    });

  }

  renderSavedPages();

  /* 16. STORAGE SYNCHRONISATION */

  window.addEventListener("storage", event => {

    if (event.key === "etherSavedPages") {
      renderSavedPages();
    }

  });

  console.log(
    "To the Ether connected to Supabase successfully."
  );

});
