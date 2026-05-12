import { Form, Row, Col, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { IconPill } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { COLORS } from "@/shared/theme";

import { SectionsCard } from "../SectionsCard/SectionsCard";

export const ClinicalHistoryForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  return (
    <CommonCollapse
      title={t("anamnese.clinicalHistory.title")}
      icon={<IconPill size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "clinicalHistory", "illnesses"]}>
            <CommonTextArea label={t("anamnese.clinicalHistory.illnesses")} />
          </Form.Item>
        </Col>
      </Row>

      <SectionsCard>
        <CommonCollapse title={t("anamnese.clinicalHistory.medicine.title")}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "medicine", "which"]}>
                <CommonTextInput label={t("anamnese.clinicalHistory.medicine.which")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "medicine", "dosage"]}>
                <CommonTextInput label={t("anamnese.clinicalHistory.medicine.dosage")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "medicine", "since"]}>
                <CommonTextInput label={t("anamnese.clinicalHistory.medicine.since")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "medicine", "interruptionReason"]}>
                <CommonTextInput label={t("anamnese.clinicalHistory.medicine.interruptionReason")} />
              </Form.Item>
            </Col>
          </Row>
        </CommonCollapse>
      </SectionsCard>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "clinicalHistory", "hospitalizations"]}>
            <CommonTextInput label={t("anamnese.clinicalHistory.hospitalizations")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["anamnese_data", "clinicalHistory", "chemicalSubstances"]}>
            <CommonTextInput label={t("anamnese.clinicalHistory.chemicalSubstances")} />
          </Form.Item>
        </Col>
      </Row>

      <SectionsCard>
        <CommonCollapse title={t("anamnese.clinicalHistory.specialists.title")}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "specialists", "happened"]}>
                <CommonTextArea label={t("anamnese.clinicalHistory.specialists.happened")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "specialists", "professionalsNames"]}>
                <CommonTextArea label={t("anamnese.clinicalHistory.specialists.professionalsNames")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "specialists", "reason"]}>
                <CommonTextInput label={t("anamnese.clinicalHistory.specialists.reason")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "specialists", "since"]}>
                <CommonTextInput label={t("anamnese.clinicalHistory.specialists.since")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "clinicalHistory", "specialists", "interruptionReason"]}>
                <CommonTextInput label={t("anamnese.clinicalHistory.specialists.interruptionReason")} />
              </Form.Item>
            </Col>
          </Row>
        </CommonCollapse>
      </SectionsCard>

      {anamneseType === "adolescent" && (
        <SectionsCard>
          <CommonCollapse title={t("anamnese.clinicalHistory.familiars.title")}>
            <Row gutter={16}>
              <Col span={16}>
                <Flex align="center" style={{ height: 44 }}>
                  <Form.Item name={["anamnese_data", "clinicalHistory", "familiars", "happenedDiagnosis"]} noStyle>
                    <CommonGroupButtons label={t("anamnese.clinicalHistory.familiars.happenedDiagnosis")}>
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
                <Form.Item name={["anamnese_data", "clinicalHistory", "familiars", "whichDiagnosis"]}>
                  <CommonTextInput label={t("anamnese.clinicalHistory.familiars.whichDiagnosis")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["anamnese_data", "clinicalHistory", "familiars", "kinshipDiagnosis"]}>
                  <CommonTextInput label={t("anamnese.clinicalHistory.familiars.kinshipDiagnosis")} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={16}>
                <Flex align="center" style={{ height: 44 }}>
                  <Form.Item name={["anamnese_data", "clinicalHistory", "familiars", "happenedSymptom"]} noStyle>
                    <CommonGroupButtons label={t("anamnese.clinicalHistory.familiars.happenedSymptom")}>
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
                <Form.Item name={["anamnese_data", "clinicalHistory", "familiars", "kinshipSymptom"]}>
                  <CommonTextInput label={t("anamnese.clinicalHistory.familiars.kinshipSymptom")} />
                </Form.Item>
              </Col>
            </Row>
          </CommonCollapse>
        </SectionsCard>
      )}
    </CommonCollapse>
  );
};
