// Three.js

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('NormalMap.jpg');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer(
	{
		alpha: true
	}
);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 0;
material.normalMap = texture;
material.wireframe = true;

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const pointLight = new THREE.PointLight(0xf9ded, 1);
// pointLight.position.x =1;
// pointLight.position.y =1;
// pointLight.position.z =1;
pointLight.position.set(3, 3, 3);
scene.add(pointLight);
console.log(pointLight);


const pointLight2 = new THREE.PointLight(0x0000ff, 1, 100);
// pointLight.position.x =1;
// pointLight.position.y =1;
// pointLight.position.z =1;
pointLight2.position.set(2, 3, 4);
scene.add(pointLight2);
console.log(pointLight2);

const pointLight3 = new THREE.PointLight(0xf9ded, 1, 100);
// pointLight.position.x =1;
// pointLight.position.y =1;
// pointLight.position.z =1;
pointLight2.position.set(3, 3, 3);
scene.add(pointLight3);
console.log(pointLight3);


var mouseX = 0;
var mouseY = 0;
document.addEventListener('mousemove', (e) => {
	mouseX = e.clientX - window.innerWidth / 2;
	mouseY = e.clientY - window.innerHeight / 2;
	// console.log(mouseX);
	// console.log(mouseY);
})
var targetX = 0;
var targetY = 0;

const animate = function () {
	requestAnimationFrame(animate);

	targetX = 0.005 * mouseX;
	targetY = 0.005 * mouseY;
	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;
	cube.rotation.z += 0.01;
	cube.rotation.y += .5 * (targetX -cube.rotation.y);
	cube.rotation.x += .5 * (targetY -cube.rotation.x);
	// if(targetX !=0 && targetY!=0){
	// cube.rotation.y += 5*(targetX - cube.rotation.y);
	// cube.rotation.x += 5*(targetY - cube.rotation.x);
	// cube.rotation.z += 5*(targetY - cube.rotation.x);
	// }

	renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
});

//Music Player

const prevBtn = document.getElementById('prev');
const nexBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
// console.log(prevBtn,nexBtn,playBTn);
const audio = document.getElementById('audio');
const progressInfo = document.querySelector('.progress-info');
const progressContainer = document.querySelector('.progress-container');
const title = document.getElementById('title');
const logo = document.getElementById('logo');
const infoWrapper = document.querySelector('.info-wrapper');
const musicWrapper = document.querySelector('.music-wrapper');

//Title Array
const songs = ['Fast Car', 'Summer', 'New Rules', 'Snow Child'];
let songIndex = 0;

loadsong(songs[songIndex]);

//function definition
function loadsong(song) {
	title.innerText = song;
	audio.src = `${song}.mp3`;
	logo.src = `${song}.jpg`
	// if(song == 'Fast Car')
	// {
	// 	logo.width = '10%';
	// 	logo.height = '3%';
	// }
}

function playSong() {
	musicWrapper.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

function pauseSong() {
	musicWrapper.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	playBtn.querySelector('i.fas').classList.add('fa-play');

	audio.pause();
}


//Button Functioning
playBtn.addEventListener('click', () => {
	const isPLaying = musicWrapper.classList.contains('play');

	if (isPLaying) {
		pauseSong();
	}
	else {
		playSong();
	}

});

nexBtn.addEventListener('click', () => {
	songIndex++;
	if (songIndex > songs.length - 1)
		songIndex = 0;
	loadsong(songs[songIndex]);
	playSong();
});

prevBtn.addEventListener('click', () => {
	songIndex--;
	if (songIndex < 0)
		songIndex = songs.length - 1;
	loadsong(songs[songIndex]);
	playSong();
});

audio.addEventListener('timeupdate', (e) => {
	const { duration, currentTime } = e.srcElement;
	var progressPercent = (currentTime / duration) * 100;
	console.log(progressPercent);
	progressInfo.style.width = `${progressPercent}%`;
});
console.log(progressInfo);

progressContainer.addEventListener('click', (e) => {
	const width = progressContainer.clientWidth;
	// console.log(width);
	const X = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (X / width) * duration;
});

audio.addEventListener('ended', () => {
	songIndex++;
	if (songIndex > songs.length - 1)
		songIndex = 0;
	loadsong(songs[songIndex]);
	playSong();
});






