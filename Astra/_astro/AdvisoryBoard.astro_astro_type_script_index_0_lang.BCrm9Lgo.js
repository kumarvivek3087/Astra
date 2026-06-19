const d=document.querySelectorAll(".filter-text-btn"),g=document.querySelectorAll(".team-member"),o=document.getElementById("sectionDescription"),a=document.getElementById("nalfCollegeFilters"),s=document.getElementById("nalfNoResults"),l=document.querySelector(".team-grid"),f=document.querySelectorAll(".nalf-college-btn"),c={nalf:`<div class="desc-icon">
                    <i class="fas fa-user-graduate" style="font-size: 3rem; color: #212529; margin-bottom: 10px;"></i>
                </div>
                <h3 style="font-size: 1.75rem; font-weight: 700; color: #1a1a1a; margin: 10px 0; font-family: Space Grotesk, sans-serif">Academic Council</h3>
                <p style="font-size: 1rem; color: #444; line-height: 1.6; max-width: 700px; margin: 0 auto; text-align: center;">
                    Distinguished academicians from India's premier educational institutions providing strategic guidance and thought leadership.
                </p>`,gepc:`<div class="desc-icon">
                    <i class="fas fa-globe" style="font-size: 3rem; color: #212529; margin-bottom: 10px;"></i>
                </div>
                <h3 style="font-size: 1.75rem; font-weight: 700; color: #1a1a1a; margin: 10px 0; font-family: Space Grotesk, sans-serif">Global Board</h3>
                <p style="font-size: 1rem; color: #444; line-height: 1.6; max-width: 700px; margin: 0 auto; text-align: center;">
                    Experts from the global engineering domain bringing innovation and global best practices.
                </p>`,pslc:`<div class="desc-icon">
                    <i class="fas fa-landmark" style="font-size: 3rem; color: #212529; margin-bottom: 10px;"></i>
                </div>
                <h3 style="font-size: 1.75rem; font-weight: 700; color: #1a1a1a; margin: 10px 0;  font-family: Space Grotesk, sans-serif">Public Sector Leadership Council</h3>
                <p style="font-size: 1rem; color: #444; line-height: 1.6; max-width: 700px; margin: 0 auto; text-align: center;">
                    Senior officials contributing their administrative and strategic experience to shape initiatives.
                </p>`,sdsaf:`<div class="desc-icon">
                    <i class="fas fa-shield-alt" style="font-size: 3rem; color: #212529; margin-bottom: 10px;"></i>
                </div>
                <h3 style="font-size: 1.75rem; font-weight: 700; color: #1a1a1a; margin: 10px 0;  font-family: Space Grotesk, sans-serif">Defence Board</h3>
                <p style="font-size: 1rem; color: #444; line-height: 1.6; max-width: 700px; margin: 0 auto; text-align: center;">
                    Thought leaders and changemakers focusing on sustainability, inclusivity, and societal impact.
                </p>`,iblc:`<div class="desc-icon">
                    <i class="fas fa-building" style="font-size: 3rem; color: #212529; margin-bottom: 10px;"></i>
                </div>
                <h3 style="font-size: 1.75rem; font-weight: 700; color: #1a1a1a; margin: 10px 0; font-family: Space Grotesk, sans-serif">Industry & Business Leadership Council</h3>
                <p style="font-size: 1rem; color: #444; line-height: 1.6; max-width: 700px; margin: 0 auto; text-align: center;">
                    Thought leaders and changemakers focusing on sustainability, inclusivity, and societal impact.
                </p>`};function m(t){l&&(l.classList.remove("center-one","center-two"),t===1?l.classList.add("center-one"):t===2&&l.classList.add("center-two"))}function r(t){if(!s){console.warn("NALF no results element not found. Cannot filter.");return}let e=0;g.forEach(i=>{const n=i.getAttribute("data-group"),u=i.getAttribute("data-college");n==="nalf"&&u===t?(i.style.display="flex",e++):i.style.display="none"}),e===0?s.style.display="block":s.style.display="none",m(e)}function p(t){let e=0;g.forEach(i=>{i.getAttribute("data-group")===t?(i.style.display="flex",e++):i.style.display="none"}),m(e),s&&(s.style.display="none")}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector('.filter-text-btn[data-group="nalf"]');t&&t.classList.add("active"),o&&(o.innerHTML=c.nalf),a&&(a.style.display="flex");const e=document.querySelector('.nalf-college-btn[data-college="iit"]');e&&e.classList.add("active"),r("iit")});d.forEach(t=>{t.addEventListener("click",()=>{d.forEach(i=>i.classList.remove("active")),t.classList.add("active");const e=t.getAttribute("data-group");if(o&&e&&c[e]&&(o.innerHTML=c[e]),e==="nalf"){a&&(a.style.display="flex");const i=document.querySelector(".nalf-college-btn.active"),n=i?i.getAttribute("data-college"):"iit";r(n||"iit")}else a&&(a.style.display="none"),e&&p(e)})});f.forEach(t=>{t.addEventListener("click",()=>{f.forEach(i=>i.classList.remove("active")),t.classList.add("active");const e=t.getAttribute("data-college");e&&r(e)})});
