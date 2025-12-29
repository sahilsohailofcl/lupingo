/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\..\next-web\.next\types\app\(marketing)\layout` | `/_sitemap` | `/detox-path` | `/focus-mode`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
