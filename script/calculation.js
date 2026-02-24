// add interview and rejected count
function setupStatusHandlers(idx) {
  const intBtn = document.getElementById(`int${idx}`);
  const rejBtn = document.getElementById(`rej${idx}`);
  const intcount = document.getElementById("interview-count");
  const rejcount = document.getElementById("rejected-count");
  const notclass = document.querySelector(`.not-${idx}`);
  const intclass = document.querySelector(`.int-${idx}`);
  const rejclass = document.querySelector(`.rej-${idx}`);

  if (intBtn) {
    intBtn.addEventListener("click", function () {
      const intvalue = parseInt(intcount.textContent);
      const rejvalue = parseInt(rejcount.textContent);

      if (
        notclass.classList.contains("hidden") &&
        intclass.classList.contains("hidden")
      ) {
        intclass.classList.remove("hidden");
        rejclass.classList.add("hidden");
        intcount.textContent = intvalue + 1;
        rejcount.textContent = rejvalue - 1;
      } else if (
        intclass.classList.contains("hidden") &&
        rejclass.classList.contains("hidden")
      ) {
        intclass.classList.remove("hidden");
        notclass.classList.add("hidden");
        intcount.textContent = intvalue + 1;
      } else {
      }
    });
  }

  if (rejBtn) {
    rejBtn.addEventListener("click", function () {
      const intvalue = parseInt(intcount.textContent);
      const rejvalue = parseInt(rejcount.textContent);

      if (
        notclass.classList.contains("hidden") &&
        rejclass.classList.contains("hidden")
      ) {
        rejclass.classList.remove("hidden");
        intclass.classList.add("hidden");
        rejcount.textContent = rejvalue + 1;
        intcount.textContent = intvalue - 1;
      } else if (
        rejclass.classList.contains("hidden") &&
        intclass.classList.contains("hidden")
      ) {
        rejclass.classList.remove("hidden");
        notclass.classList.add("hidden");
        rejcount.textContent = rejvalue + 1;
      } else {
        notclass.classList.add("hidden");
        rejclass.classList.remove("hidden");
      }
    });
  }
}

// Initialize all event handlers after DOM is ready
function initializeApp() {
  // Setup status handlers for all cards
  for (let i = 1; i <= 8; i++) {
    setupStatusHandlers(i);
  }

  // Selection of buttons All, Interview, Rejected, no jobs
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");

  if (btn1) {
    btn1.addEventListener("click", function () {
      selectButton("btn1");
      filterCards("all");
      countbar("all");
      updateNoJobsVisibility();
    });
  }

  if (btn2) {
    btn2.addEventListener("click", function () {
      selectButton("btn2");
      filterCards("interview");
      countbar("interview");
      updateNoJobsVisibility();
    });
  }

  if (btn3) {
    btn3.addEventListener("click", function () {
      selectButton("btn3");
      filterCards("rejected");
      countbar("rejected");
      updateNoJobsVisibility();
    });
  }

  // Setup delete buttons
  setupDeleteButtons();
}
function selectButton(selectedId) {
  document.getElementById("btn1").classList.remove("selected");
  document.getElementById("btn1").classList.remove("btn-active");
  document.getElementById("btn2").classList.remove("selected");
  document.getElementById("btn2").classList.remove("btn-active");
  document.getElementById("btn3").classList.remove("selected");
  document.getElementById("btn3").classList.remove("btn-active");
  document.getElementById(selectedId).classList.add("selected");
  document.getElementById(selectedId).classList.add("btn-active");
}

function filterCards(type) {
  for (let i = 1; i <= 8; i++) {
    const card = document.querySelector(`.card-${i}`);
    if (!card) continue;
    const intDiv = card.querySelector(`.int-${i}`);
    const rejDiv = card.querySelector(`.rej-${i}`);

    if (type === "all") {
      card.classList.remove("hidden");
    } else if (type === "interview") {
      if (intDiv && !intDiv.classList.contains("hidden")) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    } else if (type === "rejected") {
      if (rejDiv && !rejDiv.classList.contains("hidden")) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    }
  }
}

function countbar(type) {
  const intcount = parseInt(
    document.getElementById("interview-count").textContent,
  );
  const rejcount = parseInt(
    document.getElementById("rejected-count").textContent,
  );
  const total = parseInt(document.getElementById("total-count").textContent);

  const jobsSpan = document.querySelector(".opacity-70 span");
  let text = "";
  if (type === "all") {
    text = `${total}`;
  } else if (type === "interview") {
    text = `${intcount} of ${total} `;
  } else if (type === "rejected") {
    text = `${rejcount} of ${total} `;
  }
  if (jobsSpan) jobsSpan.textContent = text;
}

function updateNoJobsVisibility() {
  const cards = document.querySelectorAll('[class^="card-"]');

  const visibleCount = Array.from(cards).filter(
    (card) => !card.classList.contains("hidden"),
  ).length;

  const nojobs = document.getElementById("nojobs");

  if (visibleCount === 0) {
    nojobs.classList.remove("hidden");
  } else {
    nojobs.classList.add("hidden");
  }
}

// delete card with count updates
function setupDeleteButtons() {
  for (let i = 1; i <= 8; i++) {
    const deleteBtn = document.getElementById(`delete${i}`);
    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        const card = document.querySelector(`.card-${i}`);
        if (card) {
          // Update total count
          const totalCountElem = document.getElementById("total-count");
          totalCountElem.textContent = Math.max(
            0,
            parseInt(totalCountElem.textContent) - 1,
          );

          // Update interview/rejected count if needed
          const intDiv = card.querySelector(`.int-${i}`);
          const rejDiv = card.querySelector(`.rej-${i}`);
          if (intDiv && !intDiv.classList.contains("hidden")) {
            const intCountElem = document.getElementById("interview-count");
            intCountElem.textContent = Math.max(
              0,
              parseInt(intCountElem.textContent) - 1,
            );
          }
          if (rejDiv && !rejDiv.classList.contains("hidden")) {
            const rejCountElem = document.getElementById("rejected-count");
            rejCountElem.textContent = Math.max(
              0,
              parseInt(rejCountElem.textContent) - 1,
            );
          }

          // Remove card
          card.remove();
          updateNoJobsVisibility();

          // Update countbar
          const selectedBtn = document.querySelector(".btn.selected");
          if (selectedBtn) {
            const btnText = selectedBtn.textContent.trim().toLowerCase();
            countbar(btnText);
          }
        }
      });
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
