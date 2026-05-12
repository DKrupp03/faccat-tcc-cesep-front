import { Form, Row, Col, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { IconFriends } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { COLORS } from "@/shared/theme";

export const FamilyHistoryForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  return (
    <CommonCollapse
      title={t("anamnese.familyHistory.title")}
      icon={<IconFriends size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "familyHistory", "responsiblesRelation"]}>
            <CommonTextArea label={t("anamnese.familyHistory.responsiblesRelation")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "familyHistory", "brothersRelation"]}>
            <CommonTextArea label={t("anamnese.familyHistory.brothersRelation")} />
          </Form.Item>
        </Col>
      </Row>

      {anamneseType === "adolescent" && (
        <>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "familyHistory", "membersConflicts"]}>
                <CommonTextArea label={t("anamnese.familyHistory.membersConflicts")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "familyHistory", "parentsDependency"]}>
                <CommonTextInput label={t("anamnese.familyHistory.parentsDependency")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "familyHistory", "brothersBirth"]}>
                <CommonTextInput label={t("anamnese.familyHistory.brothersBirth")} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "familyHistory", "frustrationsDealing"]}>
            <CommonTextArea label={t("anamnese.familyHistory.frustrationsDealing")} />
          </Form.Item>
        </Col>
      </Row>

      {anamneseType === "child" && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name={["anamnese_data", "familyHistory", "brothersBirth"]}>
              <CommonTextInput label={t("anamnese.familyHistory.brothersBirth")} />
            </Form.Item>
          </Col>
        </Row>
      )}

      {anamneseType === "adolescent" && (
        <>
          <Row gutter={16}>
            <Col span={16}>
              <Flex align="center" style={{ height: 44 }}>
                <Form.Item name={["anamnese_data", "familyHistory", "happenedDiagnosis"]} noStyle>
                  <CommonGroupButtons label={t("anamnese.familyHistory.happenedDiagnosis")}>
                    <CommonGroupButtons.Button value={1}>
                      {t("common.yes")}
                    </CommonGroupButtons.Button>
                    <CommonGroupButtons.Button value={0}>
                      {t("common.no")}
                    </CommonGroupButtons.Button>
                  </CommonGroupButtons>
                </Form.Item>
              </Flex>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "familyHistory", "whichDiagnosis"]}>
                <CommonTextInput label={t("anamnese.familyHistory.whichDiagnosis")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "familyHistory", "kinshipDiagnosis"]}>
                <CommonTextInput label={t("anamnese.familyHistory.kinshipDiagnosis")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={16}>
              <Flex align="center" style={{ height: 44 }}>
                <Form.Item name={["anamnese_data", "familyHistory", "happenedSymptom"]} noStyle>
                  <CommonGroupButtons label={t("anamnese.familyHistory.happenedSymptom")}>
                    <CommonGroupButtons.Button value={1}>
                      {t("common.yes")}
                    </CommonGroupButtons.Button>
                    <CommonGroupButtons.Button value={0}>
                      {t("common.no")}
                    </CommonGroupButtons.Button>
                  </CommonGroupButtons>
                </Form.Item>
              </Flex>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "familyHistory", "kinshipSymptom"]}>
                <CommonTextInput label={t("anamnese.familyHistory.kinshipSymptom")} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </CommonCollapse>
  );
};
