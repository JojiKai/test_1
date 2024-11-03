// 選取動畫相關元素
let hero = document.querySelector(".hero"); // 選取帶有 .hero 類的元素
let slider = document.querySelector(".slider"); // 選取帶有 .slider 類的元素
let animation = document.querySelector("section.animation-wrapper"); // 選取動畫包裹的 section

// 使用 GSAP 創建動畫序列
const time_line = new TimelineMax(); // 創建 GSAP 的動畫序列

// parameter1 是要控制的對象
// parameter2 是duration
// parameter3 是控制對象的原始狀態
// parameter4 是控制對象的動畫結束後的狀態
// parameter5

time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut }) // hero 元素從高度 0% 動畫到 100%
  .fromTo(
    hero,
    1.3,
    { width: "92%" },
    { width: "100%", ease: Power2.easeInOut }
  ) // hero 元素從寬度 92% 動畫到 100%
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.3"
  ) // slider 元素從 -100% X 軸移動到 0%
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 }); // animation 元素從不透明 1 動畫到 0

// 設定2.5秒後禁用滑鼠事件
setTimeout(() => {
  animation.style.pointerEvents = "none"; // 禁用動畫元素的滑鼠事件
}, 2500);

// 防止表單內部按鈕提交表單
let allButtons = document.querySelectorAll("button"); // 選取所有的按鈕
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // 防止按鈕的默認提交行為
  });
});

// 設置垃圾桶按鈕的事件綁定
function setTrashButtonListeners() {
  let allTrashButtons = document.querySelectorAll(".trash-button"); // 選取所有垃圾桶按鈕
  allTrashButtons.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault(); // 防止按鈕默認行為
      let formElement = e.target.parentElement.parentElement; // 獲取要移除的表單元素
      formElement.style.animation = "scaleDown 0.5s ease forwards"; // 添加縮小動畫
      formElement.addEventListener("animationend", () => {
        formElement.remove(); // 當動畫結束後移除表單
        setGPA(); // 更新 GPA
      });
    });
  });
}

// 設置所有輸入欄位的即時更新事件
function setInputListeners() {
  let credits = document.querySelectorAll(".class-credit"); // 選取所有學分輸入框
  let scores = document.querySelectorAll(".score-input"); // 選取所有分數輸入框

  credits.forEach((credit) => {
    credit.addEventListener("input", () => {
      setGPA(); // 即時更新 GPA 當學分改變時
    });
  });

  scores.forEach((score) => {
    score.addEventListener("input", () => {
      setGPA(); // 即時更新 GPA 當分數改變時
    });
  });
}

// 計算並設定 GPA
function setGPA() {
  let formLength = document.querySelectorAll("form").length; // 獲取表單的數量
  let credits = document.querySelectorAll(".class-credit"); // 選取所有學分輸入框
  let scores = document.querySelectorAll(".score-input"); // 選取所有分數輸入框
  let totalWeightedScore = 0; // 總加權分數
  let totalCredits = 0; // 總學分

  // 遍歷每個課程，計算加權分數和學分總和
  for (let i = 0; i < formLength; i++) {
    let creditValue = credits[i].valueAsNumber; // 獲取學分值
    let scoreValue = scores[i].valueAsNumber; // 獲取分數值

    if (!isNaN(creditValue) && !isNaN(scoreValue)) {
      totalCredits += creditValue; // 累加學分
      totalWeightedScore += scoreValue * creditValue; // 分數乘以學分，累加加權分數
    }
  }

  // 計算加權平均分數
  let averageScore =
    totalCredits === 0 ? 0 : (totalWeightedScore / totalCredits).toFixed(2); // 計算平均分數
  document.getElementById("result-gpa").innerText = averageScore; // 更新 GPA 顯示
}

// 初始設置垃圾桶按鈕和輸入欄位事件
setTrashButtonListeners(); // 綁定垃圾桶按鈕事件
setInputListeners(); // 綁定輸入欄位事件

// 新增一個課程表單
let addButton = document.querySelector(".plus-btn"); // 選取新增課程按鈕
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form"); // 建立新的表單元素
  let newDiv = document.createElement("div"); // 建立新的 div 容器
  newDiv.classList.add("grader"); // 添加 grader

  // 建立課程類型輸入
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.setAttribute("placeholder", "選擇科目");
  newInput1.classList.add("class-type");

  // 建立學分輸入
  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "3");
  newInput3.setAttribute("placeholder", "學分數");
  newInput3.classList.add("class-credit");

  // 建立分數輸入
  let newInput4 = document.createElement("input");
  newInput4.setAttribute("type", "number");
  newInput4.setAttribute("min", "0");
  newInput4.setAttribute("max", "100");
  newInput4.setAttribute("placeholder", "成績");
  newInput4.classList.add("score-input");

  // 建立垃圾桶按鈕
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas", "fa-trash");
  newButton.appendChild(newItag);

  // 將所有元素添加到 DOM
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newInput4);
  newDiv.appendChild(newButton);
  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm); // 添加新的表單到頁面
  newForm.style.animation = "scaleUp 0.5s ease forwards"; // 添加放大動畫

  // 每次新增表單後，重新綁定事件
  setTrashButtonListeners(); // 重新綁定垃圾桶按鈕事件
  setInputListeners(); // 重新綁定輸入欄位事件
});

// 排序按鈕的事件監聽
let btn1 = document.querySelector(".sort-descending"); // 選取降序排序按鈕
let btn2 = document.querySelector(".sort-ascending"); // 選取升序排序按鈕
btn1.addEventListener("click", () => handleSorting("descending")); // 綁定降序排序事件
btn2.addEventListener("click", () => handleSorting("ascending")); // 綁定升序排序事件

// 清除資料按鈕的事件監聽
let cleanDataButton = document.querySelector(".clean-data"); // 選取清除資料按鈕
cleanDataButton.addEventListener("click", () => {
  // 清空所有輸入欄位的資料值
  let allInputs = document.querySelectorAll(
    ".class-type, .class-credit, .score-input"
  );
  allInputs.forEach((input) => {
    input.value = ""; // 清空每個輸入欄位的值
  });

  // 重設 GPA 顯示
  document.getElementById("result-gpa").innerText = "0.00";
});

// 排序函式
function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader"); // 選取所有課程表單
  let objectArray = []; // 建立空的物件陣列

  // 將每個輸入元素轉換成物件
  graders.forEach((grader) => {
    let class_name = grader.querySelector(".class-type").value;
    let class_credit = grader.querySelector(".class-credit").valueAsNumber;
    let class_score = grader.querySelector(".score-input").valueAsNumber;

    if (class_name || !isNaN(class_credit) || !isNaN(class_score)) {
      objectArray.push({
        class_name,
        class_credit,
        class_score,
      }); // 將物件添加到陣列中
    }
  });

  // 排序邏輯
  objectArray.sort((a, b) => {
    let scoreComparison = b.class_score - a.class_score; // 比較分數
    return direction === "descending" ? scoreComparison : -scoreComparison; // 根據方向排序
  });

  // 更新網頁內容
  let allInputs = document.querySelector(".all-inputs"); // 選取所有輸入容器
  allInputs.innerHTML = ""; // 清空所有表單

  objectArray.forEach((obj) => {
    allInputs.innerHTML += `<form>
      <div class="grader">
        <input type="text" class="class-type" list="opt" value="${obj.class_name}" />
        <input type="number" class="class-credit" min="0" max="3" value="${obj.class_credit}" />
        <input type="number" class="score-input" min="0" max="100" value="${obj.class_score}" />
        <button class="trash-button"><i class="fas fa-trash"></i></button>
      </div>
    </form>`; // 重新生成排序後的表單
  });

  // 重新綁定垃圾桶按鈕和輸入事件
  setTrashButtonListeners(); // 重新綁定垃圾桶按鈕事件
  setInputListeners(); // 重新綁定輸入欄位事件
}
