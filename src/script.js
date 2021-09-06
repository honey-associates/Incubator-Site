import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

const glftLoader = new GLTFLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene and Timeline
const scene = new THREE.Scene()
let tl = gsap.timeline()

// Our Object
glftLoader.load('honey-logo.gltf', (gltf) => {
    gltf.scene.scale.set( 0.3 , 0.3 , 0.3 )
    gltf.scene.rotation.set( 6.2 , 0.3 , 0 )
    scene.add(gltf.scene)
    gui.add(gltf.scene.rotation, 'x').min(-1).max(1)
    gui.add(gltf.scene.rotation, 'y').min(-1).max(1)
    gui.add(gltf.scene.rotation, 'z').min(-0.2).max(0.2)

    tl.to(gltf.scene.rotation, { y: -0.65, duration: 2})
    tl.to(gltf.scene.scale, { x: 0.2, y: 0.2, duration: 1}, "-=1")
    tl.to(gltf.scene.position, { x: 0.5})
        tl.to(gltf.scene.rotation, { y: 0.1, duration: 2})
        tl.to(gltf.scene.rotation, { y: -0.1, duration: 8})
        tl.to(gltf.scene.rotation, { y: 0.1, duration: 8})
})

// Lights

const pointLight = new THREE.AmbientLight(0xffffff, 1.5)
pointLight.position.x = 2
pointLight.position.y = -3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
 const control = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()