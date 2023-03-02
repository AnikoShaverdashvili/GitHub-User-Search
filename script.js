const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
const cards = document.querySelectorAll(".card");
const title = document.querySelector(".title");
const themeTxt = document.querySelector(".themeTxt");
const input = document.querySelector("#user");
const btn = document.querySelector(".btn");
const avatarDesktop = document.querySelector(".avatar-d");
const avatarMobile = document.querySelector(".avatar-m");
const name = document.querySelector(".name");
const login = document.querySelector(".login");
const joinDate = document.querySelector(".join-date");
const bio = document.querySelector(".bio");
const repository = document.querySelector(".rep");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const statistic = document.querySelector(".statistic");
const statisticTitle = document.querySelectorAll(".stat-title");
const statisticAmount = document.querySelectorAll(".stat-amount");
const address = document.querySelector(".address");
const link = document.querySelector(".link");
const twitter = document.querySelector(".twitter");
const office = document.querySelector(".office");
const locationTxt = document.querySelectorAll(".locationTxt");
const error = document.querySelector(".err");
const fills = document.querySelectorAll(".fill");
//create object
const octocat = {
  avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
  bio: null,
  blog: "https://github.blog",
  company: "@github",
  created_at: "2011-01-25T18:44:36Z",
  email: null,
  events_url: "https://api.github.com/users/octocat/events{/privacy}",
  followers: 8291,
  followers_url: "https://api.github.com/users/octocat/followers",
  following: 9,
  following_url: "https://api.github.com/users/octocat/following{/other_user}",
  gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
  gravatar_id: "",
  hireable: null,
  html_url: "https://github.com/octocat",
  id: 583231,
  location: "San Francisco",
  login: "octocat",
  name: "The Octocat",
  node_id: "MDQ6VXNlcjU4MzIzMQ==",
  organizations_url: "https://api.github.com/users/octocat/orgs",
  public_gists: 8,
  public_repos: 8,
  received_events_url: "https://api.github.com/users/octocat/received_events",
  repos_url: "https://api.github.com/users/octocat/repos",
  site_admin: false,
  starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
  twitter_username: null,
  type: "User",
  updated_at: "2023-01-22T12:13:51Z",
  url: "https://api.github.com/users/octocat",
};
// end object create

//add event listener for input to clear error message when user exists
input.addEventListener("input", () => {
  error.textContent = "";
});

//function to transform date

const dateTransformer = (date) => {
  const dateObj = new Date(date);
  const dateString = dateObj.toDateString();
  const [weekday, month, day, year] = dateString.split(" ");
  return `${day} ${month} ${year}`;
};

// funcion to display the user information

const displayInfo = (user) => {
  avatarMobile.src = user.avatar_url;
  avatarDesktop.src = user.avatar_url;
  name.textContent = user.name;
  login.textContent = "@" + user.login;
  const date = dateTransformer(user.created_at);
  joinDate.textContent = "Joined " + date;
  bio.textContent =
    user.bio ||
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.";
  repository.textContent = user.public_repos;
  followers.textContent = user.followers;
  following.textContent = user.following;
  if (user.location) {
    address.textContent = user.location;
  } else {
    notAvailable(address);
  }
  if (user.blog) {
    link.textContent = user.blog;
    link.href = user.blog;
  } else {
    link.href = "#";
    notAvailable(link);
  }
  if (user.twitter_username) {
    twitter.textContent = user.twitter_username;
  } else {
    notAvailable(twitter);
  }
  if (user.company) {
    office.textContent = user.company;
  } else {
    notAvailable(office);
  }
};

// function for not available locations
const notAvailable = (location) => {
  location.textContent = "Not Available";
  location.parentElement.style.opacity = 0.5;
};

displayInfo(octocat);

//function for fliping the thems
const flipTheme = function (theme) {
  if (theme === "dark") {
    moon.style.display = "none";
    sun.style.display = "block";
    document.body.style.backgroundColor = "#141D2F";
    themeTxt.textContent = "light";
  } else {
    moon.style.display = "block";
    sun.style.display = "none";
    document.body.style.backgroundColor = "#f6f8ff";
    themeTxt.textContent = "dark";
  }
  title.classList.toggle("dark");
  themeTxt.classList.toggle("dark");
  input.classList.toggle("dark");
  name.classList.toggle("dark");
  joinDate.classList.toggle("dark");
  Array.from(cards).forEach((card) => card.classList.toggle("dark"));
  bio.classList.toggle("dark");
  statistic.classList.toggle("dark");

  Array.from(statisticAmount).forEach((amount) =>
    amount.classList.toggle("dark")
  );
  Array.from(statisticTitle).forEach((title) => title.classList.toggle("dark"));

  Array.from(locationTxt).forEach((location) =>
    location.classList.toggle("dark")
  );
  Array.from(fills).forEach((fill) => fill.classList.toggle("dark"));
};

//click events for changing themes
moon.addEventListener("click", () => flipTheme("dark"));
sun.addEventListener("click", () => flipTheme("light"));

//add click event for button , when button is pressed user will be found
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("https://api.github.com/users/" + input.value);
    if (!response.ok) {
      throw new Error("No result");
    }
    const user = await response.json();
    displayInfo(user);
    input.value = "";
  } catch (err) {
    error.textContent = err.message;
  }
});
