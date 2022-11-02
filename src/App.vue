<template>
  <div class="app-wrap">
    <div>
      <img
        src="@/assets/img/author.jpg"
        width="100"
        alt=""
      />
      <img
        src="/Hololo.jpeg"
        width="100"
        alt=""
      />
    </div>
    <div>
      <router-link to="/"> 点击跳转首页 </router-link>
    </div>
    <div>
      <router-link to="/login"> 点击跳转login </router-link>
    </div>
    <div>
      <router-link to="/about"> 点击跳转about </router-link>
    </div>
    333
    <div class="aaa"></div>
    <div class="bbb"></div>
    <div class="ccc">dd223222323dd</div>
    <div class="flashImg">
      <img
        src="https://resource.hsslive.cn/image/1578937683585vueblog.webp"
        alt=""
        width="100"
      />
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';

.app-wrap {
  // background-color: red;
  // @extend %flexCenter;
  // @include fullBox;
}
.aaa {
  // @include colorText();
  // @include multiEllipsis;
  // width: 10px;
  // height: 10px;
  @include arrow('left', 10px);
}
.bbb {
  // @include colorText();
  // @include multiEllipsis;
  // width: 10px;
  // height: 10px;
  @include arrow('left', 10px);
}
.ccc {
  // @include colorText();
  @include flashTxt;
  // @include colorText('#8a2387, #f27121', 'to left');
}
.flashImg {
  // @include flashImg(1s, 300%);
  // @include colorShadow(rgba(skyblue, 0.5));
  // @include colorShadow(
  //   // url('https://resource.hsslive.cn/image/1582634581438regexr.webp')
  //   url('https://resource.hsslive.cn/image/1578937683585vueblog.webp')
  // );
  img {
    @include shadow;
  }
}
</style>
