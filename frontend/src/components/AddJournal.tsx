import { Button, Card, DatePicker, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { getJobs } from "../api/jobs";
import { getMeasureUnits } from "../api/measureUnits";
import { getEmployees } from "../api/employee";
import type { Job } from "../types/jobs";
import type { MeasureUnit } from "../types/measureUnits";
import type { Employee } from "../types/employee";

export default function AddJournalItem() {
  const [jobOptions, setJobOptions] = useState<{value: number, label: string}[]>([]);
  const [unitOptions, setUnitOptions] = useState<{value: number, label: string}[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<{value: number, label: string}[]>([]);
  const [form] = Form.useForm();

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
  }, [])

  return (
    <Card>
      <Form form={form} component={false}>
        <div style={{display: "flex", gap: 15}}>
        <Form.Item>
          <Select placeholder="Вид работ" options={jobOptions} />
        </Form.Item>
        <Form.Item>
          <Input type="number" placeholder="Объем работ" />
        </Form.Item>
        <Form.Item>
          <Select placeholder="Единица измерения" options={unitOptions} />
        </Form.Item>
        <Form.Item>
          <Select placeholder="ФИО" options={employeeOptions} />
        </Form.Item>
        <Form.Item>
          <DatePicker placeholder="Дата выполнения" />
        </Form.Item>
        <Button type="primary">
          Добавить
        </Button>
        </div>
      </Form>
    </Card>
  );
}