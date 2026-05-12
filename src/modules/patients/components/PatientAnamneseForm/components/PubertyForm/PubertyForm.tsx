import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconRating12Plus } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { COLORS } from "@/shared/theme";

export const PubertyForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("anamnese.puberty.title")}
      icon={<IconRating12Plus size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "puberty", "socialRelations"]}>
            <CommonTextInput label={t("anamnese.puberty.socialRelations")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "puberty", "schoolHistory"]}>
            <CommonTextInput label={t("anamnese.puberty.schoolHistory")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "puberty", "problems"]}>
            <CommonTextInput label={t("anamnese.puberty.problems")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
