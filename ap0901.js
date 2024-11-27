//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G285112022 三井星夜
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "ili-gui";

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

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(10, 20, 30);
  camera.lookAt(0, 0, 0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  document.getElementById("output").appendChild(renderer.domElement);

  //　環境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  // 太陽光
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  // 太陽
  const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 }); 
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  // 地球
  const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);

  // 地球の軌道グループ
  const earthOrbit = new THREE.Group();
  scene.add(earthOrbit);
  earth.position.set(10, 0, 0);
  earthOrbit.add(earth);

  // 月
  const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);

  // 月の軌道グループ
  const moonOrbit = new THREE.Group();
  earthOrbit.add(moonOrbit);
  moon.position.set(3, 0, 0);
  moonOrbit.add(moon);


  // 描画処理

  // 描画関数
  function render() {
    // 座標軸の表示
    axes.visible = param.axes;
    // 描画
    renderer.render(scene, camera);
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  render();
}

init();