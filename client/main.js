import './style.css'

import computer_literacy from "./app";
import "./app"

import Alpine from "alpinejs";

window.Alpine = Alpine;
//  Alpine.plugin(persist);

 Alpine.data('info', computer_literacy)

Alpine.start();