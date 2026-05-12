import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconCalendarEvent } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { COLORS } from "@/shared/theme";

import { SectionsCard } from "../SectionsCard/SectionsCard";

export const CurrentMomentForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  return (
    <CommonCollapse
      title={t("patients.anamnese.currentMoment.title")}
      icon={<IconCalendarEvent size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <SectionsCard>
        <CommonCollapse title={t("patients.anamnese.currentMoment.basicFunctions.title")}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "currentMoment", "basicFunctions", "sleep"]}>
                <CommonTextInput label={t("patients.anamnese.currentMoment.basicFunctions.sleep")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "currentMoment", "basicFunctions", "food"]}>
                <CommonTextInput label={t("patients.anamnese.currentMoment.basicFunctions.food")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "currentMoment", "basicFunctions", "hygiene"]}>
                <CommonTextInput label={t("patients.anamnese.currentMoment.basicFunctions.hygiene")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "currentMoment", "basicFunctions", "socialConditions"]}>
                <CommonTextInput label={t("patients.anamnese.currentMoment.basicFunctions.socialConditions")} />
              </Form.Item>
            </Col>
          </Row>
          {anamneseType !== "adult" && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name={["anamnese_data", "currentMoment", "basicFunctions", "foodDificulties"]}>
                  <CommonTextInput label={t("patients.anamnese.currentMoment.basicFunctions.foodDificulties")} />
                </Form.Item>
              </Col>
            </Row>
          )}
        </CommonCollapse>
      </SectionsCard>

      {anamneseType === "adolescent" && (
        <SectionsCard>
          <CommonCollapse title={t("patients.anamnese.currentMoment.religion.title")}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name={["anamnese_data", "currentMoment", "religion", "family"]}>
                  <CommonTextInput label={t("patients.anamnese.currentMoment.religion.family")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["anamnese_data", "currentMoment", "religion", "adolescent"]}>
                  <CommonTextInput label={t("patients.anamnese.currentMoment.religion.adolescent")} />
                </Form.Item>
              </Col>
            </Row>
          </CommonCollapse>
        </SectionsCard>
      )}
    </CommonCollapse>
  );
};
