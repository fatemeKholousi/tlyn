import React from 'react'
import Table from 'rc-table'


function HistoryTable(){ 
    const tableInfo = JSON.parse(localStorage.getItem("tableInfo"));

     const columns = [
    {
      title: "تاریخ و زمان خرید",
      dataIndex: 'date',
      key: 'date',
      width: '20vw',
      render: (value) =><p>{new Date(value).toLocaleDateString('fa-IR', { year: 'numeric', day: 'numeric' , month: 'long'})}</p>,

    },
    {
      title: 'قیمت طلا به گرم (ریال)',
      dataIndex: 'goldPrice',
      key: 'goldPrice',
      width: '10vw',
    },
    {
      title: 'مبلغ',
      dataIndex: 'price',
      key: 'price',
      width: '20vw',
    },
    {
      title: 'وزن خریداری شده',
      dataIndex: 'goldWeight',
      key: 'goldWeight',
      width: '10vw',
    },
  ]


  return (
    <div className="package-table-wrapper">
<p >تاریخچه خرید</p>
      <Table columns={columns} data={tableInfo} className="package-table" key="budget" />
    </div>
  )}
export default HistoryTable