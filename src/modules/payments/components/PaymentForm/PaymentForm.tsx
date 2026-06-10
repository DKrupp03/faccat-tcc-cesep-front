import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Skeleton, Divider } from "antd";
import dayjs from "dayjs";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonDocuments } from "@/shared/components/CommonDocuments/CommonDocuments";
import { ServicesSelect } from "@/shared/components/ServicesSelect/ServicesSelect";
import { decimalMask } from "@/shared/utils/formatters";

import { usePaymentForm } from "../../hooks/usePaymentForm";
import {
  getPaymentMethodOptions,
  parseCurrencyInput,
  formatCurrencyInput,
} from "../../utils/form";
import type { Payment } from "../../types/payment";
import styles from "./PaymentForm.module.css";

type PaymentFormProps = {
  lockedFields?: Array<keyof Payment>;
  defaultValues?: Partial<Payment>;
};

export const PaymentForm = ({
  lockedFields = [],
  defaultValues,
}: PaymentFormProps) => {
  const { t } = useTranslation();
  const { isFormOpen, payment, loadingPayment, submitPayment } = usePaymentForm();

  const [form] = Form.useForm<Partial<Payment>>();
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  // Limpa os anexos pendentes a cada nova sessão de edição (sem efeito, para
  // evitar renders em cascata) comparando com a chave de sessão anterior.
  const sessionKey = isFormOpen ? payment?.id ?? "new" : null;
  const [prevSessionKey, setPrevSessionKey] = useState(sessionKey);
  if (prevSessionKey !== sessionKey) {
    setPrevSessionKey(sessionKey);
    setNewFiles([]);
    setRemovedIds([]);
  }

  const paymentMethodOptions = useMemo(() => getPaymentMethodOptions(t), [t]);

  const visibleDocuments = useMemo(() => (
    (payment?.attachments ?? []).filter((doc) => !removedIds.includes(doc.id))
  ), [payment?.attachments, removedIds]);

  useEffect(() => {
    if (isFormOpen) {
      if (payment) {
        form.setFieldsValue({
          ...defaultValues,
          ...payment,
          value: formatCurrencyInput(payment.value),
        });
      } else {
        form.resetFields();
        if (defaultValues) form.setFieldsValue(defaultValues);
      }
    }
  }, [isFormOpen, payment, defaultValues, form]);

  const isServiceLocked = !!payment?.id || lockedFields.includes("service_id");

  const handleFinish = (values: Partial<Payment>) => {
    submitPayment({
      ...values,
      value: parseCurrencyInput(values.value as string),
      new_attachments: newFiles,
      remove_attachment_ids: removedIds,
    });
  };

  if (loadingPayment) {
    return (
      <Skeleton
        className={styles.form}
        paragraph={{ rows: 6 }}
        active
      />
    );
  }

  return (
    <Form
      id="payment-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleFinish}
      initialValues={defaultValues}
      className={styles.form}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="service_id">
            <ServicesSelect
              label={t("payments.columns.service")}
              required
              disabled={isServiceLocked}
              allowClear={false}
              withoutPayment
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="value" normalize={decimalMask}>
            <CommonTextInput
              label={t("payments.columns.value")}
              icon="R$"
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="payment_method">
            <CommonSelect
              label={t("payments.columns.paymentMethod")}
              options={paymentMethodOptions}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="expiration_date"
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
          >
            <CommonDatePicker
              label={t("payments.columns.expirationDate")}
              required
              disabledDate={!payment?.id
                ? (current) => !!current && current < dayjs().startOf("day")
                : undefined}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="payment_date"
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
          >
            <CommonDatePicker label={t("payments.columns.paymentDate")} />
          </Form.Item>
        </Col>
      </Row>

      <Divider className={styles.divider} />

      <Row gutter={16}>
        <Col span={24}>
          <CommonDocuments
            label={t("common.documents.title")}
            documents={visibleDocuments}
            pendingFiles={newFiles}
            onUpload={(files) => setNewFiles((prev) => [...prev, ...files])}
            onRemove={(id) => setRemovedIds((prev) => [...prev, Number(id)])}
            onRemovePending={(idx) => setNewFiles((prev) => prev.filter((_, i) => i !== idx))}
          />
        </Col>
      </Row>
    </Form>
  );
};

type PaymentFormOptionsProps = {
  showDelete?: boolean;
};

export const PaymentFormOptions = ({ showDelete = true }: PaymentFormOptionsProps) => {
  const { t } = useTranslation();
  const { payment, isSubmitting, deletePayment } = usePaymentForm();

  return (
    <>
      {showDelete && payment?.id && (
        <CommonButton
          onClick={() => deletePayment(payment.id)}
          buttonVariant="danger"
          loading={isSubmitting}
        >
          {t("common.actions.delete")}
        </CommonButton>
      )}
      <CommonButton
        htmlType="submit"
        form="payment-form"
        buttonVariant="primary"
        loading={isSubmitting}
      >
        {payment?.id
          ? t("payments.actions.edit")
          : t("payments.actions.create")}
      </CommonButton>
    </>
  );
};
