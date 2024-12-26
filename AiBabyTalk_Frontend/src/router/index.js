// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LoginAndRegist from "@/views/LoginAndRegist.vue";
import MainPage from "@/views/MainPage.vue";
import ChatBot from "@/views/ChatBot.vue";
import Game from "@/views/Game.vue";
import LearnBot from "@/views/LearnBot.vue";
import GameStatistics from "@/views/GameStatistics.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginAndRegist,
  },
  {
    path: "/",
    name: "main",
    component: LoginAndRegist,
  },
  {
    path: "/chat",
    name: "chatbot",
    component: ChatBot,
  },
  {
    path: "/game",
    name: "game",
    component: Game,
  },
  {
    path: "/learn",
    name: "learnbot",
    component: LearnBot,
  },
  {
    path: "/statistics",
    name: "statistics",
    component: GameStatistics,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
