const playerDetails = document.querySelector("#playerDetails");
const fetchData = (name) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
const loadAll = () => {
  fetchData("");
  const searchBtn = document.querySelector("#searchBtn");
  searchBtn.addEventListener("click", () => {
    playerDetails.style.display = "none";
    const playerName = document.querySelector("#playerName").value;
    console.log({ playerName });
    fetchData(playerName);
  });
};
// const showMeals = (players) => {
//   const playerContainer = document.querySelector("#players");
//   playerContainer.innerHTML = " ";
//   if (players == null) {
//     console.log("NO MEALS ");
//     playerContainer.innerHTML = `
//     <h4 class="text-muted">Meal Not Found, try again!</h4>
//   `;
//   } else {
//     players.forEach((player) => {
//       console.log(player);
//       const div = document.createElement("div");
//       div.classList.add("col-lg-4");
//       div.innerHTML = `

//     <button type="button" class="card m-4" data-bs-toggle="modal" data-bs-target="#modal-${
//       player.idMeal
//     }">

//     <img src="${player.strMealThumb}" class="card-img-top" alt="...">
//     <div class="card-body">
//       <p class="card-title text-info">${player.strMeal}</p>
//     </div>

//    </button>

//     <!-- Modal -->

//     <div class="modal fade" id="modal-${
//       player.idMeal
//     }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-${
//         player.idMeal
//       }-label" aria-hidden="true">
//       <div class="modal-dialog">
//         <div class="modal-content">
//           <div class="modal-header">
//             <h5 class="modal-title" id="modal-${player.idMeal}-label">${
//         player.strMeal
//       }

//       </h5>
//             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//           </div>
//           <div class="modal-body">
//             <!-- Add modal content here -->
//             <img src="${player.strMealThumb}" class="card-img-top" alt="...">
//             <div class="card-body">

//             <p class="card-text">${player.strInstructions.slice(0, 250)} ...</p>
//             <ul class="list-group list-group-flush">
//             <li class="list-group-item">${player.strIngredient1}</li>
//             <li class="list-group-item">${player.strIngredient2}</li>
//             <li class="list-group-item">${player.strIngredient3}</li>
//             <li class="list-group-item">${player.strIngredient4}</li>
//           </ul>
//           </div>
//           </div>
//           <div class="modal-footer">
//             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

//           </div>
//         </div>
//       </div>
//     </div>
//   `;
//       playerContainer.appendChild(div);
//     });
//   }
// };

loadAll();
