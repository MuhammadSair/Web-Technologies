let allStories = [];

async function displayStories(query = "") {
  try {
    const response = await fetch("https://usmanlive.com/wp-json/api/stories");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    allStories = data;
    const storiesList = document.getElementById("storiesList");
    storiesList.innerHTML = "";

    const filteredStories = allStories.filter((story) =>
      story.title.toLowerCase().includes(query.toLowerCase())
    );

    filteredStories.forEach((story) => {
      const storyDiv = document.createElement("div");
      storyDiv.className = "mb-3";
      storyDiv.innerHTML = `
                  <h3>${story.title}</h3>
                  <div>${story.content}</div>
                  <div>
                      <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${story.id}">Edit</button>
                      <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${story.id}">Delete</button>
                  </div>
                  <hr />
              `;
      storiesList.appendChild(storyDiv);
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
  }
}

async function deleteStory(event) {
  event.preventDefault();
  const storyId = this.getAttribute("data-id");
  try {
    const response = await fetch(
      `https://usmanlive.com/wp-json/api/stories/${storyId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    displayStories(); // Refresh the list after deleting a story
  } catch (error) {
    console.error("Error deleting story:", error);
  }
}

async function handleFormSubmission(event) {
  event.preventDefault();
  const storyId = document.getElementById("createBtn").getAttribute("data-id");
  const title = document.getElementById("createTitle").value;
  const content = document.getElementById("createContent").value;
  const url = storyId
    ? `https://usmanlive.com/wp-json/api/stories/${storyId}`
    : "https://usmanlive.com/wp-json/api/stories";
  const method = storyId ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    displayStories(); // Refresh the list after creating/updating a story
  } catch (error) {
    console.error("Error creating/updating story:", error);
  }
}

async function editBtnClicked(event) {
  event.preventDefault();
  const storyId = this.getAttribute("data-id");
  try {
    const response = await fetch(
      `https://usmanlive.com/wp-json/api/stories/${storyId}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    document.getElementById("clearBtn").style.display = "block";

    document.getElementById("createTitle").value = data.title;
    document.getElementById("createContent").value = data.content;

    const createBtn = document.getElementById("createBtn");
    createBtn.textContent = "Update";
    createBtn.setAttribute("data-id", data.id);
  } catch (error) {
    console.error("Error fetching story:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayStories();

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-del")) {
      deleteStory.call(event.target, event);
    } else if (event.target.classList.contains("btn-edit")) {
      editBtnClicked.call(event.target, event);
    }
  });

  document
    .getElementById("createForm")
    .addEventListener("submit", handleFormSubmission);

  document
    .getElementById("searchField")
    .addEventListener("input", function (e) {
      displayStories(e.target.value);
    });

  document.getElementById("clearBtn").addEventListener("click", function (e) {
    e.preventDefault();
    this.style.display = "none";
    const createBtn = document.getElementById("createBtn");
    createBtn.removeAttribute("data-id");
    createBtn.textContent = "Create";
    document.getElementById("createTitle").value = "";
    document.getElementById("createContent").value = "";
  });
});
