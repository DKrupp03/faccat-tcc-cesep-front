import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconSchool } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { COLORS } from "@/shared/theme";

export const SchoolHistoryForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("patients.anamnese.schoolHistory.title")}
      icon={<IconSchool size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "schoolHistory", "entry"]}>
            <CommonTextInput label={t("patients.anamnese.schoolHistory.entry")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "schoolHistory", "difficulties"]}>
            <CommonTextInput label={t("patients.anamnese.schoolHistory.difficulties")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "schoolHistory", "repetition"]}>
            <CommonTextInput label={t("patients.anamnese.schoolHistory.repetition")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "schoolHistory", "interpersonalRelationships"]}>
            <CommonTextInput label={t("patients.anamnese.schoolHistory.interpersonalRelationships")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
