import { Form, Row, Col, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { IconHistory } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { COLORS } from "@/shared/theme";
import { apgarMask, integerMask } from "@/shared/utils/formatters";

import { SectionsCard } from "../SectionsCard/SectionsCard";

export const PreviousHistoryForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  return (
    <CommonCollapse
      title={t("patients.anamnese.previousHistory.title")}
      icon={<IconHistory size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      {anamneseType === "adult" ? (
        <>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "previousHistory", "adultInfo", "notableEvents"]}>
                <CommonTextInput label={t("patients.anamnese.previousHistory.adultInfo.notableEvents")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "previousHistory", "adultInfo", "development"]}>
                <CommonTextInput label={t("patients.anamnese.previousHistory.adultInfo.development")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "previousHistory", "adultInfo", "schoolJourney"]}>
                <CommonTextInput label={t("patients.anamnese.previousHistory.adultInfo.schoolJourney")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "previousHistory", "adultInfo", "socialRelations"]}>
                <CommonTextInput label={t("patients.anamnese.previousHistory.adultInfo.socialRelations")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={["anamnese_data", "previousHistory", "adultInfo", "hospitalizations"]}>
                <CommonTextInput label={t("patients.anamnese.previousHistory.adultInfo.hospitalizations")} />
              </Form.Item>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <SectionsCard>
            <CommonCollapse title={t("patients.anamnese.previousHistory.gestation.title")}>
              <Row gutter={16}>
                <Col span={8}>
                  <Flex align="center" style={{ height: 44 }}>
                    <Form.Item name={["anamnese_data", "previousHistory", "gestation", "planned"]} noStyle>
                      <CommonGroupButtons label={t("patients.anamnese.previousHistory.gestation.planned")}>
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
                <Col span={8}>
                  <Flex align="center" style={{ height: 44 }}>
                    <Form.Item name={["anamnese_data", "previousHistory", "gestation", "desired"]} noStyle>
                      <CommonGroupButtons label={t("patients.anamnese.previousHistory.gestation.desired")}>
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
                <Col span={8}>
                  <Flex align="center" style={{ height: 44 }}>
                    <Form.Item name={["anamnese_data", "previousHistory", "gestation", "prenatal"]} noStyle>
                      <CommonGroupButtons label={t("patients.anamnese.previousHistory.gestation.prenatal")}>
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
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={["anamnese_data", "previousHistory", "gestation", "motherConditions"]}
                    style={{ marginTop: 16 }}
                  >
                    <CommonTextInput label={t("patients.anamnese.previousHistory.gestation.motherConditions")} />
                  </Form.Item>
                </Col>
              </Row>
            </CommonCollapse>
          </SectionsCard>

          <SectionsCard>
            <CommonCollapse title={t("patients.anamnese.previousHistory.abortions.title")}>
              <Row gutter={16}>
                <Col span={8}>
                  <Flex align="center" style={{ height: 44 }}>
                    <Form.Item name={["anamnese_data", "previousHistory", "abortions", "happened"]} noStyle>
                      <CommonGroupButtons label={t("patients.anamnese.previousHistory.abortions.happened")}>
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
                <Col span={8}>
                  <Form.Item
                    name={["anamnese_data", "previousHistory", "abortions", "howMany"]}
                    normalize={integerMask}
                  >
                    <CommonTextInput label={t("patients.anamnese.previousHistory.abortions.howMany")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={["anamnese_data", "previousHistory", "abortions", "cause"]}>
                    <CommonTextInput label={t("patients.anamnese.previousHistory.abortions.cause")} />
                  </Form.Item>
                </Col>
              </Row>
            </CommonCollapse>
          </SectionsCard>

          <SectionsCard>
            <CommonCollapse title={t("patients.anamnese.previousHistory.childbirth.title")}>
              <Row gutter={16}>
                <Col span={8}>
                  <Flex align="center" style={{ height: 44 }}>
                    <Form.Item name={["anamnese_data", "previousHistory", "childbirth", "type"]} noStyle>
                      <CommonGroupButtons label={t("patients.anamnese.previousHistory.childbirth.type")}>
                        <CommonGroupButtons.Button value={"normal"}>
                          {t("patients.anamnese.previousHistory.childbirth.types.normal")}
                        </CommonGroupButtons.Button>
                        <CommonGroupButtons.Button value={"cesarian"}>
                          {t("patients.anamnese.previousHistory.childbirth.types.cesarian")}
                        </CommonGroupButtons.Button>
                      </CommonGroupButtons>
                    </Form.Item>
                  </Flex>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={["anamnese_data", "previousHistory", "childbirth", "weeks"]}
                    normalize={integerMask}
                  >
                    <CommonTextInput label={t("patients.anamnese.previousHistory.childbirth.weeks")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={["anamnese_data", "previousHistory", "childbirth", "apgar"]}
                    normalize={apgarMask}
                  >
                    <CommonTextInput label={t("patients.anamnese.previousHistory.childbirth.apgar")} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name={["anamnese_data", "previousHistory", "childbirth", "parentsReaction"]}>
                    <CommonTextInput label={t("patients.anamnese.previousHistory.childbirth.parentsReaction")} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name={["anamnese_data", "previousHistory", "childbirth", "postpartumDepression"]}>
                    <CommonTextInput label={t("patients.anamnese.previousHistory.childbirth.postpartumDepression")} />
                  </Form.Item>
                </Col>
              </Row>
            </CommonCollapse>
          </SectionsCard>
        </>
      )}
    </CommonCollapse>
  );
};
