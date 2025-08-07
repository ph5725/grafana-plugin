import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { PageMap } from './Panel';

export const plugin = new PanelPlugin<SimpleOptions>(PageMap).setPanelOptions((builder) => {
  //   return builder

  //     .addCustomEditor({
  //       id: 'mapSettingsGroup',
  //       path: 'mapSettingsGroup',
  //       name: 'Map Settings', // <-- Tên hiển thị giống "Webmap-Panel"
  //       editor: () => null, // placeholder để nhóm
  //       category: ['Map Settings'], // nhóm riêng biệt
  //       defaultValue: '',
  //     })

  //     .addCustomEditor({
  //       id: 'mapSettingsGroup',
  //       path: 'mapSettingsGroup',
  //       name: 'Map Settings', // <-- Tên hiển thị giống "Webmap-Panel"
  //       editor: () => null, // placeholder để nhóm
  //       category: ['Map Settings'], // nhóm riêng biệt
  //       defaultValue: '',
  //     })

  //     .addCustomEditor({
  //       id: 'mapSettingsGroup',
  //       path: 'mapSettingsGroup',
  //       name: 'Map Settings', // <-- Tên hiển thị giống "Webmap-Panel"
  //       editor: () => null, // placeholder để nhóm
  //       category: ['Map Settings'], // nhóm riêng biệt
  //       defaultValue: '',
  //     })  

  //     .addTextInput({
  //       path: 'portal_edit',
  //       name: 'Portal URL',
  //       description: 'portal url',
  //       defaultValue: '',
  //       category: ['Map Settings'],
  //     })

  //     .addTextInput({
  //       path: 'token_edit',
  //       name: 'Token',
  //       description: 'token',
  //       defaultValue: '',
  //       category: ['Map Settings'],
  //     })
  //     .addTextInput({
  //       path: 'webmapId_edit',
  //       name: 'ArcGIS WebMap ID',
  //       description: 'item id',
  //       defaultValue: '',
  //       category: ['Map Settings'],
  //     })
  //   // .addBooleanSwitch({
  //   //   path: 'showSeriesCount',
  //   //   name: 'Show series counter',
  //   //   defaultValue: false,
  //   // })
  //   // .addRadio({
  //   //   path: 'seriesCountSize',
  //   //   defaultValue: 'sm',
  //   //   name: 'Series counter size',
  //   //   settings: {
  //   //     options: [
  //   //       {
  //   //         value: 'sm',
  //   //         label: 'Small',
  //   //       },
  //   //       {
  //   //         value: 'md',
  //   //         label: 'Medium',
  //   //       },
  //   //       {
  //   //         value: 'lg',
  //   //         label: 'Large',
  //   //       },
  //   //     ],
  //   // },
  //   // showIf: (config) => config.showSeriesCount,
  //   // });
  // });
  return builder
    // Nhóm 1: Thông tin chung
    .addCustomEditor({
      id: 'generalGroup',
      path: 'generalGroup',
      name: 'Thông tin chung',
      editor: () => null,
      category: ['Thông tin chung'],
      defaultValue: '',
    })
    .addTextInput({
      path: 'portal_edit',
      name: 'Portal URL',
      defaultValue: '',
      category: ['Thông tin chung'],
    })
    .addTextInput({
      path: 'token_edit',
      name: 'Token',
      defaultValue: '',
      category: ['Thông tin chung'],
    })
    .addTextInput({
      path: 'title_edit',
      name: 'Tiêu đề WebMap',
      defaultValue: '',
      category: ['Thông tin chung'],
    })

    // Nhóm 2: Cấu hình bản đồ
    .addCustomEditor({
      id: 'mapConfigGroup',
      path: 'mapConfigGroup',
      name: 'Cấu hình bản đồ',
      editor: () => null,
      category: ['Cấu hình bản đồ'],
      defaultValue: '',
    })
    .addRadio({
      path: 'mapType',
      name: 'Loại bản đồ',
      defaultValue: 'webmap',
      category: ['Cấu hình bản đồ'],
      settings: {
        options: [
          { value: 'webmap', label: 'WebMap' },
          { value: 'mapserver', label: 'MapServer' },
          { value: 'featureserver', label: 'FeatureServer' },
        ],
      },
    })

    .addTextInput({
      path: 'webmapId_edit',
      name: 'WebMap ID',
      defaultValue: '',
      category: ['Cấu hình bản đồ'],
      showIf: (config) => config.mapType === 'webmap',
    })
    .addTextInput({
      path: 'mapServer_edit',
      name: 'Service Item Id',
      defaultValue: '',
      category: ['Cấu hình bản đồ'],
      showIf: (config) => config.mapType === 'mapserver',
    })
    .addTextInput({
      path: 'featureServer_edit',
      name: 'Service Item Id',
      defaultValue: '',
      category: ['Cấu hình bản đồ'],
      showIf: (config) => config.mapType === 'featureserver',
    })
    .addBooleanSwitch({
      path: 'triggerLoadMap',
      name: 'Tải bản đồ sau khi thiết lập',
      defaultValue: false,
      category: ['Cấu hình bản đồ'],
    })
});