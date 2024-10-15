import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
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
  },
});
const draggableBox = Bodies.rectangle(400, 200, 80, 80, {
  collisionFilter: {
    group: 20,
  },
  render: {
    fillStyle: "#3480EC60",
    strokeStyle: "#3480EC",
    lineWidth: 2,
  },
});

// 创建不可以拖拽的物体，不设置 collisionFilter.group 或设置为不同值
const staticBox1 = Bodies.rectangle(450, 50, 80, 80, {
  render: {
    fillStyle: "#FFFFFF80", // 填充颜色
    strokeStyle: "#FFFFFFCC", // 边框颜色
    lineWidth: 2, // 边框宽度
  },
});
const staticBox3 = Bodies.rectangle(450, 50, 80, 80, {
  render: {
    fillStyle: "#FFFFFF80", // 填充颜色
    strokeStyle: "#FFFFFFCC", // 边框颜色
    lineWidth: 2, // 边框宽度
  },
});

const staticBox2 = Bodies.rectangle(450 + 80, 50 + 81, 80, 80, {
  render: {
    fillStyle: "#1396F980", // 填充颜色
    strokeStyle: "#1396F9", // 边框颜色
    lineWidth: 2, // 边框宽度
  },
});

const staticBox4 = Bodies.rectangle(450 + 80, 50 + 81, 80, 80, {
  render: {
    fillStyle: "#1396F980", // 填充颜色
    strokeStyle: "#1396F9", // 边框颜色
    lineWidth: 2, // 边框宽度
  },
});
var compoundBody = Body.create({
  parts: [staticBox1, staticBox2],
});

const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

const c = Composite.add(engine.world, [compoundBody, draggableBox, ground]);

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
  Body.applyForce(
    compoundBody,
    { x: compoundBody.position.x - 40, y: compoundBody.position.y + 40 },
    {
      x: 0,
      y: -0.2,
    }
  );
});

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// 监听碰撞事件
Events.on(engine, "collisionStart", function (event) {
 
  // console.log(event.pairs);
  // console.log(Composite.get(c, compoundBody.id, compoundBody.type), "---");
  // 检查是否是特定物体的碰撞
  event.pairs.forEach((pair) => {
    if (
      pair.bodyA?.parent === compoundBody ||
      pair.bodyB?.parent === compoundBody
    ) {
      // 解体复合体


      if (Composite.get(c, compoundBody.id, compoundBody.type) !== null) {
        // Composite.remove(engine.world, compoundBody);
        // Composite.add(engine.world, staticBox3);
        // Composite.add(engine.world, staticBox4);
        console.log("force");
        
      }
    }
  });
});


// run the engine
Runner.run(runner, engine);
