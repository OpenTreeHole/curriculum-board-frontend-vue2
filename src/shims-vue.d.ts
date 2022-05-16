declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue-virtual-scroller' {
  import Vue, { ComponentOptions, PluginObject } from 'vue'
  interface PluginOptions {
    installComponents?: boolean
    componentsPrefix?: string
  }

  const plugin: PluginObject<PluginOptions> & { version: string }

  export const RecycleScroller: ComponentOptions<any, any, any, any>
  export const DynamicScroller: ComponentOptions<any, any, any, any>
  export const DynamicScrollerItem: ComponentOptions<any, any, any, any>

  export function IdState(options?: { idProp?: (vm: any) => any }): ComponentOptions<Vue> | typeof Vue

  export default plugin
}
