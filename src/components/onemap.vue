<template>
    <div class="onemap">
        <mapView />
        <maptools />
        <menuTree />
        <search />
    </div>
</template>
<script>
import maptools from "./tools/maptools.vue";
import menuTree from "./tools/menuTree.vue";
import search from "./tools/search.vue";
import mapView from "./mapView.vue";
export default {
    name: "onemap",
    components: {
        maptools,
        menuTree,
        search,
        mapView
    }
}
</script>
<style lang="less">
.onemap {
    height: 100%;
    width: 100%;
    /* z-index: -1; */
}
</style>
