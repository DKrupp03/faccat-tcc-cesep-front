import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconQuestionMark } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { TOKENS } from "@/shared/theme";

export const ReasonForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  return (
    <CommonCollapse
      variant="card"
      title={t("patients.anamnese.reason.title")}
      icon={<IconQuestionMark size={16} />}
      initialOpen={false}
    >
      <Row gutter={TOKENS.space[16]}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "reason", "mainComplaint"]}>
            <CommonTextInput label={t("patients.anamnese.reason.mainComplaint")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={TOKENS.space[16]}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "reason", "evolution"]}>
            <CommonTextInput label={t("patients.anamnese.reason.evolution")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={TOKENS.space[16]}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "reason", "effects"]}>
            <CommonTextInput label={t("patients.anamnese.reason.effects")} />
          </Form.Item>
        </Col>
      </Row>
      {anamneseType !== "adult" && (
        <Row gutter={TOKENS.space[16]}>
          <Col span={24}>
            <Form.Item name={["anamnese_data", "reason", "feeling"]}>
              <CommonTextInput label={t("patients.anamnese.reason.feeling")} />
            </Form.Item>
          </Col>
        </Row>
      )}
    </CommonCollapse>
  );
};
