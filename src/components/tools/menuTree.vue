<template>
    <div class="menutree" v-show="this.$store.getters._getDefaultMapTreeVisible">
        <el-tree :data="toolData" :props="defaultProps" @node-click="handleNodeClick">
        </el-tree>
    </div>
</template>
<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import XYZ from 'ol/source/XYZ';
// import store from '../store/store.js'
import { defaults as defaultControl } from 'ol/control'
import { Map, View } from "ol";
export default {
    name: 'menuTree',
    data() {
        return {
            map: null,
            toolData: [{
                label: "中文地图",
                children: [{
                    label: "暖色中文地图",
                    layerurl: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{x}/{y} ",
                    name: "cn"
                }
                    /* , {
                        label: "英文地图",
                    } */
                ]
            },
            {
                label: "英文地图",
                children: [{
                    label: "冷色英文地图",
                    layerurl: " http://api{s}.map.bdimg.com/customimage/tile?x={x2}&y={y2}&z={z}&scale=1&customid=dark",
                    name: "en"
                }
                    /* , {
                        label: "英文地图",
                    } */
                ]
            }],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
        }
    },
    methods: {
        handleNodeClick(toolData) {
            if (toolData.layerurl) {
                const view = this.$store.getters._getDefaultMapView;
                // console.log(layers.get('className') === '底图');
                const en = new TileLayer({
                    source: new XYZ({
                        url: " http://api{s}.map.bdimg.com/customimage/tile?x={x2}&y={y2}&z={z}&scale=1&customid=dark",
                    }),
                    name: 'en'
                })
                const cn = new TileLayer({
                    source: new XYZ({
                        url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{x}/{y} ",
                    }),
                    name: 'cn'
                })
                // view.removeLayer(layers.item(0));
                var layers = view.getLayers();
                // console.log(layers);
                layers.forEach(element => {
                    if (element.values_.name !== '底图')
                        view.removeLayer(element);
                });
                // console.log(layers);
                switch (toolData.name) {
                    case 'en':
                        view.addLayer(en);
                        break;
                    case 'cn':
                        view.addLayer(cn);
                        break;
                    default:
                        break;
                }
                // console.log((view.getLayers()));
            }
        }
    }
}
</script>
<style>
.menutree {
    position: relative;
    top: -700px;
    left: 0px;
    width: 200px;
    height: 300px;
}
</style>