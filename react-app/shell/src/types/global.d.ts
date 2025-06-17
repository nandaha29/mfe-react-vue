import type * as Vue from "vue";

declare global {
  interface Window {
    Vue?: typeof Vue;
    navigateTo?: (path: string) => void;
  }
}
