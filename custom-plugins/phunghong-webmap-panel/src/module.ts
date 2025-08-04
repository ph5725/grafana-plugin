import { PanelPlugin } from '@grafana/data';
// import { SimpleOptions } from './types';
import { PageMap } from './Panel';

export const plugin = new PanelPlugin(PageMap).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'portal',
      name: 'Portal URL',
      description: 'portal url',
      defaultValue: '',
    })
    .addTextInput({
      path: 'token',
      name: 'Token',
      description: 'token',
      defaultValue: '',
    })
    .addTextInput({
      path: 'webmapId',
      name: 'ArcGIS WebMap ID',
      description: 'item id',
      defaultValue: '',
    })
  // .addBooleanSwitch({
  //   path: 'showSeriesCount',
  //   name: 'Show series counter',
  //   defaultValue: false,
  // })
  // .addRadio({
  //   path: 'seriesCountSize',
  //   defaultValue: 'sm',
  //   name: 'Series counter size',
  //   settings: {
  //     options: [
  //       {
  //         value: 'sm',
  //         label: 'Small',
  //       },
  //       {
  //         value: 'md',
  //         label: 'Medium',
  //       },
  //       {
  //         value: 'lg',
  //         label: 'Large',
  //       },
  //     ],
  // },
  // showIf: (config) => config.showSeriesCount,
  // });
});