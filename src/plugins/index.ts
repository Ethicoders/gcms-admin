import Vue from 'vue';
import { aggregate } from './aggregate';

export default async () => {
  const pluginsOptions = await Object.fromEntries(
    await Promise.all(
      ['store/index', 'router', 'axios', 'i18n/index'].map(async (pluginName) => [
        pluginName.replace('/index', ''),
        (await import('./' + pluginName)).default,
      ]),
    ),
  );
  return aggregate(pluginsOptions);
};
