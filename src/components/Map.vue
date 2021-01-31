<template>
  <div>
    <Prompt v-bind:trainDatas="propData"></Prompt>
    <div id="map"></div>
  </div>
</template>
<script>
import { Scene, LineLayer} from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import Prompt from '../components/Prompt'
export default {
  data() {
    return {
      propData: null,
    }
  },
  components: {
    Prompt
  },
  mounted() {
    const scene = new Scene({
    id: 'map',
    map: new GaodeMap({
      center: [ 107.77791556935472, 35.443286920228644 ],
      pitch: 4.00000000000001,
      zoom: 4.7,
      rotation: 10,
      style: 'dark'
    })
    });
    scene.on('loaded', () => {
      let i  = 1;                                                           //这里定义i来控制请求的时间范围，
      let requestData = setInterval(()=>{ 
        if(i > 24) {
          clearInterval(requestData);
        }
        fetch('http://127.0.0.1:8081/address?eTime=' + (i + 1)+':00:00&bTime=' + ( i ) + ':00:00')
        .then(res => res.json())
        .then(data => {
          this.propData = data;
          const layer2 = new LineLayer({})
            .source(data, {
              parser: {
                type: 'json',
                // x: 91.111891,
                // y: 29.662557,
                // x1: 97.342625,
                // y1: 37.373799
                x: 's_jd',
                y: 's_wd',
                x1: 'e_jd',
                y1: 'e_wd'
              }
            })
            .size(1)
            .shape('arc')
            .color('#8C1EB2')
            .style({
              opacity: 0.8,
              blur: 0.99
            });
          layer2.animate(true);
          layer2.animate({
          duration: 5,
          interval: 0.1,
          trailLength: 0.5,
      });
          scene.addLayer(layer2);
        });
        i++;
        },2000)
});
  }
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

html,
body {
  overflow: hidden;
  margin: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 0;
}
</style>