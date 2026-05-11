import { useMemo } from "react";
import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";

import { getGenderOptions, getMaritalStatusOptions, getEducationLevelOptions } from "@/modules/profiles/utils/form";

export const IdentificationDataForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  const genderOptions = getGenderOptions(t);
  const maritalStatusOptions = getMaritalStatusOptions(t);
  const educationLevelOptions = getEducationLevelOptions(t);

  const relationStatusOptions = useMemo(() => ([
    { value: "single", label: t("anamnese.identificationData.relationStatus.single") },
    { value: "dating", label: t("anamnese.identificationData.relationStatus.dating") },
  ]), [t]);

  return (
    <CommonCollapse title={t("anamnese.identificationData.title")} expandIconPlacement="start">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "identificationData", "name"]}>
            <CommonTextInput label={t("common.columns.name")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "identificationData", "informant"]}>
            <CommonTextInput label={t("anamnese.identificationData.informant")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name={["anamnese_data", "identificationData", "birth"]}
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
          >
            <CommonDatePicker label={t("common.columns.birth")} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["anamnese_data", "identificationData", "age"]}>
            <CommonTextInput label={t("anamnese.identificationData.age")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "identificationData", "gender"]}>
            <CommonSelect
              label={t("common.columns.gender")}
              options={genderOptions}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "identificationData", "educationLevel"]}>
            <CommonSelect
              label={t("common.columns.educationLevel")}
              options={educationLevelOptions}
            />
          </Form.Item>
        </Col>
        {anamneseType === "adult" && (
          <Col span={12}>
            <Form.Item name={["anamnese_data", "identificationData", "maritalStatus"]}>
              <CommonSelect
                label={t("common.columns.maritalStatus")}
                options={maritalStatusOptions}
              />
            </Form.Item>
          </Col>
        )}
        {anamneseType === "adolescent" && (
          <Col span={12}>
            <Form.Item name={["anamnese_data", "identificationData", "relationStatus"]}>
              <CommonSelect
                label={t("anamnese.identificationData.relationStatus.label")}
                options={relationStatusOptions}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </CommonCollapse>
  );
};
