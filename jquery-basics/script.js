const sortButton = document.getElementById("sorted");
let persons = ["Zahid", "Adil", "Zain", "Ali"];

$(function () {
  showlist();
});
function sortedPersons() {
  persons.sort();
  showlist();
}
function showlist() {
  $("#persons").html("");
  for (let i = 0; i < persons.length; i++) {
    $("#persons").append("<li>" + persons[i] + "</li>");
  }
}
sortButton.addEventListener("click", sortedPersons);
