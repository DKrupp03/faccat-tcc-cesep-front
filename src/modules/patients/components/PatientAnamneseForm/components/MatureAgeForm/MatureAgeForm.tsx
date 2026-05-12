import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconOld } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { COLORS } from "@/shared/theme";

export const MatureAgeForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("anamnese.matureAge.title")}
      icon={<IconOld size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "matureAge", "physicalChanges"]}>
            <CommonTextInput label={t("anamnese.matureAge.physicalChanges")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "matureAge", "adversities"]}>
            <CommonTextInput label={t("anamnese.matureAge.adversities")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "matureAge", "aging"]}>
            <CommonTextInput label={t("anamnese.matureAge.aging")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
