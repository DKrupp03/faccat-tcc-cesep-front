import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconQuestionMark } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { COLORS } from "@/shared/theme";

export const ReasonForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  return (
    <CommonCollapse
      title={t("anamnese.reason.title")}
      icon={<IconQuestionMark size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "reason", "mainComplaint"]}>
            <CommonTextInput label={t("anamnese.reason.mainComplaint")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "reason", "evolution"]}>
            <CommonTextInput label={t("anamnese.reason.evolution")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "reason", "effects"]}>
            <CommonTextInput label={t("anamnese.reason.effects")} />
          </Form.Item>
        </Col>
      </Row>
      {anamneseType !== "adult" && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name={["anamnese_data", "reason", "feeling"]}>
              <CommonTextInput label={t("anamnese.reason.feeling")} />
            </Form.Item>
          </Col>
        </Row>
      )}
    </CommonCollapse>
  );
};
