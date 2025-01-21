"use strict"
// 引入模組
import { removeEv, clickEv } from "./module.js"
const body = document.body
;(() => {
  const gameNav = document.querySelector(".gameNav")
  if (!gameNav) return
  const swiper = new Swiper(gameNav, {
    slidesPerView: "auto",
    spaceBetween: 7.5,
  })
})()

// 更換主題樣式函數
;(() => {
  // 樣式儲存庫
  const themeSaved = sessionStorage.getItem("theme")
  // get key 設定屬性 value
  if (themeSaved) body.setAttribute("theme", themeSaved)
  // 預設class為sun 若getItem則為 此key的value
  const btnActiveSaved = sessionStorage.getItem("btnActive") || "sun"
  // 主題按鈕group
  const styleSwBtns = document.querySelectorAll(".styleSw button")
  if (styleSwBtns.length > 0) {
    // active 移除 all
    removeEv(styleSwBtns, "active")
    // 判定目前的btn 哪一個active 預設為sun
    styleSwBtns.forEach((btn) => {
      btn.classList.contains(btnActiveSaved)
        ? btn.classList.add("active")
        : btn.classList.remove("active")
    })
    // 更新按鈕樣式;
    clickEv(styleSwBtns, "active")
    //
    styleSwBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // 若按鈕有dark class則觸發
        if (btn.classList.contains("dark")) {
          // body新增屬性
          body.setAttribute("theme", "dark")
          // 儲存庫 建立 item
          sessionStorage.setItem("theme", "dark")
        } else {
          // body remove key
          body.removeAttribute("theme")
          // 儲存庫 移除 item
          sessionStorage.removeItem("theme")
        }
        // btn click時 儲存庫建立item  activeBtn dark or sun
        sessionStorage.setItem(
          "btnActive",
          btn.classList.contains("dark") ? "dark" : "sun"
        )
      })
    })
  }
})()

// 關閉彈窗
;(() => {
  const closes = document.querySelectorAll(".dialogBlock button.close")
  if (!closes) return
  closes.forEach((close) => {
    close.addEventListener("click", () => {
      const dialogs = document.querySelector("dialog[open]")
      dialogs.close()
    })
  })
})()
;(() => {
  const dialog = document.querySelectorAll("dialog")
  if (!dialog) return
  dialog.forEach((item) =>
    item.addEventListener("click", (e) => {
      if (e.target.tagName === "DIALOG") {
        item.close()
      }
    })
  )
})()

// 購物車功能
;(() => {
  const cart = document.querySelector("aside section.cart")
  if (!cart) return
  const cartPopup = document.querySelector(".dialogBlock dialog.cart")
  const back = cartPopup.querySelector(".operateWrap button")
  cart.addEventListener("click", () => {
    cartPopup.showModal()
  })
  back.addEventListener("click", () => {
    cartPopup.close()
  })
})()
// 清空購物車
;(() => {
  const del = document.querySelector("dialog.cart .cartDetail button.del")
  if (!del) return
  del.addEventListener("click", () => {
    document
      .querySelector("dialog.cart .content.display")
      .classList.remove("display")
    document
      .querySelector("dialog.cart .content.noData")
      .classList.add("display")
  })
})()
// 送出購物車
;(() => {
  const submit = document.querySelector("dialog.cart .cartDetail button.submit")
  if (!submit) return
  submit.addEventListener("click", () => {
    const value = document.querySelector("dialog.cart .cartDetail input").value
    if (value > 100) {
      document.querySelector("dialog.tip--default").showModal()
    } else if (value <= 100) {
      document.querySelector("dialog.tip--secondary").showModal()
    } else {
      document.querySelector("dialog[open]").close()
    }
  })
})()

// 文字大小
;(() => {
  const fontSize = document.querySelector("aside section.fontSize")
  if (!fontSize) return
  const close = document.querySelector("aside section.fontSizeControl .close")
  fontSize.addEventListener("click", function () {
    this.classList.add("hide")
  })
  close.addEventListener("click", function () {
    fontSize.classList.remove("hide")
  })
})()

// 區塊active
;(() => {
  const blocks = document.querySelectorAll(".list .item")
  blocks.forEach((item) =>
    item.addEventListener("click", function () {
      this.classList.toggle("active")
    })
  )
})()

//球類彈窗
;(() => {
  const gameNav = document.querySelectorAll(".topNav .navList .navItem")
  if (!gameNav) return
  gameNav.forEach((item) =>
    item.addEventListener("click", function (e) {
      gameNav.forEach((item) => item.classList.remove("active"))
      this.classList.add("active")
      const id = this.dataset.nav
      const dialog = document.querySelector(`dialog[data-game=${id}]`)
      if (!dialog) return
      dialog.showModal()
    })
  )
})()
// 球類切換
;(() => {
  const gamePopup = document.querySelectorAll("dialog.gamePopup .list")
  if (!gamePopup) return
  gamePopup.forEach((item) =>
    item.addEventListener("click", function (e) {
      if (e.target !== this) {
        if (e.target.classList.contains("fav")) {
          e.target.classList.toggle("active")
          return
        }
        const open = document.querySelector("dialog[open]")
        const id = open.dataset.game
        document.querySelector(`main.display`).classList.remove("display")
        document.querySelector(`main[data-main=${id}]`).classList.add("display")
        open.close()
      }
    })
  )
})()
// 返回
;(() => {
  const back = document.querySelectorAll("dialog.gamePopup .top i")
  if (!back) return
  back.forEach((item) =>
    item.addEventListener("click", () => {
      const open = document.querySelector("dialog[open]")
      open.close()
    })
  )
})()

// 設定頁 開啟彈窗
;(() => {
  const dialogBtn = document.querySelectorAll(".settingPage li")
  if (!dialogBtn) return
  dialogBtn.forEach((item) =>
    item.addEventListener("click", function () {
      const id = this.dataset.popup
      if (!id) return
      document.querySelector(`dialog.${id}`).showModal()
    })
  )
})()

// 注單頁 日期按鈕+自訂義彈窗
;(() => {
  const dateBtn = document.querySelectorAll(".innerNav .dateList button")
  if (!dateBtn) return
  dateBtn.forEach((item) =>
    item.addEventListener("click", function () {
      if (!item.dataset.id) {
        dateBtn.forEach((item) => item.classList.remove("active"))
        item.classList.add("active")
      } else {
        const realTime = document.querySelector("dialog.realTime")
        if (!realTime) return
        realTime.showModal()
      }
    })
  )
})()
// 自訂義彈窗確認
;(() => {
  const submit = document.querySelector("dialog.realTime .operateWrap button")
  if (!submit) return
  submit.addEventListener("click", () => {
    const dateBtn = document.querySelectorAll(".innerNav .dateList button")
    dateBtn.forEach((item) => {
      item.classList.remove("active")
      if (item.dataset.id) item.classList.add("active")
    })
    document.querySelector("dialog.realTime").close()
  })
})()

// 提示彈窗 關閉
;(() => {
  const checks = document.querySelectorAll("dialog.tip button.checks")
  if (!checks) return
  checks.forEach((item) =>
    item.addEventListener("click", () => {
      const tip = document.querySelector("dialog.tip[open]")
      tip.close()
    })
  )
})()
;(() => {
  const close = document.querySelectorAll("dialog.tip .title .tip_close")
  if (!close) return
  close.forEach((item) =>
    item.addEventListener("click", () => {
      const tip = document.querySelector("dialog.tip[open]")
      tip.close()
    })
  )
})()
// 提示彈窗 送出
;(() => {
  const submit = document.querySelector("dialog.tip button.submit")
  if (!submit) return
  submit.addEventListener("click", () => {
    const dialogs = document.querySelectorAll("dialog[open]")
    dialogs.forEach((item) => item.close())
  })
})()

// 購物車彈窗 單場/串關切換
;(()=>{
  const tabs = document.querySelectorAll('#titleTopNavOptions li')
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',function(){
      tabs.forEach(item=>item.classList.remove('active'))
      tab.classList.add('active')
      const content = document.querySelectorAll('dialog.cart .content')
      content.forEach(item=>item.classList.remove('display'))
      content[index].classList.add('display')
    })
  })
})()
