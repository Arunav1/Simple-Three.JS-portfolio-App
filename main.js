import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geomentry = new THREE.TorusGeometry(10, 3, 16, 100)

const material = new THREE.MeshStandardMaterial({color:0xFF6347});

const torus = new THREE.Mesh(geomentry, material);

scene.add(torus)

const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(1,1,1)

const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight)

const lightHelper = new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper(100,50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const material = new THREE.MeshStandardMaterial({color: 0xffffff})

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));


  star.position.set(x, y, z);
  scene.add(star)

}

Array(200).fill().forEach(addStar)

const spaceTexure = new THREE.TextureLoader().load('realspace.png');
scene.background = spaceTexure;

//Avatar

const alpahTexture = new THREE.TextureLoader().load('P1.jpg');
const alpha = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:alpahTexture})
);

scene.add(alpha);

//moon

const moonTexture = new THREE.TextureLoader().load('MoonImage.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture, 
  })

);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera(){
  const T = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  alpha.rotation.y += 0.1;
  alpha.rotation.z += 0.1;

  camera.position.z = T * -0.01;
  camera.position.x = T * -0.0002;
  camera.position.y = T * -0.0002;

}

document.body.scroll = moveCamera



function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);

}
animate()





