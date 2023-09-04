<template>
    <div id="mapView"></div>
</template>
<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import XYZ from 'ol/source/XYZ';
import { defaults as defaultControl } from 'ol/control'
import { Map, View } from "ol";
export default {
    name: "mapView",
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
                    //proj,
                    projection: "EPSG:4326",
                    zoom: 5,
                }),
                controls: new defaultControl({ // 地图控件
                    zoom: false, // 清除放大缩小控件
                    rotate: false, // 清除旋转地图控件
                }),
                //控件不清除会覆盖在地图上，导致滑轮不可用
                target: 'mapView',
                layers: [
                    // 图层
                    new TileLayer({
                        // 这里定义的是平铺图层
                        source: new XYZ({
                            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
                        }),
                        name: "底图",
                    }),
                ],

            })
            this.$store.commit('_setDefaultMapView', this.map);
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
#mapView {
    // position: absolute;
    width: 100%;
    height: 100%;
}
</style>