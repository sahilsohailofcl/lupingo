/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\..\next-web\.next\dev\types\app\landing\page` | `/..\..\next-web\.next\dev\types\app\layout` | `/..\..\next-web\.next\dev\types\validator` | `/_sitemap` | `/detox-path` | `/focus-mode`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
