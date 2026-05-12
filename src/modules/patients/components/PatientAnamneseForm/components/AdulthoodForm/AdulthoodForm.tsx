import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconRating18Plus } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { COLORS } from "@/shared/theme";

export const AdulthoodForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("anamnese.adulthood.title")}
      icon={<IconRating18Plus size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "adulthood", "studies"]}>
            <CommonTextInput label={t("anamnese.adulthood.studies")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "adulthood", "occupationChoice"]}>
            <CommonTextInput label={t("anamnese.adulthood.occupationChoice")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "adulthood", "currentSituation"]}>
            <CommonTextInput label={t("anamnese.adulthood.currentSituation")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "adulthood", "colleaguesRelationships"]}>
            <CommonTextInput label={t("anamnese.adulthood.colleaguesRelationships")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "adulthood", "numberOfJobs"]}>
            <CommonTextInput label={t("anamnese.adulthood.numberOfJobs")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "adulthood", "jobSatisfaction"]}>
            <CommonTextInput label={t("anamnese.adulthood.jobSatisfaction")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "adulthood", "intimateRelationships"]}>
            <CommonTextInput label={t("anamnese.adulthood.intimateRelationships")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "adulthood", "friends"]}>
            <CommonTextInput label={t("anamnese.adulthood.friends")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "adulthood", "relateAbility"]}>
            <CommonTextInput label={t("anamnese.adulthood.relateAbility")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
