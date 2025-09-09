const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Animated counters
function animateCounters() {
  const projectsCount = document.getElementById("projectsCount");
  const clientsCount = document.getElementById("clientsCount");
  const experienceCount = document.getElementById("experienceCount");
  const coffeeCount = document.getElementById("coffeeCount");

  const targetProjects = 42;
  const targetClients = 28;
  const targetExperience = 7;
  const targetCoffee = 1000;

  let currentProjects = 0;
  let currentClients = 0;
  let currentExperience = 0;
  let currentCoffee = 0;

  const incrementProjects = targetProjects / 50;
  const incrementClients = targetClients / 50;
  const incrementExperience = targetExperience / 50;
  const incrementCoffee = targetCoffee / 50;

  const counterInterval = setInterval(() => {
    currentProjects += incrementProjects;
    currentClients += incrementClients;
    currentExperience += incrementExperience;
    currentCoffee += incrementCoffee;

    projectsCount.textContent = Math.floor(currentProjects);
    clientsCount.textContent = Math.floor(currentClients);
    experienceCount.textContent = Math.floor(currentExperience);
    coffeeCount.textContent = Math.floor(currentCoffee);

    if (
      currentProjects >= targetProjects &&
      currentClients >= targetClients &&
      currentExperience >= targetExperience &&
      currentCoffee >= targetCoffee
    ) {
      clearInterval(counterInterval);

      projectsCount.textContent = targetProjects + "+";
      clientsCount.textContent = targetClients + "+";
      experienceCount.textContent = targetExperience + "+";
      coffeeCount.textContent = targetCoffee + "+";
    }
  }, 20);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "about") {
        animateCounters();
      }
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Observe sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Simple 3D background with Three.js
function init3DBackground() {
  const container = document.getElementById("canvas3d");
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create floating shapes
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshPhongMaterial({
    color: 0x6e45e2,
    emissive: 0x6e45e2,
    emissiveIntensity: 0.2,
    shininess: 100,
    transparent: true,
    opacity: 0.8,
  });

  const shapes = [];
  const shapeCount = 5;

  for (let i = 0; i < shapeCount; i++) {
    const shape = new THREE.Mesh(geometry, material.clone());
    shape.position.x = (Math.random() - 0.5) * 10;
    shape.position.y = (Math.random() - 0.5) * 10;
    shape.position.z = (Math.random() - 0.5) * 10;
    shape.scale.setScalar(Math.random() * 0.5 + 0.5);
    shapes.push(shape);
    scene.add(shape);
  }

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x88d3ce, 0.5, 50);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  camera.position.z = 5;

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    shapes.forEach((shape, i) => {
      shape.rotation.x += 0.005 * (i + 1);
      shape.rotation.y += 0.01 * (i + 1);

      // Float up and down
      shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Initialize 3D background when DOM is loaded
document.addEventListener("DOMContentLoaded", init3DBackground);
