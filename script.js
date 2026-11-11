
/* =========================================================
   TO THE ETHER. — MAIN SCRIPT
   Homepage | Supabase Authentication | Saved Pages
   ========================================================= */


/* 1. SUPABASE CONNECTION */

const SUPABASE_URL = "https://sckcrrriiatfxcafabmh.supabase.co";

const SUPABASE_KEY = "sb_publishable_dQ_yskeZUEm8rCEjbz_1Lw_ftYCDmdo";

let supabaseClient = null;

if (window.supabase && window.supabase.createClient) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );
}


/* 2. SHARED STORAGE */

const SAVED_PAGES_KEY = "etherSavedPages";

function getSavedPages() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_PAGES_KEY)) || [];
  } catch (error) {
    console.error("Could not read saved pages:", error);
    return [];
  }
}

function savePagesToStorage(pages) {
  localStorage.setItem(SAVED_PAGES_KEY, JSON.stringify(pages));
}


/* 3. MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
    });
  });
}


/* 4. ACCOUNT ELEMENTS */

const accountButton = document.getElementById("accountButton");
const accountModal = document.getElementById("accountModal");
const closeModal = document.getElementById("closeModal");

const accountForm = document.getElementById("accountForm");
const accountName = document.getElementById("accountName");
const accountUsername = document.getElementById("accountUsername");
const accountEmail = document.getElementById("accountEmail");
const accountPassword = document.getElementById("accountPassword");

const accountHeading = document.getElementById("accountHeading");
const accountDescription = document.getElementById("accountDescription");
const accountSubmit = document.getElementById("accountSubmit");
const accountSwitch = document.getElementById("accountSwitch");
const accountSwitchText = document.getElementById("accountSwitchText");
const accountMessage = document.getElementById("accountMessage");
const signupFields = document.getElementById("signupFields");
const logoutButton = document.getElementById("logoutButton");

let isLoginMode = false;


/* 5. OPEN AND CLOSE ACCOUNT POPUP */

function openAccountModal() {
  if (!accountModal) return;

  accountModal.classList.add("active");
  accountModal.style.display = "flex";
  updateAccountInterface();
}

function closeAccountModal() {
  if (!accountModal) return;

  accountModal.classList.remove("active");
  accountModal.style.display = "";
}

if (accountButton) {
  accountButton.addEventListener("click", openAccountModal);
}

if (closeModal) {
  closeModal.addEventListener("click", closeAccountModal);
}

if (accountModal) {
  accountModal.addEventListener("click", event => {
    if (event.target === accountModal) {
      closeAccountModal();
    }
  });
}


/* 6. ACCOUNT MESSAGE */

function showAccountMessage(message, type = "info") {
  if (!accountMessage) return;

  accountMessage.textContent = message;
  accountMessage.className = "form-message " + type;
}


/* 7. LOGIN / SIGNUP INTERFACE */

function updateAccountInterface() {
  if (!accountHeading) return;

  if (isLoginMode) {
    accountHeading.textContent = "Welcome back.";
    accountDescription.textContent =
      "Log in to return to your personal space.";

    if (signupFields) signupFields.hidden = true;

    if (accountName) accountName.required = false;
    if (accountUsername) accountUsername.required = false;

    if (accountSubmit) {
      accountSubmit.textContent = "Log in ↗";
    }

    if (accountSwitchText) {
      accountSwitchText.textContent = "New here?";
    }

    if (accountSwitch) {
      accountSwitch.textContent = "Create an account";
    }

  } else {
    accountHeading.textContent = "A little introduction.";
    accountDescription.textContent =
      "Create your personal space at To the Ether.";

    if (signupFields) signupFields.hidden = false;

    if (accountName) accountName.required = true;
    if (accountUsername) accountUsername.required = true;

    if (accountSubmit) {
      accountSubmit.textContent = "Create account ↗";
    }

    if (accountSwitchText) {
      accountSwitchText.textContent = "Already have an account?";
    }

    if (accountSwitch) {
      accountSwitch.textContent = "Log in";
    }
  }

  showAccountMessage("");
}

if (accountSwitch) {
  accountSwitch.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    if (accountForm) accountForm.reset();
    updateAccountInterface();
  });
}


/* 8. SHOW CURRENT USER */

async function updateUserInterface() {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient.auth.getUser();

  if (error) {
    console.error("Could not check user:", error.message);
    return;
  }

  const user = data.user;

  if (accountButton) {
    accountButton.textContent = user ? "My Space ↗" : "My Space ↗";
  }

  if (logoutButton) {
    logoutButton.hidden = !user;
  }

  if (user && accountDescription) {
    const displayName =
      user.user_metadata?.display_name ||
      user.user_metadata?.username ||
      "Welcome";

    accountDescription.textContent =
      `Welcome to your personal space, ${displayName}.`;
  }
}


/* 9. CREATE ACCOUNT AND LOG IN */

if (accountForm) {
  accountForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!supabaseClient) {
      showAccountMessage(
        "The account service could not load. Check your internet connection and refresh.",
        "error"
      );
      return;
    }

    const email = accountEmail.value.trim();
    const password = accountPassword.value;

    accountSubmit.disabled = true;
    accountSubmit.textContent = "Please wait...";
    showAccountMessage("Connecting securely...", "info");

    try {

      if (isLoginMode) {

        const { data, error } =
          await supabaseClient.auth.signInWithPassword({
            email,
            password
          });

        if (error) throw error;

        showAccountMessage("You are logged in successfully!", "success");

        await updateUserInterface();

        setTimeout(closeAccountModal, 900);

      } else {

        const displayName = accountName.value.trim();
        const username = accountUsername.value.trim();

        if (!displayName || !username) {
          throw new Error("Please enter your display name and username.");
        }

        const { data, error } =
          await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: {
                display_name: displayName,
                username: username
              }
            }
          });

        if (error) throw error;

        if (data.session) {
          showAccountMessage(
            "Your account has been created successfully!",
            "success"
          );

          await updateUserInterface();

          setTimeout(closeAccountModal, 1200);

        } else {
          showAccountMessage(
            "Account created! Check your email for the confirmation link before logging in.",
            "success"
          );
        }
      }

    } catch (error) {
      console.error("Account error:", error);

      showAccountMessage(
        error.message || "Something went wrong. Please try again.",
        "error"
      );

    } finally {
      accountSubmit.disabled = false;
      updateAccountInterface();
    }
  });
}


/* 10. LOG OUT */

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    if (!supabaseClient) return;

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      showAccountMessage(error.message, "error");
      return;
    }

    showAccountMessage("You have logged out.", "success");

    await updateUserInterface();

    setTimeout(closeAccountModal, 900);
  });
}


/* 11. AUTHENTICATION STATE */

if (supabaseClient) {
  supabaseClient.auth.onAuthStateChange(() => {
    updateUserInterface();
  });
}


/* 12. SAVED PAGES ON HOMEPAGE */

function renderHomepageSavedPages() {
  const container = document.getElementById("savedPagesContainer");

  if (!container) return;

  const pages = getSavedPages();

  container.innerHTML = "";

  if (pages.length === 0) {
    container.innerHTML =
      '<p class="empty-saved-message">Your saved creations will appear here.</p>';
    return;
  }

  pages.slice().reverse().forEach(page => {
    const card = document.createElement("article");
    card.className = "saved-page-card";

    const title = document.createElement("h3");
    title.textContent = page.title || "Untitled page";

    const category = document.createElement("p");
    category.textContent = page.category || "Your collection";

    const content = document.createElement("p");
    content.textContent = page.content || "";

    const date = document.createElement("small");
    date.textContent = page.date || "";

    const openLink = document.createElement("a");
    openLink.href =
      "feature.html?feature=" +
      encodeURIComponent(page.feature || "my-little-world");

    openLink.textContent = "Open space ↗";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Remove";
    deleteButton.className = "saved-delete";

    deleteButton.addEventListener("click", () => {
      const updated = getSavedPages().filter(item => item.id !== page.id);
      savePagesToStorage(updated);
      renderHomepageSavedPages();
    });

    card.append(title, category, content, date, openLink, deleteButton);
    container.appendChild(card);
  });
}


/* 13. STARTUP */

document.addEventListener("DOMContentLoaded", () => {
  renderHomepageSavedPages();
  updateUserInterface();
});

renderHomepageSavedPages();
