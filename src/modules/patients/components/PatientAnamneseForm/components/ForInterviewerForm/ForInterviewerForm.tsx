import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconMicrophone2 } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { COLORS } from "@/shared/theme";

export const ForInterviewerForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("patients.anamnese.forInterviewer.title")}
      icon={<IconMicrophone2 size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "forInterviewer", "relevantInfos"]}>
            <CommonTextArea label={t("patients.anamnese.forInterviewer.relevantInfos")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "forInterviewer", "impressions"]}>
            <CommonTextArea label={t("patients.anamnese.forInterviewer.impressions")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
