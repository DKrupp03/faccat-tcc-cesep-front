import { useMemo } from "react";
import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";

import { ProfilesSelect } from "../../../ProfilesSelect/ProfilesSelect";
import { useProfileForm } from "@/modules/profiles/hooks/useProfileForm";

export const GeneralDataForm = () => {
  const { t } = useTranslation();
  const { profile } = useProfileForm();

  const anamneseTypeOptions = useMemo(() => ([
    { value: "child", label: t("anamnese.generalData.types.child") },
    { value: "adolescent", label: t("anamnese.generalData.types.adolescent") },
    { value: "adult", label: t("anamnese.generalData.types.adult") },
  ]), [t]);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="anamnese_type">
          <CommonSelect
            label={t("anamnese.generalData.type")}
            options={anamneseTypeOptions}
            required
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="therapist_id">
          <ProfilesSelect
            role="therapist"
            label={t("anamnese.generalData.therapist")}
            disabled={!!profile?.anamnese}
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
            label={t("anamnese.generalData.date")}
            disabled
            required
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
