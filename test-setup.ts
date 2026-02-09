import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  },
);

function disableStylesInJsdom(): void {
  const originalAppendChild = HTMLHeadElement.prototype.appendChild;

  HTMLHeadElement.prototype.appendChild = function <T extends Node>(
    node: T,
  ): T {
    if ((node as HTMLElement)?.tagName === 'STYLE') {
      return node;
    }
    return originalAppendChild.call(this, node);
  };
}

disableStylesInJsdom();

if (typeof window !== 'undefined') {
  console.error = () => {
    // Suppress all console.error in tests
  };
}
