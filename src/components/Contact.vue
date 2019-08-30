<template id="contact">
  <div class="back-up">
    <h2>备份与归档</h2>
    <hr/>
      <div class="userInfo-menu" style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background-color: rgba(220,154,255,0.51);
      display: flex;
      justify-items: center;
      align-items: center;">
        <router-link to="">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: column;align-items: center;justify-items: center;margin-left: 40px">
            <img src="../assets/system.png" />
            <a style="padding-left: 12px">备份归档</a>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  '/contact': 'contact'
}
</script>

<style>
  .back-up {

  }

  .back-up h2 {
    margin-left: 15px;
  }

  .userInfo-menu {
    margin: 25px 0 0 30px;
  }
</style>
