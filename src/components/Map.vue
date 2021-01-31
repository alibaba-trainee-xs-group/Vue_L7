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
      zoom: 4.7,
      rotation: 10,
      style: 'dark'
    })
    });
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
            .setHTML(`<span>车次: ${e.feature.number}</span>
                    from {e.feature.`);
          scene.addPopup(popup);
        });
        scene.addLayer(layer);
      });
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