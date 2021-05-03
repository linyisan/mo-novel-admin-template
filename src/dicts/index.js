// 静态数据字典
var dicts = {
  sexMap: [{ value: '0', label: '男' }, { value: '1', label: '女' }],
  status: [{ value: '0', label: '禁用' }, { value: '1', label: '可用' }],
  roleDict: [{ value: '1', label: '管理员' }, { value: '2', label: '读者' }],
  categoryMap: [{ value: 1, label: '玄幻奇幻' }, { value: 3, label: '武侠仙侠' }, { value: 4, label: '都市言情'
  }, { value: 5, label: '历史军事' }, { value: 6, label: '科幻灵异' }, { value: 7, label: '网游竞技' }],
  channelMap: [{ label: '男频', value: '0' }, { label: '女频', value: '1' }],
  bookStatusMap: [{ label: '连载中', value: '1' }, { label: '已完结', value: '2' }],
  wordCountMap: [{ label: '30万字以下', value: JSON.stringify({ 'wordCountMin': 300000, 'wordCountMax': null }) },
    { label: '30-50万字', value: JSON.stringify({ 'wordCountMin': 300000, 'wordCountMax': 500000 }) },
    { label: '50-100万字', value: JSON.stringify({ 'wordCountMin': 500000, 'wordCountMax': 1000000 }) },
    { label: '100万字以上', value: JSON.stringify({ 'wordCountMin': null, 'wordCountMax': 1000000 }) }
  ],
  updatePeriodMap: [
    { label: '三日内', value: '3' },
    { label: '七日内', value: '7' },
    { label: '半月内', value: '15' },
    { label: '一月内', value: '30' }
  ],
  sortMap: [
    { label: '更新时间', value: 'updateTime' },
    { label: '总字数', value: 'wordCount' },
    { label: '点击量', value: 'visitCount' }
  ]
}

export { dicts }

function dictToFilter(dictName) {
  return dicts[dictName].reduce((acc, cur) => {
    acc[cur.value] = cur.label
    return acc
  }, {})
}

export function getDictLabel(value, dict) {
  var rItem = dict.find(item => item.value == value)
  return (rItem && rItem.label) || value
}
