import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconOld } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { TOKENS } from "@/shared/theme";

export const MatureAgeForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      variant="card"
      title={t("patients.anamnese.matureAge.title")}
      icon={<IconOld size={16} />}
      initialOpen={false}
    >
      <Row gutter={TOKENS.space[16]}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "matureAge", "physicalChanges"]}>
            <CommonTextInput label={t("patients.anamnese.matureAge.physicalChanges")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={TOKENS.space[16]}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "matureAge", "adversities"]}>
            <CommonTextInput label={t("patients.anamnese.matureAge.adversities")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={TOKENS.space[16]}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "matureAge", "aging"]}>
            <CommonTextInput label={t("patients.anamnese.matureAge.aging")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
