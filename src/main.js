import FPSScene from './FPSScene';
import GameScene from './GameScene';
import GroundScene from './GroundScene';
import './style.css'

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('app');
  const game = new FPSScene({canvas});
});