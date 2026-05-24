import { Button, DatePicker, Form, Input, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { getJobs } from "../api/jobs";
import { getMeasureUnits } from "../api/measureUnits";
import { getEmployees } from "../api/employee";
import type { MeasureUnit } from "../types/measureUnits";
import type { JournalData } from "../types/journal";
import type { Employee } from "../types/employee";
import type { Job } from "../types/jobs";
import dayjs from "dayjs";
import { updateJournal } from "../api/journal";
import { useUpdate } from "../store/updateContext";

export default function ModifyJournalModal(props: {
  item: JournalData | null,
  setItem: React.Dispatch<React.SetStateAction<JournalData | null>>,
}) {
  //@ts-ignore
  const { toggleUpdate } = useUpdate();
  const [jobOptions, setJobOptions] = useState<{value: number, label: string}[]>([]);
  const [unitOptions, setUnitOptions] = useState<{value: number, label: string}[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<{value: number, label: string}[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: JournalData) => {
    if (props.item !== null) {
      updateJournal(props.item.id, values)
        .then(() => message.success("Успешно изменено!"))
        .then(toggleUpdate)
        .then(() => props.setItem(null));
    }
  };

  useEffect(() => {
    getJobs()
      .then((options: Job[]) => {
        const optionsData = options.map(option => ({value: option.id, label: option.name}));
        setJobOptions(optionsData);
      })
      .catch(err => message.error(err.message));

    getMeasureUnits()
      .then((options: MeasureUnit[]) => {
        const optionsData = options.map(option => ({value: option.id, label: option.name}));
        setUnitOptions(optionsData);
      })
      .catch(err => message.error(err.message));

    getEmployees()
      .then((options: Employee[]) => {
        const optionsData = options.map(option => ({value: option.id, label: `${option.f} ${option.i} ${option.o}` }));
        setEmployeeOptions(optionsData);
      })
      .catch(err => message.error(err.message));
  }, []);

  return (
    <Modal
      open={!!props.item}
      footer={null}
      onCancel={() => props.setItem(null)}
    >
      <Form
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 800 }}
      >
          <Form.Item
            label="Вид работ"
            name="id_job"
            initialValue={props.item?.id_job || ""}
            rules={[{ required: true, message: 'Введите вид работ!' }]}
          >
            <Select options={jobOptions} />
          </Form.Item>
          <Form.Item
            label="Объем работ"
            name="value"
            initialValue={props.item?.value || ""}
            rules={[{ required: true, message: 'Введите объем работ!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Единица измерения"
            name="id_measure_unit"
            initialValue={props.item?.id_measure_unit || ""}
            rules={[{ required: true, message: 'Введите единицу измерения!' }]}
          >
            <Select placeholder="" options={unitOptions} />
          </Form.Item>
          <Form.Item
            label="ФИО"
            name="id_employee"
            initialValue={props.item?.id_employee || ""}
            rules={[{ required: true, message: 'Выберите работника!' }]}
          >
            <Select options={employeeOptions} />
          </Form.Item>
          <Form.Item
            label="Дата выполнения"
            name="completed"
            initialValue={props.item?.completed ? dayjs(props.item.completed) : dayjs()}
            rules={[{ required: true, message: 'Выберите дату выполнения!' }]}
          >
            <DatePicker showTime/>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Изменить
          </Button>
      </Form>
    </Modal>
  );
}