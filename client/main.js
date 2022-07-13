import './style.css'

import movies from "./app";
import "./app"

import Alpine from "alpinejs";
import computer_literacy from './app';

window.Alpine = Alpine;
//  Alpine.plugin(persist);
 Alpine.data('info', computer_literacy)

Alpine.start();