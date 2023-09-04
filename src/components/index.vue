<template>
  <div id="mapIndex"></div>
</template>
<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import XYZ from 'ol/source/XYZ';
import { defaults as defaultControl } from 'ol/control'
import { Map, View } from "ol";
export default {
  name: "Tileset",
  data() {
    return {
      map: "",
    }
  },
  methods: {
    createMap() {
      this.map = new Map({
        view: new View({
          center: [103.834228, 36.060798],
          projection: "EPSG:4326",
          zoom: 5,
        }),
        controls: new defaultControl({ // 地图控件
          zoom: false, // 清除放大缩小控件
          rotate: false, // 清除旋转地图控件
        }),
        //控件不清除会覆盖在地图上，导致滑轮不可用
        target: 'mapIndex',
        layers: [
          new TileLayer({
            // 这里定义的是平铺图层
            title: "天地图影像底图",
            source: new XYZ({
              url: 'http://t4.tianditu.com/DataServer?T=img_w&tk=e4f6f5804dc71ba717d7ad83c704b6df&x={x}&y={y}&l={z}',
            }),
          }),
          new TileLayer({
            // 这里定义的是平铺图层
            title: "天地图注记图层",
            source: new XYZ({
              url: 'http://t4.tianditu.com/DataServer?T=cia_w&tk=e4f6f5804dc71ba717d7ad83c704b6df&x={x}&y={y}&l={z}',
            }),
            //http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}高德
          }),
        ],
      })
    }
  },
  mounted() {
    const promise = Promise.resolve();
    promise.then(() => {
      this.createMap()
    }).catch((error) => {
      console.log(error);
    })
  }
}
</script>
<style lang="less">
#mapIndex {
  width: 100%;
  height: 100%;
}
</style>