<template>
  <div class="w-screen h-screen">
    <topBar />
    <div class="flex items-center justify-around w-full h-[91%]">
      <div class="flex flex-col h-full mx-4 w-[15%] justify-around items-center">
        <button
          @click="showBarChart"
          :class="[
            'px-4 py-2 border border-gray-900 rounded w-[90%]',
            !isQuestionListVisible && isBarChart ? 'bg-gray-900 text-white' : 'text-gray-900',
          ]"
        >
          答對題目數
        </button>
        <button
          @click="showPieChart"
          :class="[
            'px-4 py-2 border border-gray-900 rounded w-[90%]',
            !isQuestionListVisible && !isBarChart ? 'bg-gray-900 text-white' : 'text-gray-900',
          ]"
        >
          題目答對率
        </button>
        <button
          @click="showQuestionList"
          :class="[
            'px-4 py-2 border border-gray-900 rounded w-[90%]',
            isQuestionListVisible ? 'bg-gray-900 text-white' : 'text-gray-900',
          ]"
        >
          題目一覽
        </button>
      </div>
      <div v-if="!isQuestionListVisible" class="w-[85%] flex items-center justify-center">
        <Bar v-if="isBarChart" :chart-data="chartData" :options="chartOptions" class="w-1/2" />
        <Pie
          v-if="!isBarChart"
          :chart-data="pieChartData"
          :options="pieChartOptions"
          class="w-1/2"
        />
      </div>

      <!-- 可滑动的题目列表 -->
      <div
        v-if="isQuestionListVisible"
        class="w-[85%] h-full p-4 overflow-y-auto flex flex-col items-center"
      >
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="w-2/3 p-2 mb-4 border border-gray-200 rounded"
        >
          <div>{{ question.content }}</div>
          <div>
            <span v-for="(option, optIndex) in question.options" :key="optIndex">
              <span :class="option.class">{{ option.text }}</span>
              <span v-if="optIndex < question.options.length - 1"> &nbsp; </span>
            </span>
          </div>
          <div>{{ question.resources }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import topBar from "../components/topbar.vue";
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

// 注册 Chart.js 必要的组件
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

// 条形图数据
const chartData = {
  labels: ["視覺認知相關", "聲音認知相關", "數字認知相關"],
  datasets: [
    {
      label: "數量",
      backgroundColor: "#f87979",
      data: [40, 20, 50, 60, 30, 70],
      barThickness: 20, // 条形宽度
    },
  ],
};

// 条形图选项
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
    x: {
      ticks: {
        autoSkip: false, // 保证所有标签都显示
      },
    },
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
    },
  },
};

// 圆饼图数据
const pieChartData = {
  labels: ["正確", "錯誤", "無法識別"],
  datasets: [
    {
      label: "Votes",
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      data: [12, 19, 3],
    },
  ],
};

// 圆饼图选项
const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

// 控制图表类型
const isBarChart = ref(true);
const isQuestionListVisible = ref(false);
const questions = generateQuestions(20);

// 显示条形图
function showBarChart() {
  isBarChart.value = true;
  isQuestionListVisible.value = false; // 隐藏题目列表
}

// 显示圆饼图
function showPieChart() {
  isBarChart.value = false;
  isQuestionListVisible.value = false; // 隐藏题目列表
}

// 显示题目列表
function showQuestionList() {
  isQuestionListVisible.value = !isQuestionListVisible.value; // 切换题目列表显示状态
  isBarChart.value = false; // 隐藏统计图
}

// 生成随机题目数据
function generateQuestions(num) {
  const generatedQuestions = [];
  const options = ["小貓", "小狗", "小豬"];

  for (let i = 0; i < num; i++) {
    const randomRedIndex = Math.floor(Math.random() * options.length);
    const randomGreenIndex =
      (randomRedIndex + Math.floor(Math.random() * (options.length - 1)) + 1) % options.length;

    const question = {
      content: `題目內容: 題目 ${i + 1}`,
      options: options.map((option, index) => {
        if (index === randomRedIndex) {
          return { text: option + " X", class: "text-red-500" }; // 红色 X
        } else if (index === randomGreenIndex) {
          return { text: option + " O", class: "text-green-500" }; // 绿色 O
        }
        return { text: option, class: "" };
      }),
      resources: "其他資源",
    };

    generatedQuestions.push(question);
  }

  return generatedQuestions;
}
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
