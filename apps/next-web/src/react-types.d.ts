// Type declarations for React 19
// React 19 includes built-in TypeScript types, but TypeScript may need help finding them in pnpm workspaces
// This file ensures TypeScript can find React 19's built-in types

// Create an ambient module declaration that helps TypeScript locate React's types
// This works around pnpm workspace resolution issues
declare module 'react' {
  // Export named exports (ES6 module style)
  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prev: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  export function useMemo<T>(factory: () => T, deps: readonly any[]): T;
  export function useRef<T>(initialValue: T | null): { current: T | null };
  export function useContext<T>(context: any): T;
  export function useReducer<R extends any>(reducer: (state: R, action: any) => R, initialState: R): [R, (action: any) => void];
  export function useLayoutEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useImperativeHandle<T, R extends T>(ref: any, init: () => R, deps?: readonly any[]): void;
  export function useId(): string;
  export function useTransition(): [boolean, (callback: () => void) => void];
  export function useDeferredValue<T>(value: T): T;
  export function useSyncExternalStore<T>(subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => T, getServerSnapshot?: () => T): T;
  export function useInsertionEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function createContext<T>(defaultValue: T): any;
  export function createElement(type: any, props?: any, ...children: any[]): any;
  export const Fragment: any;
  export function forwardRef<T, P = {}>(component: (props: P, ref: React.Ref<T>) => any): any;
  export function memo<P = {}>(component: (props: P) => any): any;
  export const Children: any;
  export function isValidElement(object: any): boolean;
  export function cloneElement(element: any, props?: any, ...children: any[]): any;
  
  // Export types
  export type ReactNode = any;
  export type ReactElement<P = any, T = any> = any;
  export type ComponentType<P = {}> = any;
  export type FC<P = {}> = (props: P) => ReactElement | null;
  export type HTMLAttributes<T> = any;
  export type ButtonHTMLAttributes<T> = any;
  export type InputHTMLAttributes<T> = any;
  export type ChangeEvent<T = Element> = any;
  export type MouseEvent<T = Element> = any;
  export type KeyboardEvent<T = Element> = any;
  export type FormEvent<T = Element> = any;
  export type FocusEvent<T = Element> = any;
  export type SyntheticEvent<T = Element, E = Event> = any;
  export type RefObject<T> = { current: T | null };
  export type RefCallback<T> = (instance: T | null) => void;
  export type Ref<T> = RefCallback<T> | RefObject<T> | null;
  export type ComponentProps<T> = any;
  export type ComponentPropsWithoutRef<T> = any;
  export type ComponentPropsWithRef<T> = any;
  export type ReactFragment = any;
  export type ReactPortal = any;
  export type Key = string | number;
  export type JSX = any;
  
  // Export default (for default import)
  const React: {
    useState: typeof useState;
    useEffect: typeof useEffect;
    useCallback: typeof useCallback;
    useMemo: typeof useMemo;
    useRef: typeof useRef;
    useContext: typeof useContext;
    useReducer: typeof useReducer;
    useLayoutEffect: typeof useLayoutEffect;
    useImperativeHandle: typeof useImperativeHandle;
    useId: typeof useId;
    useTransition: typeof useTransition;
    useDeferredValue: typeof useDeferredValue;
    useSyncExternalStore: typeof useSyncExternalStore;
    useInsertionEffect: typeof useInsertionEffect;
    createContext: typeof createContext;
    createElement: typeof createElement;
    Fragment: typeof Fragment;
    forwardRef: typeof forwardRef;
    memo: typeof memo;
    Children: typeof Children;
    isValidElement: typeof isValidElement;
    cloneElement: typeof cloneElement;
  };
  export default React;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export const Fragment: any;
}
