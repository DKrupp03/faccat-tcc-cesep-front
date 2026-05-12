import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconHome } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { COLORS } from "@/shared/theme";

export const DomesticEnvironmentForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  return (
    <CommonCollapse
      title={t("patients.anamnese.domesticEnvironment.title")}
      icon={<IconHome size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "domesticEnvironment", "house"]}>
            <CommonTextInput label={t("patients.anamnese.domesticEnvironment.house")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "domesticEnvironment", "whereSleep"]}>
            <CommonTextInput label={t("patients.anamnese.domesticEnvironment.whereSleep")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {anamneseType === "adolescent" && (
          <Col span={12}>
            <Form.Item name={["anamnese_data", "domesticEnvironment", "privacy"]}>
              <CommonTextInput label={t("patients.anamnese.domesticEnvironment.privacy")} />
            </Form.Item>
          </Col>
        )}
        <Col span={anamneseType === "adolescent" ? 12 : 24}>
          <Form.Item name={["anamnese_data", "domesticEnvironment", "whereLike"]}>
            <CommonTextInput label={t("patients.anamnese.domesticEnvironment.whereLike")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "domesticEnvironment", "tasks"]}>
            <CommonTextArea label={t("patients.anamnese.domesticEnvironment.tasks")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
