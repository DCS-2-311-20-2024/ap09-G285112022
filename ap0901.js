//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G285112022 三井星夜
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "ili-gui";
import { OrbitControls } from "three/addons";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {
    axes: true, // 座標軸
  };

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");

  // シーン作成
  const scene = new THREE.Scene();


  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // 背景の設定
  let renderTarget;
  function setBackground() {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "Galaxy.png",
      () => {
        renderTarget
        = new THREE.WebGLCubeRenderTarget(texture.image.height);
        renderTarget.fromEquirectangularTexture(renderer, texture);
        scene.background = renderTarget.texture;
        render();
      }
    )
  }

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(25, 50, 75);
  camera.lookAt(0, 0, 0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  document.getElementById("output").appendChild(renderer.domElement);

  // テクスチャの読み込み
  const textureLoader = new THREE.TextureLoader();
  const suntexture = textureLoader.load("sun.png");
  const mecurytexture = textureLoader.load("mercury.png");
  const earthtexture = textureLoader.load("earth.png");
  const moontexture = textureLoader.load("moon.png");
  const venustexture = textureLoader.load("venus.png");
  const marstexture = textureLoader.load("mars.png");
  const jupitertexture = textureLoader.load("jupiter.png");
  const saturntexture = textureLoader.load("saturn.png");
  const uranustexture = textureLoader.load("uranus.png");
  const neptunetexture = textureLoader.load("neptune.png");

  // カメラコントロール
  const orbitControls = new OrbitControls(camera, renderer.domElement);

  //　環境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  // 太陽光
  const pointLight = new THREE.PointLight(0xffffff, 5);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  // 太陽
  const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sunMaterial = new THREE.MeshLambertMaterial();
  sunMaterial.map = suntexture;
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  // 水星
  const mercuryGeometry = new THREE.SphereGeometry(1.5, 32, 32);
  const mercuryMaterial = new THREE.MeshLambertMaterial();
  mercuryMaterial.map = mecurytexture;
  const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

  // 水星の軌道グループ
  const mercuryOrbit = new THREE.Group();
  scene.add(mercuryOrbit);
  mercury.position.set(10, 0, 0);
  mercuryOrbit.add(mercury);

  // 金星
  const venusGeometry = new THREE.SphereGeometry(2, 32, 32);
  const venusMaterial = new THREE.MeshLambertMaterial();
  venusMaterial.map = venustexture;
  const venus = new THREE.Mesh(venusGeometry, venusMaterial);

  // 金星の軌道グループ
  const venusOrbit = new THREE.Group();
  scene.add(venusOrbit);
  venus.position.set(20, 0, 0);
  venusOrbit.add(venus);

  // 地球
  const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
  const earthMaterial = new THREE.MeshLambertMaterial();
  earthMaterial.map = earthtexture;
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);

  // 地球の軌道グループ
  const earthOrbit = new THREE.Group();
  scene.add(earthOrbit);
  earth.position.set(30, 0, 0);
  earthOrbit.add(earth);

  // 月
  const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const moonMaterial = new THREE.MeshLambertMaterial();
  moonMaterial.map = moontexture;
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);

  // 月の軌道グループ
  const moonOrbit = new THREE.Group();
  earthOrbit.add(moonOrbit);
  const radius = 5;
  let theta = 0;
  theta +=0.01* Math.PI;
  moon.position.x=radius*Math.cos(theta);
  moon.position.z=radius*Math.sin(theta);
  moonOrbit.add(moon);

  // 火星
  const marsGeometry = new THREE.SphereGeometry(1.5, 32, 32);
  const marsMaterial = new THREE.MeshLambertMaterial();
  marsMaterial.map = marstexture;
  const mars = new THREE.Mesh(marsGeometry, marsMaterial);

  // 火星の軌道グループ
  const marsOrbit = new THREE.Group();
  scene.add(marsOrbit);
  mars.position.set(35, 0, 0);
  marsOrbit.add(mars);

  // 木星
  const jupiterGeometry = new THREE.SphereGeometry(3, 32, 32);
  const jupiterMaterial = new THREE.MeshLambertMaterial();
  jupiterMaterial.map = jupitertexture;
  const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);

  // 木星の軌道グループ
  const jupiterOrbit = new THREE.Group();
  scene.add(jupiterOrbit);
  jupiter.position.set(50, 0, 0);
  jupiterOrbit.add(jupiter);

  // 土星
  const saturnGeometry = new THREE.SphereGeometry(3, 32, 32);
  const saturnMaterial = new THREE.MeshLambertMaterial();
  saturnMaterial.map = saturntexture;
  const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);

  // 土星の軌道グループ
  const saturnOrbit = new THREE.Group();
  scene.add(saturnOrbit);
  saturn.position.set(60, 0, 0);
  saturnOrbit.add(saturn);

  // 天王星
  const uranusGeometry = new THREE.SphereGeometry(2, 32, 32);
  const uranusMaterial = new THREE.MeshLambertMaterial();
  uranusMaterial.map = uranustexture;
  const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);

  // 天王星の軌道グループ
  const uranusOrbit = new THREE.Group();
  scene.add(uranusOrbit);
  uranus.position.set(70, 0, 0);
  uranusOrbit.add(uranus);

  // 海王星
  const neptuneGeometry = new THREE.SphereGeometry(1.5, 32, 32);
  const neptuneMaterial = new THREE.MeshLambertMaterial();
  neptuneMaterial.map = neptunetexture;
  const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);

  // 海王星の軌道グループ
  const neptuneOrbit = new THREE.Group();
  scene.add(neptuneOrbit);
  neptune.position.set(80, 0, 0);
  neptuneOrbit.add(neptune);

  // 描画処理

  // 描画関数
  function render() {

    // 水星の自転
    mercury.rotation.y += 0.07;

    // 水星の公転
    mercuryOrbit.rotation.y += 0.008;

    // 金星の自転
    venus.rotation.y += 0.02;

    // 金星の公転
    venusOrbit.rotation.y += 0.007;

    // 地球の自転
    earth.rotation.y += 0.01;

    // 地球の公転
    earthOrbit.rotation.y += 0.006;

    // 月の公転
    moonOrbit.rotation.y += 0.03;
    moonOrbit.position.copy(earth.position);

    // 火星の自転
    mars.rotation.y += 0.01;
    
    // 火星の公転
    marsOrbit.rotation.y += 0.005;

    // 木星の自転
    jupiter.rotation.y += 0.2;

    // 木星の公転
    jupiterOrbit.rotation.y += 0.004;

    // 土星の自転
    saturn.rotation.y += 0.2;

    // 土星の公転
    saturnOrbit.rotation.y += 0.003;

    // 天王星の自転
    uranus.rotation.y += 0.2;

    // 天王星の公転
    uranusOrbit.rotation.y += 0.002;

    // 海王星の自転
    neptune.rotation.y += 0.1;

    // 海王星の公転
    neptuneOrbit.rotation.y += 0.001;

    orbitControls.update();
    // 座標軸の表示
    axes.visible = param.axes;
    // 描画
    renderer.render(scene, camera);
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  setBackground();

}

init();