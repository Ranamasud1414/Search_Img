const auth = " 563492ad6f917000010000014d90ada2adb9405dbdab1e1943abc972";
const next = document.querySelector(".next");
const input = document.querySelector("input");
const searchbutton = document.querySelector(".searchbutton");
const loading = document.getElementById("loading");

let pagenum = 1;
let search = false;
let query = "";

input.addEventListener("input", (e) => {
  e.preventDefault();
  query = e.target.value;
});
//.this is creats for photos
async function createdPhotos(pagenum) {
  loading.style.display = "block";

  const data = await fetch(
    `https://api.pexels.com/v1/curated?per_page=21&page=${pagenum}`,

    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  loading.style.display = "none";

  const result = await data.json();
  result.photos.forEach((photo) => {
    const pic = document.createElement("div");
    pic.innerHTML = `<img src=${photo.src.large}>
                <p>photo: ${photo.photographer}</p>
               <a href=${photo.src.large} target="_blank">Download</a>

                `;
    document.querySelector(".gallery").appendChild(pic);
  });
}

// //this is for search for photos
async function searchPhotos(query, pagenum) {
  loading.style.display = "block";
  const data = await fetch(` https://api.pexels.com/v1/search?query=${query}&per_page=21&page=${pagenum}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  loading.style.display = "none";
  const result = await data.json();
  result.photos.forEach((photo) => {
    const pic = document.createElement("div");
    pic.innerHTML = `<img src=${photo.src.large}>
                <p>photo: ${photo.photographer}</p>
              <a href=${photo.src.large} target="_blank">Download</a>

                `;
    document.querySelector(".gallery").appendChild(pic);
  });
}
//click search button

searchbutton.addEventListener("click", () => {
  if (input.value === "") return;
  clear();
  search = true;
  searchPhotos(query, pagenum);
  pagenum++;
});
function clear() {
  input.value = "";
  document.querySelector(".gallery").innerHTML = "";
  pagenum = 1;
}

// when i cliked for photos search
next.addEventListener("click", () => {
  if (!search) {
    pagenum++;
    createdPhotos(pagenum);
  } else {
    if (query.value === "") return;
    pagenum++;
    searchPhotos(query, pagenum);
  }
});
createdPhotos(pagenum);
