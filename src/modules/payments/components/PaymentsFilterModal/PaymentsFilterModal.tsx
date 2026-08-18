import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "antd";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { dateValueProps, normalizeDate } from "@/shared/utils/formatters";
import { dateRangeRule } from "@/shared/utils/filterRules";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";

import { useAuth } from "@/modules/auth/hooks/useAuth";

import { usePaymentsFilter } from "../../hooks/usePaymentsFilter";
import { usePaymentsList } from "../../hooks/usePaymentsList";
import { getStatusOptions, getPaymentMethodOptions } from "../../utils/form";
import styles from "./PaymentsFilterModal.module.css";

export const PaymentsFilterModal = () => {
  const { t } = useTranslation();
  const { therapistId, patientId } = usePaymentsList();
  const {
    isFilterOpen,
    defaultFilter,
    form,
    handleClear,
    handleClose,
    handleFiltrate,
  } = usePaymentsFilter();

  const { profile } = useAuth();
  const isAdmin = !!profile?.admin;

  const statusOptions = useMemo(() => getStatusOptions(t), [t]);
  const paymentMethodOptions = useMemo(() => getPaymentMethodOptions(t), [t]);

  const footerContent = useMemo(() => (
    <>
      <CommonButton onClick={handleClear} outline>
        {t("common.actions.clearFilter")}
      </CommonButton>
      <CommonButton onClick={handleFiltrate} buttonVariant="primary">
        {t("common.actions.filtrate")}
      </CommonButton>
    </>
  ), [t, handleClear, handleFiltrate]);

  return (
    <CommonModal
      title={t("payments.actions.filtrate")}
      isOpen={isFilterOpen}
      close={handleClose}
      footer={footerContent}
    >
      <Form
        form={form}
        name="payments-filter"
        initialValues={defaultFilter}
        className={styles.form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="status" noStyle>
              <CommonSelect
                label={t("payments.columns.status")}
                options={statusOptions}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="payment_method" noStyle>
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
            <Form.Item name="patient_id" noStyle>
              <ProfilesSelect
                role="patient"
                therapistId={therapistId}
                disabled={!!patientId}
              />
            </Form.Item>
          </Col>
          {/* Terapeuta não-admin já tem o painel restrito a ele; o corte por
              profissional só faz sentido para quem enxerga todos. */}
          {isAdmin && (
            <Col span={12}>
              <Form.Item name="therapist_id" noStyle>
                <ProfilesSelect role="therapist" />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="expiration_date_start"
              noStyle
              getValueProps={dateValueProps}
              normalize={normalizeDate}
            >
              <CommonDatePicker label={t("payments.filter.expirationDateStart")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="expiration_date_end"
              noStyle
              dependencies={["expiration_date_start"]}
              getValueProps={dateValueProps}
              normalize={normalizeDate}
              rules={[dateRangeRule(t, "expiration_date_start")]}
            >
              <CommonDatePicker label={t("payments.filter.expirationDateEnd")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="payment_date_start"
              noStyle
              getValueProps={dateValueProps}
              normalize={normalizeDate}
            >
              <CommonDatePicker label={t("payments.filter.paymentDateStart")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="payment_date_end"
              noStyle
              dependencies={["payment_date_start"]}
              getValueProps={dateValueProps}
              normalize={normalizeDate}
              rules={[dateRangeRule(t, "payment_date_start")]}
            >
              <CommonDatePicker label={t("payments.filter.paymentDateEnd")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CommonModal>
  );
};
