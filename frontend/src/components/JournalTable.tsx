import { useEffect, useState } from "react"
import { Button, Card, Form, message, Space, Table } from "antd";
import { addJournal, getJournals } from "../api/journal";
import type { JournalData } from "../types/journal";

export default function JournalTable() {
  const [data, setData] = useState<JournalData[]>([]);

  const getItems = () => {
    getJournals()
      .then(setData)
      .catch(err => message.error(err.message));
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Дата выполнения',
      dataIndex: 'completed',
      key: 'completed',
    },
    {
      title: 'Вид работ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Объем',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'ФИО',
      dataIndex: 'fio',
      key: 'fio',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="medium">
          <Button onClick={() => {console.log(record)}}>Редактировать</Button>
          <Button onClick={() => {console.log(record)}} type="dashed">Удалить</Button>
        </Space>
      )
    },
  ];

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Card>
      <Table dataSource={data} columns={columns}/>
    </Card>
  );
}