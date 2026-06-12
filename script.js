function showView(id) {

  document.querySelectorAll(".app-view").forEach(view => {

    view.classList.add("hidden");

  });

  const target = document.getElementById(id);

  if (target) {

    target.classList.remove("hidden");

  }

}

window.onload = function () {

  document.getElementById("btn-home")?.addEventListener("click", () => {

    showView("view-home");

  });

  document.getElementById("btn-about")?.addEventListener("click", () => {

    showView("view-about");

  });

  document.getElementById("btn-chat")?.addEventListener("click", () => {

    showView("view-chat");

  });

  document.getElementById("btn-contact")?.addEventListener("click", () => {

    showView("view-contact");

  });

  document.getElementById("btn-feedback")?.addEventListener("click", () => {

    showView("view-feedback");

  });

  document.getElementById("hero-start-chat")?.addEventListener("click", () => {

    showView("view-chat");

  });

  document.getElementById("hero-learn-more")?.addEventListener("click", () => {

    showView("view-about");

  });

  const form = document.getElementById("chat-form");

  if (form) {

    form.addEventListener("submit", function (e) {

      e.preventDefault();

      const input = document.getElementById("chat-input");

      const logs = document.getElementById("chat-logs");

      if (!input || !logs) return;

      const text = input.value.trim();

      if (!text) return;

      logs.classList.remove("hidden");

      logs.innerHTML += `

        <div style="margin:10px 0;text-align:right;">

          <b>You:</b> ${text}

        </div>

      `;

      logs.innerHTML += `

        <div style="margin:10px 0;">

          <b>Axid AI:</b> Demo reply to "${text}"

        </div>

      `;

      input.value = "";

    });

  }

  showView("view-home");

};
