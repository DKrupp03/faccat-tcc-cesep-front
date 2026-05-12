import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconBriefcase2 } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { COLORS } from "@/shared/theme";

export const OccupationHistoryForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("patients.anamnese.occupationHistory.title")}
      icon={<IconBriefcase2 size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "occupationHistory", "jobInfos"]}>
            <CommonTextArea label={t("patients.anamnese.occupationHistory.jobInfos")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
