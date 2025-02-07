"use strict"
// 引入模組
import { removeEv, clickEv } from "./module.js"
const body = document.body
const filter = document.querySelector(".filter")
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

// // 關閉彈窗
;(() => {
  const closes = filter.querySelectorAll("button.close")
  if (!closes) return
  closes.forEach((close) => {
    close.addEventListener("click", () => {
      filter.classList.remove("display")
      filter.querySelector(".popup.display").classList.remove("display")
    })
  })
})()

// // 購物車功能
;(() => {
  const cart = document.querySelector("aside section.cart")
  if (!cart) return
  const cartPopup = filter.querySelector(".popup.cart")
  const back = cartPopup.querySelector(".operateWrap button")
  cart.addEventListener("click", () => {
    filter.classList.add("display")
    cartPopup.classList.add("display")
  })
  back.addEventListener("click", () => {
    filter.classList.remove("display")
    cartPopup.classList.remove("display")
  })
})()
// // 清空購物車
;(() => {
  const del = filter.querySelector(".popup.cart .cartDetail button.del")
  if (!del) return
  del.addEventListener("click", () => {
    filter.querySelector(".cart .content.display").classList.remove("display")
    filter.querySelector(".cart .content.noData").classList.add("display")
  })
})()
// // 送出購物車
;(() => {
  const submit = filter.querySelector(".cart .cartDetail button.submit")
  if (!submit) return
  submit.addEventListener("click", () => {
    const value = filter.querySelector(".cart .cartDetail input").value
    if (value > 100) {
      filter.querySelector(".tip--default").classList.add('display')
    } else if (value <= 100) {
      filter.querySelector(".tip--secondary").classList.add('display')
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

// //球類彈窗
;(() => {
  const gameNav = document.querySelectorAll(".topNav .navList .navItem")
  if (!gameNav) return
  gameNav.forEach((item) =>
    item.addEventListener("click", function (e) {
      const id = this.dataset.nav
      const gamePopup = filter.querySelector(`.gamePopup[data-game=${id}]`)
      if (!gamePopup) return
      filter.classList.add('display')
      gamePopup.classList.add('display')
    })
  )
})()
// // 球類切換
;(() => {
  const gamePopup = filter.querySelectorAll(".gamePopup .list")
  if (!gamePopup) return
  gamePopup.forEach((item) =>
    item.addEventListener("click", function (e) {
      if (e.target !== this) {
        if (e.target.classList.contains("fav")) {
          e.target.classList.toggle("active")
          return
        }
        const gameNav = document.querySelectorAll(".topNav .navList .navItem")
        gameNav.forEach((item) => item.classList.remove("active"))
        const open = document.querySelector(".gamePopup.display")
        const id = open.dataset.game
        gameNav.forEach((item) => {
          if (item.dataset.nav === id) {
            item.classList.add("active")
          }
        })
        document.querySelector(`main.display`).classList.remove("display")
        document.querySelector(`main[data-main=${id}]`).classList.add("display")
        filter.classList.remove('display')
        open.classList.remove('display')
      }
    })
  )
})()
// // 返回
;(() => {
  const back = filter.querySelectorAll(".gamePopup .top i")
  if (!back) return
  back.forEach((item) =>
    item.addEventListener("click", () => {
      const open = document.querySelector(".gamePopup.display")
      filter.classList.remove('display')
      open.classList.remove('display')
    })
  )
})()

// // 設定頁 開啟彈窗
;(() => {
  const popupBtn = document.querySelectorAll(".settingPage li")
  if (!popupBtn) return
  popupBtn.forEach((item) =>
    item.addEventListener("click", function () {
      const id = this.dataset.popup
      if (!id) return
      filter.classList.add('display')
      filter.querySelector(`.popup.${id}`).classList.add('display')
    })
  )
})()

// // 注單頁 日期按鈕+自訂義彈窗
;(() => {
  const dateBtn = document.querySelectorAll(".innerNav .dateList button")
  if (!dateBtn) return
  dateBtn.forEach((item) =>
    item.addEventListener("click", function () {
      if (!item.dataset.id) {
        dateBtn.forEach((item) => item.classList.remove("active"))
        const immediately = document.querySelector(".immediately")
        if (immediately) {
          immediately.querySelector(".noData").classList.add("display")
          immediately.querySelector(".noteList").classList.remove("display")
        }
        const history = document.querySelector(".history")
        if (history) {
          history.querySelector(".noteList").classList.add("display")
          history.querySelector(".cus").classList.remove("display")
          document.querySelector(".innerNav .detail .num").classList.add("up")
        }
        item.classList.add("active")
      } else {
        const realTime = filter.querySelector(".popup.realTime")
        if (!realTime) return
        filter.classList.add('display')
        realTime.classList.add('display')
      }
    })
  )
})()
// // 自訂義彈窗確認
;(() => {
  const submit = filter.querySelector(".popup.realTime .operateWrap button")
  if (!submit) return
  submit.addEventListener("click", () => {
    const dateBtn = document.querySelectorAll(".innerNav .dateList button")
    dateBtn.forEach((item) => {
      item.classList.remove("active")
      if (item.dataset.id) item.classList.add("active")
    })
    const immediately = document.querySelector(".immediately")
    if (immediately) {
      immediately.querySelector(".noData").classList.remove("display")
      immediately.querySelector(".noteList").classList.add("display")
    }
    const history = document.querySelector(".history")
    if (history) {
      history.querySelector(".noteList").classList.remove("display")
      history.querySelector(".cus").classList.add("display")
      document.querySelector(".innerNav .detail .num").classList.remove("up")
    }
    filter.classList.remove('display')
    filter.querySelector(".popup.realTime").classList.remove('display')
  })
})()

// // 提示彈窗 關閉
;(() => {
  const checks = filter.querySelectorAll(".tip button.checks")
  if (!checks) return
  checks.forEach((item) =>
    item.addEventListener("click", () => {
      const tip = filter.querySelector(".tip.display")
      tip.classList.remove('display')
    })
  )
})()
;(() => {
  const close = filter.querySelectorAll(".tip .title .tip_close")
  if (!close) return
  close.forEach((item) =>
    item.addEventListener("click", () => {
      const tip = filter.querySelector(".tip.display")
      tip.classList.remove('display')
    })
  )
})()
// // 提示彈窗 送出
;(() => {
  const submit = filter.querySelector(".tip button.submit")
  if (!submit) return
  submit.addEventListener("click", () => {
    const dialogs = filter.querySelectorAll(".popup.display")
    filter.classList.remove('display')
    dialogs.forEach((item) => item.classList.remove('display'))
  })
})()

// // 購物車彈窗 單場/串關切換
;(() => {
  const tabs = filter.querySelectorAll("#titleTopNavOptions li")
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      tabs.forEach((item) => item.classList.remove("active"))
      tab.classList.add("active")
      const content = filter.querySelectorAll(".popup.cart .content")
      content.forEach((item) => item.classList.remove("display"))
      content[index].classList.add("display")
    })
  })
})()
