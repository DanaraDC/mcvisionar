let scene, camera, renderer, controls;

const container = document.getElementById("container");
const canvas = document.getElementById("canvas");

const initialSetup = () => {
  const item = container.getBoundingClientRect();

  const sizes = {
    width: item.width,
    height: item.height,
  };

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    10,
    5000
  );
  camera.position.set(150, 20, 100);
  scene.add(camera);

  addLighting(scene);

  controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.enableZoom = false;
  controls.enablePan = false;

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;

  loadHDR(scene);
  addModel(scene);

  const handleResize = () => {
    sizes.width = container.offsetWidth;
    sizes.height = container.offsetHeight;
    renderer.setSize(sizes.width, sizes.height);
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", handleResize);

  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();
};

const addLighting = (scene) => {
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
};

const loadHDR = (scene) => {
  new THREE.RGBELoader().setDataType(THREE.HalfFloatType).load(
    "default.hdr",
    (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.needsUpdate = true;
      scene.environment = texture;
      texture.dispose();
    },
    undefined,
    (error) => {
      console.error("Error loading HDR:", error);
    }
  );
};

const addModel = (scene) => {
  const burgerModelUrl = "assets/models/nasi_lemak.glb";
  const GLTFLoaderInstance = new THREE.GLTFLoader();

  GLTFLoaderInstance.load(burgerModelUrl, (gltf) => {
    gltf.scene.position.set(0, -30, 0);
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(gltf.scene);

    const animate = () => {
      gltf.scene.rotation.y += 0.01;
      requestAnimationFrame(animate);
    };
    animate();
  });
};

initialSetup();
