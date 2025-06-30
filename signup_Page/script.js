// Add Skill Tag
function addSkill() {
  const input = document.getElementById("skillInput");
  const container = document.getElementById("skillsContainer");
  const value = input.value.trim();

  if (value === "") return;

  const tag = document.createElement("div");
  tag.className = "skill-tag";
  tag.innerHTML = `${value} <span onclick="removeSkill(this)">×</span>`;
  container.appendChild(tag);

  input.value = "";
}

// Remove Skill Tag
function removeSkill(element) {
  element.parentElement.remove();
}
