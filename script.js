const fetchData = (name) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
    .then((res) => res.json())
    .then((data) => {
      showPlayers(data?.player);
      console.log(data);
    });
};

const playerDetails = document.querySelector("#playerDetails");
const playerContainer = document.querySelector("#players");
const searchBtn = document.querySelector("#searchBtn");
const playerName = document.querySelector("#playerName");

const loadAll = () => {
  fetchData("");
  playerName.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.code === "Enter") {
      fetchData(playerName.value);
    }
  });
  searchBtn.addEventListener("click", () => {
    playerDetails.style.display = "none";
    fetchData(playerName.value);
  });
};

const loadPlayerDetails = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      let player = data?.players?.[0];
      console.log(data?.players?.[0]);
      showModal(player);
    });
};

const showModal = (player) => {
  const modal = document.createElement("div");
  console.log(player);
  modal.innerHTML = `
    <div class="modal fade" id="modal-${
      player?.idPlayer
    }" tabindex="-1" aria-labelledby="modal-${player?.idPlayer}-label">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-${player?.idPlayer}-label">${
    player?.strPlayer
  }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <img src="${
                  player?.strThumb
                }" class="img-fluid rounded mx-auto d-block" alt="${
    player?.strPlayer
  }">
              </div>
              <div class="col-md-8">
                <p>${
                  player?.strDescriptionEN || "No description available."
                }</p>
                <div class="row">
                  <div class="col-md-4">
                    <p><strong>Team:</strong> ${player?.strTeam || "N/A"}</p>
                    <p><strong>National Team:</strong> ${
                      player?.strNationalTeam || "N/A"
                    }</p>
                  </div>
                  <div class="col-md-4">
                    <p><strong>Height:</strong> ${
                      player?.strHeight || "N/A"
                    }</p>
                    <p><strong>Weight:</strong> ${
                      player?.strWeight || "N/A"
                    }</p>
                  </div>
                  <div class="col-md-4">
                    <p><strong>Position:</strong> ${
                      player?.strPosition || "N/A"
                    }</p>
                    <p><strong>Nationality:</strong> ${
                      player?.strNationality || "N/A"
                    }</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
  playerDetails.appendChild(modal);
  const modalEl = document.getElementById(`modal-${player?.idPlayer}`);
  const modalInstance = new bootstrap.Modal(modalEl);
  modalInstance.show();
};

const showPlayers = (players) => {
  playerContainer.innerHTML = " ";
  if (players == null) {
    playerContainer.innerHTML = `
      <h4 class="text-muted">Players Not Found, try again!</h4>
    `;
  } else {
    players.forEach((player) => {
      const div = document.createElement("div");
      div.classList.add("col-lg-4", "col-md-6", "col-sm-12");
      div.innerHTML = `
        <div class="card" style="border-radius: 20px; width: 100%">
          <div class="card-body">
            <div class="d-flex flex-wrap justify-content-center">
              <div class="m-2">
                <img
                  src=${player?.strThumb}
                  alt=${player?.strThumb}
                  class="img-fluid"
                  style="width: 150px; border-radius: 10px"
                />
              </div>
              <div class="text-center">
                <h5>${player?.strPlayer}</h5>
                <p class="text-muted">Nationality</p>
                <div class="d-flex justify-content-start rounded-3 p-1 mb-1 bg-body-tertiary">
                  <div>
                    <p class="small text-muted mb-1">Team</p>
                    <p class="mb-0">${player?.strTeam || "N/A"}</p>
                  </div>
                  <div class="px-3">
                    <p class="small text-muted mb-1">Sports</p>
                    <p class="mb-0">${player?.strSport || "N/A"}</p>
                  </div>
                  <div>
                    <p class="small text-muted mb-1">Salary</p>
                    <p class="mb-0">${player?.strSalary || "N/A"}</p>
                  </div>
                </div>
                <div class="d-flex pt-1 align-items-center justify-content-center">
                  <a href="${player?.strInstagram || "#"}" target="_blank">
                    <i class="fa-brands fs-2 m-2 fa-instagram"></i>
                  </a>
                  <a href="${player?.strFacebook || "#"}">
                    <i class="fa-brands fs-2 m-2 fa-facebook"></i>
                  </a>


                  <button
                    type="button"
                    onclick="loadPlayerDetails(${player?.idPlayer})"
                    class="m-2 btn btn-outline-primary btn-sm"

                  >
                    Details
                  </button>


                </div>
                <div class="d-flex pt-1 align-items-center justify-content-center">
                  <button
                    type="button"
                    class="m-2 btn btn-primary flex-grow-1 btn-sm"

                  >
                    Add To Team
                  </button>
                </div>
              </div>
            </div>
            <p class="text-center">
            ${
              (player?.strDescriptionEN || "No description available.").match(
                /(([^\s]+\s\s*){10})(.*)/
              )?.[1] || "No description available."
            }
            </p>
          </div>
        </div>
      `;
      playerContainer.appendChild(div);
    });
  }
};

loadAll();
