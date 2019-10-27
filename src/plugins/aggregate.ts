import promiseAllProperties from 'promise-all-properties';

export interface VuePluginContext {
  [key: string]: VuePlugin;
}

export type VuePlugin = (context: VuePluginContext) => {};

export interface VuePluginOptions {
  [key: string]: VuePlugin;
}

export type VuePluginAggregate = any;

export const aggregate = async (
  items: VuePluginOptions,
): Promise<VuePluginAggregate> => {
  const context = {};

  // tslint:disable-next-line: forin
  for (const prop in items) {
    Object.defineProperty(context, prop, {
      async get() {
        return items[prop](context);
      },
    });
  }

  const pluginsPromises: any = {};
  // tslint:disable-next-line: forin
  for (const prop in items) {
    pluginsPromises[prop] = items[prop](context);
  }

  return promiseAllProperties(pluginsPromises);
};
