import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconHeartHandshake } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { COLORS } from "@/shared/theme";

export const SocialRelationsForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("patients.anamnese.socialRelations.title")}
      icon={<IconHeartHandshake size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "socialRelations", "friendships"]}>
            <CommonTextArea label={t("patients.anamnese.socialRelations.friendships")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "socialRelations", "loveRelationships"]}>
            <CommonTextArea label={t("patients.anamnese.socialRelations.loveRelationships")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "socialRelations", "behaviorChanges"]}>
            <CommonTextArea label={t("patients.anamnese.socialRelations.behaviorChanges")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
