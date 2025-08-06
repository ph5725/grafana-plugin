import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { PageMap } from './Panel';

export const plugin = new PanelPlugin<SimpleOptions>(PageMap).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'portal_edit',
      name: 'Portal URL',
      description: 'portal url',
      defaultValue: '',
    })
    .addTextInput({
      path: 'token_edit',
      name: 'Token',
      description: 'token',
      defaultValue: '',
    })
    .addTextInput({
      path: 'webmapId_edit',
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