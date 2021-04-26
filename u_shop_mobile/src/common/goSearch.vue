<template>
  <div class="search_box">
    <div class="content">
      <div class="search_logo iconfont">&#xe614;</div>
      <input type="text" placeholder="按内容搜索" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.search_box {
  width: 100%;
  height: 1rem;
  background-image: linear-gradient(180deg, #FF6040 0%, #FF8A80 100%);
box-shadow: 0 2px 6px 0 rgba(255,149,128,0.50);
  overflow: hidden;
  .content {
    width: 7.1rem;
    height: 0.64rem;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    display: flex;
    margin: 0 auto;
    margin-top: .15rem;
  }
  .search_logo {
    line-height: 0.4rem;
    color: #999999;
    padding: 0.1rem 0 0 0.05rem;
    font-size: .4rem;
  }
  input {
    width: 6.5rem;
    height: 0.64rem;
    font-size: 0.3rem;
    text-indent: 0.1rem;
  }
}
</style>
