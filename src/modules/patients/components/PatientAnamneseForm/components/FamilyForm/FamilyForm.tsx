import { Form, Row, Col, Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { IconUsers, IconTrash } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { integerMask } from "@/shared/utils/formatters";
import { COLORS } from "@/shared/theme";

import { getMaritalStatusOptions, getEducationLevelOptions } from "@/modules/patients/utils/form";
import { SectionsCard } from "../SectionsCard/SectionsCard";

const { Text } = Typography;

export const FamilyForm = () => {
  const { t } = useTranslation();

  const anamneseType = Form.useWatch("anamnese_type");

  const maritalStatusOptions = getMaritalStatusOptions(t);
  const educationLevelOptions = getEducationLevelOptions(t);

  return (
    <CommonCollapse
      title={t("patients.anamnese.family.title")}
      icon={<IconUsers size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      {anamneseType !== "adult" && (
        <Flex gap={16}>
          <SectionsCard style={{ marginTop: 4 }}>
            <Form.List name={["anamnese_data", "family", "responsibles"]}>
              {(fields, { add, remove }) => (
                <CommonCollapse
                  title={t("patients.anamnese.family.responsibles.title")}
                  onClickAdd={() => add({})}
                  shouldShowAddButton
                >
                  {fields.map((field) => (
                    <Row key={field.key} gutter={16}>
                      <Col span={6}>
                        <Form.Item name={[field.name, "responsible"]}>
                          <CommonTextInput label={t("patients.anamnese.family.responsibles.responsible")} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                          name={[field.name, "age"]}
                          normalize={integerMask}
                        >
                          <CommonTextInput label={t("patients.anamnese.family.responsibles.age")} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item name={[field.name, "occupation"]}>
                          <CommonTextInput label={t("common.columns.occupation")} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item name={[field.name, "educationLevel"]}>
                          <CommonSelect
                            label={t("common.columns.educationLevel")}
                            options={educationLevelOptions}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item name={[field.name, "maritalStatus"]}>
                          <CommonSelect
                            label={t("common.columns.maritalStatus")}
                            options={maritalStatusOptions}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <Flex align="center" style={{ height: 44 }}>
                          <CommonButton
                            onClick={() => remove(field.name)}
                            icon={<IconTrash size={16} />}
                            buttonVariant="danger"
                            size="small"
                            circular
                          />
                        </Flex>
                      </Col>
                    </Row>
                  ))}
                  {fields.length === 0 && (
                    <Text>{t("patients.anamnese.family.responsibles.none")}</Text>
                  )}
                </CommonCollapse>
              )}
            </Form.List>
          </SectionsCard>
        </Flex>
      )}

      <Flex gap={16}>
        {anamneseType !== "adult" && (
          <SectionsCard>
            <Form.List name={["anamnese_data", "family", "brothers"]}>
              {(fields, { add, remove }) => (
                <CommonCollapse
                  title={t("patients.anamnese.family.brothers.title")}
                  onClickAdd={() => add({})}
                  shouldShowAddButton
                >
                  {fields.map((field) => (
                    <Row key={field.key} gutter={16}>
                      <Col span={11}>
                        <Form.Item name={[field.name, "name"]}>
                          <CommonTextInput label={t("patients.anamnese.family.brothers.name")} />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          name={[field.name, "age"]}
                          normalize={integerMask}
                        >
                          <CommonTextInput label={t("patients.anamnese.family.brothers.age")} />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Flex align="center" style={{ height: 44 }}>
                          <CommonButton
                            onClick={() => remove(field.name)}
                            icon={<IconTrash size={16} />}
                            buttonVariant="danger"
                            size="small"
                            circular
                          />
                        </Flex>
                      </Col>
                    </Row>
                  ))}
                  {fields.length === 0 && (
                    <Text>{t("patients.anamnese.family.brothers.none")}</Text>
                  )}
                </CommonCollapse>
              )}
            </Form.List>
          </SectionsCard>
        )}

        <SectionsCard>
          <Form.List name={["anamnese_data", "family", "children"]}>
            {(fields, { add, remove }) => (
              <CommonCollapse
                title={t("patients.anamnese.family.children.title")}
                onClickAdd={() => add({})}
                shouldShowAddButton
              >
                {fields.map((field) => (
                  <Row key={field.key} gutter={16}>
                    <Col span={anamneseType === "adult" ? 12 : 11}>
                      <Form.Item name={[field.name, "name"]}>
                        <CommonTextInput label={t("patients.anamnese.family.children.name")} />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name={[field.name, "age"]}
                        normalize={integerMask}
                      >
                        <CommonTextInput label={t("patients.anamnese.family.children.age")} />
                      </Form.Item>
                    </Col>
                    <Col span={anamneseType === "adult" ? 1 : 2}>
                      <Flex align="center" style={{ height: 44 }}>
                        <CommonButton
                          onClick={() => remove(field.name)}
                          icon={<IconTrash size={16} />}
                          buttonVariant="danger"
                          size="small"
                          circular
                        />
                      </Flex>
                    </Col>
                  </Row>
                ))}
                {fields.length === 0 && (
                  <Text>{t("patients.anamnese.family.children.none")}</Text>
                )}
              </CommonCollapse>
            )}
          </Form.List>
        </SectionsCard>
      </Flex>

      {anamneseType === "adult" && (
        <SectionsCard>
          <CommonCollapse title={t("patients.anamnese.family.spouse.title")}>
            <Row gutter={16}>
              <Col span={5}>
                <Flex align="center" style={{ height: 44 }}>
                  <Form.Item name={["anamnese_data", "family", "spouse", "has"]} noStyle>
                    <CommonGroupButtons label={t("patients.anamnese.family.spouse.has")}>
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
              <Col span={10}>
                <Form.Item name={["anamnese_data", "family", "spouse", "name"]}>
                  <CommonTextInput label={t("patients.anamnese.family.spouse.name")} />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  name={["anamnese_data", "family", "spouse", "age"]}
                  normalize={integerMask}
                >
                  <CommonTextInput label={t("patients.anamnese.family.spouse.age")} />
                </Form.Item>
              </Col>
            </Row>
          </CommonCollapse>
        </SectionsCard>
      )}

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "family", "liveWith"]}>
            <CommonTextInput label={t("patients.anamnese.family.liveWith")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "family", "genome"]}>
            <CommonTextArea label={t("patients.anamnese.family.genome")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
