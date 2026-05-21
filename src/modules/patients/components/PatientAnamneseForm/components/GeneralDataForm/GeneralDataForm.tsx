import { useMemo } from "react";
import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";

import { usePatientForm } from "@/modules/patients/hooks/usePatientForm";

export const GeneralDataForm = () => {
  const { t } = useTranslation();
  const {
    patient,
    therapistId,
  } = usePatientForm();

  const anamneseTypeOptions = useMemo(() => ([
    { value: "child", label: t("patients.anamnese.generalData.types.child") },
    { value: "adolescent", label: t("patients.anamnese.generalData.types.adolescent") },
    { value: "adult", label: t("patients.anamnese.generalData.types.adult") },
  ]), [t]);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="anamnese_type">
          <CommonSelect
            label={t("patients.anamnese.generalData.type")}
            options={anamneseTypeOptions}
            required
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="therapist_id">
          <ProfilesSelect
            role="therapist"
            label={t("patients.anamnese.generalData.therapist")}
            disabled={!!patient?.anamnese || !!therapistId}
            allowClear={false}
            required
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name="created_at"
          getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
        >
          <CommonDatePicker
            label={t("patients.anamnese.generalData.date")}
            disabled={!!patient?.anamnese}
            required
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
