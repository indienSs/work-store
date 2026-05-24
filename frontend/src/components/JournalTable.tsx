import { useEffect, useState } from "react"
import { Button, Card, message, Space, Table } from "antd";
import { deleteJournal, getJournals } from "../api/journal";
import ModifyJournalModal from "./ModifyJournalModal";
import { useUpdate } from "../store/updateContext";
import type { JournalData } from "../types/journal";

export default function JournalTable() {
  //@ts-ignore
  const { update } = useUpdate();
  const [data, setData] = useState<JournalData[]>([]);
  const [modifiedItem, setModfiedItem] = useState<JournalData | null>(null);

  const getItems = () => {
    getJournals()
      .then(setData)
      .catch(err => message.error(err.message));
  }

  const deleteItem = (id: number) => {
    deleteJournal(id)
      .then(getItems)
      .catch(err => message.error(err.message));
  }

  const updateItem = (item: JournalData) => {
    setModfiedItem(item);
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
      sorter: (a: JournalData, b: JournalData) => {
        return new Date(a.completed).getTime() - new Date(b.completed).getTime();
      }
    },
    {
      title: 'Вид работ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Объем',
      dataIndex: 'value_text',
      key: 'value_text',
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
          <Button onClick={() => updateItem(record)}>Редактировать</Button>
          <Button onClick={() => deleteItem(record.id)} type="dashed">Удалить</Button>
        </Space>
      )
    },
  ];

  useEffect(() => {
    getItems();
  }, [update]);

  return (
    <Card>
      <ModifyJournalModal item={modifiedItem} setItem={setModfiedItem} />
      <Table dataSource={data} columns={columns} rowKey="id" />
    </Card>
  );
}