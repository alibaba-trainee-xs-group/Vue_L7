console.log('test')
import { registerRoute, setCatchHandler } from "workbox-routing";
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";


registerRoute(
  //检查导航是否检查到新的页面
  ({ request }) => request.mode === "navigate",
  //使用网络优先的策略
  new NetworkFirst({
    //设置缓存的位置,把所有的缓存写入位置为'pages'的缓存中
    cacheName: "pages",
    plugins: [
      //只缓存响应码为200的数据
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

//缓存js css 以及 重新验证过时了的策略
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker",
  // 配置失效的时候重新校验的策略
  new StaleWhileRevalidate({
    cacheName:'assets',
    plugins:[
      new CacheableResponsePlugin({
        statuses:[200]
      })
    ]
  })
);

//配置优先缓存的策略来缓存图像
registerRoute(
  //检查请求是否为图片格式
  ({request}) => request.destination === 'image',
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: 'images',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // 设置最多缓存图片数量为 50 最长缓存时间为30天
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30day
      }),
    ],
  }),
)

