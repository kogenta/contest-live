// Contest Voting App - Main Application Logic

// Scoring Criteria
const CRITERIA = [
  { id: "appearance", name: "Appearance / Costume", max: 10 },
  { id: "creativity", name: "Creativity / Originality", max: 10 },
  { id: "performance", name: "Performance / Presentation", max: 10 },
  { id: "theme", name: "Theme Adherence (Animal)", max: 10 },
];

// Current user state
let currentJudge = null;
let currentJudgeId = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  console.log("Contest Vote App Initialized");
  checkFirebaseConnection();
  setupDefaultData();
});

// Check Firebase connection
function checkFirebaseConnection() {
  const connectedRef = firebase.database().ref(".info/connected");
  connectedRef.on("value", (snap) => {
    if (snap.val() === true) {
      console.log("✅ Connected to Firebase");
      // Remove any disconnection warnings
      const existingWarning = document.getElementById("connection-warning");
      if (existingWarning) {
        existingWarning.remove();
      }
    } else {
      console.log("❌ Disconnected from Firebase");
      // Show warning to user
      showConnectionWarning();
    }
  });
}

// Show connection warning
function showConnectionWarning() {
  const existingWarning = document.getElementById("connection-warning");
  if (existingWarning) return; // Already showing

  const warning = document.createElement("div");
  warning.id = "connection-warning";
  warning.className = "error";
  warning.style.position = "fixed";
  warning.style.top = "20px";
  warning.style.left = "50%";
  warning.style.transform = "translateX(-50%)";
  warning.style.zIndex = "10000";
  warning.style.maxWidth = "500px";
  warning.textContent =
    "⚠️ Connection lost! Scores may not sync. Please check your internet connection.";
  document.body.appendChild(warning);
}

// Setup default data in Firebase
function setupDefaultData() {
  // Setup admin PIN (default: 9999)
  const adminRef = database.ref("admin");
  adminRef.once("value", (snapshot) => {
    if (!snapshot.exists()) {
      adminRef.set({
        pin: "9999",
        email: "admin@contest.local",
      });
    }
  });

  // Setup default judge PINs (all set to 1234 for easy testing)
  const judgesRef = database.ref("judges");
  judgesRef.once("value", (snapshot) => {
    if (!snapshot.exists()) {
      const defaultJudges = {};
      for (let i = 1; i <= 10; i++) {
        defaultJudges[`judge${i}`] = {
          name: `Judge ${i}`,
          pin: "1234",
          active: i <= 5, // Only first 5 judges active by default
        };
      }
      judgesRef.set(defaultJudges);
    }
  });

  // Setup sample contestants if none exist
  const contestantsRef = database.ref("contestants");
  contestantsRef.once("value", (snapshot) => {
    if (!snapshot.exists()) {
      const sampleContestants = {
        c1: { name: "Lion King", number: 1 },
        c2: { name: "Butterfly Beauty", number: 2 },
        c3: { name: "Penguin Power", number: 3 },
      };
      contestantsRef.set(sampleContestants);
    }
  });
}

// Show/Hide screens
function showRoleSelection() {
  hideAllScreens();
  document.getElementById("role-selection").classList.remove("hidden");
}

function showJudgeLogin() {
  hideAllScreens();
  document.getElementById("judge-login").classList.remove("hidden");
}

function showAdminLogin() {
  hideAllScreens();
  document.getElementById("admin-login").classList.remove("hidden");
}

function showAdmin() {
  hideAllScreens();
  document.getElementById("admin-panel").classList.remove("hidden");
  loadAdminData();
}

function showPublicDisplay() {
  hideAllScreens();
  document.getElementById("public-display").classList.remove("hidden");
  loadPublicRankings();
}

function hideAllScreens() {
  document.getElementById("role-selection").classList.add("hidden");
  document.getElementById("judge-login").classList.add("hidden");
  document.getElementById("admin-login").classList.add("hidden");
  document.getElementById("judge-panel").classList.add("hidden");
  document.getElementById("admin-panel").classList.add("hidden");
  document.getElementById("public-display").classList.add("hidden");
}

// Judge Login
function judgeLogin() {
  const judgeSelect = document.getElementById("judge-select");
  const pinInput = document.getElementById("judge-pin");

  const judgeId = judgeSelect.value;
  const pin = pinInput.value;

  if (!judgeId) {
    alert("Please select a judge");
    return;
  }

  if (!pin || pin.length !== 4) {
    alert("Please enter a 4-digit PIN");
    return;
  }

  // Validate PIN contains only digits
  if (!/^\d{4}$/.test(pin)) {
    alert("PIN must be exactly 4 digits (0-9)");
    return;
  }

  // Verify PIN
  database.ref(`judges/${judgeId}`).once("value", (snapshot) => {
    const judge = snapshot.val();

    if (!judge) {
      alert("Judge not found");
      return;
    }

    if (judge.pin !== pin) {
      alert("Invalid PIN");
      return;
    }

    if (!judge.active) {
      alert("This judge account is not active. Please contact admin.");
      return;
    }

    // Login successful
    currentJudge = judge.name;
    currentJudgeId = judgeId;

    // Clear form
    pinInput.value = "";

    // Show judge panel
    showJudgePanel();
  });
}

// Admin Login
function adminLogin() {
  const pinInput = document.getElementById("admin-pin");
  const pin = pinInput.value;

  if (!pin || pin.length !== 4) {
    alert("Please enter a 4-digit PIN");
    return;
  }

  // Validate PIN contains only digits
  if (!/^\d{4}$/.test(pin)) {
    alert("PIN must be exactly 4 digits (0-9)");
    return;
  }

  // Verify admin PIN
  database.ref("admin").once("value", (snapshot) => {
    const admin = snapshot.val();

    if (!admin) {
      alert("Admin not configured. Default PIN is: 9999");
      return;
    }

    if (admin.pin !== pin) {
      alert("Invalid admin PIN");
      return;
    }

    // Login successful
    pinInput.value = "";
    showAdmin();
  });
}

// Show Judge Panel
function showJudgePanel() {
  hideAllScreens();
  document.getElementById("judge-panel").classList.remove("hidden");
  document.getElementById("judge-name").textContent = currentJudge;

  loadContestantsForJudge();
}

// Load contestants for judge scoring
function loadContestantsForJudge() {
  const contestantList = document.getElementById("contestant-list");
  contestantList.innerHTML =
    '<div class="loading">Loading contestants...</div>';

  database.ref("contestants").on("value", (snapshot) => {
    const contestants = snapshot.val();

    if (!contestants) {
      contestantList.innerHTML = "<p>No contestants available</p>";
      return;
    }

    contestantList.innerHTML = "";

    // Sort by number
    const sortedContestants = Object.entries(contestants).sort(
      (a, b) => a[1].number - b[1].number
    );

    sortedContestants.forEach(([contestantId, contestant]) => {
      const card = createContestantCard(contestantId, contestant);
      contestantList.appendChild(card);
    });
  });
}

// Create contestant card for scoring
function createContestantCard(contestantId, contestant) {
  const card = document.createElement("div");
  card.className = "contestant-card";
  card.id = `card-${contestantId}`;

  // Check if judge has already scored
  database
    .ref(`scores/${contestantId}/${currentJudgeId}`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        card.classList.add("scored");
      }
    });

  const header = document.createElement("div");
  header.className = "contestant-header";
  header.innerHTML = `
        <div class="contestant-info">
            <h3>${contestant.name}</h3>
        </div>
        <div class="contestant-number">${contestant.number}</div>
    `;
  card.appendChild(header);

  const criteriaDiv = document.createElement("div");
  criteriaDiv.className = "criteria-scoring";

  let totalScore = 0;
  const scores = {};

  CRITERIA.forEach((criteria) => {
    const criteriaItem = document.createElement("div");
    criteriaItem.className = "criteria-item";

    const defaultValue = Math.floor(criteria.max / 2);
    scores[criteria.id] = defaultValue;

    criteriaItem.innerHTML = `
            <label>
                <span>${criteria.name}</span>
                <span class="score-value" id="score-${contestantId}-${criteria.id}">${defaultValue}/${criteria.max}</span>
            </label>
            <input type="range" 
                   min="0" 
                   max="${criteria.max}" 
                   value="${defaultValue}" 
                   id="range-${contestantId}-${criteria.id}"
                   data-contestant="${contestantId}"
                   data-criteria="${criteria.id}">
        `;

    criteriaDiv.appendChild(criteriaItem);

    // Add event listener for range input
    setTimeout(() => {
      const rangeInput = document.getElementById(
        `range-${contestantId}-${criteria.id}`
      );
      rangeInput.addEventListener("input", function () {
        const value = parseInt(this.value);
        document.getElementById(
          `score-${contestantId}-${criteria.id}`
        ).textContent = `${value}/${criteria.max}`;

        // Update total
        updateTotalScore(contestantId);
      });
    }, 0);
  });

  card.appendChild(criteriaDiv);

  // Total score display
  const totalDiv = document.createElement("div");
  totalDiv.className = "total-score";
  totalDiv.id = `total-${contestantId}`;
  totalDiv.textContent = `Total: ${totalScore}/${CRITERIA.reduce(
    (sum, c) => sum + c.max,
    0
  )}`;
  card.appendChild(totalDiv);

  // Submit button
  const submitBtn = document.createElement("button");
  submitBtn.className = "submit-score-btn";
  submitBtn.textContent = "Submit Score";
  submitBtn.onclick = () => submitScore(contestantId);
  card.appendChild(submitBtn);

  // Load existing scores
  database
    .ref(`scores/${contestantId}/${currentJudgeId}`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const existingScores = snapshot.val();
        CRITERIA.forEach((criteria) => {
          if (existingScores[criteria.id] !== undefined) {
            const rangeInput = document.getElementById(
              `range-${contestantId}-${criteria.id}`
            );
            if (rangeInput) {
              rangeInput.value = existingScores[criteria.id];
              document.getElementById(
                `score-${contestantId}-${criteria.id}`
              ).textContent = `${existingScores[criteria.id]}/${criteria.max}`;
            }
          }
        });
        updateTotalScore(contestantId);
      }
    });

  return card;
}

// Update total score display
function updateTotalScore(contestantId) {
  let total = 0;
  let max = 0;

  CRITERIA.forEach((criteria) => {
    const rangeInput = document.getElementById(
      `range-${contestantId}-${criteria.id}`
    );
    if (rangeInput) {
      total += parseInt(rangeInput.value);
      max += criteria.max;
    }
  });

  const totalDiv = document.getElementById(`total-${contestantId}`);
  if (totalDiv) {
    totalDiv.textContent = `Total: ${total}/${max}`;
  }
}

// Submit score for contestant
function submitScore(contestantId) {
  const scores = {};
  let total = 0;

  CRITERIA.forEach((criteria) => {
    const rangeInput = document.getElementById(
      `range-${contestantId}-${criteria.id}`
    );
    const value = parseInt(rangeInput.value);
    scores[criteria.id] = value;
    total += value;
  });

  scores.total = total;
  scores.timestamp = firebase.database.ServerValue.TIMESTAMP;
  scores.judge = currentJudge;

  // Save to Firebase
  database
    .ref(`scores/${contestantId}/${currentJudgeId}`)
    .set(scores)
    .then(() => {
      const card = document.getElementById(`card-${contestantId}`);
      card.classList.add("scored");
      alert("Score submitted successfully! ✅");
    })
    .catch((error) => {
      console.error("Error submitting score:", error);
      alert(
        "Failed to submit score. Please check your internet connection and try again."
      );
    });
}

// Logout
function logout() {
  currentJudge = null;
  currentJudgeId = null;
  showRoleSelection();
}

// Admin Panel Functions
function loadAdminData() {
  loadJudgeList();
  loadAdminContestants();
}

function loadJudgeList() {
  const judgeList = document.getElementById("judge-list");
  judgeList.innerHTML = '<div class="loading">Loading judges...</div>';

  database.ref("judges").on("value", (snapshot) => {
    const judges = snapshot.val();

    if (!judges) {
      judgeList.innerHTML = "<p>No judges configured</p>";
      return;
    }

    judgeList.innerHTML = "";

    // Sort by judge number
    const sortedJudges = Object.entries(judges).sort((a, b) => {
      const numA = parseInt(a[0].replace("judge", "")) || 0;
      const numB = parseInt(b[0].replace("judge", "")) || 0;
      return numA - numB;
    });

    sortedJudges.forEach(([judgeId, judge]) => {
      const judgeItem = document.createElement("div");
      judgeItem.className = "judge-item";

      const statusClass = judge.active ? "active" : "inactive";
      const statusText = judge.active ? "Active" : "Inactive";

      // Create elements safely to prevent XSS
      const judgeInfo = document.createElement("div");
      judgeInfo.className = "judge-info";

      const judgeName = document.createElement("strong");
      judgeName.textContent = judge.name; // Safe: uses textContent

      const statusSpan = document.createElement("span");
      statusSpan.className = `judge-status ${statusClass}`;
      statusSpan.textContent = statusText;

      judgeInfo.appendChild(judgeName);
      judgeInfo.appendChild(statusSpan);

      const judgeActions = document.createElement("div");
      judgeActions.className = "judge-actions";

      const changePinBtn = document.createElement("button");
      changePinBtn.textContent = "Change PIN";
      changePinBtn.onclick = () => editJudgePIN(judgeId, judge.name);

      const toggleStatusBtn = document.createElement("button");
      toggleStatusBtn.textContent = judge.active ? "Deactivate" : "Activate";
      toggleStatusBtn.onclick = () => toggleJudgeStatus(judgeId, !judge.active);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "danger-btn-small";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteJudge(judgeId);

      judgeActions.appendChild(changePinBtn);
      judgeActions.appendChild(toggleStatusBtn);
      judgeActions.appendChild(deleteBtn);

      judgeItem.appendChild(judgeInfo);
      judgeItem.appendChild(judgeActions);

      judgeList.appendChild(judgeItem);
    });
  });
}

function addNewJudge() {
  const nameInput = document.getElementById("new-judge-name");
  const numberInput = document.getElementById("new-judge-number");
  const pinInput = document.getElementById("new-judge-pin");
  const activeCheckbox = document.getElementById("new-judge-active");

  const name = nameInput.value.trim();
  const number = parseInt(numberInput.value);
  const pin = pinInput.value;
  const active = activeCheckbox.checked;

  if (!name) {
    alert("Please enter judge name");
    return;
  }

  if (!number || number < 1 || number > 20) {
    alert("Please enter a valid judge number (1-20)");
    return;
  }

  if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    alert("Please enter a valid 4-digit PIN");
    return;
  }

  const judgeId = `judge${number}`;

  // Check if judge already exists
  database.ref(`judges/${judgeId}`).once("value", (snapshot) => {
    if (snapshot.exists()) {
      if (
        !confirm(`Judge ${number} already exists. Do you want to overwrite?`)
      ) {
        return;
      }
    }

    // Add/update judge
    database
      .ref(`judges/${judgeId}`)
      .set({
        name: name,
        pin: pin,
        active: active,
      })
      .then(() => {
        nameInput.value = "";
        numberInput.value = "";
        pinInput.value = "";
        activeCheckbox.checked = true;
        alert("Judge added successfully! ✅");
      })
      .catch((error) => {
        console.error("Error adding judge:", error);
        alert("Failed to add judge. Please try again.");
      });
  });
}

function editJudgePIN(judgeId, judgeName) {
  const newPIN = prompt(`Enter new PIN for ${judgeName} (4 digits):`);

  if (!newPIN) {
    return; // User cancelled
  }

  if (newPIN.length !== 4 || !/^\d{4}$/.test(newPIN)) {
    alert("PIN must be exactly 4 digits (0-9)");
    return;
  }

  database
    .ref(`judges/${judgeId}/pin`)
    .set(newPIN)
    .then(() => {
      alert("PIN updated successfully! ✅");
    })
    .catch((error) => {
      console.error("Error updating PIN:", error);
      alert("Failed to update PIN. Please try again.");
    });
}

function toggleJudgeStatus(judgeId, newStatus) {
  database
    .ref(`judges/${judgeId}/active`)
    .set(newStatus)
    .then(() => {
      alert(
        `Judge ${newStatus ? "activated" : "deactivated"} successfully! ✅`
      );
    })
    .catch((error) => {
      console.error("Error updating judge status:", error);
      alert("Failed to update judge status. Please try again.");
    });
}

function deleteJudge(judgeId) {
  if (
    !confirm(
      "Are you sure you want to delete this judge? This cannot be undone."
    )
  ) {
    return;
  }

  database
    .ref(`judges/${judgeId}`)
    .remove()
    .then(() => {
      alert("Judge deleted successfully! ✅");
    })
    .catch((error) => {
      console.error("Error deleting judge:", error);
      alert("Failed to delete judge. Please try again.");
    });
}

function loadAdminContestants() {
  const adminList = document.getElementById("admin-contestant-list");
  adminList.innerHTML = '<div class="loading">Loading...</div>';

  database.ref("contestants").on("value", (snapshot) => {
    const contestants = snapshot.val();

    if (!contestants) {
      adminList.innerHTML = "<p>No contestants yet</p>";
      return;
    }

    adminList.innerHTML = "";

    const sortedContestants = Object.entries(contestants).sort(
      (a, b) => a[1].number - b[1].number
    );

    sortedContestants.forEach(([contestantId, contestant]) => {
      const item = document.createElement("div");
      item.className = "contestant-item";
      item.innerHTML = `
                <div>
                    <strong>#${contestant.number}</strong> - ${contestant.name}
                </div>
                <button onclick="deleteContestant('${contestantId}')">Delete</button>
            `;
      adminList.appendChild(item);
    });
  });
}

function addContestant() {
  const nameInput = document.getElementById("contestant-name");
  const numberInput = document.getElementById("contestant-number");

  const name = nameInput.value.trim();
  const number = parseInt(numberInput.value);

  if (!name) {
    alert("Please enter contestant name");
    return;
  }

  if (!number || number < 1) {
    alert("Please enter a valid contestant number");
    return;
  }

  // Use Firebase transaction to prevent race conditions
  const newContestantRef = database.ref("contestants").push();
  const contestantId = newContestantRef.key;

  database.ref("contestants").transaction(
    (currentContestants) => {
      if (currentContestants) {
        // Check if number already exists
        const numberExists = Object.values(currentContestants).some(
          (c) => c && c.number === number
        );
        if (numberExists) {
          // Abort transaction
          return undefined;
        }
      }

      // Add new contestant
      return {
        ...(currentContestants || {}),
        [contestantId]: {
          name: name,
          number: number,
        },
      };
    },
    (error, committed, snapshot) => {
      if (error) {
        console.error("Transaction error:", error);
        alert("Failed to add contestant. Please try again.");
      } else if (!committed) {
        alert(
          "This contestant number already exists. Please choose a different number."
        );
      } else {
        nameInput.value = "";
        numberInput.value = "";
        alert("Contestant added successfully! ✅");
      }
    }
  );
}

function deleteContestant(contestantId) {
  if (
    !confirm(
      "Are you sure you want to delete this contestant? This will also delete all scores."
    )
  ) {
    return;
  }

  // Delete contestant
  database.ref(`contestants/${contestantId}`).remove();

  // Delete scores
  database.ref(`scores/${contestantId}`).remove();
}

function resetAllScores() {
  if (
    !confirm(
      "Are you sure you want to reset ALL scores? This cannot be undone!"
    )
  ) {
    return;
  }

  database
    .ref("scores")
    .remove()
    .then(() => {
      alert("All scores have been reset ✅");
    })
    .catch((error) => {
      alert("Error resetting scores: " + error.message);
    });
}

// Public Display Functions
function loadPublicRankings() {
  const rankingsDisplay = document.getElementById("rankings-display");

  // Listen for changes in real-time
  database.ref("contestants").on("value", () => {
    updateRankings();
  });

  database.ref("scores").on("value", () => {
    updateRankings();
  });
}

function updateRankings() {
  const rankingsDisplay = document.getElementById("rankings-display");
  rankingsDisplay.innerHTML = '<div class="loading">Loading rankings...</div>';

  // Get all contestants
  database.ref("contestants").once("value", (contestantsSnapshot) => {
    const contestants = contestantsSnapshot.val();

    if (!contestants) {
      rankingsDisplay.innerHTML = "<p>No contestants available</p>";
      return;
    }

    // Get all scores
    database.ref("scores").once("value", (scoresSnapshot) => {
      const allScores = scoresSnapshot.val() || {};

      // Calculate totals
      const rankings = [];

      Object.entries(contestants).forEach(([contestantId, contestant]) => {
        const contestantScores = allScores[contestantId] || {};
        let totalScore = 0;
        let judgeCount = 0;

        Object.values(contestantScores).forEach((score) => {
          if (score.total !== undefined) {
            totalScore += score.total;
            judgeCount++;
          }
        });

        const avgScore =
          judgeCount > 0 ? (totalScore / judgeCount).toFixed(2) : 0;

        rankings.push({
          contestantId,
          name: contestant.name,
          number: contestant.number,
          totalScore: totalScore,
          avgScore: avgScore,
          judgeCount: judgeCount,
        });
      });

      // Sort by total score descending
      rankings.sort((a, b) => b.totalScore - a.totalScore);

      // Display rankings
      rankingsDisplay.innerHTML = "";

      rankings.forEach((contestant, index) => {
        const rankItem = document.createElement("div");
        rankItem.className = "ranking-item";

        let rankDisplay = "";
        if (index === 0) {
          rankDisplay = '<div class="rank-medal">🥇</div>';
        } else if (index === 1) {
          rankDisplay = '<div class="rank-medal">🥈</div>';
        } else if (index === 2) {
          rankDisplay = '<div class="rank-medal">🥉</div>';
        } else {
          rankDisplay = `<div class="rank-number">${index + 1}</div>`;
        }

        rankItem.innerHTML = `
                    ${rankDisplay}
                    <div class="rank-info">
                        
                        <div class="rank-name">
                          <span class="contestant-number">${contestant.number} </span>
                          ${contestant.name}
                          </div>
                        <div class="rank-details">
                            ${contestant.judgeCount} judge(s) • Avg: ${contestant.avgScore}
                        </div>
                    </div>
                    <div class="rank-score">${contestant.totalScore}</div>
                `;

        rankingsDisplay.appendChild(rankItem);
      });

      if (rankings.length === 0) {
        rankingsDisplay.innerHTML = "<p>No scores submitted yet</p>";
      }
    });
  });
}
