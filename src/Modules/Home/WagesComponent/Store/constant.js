export const WAGES_FORM_FILEDS = [
  {
    fileds: 'wages',
    name: '工资：'
  },
  {
    fileds: 'special',
    name: '专项扣除：'
  },
  {
    fileds: 'radices',
    name: '基数扣除：'
  }
];


export const TABLE_COLUMNS = [{
  title: '第几月',
  width: '5%',
  align: 'center',
  dataIndex: 'yuefen'
}, {
  title: '输入金额',
  width: '10%',
  align: 'center',
  dataIndex: 'wages'
}, {
  title: '累计扣税总额',
  width: '10%',
  align: 'center',
  dataIndex: 'sumwages'
}, {
  title: '专项扣除',
  width: '10%',
  align: 'center',
  dataIndex: 'zhuanxian',
}, {
  title: '(扣税金额-专项扣除-基数扣除)',
  width: '20%',
  align: 'center',
  dataIndex: 'time'
}, {
  title: '扣税率',
  width: '5%',
  align: 'center',
  dataIndex: 'koushuilv'
}, {
  title: '减掉速算扣除',
  width: '10%',
  align: 'center',
  dataIndex: 'susuankouchu'
}, {
  title: '税金',
  width: '10%',
  align: 'center',
  dataIndex: 'shuijin'
}];