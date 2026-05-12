import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconAlertCircle } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { COLORS } from "@/shared/theme";

export const AdolescentIssuesForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("patients.anamnese.adolescentIssues.title")}
      icon={<IconAlertCircle size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "adolescentIssues", "inferiorityFeelings"]}>
            <CommonTextArea label={t("patients.anamnese.adolescentIssues.inferiorityFeelings")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={["anamnese_data", "adolescentIssues", "eatingDisorders"]}>
            <CommonTextInput label={t("patients.anamnese.adolescentIssues.eatingDisorders")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={["anamnese_data", "adolescentIssues", "suicide"]}>
            <CommonTextInput label={t("patients.anamnese.adolescentIssues.suicide")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={["anamnese_data", "adolescentIssues", "seeThings"]}>
            <CommonTextInput label={t("patients.anamnese.adolescentIssues.seeThings")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "adolescentIssues", "rebellion"]}>
            <CommonTextInput label={t("patients.anamnese.adolescentIssues.rebellion")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "adolescentIssues", "homeScapes"]}>
            <CommonTextInput label={t("patients.anamnese.adolescentIssues.homeScapes")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "adolescentIssues", "drugs"]}>
            <CommonTextArea label={t("patients.anamnese.adolescentIssues.drugs")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "adolescentIssues", "parentsReaction"]}>
            <CommonTextArea label={t("patients.anamnese.adolescentIssues.parentsReaction")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
