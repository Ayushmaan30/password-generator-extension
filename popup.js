const WEAK_PASSWORDS = [
  'password', '123456', 'qwerty', 'letmein', 'welcome', 'admin',
  'monkey', 'dragon', 'master', 'sunshine', 'princess', 'login',
  'abc123', 'iloveyou', 'trustno1', 'password123'
];

const generatedPassword = document.getElementById("generatedPassword");
const strengthFill = document.getElementById("strengthFill");
const strengthLabel = document.getElementById("strengthLabel");
const aiFeedback = document.getElementById("aiFeedback");
const submitBtn = document.getElementById("validateBtn");
const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");
const showBtn = document.getElementById("showBtn");

let showPassword = false;
let currentPassword = "";

// Load saved names from storage on popup open
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['firstName', 'lastName'], (result) => {
    if (result.firstName) document.getElementById("firstName").value = result.firstName;
    if (result.lastName) document.getElementById("lastName").value = result.lastName;
  });
});

// Event listeners
generateBtn.addEventListener('click', generateCustomPassword);
resetBtn.addEventListener('click', resetForm);
copyBtn.addEventListener('click', copyPassword);
showBtn.addEventListener('click', toggleShow);
submitBtn.addEventListener('click', validatePassword);

function toggleShow() {
  showPassword = !showPassword;
  
  if (showPassword) {
    generatedPassword.innerText = currentPassword || "Your password will appear here";
    showBtn.innerText = "Hide";
  } else {
    generatedPassword.innerText = currentPassword ? "•".repeat(currentPassword.length) : "Your password will appear here";
    showBtn.innerText = "Show";
  }
}

function resetForm() {
  currentPassword = "";
  generatedPassword.innerText = "Your password will appear here";
  generatedPassword.style.color = "#43c0f6";
  strengthFill.style.width = "0";
  strengthLabel.innerText = "";
  aiFeedback.innerText = "🤖 Fill in your details and click Generate to create a secure password!";
  submitBtn.disabled = true;
  
  showPassword = false;
  showBtn.innerText = "Show";
}

function aiComment(level, password) {
  const emojis = { Weak: "😬", Moderate: "🧐", Strong: "🚀" };
  const intro = emojis[level] ? emojis[level] + " " : "";
  let tips = [];

  if (password.length === 0) return "🤖 Fill in your details and click Generate!";
  
  if (password.length < 8) {
    tips.push("Make it at least 8 characters.");
  } else if (password.length < 12) {
    tips.push("Try 12+ characters for better security.");
  } else if (password.length < 16) {
    tips.push("Consider 16+ characters for maximum security.");
  }

  if (!/[A-Z]/.test(password)) tips.push("Add uppercase letters.");
  if (!/[a-z]/.test(password)) tips.push("Include lowercase letters.");
  if (!/[0-9]/.test(password)) tips.push("Add numbers.");
  if (!/[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'\",.<>\/?\\|`~]/.test(password)) {
    tips.push("Use special symbols.");
  }

  if (/(.)\1{2,}/.test(password)) {
    tips.push("Avoid repeating characters.");
  }

  const lowerPwd = password.toLowerCase();
  if (WEAK_PASSWORDS.some(weak => lowerPwd.includes(weak))) {
    tips.push("Avoid common words.");
  }

  if (tips.length === 0) {
    return level === "Strong" ? intro + "Excellent! Hacker-proof! 🔒" : intro + "Good, but could be stronger.";
  }

  return intro + tips.join(" ");
}

function checkStrength(pwd) {
  if (!pwd) {
    strengthFill.style.width = "0";
    strengthLabel.innerText = "";
    submitBtn.disabled = true;
    return;
  }

  let score = 0;
  
  if (pwd.length >= 6) score++;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'\",.<>\/?\\|`~]/.test(pwd)) score++;
        
  const hasUpperAndLower = /[A-Z]/.test(pwd) && /[a-z]/.test(pwd);
  const hasLettersAndNumbers = /[A-Za-z]/.test(pwd) && /[0-9]/.test(pwd);
  const hasSpecialChars = /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'\",.<>\/?\\|`~]/.test(pwd);
  
  if (hasUpperAndLower && hasLettersAndNumbers && hasSpecialChars && pwd.length >= 12) {
    score += 2;
  }

  if (/(.)\1{2,}/.test(pwd)) score--;
  if (WEAK_PASSWORDS.some(weak => pwd.toLowerCase().includes(weak))) score -= 2;
  
  score = Math.max(0, Math.min(score, 10));

  let level = "Weak";
  let width = "25%";
  let color = "var(--weak)";

  if (score >= 5 && score < 8) {
    level = "Moderate";
    width = "60%";
    color = "var(--moderate)";
  } else if (score >= 8) {
    level = "Strong";
    width = "100%";
    color = "var(--strong)";
  }

  strengthFill.style.width = width;
  strengthFill.style.background = color;
  strengthLabel.innerText = level;
  aiFeedback.innerText = aiComment(level, pwd);
  
  submitBtn.disabled = (level !== "Strong");
}

function validatePassword() {
  const level = strengthLabel.innerText;
  
  if (!currentPassword) {
    alert("⚠️ Please generate a password first.");
    return;
  }
  
  if (level === "Strong") {
    alert("✅ Password accepted!\n\n🔒 Your password is secure and ready to use.");
  } else {
    alert("⚠️ Password not strong enough.\n\n" + aiFeedback.innerText);
  }
}

function copyPassword() {
  if (!currentPassword) {
    aiFeedback.innerText = "📋 Nothing to copy yet! Generate a password first.";
    return;
  }
  
  navigator.clipboard.writeText(currentPassword)
    .then(() => {
      const prevText = aiFeedback.innerText;
      aiFeedback.innerText = "📋 Copied successfully!";
      setTimeout(() => {
        aiFeedback.innerText = prevText;
      }, 2000);
    })
    .catch(err => {
      aiFeedback.innerText = "❌ Failed to copy.";
      console.error('Copy failed:', err);
    });
}

function generateCustomPassword() {
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();

  if (!first || !last) {
    aiFeedback.innerText = "⚠️ Please enter both first name and last name.";
    return;
  }

  // Save names to storage for next time
  chrome.storage.sync.set({ firstName: first, lastName: last });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  
  // Use name parts
  const namePart = (capitalize(first) + capitalize(last)).substring(0, 8);
  
  // Generate random 2-digit number
  const numPart = String(Math.floor(Math.random() * 90 + 10));
  
  // Generate random special characters (2 chars)
  const specialChars = "!@#$%^&*()_+-=[]{}";
  const symPart = specialChars[Math.floor(Math.random() * specialChars.length)] + 
                  specialChars[Math.floor(Math.random() * specialChars.length)];

  // Add random letters for additional security
  const randomLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let filler = "";
  const targetLength = 14;
  
  while ((namePart + numPart + symPart + filler).length < targetLength) {
    filler += randomLetters[Math.floor(Math.random() * randomLetters.length)];
  }

  const finalPassword = namePart + symPart + numPart + filler;
  currentPassword = finalPassword;

  generatedPassword.innerText = showPassword ? finalPassword : "•".repeat(finalPassword.length);
  generatedPassword.style.color = "#29c44e";
  aiFeedback.innerText = "✨ Generated a secure password with random numbers and symbols!";
  
  checkStrength(finalPassword);
}
