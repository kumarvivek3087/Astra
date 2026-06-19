// src/scripts/gallery.js
const imagesPerPage = 24;
let currentPage = 1;

const imageData = {
  images: [
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/1.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/4.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/5.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/6.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/7.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/8.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/9.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/10.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/11+(1).webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/12.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/13.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/14.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/15.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/16.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/17.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/18.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/gallery/19.JPG",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/20.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/21.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/22.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/23.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/24.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/25.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/26.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/27.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/28.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/29.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/30.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/31.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/32.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/33.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/35.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/36.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/37.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/38.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/39.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/40.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/41.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/42.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/43.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/44.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/45.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/46.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/47.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/48.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/49.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/51.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/52.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/53.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/54.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/55.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/56.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/57.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/58.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/59.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/60.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/61.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/62.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/63.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/64.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/65.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/66.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/67.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/68.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/69.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/70.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/71.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/72.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/73.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/74.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/75.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/76.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/77.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/78.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/79.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/80.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/81.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/82.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/83.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/84.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/85.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/86.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/87.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/88.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/89.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/90.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/91.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/92.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/93.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/94.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/95.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/96.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/97.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/98.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/99.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/105.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/106.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/108.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/109.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/110.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/111.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/112.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/114.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/116.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/117.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/118.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/119.webp",
    "https://phn-new-website.s3.ap-south-1.amazonaws.com/assets/img/website+data-web/gallery/120.webp",
  ],
};

const totalPages = Math.ceil(imageData.images.length / imagesPerPage);

//  Shuffle function (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Global variable for shuffled images
let shuffledImages = [];

function renderImages(page) {
  const gallery = document.getElementById("gallery");

  // Safety check
  if (!gallery) {
    console.error(" Gallery element not found!");
    return;
  }

  gallery.innerHTML = "";

  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const currentImages = shuffledImages.slice(startIndex, endIndex);

  if (currentImages.length === 0) {
    gallery.innerHTML = "<p>No images to display.</p>";
    return;
  }

  currentImages.forEach((imgSrc) => {
    if (!imgSrc || imgSrc.trim() === "") return;

    const imgDiv = document.createElement("div");
    imgDiv.className = "col-lg-4 col-md-6 mb-4";

    imgDiv.innerHTML = `
      <div style="width: 100%; height: 300px; overflow: hidden; border-radius: 10px; 
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <img src="${imgSrc}" alt="Gallery Image" loading="lazy"
             style="width: 100%; height: 100%; object-fit: cover;">
      </div>
    `;

    gallery.appendChild(imgDiv);
  });
}

function updatePagination() {
  const pagination = document.getElementById("pagination");

  // Safety check
  if (!pagination) {
    console.error(" Pagination element not found!");
    return;
  }

  const totalPages = Math.ceil(shuffledImages.length / imagesPerPage);

  pagination.innerHTML = `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
        <i class="fa-solid fa-angle-left"></i>
      </a>
    </li>
    ${Array.from({ length: totalPages }, (_, i) => i + 1)
      .map(
        (page) =>
          `<li class="page-item ${page === currentPage ? "active" : ""}">
             <a class="page-link" href="#" onclick="changePage(${page})">${page}</a>
           </li>`,
      )
      .join("")}
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
        <i class="fa-solid fa-angle-right"></i>
      </a>
    </li>
  `;
}

function changePage(page) {
  const totalPages = Math.ceil(shuffledImages.length / imagesPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderImages(currentPage);
  updatePagination();
}

//  Run only after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Gallery script loaded successfully.");

  shuffledImages = shuffleArray(imageData.images);
  console.log(" Images shuffled. Total:", shuffledImages.length);

  renderImages(currentPage);
  updatePagination();
});
