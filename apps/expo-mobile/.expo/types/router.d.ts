/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\..\next-web\.next\types\app\(app)\challenges\page` | `/..\..\next-web\.next\types\app\(app)\detox-path\page` | `/..\..\next-web\.next\types\app\(app)\focus-mode\page` | `/..\..\next-web\.next\types\app\(app)\habits\page` | `/..\..\next-web\.next\types\app\(app)\home\page` | `/..\..\next-web\.next\types\app\(app)\layout` | `/..\..\next-web\.next\types\app\(app)\mindfulness\page` | `/..\..\next-web\.next\types\app\(app)\onboarding\page` | `/..\..\next-web\.next\types\app\(app)\profile\page` | `/..\..\next-web\.next\types\app\(app)\progress\page` | `/..\..\next-web\.next\types\app\(app)\subscription\page` | `/..\..\next-web\.next\types\app\(marketing)\about\page` | `/..\..\next-web\.next\types\app\(marketing)\blog\page` | `/..\..\next-web\.next\types\app\(marketing)\careers\page` | `/..\..\next-web\.next\types\app\(marketing)\contact\page` | `/_sitemap` | `/challenges` | `/detox-path` | `/focus-mode` | `/habits` | `/profile` | `/progress` | `/subscription`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
