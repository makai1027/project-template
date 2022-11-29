<template>
  <BasicForm
    :fieldMapToTime="[['timerpicker', ['startTime', 'endTime'], 'HH:mm:ss']]"
    :rowProps="{ gutter: 20 }"
    autoFocusFirstItem
    :labelWidth="150"
    :schemas="schemas"
    :actionColOptions="{ span: 24 }"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <template #selectA="{ model, field }">
      <ApiSelect
        :options="optionsA"
        :modelValue="model[field]"
        :collapseTags="true"
        :collapseTagsTooltip="true"
        :multiple="true"
        @change="(params: any) => (model[field] = params)"
      />
    </template>
    <template #selectB="{ model, field }">
      <ApiSelect
        :options="optionsB"
        :modelValue="model[field]"
        :collapseTags="true"
        :collapseTagsTooltip="true"
        :multiple="true"
        @change="(params: any) => (model[field] = params)"
      />
    </template>
  </BasicForm>
</template>
<script lang="ts">
import { computed, defineComponent, unref, ref, watch } from 'vue'
import { BasicForm, FormSchema, ApiSelect } from '@hobby/curd-create'
// import { AlarmClock } from '@element-plus/icons-vue'
// import { optionsListApi } from '@/api/demo/select'
// import { treeOptionsListApi } from '@/api/demo/tree'
import { ElMessage } from 'element-plus'
import { cloneDeep, debounce } from 'lodash-es'

const valueSelectA = ref<string[]>([])
const valueSelectB = ref<string[]>([])
const options = ref<Recordable[]>([])
for (let i = 1; i < 10; i++) options.value.push({ label: '选项' + i, value: `${i}` })

const optionsA = computed(() => {
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectB).indexOf(op.value) !== -1
    return op
  })
})
const optionsB = computed(() => {
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectA).indexOf(op.value) !== -1
    return op
  })
})

const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1'
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2'
  }
]
const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1'
    },
    {
      label: '深圳市',
      value: '2',
      key: '2'
    },
    {
      label: '广州市',
      value: '3',
      key: '3'
    }
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1'
    },
    {
      label: '无锡市',
      value: '2',
      key: '2'
    },
    {
      label: '苏州市',
      value: '3',
      key: '3'
    }
  ]
}

const schemas: FormSchema[] = [
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '基础字段',
    colProps: {
      span: 24
    }
  },
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',

    colProps: {
      span: 8
    },
    // componentProps:{},
    // can func
    componentProps: ({ schema, formModel }) => {
      console.log('form:', schema)
      console.log('formModel:', formModel)
      return {
        type: 'text',
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e)
        }
      }
    },
    renderComponentContent: () => {
      return {
        prefix: () => 'pSlot',
        suffix: () => 'sSlot'
      }
    }
  },
  {
    field: 'field2',
    component: 'Input',
    label: '带后缀',
    defaultValue: '111',
    colProps: {
      span: 8
    },
    componentProps: {
      formatter: (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: (value: any) => value.replace(/\$\s?|(,*)/g, ''),
      // prefixIcon: 'AlarmClock',
      // suffixIcon: 'AlarmClock',
      onChange: (e: any) => {
        console.log(e)
      }
    },
    suffix: '天'
  },
  {
    field: 'multifield4',
    component: 'Select',
    label: '多选',
    colProps: {
      span: 8
    },
    componentProps: {
      multiple: false,
      filterable: true,
      collapseTags: true,
      collapseTagsTooltip: true,
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1'
        },
        {
          label: '选项2',
          value: '2',
          key: '2'
        }
      ]
    }
    // rules: [
    //   {
    //     required: true,
    //     message: '请输入aa',
    //     type: 'array'
    //   }
    // ]
  },
  {
    field: 'field2_2',
    component: 'Input',
    label: '密码',
    defaultValue: '111',
    colProps: {
      span: 8
    },
    componentProps: {
      type: 'password',
      showPassword: true,
      onChange: (e: any) => {
        console.log(e)
      }
    },
    suffix: '天'
  },

  {
    field: 'field2_3',
    component: 'Input',
    label: 'textarea',
    defaultValue: '111',
    colProps: {
      span: 8
    },
    componentProps: {
      maxlength: '30',
      placeholder: 'Please input',
      showWordLimit: true,
      type: 'textarea',
      onChange: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8
    },
    componentProps: {
      type: 'date',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    field: 'timerpicker',
    component: 'TimePicker',
    label: 'timerpicker',
    colProps: {
      span: 8
    },
    componentProps: {
      arrowControl: false,
      isRange: true,
      rangeSeparator: 'To',
      startPlaceholder: 'Start time',
      endPlaceholder: 'End time'
    }
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8
    },
    subLabel: 'subLabel',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1'
        },
        {
          label: '选项2',
          value: '2',
          key: '2'
        }
      ]
    }
  },
  {
    field: 'timeselect',
    component: 'TimeSelect',
    label: 'timeselect',
    colProps: {
      span: 8
    },
    componentProps: {
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }
  },
  {
    field: 'colorpicker',
    component: 'ColorPicker',
    label: 'colorpicker',
    colProps: {
      span: 8
    },
    componentProps: {}
  },
  {
    field: 'field5',
    component: 'CheckboxGroup',
    label: '字段5',
    colProps: {
      span: 8
    },
    componentProps: {
      isBtn: true,
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        },
        {
          label: '选项3',
          value: '3',
          disabled: true
        }
      ]
    }
  },

  {
    field: 'field7',
    component: 'RadioGroup',
    label: '字段7',
    colProps: {
      span: 8
    },
    componentProps: {
      isBtn: true,
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        },
        {
          label: '选项3',
          value: '3',
          disabled: true
        }
      ]
    }
  },
  {
    field: 'field8',
    component: 'Checkbox',
    label: '字段8',
    colProps: {
      span: 8
    },
    renderComponentContent: 'Check'
  },
  {
    field: 'field9',
    component: 'Switch',
    label: '字段9',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field11',
    component: 'Cascader',
    label: '字段11',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    field: 'divider-api-select',
    component: 'Divider',
    label: '远程下拉演示',
    colProps: {
      span: 24
    }
  },
  // {
  //   field: 'field30',
  //   component: 'Select',
  //   label: '懒加载远程下拉',
  //   required: true,
  //   componentProps: {
  //     // more details see /src/components/Form/src/components/ApiSelect.vue
  //     api: optionsListApi,
  //     params: {
  //       id: 1
  //     },
  //     resultField: 'result.list',
  //     // use name as label
  //     labelField: 'name',
  //     // use id as value
  //     valueField: 'id',
  //     // not request untill to select
  //     immediate: false,
  //     onChange: (e: any) => {
  //       console.log('selected:', e)
  //     },
  //     // atfer request callback
  //     onOptionsChange: (options: any[]) => {
  //       console.log('get options', options.length, options)
  //     }
  //   },
  //   colProps: {
  //     span: 8
  //   },
  //   defaultValue: '0'
  // },
  // {
  //   field: 'field31',
  //   component: 'Input',
  //   label: '下拉本地搜索',
  //   helpMessage: ['ApiSelect组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
  //   required: true,
  //   slot: 'localSearch',
  //   colProps: {
  //     span: 8
  //   },
  //   defaultValue: '0'
  // },
  // {
  //   field: 'field32',
  //   component: 'Select',
  //   label: '下拉远程搜索',
  //   helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
  //   required: true,
  //   componentProps: {
  //     // more details see /src/components/Form/src/components/ApiSelect.vue
  //     api: optionsListApi,
  //     params: {
  //       id: 2
  //     },
  //     resultField: 'result.list',
  //     // use name as label
  //     labelField: 'name',
  //     // use id as value
  //     valueField: 'id',
  //     filterable: true,
  //     remote: true,
  //     // not request untill to select
  //     immediate: false,
  //     onChange: (e: any) => {
  //       console.log('selected:', e)
  //     },
  //     // atfer request callback
  //     onOptionsChange: (options: any[]) => {
  //       console.log('get options', options.length, options)
  //     }
  //   },
  //   colProps: {
  //     span: 8
  //   },
  //   defaultValue: '0'
  // },
  // {
  //   field: 'field33',
  //   component: 'Select',
  //   label: '多选分组',
  //   helpMessage: ['ApiSelect组件', '使用接口提供的数据生成选项'],
  //   required: true,
  //   defaultValue: [],
  //   componentProps: {
  //     api: treeOptionsListApi,
  //     groupField: 'children',
  //     labelField: 'title',
  //     isGroup: true,
  //     collapseTags: true,
  //     collapseTagsTooltip: true,
  //     validateTrigger: 'blur',
  //     afterFetch: (params: Recordable) => {
  //       return params.result
  //     },
  //     multiple: true,
  //     resultField: 'list'
  //   },
  //   colProps: {
  //     span: 8
  //   }
  // },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '字段联动',
    colProps: {
      span: 24
    }
  },
  {
    field: 'province',
    component: 'Select',
    label: '省份',
    colProps: {
      span: 8
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: provincesOptions,
        placeholder: '省份与城市联动',
        onChange: (e: any) => {
          // console.log(e)
          let citiesOptions =
            e == 1
              ? (citiesOptionsData as Recordable)[provincesOptions[0].id]
              : (citiesOptionsData as Recordable)[provincesOptions[1].id]
          // console.log(citiesOptions)
          if (e === undefined) {
            citiesOptions = []
          }
          formModel.city = undefined //  reset city value
          const { updateSchema } = formActionType
          updateSchema({
            field: 'city',
            componentProps: {
              options: citiesOptions
            }
          })
        }
      }
    }
  },
  {
    field: 'city',
    component: 'Select',
    label: '城市',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [], // defalut []
      placeholder: '省份与城市联动'
    }
  },
  {
    field: 'divider-selects',
    component: 'Divider',
    label: '互斥多选',
    helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
    colProps: {
      span: 24
    }
  },
  {
    field: 'selectA',
    component: 'Select',
    label: '互斥SelectA',
    slot: 'selectA',
    defaultValue: [],
    colProps: {
      span: 8
    }
  },
  {
    field: 'selectB',
    component: 'Select',
    label: '互斥SelectB',
    slot: 'selectB',
    defaultValue: [],
    colProps: {
      span: 8
    }
  },
  {
    field: 'divider-deconstruct',
    component: 'Divider',
    label: '字段解构',
    helpMessage: ['如果组件的值是 array 或者 object', '可以根据 ES6 的解构语法分别取值'],
    colProps: {
      span: 24
    }
  },
  {
    field: '[dateStartTime, dateEndTime]',
    label: '日期时间范围',
    component: 'DatePicker',
    componentProps: {
      type: 'datetimerange',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    colProps: {
      span: 12
    }
  },
  {
    field: '[startTime, endTime]',
    label: '时间范围',
    component: 'TimePicker',
    componentProps: {
      isRange: true,
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss'
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'divider-others',
    component: 'Divider',
    label: '其它',
    colProps: {
      span: 24
    }
  },
  {
    field: 'field20',
    component: 'InputNumber',
    label: '字段20',
    required: true,
    colProps: {
      span: 8
    }
  },
  {
    field: 'field21',
    component: 'Slider',
    label: '字段21',
    defaultValue: [3, 50],
    componentProps: {
      min: 0,
      max: 100,
      range: true,
      marks: {
        20: '20°C',
        60: '60°C'
      }
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field22',
    component: 'Rate',
    label: '字段22',
    defaultValue: 3,
    colProps: {
      span: 8
    },
    componentProps: {
      disabled: false,
      allowHalf: true,
      max: 10
    }
  }
]

export default defineComponent({
  // BasicForm, CollapseContainer, ApiSelect,
  components: { BasicForm, ApiSelect },
  setup() {
    const check = ref(null)
    const keyword = ref<string>('')
    const searchParams = computed<Recordable>(() => {
      return { keyword: unref(keyword) }
    })

    function onSearch(value: string) {
      keyword.value = value
    }
    const valuesKeys = ref<any[]>([])
    watch(
      () => valuesKeys.value,
      (value) => console.log(value, '111-----------')
    )
    return {
      schemas,
      valuesKeys,
      // optionsListApi,
      optionsA,
      optionsB,
      valueSelectA,
      valueSelectB,
      changeHandler: (params: any[]) => {
        valuesKeys.value = params
        console.log(params, '1111111', valuesKeys.value)
        // valuesKeys.value = params
      },
      options: [
        {
          label: 'Popular cities',
          options: [
            {
              value: 'Shanghai',
              label: 'Shanghai'
            },
            {
              value: 'Beijing',
              label: 'Beijing'
            }
          ]
        },
        {
          label: 'City name',
          options: [
            {
              value: 'Chengdu',
              label: 'Chengdu'
            },
            {
              value: 'Shenzhen',
              label: 'Shenzhen'
            },
            {
              value: 'Guangzhou',
              label: 'Guangzhou'
            },
            {
              value: 'Dalian',
              label: 'Dalian'
            }
          ]
        }
      ],

      onSearch: debounce(onSearch, 300),
      searchParams,
      handleReset: () => {
        keyword.value = ''
      },
      handleSubmit: (values: any) => {
        console.log('values', values)
        ElMessage.success('click search,values:' + JSON.stringify(values))
      },
      check
    }
  }
})
</script>
