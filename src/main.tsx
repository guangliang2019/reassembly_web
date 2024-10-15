import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";

// react
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// matter.js

const engine = Engine.create({});

// create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
  }
});
const draggableBox = Bodies.rectangle(400, 200, 80, 80, {
  collisionFilter: {
    group: 20,
  },
  render: {
    fillStyle: '#3480EC80',
    strokeStyle: '#3480EC',
    lineWidth: 2
  }
});

// 创建不可以拖拽的物体，不设置 collisionFilter.group 或设置为不同值
const staticBox1 = Bodies.rectangle(450, 50, 80, 80, {
  render: {
    fillStyle: "#FFFFFF80", // 填充颜色
    strokeStyle: "#FFFFFF99", // 边框颜色
    lineWidth: 2, // 边框宽度
  },
});

const staticBox2 = Bodies.rectangle(450, 50, 80, 80, {
  render: {
    fillStyle: "#FFFFFF80", // 填充颜色
    strokeStyle: "#FFFFFF99", // 边框颜色
    lineWidth: 2, // 边框宽度
  },
});

const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
Composite.add(engine.world, [draggableBox, staticBox1,staticBox2, ground]);

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {
      visible: true,
    },
  },
  collisionFilter: {
    group: 1, // 只对设置了同组 collisionFilter 的物体响应拖拽
  },
});
Composite.add(engine.world, mouseConstraint);

window.addEventListener("mousedown", (e) => {
  console.log(e.clientX, e.clientY);
});

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
