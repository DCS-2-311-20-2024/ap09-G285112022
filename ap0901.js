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
  camera.position.set(10, 20, 30);
  camera.lookAt(0, 0, 0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  document.getElementById("output").appendChild(renderer.domElement);

  // テクスチャの読み込み
  const textureLoader = new THREE.TextureLoader();
  const suntexture = textureLoader.load("sun.png");
  const earthtexture = textureLoader.load("earth.png");
  const moontexture = textureLoader.load("moon.png");

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

  // 地球
  const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
  const earthMaterial = new THREE.MeshLambertMaterial();
  earthMaterial.map = earthtexture;
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);

  // 地球の軌道グループ
  const earthOrbit = new THREE.Group();
  scene.add(earthOrbit);
  earth.position.set(15, 0, 0);
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


  // 描画処理

  // 描画関数
  function render() {

    // 地球の自転
    earth.rotation.y += 0.01;

    // 地球の公転
    earthOrbit.rotation.y += 0.002; // 地球の軌道回転

    // 月の公転
    moonOrbit.rotation.y += 0.03; // 月の軌道回転
    moonOrbit.position.copy(earth.position);

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