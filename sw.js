/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-34f51d66'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  workbox.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "0.bootstrap.js",
    "revision": "9e3360765a3a1fd15122b51a5e89ed76"
  }, {
    "url": "6c3973663b1ed0a61f54.module.wasm",
    "revision": "37694238764af49182fe0e69af13ab40"
  }, {
    "url": "android-chrome-192x192.png",
    "revision": "bc7a9d99c2eb47ead897dc5813befcfa"
  }, {
    "url": "android-chrome-512x512.png",
    "revision": "6155791cdc718b226adaa0cfc1a38294"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f9ba9b3b1bdc696c399e6f549fbe12b3"
  }, {
    "url": "bootstrap.js",
    "revision": "a20a8a7efa6129c949c6166b87bef637"
  }, {
    "url": "favicon-16x16.png",
    "revision": "81da15b5f8e44080762b169309d0e9d9"
  }, {
    "url": "favicon-32x32.png",
    "revision": "22e9f4bddac104a278c464e26699a33f"
  }, {
    "url": "favicon.ico",
    "revision": "f762d7138dc0a5b2a07399d2a9690697"
  }, {
    "url": "index.html",
    "revision": "ad7a0ee2bbeb3ea5e431dfa3245e70c9"
  }, {
    "url": "manifest.json",
    "revision": "82f5348f7081b344d4b157fa4a34a10b"
  }], {});

});
//# sourceMappingURL=sw.js.map
