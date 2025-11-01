document.addEventListener("DOMContentLoaded", function () {
  const userName = document.getElementById("userName");
  const moodButtons = document.querySelectorAll(".mood-btn");
  const userGoal = document.getElementById("userGoal");
  const generateBtn = document.getElementById("generateBtn");
  const inputSection = document.getElementById("inputSection");
  const resultSection = document.getElementById("resultSection");
  const userGreeting = document.getElementById("userGreeting");
  const fortuneMessage = document.getElementById("fortuneMessage");
  const fortuneAdvice = document.getElementById("fortuneAdvice");
  const newFortuneBtn = document.getElementById("newFortuneBtn");

  let selectedMood = "";

  // Mood → color map
  const moodColors = {
    happy: "yellow",
    motivated: "red",
    creative: "purple",
    relaxed: "emerald",
    adventurous: "orange",
    focused: "blue",
    curious: "pink",
    chill: "lime",
  };

  // Core fortune messages
  const messages = {
    happy: [
      "Your joy is contagious! Spread that positive energy everywhere you go today.",
      "Happiness looks gorgeous on you! Let that inner light shine brightly.",
      "The universe is smiling with you today. Embrace every joyful moment.",
    ],
    motivated: [
      "You have the power to move mountains today. Trust in your strength.",
      "Your determination is unstoppable. Channel that energy into your biggest goals.",
      "Today is your day to shine! Your hard work is about to pay off.",
    ],
    creative: [
      "Your imagination knows no bounds today. Create something that makes your soul sing.",
      "Innovative ideas are flowing to you. Trust your unique perspective.",
      "The world needs your creative voice. Express yourself boldly!",
    ],
    relaxed: [
      "Peace flows through you effortlessly. Enjoy this state of calm.",
      "Your serene energy creates harmony around you.",
      "You are exactly where you need to be. Breathe deeply and relax.",
    ],
    adventurous: [
      "Adventure calls your name! Say yes to new experiences.",
      "Your courageous spirit is ready for excitement.",
      "Explore, discover, and collect beautiful memories today.",
    ],
    focused: [
      "Your concentration is laser-sharp today.",
      "Clarity of mind guides your every action.",
      "No challenge is too great. You've got this!",
    ],
    curious: [
      "Your inquisitive mind will uncover fascinating insights today.",
      "Follow your questions with enthusiasm.",
      "Curiosity leads to discovery — keep asking why!",
    ],
    chill: [
      "Good vibes only today! Your relaxed energy attracts positivity.",
      "You're in the perfect flow state.",
      "Your calm presence makes everything better.",
    ],
  };

  // Advice by goal
  const advice = {
    productivity: "Break big tasks into small steps and celebrate each one.",
    learning: "Stay open-minded — the best lessons often come unexpectedly.",
    creativity: "Don't judge your first drafts. Let ideas flow freely.",
    health: "Listen to your body's needs and honor them with kindness.",
    relationships: "Authentic connections begin with honest communication.",
    mindfulness: "Pause throughout your day to breathe and be present.",
    growth: "Growth happens outside comfort zones. Embrace the discomfort.",
  };

  // Update color theme
  function updateTheme(color) {
    [generateBtn, newFortuneBtn].forEach((btn) => {
      if (!btn) return;
      btn.className = `transition w-full sm:w-auto px-6 py-3 rounded-xl text-white font-medium bg-${color}-500 hover:bg-${color}-600 flex items-center justify-center gap-2`;
    });

    if (fortuneMessage) {
      fortuneMessage.className = `p-4 bg-${color}-50 border-l-4 border-${color}-500 rounded-xl text-lg font-medium text-gray-800 mb-4`;
    }
  }

  // Mood selection logic
  moodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const mood = this.dataset.mood;
      const color = moodColors[mood];

      // Reset all
      moodButtons.forEach((btn) => {
        btn.classList.remove(
          "text-white",
          "ring-2",
          "scale-105",
          "bg-yellow-500",
          "bg-red-500",
          "bg-purple-500",
          "bg-emerald-500",
          "bg-orange-500",
          "bg-blue-500",
          "bg-pink-500",
          "bg-lime-500",
          "ring-yellow-300",
          "ring-red-300",
          "ring-purple-300",
          "ring-emerald-300",
          "ring-orange-300",
          "ring-blue-300",
          "ring-pink-300",
          "ring-lime-300"
        );
        btn.classList.add("bg-white", "text-gray-800", "hover:scale-100");

        const icon = btn.querySelector("svg");
        if (icon) {
          icon.classList.remove("text-white");
          icon.classList.add("text-gray-700");
          icon.style.color = "";
        }
      });

      // Highlight selected mood
      this.classList.remove("bg-white", "text-gray-800");
      this.classList.add(
        `bg-${color}-500`,
        `ring-${color}-300`,
        "text-white",
        "ring-2",
        "scale-105",
        "transition"
      );

      // Keep icon visible
      const selectedIcon = this.querySelector("svg");
      if (selectedIcon) {
        selectedIcon.classList.remove("text-gray-700");
        selectedIcon.classList.add("text-white");
        selectedIcon.style.color = "white";
      }

      selectedMood = mood;
      updateTheme(color);
    });
  });

  // Generate fortune
  generateBtn.addEventListener("click", function () {
    if (!userName.value.trim() || !selectedMood || !userGoal.value) {
      alert("Please fill in all fields to generate your fortune!");
      return;
    }

    const name = userName.value.trim();
    const moodMessages = messages[selectedMood];
    const randomMessage =
      moodMessages[Math.floor(Math.random() * moodMessages.length)];
    const goalAdvice = advice[userGoal.value];

    userGreeting.textContent = `Dear ${name}, here’s what the cookies say about your ${selectedMood} energy:`;
    fortuneMessage.textContent = `"${randomMessage}"`;
    fortuneAdvice.textContent = `For your goal of ${userGoal.options[userGoal.selectedIndex].text}: ${goalAdvice}`;

    inputSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
  });

  // ✅ Fully reset page (acts like refresh)
  newFortuneBtn.addEventListener("click", function () {
    location.reload();
  });
});
