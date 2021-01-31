<template>
  <div>
    <div id="map"></div>
  </div>
</template>
<script>
import { Scene, LineLayer, Popup } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
export default {
  data() {
    return {};
  },
  mounted() {

    const scene = new Scene({
    id: 'map',
    map: new GaodeMap({
      center: [ 107.77791556935472, 35.443286920228644 ],
      pitch: 4.00000000000001,
      zoom: 5,
      rotation: 10,
      style: 'dark'
    })
    });
    // const layer = new LineLayer({});
    scene.on('loaded', () => {
    fetch(
      'https://gw.alipayobjects.com/os/basement_prod/ee07641d-5490-4768-9826-25862e8019e1.json'
    )
      .then(res => res.json())
      .then(data => {
        const layer = new LineLayer({})
          .source(data, {
            parser: {
              type: 'json',
              coordinates: 'path'
            }
          })
          .size('level', level => {
            return [ 0.8, level * 1 ];
          })
          .shape('line')
          .active(true)
          .color(
            'level',
            [
              '#0A3663',
              '#1558AC',
              '#3771D9',
              '#4D89E5',
              '#64A5D3',
              '#72BED6',
              '#83CED6',
              '#A6E1E0',
              '#B8EFE2',
              '#D7F9F0'
            ]
              .reverse()
              .slice(0, 8)
          );
        layer.on('mousemove', e => {
          const popup = new Popup({
            offsets: [ 0, 0 ],
            closeButton: false
          })
            .setLnglat(e.lngLat)
            .setHTML(`<span>车次: ${e.feature.number}</span>`);
          scene.addPopup(popup);
        });
        scene.addLayer(layer);
      });
      
    });
    scene.on('loaded', () => {
      var i  =1;                                                           //这里定义i来控制请求的时间范围，
    setInterval(()=>{ 
       fetch('http://127.0.0.1:8081/address?eTime='+2*i+':00:00&bTime='+i+':00:00')
    .then(res => res.json())
    .then(data => {
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
      scene.addLayer(layer2);
    });
    i++;
    },1000)
  // fetch('http://127.0.0.1:8081/address?eTime=24:00:00&bTime=00:00:00')
  //   .then(res => res.json())
  //   .then(data => {
  //     const layer2 = new LineLayer({})
  //       .source(data, {
  //         parser: {
  //           type: 'json',
  //           // x: 91.111891,
  //           // y: 29.662557,
  //           // x1: 97.342625,
  //           // y1: 37.373799
  //           x: 's_jd',
  //           y: 's_wd',
  //           x1: 'e_jd',
  //           y1: 'e_wd'
  //         }
  //       })
  //       .size(1)
  //       .shape('arc')
  //       .color('#8C1EB2')
  //       .style({
  //         opacity: 0.8,
  //         blur: 0.99
  //       });
  //     scene.addLayer(layer2);
  //   });
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
}
</style>