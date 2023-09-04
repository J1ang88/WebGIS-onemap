<template>
    <div class="maptool_view">
        <div class="maptool">
            <span class="toolitem" @click="toolItemClick" id="xzqh">行政区划导航</span>
            <span class="toolitem" @click="toolItemClick" id="menutree">目录树管理</span>
            <span class="toolitem" @click="toolItemClick" id="len">测距</span>
            <span class="toolitem" @click="toolItemClick" id="area">测面积</span>
            <span class="toolitem" @click="toolItemClick" id="clear">清屏</span>
        </div>
        <input type="text" style="border: 0px solid black;" v-model="msg" class="tip">
    </div>
</template>
<script>
import Draw from 'ol/interaction/Draw'
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
// import { store } from 'demo/src/store/store.js'
export default {
    name: 'maptools',
    data() {
        return {
            msg: "",
            draw: null,
            sketch: null,
            helpTooltipElement: null, //帮助提示框
            helpTooltip: null,
            continuePolygonMsg: null, //绘制多边形时提示相应内容
            continueLineMsg: null, //绘制线时提示相应内容
            view: null
        }
    },
    methods: {
        toolItemClick(e) {
            switch (e.target.id) {
                case 'xzqh':
                    this.openXZQH();
                    break;
                case 'menutree':
                    this.openmenutree();
                    break;
                case 'len':
                    this.measure('LineString');
                    break;
                case 'area':
                    this.measure('Polygon');
                    break;
                case 'clear':
                    this.measure('none');
                    break;
            }
        },
        openXZQH() {
            let XZQHComponentPannel = this.$store.getters._getDefaultXZQHComponentVisible;
            this.$store.commit('_setDefaultXZQHComponentVisible', !XZQHComponentPannel);
        },
        openmenutree() {
            let mapTreePannelVisible = this.$store.getters._getDefaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', !mapTreePannelVisible);
        },
        measure(type) {
            if (type !== 'none') {
                this.view = this.$store.getters._getDefaultMapView;
                var source = new VectorSource();
                var vector = new VectorLayer({
                    source: source,
                    type: type,
                    name: 'measureVector'
                });//新建绘画用的矢量图层
                this.sketch = new Feature();
                this.view.removeInteraction(this.draw);//清除先前的绘制
                this.draw = new Draw({
                    source: source,
                    type: type
                })
                this.view.addInteraction(this.draw);
                this.draw.on('drawend', (evt) => {
                    console.log('结束画')
                    this.sketch = evt.feature
                    if (type == 'LineString') {
                        this.msg = this.sketch.getGeometry().getLength() + "  km"
                    } else if (type == 'Polygon') {
                        this.msg = this.sketch.getGeometry().getArea() + "  km^2"
                    }
                    this.view.removeInteraction(this.draw);
                })
            } else {
                // 清除交互
                this.view.removeInteraction(this.draw)
                this.sketch = null;//清除交互点
                // 清除测量的图层
                console.log(this.view.getAllLayers())
                this.view.getAllLayers().forEach(element => {
                    if (element.values_.name == 'mensureVector')
                        this.map.removeLayer(element)
                });
                // 清除测量结果
                this.msg = null
            }
        }
    }
}
</script>
<style>
.maptool {
    position: absolute;
    top: 20px;
    right: 30px;
    height: 30px;
    padding: 0 15px;
    line-height: 30px;
    background-color: aliceblue;
    color: black;
}

.toolitem {
    cursor: pointer;
}

.tip {
    position: absolute;
    top: 60px;
    right: 30px;
    height: 30px;
    padding: 0 15px;
    line-height: 30px;
    background-color: aliceblue;
}
</style>