export const hidePhoneNumber = (phone) => {
  if (typeof phone !== "string" || phone.length < 7) return phone;

  const startDigits = phone.slice(0, 3);
  const middle = "*".repeat(4);
  const endDigits = phone.slice(-(phone.length - 7));

  return startDigits + middle + endDigits;
};

export const getUrlParamsFromJson = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const handleFlyWater = (iconDrop) => {
  const speed = 5000,
    curveDelay = 300,
    position = "fixed";
  let iconEvent = document.querySelector("#icon-event");
  let iconWater = document.querySelector("#show-water");
  let img = document.createElement("img");
  img.src = iconDrop;
  iconWater.style.position = position;
  iconWater.style.top = "50vh";
  iconWater.style.left = "50vw";
  iconWater.style.opacity = "1";
  iconWater.style.transition = `all ${speed / 1000}s ease, top ${
    (speed + curveDelay) / 1000
  }s ease, left ${speed / 1000}s ease, transform ${speed / 3000}s ease ${
    (speed - 10) / 3000
  }s`;

  let flyingBtn = iconWater.cloneNode();

  document.body.appendChild(flyingBtn);
  let rect = iconEvent.getBoundingClientRect();
  flyingBtn.style.top = `${rect.top}px`;
  flyingBtn.style.left = `${rect.left + iconEvent.offsetHeight / 2}px`;
  flyingBtn.style.width = "65px";
  flyingBtn.style.transform = "scale(0)";
  flyingBtn.style.zIndex = "9999";
  flyingBtn.appendChild(img);
  setTimeout(() => {
    flyingBtn.remove();
  }, speed * 1.5);
};
