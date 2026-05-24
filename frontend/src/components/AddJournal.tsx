import { Button, Card, DatePicker, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { getJobs } from "../api/jobs";
import { getMeasureUnits } from "../api/measureUnits";
import { getEmployees } from "../api/employee";
import { addJournal } from "../api/journal";
import type { Job } from "../types/jobs";
import type { MeasureUnit } from "../types/measureUnits";
import type { Employee } from "../types/employee";
import type { JournalData } from "../types/journal";
import { useUpdate } from "../store/updateContext";

export default function AddJournalItem() {
  //@ts-ignore
  const { toggleUpdate } = useUpdate();
  const [jobOptions, setJobOptions] = useState<{value: number, label: string}[]>([]);
  const [unitOptions, setUnitOptions] = useState<{value: number, label: string}[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<{value: number, label: string}[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: JournalData) => {
    addJournal(values)
      .then(toggleUpdate);
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
    <Card style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Form
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
          <Form.Item
            label="Вид работ"
            name="id_job"
            rules={[{ required: true, message: 'Введите вид работ!' }]}
          >
            <Select options={jobOptions} />
          </Form.Item>
          <Form.Item
            label="Объем работ"
            name="value"
            rules={[{ required: true, message: 'Введите объем работ!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Единица измерения"
            name="id_measure_unit"
            rules={[{ required: true, message: 'Введите единицу измерения!' }]}
          >
            <Select placeholder="" options={unitOptions} />
          </Form.Item>
          <Form.Item
            label="ФИО"
            name="id_employee"
            rules={[{ required: true, message: 'Выберите работника!' }]}
          >
            <Select options={employeeOptions} />
          </Form.Item>
          <Form.Item
            label="Дата выполнения"
            name="completed"
            rules={[{ required: true, message: 'Выберите дату выполнения!' }]}
          >
            <DatePicker showTime/>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
      </Form>
    </Card>
  );
}