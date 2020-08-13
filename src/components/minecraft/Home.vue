<template>
  <div class="container">
    <br />
    <div class="text-center">
      <h2>
        <strong>快速了解 Minecraft 服务器的现状</strong>
      </h2>
      <b-button href="#/mc/map" pill variant="outline-secondary">查看卫星地图</b-button>
      <b-button href="#/mc/skin" pill variant="outline-secondary">前往注册皮肤账户</b-button>
      <b-button
        target="_blank"
        href="http://discuz.cyf-cloud.cn:8233/"
        pill
        variant="outline-secondary"
      >前往论坛</b-button>
      <hr style="width: 20%;" />
    </div>
    <div>
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="1.14 纯净生存">
          <div>
            <b-jumbotron
              text-variant="white"
              header="Minecraft 1.14.4 纯净生存服"
              lead="适合喜欢原版Minecraft的玩家、生电玩家、建筑玩家。"
              style="background-image: url(https://s1.ax1x.com/2020/07/13/UJBTtP.jpg); background-size: cover;"
            >
              <div class="inline">
                <a
                  href="https://jq.qq.com/?_wv=1027&k=6JyKdbXR"
                  class="badge badge-primary"
                >加入QQ群：897754430</a>
              </div>
            </b-jumbotron>
          </div>
        </b-tab>

        <b-tab title="1.12 Mod">
          <b-jumbotron
            text-variant="white"
            header="Minecraft 1.12.2 MOD服"
            lead="适合喜欢Mod的玩家。"
            style="background-image: url(https://s1.ax1x.com/2020/07/13/UJBWOH.jpg); background-size: cover;"
          >
            <b-button pill variant="primary" id="popover-target-1">Mod列表</b-button>
            <b-popover target="popover-target-1" triggers="hover" placement="top">
              <template v-slot:title>Mod 一览</template>
              <h6 class="text-left">
                [更多实用设备2]extrautils2
                <br />[工业时代2]industrialcraft
                <br />[工业先锋附属]IntegrationForegoing
                <br />[建筑]buildcraft-all-7.99.24.3
                <br />[匠魂补充]TinkersComplement
                <br />[匠魂基础]TConstruct
                <br />[匠魂拓展]plustic
                <br />[热动力学]ThermalDynamics
                <br />[热力基本]ThermalFoundation
                <br />[热力膨胀]ThermalExpansion
                <br />[通用机械]Mekanism
                <br />[通用机械发电机]MekanismGenerators
                <br />[通用机械矿物]mekores
                <br />[烹饪]CookingForBlockheads
                <br />[林业]forestry
                <br />[种地]Pam's+HarvestCraft
                <br />[暮色森林]twilightforest
                <br />[龙之进化]Draconic-Evolution
                <br />[冰与火之歌]iceandfire
              </h6>
            </b-popover>
            <div class="inline">
              <br />

              <a
                href="https://jq.qq.com/?_wv=1027&k=5PyzwjSn"
                class="badge badge-primary"
              >加入QQ群：221480578</a>
            </div>
          </b-jumbotron>
        </b-tab>

        <b-tab title="1.16 纯净生存" active>
          <div>
            <b-jumbotron
              text-variant="white"
              header="PPR 1.16 纯净生存服"
              lead="Popura 服务器，积聚硬核生电与建筑大佬，需要审核才能进入。"
              style="background-image: url(https://s1.ax1x.com/2020/07/13/UJDbU1.jpg); background-size: cover;"
            >
              <div class="inline">
                <a
                  href="https://jq.qq.com/?_wv=1027&k=9InTnRhL"
                  class="badge badge-warning"
                >加入审核群：1107836876</a>
              </div>
            </b-jumbotron>
            <div id="video-day-50" class="container">
              <br />
              <div id="mc116-detailed-infos">
                <h2 class="text-left">
                  宣传视频
                  <b-badge variant="info">50天</b-badge>
                </h2>
                <hr style="width:100%" />
                <b-card-group deck>
                  <b-card>
                    <iframe
                      src="https://player.bilibili.com/player.html?aid=754040891&cid=218725210&page=1&danmaku=0"
                      scrolling="no"
                      border="0"
                      frameborder="no"
                      framespacing="0"
                      allowfullscreen="true"
                      width="auto"
                      height="auto"
                    ></iframe>
                    <small class="d-block mb-3 text-muted text-center">UP：ice_feather冰羽</small>
                  </b-card>
                  <b-card>
                    <iframe
                      src="https://player.bilibili.com/player.html?aid=754098493&cid=219718409&page=1&danmaku=0"
                      scrolling="no"
                      border="0"
                      frameborder="no"
                      framespacing="0"
                      allowfullscreen="true"
                      width="auto"
                      height="auto"
                    ></iframe>
                    <small class="d-block mb-3 text-muted text-center">UP：_伊莉雅酱_</small>
                  </b-card>
                  <b-card class="text-left">
                    <strong>&#127754; 参与制作：</strong>
                    <p>
                      素材：ice_feather
                      <br />剪辑：Y_HUI & ice_feather
                    </p>
                  </b-card>
                </b-card-group>

                <hr style="width:60%" />
                <div id="waiting-for-your-join" class="text-center">
                  <h3 class="text-center">期待你的加入</h3>
                  <br />
                  <b-icon icon="three-dots-vertical" animation="cylon-vertical" font-scale="2"></b-icon>
                </div>
              </div>
              <br />
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "McHome",
};
</script>

<style scoped>
.card {
  border: none;
}
</style>