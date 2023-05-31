// eslint-disable-next-line import/no-extraneous-dependencies
import {registerRoute} from 'workbox-routing';
// eslint-disable-next-line import/no-extraneous-dependencies
import {StaleWhileRevalidate} from 'workbox-strategies';

export default function swCustom(params) {
  if (params.debug) {
    console.log('[tmf-map-PWA][SW]: running swCustom code', params);
  }

  // Cache responses from external resources
  registerRoute(context => {
    return [/aliyuncs\.com/].some(regex => context.url.href.match(regex));
  }, new StaleWhileRevalidate());
}
