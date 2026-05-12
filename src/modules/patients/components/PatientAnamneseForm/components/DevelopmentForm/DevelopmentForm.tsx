import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconTrendingUp } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { COLORS } from "@/shared/theme";

export const DevelopmentForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  return (
    <CommonCollapse
      title={t("patients.anamnese.development.title")}
      icon={<IconTrendingUp size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "development", "breastFeeding"]}>
            <CommonTextInput label={t("patients.anamnese.development.breastFeeding")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "development", "crawlingWalking"]}>
            <CommonTextInput label={t("patients.anamnese.development.crawlingWalking")} />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "development", "sphincterControl"]}>
            <CommonTextInput label={t("patients.anamnese.development.sphincterControl")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "development", "language"]}>
            <CommonTextInput label={t("patients.anamnese.development.language")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "development", "socialRelations"]}>
            <CommonTextInput
              label={anamneseType === "child"
                ? t("patients.anamnese.development.socialRelations")
                : t("patients.anamnese.development.socialRelationsBeginning")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "development", "losses"]}>
            <CommonTextInput label={t("patients.anamnese.development.losses")} />
          </Form.Item>
        </Col>
      </Row>

      {anamneseType === "child" && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "development", "dependence"]}>
                <CommonTextInput label={t("patients.anamnese.development.dependence")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "development", "alone"]}>
                <CommonTextInput label={t("patients.anamnese.development.alone")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "development", "help"]}>
                <CommonTextInput label={t("patients.anamnese.development.help")} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "development", "event"]}>
            <CommonTextInput label={t("patients.anamnese.development.event")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
